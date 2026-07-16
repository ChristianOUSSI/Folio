'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { SunIcon, MoonIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '../lib/i18n';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = stored || prefers;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
        document.documentElement.classList.toggle('dark', e.newValue === 'dark');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
    { key: 'nav.home', label: t('nav.home'), index: 1 },
    { key: 'nav.about', label: t('nav.about'), index: 2 },
    { key: 'nav.skills', label: t('nav.skills'), index: 3 },
    { key: 'nav.experience', label: t('nav.experience'), index: 6 },
    { key: 'nav.certifications', label: t('nav.certifications'), index: 7 },
    { key: 'nav.projects', label: t('nav.projects'), index: 8 },
    { key: 'nav.blog', label: t('nav.blog'), index: 9 },
    { key: 'nav.contact', label: t('nav.contact'), index: 10 },
  ];

  const handleNavClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push(`/?section=${idx}`);
    } else {
      window.dispatchEvent(new CustomEvent('book-navigate', { detail: { index: idx } }));
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] group hidden md:block">
      <div className="absolute top-0 inset-x-0 h-4 bg-transparent z-[101]" />
      
      <nav 
        className="w-full bg-black/80 backdrop-blur-md border-b border-[#d4af37]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] -translate-y-full group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-500 hidden md:block" 
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-2 text-[#d4af37] font-bold text-lg tracking-wider" aria-label="Home - OJCJ">
              <span style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}>OJCJ</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-1" role="navigation">
            {navItems.map((item) => {
              return (
                <motion.div key={item.key} whileHover={{ y: -2 }}>
                  <button 
                    onClick={(e) => handleNavClick(e, item.index)}
                    className="px-3 py-2 text-sm font-serif text-gray-300 hover:text-[#d4af37] transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] group-hover:w-full transition-all duration-300" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <motion.button
              onClick={() => { window.location.href = '/'; }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-[#1a0a02] border border-[#d4af37]/50 hover:border-[#d4af37] transition-all text-[#d4af37]"
              aria-label="Go to Home"
              title="Accueil"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-[#1a0a02] border border-[#d4af37]/50 hover:border-[#d4af37] transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <SunIcon className="w-5 h-5 text-[#d4af37]" />
                </motion.div>
              ) : (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <MoonIcon className="w-5 h-5 text-[#d4af37]" />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </nav>
    </div>
  );
}
