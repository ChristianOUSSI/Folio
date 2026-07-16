'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragonMotif from './DragonMotif';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollPaperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  sectionTitle?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
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

export default function ScrollPaper({
  children,
  isOpen,
  onSwipeLeft,
  onSwipeRight,
  sectionTitle,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ScrollPaperProps) {
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [showArrows, setShowArrows] = useState(true);
  const arrowTimer = useRef<NodeJS.Timeout | null>(null);

  const resetArrowTimer = () => {
    setShowArrows(true);
    if (arrowTimer.current) clearTimeout(arrowTimer.current);
    arrowTimer.current = setTimeout(() => setShowArrows(false), 2500);
  };

  useEffect(() => {
    if (isOpen) resetArrowTimer();
    return () => { if (arrowTimer.current) clearTimeout(arrowTimer.current); };
  }, [isOpen]);

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

    resetArrowTimer();
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
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(40);
            onSwipeLeft();
          } else if (offset.x > swipeThreshold && onSwipeRight) {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(40);
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
          boxShadow: 'inset 0 0 60px rgba(139,69,19,0.15), inset 0 0 20px rgba(0,0,0,0.2), 0 0 50px rgba(0,0,0,0.6)',
          background: 'linear-gradient(to right, #d4b88a 0%, #f4ecd8 8%, #fffaf0 50%, #f4ecd8 92%, #d4b88a 100%)'
        }}
      >
        {/* Top Roller */}
        <div className="absolute top-0 inset-x-[-15px] h-8 bg-gradient-to-r from-[#2a1305] via-[#8b5a2b] to-[#2a1305] rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-[#1a0a02] z-20 flex justify-between items-center px-1">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_2px_5px_rgba(0,0,0,0.5)] -ml-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
           {/* Section Title on the roller */}
           {sectionTitle && (
             <span className="text-[#f9e596]/80 font-serif text-xs tracking-widest uppercase select-none">
               {sectionTitle}
             </span>
           )}
           <div className="w-10 h-10 rounded-full bg-gradient-to-bl from-[#5c3a21] to-[#1a0a02] border-[4px] border-[#8b5a2b] shadow-[0_2px_5px_rgba(0,0,0,0.5)] -mr-5 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-[#1a0a02]/50 shadow-inner" />
           </div>
        </div>

        {/* Top Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute top-8 left-0 right-0 z-10 pointer-events-none text-[#d4af37]/60">
          <DragonMotif />
        </div>

        {/* Scroll Content Area */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar pt-24 pb-24 px-0 relative z-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={sectionTitle || 'content'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-h-full flex flex-col gap-0"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Dragon Motif */}
        <div className="w-full h-16 sm:h-20 absolute bottom-8 left-0 right-0 z-10 pointer-events-none text-[#d4af37]/60 rotate-180">
          <DragonMotif />
        </div>

        {/* Navigation Arrows — Floating left and right */}
        <div className={`absolute top-1/2 -translate-y-1/2 inset-x-0 z-30 flex items-center justify-between px-2 sm:px-4 pointer-events-none transition-opacity duration-500 ${showArrows ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`pointer-events-auto flex items-center justify-center p-3 rounded-full border transition-all duration-300 ${hasPrev ? 'bg-[#d4af37]/20 border-[#d4af37]/60 text-[#8a6d1c] hover:bg-[#d4af37]/40 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] backdrop-blur-md' : 'opacity-0'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`pointer-events-auto flex items-center justify-center p-3 rounded-full border transition-all duration-300 ${hasNext ? 'bg-[#d4af37]/20 border-[#d4af37]/60 text-[#8a6d1c] hover:bg-[#d4af37]/40 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] backdrop-blur-md' : 'opacity-0'}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
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
