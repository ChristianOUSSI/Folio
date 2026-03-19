'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';
import { PROJECT_URLS, GITHUB_URLS } from '../lib/projectUrls';

// Catégories pour filtrer les projets
const categories = [
  { id: 'all', label: 'Tous', icon: '✨' },
  { id: 'web', label: 'Web App', icon: '🌐' },
  { id: 'mobile', label: 'Mobile', icon: '📱' },
  { id: 'game', label: 'Jeux', icon: '🎮' },
  { id: 'data', label: 'Data', icon: '📊' },
];

// Chaque projet ici est une aventure – de mes idées folles à du code réel !
const projects = [
  {
    title: 'Mobile Hub',
    icon: '🔧',
    category: 'mobile',
    description: 'Mon premier pas dans les apps mobiles : gestion de contacts et tâches avec React. Inspiré par mon besoin d\'organiser mes sessions de gaming et d\'écriture.',
    stack: ['React', 'Firebase', 'Tailwind'],
    image: '/projects/mobile-hub.png',
    link: PROJECT_URLS.mobileHub,
    github: GITHUB_URLS.mobileHub
  },
  {
    title: 'SaaS Admin',
    icon: '⚙️',
    category: 'web',
    description: "Dashboard pour gérer des utilisateurs en SaaS. J'ai adoré implémenter le CRUD et la pagination ça m'a rappelé d'organiser mes collections de mangas !",
    stack: ['Next.js 15', 'Python', 'REST API'],
    image: '/projects/saas-admin.png',
    link: PROJECT_URLS.saasAdmin,
    github: GITHUB_URLS.saasAdmin
  },
  {
    title: 'Blade Quest Prototype',
    icon: '⚔️',
    category: 'game',
    description: 'Prototype de jeu 2D né de mes nuits passées sur Zelda et PACMAN. HTML5 Canvas m\'a permis de créer un petit monde où combattre et collecter est le seul but car oui c\'est mon rêve de game dev en action !',
    stack: ['HTML5 Canvas', 'JavaScript'],
    image: '/projects/blade-quest.png',
    link: PROJECT_URLS.bladeQuest,
    github: GITHUB_URLS.bladeQuest
  },
  {
    title: 'DataDash',
    icon: '📊',
    category: 'data',
    description: 'Dashboard analytique inspiré de Power AMC. J\'ai appris Python pour l\'API backend et adoré jouer avec les graphiques comme analyser les stats de mes parties de jeu !',
    stack: ['Python', 'React', 'Recharts'],
    image: '/projects/datadash.png',
    link: PROJECT_URLS.datadash,
    github: GITHUB_URLS.datadash
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <MotionSection id={slugify('Projets')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating tech dots */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400/20 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-500/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-blue-300/15 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-blue-400/20 rounded-full" />
        
        {/* Subtle circuit lines */}
        <div className="absolute top-10 left-1/2 w-px h-20 bg-gradient-to-b from-blue-400/20 to-transparent" />
        <div className="absolute bottom-20 right-1/3 w-px h-16 bg-gradient-to-b from-blue-400/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center"
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
          className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Des idées folles transformées en code concret. Chaque projet est une aventure !
        </motion.p>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-30 rounded-2xl blur transition duration-300" />
                
                <div className="relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-blue-600 transition-all shadow-lg hover:shadow-xl">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{project.icon}</span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-blue-600/90 text-white text-xs rounded-full">
                      {categories.find(c => c.id === project.category)?.label}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        Voir le projet →
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
                      >
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
          >
            <span className="text-4xl mb-4 block">🔍</span>
            <p>Aucun projet dans cette catégorie pour le moment.</p>
          </motion.div>
        )}
      </div>
    </MotionSection>
  );
}
