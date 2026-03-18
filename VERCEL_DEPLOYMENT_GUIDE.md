# Guide de Déploiement Vercel - Portfolio Complet

Ce guide explique comment déployer le portfolio principal et les 4 projets individuels sur Vercel, avec des liens bidirectionnels fonctionnels vers https://oussidev.vercel.app

## Architecture

```
https://oussidev.vercel.app (Portfolio Principal)
    │
    ├──► Mobile Hub     ◄──lien vers portfolio
    ├──► SaaS Admin     ◄──lien vers portfolio  
    ├──► Blade Quest    ◄──lien vers portfolio
    └──► DataDash      ◄──lien vers portfolio
```

---

## Déploiement du Portfolio Principal (OUSSI DEV)

### Étape 1 : Déployer le portfolio
1. Allez sur [vercel.com](https://vercel.com)
2. Importez ce repository GitHub
3. Framework Preset : **Next.js**
4. Déployer

### Étape 2 : Configurer les variables d'environnement
Après avoir déployé chaque projet individuel, allez dans les **Settings > Environment Variables** du portfolio et ajoutez :

| Nom | Valeur |
|-----|---------|
| `NEXT_PUBLIC_MOBILE_HUB_URL` | URL de Mobile Hub (ex: https://mobile-hub.vercel.app) |
| `NEXT_PUBLIC_SAAS_ADMIN_URL` | URL de SaaS Admin (ex: https://saas-admin.vercel.app) |
| `NEXT_PUBLIC_BLADE_QUEST_URL` | URL de Blade Quest (ex: https://blade-quest.vercel.app) |
| `NEXT_PUBLIC_DATADASH_URL` | URL de DataDash (ex: https://datadash.vercel.app) |

### Étape 3 : Redéployer
Après avoir ajouté les variables, cliquez sur **Deployments** et redéployez la dernière version.

---

## Déploiement des Projets Individuels

### 1. Mobile Hub (React + Vite)
```bash
cd standalone-projects/mobile-hub
vercel --prod
```
- Framework : **Vite**
- Le lien vers le portfolio est déjà configuré par défaut vers `https://oussidev.vercel.app`

### 2. SaaS Admin (Next.js 15)
```bash
cd standalone-projects/saas-admin
vercel --prod
```
- Framework : **Next.js**
- Le lien vers le portfolio est déjà configuré par défaut vers `https://oussidev.vercel.app`

### 3. Blade Quest (HTML5 Game)
```bash
cd standalone-projects/blade-quest
vercel --prod
```
- Framework : **Other** (static)
- Le lien vers le portfolio est déjà configuré par défaut vers `https://oussidev.vercel.app`

### 4. DataDash (React + Vite)
```bash
cd standalone-projects/datadash
vercel --prod
```
- Framework : **Vite**
- Le lien vers le portfolio est déjà configuré par défaut vers `https://oussidev.vercel.app`

---

## Ordre de Déploiement Recommandé

1. **Déployer le portfolio principal** sur Vercel et obtenir l'URL
2. **Déployer les 4 projets** un par un
3. **Configurer les variables** dans le portfolio avec les URLs des projets
4. **Redéployer le portfolio** pour appliquer les changements

---

## Résumé des URLs

Une fois déployé, vos URLs seront :

```
Portfolio:      https://oussidev.vercel.app
Mobile Hub:     https://mobile-hub.vercel.app
SaaS Admin:     https://saas-admin.vercel.app
Blade Quest:    https://blade-quest.vercel.app
DataDash:       https://datadash.vercel.app
```

---

## Dépannage

**Les liens des projets ne fonctionnent pas dans le portfolio ?**
1. Vérifiez que les variables d'environnement sont configurées
2. Redéployez le portfolio après chaque changement
3. Les URLs ne doivent PAS finir par un slash `/`

**Les projets ne pointent pas vers le portfolio ?**
- Les liens sont déjà configurés par défaut vers `https://oussidev.vercel.app`
- Si vous voulez changer, modifiez les fichiers :
  - `standalone-projects/mobile-hub/src/App.tsx`
  - `standalone-projects/saas-admin/app/layout.tsx`
  - `standalone-projects/blade-quest/index.html`
  - `standalone-projects/datadash/src/App.tsx`
