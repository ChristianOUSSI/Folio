'use client';
import React, { useState, useEffect, useRef } from 'react';
import BookCover from './BookCover';
import BookPage from './BookPage';

interface BookContainerProps {
  children: React.ReactNode[];
}

export default function BookContainer({ children }: BookContainerProps) {
  const [currentPage, setCurrentPage] = useState(-1); // -1 is closed (cover), 0 is first page (Hero)
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // We create a tiny synth for the page flip sound to avoid missing assets
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    
    const playFlipSound = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    };

    // Attach to window so we can trigger it
    (window as any).playFlipSound = playFlipSound;

    // Listen for navbar custom event
    const handleNavClick = (e: CustomEvent) => {
      const targetIndex = e.detail.index;
      if (targetIndex === currentPage) return;
      
      setIsAnimating(true);
      // Close the book first
      setCurrentPage(-1);
      playFlipSound();
      
      // Open to specific page after a delay
      setTimeout(() => {
        setCurrentPage(targetIndex);
        playFlipSound();
        setIsAnimating(false);
      }, 800);
    };

    window.addEventListener('book-navigate' as any, handleNavClick);
    return () => window.removeEventListener('book-navigate' as any, handleNavClick);
  }, [currentPage]);

  const goToNextPage = () => {
    if (isAnimating || currentPage >= children.length - 1) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentPage(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToPrevPage = () => {
    if (isAnimating || currentPage < 0) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentPage(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const openBook = () => {
    if (currentPage !== -1) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentPage(0);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const closeBook = () => {
    if (currentPage === -1) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentPage(-1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="fixed inset-0 pt-16 overflow-hidden flex items-center justify-center" style={{ perspective: '2500px', backgroundColor: '#020617' }}>
      <div 
        className="relative w-full max-w-5xl h-[85vh] mx-auto md:translate-x-[15%]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(2deg)`, // Slight tilt for realism
          transition: 'transform 0.8s ease-in-out'
        }}
      >
        {/* The Pages inside */}
        <div 
          className="absolute inset-y-8 left-0 w-full md:w-[70%] origin-left"
          style={{
            zIndex: 1,
            pointerEvents: currentPage > -1 ? 'auto' : 'none',
            opacity: currentPage > -1 ? 1 : 0,
            transition: 'opacity 0.3s, z-index 0.3s'
          }}
        >
          {children.map((child, index) => (
            <BookPage 
              key={index} 
              isActive={currentPage === index}
              isPast={currentPage > index}
              isFuture={currentPage < index}
              onSwipeLeft={goToNextPage}
              onSwipeRight={goToPrevPage}
              index={index}
              totalPages={children.length}
            >
              {child}
            </BookPage>
          ))}
        </div>

        {/* The Cover */}
        <BookCover 
          isOpen={currentPage > -1} 
          onOpen={openBook} 
          onClose={closeBook}
        />
      </div>
    </div>
  );
}
