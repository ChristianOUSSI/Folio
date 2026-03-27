import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
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
      'hero.greeting': 'Hello, I\'m',
      'hero.title': 'Full-Stack Developer',
      'hero.subtitle': 'I create modern and performant web experiences',
      'hero.cta': 'Discover my work',
      'hero.contact': 'Contact me',
      
      // About
      'about.title': 'About Me',
      'about.description': 'Passionate developer with expertise in modern web technologies. I create elegant and performant solutions.',
      'about.journey': 'My Journey',
      'about.journeyText': 'From curiosity to passion, my journey in development has been marked by constant learning and adaptation.',
      
      // Skills
      'skills.title': 'Skills',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools',
      'skills.other': 'Other',
      
      // Experience
      'experience.title': 'Experience',
      'experience.present': 'Present',
      
      // Education
      'education.title': 'Education',
      
      // Certifications
      'certifications.title': 'Certifications',
      
      // Projects
      'projects.title': 'Projects',
      'projects.view': 'View Project',
      'projects.code': 'View Code',
      
      // Blog
      'blog.title': 'Blog',
      'blog.readMore': 'Read More',
      'blog.min': 'min read',
      
      // Contact
      'contact.title': 'Contact',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.sending': 'Sending...',
      'contact.success': 'Message sent successfully!',
      'contact.error': 'Error sending message',
      
      // Footer
      'footer.rights': 'All rights reserved',
      'footer.madeWith': 'Made with',
      
      // Launcher
      'launcher.welcome': 'Welcome to my portfolio',
      'launcher.enter': 'Enter',
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.skills': 'Compétences',
      'nav.experience': 'Expérience',
      'nav.education': 'Formation',
      'nav.certifications': 'Certifications',
      'nav.projects': 'Projets',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      
      // Hero
      'hero.greeting': 'Bonjour, je suis',
      'hero.title': 'Développeur Full-Stack',
      'hero.subtitle': 'Je crée des expériences web modernes et performantes',
      'hero.cta': 'Découvrir mon travail',
      'hero.contact': 'Me contacter',
      
      // About
      'about.title': 'À propos de moi',
      'about.description': 'Développeur passionné avec une expertise dans les technologies web modernes. Je crée des solutions élégantes et performantes.',
      'about.journey': 'Mon Parcours',
      'about.journeyText': 'De la curiosité à la passion, mon parcours en développement a été marqué par un apprentissage et une adaptation constants.',
      
      // Skills
      'skills.title': 'Compétences',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Outils',
      'skills.other': 'Autres',
      
      // Experience
      'experience.title': 'Expérience',
      'experience.present': 'Présent',
      
      // Education
      'education.title': 'Formation',
      
      // Certifications
      'certifications.title': 'Certifications',
      
      // Projects
      'projects.title': 'Projets',
      'projects.view': 'Voir le projet',
      'projects.code': 'Voir le code',
      
      // Blog
      'blog.title': 'Blog',
      'blog.readMore': 'Lire la suite',
      'blog.min': 'min de lecture',
      
      // Contact
      'contact.title': 'Contact',
      'contact.name': 'Nom',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Envoyer le message',
      'contact.sending': 'Envoi en cours...',
      'contact.success': 'Message envoyé avec succès !',
      'contact.error': 'Erreur lors de l\'envoi du message',
      
      // Footer
      'footer.rights': 'Tous droits réservés',
      'footer.madeWith': 'Fait avec',
      
      // Launcher
      'launcher.welcome': 'Bienvenue sur mon portfolio',
      'launcher.enter': 'Entrer',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
