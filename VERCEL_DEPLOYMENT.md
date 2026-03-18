# Déploiement sur Vercel

Chaque projet peut être déployé **individuellement** sur Vercel. Tous pointent vers le portfolio : **https://portfolio0-kappa.vercel.app**

## 1. Portfolio principal

- **Racine du dépôt** : déployer depuis la racine
- **Framework** : Next.js (détection automatique)
- **Variables d'environnement** (à configurer après déploiement des projets) :
  - `NEXT_PUBLIC_MOBILE_HUB_URL` = URL de Mobile Hub
  - `NEXT_PUBLIC_SAAS_ADMIN_URL` = URL de SaaS Admin
  - `NEXT_PUBLIC_BLADE_QUEST_URL` = URL de Blade Quest
  - `NEXT_PUBLIC_DATADASH_URL` = URL de DataDash

## 2. Mobile Hub

- **Root Directory** : `standalone-projects/mobile-hub`
- **Framework** : Vite
- **Variables d'environnement** :
  - `VITE_STANDALONE` = `true`
  - `VITE_PORTFOLIO_URL` = `https://portfolio0-kappa.vercel.app`
- **Firebase** (optionnel) : Ajoutez les variables `VITE_FIREBASE_*` pour utiliser Firestore (voir .env.example)

## 3. SaaS Admin

- **Root Directory** : `standalone-projects/saas-admin`
- **Framework** : Next.js
- **Variables d'environnement** :
  - `NEXT_PUBLIC_PORTFOLIO_URL` = `https://portfolio0-kappa.vercel.app`

## 4. Blade Quest

- **Root Directory** : `standalone-projects/blade-quest`
- **Framework** : Aucun (site statique HTML)
- Le lien « ← Portfolio » pointe vers https://portfolio0-kappa.vercel.app

## 5. DataDash

- **Root Directory** : `standalone-projects/datadash`
- **Framework** : Vite + API Python (serverless)
- **Variables d'environnement** :
  - `VITE_STANDALONE` = `true`
  - `VITE_PORTFOLIO_URL` = `https://portfolio0-kappa.vercel.app`

---

## Procédure

1. Créez **5 projets** sur Vercel (un par application)
2. Liez le même dépôt Git à chaque projet
3. Configurez le **Root Directory** pour les 4 projets enfants
4. Ajoutez les variables d'environnement indiquées
5. Déployez et récupérez les URLs générées
6. Copiez ces URLs dans les variables du **Portfolio** principal
