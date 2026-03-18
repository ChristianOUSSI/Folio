"use client";
import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Retour en haut"
    >
      {/* Progress ring background */}
      <svg className="absolute -inset-2 w-16 h-16" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(0, 200, 83, 0.1)"
          strokeWidth="2"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#scrollGradient)"
          strokeWidth="2"
          strokeDasharray="282.6"
          initial={{ strokeDashoffset: 282.6 }}
          animate={{ strokeDashoffset: 282.6 - (282.6 * scrollProgress) / 100 }}
          transition={{ duration: 0.5 }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C853" />
            <stop offset="100%" stopColor="#FFCC00" />
          </linearGradient>
        </defs>
      </svg>

      {/* Button background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 rounded-full shadow-lg group-hover:shadow-2xl transition-all" />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronUpIcon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.button>
  );
}
