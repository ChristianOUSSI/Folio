'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import InkText from './InkText';

export function SommaireLeft() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
          <InkText>Sommaire</InkText>
        </h2>
        <div className="w-32 h-[3px] bg-slate-700 mx-auto mb-8"></div>
        <p className="text-slate-800 font-serif italic max-w-sm mx-auto">
          "Un voyage à travers mes expériences, compétences et réalisations en développement web."
        </p>
      </motion.div>
    </div>
  );
}

export function SommaireRight() {
  const { t } = useI18n();

  // Mapping based on the exact index of the spread components we will pass to BookContainer
  const chapters = [
    { title: t('nav.home'), page: 1 },
    { title: t('nav.about'), page: 2 },
    { title: t('nav.skills'), page: 3 },
    { title: "Statistiques", page: 4 },
    { title: "Processus", page: 5 },
    { title: t('nav.experience'), page: 6 },
    { title: t('nav.certifications'), page: 7 },
    { title: t('nav.projects'), page: 8 },
    { title: "Blog", page: 9 },
    { title: t('nav.contact'), page: 10 },
  ];

  const handleNavClick = (pageIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    // We dispatch the index corresponding to the right page of the target spread (2 * spreadIndex - 1) 
    // Or in the new architecture, the navbar index directly maps to the spread.
    const event = new CustomEvent('book-navigate', { detail: { index: pageIndex } });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-full my-auto flex flex-col px-4 sm:px-8 py-12">
      <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
        {chapters.map((chapter, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="flex items-end justify-between cursor-pointer group"
            onClick={(e) => handleNavClick(chapter.page, e)}
          >
            <span className="text-lg md:text-xl font-serif text-slate-900 group-hover:text-slate-600 transition-colors bg-[#f4ecd8] pr-4 relative z-10">
              {chapter.title}
            </span>
            <div className="flex-1 border-b-2 border-dotted border-slate-400 mb-2 mx-2 group-hover:border-slate-600 transition-colors relative z-0"></div>
            <span className="text-lg md:text-xl font-serif text-slate-800 bg-[#f4ecd8] pl-4 relative z-10 group-hover:text-slate-600 transition-colors">
              {chapter.page}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
