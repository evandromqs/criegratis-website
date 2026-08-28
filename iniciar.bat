@echo off
setlocal enableextensions enabledelayedexpansion
title CrieGratis - Servidor Local
color 0A

cd /d "%~dp0"

echo [1/3] Verificando ambiente Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERRO] Node.js nao foi encontrado no sistema!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado.
echo.

echo [2/3] Verificando dependencias do projeto...
if not exist "node_modules\" (
    echo Dependencias nao encontradas. Instalando...
    call npm.cmd install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERRO] Falha ao instalar dependencias do npm.
        echo.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias ja instaladas.
)
echo.

echo [3/3] Iniciando servidor do CrieGratis...
echo.

:: Exibe o QR Code e links de rede para acesso pelo celular
node scripts/show-qr.js "Projeto CrieGratis"

:: Aguarda o servidor responder na porta 3000 e abre o navegador do computador automaticamente
start "" powershell -NoProfile -Command "for ($i=0; $i -lt 30; $i++) { Start-Sleep -Seconds 1; try { $res = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 1; if ($res.StatusCode -eq 200) { Start-Process 'http://localhost:3000'; break; } } catch {} }"

call npm.cmd run dev

if %errorlevel% neq 0 (
    echo.
    echo [AVISO] O servidor foi encerrado ou finalizado pelo usuario.
    pause
)
