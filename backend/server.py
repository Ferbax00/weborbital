from fastapi import FastAPI, APIRouter, HTTPException, Query, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from models import ContactRequest, ContactRequestCreate

ROOT_DIR = Path(__file__).parent
STATIC_DIR = ROOT_DIR / "static"
ADMIN_HTML = STATIC_DIR / "admin.html"
LOGIN_HTML = STATIC_DIR / "login.html"
ADMIN_COOKIE = "orbital_admin"

load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

api_router = APIRouter(prefix="/api")


def _admin_password() -> str:
    return os.environ.get("ADMIN_KEY", "").strip()


def _is_authenticated(request: Request, key: Optional[str] = None) -> bool:
    expected = _admin_password()
    if not expected:
        return False
    if key == expected:
        return True
    return request.cookies.get(ADMIN_COOKIE) == expected


def _require_admin(request: Request, key: Optional[str] = None) -> None:
    if not _is_authenticated(request, key):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")


def _path_requires_auth(path: str, method: str) -> bool:
    if path in ("/admin/login", "/admin/logout"):
        return False
    if path.startswith("/admin"):
        return True
    if path in ("/docs", "/redoc", "/openapi.json"):
        return True
    if path == "/api/contact-requests" and method == "GET":
        return True
    return False


class AdminAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        method = request.method

        if not _path_requires_auth(path, method):
            return await call_next(request)

        if _is_authenticated(request, request.query_params.get("key")):
            return await call_next(request)

        if path.startswith("/admin") or path in ("/docs", "/redoc"):
            return RedirectResponse(url="/admin/login?error=1", status_code=302)

        return HTMLResponse(
            content='{"detail":"No autorizado"}',
            status_code=401,
            media_type="application/json",
        )


@api_router.get("/")
async def root():
    return {"message": "ORBITALDATA API - Hello World"}


@api_router.post("/contact-requests", response_model=ContactRequest, status_code=201)
async def create_contact_request(request: ContactRequestCreate):
    try:
        contact_request = ContactRequest(
            name=request.name,
            email=request.email,
            message=request.message,
        )
        request_dict = contact_request.model_dump()
        result = await db.contact_requests.insert_one(request_dict)

        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Error al guardar la solicitud")

        logging.info(f"Contact request created: {contact_request.id}")
        return contact_request

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error creating contact request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al procesar la solicitud: {str(e)}")


@api_router.get("/contact-requests", response_model=List[ContactRequest])
async def get_contact_requests(request: Request, key: Optional[str] = Query(None)):
    _require_admin(request, key)
    try:
        requests = await db.contact_requests.find().sort("created_at", -1).to_list(1000)
        contact_requests = []
        for req in requests:
            req.pop("_id", None)
            contact_requests.append(ContactRequest(**req))
        return contact_requests

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching contact requests: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al obtener solicitudes: {str(e)}")


app.include_router(api_router)


@app.get("/")
async def web_root(request: Request):
    if _is_authenticated(request):
        return RedirectResponse(url="/admin")
    return RedirectResponse(url="/admin/login")


@app.get("/admin/login", response_class=HTMLResponse)
async def admin_login_page():
    if not _admin_password():
        raise HTTPException(
            status_code=503,
            detail="ADMIN_KEY no configurada en el servidor. Defínela en las variables de entorno.",
        )
    if not LOGIN_HTML.is_file():
        raise HTTPException(status_code=500, detail="Página de login no encontrada")
    return HTMLResponse(content=LOGIN_HTML.read_text(encoding="utf-8"))


@app.post("/admin/login")
async def admin_login_submit(password: str = Form(...)):
    expected = _admin_password()
    if not expected or password != expected:
        return RedirectResponse(url="/admin/login?error=1", status_code=302)

    response = RedirectResponse(url="/admin", status_code=302)
    response.set_cookie(
        key=ADMIN_COOKIE,
        value=expected,
        httponly=True,
        max_age=60 * 60 * 24 * 7,
        samesite="lax",
    )
    return response


@app.post("/admin/logout")
async def admin_logout():
    response = RedirectResponse(url="/admin/login", status_code=302)
    response.delete_cookie(ADMIN_COOKIE)
    return response


@app.get("/admin", response_class=HTMLResponse)
async def admin_panel(request: Request, key: Optional[str] = Query(None)):
    _require_admin(request, key)
    if not ADMIN_HTML.is_file():
        raise HTTPException(status_code=500, detail="Panel de administración no encontrado")
    return HTMLResponse(content=ADMIN_HTML.read_text(encoding="utf-8"))


@app.get("/docs", include_in_schema=False)
async def swagger_docs(request: Request):
    _require_admin(request)
    from fastapi.openapi.docs import get_swagger_ui_html

    return get_swagger_ui_html(openapi_url="/openapi.json", title="ORBITALDATA API")


@app.get("/redoc", include_in_schema=False)
async def redoc_docs(request: Request):
    _require_admin(request)
    from fastapi.openapi.docs import get_redoc_html

    return get_redoc_html(openapi_url="/openapi.json", title="ORBITALDATA API")


@app.get("/openapi.json", include_in_schema=False)
async def openapi_schema(request: Request):
    _require_admin(request)
    return app.openapi()


def _cors_origins() -> list:
    raw = os.environ.get(
        "CORS_ORIGINS",
        "https://ferbax00.github.io,http://localhost:5500,http://127.0.0.1:5500",
    )
    origins = [o.strip() for o in raw.split(",") if o.strip()]
    return origins or ["*"]


app.add_middleware(AdminAuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_cors_origins(),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
