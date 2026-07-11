'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { slugify } from '../utils/slugify';
import { useI18n } from '../lib/i18n';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { t } = useI18n();

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = stored || prefers;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
        document.documentElement.classList.toggle('dark', e.newValue === 'dark');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'theme', 
      newValue: newTheme,
      storageArea: localStorage 
    }));
  };

  const navItems = [
    { key: 'nav.home', label: t('nav.home'), pageIndex: 0 },
    { key: 'nav.about', label: t('nav.about'), pageIndex: 1 },
    { key: 'nav.skills', label: t('nav.skills'), pageIndex: 2 },
    { key: 'nav.experience', label: t('nav.experience'), pageIndex: 5 },
    { key: 'nav.education', label: t('nav.education'), pageIndex: 6 },
    { key: 'nav.projects', label: t('nav.projects'), pageIndex: 8 },
    { key: 'nav.certifications', label: t('nav.certifications'), pageIndex: 7 },
    { key: 'nav.contact', label: t('nav.contact'), pageIndex: 10 }
  ];

  const handleNavClick = (pageIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('book-navigate', { detail: { index: pageIndex } });
    window.dispatchEvent(event);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <a href="/" onClick={(e) => handleNavClick(0, e)} className="flex items-center space-x-2 text-blue-700 dark:text-[#d4af37] font-bold text-lg tracking-wider" aria-label="Home - OJCJ">
            <span style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}>OJCJ</span>
          </a>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-1" role="navigation">
          {navItems.map((item) => (
            <motion.div key={item.key} whileHover={{ y: -2 }}>
              <button 
                onClick={(e) => handleNavClick(item.pageIndex, e)}
                className="px-3 py-2 text-sm font-serif text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#d4af37] transition-colors relative group"
                aria-label={`Go to ${item.label} section`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-yellow-600 group-hover:w-full transition-all duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-[#d4af37]/30 hover:border-blue-400 dark:hover:border-[#d4af37] transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <SunIcon className="w-5 h-5 text-[#d4af37]" />
              </motion.div>
            ) : (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <MoonIcon className="w-5 h-5 text-blue-600" />
              </motion.div>
            )}
          </motion.button>

          {/* Mobile menu */}
          <Menu as="div" className="relative md:hidden">
            <Menu.Button className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800/50 border border-gray-300 dark:border-[#d4af37]/30 hover:border-blue-500 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Menu.Button>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/90 dark:bg-slate-900/95 border border-blue-100 dark:border-[#d4af37]/30 backdrop-blur-md">
                <div className="py-1">
                  {navItems.map((item) => (
                    <Menu.Item key={item.key}>
                      {({ active }) => (
                        <button
                          onClick={(e) => handleNavClick(item.pageIndex, e)}
                          className={`block w-full text-left font-serif px-4 py-2 text-sm transition-all ${active ? 'bg-blue-50 dark:bg-slate-800/50 text-blue-600 dark:text-[#d4af37] border-l-2 border-[#d4af37]' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#d4af37]'}`}
                        >
                          {item.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </motion.div>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
