'use client';
import { motion } from 'framer-motion';
import { PROJECT_URLS, GITHUB_URLS } from '../lib/projectUrls';
import { Globe, Smartphone, Gamepad2, Database } from 'lucide-react';
import InkText from './InkText';

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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-3 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] bg-clip-text text-transparent drop-shadow-sm">
            Mes Projets
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-[#1a0a02] mb-4 max-w-sm mx-auto text-[11px] md:text-xs font-serif"
        >
          Des idées folles transformées en code concret. Chaque projet est une aventure !
        </motion.p>

        <div className="flex flex-col gap-3 w-full">
          {projectsLeft.map((project, index) => (
              <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] flex flex-col transition-all">
                <div className="p-3 md:p-4 flex flex-col h-full items-center text-center">
                  <div className="flex items-center gap-2 mb-1 justify-center">
                    <span className="text-2xl md:text-3xl text-[#d4af37]">{project.icon}</span>
                    <h3 className="text-sm md:text-base font-bold text-[#d4af37] font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors text-[10px] md:text-xs mb-2 line-clamp-2 md:line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-[9px] md:text-[10px] rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto w-full justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] text-[#1a0a02] text-[9px] md:text-[10px] font-bold rounded-lg text-center hover:from-[#f9e596] hover:to-[#d4af37] transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-[#1a0a02] border border-[#8a6d1c] text-[#d4af37] text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-[#2a1305] transition-all uppercase tracking-wider"
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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="flex flex-col gap-3 w-full">
          {projectsRight.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] flex flex-col transition-all">
                <div className="p-3 md:p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl md:text-3xl text-[#d4af37]">{project.icon}</span>
                    <h3 className="text-sm md:text-base font-bold text-[#d4af37] font-serif">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors text-[10px] md:text-xs mb-2 line-clamp-2 md:line-clamp-3 font-serif">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-1.5 py-0.5 bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-[9px] md:text-[10px] rounded-md font-medium"
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
                      className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] text-[#1a0a02] text-[9px] md:text-[10px] font-bold rounded-lg text-center hover:from-[#f9e596] hover:to-[#d4af37] transition-all uppercase tracking-wider"
                    >
                      Voir →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-[#1a0a02] border border-[#8a6d1c] text-[#d4af37] text-[9px] md:text-[10px] font-bold rounded-lg hover:bg-[#2a1305] transition-all uppercase tracking-wider"
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
