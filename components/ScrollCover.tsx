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
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm px-6">
        {/* Closed Scroll Body */}
        <motion.div 
          className="relative w-24 h-[60vh] bg-gradient-to-r from-[#e8dcb8] via-[#f4ecd8] to-[#d4b882] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)] border-x-4 border-[#8a6d1c]/30 flex items-center justify-center"
          animate={{ scaleY: isOpen ? 0.8 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Wooden Roller Ends (Top & Bottom) */}
          <div className="absolute -top-4 w-28 h-6 bg-gradient-to-b from-[#5c3a21] via-[#8b5a2b] to-[#3a2010] rounded-full shadow-lg border-2 border-[#3a2010]" />
          <div className="absolute -bottom-4 w-28 h-6 bg-gradient-to-t from-[#5c3a21] via-[#8b5a2b] to-[#3a2010] rounded-full shadow-lg border-2 border-[#3a2010]" />

          {/* Blue/Gold Ribbon Wrapping the Scroll */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[110%] h-12 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 shadow-xl border-y-2 border-[#d4af37] flex items-center justify-center z-10 -ml-[5%]">
            <div className="w-8 h-8 border-2 border-[#d4af37] bg-[#0b1021] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              <span className="text-[#d4af37] font-serif font-bold text-sm">C</span>
            </div>
          </div>
          
          {/* Scroll Texture/Lines */}
          <div className="absolute inset-y-0 w-full flex justify-evenly opacity-20">
            <div className="w-[1px] h-full bg-[#8a6d1c]" />
            <div className="w-[1px] h-full bg-[#8a6d1c]" />
            <div className="w-[1px] h-full bg-[#8a6d1c]" />
          </div>
        </motion.div>

        {/* Title */}
        <div className="absolute top-10 flex flex-col items-center">
          <h1 className="text-3xl font-serif text-[#d4af37] tracking-widest uppercase text-shadow-sm">
            Portfolio
          </h1>
          <p className="text-blue-200/70 text-xs tracking-[0.3em] mt-2 uppercase">
            Chris Oussi
          </p>
        </div>

        {/* Ouvrir Button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-10 px-8 py-3 bg-gradient-to-r from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] text-[#020617] font-bold tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#f9e596] z-20"
        >
          Ouvrir
        </motion.button>
      </div>
    </motion.div>
  );
}
