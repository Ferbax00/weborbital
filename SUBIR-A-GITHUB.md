# Subir el proyecto a GitHub

## 1. Instalar Git (si no lo tienes)

Descarga: [https://git-scm.com/download/win](https://git-scm.com/download/win)  
Cierra y vuelve a abrir PowerShell después de instalar.

## 2. Crear el repositorio en GitHub

1. [https://github.com/new](https://github.com/new)
2. Nombre: `Prueba-web-orbital` (o el que prefieras)
3. **No** marques “Add README” si ya tienes archivos locales
4. Crear repositorio

## 3. Subir desde tu PC

```powershell
cd "d:\Desktop\Prueba-web-orbital-main"

git init
git add .
git status
git commit -m "ORBITALDATA: sitio web, API FastAPI, panel admin y despliegue"

git branch -M main
git remote add origin https://github.com/TU_USUARIO/Prueba-web-orbital.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu usuario de GitHub (ej. `Ferbax00`).

Si Git pide login, usa un **Personal Access Token** como contraseña:  
GitHub → Settings → Developer settings → Personal access tokens.

## 4. Qué NO se sube (ya está en .gitignore)

- `backend/.env` (contraseñas de MongoDB)
- `backend/.venv/`
- `node_modules/`

## 5. Después del push

Sigue la guía **[DESPLIEGUE.md](DESPLIEGUE.md)** para:

- GitHub Pages (frontend)
- Render (backend)
- MongoDB Atlas (base de datos)
