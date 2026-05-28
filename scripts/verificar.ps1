# ORBITALDATA - Verifica que API y MongoDB respondan
$ErrorActionPreference = "Continue"

Write-Host "=== Verificación ORBITALDATA ===" -ForegroundColor Cyan

try {
    $health = Invoke-RestMethod -Uri "http://localhost:8000/api/" -TimeoutSec 5
    Write-Host "[OK] API: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "[FALLO] API no responde en http://localhost:8000 - Ejecuta .\scripts\start.ps1" -ForegroundColor Red
}

try {
    $test = @{
        name  = "Prueba Setup"
        email = "test@orbitaldata.com"
        message = "Verificación automática del entorno"
    } | ConvertTo-Json
    $created = Invoke-RestMethod -Uri "http://localhost:8000/api/contact-requests" -Method Post -Body $test -ContentType "application/json" -TimeoutSec 10
    Write-Host "[OK] MongoDB: solicitud guardada (id: $($created.id))" -ForegroundColor Green
} catch {
    Write-Host "[FALLO] No se pudo guardar en MongoDB: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "       Instala/inicia MongoDB o revisa backend\.env" -ForegroundColor Yellow
}

try {
    $page = Invoke-WebRequest -Uri "http://localhost:5500/index.html" -UseBasicParsing -TimeoutSec 5
    if ($page.StatusCode -eq 200) {
        Write-Host "[OK] Portal web en puerto 5500" -ForegroundColor Green
    }
} catch {
    Write-Host "[FALLO] Portal no responde en http://localhost:5500 - Ejecuta .\scripts\start.ps1" -ForegroundColor Red
}
