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
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pages = React.Children.toArray(children);
  const sheets: { front: React.ReactNode, back: React.ReactNode }[] = [];

  if (mounted) {
    if (isMobile) {
      // On Mobile: 1 page per sheet (Flip left-to-right individually)
      sheets.push({
        front: (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#f4ecd8]">
            <div className="border-[4px] border-double border-[#d4af37] p-8 flex flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-serif text-[#1e293b] mb-4 font-bold tracking-wider">PORTFOLIO</h1>
              <div className="w-16 h-[2px] bg-[#d4af37] mx-auto my-4"></div>
              <p className="text-gray-600 italic text-lg font-serif">Joseph Christian Josué OUSSI</p>
            </div>
          </div>
        ),
        back: null
      });
      for (let i = 0; i < pages.length; i++) {
        sheets.push({
          front: pages[i],
          back: null
        });
      }
    } else {
      // On Desktop: 2 pages per sheet (Spread format)
      // Sheet 0 Front is Title. Sheet 0 Back is SommaireLeft (pages[0]).
      sheets.push({
        front: (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#f4ecd8]">
            <div className="border-[4px] border-double border-[#d4af37] p-12 md:p-16 flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-6xl font-serif text-[#1e293b] mb-4 font-bold tracking-wider">PORTFOLIO</h1>
              <div className="w-24 h-[2px] bg-[#d4af37] mx-auto my-6"></div>
              <p className="text-gray-600 italic text-xl font-serif">Joseph Christian Josué OUSSI</p>
              <p className="text-gray-500 text-sm mt-4 tracking-widest uppercase">Développeur Web & Mobile</p>
            </div>
          </div>
        ),
        back: pages[0] || null
      });
      // Sheet 1 to N
      for (let i = 1; i < pages.length; i += 2) {
        sheets.push({
          front: pages[i] || null,
          back: pages[i + 1] || null
        });
      }
    }
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
      const sectionIndex = e.detail.index; // 0 to 11
      let targetSpread = 0;
      if (isMobile) {
        // Mobile: Title is 0. Sommaire (idx 0) is 1,2. We go to Left (1).
        targetSpread = sectionIndex * 2 + 1;
      } else {
        // Desktop: Title is Spread 0. Sommaire is Spread 1.
        targetSpread = sectionIndex + 1;
      }
      
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
  }, [currentSpread, isMobile]);

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

      <div 
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
          <div 
            className="absolute inset-y-2 md:inset-y-6 left-0 w-full origin-left mobile-book-page"
            style={{
              zIndex: 1,
              pointerEvents: currentSpread > -1 ? 'auto' : 'none',
              opacity: currentSpread > -1 ? 1 : 0,
              transition: 'opacity 0.3s, z-index 0.3s'
            }}
          >
            {mounted && sheets.map((sheet, index) => (
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

          {/* Static Back Cover to frame the right pages */}
          <div 
            className="absolute inset-y-0 left-0 w-full hidden md:block rounded-r-2xl"
            style={{
              zIndex: 0,
              background: 'linear-gradient(to right, #0b1021 0%, #172554 100%)',
              border: '4px solid #d4af37',
              borderLeft: 'none',
              boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), 10px 10px 30px rgba(0,0,0,0.7)',
              opacity: currentSpread > -1 ? 1 : 0,
              transition: 'opacity 0.8s'
            }}
          >
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-y-0 left-0 w-[4px] bg-[#d4af37] opacity-60 z-10" />
            
            {/* Inner frame on the back cover */}
            <div className="absolute inset-6 left-12 border border-[#d4af37] opacity-30 pointer-events-none" />
            <div className="absolute inset-8 left-14 border border-[#d4af37] opacity-20 pointer-events-none" />
          </div>

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

