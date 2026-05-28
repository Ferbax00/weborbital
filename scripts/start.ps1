# ORBITALDATA - Inicia portal web + API
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Backend = Join-Path $Root "backend"

# Intentar iniciar MongoDB si existe el servicio
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -ne "Running") {
    try {
        Start-Service MongoDB
        Write-Host "[OK] MongoDB iniciado" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } catch {
        Write-Host "[AVISO] No se pudo iniciar MongoDB. El formulario puede fallar." -ForegroundColor Yellow
    }
}

# Backend API (puerto 8000)
$backendCmd = @"
Set-Location '$Backend'
& '.\.venv\Scripts\Activate.ps1'
uvicorn server:app --reload --host 127.0.0.1 --port 8000
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -WindowStyle Normal
Write-Host "[OK] Backend API   -> http://localhost:8000/api/" -ForegroundColor Green
Write-Host "[OK] Panel admin   -> http://localhost:8000/admin" -ForegroundColor Green
Write-Host "[OK] API Docs      -> http://localhost:8000/docs" -ForegroundColor Green

Start-Sleep -Seconds 2

# Portal web estático (puerto 5500)
$webCmd = @"
Set-Location '$Root'
python -m http.server 5500
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $webCmd -WindowStyle Normal
Write-Host "[OK] Portal web  -> http://localhost:5500/index.html" -ForegroundColor Green

Write-Host ""
Write-Host "Abre en el navegador: http://localhost:5500/index.html" -ForegroundColor Cyan
Write-Host "Para detener: cierra las ventanas de PowerShell abiertas." -ForegroundColor Gray
