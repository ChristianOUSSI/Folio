'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface BookPageProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isActive: boolean; // Is this sheet the top-most visible one on the right?
  isPast: boolean;   // Has this sheet been turned to the left?
  isFuture: boolean; // Is this sheet behind the active one?
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
  totalSheets: number;
}

export default function BookPage({ 
  frontContent, 
  backContent,
  isActive, 
  isPast, 
  isFuture,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalSheets
}: BookPageProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const minSwipeDistance = 50; 

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) onSwipeLeft();
    else if (distance < -minSwipeDistance) onSwipeRight();
  };

  const handlePageClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width * 0.25) {
      if (isPast) onSwipeLeft();
      else onSwipeRight();
    } else if (x > width * 0.75) {
      if (isPast) onSwipeRight();
      else onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full cursor-pointer"
      onClick={handlePageClick}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'left',
      }}
      initial={false}
      animate={{
        rotateY: isPast ? -180 : 0,
        x: '0%',
        opacity: 1,
        zIndex: isPast ? index + 1 : 100 - index,
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* FRONT FACE */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#f4ecd8] overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'linear-gradient(to right, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        }}
      >
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] shadow-[0_0_5px_rgba(212,175,55,0.8)] z-[60]" />
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-50" />
        
        <div className="w-full min-h-full p-4 sm:p-6 md:p-12 relative z-10 flex flex-col justify-start pb-16">
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col">
            {frontContent}
          </div>
        </div>

        <div className="absolute bottom-4 right-6 text-gray-500/50 font-serif text-sm pointer-events-none select-none">
          {index * 2 + 1}
        </div>
      </div>

      {/* BACK FACE */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#f4ecd8] overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(to left, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        }}
      >
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] shadow-[0_0_5px_rgba(212,175,55,0.8)] z-[60]" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-50" />
        
        <div className="w-full min-h-full p-4 sm:p-6 md:p-12 relative z-10 flex flex-col justify-start pb-16">
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col">
            {backContent}
          </div>
        </div>

        <div className="absolute bottom-4 left-6 text-gray-500/50 font-serif text-sm pointer-events-none select-none">
          {index * 2 + 2}
        </div>
      </div>
    </motion.div>
  );
}
