'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragonMotif from './DragonMotif';

interface ScrollPaperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

// Ripple effect for paper touch
const TouchRipple = ({ x, y, id, onComplete }: { x: number, y: number, id: number, onComplete: (id: number) => void }) => {
  return (
    <motion.div
      initial={{ top: y, left: x, scale: 0, opacity: 0.5 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className="fixed w-16 h-16 -ml-8 -mt-8 bg-[#d4af37]/30 rounded-full pointer-events-none z-50 mix-blend-multiply"
      style={{
        boxShadow: 'inset 0 0 10px rgba(138, 109, 28, 0.5)'
      }}
    />
  );
};

export default function ScrollPaper({ children, isOpen, onSwipeLeft, onSwipeRight }: ScrollPaperProps) {
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Prevent browser back/forward gesture by intercepting horizontal touch moves
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      // If horizontal movement is dominant, prevent default to block browser navigation
      if (dx > dy && dx > 10) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    setRipples(prev => [...prev, { id: Date.now(), x: clientX, y: clientY }]);
  };

  const removeRipple = (id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden w-full h-[100dvh]"
      style={{ touchAction: 'pan-y' }}
      onMouseDown={handleTouch}
    >
      <AnimatePresence>
        {ripples.map(r => (
          <TouchRipple key={r.id} id={r.id} x={r.x} y={r.y} onComplete={removeRipple} />
        ))}
      </AnimatePresence>

      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset, velocity }) => {
          const swipeThreshold = 50;
          if (offset.x < -swipeThreshold && onSwipeLeft) {
            onSwipeLeft();
          } else if (offset.x > swipeThreshold && onSwipeRight) {
            onSwipeRight();
          }
        }}
        className="relative w-full max-w-lg bg-[#f4ecd8] flex flex-col"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? '100dvh' : '0dvh',
          opacity: isOpen ? 1 : 0
        }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), 0 0 50px rgba(0,0,0,0.5)',
          background: 'linear-gradient(to right, #e8dcb8 0%, #f4ecd8 8%, #fbf8f1 50%, #f4ecd8 92%, #e8dcb8 100%)'
        }}
      >
        {/* Top Roller */}
        <div className="absolute top-0 inset-x-[-15px] h-8 bg-gradient-to-r from-[#2a1305] via-[#8b5a2b] to-[#2a1305] rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-[#1a0a02] z-20 flex justify-between items-center px-1">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_2px_5px_rgba(0,0,0,0.5)] -ml-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-bl from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_2px_5px_rgba(0,0,0,0.5)] -mr-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
        </div>

        {/* Top Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute top-8 left-0 right-0 z-10 pointer-events-none text-[#d4af37]/60">
          <DragonMotif />
        </div>

        {/* Scroll Content Area */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar pt-2 pb-2 px-0 relative z-0">
          <div className="w-full min-h-full flex flex-col gap-0 pb-2">
            {children}
          </div>
        </div>

        {/* Bottom Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute bottom-8 left-0 right-0 z-10 pointer-events-none text-[#d4af37]/60 rotate-180">
          <DragonMotif />
        </div>

        {/* Bottom Roller */}
        <div className="absolute bottom-0 inset-x-[-15px] h-8 bg-gradient-to-r from-[#2a1305] via-[#8b5a2b] to-[#2a1305] rounded-[10px] shadow-[0_-5px_15px_rgba(0,0,0,0.5)] border border-[#1a0a02] z-20 flex justify-between items-center px-1">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_-2px_5px_rgba(0,0,0,0.5)] -ml-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
           <div className="w-10 h-10 rounded-full bg-gradient-to-bl from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_-2px_5px_rgba(0,0,0,0.5)] -mr-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
