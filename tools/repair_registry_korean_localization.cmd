@echo off
cd /d "%~dp0\.."
powershell -NoProfile -ExecutionPolicy Bypass -File ".\tools\repair_registry_korean_localization.ps1"
echo.
echo Press any key to close.
pause >nul
