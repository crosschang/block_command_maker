@echo off
cd /d "%~dp0\.."
powershell -NoProfile -ExecutionPolicy Bypass -File ".\tools\fix_item_component_localization.ps1"
echo.
pause
