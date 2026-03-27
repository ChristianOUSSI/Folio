'use client';

import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

const steps = [
  {
    num: '01',
    icon: '◈',
    title: 'Découverte',
    desc: 'Discussion sur votre vision, vos objectifs et votre audience pour définir la direction du projet.',
  },
  {
    num: '02',
    icon: '◇',
    title: 'Conception',
    desc: 'Création de maquettes et prototypes que vous validez avant le développement.',
  },
  {
    num: '03',
    icon: '⬡',
    title: 'Développement',
    desc: 'Code propre, performant et responsive avec des démos régulières pour suivre l\'avancement.',
  },
  {
    num: '04',
    icon: '⬢',
    title: 'Livraison',
    desc: 'Mise en ligne, tests finaux et formation. Support disponible pour le suivi post-lancement.',
  },
];

export default function Process() {
  return (
    <MotionSection id={slugify('Processus')} className="py-20 px-4 bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
              Mon Processus
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            De votre idée à la livraison, une méthode claire et transparente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all group"
            >
              {/* Step number */}
              <div className="text-5xl font-bold text-slate-200 dark:text-slate-700 mb-4 group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-colors">
                {step.num}
              </div>
              
              {/* Icon */}
              <div className="text-2xl mb-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
              
              {/* Connector line (except last) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-300 dark:bg-slate-600" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
