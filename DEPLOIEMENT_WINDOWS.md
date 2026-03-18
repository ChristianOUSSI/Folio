# 🚀 GUIDE DÉPLOIEMENT COMPLET - Windows

## 📋 PRÉREQUIS

### 1. Installer Node.js (Obligatoire)
**Téléchargez et installez Node.js 18+ :**
- Allez sur https://nodejs.org
- Téléchargez la version **LTS** (recommandée)
- Installez avec les options par défaut
- **Redémarrez** votre terminal/PowerShell après l'installation

**Vérifiez l'installation :**
```powershell
node --version  # Devrait afficher v18.x.x ou plus
npm --version   # Devrait afficher 9.x.x ou plus
```

### 2. Installer Git (Si pas déjà fait)
- Téléchargez depuis https://git-scm.com
- Installez avec les options par défaut

---

## 🏗️ ÉTAPE 1: PRÉPARATION LOCALE

### Ouvrir PowerShell en tant qu'Administrateur
1. Tapez `PowerShell` dans la barre de recherche Windows
2. Clic droit → "Exécuter en tant qu'administrateur"

### Aller dans le répertoire du projet
```powershell
cd "C:\Users\Franz\Documents\CADC\Portfolio"
```

### Installer les dépendances
```powershell
npm install
```

### Créer le fichier .env.local
```powershell
# Créez le fichier .env.local dans le répertoire racine
# Copiez-collez ce contenu et modifiez les valeurs :

RESEND_API_KEY=re_votre_cle_api_ici
CSRF_SECRET=votre_secret_securise_ici
NEXT_PUBLIC_MOBILE_HUB_URL=https://mobile-hub.vercel.app
NEXT_PUBLIC_SAAS_ADMIN_URL=https://saas-admin.vercel.app
NEXT_PUBLIC_BLADE_QUEST_URL=https://blade-quest.vercel.app
NEXT_PUBLIC_DATADASH_URL=https://datadash.vercel.app
```

---

## 🧪 ÉTAPE 2: TESTS LOCAUX

### Lancer le serveur de développement
```powershell
npm run dev
```
- Ouvrez http://localhost:3000 dans votre navigateur
- Testez le formulaire de contact
- Vérifiez que tout fonctionne

### Tester la build de production
```powershell
npm run build
```
- Doit finir sans erreurs
- Si erreurs, corrigez-les avant de continuer

### Lancer les tests
```powershell
npm test
```
- Tous les tests doivent passer

---

## 🌐 ÉTAPE 3: CONFIGURATION VERCEL

### 3.1 Créer un compte Vercel
1. Allez sur https://vercel.com
2. Créez un compte gratuit (GitHub recommandé)
3. Connectez votre compte GitHub

### 3.2 Importer le repository
1. Cliquez sur "New Project"
2. Importez votre repository GitHub
3. **Framework Preset**: Next.js (automatique)
4. **Root Directory**: `.` (racine du projet)

### 3.3 Configurer les variables d'environnement
Dans **Settings > Environment Variables**, ajoutez :

| Variable | Valeur | Obligatoire |
|----------|--------|-------------|
| `RESEND_API_KEY` | `re_xxx...` | ✅ |
| `CSRF_SECRET` | Chaîne aléatoire sécurisée | ✅ |
| `NEXT_PUBLIC_MOBILE_HUB_URL` | URL Mobile Hub | ❌ |
| `NEXT_PUBLIC_SAAS_ADMIN_URL` | URL SaaS Admin | ❌ |
| `NEXT_PUBLIC_BLADE_QUEST_URL` | URL Blade Quest | ❌ |
| `NEXT_PUBLIC_DATADASH_URL` | URL DataDash | ❌ |

**Pour CSRF_SECRET, générez une valeur sécurisée :**
```powershell
# Dans PowerShell, exécutez :
[System.Web.Security.Membership]::GeneratePassword(32, 4)
```

### 3.4 Déployer
1. Cliquez sur "Deploy"
2. Attendez que le déploiement se termine
3. Notez l'URL générée (ex: `https://portfolio-xxx.vercel.app`)

---

## 📱 ÉTAPE 4: DÉPLOIEMENT DES PROJETS INDIVIDUELS

### 4.1 Mobile Hub
```powershell
cd "standalone-projects/mobile-hub"
vercel --prod
```
- **Root Directory**: `standalone-projects/mobile-hub`
- **Framework**: Vite
- Variables: `VITE_STANDALONE=true`, `VITE_PORTFOLIO_URL=https://votre-portfolio-url.vercel.app`

### 4.2 SaaS Admin
```powershell
cd "standalone-projects/saas-admin"
vercel --prod
```
- **Root Directory**: `standalone-projects/saas-admin`
- **Framework**: Next.js

### 4.3 Blade Quest
```powershell
cd "standalone-projects/blade-quest"
vercel --prod
```
- **Root Directory**: `standalone-projects/blade-quest`
- **Framework**: Other (static)

### 4.4 DataDash
```powershell
cd "standalone-projects/datadash"
vercel --prod
```
- **Root Directory**: `standalone-projects/datadash`
- **Framework**: Vite
- Variables: `VITE_STANDALONE=true`, `VITE_PORTFOLIO_URL=https://votre-portfolio-url.vercel.app`

---

## 🔄 ÉTAPE 5: MISE À JOUR DU PORTFOLIO PRINCIPAL

### Ajouter les URLs des projets déployés
Retournez dans **Vercel Dashboard > Portfolio > Settings > Environment Variables** :

```
NEXT_PUBLIC_MOBILE_HUB_URL=https://mobile-hub-xxx.vercel.app
NEXT_PUBLIC_SAAS_ADMIN_URL=https://saas-admin-xxx.vercel.app
NEXT_PUBLIC_BLADE_QUEST_URL=https://blade-quest-xxx.vercel.app
NEXT_PUBLIC_DATADASH_URL=https://datadash-xxx.vercel.app
```

### Redéployer le portfolio
1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur **Redeploy**

---

## ✅ ÉTAPE 6: VÉRIFICATIONS FINALES

### 6.1 Vérifier le déploiement
- Ouvrez l'URL du portfolio dans un nouvel onglet
- **IMPORTANT**: Videz le cache navigateur !
  - Chrome/Edge: `Ctrl + Shift + Suppr` → Tout cocher → Vider
  - Firefox: `Ctrl + Shift + Suppr` → Tout cocher → Vider
- Rechargez avec `Ctrl + F5`

### 6.2 Tester les fonctionnalités
- [ ] Formulaire de contact fonctionne
- [ ] Liens vers projets fonctionnent
- [ ] Dark mode fonctionne
- [ ] Blog accessible
- [ ] Pages 404/Offline fonctionnent

### 6.3 Vérifier les emails
- Envoyez un test via le formulaire
- Vérifiez que vous recevez l'email

---

## 🔧 COMMANDES UTILES

### Développement local
```powershell
npm run dev          # Serveur développement
npm run build        # Build production
npm run start        # Serveur production local
npm test            # Tests unitaires
npm run lint        # Vérification code
```

### Vercel CLI (si installé)
```powershell
vercel --help        # Aide Vercel
vercel link          # Lier projet local
vercel dev           # Développement avec Vercel
```

### Git
```powershell
git status           # État des fichiers
git add .           # Ajouter tous les fichiers
git commit -m "Message"  # Commit
git push origin main # Push vers GitHub
```

---

## 🚨 PROBLÈMES COURANTS & SOLUTIONS

### ❌ "npm command not found"
**Solution**: Redémarrez PowerShell et vérifiez l'installation Node.js

### ❌ "Build failed"
**Solution**:
```powershell
npm run build  # Localement pour voir l'erreur
# Corrigez les erreurs TypeScript/erreurs
```

### ❌ "Les modifications ne s'affichent pas"
**Solution**: Videz le cache navigateur (voir étape 6.1)

### ❌ "Formulaire retourne 403"
**Cause**: CSRF token expiré
**Solution**: Rechargez la page (`F5`)

### ❌ "RESEND_API_KEY not configured"
**Solution**:
1. Vérifiez dans Vercel Dashboard > Settings
2. Redéployez après ajout
3. Attendez 2-3 minutes

### ❌ "Cannot resolve module"
**Solution**: `npm install` pour installer les dépendances manquantes

---

## 📞 SUPPORT

### Ressources
- 📖 **DOCUMENTATION.md** - Guide technique complet
- 📋 **QUICK_START.md** - Démarrage rapide
- 🔧 **health-check.sh** - Vérification santé projet

### Obtenir de l'aide
1. Vérifiez les logs Vercel (Dashboard > Functions)
2. Consultez la documentation
3. Ouvrez une issue GitHub
4. Contact: Christian.oussi01@gmail.com

---

## 🎉 CHECKLIST FINALE

- [ ] Node.js installé et fonctionnel
- [ ] `npm install` réussi
- [ ] `.env.local` configuré
- [ ] `npm run dev` fonctionne
- [ ] `npm run build` réussi
- [ ] Tests passent (`npm test`)
- [ ] Repository GitHub à jour
- [ ] Projet Vercel créé
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] Cache navigateur vidé
- [ ] Toutes les fonctionnalités testées

---

**🚀 Votre portfolio est maintenant déployé et sécurisé !**

**URL finale**: https://portfolio0-kappa.vercel.app (ou votre URL Vercel)

**Questions ?** Consultez les guides ou contactez-moi ! 🎯