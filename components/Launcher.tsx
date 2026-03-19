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
                      <linearGradient id="ouroborosBody" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="30%" stopColor="#3b82f6" />
                        <stop offset="70%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#1e3a8a" />
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
                    
                    {/* Ouroboros - Dragon/Serpent in a circle */}
                    <g>
                      {/* Main body - circular snake */}
                      <path 
                        d="M50 8 
                           C25 8, 8 25, 8 50 
                           C8 75, 25 92, 50 92 
                           C75 92, 92 75, 92 50 
                           C92 25, 75 8, 50 8 Z"
                        fill="none"
                        stroke="url(#ouroborosBody)"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      
                      {/* Head (top right, facing left to eat tail) */}
                      <g transform="translate(85, 50)">
                        {/* Head base */}
                        <ellipse cx="0" cy="0" rx="8" ry="6" fill="#1e3a8a" />
                        {/* Snout */}
                        <ellipse cx="-6" cy="0" rx="4" ry="3" fill="#1e3a8a" />
                        {/* Eye */}
                        <circle cx="-2" cy="-2" r="2" fill="#fbbf24" />
                        <circle cx="-2" cy="-2" r="1" fill="#1e1b4b" />
                        {/* Horns */}
                        <path d="M-4 -5 L-6 -9 L-2 -6" fill="#6366f1" />
                        <path d="M2 -5 L4 -9 L0 -6" fill="#6366f1" />
                        {/* Teeth */}
                        <path d="M-8 -1 L-10 -2 L-9 0" fill="#fef3c7" />
                        <path d="M-8 1 L-10 2 L-9 0" fill="#fef3c7" />
                        {/* Mouth opening to eat tail */}
                        <ellipse cx="-10" cy="0" rx="3" ry="4" fill="#1e1b4b" />
                      </g>
                      
                      {/* Tail (being eaten on the left) */}
                      <g transform="translate(15, 50)">
                        <path d="M0 -4 Q8 0, 0 4 Q-2 0, 0 -4" fill="#1e3a8a" />
                        {/* Tail tip going into mouth */}
                        <path d="M-2 -2 L-8 0 L-2 2" fill="#3b82f6" />
                      </g>
                      
                      {/* Wings - left side */}
                      <g fill="url(#ouroborosWings)" opacity="0.85">
                        <path d="M8 35 Q2 25, 8 15 Q15 20, 18 28 Q14 32, 8 35" />
                        <path d="M8 45 Q0 40, 2 30 Q10 35, 15 42 Q12 44, 8 45" />
                        <path d="M8 55 Q2 60, 8 70 Q15 62, 18 55 Q14 53, 8 55" />
                      </g>
                      
                      {/* Wings - right side */}
                      <g fill="url(#ouroborosWings)" opacity="0.85">
                        <path d="M92 35 Q98 25, 92 15 Q85 20, 82 28 Q86 32, 92 35" />
                        <path d="M92 45 Q100 40, 98 30 Q90 35, 85 42 Q88 44, 92 45" />
                        <path d="M92 55 Q98 60, 92 70 Q85 62, 82 55 Q86 53, 92 55" />
                      </g>
                      
                      {/* Scales/details on body */}
                      <path d="M15 35 Q20 30, 25 35" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.5"/>
                      <path d="M75 35 Q80 30, 85 35" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.5"/>
                      <path d="M15 65 Q20 70, 25 65" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.5"/>
                      <path d="M75 65 Q80 70, 85 65" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.5"/>
                    </g>
                    
                    {/* Center sun/circle */}
                    <circle cx="50" cy="50" r="14" fill="url(#sunGradient)" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#b45309" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="5" fill="#fef3c7" />
                    
                    {/* Alchemical symbols */}
                    <text x="50" y="18" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="bold">☉</text>
                    <text x="50" y="88" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="bold">☾</text>
                    <text x="18" y="52" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="bold">♀</text>
                    <text x="82" y="52" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="bold">♂</text>
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
