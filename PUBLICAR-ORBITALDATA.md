# Publicar ORBITALDATA (sitio + formulario + admin)

Tu sitio en vivo es: **https://ferbax00.github.io/orbitaldata/**

GitHub Pages **no ejecuta PHP** ni aloja el panel admin. Necesitas:

1. **Sitio** → repo `Ferbax00/orbitaldata` (GitHub Pages)  
2. **Backend** → Render.com (API + admin con contraseña)  
3. **Base de datos** → MongoDB Atlas (gratis)

---

## Paso 1 — Actualizar el sitio en GitHub

En PowerShell, desde esta carpeta del proyecto:

```powershell
.\scripts\actualizar-orbitaldata.ps1
```

Eso sube `form.js`, `api-config.js` y `admin.html` al repo **orbitaldata**.

En `index.html` del repo orbitaldata debe quedar **antes** de `form.js`:

```html
<script src="api-config.js"></script>
<script src="form.js"></script>
```

---

## Paso 2 — Backend en Render (gratis)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → cluster M0 → connection string  
2. [render.com](https://render.com) → **New** → **Web Service** → repo `Prueba-web-orbital` (o solo carpeta `backend`)  
3. Variables de entorno:

| Variable | Valor |
|----------|--------|
| `MONGO_URL` | Connection string de Atlas |
| `DB_NAME` | `orbitaldata` |
| `ADMIN_KEY` | `H0l4nd4w3b***` |
| `CORS_ORIGINS` | `https://ferbax00.github.io` |

4. Build: `pip install -r requirements-local.txt`  
5. Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`  
6. Copia la URL, ej. `https://orbitaldata-api.onrender.com`

---

## Paso 3 — Conectar sitio con API

Edita en el repo **orbitaldata** el archivo `api-config.js`:

```javascript
window.ORBITAL_API_URL = 'https://orbitaldata-api.onrender.com';
```

Commit y push. Espera 1–2 minutos.

---

## Paso 4 — Probar

| Qué | URL |
|-----|-----|
| Web pública | https://ferbax00.github.io/orbitaldata/ |
| Entrada admin | https://ferbax00.github.io/orbitaldata/admin.html |
| Panel (tras login) | `https://TU-API.onrender.com/admin` |
| Contraseña | La de `ADMIN_KEY` |

**Importante:** El admin **no** está en `github.io/admin`. Siempre pasa por `admin.html` → servidor Render → `/admin/login`.

---

## Formulario sin API aún

Si `api-config.js` está vacío, el formulario envía por **FormSubmit** al correo `josfer38@gmail.com`.  
Con la API configurada, guarda en **MongoDB** y puedes ver solicitudes en el panel admin.

---

## Errores frecuentes

| Problema | Solución |
|----------|----------|
| Formulario no envía | Configura `api-config.js` o revisa FormSubmit / correo |
| Admin 404 en GitHub | Usa `/orbitaldata/admin.html`, no `/admin` en github.io |
| Login no acepta clave | `ADMIN_KEY` en Render debe ser exactamente `H0l4nd4w3b***` |
| API lenta al primer uso | Plan gratis de Render “despierta” ~30 s |
