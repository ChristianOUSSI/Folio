'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export function HeroLeft() {
  const { t } = useI18n();
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Profile image - Yugo Eliacman style silhouette */}
      <motion.div 
        className="mx-auto w-48 h-48 sm:w-56 sm:h-56 relative mb-8 rounded-full p-1 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600"
        animate={{ boxShadow: ['0 0 20px rgba(100,116,139,0.2)', '0 0 30px rgba(71,85,105,0.3)', '0 0 20px rgba(100,116,139,0.2)'] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />
          <Image
            src="/img.jpg"
            alt="Portrait de Joseph Christian Josué OUSSI"
            fill
            className="object-cover object-center grayscale-[30%] contrast-110"
            priority
            sizes="192px"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 font-serif">
          <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">Bienvenue</span>
        </h2>
        <div className="flex flex-col gap-1 italic text-slate-800 text-sm">
          <p>Welcome</p>
          <p>ようこそ</p>
          <p>Willkommen</p>
        </div>
      </motion.div>
    </section>
  );
}

export function HeroRight() {
  const { t } = useI18n();
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent leading-tight text-center" style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}>
          OJCJ
        </h1>
        <div className="w-16 h-1 bg-slate-600 rounded-full"></div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center max-w-md"
      >
        <p className="text-base md:text-lg text-slate-900 leading-relaxed font-serif">
          {t('hero.description')}
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col w-full max-w-xs gap-4 mt-2"
      >
        <motion.a
          href="#projets"
          className="w-full px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-center"
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('book-navigate', { detail: { index: 9 } }));
          }}
        >
          {t('hero.viewProjects')}
        </motion.a>
        <motion.a
          href="#contact"
          className="w-full px-6 py-3 border-2 border-slate-700 text-slate-800 font-bold rounded-full hover:bg-slate-200/50 transition-all text-center"
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('book-navigate', { detail: { index: 11 } }));
          }}
        >
          {t('hero.contact')}
        </motion.a>
      </motion.div>
    </section>
  );
}
