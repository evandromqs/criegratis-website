@echo off
setlocal enableextensions enabledelayedexpansion
title CrieGratis - Inicializador do Projeto
color 0A

echo ===================================================
echo             PROJETO CRIEGRATIS
echo ===================================================
echo.

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
    call npm install
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

echo [3/3] Iniciando servidor de desenvolvimento...
echo Abrindo http://localhost:3000 no navegador em instantes...
echo.

start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"

call npm.cmd run dev

if %errorlevel% neq 0 (
    echo.
    echo [AVISO] O servidor foi encerrado com erro ou finalizado pelo usuario.
    pause
)