'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_URLS, GITHUB_URLS } from '../lib/projectUrls';

const categories = [
  { id: 'web', label: 'Web App', icon: '◈' },
  { id: 'mobile', label: 'Mobile', icon: '◉' },
  { id: 'game', label: 'Jeux', icon: '⬢' },
  { id: 'data', label: 'Data', icon: '◇' },
];

const projectsLeft = [
  {
    title: 'Mobile Hub',
    icon: '◉',
    category: 'mobile',
    description: 'Mon premier pas dans les apps mobiles : gestion de contacts et tâches avec React. Inspiré par mon besoin d\'organiser mes sessions de gaming et d\'écriture.',
    stack: ['React', 'Firebase', 'Tailwind'],
    image: '/projects/mobile-hub.png',
    link: PROJECT_URLS.mobileHub,
    github: GITHUB_URLS.mobileHub
  },
  {
    title: 'SaaS Admin',
    icon: '◈',
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
    icon: '⬢',
    category: 'game',
    description: 'Prototype de jeu 2D né de mes nuits passées sur Zelda et PACMAN. HTML5 Canvas m\'a permis de créer un petit monde où combattre et collecter est le seul but car oui c\'est mon rêve de game dev en action !',
    stack: ['HTML5 Canvas', 'JavaScript'],
    image: '/projects/blade-quest.png',
    link: PROJECT_URLS.bladeQuest,
    github: GITHUB_URLS.bladeQuest
  },
  {
    title: 'DataDash',
    icon: '◇',
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
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
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
          className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto text-xs font-serif"
        >
          Des idées folles transformées en code concret. Chaque projet est une aventure !
        </motion.p>

        <div className="flex flex-col gap-6 w-full">
          {projectsLeft.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl text-blue-500">{project.icon}</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] rounded-md font-medium"
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
                      className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-[10px] font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all uppercase tracking-wider"
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
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col mt-4 md:mt-24">
        <div className="flex flex-col gap-6 w-full">
          {projectsRight.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl text-blue-500">{project.icon}</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] rounded-md font-medium"
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
                      className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-[10px] font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all uppercase tracking-wider"
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
