'use client';
import React, { useState, useEffect } from 'react';
import BookCover from './BookCover';
import BookPage from './BookPage';

interface BookContainerProps {
  children: React.ReactNode[];
}

export default function BookContainer({ children }: BookContainerProps) {
  const [currentSpread, setCurrentSpread] = useState(-1); // -1 is closed, 0 is Spread 0
  const [isAnimating, setIsAnimating] = useState(false);

  // Convert flat children to sheets (2 pages per sheet)
  const pages = React.Children.toArray(children);
  const sheets: { front: React.ReactNode, back: React.ReactNode }[] = [];
  for (let i = 0; i < pages.length; i += 2) {
    sheets.push({
      front: pages[i],
      back: pages[i + 1] || null
    });
  }

  const totalSpreads = sheets.length;

  useEffect(() => {
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

    (window as any).playFlipSound = playFlipSound;

    const handleNavClick = (e: CustomEvent) => {
      // index received from Navbar (0 to N).
      // We want to go to the spread that contains this index.
      // Index 0 -> Spread 0 (Front of sheet 0)
      // Index 1 -> Spread 1 (Back of sheet 0)
      // Index 2 -> Spread 1 (Front of sheet 1)
      // Index 3 -> Spread 2 (Back of sheet 1)
      const targetSpread = e.detail.index;
      
      if (targetSpread === currentSpread) return;
      
      setIsAnimating(true);
      setCurrentSpread(-1);
      playFlipSound();
      
      setTimeout(() => {
        setCurrentSpread(targetSpread);
        playFlipSound();
        setIsAnimating(false);
      }, 1500);
    };

    window.addEventListener('book-navigate' as any, handleNavClick);
    return () => window.removeEventListener('book-navigate' as any, handleNavClick);
  }, [currentSpread]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentSpread === -1) return;
      if (e.key === 'ArrowRight') {
        goToNextSpread();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSpread();
      } else if (e.key === 'Escape') {
        closeBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpread, isAnimating]);

  const goToNextSpread = () => {
    if (isAnimating || currentSpread >= totalSpreads) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentSpread(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const goToPrevSpread = () => {
    if (isAnimating || currentSpread < 0) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentSpread(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const openBook = () => {
    if (currentSpread !== -1) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentSpread(0);
    setTimeout(() => setIsAnimating(false), 1400);
  };

  const closeBook = () => {
    if (currentSpread === -1) return;
    setIsAnimating(true);
    (window as any).playFlipSound?.();
    setCurrentSpread(-1);
    setTimeout(() => setIsAnimating(false), 1400);
  };

  return (
    // We adjust the top padding so the book sits just below the hidden navbar (64px) + ~8px
    <div className="fixed inset-0 pt-[72px] md:pt-[72px] overflow-hidden flex items-center justify-center bg-[#020617]" style={{ perspective: '3000px' }}>
      
      {/* Navigation Buttons for PC */}
      {currentSpread > -1 && (
        <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-4 lg:px-12 z-50 pointer-events-none">
          <button 
            onClick={goToPrevSpread}
            disabled={currentSpread <= 0}
            className="w-12 h-12 rounded-full bg-black/40 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] backdrop-blur-md pointer-events-auto hover:bg-black/70 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            ←
          </button>
          <button 
            onClick={goToNextSpread}
            disabled={currentSpread >= totalSpreads}
            className="w-12 h-12 rounded-full bg-black/40 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] backdrop-blur-md pointer-events-auto hover:bg-black/70 hover:scale-110 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            →
          </button>
        </div>
      )}

      {/* Note: Red close button removed as requested. The bookmark flap on BookCover acts as the close button. */}

      <div 
        // Height on PC: Fill available space minus padding (calc(100vh - 72px - 20px bottom margin))
        className="relative w-full max-w-[1400px] h-[100dvh] md:h-[calc(100vh-100px)] mx-auto transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(2deg) translateX(${currentSpread > -1 ? '50%' : '25%'})`,
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .mobile-book-container {
              transform: rotateX(0deg) translateX(0%) !important;
              width: 100% !important;
              height: 100dvh !important;
            }
            .mobile-book-page {
              width: 100% !important;
              inset: 0 !important;
            }
            .fixed.inset-0 {
              padding-top: 0 !important;
            }
          }
        `}} />

        <div className="absolute inset-0 mobile-book-container h-full w-[80%] md:w-[50%] left-0 md:left-0" style={{ transformStyle: 'preserve-3d' }}>
          {/* The Pages inside (slightly smaller than cover for realism) */}
          <div 
            className="absolute inset-y-2 md:inset-y-6 left-0 w-full origin-left mobile-book-page"
            style={{
              zIndex: 1,
              pointerEvents: currentSpread > -1 ? 'auto' : 'none',
              opacity: currentSpread > -1 ? 1 : 0,
              transition: 'opacity 0.3s, z-index 0.3s'
            }}
          >
            {sheets.map((sheet, index) => (
              <BookPage 
                key={index} 
                frontContent={sheet.front}
                backContent={sheet.back}
                isActive={currentSpread === index}
                isPast={currentSpread > index}
                isFuture={currentSpread < index}
                onSwipeLeft={goToNextSpread}
                onSwipeRight={goToPrevSpread}
                index={index}
                totalSheets={sheets.length}
              />
            ))}
          </div>

          {/* The Cover */}
          <BookCover 
            isOpen={currentSpread > -1} 
            onOpen={openBook} 
            onClose={closeBook}
          />
        </div>
      </div>
    </div>
  );
}
