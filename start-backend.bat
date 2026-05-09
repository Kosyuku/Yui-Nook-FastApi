@echo off
cd /d "D:\YUI Nook\backend"
if not exist ".venv\Scripts\python.exe" (
  echo [backend] .venv missing, creating...
  python -m venv .venv
  if errorlevel 1 goto :fail
  echo [backend] installing requirements...
  ".venv\Scripts\python.exe" -m pip install -r requirements.txt
  if errorlevel 1 goto :fail
)
".venv\Scripts\python.exe" -m uvicorn main:app --reload
goto :eof
:fail
echo [backend] startup bootstrap failed
pause
