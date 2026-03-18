"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  return (
    <section id={slugify('Accueil')} className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-blue-950/50 dark:to-slate-900 overflow-hidden">
      {/* Tech particle background */}
      <ParticleBackground />
      
      {/* Soft background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="z-10 max-w-2xl">
        {/* Profile image with soft border */}
        <motion.div 
          className="mx-auto w-48 h-48 relative mb-8 rounded-full p-1 bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900"
          animate={{ boxShadow: ['0 0 30px rgba(37,99,235,0.2)', '0 0 50px rgba(37,99,235,0.3)', '0 0 30px rgba(37,99,235,0.2)'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-blue-900 shadow-lg">
            <Image
              src="/img.jpg"
              alt="Portrait de Joseph Christian Josué OUSSI"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
            Joseph Christian Josué OUSSI
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-3">
            Artisan du Code & des Mondes Virtuels
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-4">
            De l'exploration de mondes virtuels à la création d'apps réelles je transforme les idées en code, une ligne à la fois.
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
            Code * Jeux * Mangas * Histoires * Innovation * Fun
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projets"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>Voir mes projets</span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>📡</span>
              <span>Me contacter</span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-blue-400 dark:text-blue-500 text-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="flex flex-col items-center gap-2">
          <span>Découvrir</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
