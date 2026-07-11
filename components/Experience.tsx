'use client';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experienceLeft = [
  {
    role: 'Conseiller Technique',
    company: 'INTELCIA CAMEROUN',
    period: 'Février 2025 – Janvier 2026',
    description: 'Conseiller auprès des clients SFR FRANCE. J\'ai appris à résoudre des problèmes complexes sous pression, tout en orientant une personne au bout du fil vers la meilleure solution un peu comme vider le cache de son ordinateur ou redémarrer sa box internet, mais à une échelle plus humaine !'
  },
];

const experienceRight = [
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

export function ExperienceLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-0 sm:py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Expériences
          </span>
        </motion.h2>

        <div className="space-y-4 w-full">
          {experienceLeft.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-800 dark:text-slate-200 mb-1 uppercase tracking-wider font-semibold">
                      {exp.period}
                    </p>
                    <h3 className="font-bold text-base text-slate-950 dark:text-white mb-1 font-serif group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{exp.role}</h3>
                    <p className="text-xs text-slate-800 dark:text-slate-200 mb-2">{exp.company}</p>
                    <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-serif">{exp.description}</p>
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

export function ExperienceRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-0 sm:py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="space-y-4 w-full">
          {experienceRight.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-800 dark:text-slate-200 mb-1 uppercase tracking-wider font-semibold">
                      {exp.period}
                    </p>
                    <h3 className="font-bold text-base text-slate-950 dark:text-white mb-1 font-serif group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{exp.role}</h3>
                    <p className="text-xs text-slate-800 dark:text-slate-200 mb-2">{exp.company}</p>
                    <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-serif">{exp.description}</p>
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
