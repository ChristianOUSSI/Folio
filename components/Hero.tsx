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
        className="mx-auto w-48 h-48 sm:w-56 sm:h-56 relative mb-8 rounded-full p-1 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-700"
        animate={{ boxShadow: ['0 0 30px rgba(245,158,11,0.3)', '0 0 50px rgba(249,115,22,0.4)', '0 0 30px rgba(245,158,11,0.3)'] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-orange-900 shadow-lg">
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
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 font-serif">
          Bienvenue
        </h2>
        <div className="flex flex-col gap-1 italic text-gray-500 text-sm">
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
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight text-center" style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}>
          OJCJ
        </h1>
        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8 text-center max-w-md"
      >
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-serif">
          {t('hero.description')}
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col w-full max-w-xs gap-4 mt-2"
      >
        <motion.a
          href="#projets"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('book-navigate', { detail: { index: 9 } }));
          }}
        >
          {t('hero.viewProjects')}
        </motion.a>
        <motion.a
          href="#contact"
          className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
