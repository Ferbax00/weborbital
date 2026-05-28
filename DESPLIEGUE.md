# Despliegue web — ORBITALDATA

Publicar **frontend** (GitHub Pages) y **backend** (Render) para verlos en internet.

## URLs finales (ejemplo)

| Servicio | URL ejemplo |
|----------|-------------|
| **Sitio público** | `https://ferbax00.github.io/Prueba-web-orbital/` |
| **Panel admin** | `https://orbitaldata-api.onrender.com/admin` |
| **API docs** | `https://orbitaldata-api.onrender.com/docs` |

---

## Paso 1 — MongoDB en la nube (gratis)

1. Entra en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito (M0)
3. Database Access → usuario y contraseña
4. Network Access → **Allow access from anywhere** (`0.0.0.0/0`)
5. Connect → Drivers → copia la connection string, por ejemplo:

```
mongodb+srv://usuario:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Paso 2 — Backend en Render

1. Cuenta en [render.com](https://render.com) → **New** → **Blueprint** o **Web Service**
2. Conecta el repositorio de GitHub
3. Render usará `render.yaml` automáticamente
4. Variables de entorno en el panel de Render:

| Variable | Valor |
|----------|--------|
| `MONGO_URL` | Tu connection string de Atlas |
| `DB_NAME` | `orbitaldata` |
| `ADMIN_KEY` | Contraseña de administración (la que definiste para el panel) |

5. Deploy → copia la URL del servicio, ej. `https://orbitaldata-api.onrender.com`

**Probar:**

- `https://TU-API.onrender.com/api/` → mensaje Hello World
- `https://TU-API.onrender.com/admin/login` → ingresar contraseña → panel de solicitudes
- `https://TU-API.onrender.com/docs` → documentación Swagger

> El plan gratuito de Render “duerme” tras inactividad; la primera petición puede tardar ~30 s.

---

## Paso 3 — Frontend en GitHub Pages

### 3.1 Subir el código a GitHub

Si no tienes Git instalado: [https://git-scm.com/download/win](https://git-scm.com/download/win)

```powershell
cd "d:\Desktop\Prueba-web-orbital-main"
git init
git add .
git commit -m "ORBITALDATA: portal web, API y despliegue"
git branch -M main
git remote add origin https://github.com/Ferbax00/Prueba-web-orbital.git
git push -u origin main
```

(Si el repo ya existe, usa `git remote set-url origin ...` y `git push`.)

### 3.2 Activar GitHub Pages

1. Repo en GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. El workflow `.github/workflows/deploy-pages.yml` publicará el sitio en cada push a `main`

### 3.3 Conectar el frontend con el backend

En GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret | Valor |
|--------|--------|
| `ORBITAL_API_URL` | `https://orbitaldata-api.onrender.com` (tu URL de Render, sin `/` final) |

Vuelve a ejecutar el workflow (Actions → Deploy frontend → **Run workflow**) o haz un push vacío.

**Alternativa manual:** edita `portal/js/env.js`:

```javascript
window.ORBITAL_API_URL = 'https://orbitaldata-api.onrender.com';
```

---

## Paso 4 — Verificar en producción

1. Abre tu GitHub Pages (Settings → Pages muestra la URL)
2. Envía una cotización de prueba en el formulario
3. Abre `https://TU-API.onrender.com/admin?key=TU_ADMIN_KEY` y comprueba que aparece la solicitud

---

## Resumen local vs producción

| | Local | Producción |
|---|--------|------------|
| Web | http://localhost:5500/index.html | GitHub Pages |
| API | http://localhost:8000 | Render |
| Admin | http://localhost:8000/admin | Render `/admin?key=...` |
| MongoDB | localhost:27017 | MongoDB Atlas |

---

## Archivos importantes

- `render.yaml` — configuración del backend en Render
- `.github/workflows/deploy-pages.yml` — publica el frontend
- `portal/js/env.js` — URL del API en producción
- `backend/.env` — solo local (no se sube a GitHub)
