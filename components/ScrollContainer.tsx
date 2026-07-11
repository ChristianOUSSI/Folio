'use client';
import React, { useState, useEffect } from 'react';
import ScrollCover from './ScrollCover';
import ScrollPaper from './ScrollPaper';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useI18n } from '../lib/i18n';

interface ScrollContainerProps {
  children: React.ReactNode[];
  navItems: { label: string, index: number }[];
}

export default function ScrollContainer({ children, navItems }: ScrollContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Group pages into sections (2 pages = 1 section = 1 parchment)
  const pages = React.Children.toArray(children);
  const sections: React.ReactNode[] = [];
  
  for (let i = 0; i < pages.length; i += 2) {
    const left = pages[i] || null;
    const right = pages[i + 1] || null;
    sections.push(
      <div key={`section-content-${i}`} className="w-full flex flex-col">
        <div className="w-full">{left}</div>
        {right && <div className="w-full">{right}</div>}
      </div>
    );
  }

  const handleOpen = () => {
    if (isTransitioning) return;
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isTransitioning) return;
    setIsOpen(false);
  };

  const navigateToSection = (index: number) => {
    if (isTransitioning || index === currentSectionIndex || index < 0 || index >= sections.length) return;
    
    setIsTransitioning(true);
    setIsOpen(false); // Roll up current parchment
    
    setTimeout(() => {
      setCurrentSectionIndex(index);
      setIsOpen(true); // Unroll new section's parchment
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }, 1000);
  };

  useEffect(() => {
    const handleNavClick = (e: any) => {
      const detail = e.detail;
      // Support both { index } object and raw number
      const sectionIndex = typeof detail === 'object' ? detail.index : detail;
      if (sectionIndex === -1) {
        handleTitleClick();
      } else {
        navigateToSection(sectionIndex);
      }
    };
    window.addEventListener('book-navigate' as any, handleNavClick);
    return () => window.removeEventListener('book-navigate' as any, handleNavClick);
  }, [currentSectionIndex, isTransitioning]);

  const handleTitleClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsOpen(false);
    setTimeout(() => {
      setCurrentSectionIndex(0);
      setIsTransitioning(false);
    }, 1200);
  };

  const { locale, setLocale } = useI18n();

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020617] flex items-center justify-center font-sans touch-none">
      
      {/* Closed Cover View */}
      <ScrollCover isOpen={isOpen} onOpen={handleOpen} />

      {/* One parchment per section — only current one mounts */}
      <ScrollPaper
        key={`parchment-${currentSectionIndex}`}
        isOpen={isOpen}
        onSwipeLeft={() => navigateToSection(currentSectionIndex + 1)}
        onSwipeRight={() => navigateToSection(currentSectionIndex - 1)}
        sectionTitle={navItems[currentSectionIndex]?.label}
        hasPrev={currentSectionIndex > 0}
        hasNext={currentSectionIndex < sections.length - 1}
        onPrev={() => navigateToSection(currentSectionIndex - 1)}
        onNext={() => navigateToSection(currentSectionIndex + 1)}
      >
        {sections[currentSectionIndex]}
      </ScrollPaper>

      {/* Top Left Language Toggle (Imperial Style) */}
      <div 
        className={`absolute top-4 left-4 z-[60] flex items-center gap-1 bg-[#8a6d1c]/20 backdrop-blur-sm rounded-full p-1 border border-[#d4af37]/40 transition-opacity duration-300 ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={() => setLocale('fr')}
          className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all duration-300 ${
            locale === 'fr'
              ? 'bg-[#d4af37]/30 text-[#f9e596] border border-[#d4af37]'
              : 'text-[#8a6d1c] hover:text-[#d4af37]'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all duration-300 ${
            locale === 'en'
              ? 'bg-[#d4af37]/30 text-[#f9e596] border border-[#d4af37]'
              : 'text-[#8a6d1c] hover:text-[#d4af37]'
          }`}
        >
          EN
        </button>
      </div>

      {/* Top Right Controls (Visible only when open) */}
      <div 
        className={`absolute top-4 right-4 z-[60] flex items-center gap-2 transition-opacity duration-300 ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 bg-[#f4ecd8]/90 backdrop-blur-sm border border-[#d4af37] rounded-full text-[#8a6d1c] shadow-lg focus:outline-none hover:bg-[#e8dcb8]">
            <Bars3Icon className="w-5 h-5" />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#f4ecd8] border border-[#d4af37] rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.5)] outline-none overflow-hidden max-h-[60vh] overflow-y-auto">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleTitleClick}
                      className={`${active ? 'bg-[#e8dcb8] text-[#8a6d1c]' : 'text-[#8a6d1c]'} group flex w-full items-center px-4 py-2 text-sm font-serif border-b border-[#d4af37]/30`}
                    >
                      Couverture
                    </button>
                  )}
                </Menu.Item>
                {navItems.map((item, idx) => (
                  <Menu.Item key={idx}>
                    {({ active }) => (
                      <button
                        onClick={() => navigateToSection(idx)}
                        className={`${active ? 'bg-[#e8dcb8] text-[#8a6d1c]' : 'text-[#8a6d1c]'} group flex w-full items-center px-4 py-2 text-sm font-serif ${idx === currentSectionIndex ? 'font-bold bg-[#e8dcb8]/50' : ''}`}
                      >
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button 
          onClick={handleClose}
          className="p-2 bg-red-900/20 backdrop-blur-sm border border-red-800/40 text-red-700 rounded-full shadow-lg hover:bg-red-900/40 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
