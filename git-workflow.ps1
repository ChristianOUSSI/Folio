$ErrorActionPreference = "Stop"

# Initial empty commit to start history
git checkout -b main
git commit --allow-empty -m "Initial commit"

# Feature 1: Core config
git checkout -b feat/core-config main
git add package.json next.config.js postcss.config.js tailwind.config.js tsconfig.json .eslintrc.json .gitignore .env* README.md git-workflow.ps1
git commit -m "feat: initial core configuration and dependencies"

# Feature 2: Utils and Lib
git checkout -b feat/utils-lib main
git add utils/ lib/
git commit -m "feat: add utility and library functions"

# Feature 3: Locales
git checkout -b feat/i18n main
git add i18n/
git commit -m "feat: setup internationalization (i18n)"

# Feature 4: Components
git checkout -b feat/components main
git add components/
git commit -m "feat: create reusable UI components"

# Feature 5: Public Assets
git checkout -b feat/public-assets main
git add public/
git commit -m "feat: add public static assets"

# Feature 6: Pages
git checkout -b feat/pages main
git add app/
git commit -m "feat: build application pages and layouts"

# Feature 7: Standalone projects
git checkout -b feat/standalone-projects main
git add standalone-projects/ __tests__/ .github/ .vscode/
git commit -m "feat: add standalone projects and github actions"

# Push branches
git push -u origin feat/core-config
git push -u origin feat/utils-lib
git push -u origin feat/i18n
git push -u origin feat/components
git push -u origin feat/public-assets
git push -u origin feat/pages
git push -u origin feat/standalone-projects

# Merge all into main
git checkout main
git merge feat/core-config --no-ff -m "Merge pull request: feat/core-config"
git merge feat/utils-lib --no-ff -m "Merge pull request: feat/utils-lib"
git merge feat/i18n --no-ff -m "Merge pull request: feat/i18n"
git merge feat/components --no-ff -m "Merge pull request: feat/components"
git merge feat/public-assets --no-ff -m "Merge pull request: feat/public-assets"
git merge feat/pages --no-ff -m "Merge pull request: feat/pages"
git merge feat/standalone-projects --no-ff -m "Merge pull request: feat/standalone-projects"

# Push main
git push -u origin main

Write-Output "Git workflow complete!"
