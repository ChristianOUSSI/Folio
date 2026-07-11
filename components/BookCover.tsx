'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Decorative Corner SVG Component
const MajesticCorner = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute w-16 h-16 sm:w-24 sm:h-24 opacity-80 pointer-events-none ${className}`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0 0 L40 0 C40 10 30 20 20 20 C20 30 10 40 0 40 L0 0 Z" 
      fill="#d4af37" 
    />
    <path 
      d="M0 0 L100 0 C100 20 80 40 50 40 C20 40 0 60 0 100 L0 0 Z" 
      stroke="#d4af37" 
      strokeWidth="2"
      fill="none"
    />
    <path 
      d="M5 5 L60 5 C60 15 45 30 25 30 C15 30 5 45 5 70 L5 5 Z" 
      stroke="#d4af37" 
      strokeWidth="1"
      fill="none"
    />
    <circle cx="15" cy="15" r="3" fill="#d4af37" />
    <circle cx="25" cy="8" r="2" fill="#d4af37" />
    <circle cx="8" cy="25" r="2" fill="#d4af37" />
  </svg>
);

export default function BookCover({ isOpen, onOpen, onClose }: BookCoverProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Front Cover */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left md:rounded-r-2xl mobile-book-page cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          zIndex: isOpen ? 2 : 10,
          background: 'linear-gradient(to right, #0b1021 0%, #172554 100%)',
          border: '4px solid #d4af37',
          borderLeft: 'none',
          boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), 10px 10px 30px rgba(0,0,0,0.7)',
        }}
        onClick={isOpen ? onClose : onOpen}
        initial={false}
        animate={{
          rotateY: isMobile ? 0 : (isOpen ? -180 : 0),
          x: isMobile ? (isOpen ? '-100%' : '0%') : '0%',
        }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Book spine simulation (reliure) */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-[#d4af37] opacity-60 z-10" />

        {/* Cover Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Majestic Corners */}
          <MajesticCorner className="top-2 left-8" />
          <MajesticCorner className="top-2 right-2 scale-x-[-1]" />
          <MajesticCorner className="bottom-2 left-8 scale-y-[-1]" />
          <MajesticCorner className="bottom-2 right-2 scale-x-[-1] scale-y-[-1]" />

          {/* Golden frame inner */}
          <div className="absolute inset-6 left-12 border border-[#d4af37] opacity-30 pointer-events-none" />
          <div className="absolute inset-8 left-14 border border-[#d4af37] opacity-20 pointer-events-none" />
          
          <motion.div
            className="flex flex-col items-center gap-6"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] bg-[#0b1021]/50 backdrop-blur-sm z-20">
              <span className="text-[#d4af37] text-4xl font-serif">C</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37] tracking-widest mt-8 z-20" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              PORTFOLIO
            </h1>
            <p className="text-gray-300 font-light tracking-[0.3em] uppercase text-sm mt-4 z-20">
              Chris Oussi
            </p>
            <p className="text-[#d4af37]/60 italic mt-12 z-20">
              Code Axis Digital Cameroun
            </p>
          </motion.div>

          {/* Integrated Open/Close Indication */}
          <motion.div 
            className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 text-[#d4af37]"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-rl' }}>
              Ouvrir
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50" />
          </motion.div>
        </div>

        {/* Inside Cover (backface) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#f4ecd8] md:rounded-l-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(to left, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
          }}
        >
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Pages thickness illusion (Tranche dorée) */}
      <motion.div
        className="absolute inset-y-2 md:inset-y-6 right-[-10px] w-4 bg-[#b5952f]"
        style={{
          transformOrigin: 'left',
          transform: 'rotateY(90deg)',
          zIndex: 1,
          opacity: isOpen ? 0 : 1,
          background: 'linear-gradient(to right, #8a6d1c 0%, #d4af37 50%, #8a6d1c 100%)'
        }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
