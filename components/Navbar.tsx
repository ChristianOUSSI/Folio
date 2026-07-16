'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { SunIcon, MoonIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import { useI18n } from '../lib/i18n';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();
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
    { key: 'nav.home', label: t('nav.home'), href: '/' },
    { key: 'nav.about', label: t('nav.about'), href: '/about' },
    { key: 'nav.skills', label: t('nav.skills'), href: '/skills' },
    { key: 'nav.experience', label: t('nav.experience'), href: '/experience' },
    { key: 'nav.certifications', label: t('nav.certifications'), href: '/certifications' },
    { key: 'nav.projects', label: t('nav.projects'), href: '/projects' },
    { key: 'nav.blog', label: t('nav.blog'), href: '/blog' },
    { key: 'nav.contact', label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] group hidden md:block">
      {/* Invisible hover trigger zone at the very top */}
      <div className="absolute top-0 inset-x-0 h-4 bg-transparent z-[101]" />
      
      <nav 
        className="w-full bg-white/95  backdrop-blur-md border-b border-slate-200  shadow-[0_4px_30px_rgba(0,0,0,0.1)] -translate-y-full group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-500 hidden md:block" 
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-2 text-blue-700  font-bold text-lg tracking-wider" aria-label="Home - OJCJ">
              <span style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}>OJCJ</span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}  
          <div className="hidden md:flex space-x-1" role="navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={item.key} whileHover={{ y: -2 }}>
                  <Link href={item.href} 
                    className={`px-3 py-2 text-sm font-serif text-gray-700  hover:text-blue-600  transition-colors relative group ${isActive ? 'font-medium' : ''}`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-yellow-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side controls */}  
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Close button (could go to home) */}
            <motion.button
              onClick={() => { window.location.href = '/'; }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-red-50  border border-red-200  hover:border-red-400  hover:bg-red-100  transition-all text-red-600 "
              aria-label="Go to Home"
              title="Accueil"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-blue-50  border border-blue-200  hover:border-blue-400  transition-all"
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
              <Menu.Button className="p-2 rounded-md text-gray-700  hover:bg-blue-50  border border-gray-300  hover:border-blue-500 transition-all">
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/90  border border-blue-100  backdrop-blur-md">
                  <div className="py-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Menu.Item key={item.key}>
                          {({ active }) => (
                            <Link href={item.href}
                              className={`block w-full text-left font-serif px-4 py-2 text-sm transition-all ${isActive || active ? 'font-medium' : ''}`}
                            >
                              {item.label}
                            </Link>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </motion.div>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
}
