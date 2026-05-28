# Configuración del PC — ORBITALDATA

## Requisitos

| Herramienta | Estado en tu PC |
|-------------|-----------------|
| Python 3.13 | Instalado |
| Node.js 22 | Instalado (opcional, para frontend React) |
| MongoDB | Debe instalarse (ver abajo) |

## Configuración rápida (3 pasos)

### 1. Setup (solo la primera vez)

Abre PowerShell en la carpeta del proyecto:

```powershell
cd "d:\Desktop\Prueba-web-orbital-main"
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
.\scripts\setup.ps1
```

### 2. MongoDB

**Si no tienes MongoDB**, en PowerShell **como administrador**:

```powershell
winget install MongoDB.Server --accept-package-agreements
```

Luego reinicia el PC o inicia el servicio:

```powershell
Start-Service MongoDB
```

**Alternativa (nube):** Crea un cluster gratis en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), copia la connection string y edita `backend\.env`:

```env
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=orbitaldata
```

### 3. Iniciar todo

```powershell
.\scripts\start.ps1
```

Se abren dos ventanas:

- **API** → http://localhost:8000/api/
- **Portal** → http://localhost:5500/index.html

### Verificar

```powershell
.\scripts\verificar.ps1
```

## Archivos creados

| Archivo | Uso |
|---------|-----|
| `backend\.env` | URL de MongoDB y nombre de BD |
| `backend\.venv\` | Entorno Python del API |
| `backend\requirements-local.txt` | Dependencias mínimas (sin paquetes privados) |
| `scripts\setup.ps1` | Instalación inicial |
| `scripts\start.ps1` | Arranca API + portal |
| `scripts\verificar.ps1` | Prueba API, MongoDB y web |

## Puertos

| Puerto | Servicio |
|--------|----------|
| 5500 | Página web (`index.html`) |
| 8000 | Backend FastAPI |
| 27017 | MongoDB (local) |

## Problemas frecuentes

**"Error de conexión" al enviar el formulario**  
→ El backend no está corriendo. Ejecuta `.\scripts\start.ps1`.

**Error al guardar en MongoDB**  
→ MongoDB no está instalado o el servicio no está activo: `Start-Service MongoDB`.

**Puerto 8000 ocupado**  
→ Cierra otras apps o cambia el puerto en `scripts\start.ps1` y en `portal\js\config.js` (línea `apiBaseUrl`).
