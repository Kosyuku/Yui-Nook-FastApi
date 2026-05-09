@echo off
setlocal

cd /d "%~dp0frontend-react"

if not exist node_modules (
  echo [frontend] node_modules not found. Running npm install...
  npm install
  if errorlevel 1 (
    echo [frontend] npm install failed.
    pause
    exit /b 1
  )
)

echo [frontend] Starting React dev server...
npm run dev

endlocal
