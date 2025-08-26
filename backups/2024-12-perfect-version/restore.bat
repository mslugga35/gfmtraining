@echo off
echo Restoring GFM Training Academy - Perfect Version
echo ================================================

REM Navigate to the website root directory
cd ..\..

echo.
echo Restoring component files...
copy backups\2024-12-perfect-version\page.tsx app\page.tsx /Y
copy backups\2024-12-perfect-version\GFMTFHero.tsx app\components\GFMTFHero.tsx /Y
copy backups\2024-12-perfect-version\GFMTFHeader.tsx app\components\GFMTFHeader.tsx /Y
copy backups\2024-12-perfect-version\GFMTFPrograms.tsx app\components\GFMTFPrograms.tsx /Y

echo.
echo Restoring style and config files...
copy backups\2024-12-perfect-version\globals.css app\globals.css /Y
copy backups\2024-12-perfect-version\layout.tsx app\layout.tsx /Y
copy backups\2024-12-perfect-version\tailwind.config.js tailwind.config.js /Y
copy backups\2024-12-perfect-version\postcss.config.mjs postcss.config.mjs /Y

echo.
echo ================================================
echo Restore Complete!
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Open: http://localhost:3000
echo.
echo Your site has been restored to the perfect version from Dec 24, 2024
pause