# ORBITALDATA - Configuración inicial del entorno (Windows)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "=== ORBITALDATA - Setup ===" -ForegroundColor Cyan

# Python
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Instala Python desde https://www.python.org/downloads/" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Python: $(python --version)" -ForegroundColor Green

# Backend venv
$Backend = Join-Path $Root "backend"
Set-Location $Backend

if (-not (Test-Path ".venv")) {
    Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv .venv
}

Write-Host "Instalando dependencias del backend..." -ForegroundColor Yellow
& ".\.venv\Scripts\pip" install -q --upgrade pip
& ".\.venv\Scripts\pip" install -q -r requirements-local.txt

# .env
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] Creado backend\.env desde .env.example" -ForegroundColor Green
} else {
    Write-Host "[OK] backend\.env ya existe" -ForegroundColor Green
}

# MongoDB
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -ne "Running") {
        Start-Service MongoDB
        Write-Host "[OK] Servicio MongoDB iniciado" -ForegroundColor Green
    } else {
        Write-Host "[OK] MongoDB ya está en ejecución" -ForegroundColor Green
    }
} elseif (Get-Command mongod -ErrorAction SilentlyContinue) {
    Write-Host "[OK] MongoDB encontrado en PATH" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "MongoDB no está instalado." -ForegroundColor Yellow
    Write-Host "Opción A (recomendada): ejecuta como administrador:" -ForegroundColor Yellow
    Write-Host "  winget install MongoDB.Server --accept-package-agreements" -ForegroundColor White
    Write-Host "Opción B: usa MongoDB Atlas y edita backend\.env con tu MONGO_URL" -ForegroundColor Yellow
    Write-Host ""
}

Set-Location $Root
Write-Host ""
Write-Host "=== Setup completado ===" -ForegroundColor Cyan
Write-Host "Siguiente paso: .\scripts\start.ps1" -ForegroundColor White
