# Copia form.js, api-config.js y admin.html al repo orbitaldata en GitHub
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Patch = Join-Path $Root "orbitaldata-github"
$RepoUrl = "https://github.com/Ferbax00/orbitaldata.git"
$WorkDir = Join-Path $env:TEMP "orbitaldata-sync"

Write-Host "=== Actualizar sitio orbitaldata en GitHub ===" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Instala Git primero." -ForegroundColor Red
    exit 1
}

if (Test-Path $WorkDir) { Remove-Item $WorkDir -Recurse -Force }
git clone $RepoUrl $WorkDir
Set-Location $WorkDir

Copy-Item (Join-Path $Patch "form.js") . -Force
Copy-Item (Join-Path $Patch "api-config.js") . -Force
Copy-Item (Join-Path $Patch "admin.html") . -Force

# Añadir api-config.js al index.html si no existe
$index = Get-Content "index.html" -Raw
if ($index -notmatch "api-config\.js") {
    $index = $index -replace '(<script src="form\.js"></script>)', '<script src="api-config.js"></script>`n    $1'
    Set-Content "index.html" $index -NoNewline
    Write-Host "[OK] index.html actualizado (api-config.js)" -ForegroundColor Green
}

git add form.js api-config.js admin.html index.html
git status
git commit -m "Integrar API FastAPI, admin con contraseña y formulario corregido"
git push origin main

Write-Host ""
Write-Host "Listo. Sitio: https://ferbax00.github.io/orbitaldata/" -ForegroundColor Green
Write-Host "Admin:  https://ferbax00.github.io/orbitaldata/admin.html" -ForegroundColor Green
Write-Host ""
Write-Host "Configure api-config.js con la URL de Render tras desplegar el backend." -ForegroundColor Yellow
