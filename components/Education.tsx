"use client";
import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

const education = [
  {
    title: "Licence en Gestion des Systèmes d'Informations",
    institution: 'Université The Brains',
    period: '(en cours)'
  },
  {
    title: 'Formation en Entrepreneuriat (norme GERME)',
    institution: 'Fondation SGMC',
    period: '(Octobre 2024)'
  },
  {
    title: '1re & 2e année en Génie Logiciel',
    institution: 'Université IME Bonamoussadi',
    period: '(2021-2023)'
  },
  {
    title: 'Certification Business English & Informatique',
    institution: 'Université IME Bonamoussadi',
    period: '(Août 2021)'
  },
  {
    title: 'Baccalauréat A4 BIL ALL',
    institution: 'Lycée BIL de Bonaberi',
    period: '(2020-2021)'
  }
];

export default function Education() {
  return (
    <MotionSection id={slugify('Formations')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Soft background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-50/50 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
          Formations & Études
        </span>
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            {/* Glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-20 rounded-lg blur transition duration-300" />
            
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-lg border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all overflow-hidden shadow-md">
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600" />

              <div className="pl-4">
                <motion.h3 
                  className="font-bold text-lg text-gray-900 dark:text-blue-300 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {edu.title}
                </motion.h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{edu.institution}</p>
                
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>📅</span>
                  <span>{edu.period}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
