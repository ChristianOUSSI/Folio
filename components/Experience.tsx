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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] bg-clip-text text-transparent drop-shadow-sm">
            Expériences
          </span>
        </motion.h2>

        <div className="space-y-4 w-full">
          {experienceLeft.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] flex items-center justify-center shadow-md border border-[#d4af37]/50">
                    <Briefcase className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[#8a6d1c] mb-1 uppercase tracking-wider font-semibold group-hover:text-[#d4af37] transition-colors">
                      {exp.period}
                    </p>
                    <h3 className="font-bold text-base text-[#d4af37] mb-1 font-serif">{exp.role}</h3>
                    <p className="text-xs text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-200 leading-relaxed font-serif group-hover:text-white transition-colors">{exp.description}</p>
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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="space-y-4 w-full">
          {experienceRight.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group relative cursor-default"
            >
              <div className="relative bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] flex items-center justify-center shadow-md border border-[#d4af37]/50">
                    <Briefcase className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[#8a6d1c] mb-1 uppercase tracking-wider font-semibold group-hover:text-[#d4af37] transition-colors">
                      {exp.period}
                    </p>
                    <h3 className="font-bold text-base text-[#d4af37] mb-1 font-serif">{exp.role}</h3>
                    <p className="text-xs text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-200 leading-relaxed font-serif group-hover:text-white transition-colors">{exp.description}</p>
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
