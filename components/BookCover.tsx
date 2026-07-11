'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function BookCover({ isOpen, onOpen, onClose }: BookCoverProps) {
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
          rotateY: isOpen ? -130 : 0, // Opens like a book
        }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }} // smooth cinematic easing
      >
        {/* Book spine simulation (reliure) */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-[#d4af37] opacity-60" />

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

        {/* Inside Cover (backface) */}
        <div 
          className="absolute inset-0 rounded-r-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(to left, #0b1021 0%, #1e293b 100%)',
            border: '4px solid #d4af37',
            borderRight: 'none',
            boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.5)',
          }}
        >
          {/* Inner paper sheet lining */}
          <div className="absolute inset-2 bg-[#f4ecd8] opacity-10 rounded-sm" />
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
