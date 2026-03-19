"use client";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

// Icons - using Lucide React which is already installed
import { 
  Code2, FileCode, Database, Smartphone, Globe, Palette, 
  Terminal, Box, Video, Image, Smartphone as Phone, 
  Layout, Wand2, Monitor, Cpu, Languages 
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const categories: { title: string; items: Skill[] }[] = [
  {
    title: 'Langages & Frameworks',
    items: [
      { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <FileCode className="w-4 h-4" /> },
      { name: 'React Native', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'JavaScript', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Python', icon: <Terminal className="w-4 h-4" /> },
      { name: 'Java', icon: <Cpu className="w-4 h-4" /> },
      { name: 'C#', icon: <Box className="w-4 h-4" /> },
      { name: 'C', icon: <Cpu className="w-4 h-4" /> },
      { name: 'HTML', icon: <Globe className="w-4 h-4" /> },
      { name: 'CSS', icon: <Palette className="w-4 h-4" /> },
      { name: 'WordPress', icon: <Globe className="w-4 h-4" /> },
      { name: 'FlutterFlow', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Webflow', icon: <Layout className="w-4 h-4" /> },
      { name: 'Unreal Engine 5', icon: <Box className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Outils',
    items: [
      { name: 'Visual Studio Code', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Android Studio', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'VMware', icon: <Monitor className="w-4 h-4" /> },
      { name: 'Adobe Photoshop', icon: <Image className="w-4 h-4" /> },
      { name: 'Premiere Pro', icon: <Video className="w-4 h-4" /> },
      { name: 'Filmora', icon: <Video className="w-4 h-4" /> },
      { name: 'Canva', icon: <Palette className="w-4 h-4" /> },
      { name: 'CapCut', icon: <Video className="w-4 h-4" /> },
      { name: 'Power AMC', icon: <Box className="w-4 h-4" /> },
      { name: 'Visual Basic', icon: <Code2 className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Langues',
    items: [
      { name: 'Français (natif)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Anglais (courant)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Allemand (notions)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Japonais (en apprentissage)', icon: <Languages className="w-4 h-4" /> }
    ]
  }
];

// Petit fun fact : J'ai appris Python en automatisant des tâches pour mes jeux, et Unreal Engine en rêvant de créer mon propre RPG !
const personalNote = "Ces compétences ne sont pas juste des outils elles sont nées de mes passions. Par exemple, j'ai plongé dans React après avoir vu des sites web 'magiques' comme ceux des mangas en ligne à l'instar de ANIME-SAMA";

export default function Skills() {
  return (
    <MotionSection id={slugify('Compétences')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Code symbols */}
        <span className="absolute top-16 left-20 text-4xl text-blue-200/20 dark:text-blue-700/20 font-mono">{'</>'}</span>
        <span className="absolute bottom-32 right-12 text-3xl text-purple-300/15 dark:text-purple-600/15 font-mono">[ ]</span>
        <span className="absolute top-1/3 right-20 text-2xl text-blue-300/20 dark:text-blue-600/20 font-mono">{'{ }'}</span>
        <span className="absolute bottom-20 left-1/3 text-2xl text-purple-200/15 dark:text-purple-500/15 font-mono">/* */</span>
        {/* Binary */}
        <span className="absolute top-1/4 right-1/3 text-xs text-blue-400/20 dark:text-blue-500/20 font-mono">10010110</span>
        <span className="absolute bottom-1/3 left-10 text-xs text-purple-300/15 dark:text-purple-500/15 font-mono">010110</span>
        <span className="absolute top-1/2 right-10 text-xs text-blue-300/15 dark:text-blue-500/15 font-mono">11100</span>
        {/* Tech dots */}
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-blue-400/25 rounded-full" />
        <div className="absolute bottom-1/4 left-20 w-1 h-1 bg-purple-400/20 rounded-full" />
        <div className="absolute top-2/3 right-16 w-1 h-1 bg-blue-300/20 rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-300/15 rounded-full" />
        {/* Circuit lines */}
        <div className="absolute top-32 left-1/2 w-px h-16 bg-gradient-to-b from-blue-400/15 to-transparent" />
        <div className="absolute bottom-1/3 right-1/3 w-px h-20 bg-gradient-to-b from-purple-400/10 to-transparent" />
        {/* Blur orbs */}
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
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                    className="p-2 rounded-md flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-default"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-blue-500 flex-shrink-0">{skill.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{skill.name}</span>
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
