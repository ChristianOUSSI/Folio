'use client';
import React, { useState, useEffect } from 'react';
import ScrollCover from './ScrollCover';
import ScrollPaper from './ScrollPaper';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';

interface ScrollContainerProps {
  children: React.ReactNode[];
  navItems: { label: string, index: number }[];
}

export default function ScrollContainer({ children, navItems }: ScrollContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Group pages into sections (2 pages = 1 section)
  const pages = React.Children.toArray(children);
  const sections: React.ReactNode[][] = [];
  
  for (let i = 0; i < pages.length; i += 2) {
    sections.push([pages[i] || null, pages[i + 1] || null]);
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
    if (isTransitioning || index === currentSectionIndex) return;
    
    setIsTransitioning(true);
    setIsOpen(false); // Roll up
    
    setTimeout(() => {
      setCurrentSectionIndex(index);
      setIsOpen(true); // Unroll new section
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 800);
  };

  const handleTitleClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsOpen(false);
    setTimeout(() => {
      setCurrentSectionIndex(0);
      setIsTransitioning(false);
    }, 800);
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020617] flex items-center justify-center font-sans touch-none">
      
      {/* Closed Cover View */}
      <ScrollCover isOpen={isOpen} onOpen={handleOpen} />

      {/* Open Scroll View */}
      <ScrollPaper isOpen={isOpen}>
        {/* Render the current section (Left and Right parts stacked) */}
        {sections[currentSectionIndex]}
      </ScrollPaper>

      {/* Top Right Controls (Visible only when open) */}
      <div 
        className={`absolute top-4 right-4 z-[60] flex items-center gap-2 transition-opacity duration-300 ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 bg-[#f4ecd8] border border-[#d4af37] rounded-full text-[#8a6d1c] shadow-md focus:outline-none">
            <Bars3Icon className="w-6 h-6" />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#f4ecd8] border border-[#d4af37] rounded-md shadow-lg outline-none overflow-hidden max-h-[60vh] overflow-y-auto">
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
          className="p-2 bg-red-900/10 border border-red-800/30 text-red-700 rounded-full shadow-md hover:bg-red-900/20 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
