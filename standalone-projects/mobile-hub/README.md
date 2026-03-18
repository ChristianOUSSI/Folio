# Mobile Hub

Application web de gestion de contacts et tâches (similaire React Native + Firebase).

## Fonctionnalités (80% func)
- CRUD complet contacts (nom, email, phone)
- CRUD tâches (titre, desc, date échéance, toggle complet)
- Recherche temps réel
- Persistance localStorage (mock Firebase)
- Design mobile-first, responsive
- Lien vers portfolio

## Lancement local
```bash
cd standalone-projects/mobile-hub
npm install
npm run dev
```

## Déploiement Vercel
1. `npm run build`
2. Push Git repo
3. `vercel --prod`
- Auto-detect Vite static.

## Firebase réel (optionnel)
Ajouter Firebase SDK, config realtime DB/firestore pour sync.

Replace portfolio URL in App.tsx with your Vercel portfolio URL.

