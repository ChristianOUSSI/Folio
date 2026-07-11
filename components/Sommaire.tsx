'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export default function Sommaire() {
  const { t } = useI18n();

  // Les index correspondent aux pages dans app/page.tsx (après l'ajout de Sommaire en index 0)
  const chapters = [
    { title: t('nav.home'), page: 1 },
    { title: t('nav.about'), page: 2 },
    { title: t('nav.skills'), page: 3 },
    { title: "Statistiques", page: 4 }, // Stats
    { title: "Processus", page: 5 }, // Process
    { title: t('nav.experience'), page: 6 },
    { title: t('nav.education'), page: 7 },
    { title: t('nav.certifications'), page: 8 },
    { title: t('nav.projects'), page: 9 },
    { title: "Blog", page: 10 },
    { title: t('nav.contact'), page: 11 },
  ];

  const handleNavClick = (pageIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('book-navigate', { detail: { index: pageIndex } });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-[#1e293b] mb-4">Sommaire</h2>
        <div className="w-24 h-[2px] bg-[#d4af37] mx-auto"></div>
      </motion.div>

      <div className="flex flex-col gap-6">
        {chapters.map((chapter, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="flex items-end justify-between cursor-pointer group"
            onClick={(e) => handleNavClick(chapter.page, e)}
          >
            <span className="text-lg md:text-xl font-serif text-[#334155] group-hover:text-[#d4af37] transition-colors bg-[#f4ecd8] pr-4 relative z-10">
              {chapter.title}
            </span>
            <div className="flex-1 border-b-2 border-dotted border-gray-400 mb-2 mx-2 group-hover:border-[#d4af37] transition-colors relative z-0"></div>
            <span className="text-lg md:text-xl font-serif text-gray-500 bg-[#f4ecd8] pl-4 relative z-10 group-hover:text-[#d4af37] transition-colors">
              {chapter.page}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
