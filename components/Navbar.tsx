'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { slugify } from '../utils/slugify';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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
    // Dispatch event for other tabs
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'theme', 
      newValue: newTheme,
      storageArea: localStorage 
    }));
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/30" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/" className="flex items-center space-x-2 text-blue-700 dark:text-blue-400 font-bold text-lg" aria-label="Home - Chris OUSSI">
            <span>Chris OUSSI</span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-1" role="navigation">
          {['Accueil', 'À propos', 'Compétences', 'Expériences', 'Formations', 'Projets', 'Certifications', 'Contact'].map((item) => (
            <motion.div key={item} whileHover={{ y: -2 }}>
              <Link 
                href={`#${slugify(item)}`} 
                className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                aria-label={`Go to ${item} section`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <SunIcon className="w-5 h-5 text-secondary" />
              </motion.div>
            ) : (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <MoonIcon className="w-5 h-5 text-blue-600" />
              </motion.div>
            )}
          </motion.button>

          {/* Mobile menu */}
          <Menu as="div" className="relative md:hidden">
            <Menu.Button className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-300 dark:border-blue-800 hover:border-blue-500 transition-all">
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/90 dark:bg-slate-900/95 border border-blue-100 dark:border-blue-800 backdrop-blur-md">
                <div className="py-1">
                  {['Accueil', 'À propos', 'Compétences', 'Expériences', 'Formations', 'Projets', 'Certifications', 'Contact'].map((item) => (
                    <Menu.Item key={item}>
                      {({ active }) => (
                        <Link
                          href={`#${slugify(item)}`}
                          className={`block px-4 py-2 text-sm transition-all ${active ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                          {item}
                        </Link>
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
