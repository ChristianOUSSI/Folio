'use client';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, School, Languages } from 'lucide-react';

const educationLeft = [
  {
    title: "Licence en Gestion des Systèmes d'Informations",
    institution: 'Université The Brains',
    period: '(en cours)',
    icon: <GraduationCap className="w-5 h-5 text-blue-500" />,
  },
  {
    title: 'Formation en Entrepreneuriat (norme GERME)',
    institution: 'Fondation SGMC',
    period: '(Octobre 2024)',
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
  },
];

const educationRight = [
  {
    title: '1re & 2e année en Génie Logiciel',
    institution: 'Université IME Bonamoussadi',
    period: '(2021-2023)',
    icon: <School className="w-5 h-5 text-blue-500" />,
  },
  {
    title: 'Certification Business English & Informatique',
    institution: 'Université IME Bonamoussadi',
    period: '(Août 2021)',
    icon: <Languages className="w-5 h-5 text-blue-500" />,
  },
  {
    title: 'Baccalauréat A4 BIL ALL',
    institution: 'Lycée BIL de Bonaberi',
    period: '(2020-2021)',
    icon: <Award className="w-5 h-5 text-blue-500" />,
  }
];

export function EducationLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Formations
          </span>
        </motion.h2>

        <div className="space-y-3 w-full">
          {educationLeft.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg overflow-hidden transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600" />
                <div className="pl-4 flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">{edu.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-1 font-serif group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                      {edu.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      {edu.period}
                    </p>
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

export function EducationRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="space-y-3 w-full">
          {educationRight.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg overflow-hidden transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600" />
                <div className="pl-4 flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">{edu.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-1 font-serif group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                      {edu.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      {edu.period}
                    </p>
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
