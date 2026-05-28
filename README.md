# ORBITALDATA

Sitio web corporativo con formulario de cotización, API FastAPI y panel de administración.

## Enlaces rápidos

| Recurso | Documentación |
|---------|----------------|
| Uso en tu PC | [CONFIGURACION-PC.md](CONFIGURACION-PC.md) |
| Subir a GitHub | [SUBIR-A-GITHUB.md](SUBIR-A-GITHUB.md) |
| Publicar en internet | [DESPLIEGUE.md](DESPLIEGUE.md) |

## Estructura

```
├── index.html          # Sitio público (clientes)
├── css/                # Estilos
├── portal/js/          # Lógica del formulario
├── backend/
│   ├── server.py       # API FastAPI
│   └── static/admin.html
└── frontend/           # App React (opcional)
```

## Local

```powershell
.\configurar.bat    # Primera vez
.\iniciar.bat       # Portal + API
```

| URL | Descripción |
|-----|-------------|
| http://localhost:5500/index.html | Sitio web |
| http://localhost:8000/admin | Panel de solicitudes |
| http://localhost:8000/docs | API interactiva |

## Producción (resumen)

1. **MongoDB Atlas** — base de datos en la nube  
2. **Render** — backend (`render.yaml`)  
3. **GitHub Pages** — frontend (workflow automático)  
4. Secret `ORBITAL_API_URL` en GitHub Actions  

Detalle paso a paso: **[DESPLIEGUE.md](DESPLIEGUE.md)**

## Licencia

MIT
