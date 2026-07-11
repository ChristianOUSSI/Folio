'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface BookPageProps {
  children: React.ReactNode;
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
  totalPages: number;
}

export default function BookPage({ 
  children, 
  isActive, 
  isPast, 
  isFuture,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalPages
}: BookPageProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger page turn
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  // Click on the left/right 20% of the page to turn
  const handlePageClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Left 25% area goes back, right 25% area goes forward
    if (x < width * 0.25) {
      onSwipeRight();
    } else if (x > width * 0.75) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#f4ecd8] overflow-hidden custom-scrollbar cursor-pointer"
      onClick={handlePageClick}
      style={{
        backfaceVisibility: 'hidden',
        // Paper texture effect via subtle gradient
        background: 'linear-gradient(to right, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        transformOrigin: 'left', // Ensure turning is anchored to the spine
      }}
      initial={false}
      animate={{
        rotateY: isPast ? -180 : 0,
        opacity: (isActive || isPast) ? 1 : 0,
        zIndex: isActive ? 10 : (isPast ? 1 : 5 - index), 
        // Slight lift and curve effect during transition could be added here
      }}
      transition={{ 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1], // Cinematic smooth curve mimicking a real page turn
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Book center fold shadow (Reliure) */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-50" />
      
      {/* Content wrapper with scaling to prevent scroll */}
      <div className="w-full h-full p-4 md:p-8 lg:p-12 relative z-10 flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col items-center justify-center scale-90 md:scale-95 origin-center">
          {children}
        </div>
      </div>

      {/* Page numbers */}
      <div className="absolute bottom-4 right-6 text-gray-500/50 font-serif text-sm pointer-events-none select-none">
        {index + 1} / {totalPages}
      </div>
    </motion.div>
  );
}
