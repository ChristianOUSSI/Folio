"use client";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

const categories = [
  {
    title: 'Langages & Frameworks',
    items: [
      'WordPress',
      'C#',
      'JavaScript',
      'Java',
      'C',
      'Python',
      'React Native',
      'TypeScript',
      'HTML',
      'CSS',
      'Unreal Engine 5',
      'Webflow',
      'FlutterFlow',
      'Next.js'
    ]
  },
  {
    title: 'Outils',
    items: [
      'Filmora',
      'Adobe Photoshop',
      'VMware',
      'Visual Studio Code',
      'Visual Basic',
      'Android Studio',
      'Power AMC',
      'Canva',
      'Premiere Pro',
      'CapCut'
    ]
  },
  {
    title: 'Langues',
    items: ['Français (natif)', 'Anglais (courant)', 'Allemand (notions)', 'Japonais (en apprentissage)']
  }
];

// Petit fun fact : J'ai appris Python en automatisant des tâches pour mes jeux, et Unreal Engine en rêvant de créer mon propre RPG !
const personalNote = "Ces compétences ne sont pas juste des outils elles sont nées de mes passions. Par exemple, j'ai plongé dans React après avoir vu des sites web 'magiques' comme ceux des mangas en ligne à l'instar de ANIME-SAMA";

export default function Skills() {
  return (
    <MotionSection id={slugify('Compétences')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Soft background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-50/50 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
          Compétences
        </span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {categories.map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-blue-200 dark:from-blue-700 dark:to-blue-800 opacity-0 group-hover:opacity-20 rounded-xl blur transition duration-300" />
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition shadow-lg">
              <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-300 mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                    className="p-2 rounded-md flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-default"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-blue-500">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personal note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-center"
      >
        <p className="text-gray-700 dark:text-gray-200 italic">{personalNote}</p>
      </motion.div>
    </MotionSection>
  );
}
