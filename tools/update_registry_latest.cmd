@echo off
cd /d "%~dp0\.."
powershell -NoProfile -ExecutionPolicy Bypass -File ".\tools\update_registry_from_official.ps1"
echo.
echo Press any key to close.
pause >nul
