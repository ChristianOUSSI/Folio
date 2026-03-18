# 📚 Documentation - Configuration du Portfolio

## Table des matières
1. [Configuration locale](#configuration-locale)
2. [Déploiement](#déploiement)
3. [Variables d'environnement](#variables-denvironnement)
4. [Sécurité](#sécurité)
5. [Tests](#tests)
6. [Troubleshooting](#troubleshooting)

---

## Configuration locale

### Prérequis
- **Node.js** 18+ ([télécharger](https://nodejs.org))
- **npm** ou **yarn**

### Installation

1. **Clonez le repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Configurez les variables d'environnement**
```bash
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

4. **Lancez le serveur de développement**
```bash
npm run dev
```

Le portfolio est maintenant accessible à `http://localhost:3000`

---

## Déploiement

### Sur Vercel (Recommandé)

#### Portfolio Principal
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez ce repository GitHub
4. **Framework**: Next.js (détecté automatiquement)
5. **Root Directory**: `.` (racine)
6. Cliquez sur "Deploy"

#### Configuration des variables d'environnement
1. Allez dans **Settings > Environment Variables**
2. Ajoutez les variables (voir [Variables d'environnement](#variables-denvironnement))
3. Redéployez

#### Déploiement des projets individuels

**Mobile Hub, DataDash, SaaS Admin, Blade Quest** doivent être déployés séparément :

```bash
# Pour chaque projet
cd standalone-projects/[project-name]
vercel --prod
```

Configurez le **Root Directory** pour chaque projet :
- Mobile Hub: `standalone-projects/mobile-hub`
- DataDash: `standalone-projects/datadash`
- SaaS Admin: `standalone-projects/saas-admin`
- Blade Quest: `standalone-projects/blade-quest`

---

## Variables d'environnement

### Pour le Portfolio Principal

| Variable | Exemple | Obligatoire | Description |
|----------|---------|-------------|-------------|
| `RESEND_API_KEY` | `re_xxx...` | ✅ | Clé API Resend pour emails |
| `CSRF_SECRET` | N'importe quelle string | ✅ | Secret pour CSRF (change en prod) |
| `NEXT_PUBLIC_MOBILE_HUB_URL` | `https://mobile-hub.vercel.app` | ❌ | URL du hub mobile déployé |
| `NEXT_PUBLIC_SAAS_ADMIN_URL` | `https://saas-admin.vercel.app` | ❌ | URL du SaaS admin déployé |
| `NEXT_PUBLIC_BLADE_QUEST_URL` | `https://blade-quest.vercel.app` | ❌ | URL de Blade Quest déployé |
| `NEXT_PUBLIC_DATADASH_URL` | `https://datadash.vercel.app` | ❌ | URL de DataDash déployé |
| `CONTACT_TO_EMAIL` | `your-email@example.com` | ❌ | Email de destination (défaut: Christian.oussi01@gmail.com) |
| `NEXT_PUBLIC_SENTRY_DSN` | `https://xxx@sentry.io/xxx` | ❌ | Monitoring Sentry (optionnel) |

### Pour Mobile Hub & DataDash

```env
VITE_STANDALONE=true
VITE_PORTFOLIO_URL=https://portfolio0-kappa.vercel.app
```

### Pour les Services Externes

#### Resend (Emails)
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte
3. Générez une API key
4. Ajoutez-la à `RESEND_API_KEY`

#### Sentry (Error Tracking - Optionnel)
1. Allez sur [sentry.io](https://sentry.io)
2. Créez un projet
3. Copiiez le DSN
4. Ajoutez-le à `NEXT_PUBLIC_SENTRY_DSN`

---

## Sécurité

### ✅ Protections mises en place

- ✅ **XSS Protection**: Tous les inputs sont échappés avec `escape-html`
- ✅ **CSRF Token**: Validation des tokens sur le formulaire de contact
- ✅ **Rate Limiting**: 5 requêtes par heure par IP sur `/api/contact`
- ✅ **Security Headers**: Headers HTTP configurés dans `next.config.js`
- ✅ **Type Safety**: TypeScript strict mode activé

### ⚙️ Configuration recommandée en production

```env
# Générez une valeur sécurisée pour CSRF_SECRET
CSRF_SECRET=$(openssl rand -base64 32)
```

### 🔒 Firestore Security (Mobile Hub)

Si vous utilisez Firebase, configurez les règles Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Tests

### Lancer les tests

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm test -- --coverage

# Mode watch
npm test -- --watch

# UI interactive
npm test -- --ui
```

### Exemples de tests

Des tests exemple sont disponibles dans `__tests__/`:
- `contactValidation.test.ts` - Tests de validation du formulaire

---

## Troubleshooting

### Les modifications ne s'affichent pas après déploiement sur Vercel

**Solution**: Videz le cache navigateur
- **Chrome/Edge**: `Ctrl + Shift + Suppr` → Sélectionnez tout → Videz
- **Firefox**: `Ctrl + Shift + Suppr` → Sélectionnez tout → Videz
- Puis rechargez avec `Ctrl + F5`

### Erreur "RESEND_API_KEY not configured"

**Solution**: 
1. Vérifiez que `RESEND_API_KEY` est configurée dans Vercel
2. Redéployez après avoir ajouté la variable
3. Attendez 2-3 minutes que la configuration se propage

### Formulaire de contact retourne erreur 403 (CSRF)

**Causes possibles**:
- ❌ CSRF token invalide ou expiré
- ❌ Navigateur bloque les cookies

**Solution**:
- Rechargez la page (`F5`)
- Videz le cache navigateur
- Essayez un autre navigateur

### Blade Quest ne s'affiche pas

**Cause**: Canvas context non disponible (support du navigateur)

**Solution**:
- Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Activez JavaScript

### DataDash: API endswith erreur 500

**Solution**:
- Vérifiez que la variable `VITE_DATADASH_API_URL` est configurée
- Si Python API est déployée, vérifiez les logs Vercel

---

## Support

Pour toute question ou problème :
1. Consultez la documentation en ligne
2. Ouvrez une issue sur GitHub
3. Contactez: Christian.oussi01@gmail.com

---

**Dernière mise à jour**: 18 mars 2026
