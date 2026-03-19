'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show launcher on every page load - no session storage check
    // Launcher shows every time the user visits
  }, [onComplete]);

  const handleDiscover = () => {
    sessionStorage.setItem('portfolio_launcher_visited', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0d1b2a 100%)',
          }}
        >
          {/* Animated Portal */}
          <div className="relative mb-8">
            {/* Portal glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Portal rings */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-80" 
                style={{
                  border: '4px solid',
                  borderImage: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4) 1',
                }}
              />
              {/* Inner rings */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-purple-400/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border-2 border-blue-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border-2 border-cyan-400/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Portal center - Ouroboros from Fullmetal Alchemist Brotherhood */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="ouroborosBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="ouroborosWings" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                      <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    
                    {/* Ouroboros - Snake/Dragon eating its tail */}
                    <g>
                      {/* Dragon body forming circle */}
                      <path 
                        d="M50 10 
                           C30 10, 15 25, 15 45 
                           C15 55, 20 62, 25 68 
                           L20 75 L30 70 L35 65
                           C30 70, 28 78, 30 85
                           C35 95, 45 98, 50 98
                           C55 98, 65 95, 70 85
                           C72 78, 70 70, 65 65
                           L70 70 L80 75 L75 68
                           C80 62, 85 55, 85 45
                           C85 25, 70 10, 50 10 Z"
                        fill="url(#ouroborosBody)"
                        stroke="#1e40af"
                        strokeWidth="1"
                      />
                      
                      {/* Scales pattern */}
                      <path d="M25 45 Q30 40, 35 45" stroke="#60a5fa" strokeWidth="0.5" fill="none" opacity="0.5"/>
                      <path d="M65 45 Q70 40, 75 45" stroke="#60a5fa" strokeWidth="0.5" fill="none" opacity="0.5"/>
                      
                      {/* Wings */}
                      <g fill="url(#ouroborosWings)" opacity="0.9">
                        {/* Left wing */}
                        <path d="M15 35 C5 25, 0 15, 5 10 C10 15, 15 20, 20 25 C18 28, 16 32, 15 35" />
                        <path d="M18 40 C8 35, 2 28, 5 22 C10 28, 15 32, 20 38 C19 39, 18 40, 18 40" />
                        {/* Right wing */}
                        <path d="M85 35 C95 25, 100 15, 95 10 C90 15, 85 20, 80 25 C82 28, 84 32, 85 35" />
                        <path d="M82 40 C92 35, 98 28, 95 22 C90 28, 85 32, 80 38 C81 39, 82 40, 82 40" />
                      </g>
                      
                      {/* Head (right side - eating tail */}
                      <ellipse cx="75" cy="68" rx="6" ry="4" fill="#1e3a8a" />
                      <circle cx="77" cy="67" r="1.5" fill="#fbbf24" />
                      
                      {/* Tail (left side - being eaten */}
                      <path d="M25 68 Q20 70, 22 75 Q25 78, 30 75" fill="#1e3a8a" />
                      
                      {/* Teeth/Details */}
                      <path d="M72 66 L74 64 L76 66" fill="#f59e0b" />
                      <path d="M78 66 L80 64 L82 65" fill="#f59e0b" />
                    </g>
                    
                    {/* Center sun/circle */}
                    <circle cx="50" cy="50" r="12" fill="url(#sunGradient)" />
                    <circle cx="50" cy="50" r="8" fill="none" stroke="#b45309" strokeWidth="1" />
                    <circle cx="50" cy="50" r="4" fill="#fef3c7" />
                    
                    {/* Alchemical symbols around */}
                    <text x="50" y="20" textAnchor="middle" fill="#60a5fa" fontSize="6" opacity="0.7">☉</text>
                    <text x="50" y="85" textAnchor="middle" fill="#60a5fa" fontSize="6" opacity="0.7">☾</text>
                    <text x="20" y="52" textAnchor="middle" fill="#60a5fa" fontSize="6" opacity="0.7">♀</text>
                    <text x="80" y="52" textAnchor="middle" fill="#60a5fa" fontSize="6" opacity="0.7">♂</text>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center mb-2"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            PORTFOLIO
          </motion.h1>
          
          <motion.p
            className="text-purple-300 text-lg mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="block">Entrez dans un monde de code</span>
            <span className="block">Enter a world of code</span>
            <span className="block">Betreten Sie eine Welt des Codes</span>
            <span className="block">コードの世界に入ってください</span>
          </motion.p>

          {/* Découvrir Button - Futuristic Tech Style */}
          <motion.button
            onClick={handleDiscover}
            className="px-10 py-4 text-xl font-bold rounded-full relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
              border: '2px solid #06b6d4',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white flex items-center gap-3">
              {/* Tech icons */}
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-cyan-400"
              >
                ⌬
              </motion.span>
              <span className="tracking-widest">DÉCOUVRIR</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-purple-400"
              >
                ⚡
              </motion.span>
            </span>
            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            {/* Corner accents */}
            <div className="absolute top-1 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
            <div className="absolute top-1 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
            <div className="absolute bottom-1 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
            <div className="absolute bottom-1 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400 rounded-br" />
          </motion.button>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#3b82f6' : '#06b6d4',
                boxShadow: `0 0 10px ${i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#3b82f6' : '#06b6d4'}`,
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, -100 - Math.random() * 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}

          {/* Portal energy beams */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64"
            style={{
              background: 'linear-gradient(to top, rgba(139, 92, 246, 0.3), transparent)',
              filter: 'blur(30px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
