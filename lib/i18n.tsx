'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'fr' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Launcher
    'launcher.line1': '> Initialisation du système..._',
    'launcher.line2': '> Chargement des projets..._',
    'launcher.line3': '> Connexion au réseau..._',
    'launcher.line4': '> Prêt à explorer_',
    'launcher.discover': 'EXPLORER',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expériences',
    'nav.education': 'Formations',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Bienvenue dans mon monde',
    'hero.welcome.en': 'Welcome to my world',
    'hero.welcome.de': 'Willkommen in meiner Welt',
    'hero.welcome.jp': '私の世界へようこそ',
    'hero.description': "De l'exploration de mondes virtuels à la création d'apps réelles je transforme les idées en code, une ligne à la fois.",
    'hero.viewProjects': 'Voir mes projets',
    'hero.contact': 'Me contacter',
    
    // About
    'about.title': 'À propos de moi',
    'about.subtitle': 'Développeur Fullstack passionné par les récits interactifs',
    'about.description1': "Étudiant en cours d'obtention de ma Licence en Gestion des Systèmes d'Informations à l'Université The Brains, je suis motivé, créatif, innovant, passionné par la technologie et dynamique. Je mets mon expertise et mes compétences en constante évolution au service de vos projets et entreprises.",
    'about.passions': 'Passions & Centres d\'intérêt',
    'about.passionsDesc': "Lecteur passionné de mangas comme Dragon Ball, HxH et Naruto, j'écris des histoires sur Wattpad pour explorer des mondes imaginaires. Gamer invétéré, j'ai passé des nuits blanches sur NEOGEO, ZUMA et les GTA, ce qui m'a appris la persévérance et la résolution de problèmes complexes.",
    'about.journey': 'Mon parcours personnel',
    'about.journeyDesc': "Tout a commencé avec un vieux Laptop HP sous Windows 7, où j'ai découvert les jeux vidéo. J'ai essayé de \"cracker\" un jeu PPSSPP en y ajoutant des savedatas pour avoir tous les personnages, (oui, c'était illégal et de la triche, mais éducatif !) et ça m'a fasciné. J'ai commencé à apprendre le HTML/CSS en allant sur youtube et en modifiant des sites web, puis le JavaScript pour créer des petits scripts. Cette curiosité m'a poussé vers l'université au Cameroun, où j'ai plongé dans le développement fullstack. Chaque projet, comme ce portfolio, est une aventure inspiré par les mangas que je dévore et les mondes virtuels que j'explore. Et oui, j'ai encore ce vieux PC et je l'utilise toujours au lieu de virtualiser, comme un rappel de mes débuts !",
    
    // Skills
    'skills.title': 'Compétences',
    'skills.languages': 'Langages',
    'skills.frameworks': 'Frameworks & Plateformes',
    'skills.devTools': 'Outils de Développement',
    'skills.creativeTools': 'Outils Créatifs',
    'skills.businessTools': 'Outils Métier',
    'skills.languages2': 'Langues',
    'skills.note': "Ces compétences ne sont pas juste des outils elles sont nées de mes passions. Par exemple, j'ai plongé dans React après avoir vu des sites web 'magiques' comme ceux des mangas en ligne à l'instar de ANIME-SAMA",
    
    // Experience
    'experience.title': 'Expériences Professionnelles',
    
    // Education
    'education.title': 'Formations & Études',
    
    // Certifications
    'certifications.title': 'Certifications',
    
    // Projects
    'projects.title': 'Mes Projets',
    'projects.description': "Des idées folles transformées en code concret. Chaque projet est une aventure !",
    'projects.all': 'Tous',
    'projects.web': 'Web App',
    'projects.mobile': 'Mobile',
    'projects.game': 'Jeux',
    'projects.data': 'Data',
    'projects.viewProject': 'Voir le projet →',
    'projects.github': 'GitHub',
    'projects.noResults': 'Aucun projet dans cette catégorie pour le moment.',
    
    // Blog
    'blog.title': 'Blog & Articles',
    'blog.description': "Mes réflexions, tutoriels et partagent sur mon parcours dans le développement.",
    'blog.featured': 'Article en vedette',
    'blog.read': 'Lire',
    'blog.readArticle': "Lire l'article →",
    'blog.newsletter': 'Restez informé !',
    'blog.newsletterDesc': "Entrez votre nom complet ou votre profil LinkedIn pour recevoir mes dernières publications.",
    'blog.subscribe': "S'abonner",
    'blog.subscribeSuccess': 'Merci ! Je vous contacte bientôt.',
    
    // Contact
    'contact.title': 'Me Contacter',
    'contact.description': 'Une question, un projet, ou simplement envie de discuter ? N\'hésitez pas à me laisser un message !',
    'contact.name': 'Nom',
    'contact.namePlaceholder': 'Votre nom',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'votre@email.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Votre message...',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi...',
    'contact.success': 'Message envoyé !',
    'contact.successDesc': 'Merci pour votre message. Je vous répondrai rapidement.',
    'contact.phones': 'Téléphones',
    'contact.emails': 'Emails',
    'contact.location': 'Localisation',
    
    // Stats
    'stats.projects': 'Projets réalisés',
    'stats.certifications': 'Certifications',
    'stats.experience': "Années d'expérience",
    'stats.passion': 'Passion',
    
    // Process
    'process.title': 'Mon Processus',
    'process.description': 'De votre idée à la livraison, une méthode claire et transparente',
    'process.discovery': 'Découverte',
    'process.discoveryDesc': 'Discussion sur votre vision, vos objectifs et votre audience pour définir la direction du projet.',
    'process.design': 'Conception',
    'process.designDesc': 'Création de maquettes et prototypes que vous validez avant le développement.',
    'process.development': 'Développement',
    'process.developmentDesc': "Code propre, performant et responsive avec des démos régulières pour suivre l'avancement.",
    'process.delivery': 'Livraison',
    'process.deliveryDesc': 'Mise en ligne, tests finaux et formation. Support disponible pour le suivi post-lancement.',
    
    // ScrollTop
    'scrollTop.tooltip': 'Retour en haut',
  },
  en: {
    // Launcher
    'launcher.line1': '> System initialization..._',
    'launcher.line2': '> Loading projects..._',
    'launcher.line3': '> Connecting to network..._',
    'launcher.line4': '> Ready to explore_',
    'launcher.discover': 'EXPLORE',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Welcome to my world',
    'hero.welcome.en': 'Welcome to my world',
    'hero.welcome.de': 'Willkommen in meiner Welt',
    'hero.welcome.jp': '私の世界へようこそ',
    'hero.description': 'From exploring virtual worlds to creating real apps, I transform ideas into code, one line at a time.',
    'hero.viewProjects': 'View my projects',
    'hero.contact': 'Contact me',
    
    // About
    'about.title': 'About me',
    'about.subtitle': 'Fullstack Developer passionate about interactive storytelling',
    'about.description1': "Currently pursuing my Bachelor's degree in Information Systems Management at The Brains University, I am motivated, creative, innovative, passionate about technology and dynamic. I put my expertise and constantly evolving skills at the service of your projects and businesses.",
    'about.passions': 'Passions & Interests',
    'about.passionsDesc': "Passionate reader of manga like Dragon Ball, HxH and Naruto, I write stories on Wattpad to explore imaginary worlds. Avid gamer, I spent sleepless nights on NEOGEO, ZUMA and GTA, which taught me perseverance and solving complex problems.",
    'about.journey': 'My personal journey',
    'about.journeyDesc': "It all started with an old HP Laptop running Windows 7, where I discovered video games. I tried to \"crack\" a PPSSPP game by adding savedatas to get all the characters, (yes, it was illegal and cheating, but educational!) and it fascinated me. I started learning HTML/CSS by going on youtube and modifying websites, then JavaScript to create small scripts. This curiosity pushed me to university in Cameroon, where I dove into fullstack development. Every project, like this portfolio, is an adventure inspired by the manga I devour and the virtual worlds I explore. And yes, I still have that old PC and I still use it instead of virtualizing, as a reminder of my beginnings!",
    
    // Skills
    'skills.title': 'Skills',
    'skills.languages': 'Languages',
    'skills.frameworks': 'Frameworks & Platforms',
    'skills.devTools': 'Development Tools',
    'skills.creativeTools': 'Creative Tools',
    'skills.businessTools': 'Business Tools',
    'skills.languages2': 'Languages',
    'skills.note': "These skills are not just tools they were born from my passions. For example, I dove into React after seeing 'magical' websites like online manga sites like ANIME-SAMA",
    
    // Experience
    'experience.title': 'Professional Experience',
    
    // Education
    'education.title': 'Education & Studies',
    
    // Certifications
    'certifications.title': 'Certifications',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.description': 'Crazy ideas transformed into concrete code. Every project is an adventure!',
    'projects.all': 'All',
    'projects.web': 'Web App',
    'projects.mobile': 'Mobile',
    'projects.game': 'Games',
    'projects.data': 'Data',
    'projects.viewProject': 'View project →',
    'projects.github': 'GitHub',
    'projects.noResults': 'No projects in this category at the moment.',
    
    // Blog
    'blog.title': 'Blog & Articles',
    'blog.description': 'My thoughts, tutorials and sharing about my journey in development.',
    'blog.featured': 'Featured article',
    'blog.read': 'Read',
    'blog.readArticle': 'Read article →',
    'blog.newsletter': 'Stay informed!',
    'blog.newsletterDesc': 'Enter your full name or LinkedIn profile to receive my latest publications.',
    'blog.subscribe': 'Subscribe',
    'blog.subscribeSuccess': 'Thank you! I will contact you soon.',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.description': 'A question, a project, or just want to chat? Feel free to leave me a message!',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Your message...',
    'contact.send': 'Send message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent!',
    'contact.successDesc': 'Thank you for your message. I will reply quickly.',
    'contact.phones': 'Phones',
    'contact.emails': 'Emails',
    'contact.location': 'Location',
    
    // Stats
    'stats.projects': 'Projects completed',
    'stats.certifications': 'Certifications',
    'stats.experience': 'Years of experience',
    'stats.passion': 'Passion',
    
    // Process
    'process.title': 'My Process',
    'process.description': 'From your idea to delivery, a clear and transparent method',
    'process.discovery': 'Discovery',
    'process.discoveryDesc': 'Discussion about your vision, goals and audience to define the project direction.',
    'process.design': 'Design',
    'process.designDesc': 'Creation of mockups and prototypes that you validate before development.',
    'process.development': 'Development',
    'process.developmentDesc': 'Clean, performant and responsive code with regular demos to track progress.',
    'process.delivery': 'Delivery',
    'process.deliveryDesc': 'Go-live, final testing and training. Support available for post-launch follow-up.',
    
    // ScrollTop
    'scrollTop.tooltip': 'Back to top',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations[typeof locale]] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
