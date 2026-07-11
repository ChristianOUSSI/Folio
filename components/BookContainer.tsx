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

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentPage === -1) return;
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'Escape') {
        closeBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isAnimating]);

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
      
      {/* Navigation Buttons for PC (Visible only when open on larger screens) */}
      {currentPage > -1 && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-50 pointer-events-none">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage <= 0}
            className="w-12 h-12 rounded-full bg-black/40 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] backdrop-blur-md pointer-events-auto hover:bg-black/70 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            ←
          </button>
          <button 
            onClick={goToNextPage}
            disabled={currentPage >= children.length - 1}
            className="w-12 h-12 rounded-full bg-black/40 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] backdrop-blur-md pointer-events-auto hover:bg-black/70 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            →
          </button>
        </div>
      )}

      {/* Close button */}
      {currentPage > -1 && (
        <button 
          onClick={closeBook}
          className="absolute top-24 right-4 md:right-12 w-10 h-10 rounded-full bg-black/40 border border-red-500/50 flex items-center justify-center text-red-500 backdrop-blur-md z-50 hover:bg-black/70 hover:scale-110 transition-all"
        >
          ✕
        </button>
      )}

      <div 
        className="relative w-full max-w-[1000px] h-[85vh] md:h-[80vh] mx-auto transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: 'preserve-3d',
          // On mobile, the book takes full width. On desktop, we shift it to center the open book.
          // When closed: shift slightly right so the cover is centered.
          // When open: shift right so the spine is in the center.
          transform: `rotateX(2deg) translateX(${currentPage > -1 ? '25%' : '15%'})`,
        }}
      >
        {/* Mobile centering override via CSS class */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .mobile-book-container {
              transform: rotateX(2deg) translateX(0%) !important;
              width: 100% !important;
            }
            .mobile-book-page {
              width: 100% !important;
            }
          }
        `}} />

        <div className="absolute inset-0 mobile-book-container h-full w-[80%] md:w-[50%] left-0 md:left-0" style={{ transformStyle: 'preserve-3d' }}>
          {/* The Pages inside */}
          <div 
            className="absolute inset-y-4 md:inset-y-8 left-0 w-full origin-left mobile-book-page"
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
    </div>
  );
}
