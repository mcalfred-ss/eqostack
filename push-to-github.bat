@echo off
echo ========================================
echo Pushing eqostack to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking Git...
git --version
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo Step 2: Initializing Git repository (if needed)...
if not exist .git (
    git init
)

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Committing changes...
git commit -m "Initial commit - eqostack website with eqostack.com domain"

echo.
echo Step 5: Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/mcalfred-ss/eqostack.git

echo.
echo Step 6: Setting branch to main...
git branch -M main

echo.
echo Step 7: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Check your GitHub repository:
echo https://github.com/mcalfred-ss/eqostack
echo ========================================
pause

