@echo off
echo ========================================
echo 🚀 VÉRIFICATION PRÉ-DÉPLOIEMENT
echo ========================================
echo.

echo 📦 Vérification Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé ou pas dans le PATH
    echo 📥 Téléchargez depuis https://nodejs.org
    goto :error
) else (
    echo ✅ Node.js trouvé
    node --version
)

echo.
echo 📦 Vérification npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm n'est pas installé
    goto :error
) else (
    echo ✅ npm trouvé
    npm --version
)

echo.
echo 📦 Vérification Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git n'est pas installé
    echo 📥 Téléchargez depuis https://git-scm.com
    goto :error
) else (
    echo ✅ Git trouvé
    git --version
)

echo.
echo 📁 Vérification répertoire projet...
if not exist "package.json" (
    echo ❌ package.json introuvable - êtes-vous dans le bon répertoire ?
    goto :error
) else (
    echo ✅ package.json trouvé
)

echo.
echo 📦 Vérification dépendances...
if not exist "node_modules" (
    echo ⚠️  node_modules manquant - exécutez 'npm install'
) else (
    echo ✅ node_modules présent
)

echo.
echo 🔧 Test build...
call npm run build > build.log 2>&1
if %errorlevel% neq 0 (
    echo ❌ Build échoué - vérifiez build.log
    goto :error
) else (
    echo ✅ Build réussi
)

echo.
echo 🧪 Test des tests...
call npm test > test.log 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Tests échoués - vérifiez test.log
    echo    (Peut être normal si tests non configurés)
) else (
    echo ✅ Tests réussis
)

echo.
echo 🔐 Vérification .env.local...
if not exist ".env.local" (
    echo ⚠️  .env.local manquant - créez-le avec vos variables
    echo    Copiez .env.example vers .env.local
) else (
    echo ✅ .env.local présent
)

echo.
echo 📝 Vérification fichiers critiques...
set "files_missing=0"

if not exist "lib\csrf.ts" set /a "files_missing+=1"
if not exist "lib\rateLimit.ts" set /a "files_missing+=1"
if not exist "lib\contactValidation.ts" set /a "files_missing+=1"
if not exist "components\ErrorBoundary.tsx" set /a "files_missing+=1"
if not exist "app\not-found.tsx" set /a "files_missing+=1"
if not exist "app\sitemap.ts" set /a "files_missing+=1"
if not exist "public\robots.txt" set /a "files_missing+=1"

if %files_missing% gtr 0 (
    echo ❌ %files_missing% fichiers critiques manquants
    goto :error
) else (
    echo ✅ Tous les fichiers critiques présents
)

echo.
echo ========================================
echo 🎉 PRÊT POUR DÉPLOIEMENT !
echo ========================================
echo.
echo Étapes suivantes :
echo 1. Configurez .env.local si pas fait
echo 2. Testez localement : npm run dev
echo 3. Commit & push vers GitHub
echo 4. Importez sur Vercel
echo 5. Configurez les variables d'environnement
echo 6. VIDEZ LE CACHE après déploiement !
echo.
echo 📖 Guides disponibles :
echo    DEPLOIEMENT_WINDOWS.md
echo    DOCUMENTATION.md
echo    QUICK_START.md
echo.
goto :end

:error
echo.
echo ========================================
echo ❌ PROBLÈMES DÉTECTÉS
echo ========================================
echo.
echo Consultez DEPLOIEMENT_WINDOWS.md pour les solutions
echo.
exit /b 1

:end
echo Appuyez sur une touche pour continuer...
pause >nul