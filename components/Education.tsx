'use client';
import { motion } from 'framer-motion';

const educationLeft = [
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
];

const educationRight = [
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

export function EducationLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-8 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Formations
          </span>
        </motion.h2>

        <div className="space-y-4 w-full">
          {educationLeft.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-lg border border-blue-100 dark:border-blue-800 shadow-md overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600" />
                <div className="pl-4">
                  <h3 className="font-bold text-base text-gray-900 dark:text-blue-300 mb-1 font-serif group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">
                    {edu.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{edu.institution}</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <span>⏱️</span>
                    <span>{edu.period}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationRight() {
  return (
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col mt-4 md:mt-16">
        <div className="space-y-4 w-full">
          {educationRight.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-lg border border-blue-100 dark:border-blue-800 shadow-md overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600" />
                <div className="pl-4">
                  <h3 className="font-bold text-base text-gray-900 dark:text-blue-300 mb-1 font-serif group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">
                    {edu.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{edu.institution}</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <span>⏱️</span>
                    <span>{edu.period}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
