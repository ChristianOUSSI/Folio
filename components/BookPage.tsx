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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Click on the left/right 25% of the page to turn
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
      className="absolute inset-0 w-full h-full cursor-pointer"
      onClick={handlePageClick}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'left', // Anchored to the spine for desktop
      }}
      initial={false}
      animate={{
        // On mobile: swipe left/right. On desktop: 3D rotate.
        rotateY: isMobile ? 0 : (isPast ? -180 : 0),
        x: isMobile ? (isPast ? '-100%' : (isFuture ? '100%' : '0%')) : '0%',
        opacity: isMobile ? (isActive ? 1 : 0) : 1, // Fade out non-active pages on mobile to avoid overlapping
        zIndex: isActive ? 10 : (isPast ? index + 1 : 100 - index), // Stack correctly
      }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.8, // Faster swipe on mobile
        ease: isMobile ? "easeInOut" : [0.25, 1, 0.5, 1], // Smooth book flip curve on PC
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* FRONT FACE (The actual content) */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#f4ecd8] overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(to right, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        }}
      >
        {/* Book center fold shadow (Reliure) */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-50" />
        
        {/* Content wrapper without scaling to ensure readability */}
        <div className="w-full min-h-full p-4 sm:p-6 md:p-12 relative z-10 flex flex-col justify-start pb-16">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </div>

        {/* Page numbers */}
        <div className="absolute bottom-4 right-6 text-gray-500/50 font-serif text-sm pointer-events-none select-none">
          {index + 1} / {totalPages}
        </div>
      </div>

      {/* BACK FACE (Blank page visible when turned) */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#f4ecd8]"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(to left, #e8dcb8 0%, #f4ecd8 5%, #f4ecd8 95%, #e8dcb8 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
        }}
      >
        {/* Shadow for the fold on the back of the page */}
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        
        {/* Optional: faintly visible page number on the back */}
        <div className="absolute bottom-4 left-6 text-gray-500/30 font-serif text-sm pointer-events-none select-none">
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
}
