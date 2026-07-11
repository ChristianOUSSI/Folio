'use client';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const stepsLeft = [
  {
    num: '01',
    icon: <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />,
    title: 'Découverte',
    desc: 'Discussion sur votre vision, vos objectifs et votre audience pour définir la direction du projet.',
  },
  {
    num: '02',
    icon: <PenTool className="w-5 h-5 text-slate-500 dark:text-slate-400" />,
    title: 'Conception',
    desc: 'Création de maquettes et prototypes que vous validez avant le développement.',
  },
];

const stepsRight = [
  {
    num: '03',
    icon: <Code className="w-5 h-5 text-slate-500 dark:text-slate-400" />,
    title: 'Développement',
    desc: 'Code propre, performant et responsive avec des démos régulières pour suivre l\'avancement.',
  },
  {
    num: '04',
    icon: <Rocket className="w-5 h-5 text-slate-500 dark:text-slate-400" />,
    title: 'Livraison',
    desc: 'Mise en ligne, tests finaux et formation. Support disponible pour le suivi post-lancement.',
  },
];

export function ProcessLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 font-serif">
            <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
              Mon Processus
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto font-serif text-xs md:text-sm">
            De votre idée à la livraison, une méthode claire et transparente
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 w-full">
          {stepsLeft.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="relative p-4 md:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all group flex items-start gap-4 cursor-default"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-200 dark:text-slate-700 group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-colors">
                {step.num}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {step.icon}
                  <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 font-serif">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col items-center">
        <div className="flex flex-col gap-4 w-full">
          {stepsRight.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="relative p-4 md:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all group flex items-start gap-4 cursor-default"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-200 dark:text-slate-700 group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-colors">
                {step.num}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {step.icon}
                  <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 font-serif">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
