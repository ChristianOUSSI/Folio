'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollCoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function ScrollCover({ isOpen, onOpen }: ScrollCoverProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-50"
      initial={false}
      animate={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-between w-full h-full max-w-sm py-16 px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center z-10 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] mt-4">
          <h1 className="text-3xl font-serif text-[#d4af37] tracking-widest uppercase">
            Portfolio
          </h1>
          <p className="text-[#a4b5d0] text-xs tracking-[0.3em] mt-2 uppercase font-semibold">
            Chris Oussi
          </p>
        </div>

        {/* Closed Scroll Body */}
        <motion.div 
          className="relative w-28 h-[55vh] bg-gradient-to-r from-[#cbb576] via-[#f4ecd8] to-[#cbb576] rounded-full shadow-[inset_-5px_0_15px_rgba(0,0,0,0.1),_10px_10px_40px_rgba(0,0,0,0.8)] border-x-4 border-[#8a6d1c]/40 flex items-center justify-center overflow-hidden flex-shrink-0"
          animate={{ scaleY: isOpen ? 0.9 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Wooden Roller Ends (Top & Bottom) */}
          <div className="absolute top-[-5px] w-32 h-8 bg-gradient-to-b from-[#2a1305] via-[#5c3a21] to-[#1a0a02] rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-[#1a0a02] z-20" />
          <div className="absolute bottom-[-5px] w-32 h-8 bg-gradient-to-t from-[#2a1305] via-[#5c3a21] to-[#1a0a02] rounded-[10px] shadow-[0_-5px_15px_rgba(0,0,0,0.6)] border-y-2 border-[#1a0a02] z-20" />

          {/* Paper Texture Lines */}
          <div className="absolute inset-y-0 w-full flex justify-evenly opacity-30 mix-blend-multiply pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-[#8a6d1c]/40 shadow-[1px_0_2px_rgba(255,255,255,0.5)]" />
            ))}
          </div>

          {/* Blue/Gold Ribbon Wrapping the Scroll */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[115%] h-14 bg-gradient-to-r from-[#071330] via-[#102a6c] to-[#071330] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-y-[3px] border-[#d4af37] flex items-center justify-center z-30 -ml-[7.5%] rotate-[-2deg]">
            <div className="w-10 h-10 border-[3px] border-[#d4af37] bg-[#071330] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6),_inset_0_0_5px_rgba(0,0,0,0.8)]">
              <span className="text-[#d4af37] font-serif font-bold text-lg" style={{ textShadow: '0 0 5px rgba(212,175,55,0.5)' }}>C</span>
            </div>
          </div>
        </motion.div>

        {/* Ouvrir Button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 px-10 py-3 bg-gradient-to-r from-[#59430c] via-[#d4af37] to-[#59430c] text-[#020617] font-bold tracking-widest uppercase rounded-full shadow-[0_10px_25px_rgba(212,175,55,0.4)] border-2 border-[#f9e596] z-40 transition-all"
        >
          Ouvrir
        </motion.button>
      </div>
    </motion.div>
  );
}
