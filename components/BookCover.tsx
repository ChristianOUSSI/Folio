'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

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
        className="absolute inset-y-4 md:inset-y-8 left-0 w-full md:w-[70%] origin-left md:rounded-r-2xl mobile-book-page"
        style={{
          transformStyle: 'preserve-3d',
          zIndex: isOpen ? 2 : 10, // Must be above pages when closed
          // Bleu nuit texture gradient and golden border
          background: 'linear-gradient(to right, #0b1021 0%, #172554 100%)',
          border: '4px solid #d4af37',
          borderLeft: 'none',
          boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), 10px 10px 30px rgba(0,0,0,0.7)',
        }}
        initial={false}
        animate={{
          rotateY: isMobile ? 0 : (isOpen ? -180 : 0), // Opens flat like a real book on PC
          x: isMobile ? (isOpen ? '-100%' : '0%') : '0%', // Slides left on mobile
        }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }} // smooth cinematic easing
      >
        {/* Book spine simulation (reliure) */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-[#d4af37] opacity-60 z-10" />

        {/* Cover Content (only visible from the front) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Golden frame inner */}
          <div className="absolute inset-4 border-2 border-[#d4af37] opacity-40 rounded-lg pointer-events-none" />
          
          <motion.div
            className="flex flex-col items-center gap-6"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <span className="text-[#d4af37] text-4xl font-serif">C</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37] tracking-widest mt-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              PORTFOLIO
            </h1>
            <p className="text-gray-300 font-light tracking-[0.3em] uppercase text-sm mt-4">
              Chris Oussi
            </p>
            <p className="text-[#d4af37]/60 italic mt-12">
              Code Axis Digital Cameroun
            </p>
          </motion.div>
        </div>

        {/* Inside Cover (backface) - Now styled as a paper page with a gold line */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#f4ecd8] md:rounded-l-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(to left, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
          }}
        >
          {/* Thin gold line of separation at the right edge (which is the spine side since it's rotated) */}
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
          {/* Shadow for the fold on the back of the cover */}
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Pages thickness illusion (Tranche dorée) */}
      <motion.div
        className="absolute inset-y-9 right-[-10px] w-4 bg-[#b5952f]"
        style={{
          transformOrigin: 'left',
          transform: 'rotateY(90deg)',
          zIndex: 1,
          opacity: isOpen ? 0 : 1, // Hidden when open
          background: 'linear-gradient(to right, #8a6d1c 0%, #d4af37 50%, #8a6d1c 100%)'
        }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Flap / Bookmark */}
      <motion.div
        className="absolute z-20 cursor-pointer flex items-center justify-center shadow-lg"
        onClick={isOpen ? onClose : onOpen}
        initial={false}
        animate={
          isOpen 
          ? { 
              // Bookmark position (hanging from top of the book)
              right: '25%',
              top: '-10px',
              width: '40px',
              height: '80px',
              backgroundColor: '#991b1b', // Red velvet bookmark
              rotate: 0,
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderBottomLeftRadius: '20px',
            } 
          : {
              // Flap position (sticking out the right side)
              right: '-20px', // Closer to the book
              top: '50%',
              y: '-50%',
              width: '40px',
              height: '100px',
              backgroundColor: '#d4af37', // Gold flap
              rotate: 0,
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          // A bit of styling to make it look premium
          boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
          border: isOpen ? '1px solid #7f1d1d' : '1px solid #a16207',
        }}
      >
        <motion.span 
          className="text-xs font-bold tracking-widest text-[#0f172a]"
          style={{ writingMode: 'vertical-rl', transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
          animate={{ opacity: isOpen ? 0 : 1 }}
        >
          {isOpen ? '' : 'OUVRIR'}
        </motion.span>
        {isOpen && (
           <motion.span 
            className="text-white/60 text-xs font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
           >
             ✖
           </motion.span>
        )}
      </motion.div>
    </>
  );
}
