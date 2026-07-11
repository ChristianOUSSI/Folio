'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragonMotif from './DragonMotif';

interface ScrollPaperProps {
  children: React.ReactNode;
  isOpen: boolean;
}

// Leaf particle component for the wind animation
const Leaf = ({ x, y, id, onComplete }: { x: number, y: number, id: number, onComplete: (id: number) => void }) => {
  return (
    <motion.div
      initial={{ x, y, opacity: 1, rotate: 0, scale: 0.5 }}
      animate={{ 
        x: x + (Math.random() * 100 - 50), 
        y: y + 150 + Math.random() * 100, 
        opacity: 0, 
        rotate: Math.random() * 360,
        scale: 1 
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className="absolute pointer-events-none z-50 text-[#d4af37]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0" />
        <path d="M17.5,7.5 C15,5 10.5,5 7.5,8 C4.5,11 4.5,15.5 7,18 C7,18 7.5,17 8.5,15 C9.5,13 11,12 13,12 C15,12 16.5,13.5 17,15 C17.5,13.5 18,11.5 17.5,7.5 Z" />
      </svg>
    </motion.div>
  );
};

export default function ScrollPaper({ children, isOpen }: ScrollPaperProps) {
  const [leaves, setLeaves] = useState<{id: number, x: number, y: number}[]>([]);
  const leafIdCounter = useRef(0);

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    // Get coordinates
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const newLeaf = {
      id: leafIdCounter.current++,
      x: clientX,
      y: clientY
    };
    
    setLeaves(prev => [...prev, newLeaf]);
  };

  const removeLeaf = (id: number) => {
    setLeaves(prev => prev.filter(leaf => leaf.id !== id));
  };

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden w-full h-[100dvh]"
      onTouchStart={handleTouch}
      onClick={handleTouch}
    >
      <AnimatePresence>
        {leaves.map(leaf => (
          <Leaf key={leaf.id} id={leaf.id} x={leaf.x} y={leaf.y} onComplete={removeLeaf} />
        ))}
      </AnimatePresence>

      <motion.div 
        className="relative w-full max-w-lg bg-[#f4ecd8] flex flex-col"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? '100dvh' : '0dvh',
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), 0 0 50px rgba(0,0,0,0.3)',
          background: 'linear-gradient(to right, #e8dcb8 0%, #f4ecd8 10%, #f4ecd8 90%, #e8dcb8 100%)'
        }}
      >
        {/* Top Roller */}
        <div className="absolute top-0 inset-x-[-10px] h-6 bg-gradient-to-r from-[#3a2010] via-[#8b5a2b] to-[#3a2010] rounded-full shadow-md border border-[#3a2010] z-20 flex justify-between items-center px-1">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#2a1005] border-[3px] border-[#8b5a2b] shadow-sm -ml-4" />
           <div className="w-8 h-8 rounded-full bg-gradient-to-bl from-[#5c3a21] to-[#2a1005] border-[3px] border-[#8b5a2b] shadow-sm -mr-4" />
        </div>

        {/* Top Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute top-6 left-0 right-0 z-10 pointer-events-none text-[#d4af37]">
          <DragonMotif />
        </div>

        {/* Scroll Content Area */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar pt-20 pb-20 px-4 relative z-0">
          <div className="w-full min-h-full flex flex-col gap-8 pb-12">
            {children}
          </div>
        </div>

        {/* Bottom Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute bottom-6 left-0 right-0 z-10 pointer-events-none text-[#d4af37] rotate-180">
          <DragonMotif />
        </div>

        {/* Bottom Roller */}
        <div className="absolute bottom-0 inset-x-[-10px] h-6 bg-gradient-to-r from-[#3a2010] via-[#8b5a2b] to-[#3a2010] rounded-full shadow-[0_-5px_15px_rgba(0,0,0,0.3)] border border-[#3a2010] z-20 flex justify-between items-center px-1">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#2a1005] border-[3px] border-[#8b5a2b] shadow-sm -ml-4" />
           <div className="w-8 h-8 rounded-full bg-gradient-to-bl from-[#5c3a21] to-[#2a1005] border-[3px] border-[#8b5a2b] shadow-sm -mr-4" />
        </div>
      </motion.div>
    </div>
  );
}
