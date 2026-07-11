'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_URLS, GITHUB_URLS } from '../lib/projectUrls';
import { Globe, Smartphone, Gamepad2, Database } from 'lucide-react';

const categories = [
  { id: 'web', label: 'Web App', icon: <Globe className="w-5 h-5" /> },
  { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'game', label: 'Jeux', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'data', label: 'Data', icon: <Database className="w-5 h-5" /> },
];

const projectsLeft = [
  {
    title: 'Mobile Hub',
    icon: <Smartphone className="w-5 h-5 md:w-7 md:h-7" />,
    category: 'mobile',
    description: 'Mon premier pas dans les apps mobiles : gestion de contacts et tâches avec React. Inspiré par mon besoin d\'organiser mes sessions de gaming et d\'écriture.',
    stack: ['React', 'Firebase', 'Tailwind'],
    image: '/projects/mobile-hub.png',
    link: PROJECT_URLS.mobileHub,
    github: GITHUB_URLS.mobileHub
  },
  {
    title: 'SaaS Admin',
    icon: <Globe className="w-5 h-5 md:w-7 md:h-7" />,
    category: 'web',
    description: "Dashboard pour gérer des utilisateurs en SaaS. J'ai adoré implémenter le CRUD et la pagination ça m'a rappelé d'organiser mes collections de mangas !",
    stack: ['Next.js 15', 'Python', 'REST API'],
    image: '/projects/saas-admin.png',
    link: PROJECT_URLS.saasAdmin,
    github: GITHUB_URLS.saasAdmin
  }
];

const projectsRight = [
  {
    title: 'Blade Quest Prototype',
    icon: <Gamepad2 className="w-5 h-5 md:w-7 md:h-7" />,
    category: 'game',
    description: 'Prototype de jeu 2D né de mes nuits passées sur Zelda et PACMAN. HTML5 Canvas m\'a permis de créer un petit monde où combattre et collecter est le seul but car oui c\'est mon rêve de game dev en action !',
    stack: ['HTML5 Canvas', 'JavaScript'],
    image: '/projects/blade-quest.png',
    link: PROJECT_URLS.bladeQuest,
    github: GITHUB_URLS.bladeQuest
  },
  {
    title: 'DataDash',
    icon: <Database className="w-5 h-5 md:w-7 md:h-7" />,
    category: 'data',
    description: 'Dashboard analytique inspiré de Power AMC. J\'ai appris Python pour l\'API backend et adoré jouer avec les graphiques comme analyser les stats de mes parties de jeu !',
    stack: ['Python', 'React', 'Recharts'],
    image: '/projects/datadash.png',
    link: PROJECT_URLS.datadash,
    github: GITHUB_URLS.datadash
  }
];

export function ProjectsLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-0 sm:py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-3 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Mes Projets
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-4 max-w-sm mx-auto text-[11px] md:text-xs font-serif"
        >
          Des idées folles transformées en code concret. Chaque projet est une aventure !
        </motion.p>

        <div className="flex flex-col gap-3 w-full">
          {projectsLeft.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
                <div className="p-3 md:p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl md:text-3xl text-blue-500">{project.icon}</span>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[10px] md:text-xs mb-2 line-clamp-2 md:line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[9px] md:text-[10px] font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all uppercase tracking-wider"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-0 sm:py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="flex flex-col gap-3 w-full">
          {projectsRight.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
                <div className="p-3 md:p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl md:text-3xl text-blue-500">{project.icon}</span>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-[10px] md:text-xs mb-2 line-clamp-2 md:line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[9px] md:text-[10px] font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all uppercase tracking-wider"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
