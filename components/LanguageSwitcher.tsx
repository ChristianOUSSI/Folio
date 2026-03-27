'use client';

import { useI18n } from '../lib/i18n';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-4 right-4 z-[10000] flex items-center gap-1 bg-slate-900/80 backdrop-blur-md rounded-full p-1 border border-slate-700/50"
    >
      <button
        onClick={() => setLocale('fr')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          locale === 'fr'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          locale === 'en'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        EN
      </button>
    </motion.div>
  );
}
