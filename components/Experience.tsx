'use client';

import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

// Mes expériences : un mélange de tech, de gaming et de vie réelle – chaque job m'a appris quelque chose d'unique !
const experiences = [
  {
    role: 'Conseiller Technique',
    company: 'INTELCIA CAMEROUN',
    period: 'Février 2025 – Janvier 2026',
    description: 'Conseiller auprès des clients SFR FRANCE. J\'ai appris à résoudre des problèmes complexes sous pression, tout en orientant une personne au bout du fil vers la meilleure solution un peu comme vider le cache de son ordinateur ou redémarrer sa box internet, mais à une échelle plus humaine !'
  },
  {
    role: 'Commis aux jeux vidéo',
    company: 'FUNTECH-SARL',
    period: 'Septembre 2023 – Mars 2024',
    description: 'Conseiller les clients sur les jeux. Parfait pour combiner ma passion gaming avec le travail j\'ai même recommandé des titres inspirés de mes mangas préférés !'
  },
  {
    role: 'Téléconseiller',
    company: 'IME Bonamoussadi',
    period: 'Juillet 2022 – Octobre 2023',
    description: 'Présentation de luniversite aux nouveaux bacheliers et à leurs parents au travers d\'appels de relances ou d\'sms. Ça m\'a enseigné la communication et la patience, compétences essentielles pour un dev fullstack.'
  }
];

export default function Experience() {
  return (
    <MotionSection id={slugify('Expériences')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Code symbols */}
        <span className="absolute top-20 right-20 text-3xl text-blue-200/20 dark:text-blue-700/20 font-mono">[ ]</span>
        <span className="absolute bottom-40 left-16 text-4xl text-blue-300/15 dark:text-blue-600/15 font-mono">{'</>'}</span>
        <span className="absolute top-1/2 left-8 text-2xl text-purple-300/20 dark:text-purple-600/20 font-mono">{'{ }'}</span>
        {/* Binary */}
        <span className="absolute top-1/3 right-1/4 text-xs text-blue-400/20 dark:text-blue-500/20 font-mono">11010010</span>
        <span className="absolute bottom-1/4 left-1/4 text-xs text-blue-300/15 dark:text-blue-500/15 font-mono">001011</span>
        {/* Tech dots */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/25 rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-1 h-1 bg-blue-300/20 rounded-full" />
        <div className="absolute top-2/3 left-20 w-1 h-1 bg-purple-400/20 rounded-full" />
        {/* Circuit lines */}
        <div className="absolute top-20 right-1/3 w-px h-20 bg-gradient-to-b from-blue-400/15 to-transparent" />
        <div className="absolute bottom-40 left-1/2 w-px h-16 bg-gradient-to-b from-purple-400/10 to-transparent" />
        {/* Central blur */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
          Expériences Professionnelles
        </span>
      </motion.h2>

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-20 rounded-xl blur transition duration-300" />
            
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all shadow-lg">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl shadow-md">
                  💼
                </div>
                
                <div className="flex-1">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                    {exp.period}
                  </p>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-blue-300 mb-1">{exp.role}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
