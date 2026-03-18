/**
 * URLs des projets déployés individuellement sur Vercel.
 * Configurez ces variables d'environnement dans les paramètres Vercel du portfolio.
 */
export const PROJECT_URLS = {
  mobileHub: process.env.NEXT_PUBLIC_MOBILE_HUB_URL || 'https://mobile-hub0.vercel.app',
  saasAdmin: process.env.NEXT_PUBLIC_SAAS_ADMIN_URL || 'https://saas-admin0.vercel.app',
  bladeQuest: process.env.NEXT_PUBLIC_BLADE_QUEST_URL || 'https://blade-quest.vercel.app',
  datadash: process.env.NEXT_PUBLIC_DATADASH_URL || 'https://datadash0.vercel.app',
}

export const GITHUB_URLS = {
  mobileHub: process.env.NEXT_PUBLIC_MOBILE_HUB_GITHUB || '#',
  saasAdmin: process.env.NEXT_PUBLIC_SAAS_ADMIN_GITHUB || '#',
  bladeQuest: process.env.NEXT_PUBLIC_BLADE_QUEST_GITHUB || '#',
  datadash: process.env.NEXT_PUBLIC_DATADASH_GITHUB || '#',
}
