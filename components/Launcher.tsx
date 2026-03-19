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
              
              {/* Portal center - Ouroboros (Serpent eating its tail) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="snakeBody" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#065f46" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#065f46" />
                      </linearGradient>
                      <linearGradient id="snakeBelly" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a7f3d0" />
                        <stop offset="100%" stopColor="#6ee7b7" />
                      </linearGradient>
                      <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Ouroboros - Serpent in a circle */}
                    <g>
                      {/* Main body - circular snake with gap between head and tail */}
                      {/* Top arc (from right to left) */}
                      <path 
                        d="M80 50 
                           C80 25, 70 12, 50 12 
                           C30 12, 20 25, 20 50"
                        fill="none"
                        stroke="url(#snakeBody)"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      
                      {/* Bottom arc (from left to right) */}
                      <path 
                        d="M20 50 
                           C20 75, 30 88, 50 88 
                           C70 88, 80 75, 80 50"
                        fill="none"
                        stroke="url(#snakeBody)"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      
                      {/* Belly scales - top */}
                      <path 
                        d="M75 45 C70 35, 60 25, 50 25 C40 25, 30 35, 25 45"
                        fill="none"
                        stroke="url(#snakeBelly)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      
                      {/* Belly scales - bottom */}
                      <path 
                        d="M25 55 C30 65, 40 75, 50 75 C60 75, 70 65, 75 55"
                        fill="none"
                        stroke="url(#snakeBelly)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      
                      {/* Head (on the right, facing left) */}
                      <g transform="translate(82, 50)">
                        {/* Head shape */}
                        <ellipse cx="0" cy="0" rx="7" ry="5" fill="#065f46" />
                        {/* Snout */}
                        <ellipse cx="-5" cy="0" rx="3" ry="2.5" fill="#047857" />
                        {/* Eye - golden/amber */}
                        <circle cx="-2" cy="-1.5" r="1.8" fill="#fbbf24" />
                        <circle cx="-2" cy="-1.5" r="0.9" fill="#1e1b4b" />
                        {/* Nostril */}
                        <circle cx="-6" cy="-0.5" r="0.4" fill="#1e293b" />
                        <circle cx="-6" cy="0.5" r="0.4" fill="#1e293b" />
                        {/* Tongue */}
                        <path d="M-8 0 L-12 -2 M-8 0 L-12 2" stroke="#dc2626" strokeWidth="1" strokeLinecap="round" />
                      </g>
                      
                      {/* Tail (on the left, being approached by head) */}
                      <g transform="translate(18, 50)">
                        {/* Tail tip */}
                        <path d="M0 -4 Q-4 0, 0 4 Q2 0, 0 -4" fill="#065f46" />
                        {/* Tail end detail */}
                        <ellipse cx="-2" cy="0" rx="2" ry="1.5" fill="#047857" />
                      </g>
                      
                      {/* Wings - left side */}
                      <g fill="url(#wingGradient)" opacity="0.85">
                        <path d="M22 35 Q10 28, 8 18 Q15 22, 20 28 Q16 32, 22 35" />
                        <path d="M22 42 Q8 38, 6 28 Q14 34, 20 40 Q17 42, 22 42" />
                        <path d="M22 50 Q6 48, 8 38 Q15 42, 20 48 Q18 50, 22 50" />
                        <path d="M22 58 Q8 62, 6 72 Q14 64, 20 58 Q17 56, 22 58" />
                        <path d="M22 65 Q10 72, 8 82 Q15 74, 20 68 Q16 64, 22 65" />
                      </g>
                      
                      {/* Wings - right side */}
                      <g fill="url(#wingGradient)" opacity="0.85">
                        <path d="M78 35 Q90 28, 92 18 Q85 22, 80 28 Q84 32, 78 35" />
                        <path d="M78 42 Q92 38, 94 28 Q86 34, 80 40 Q83 42, 78 42" />
                        <path d="M78 50 Q94 48, 92 38 Q85 42, 80 48 Q82 50, 78 50" />
                        <path d="M78 58 Q92 62, 94 72 Q86 64, 80 58 Q83 56, 78 58" />
                        <path d="M78 65 Q90 72, 92 82 Q85 74, 80 68 Q84 64, 78 65" />
                      </g>
                      
                      {/* Scale details on body */}
                      <circle cx="50" cy="18" r="1.5" fill="#047857" opacity="0.5" />
                      <circle cx="35" cy="25" r="1" fill="#047857" opacity="0.4" />
                      <circle cx="65" cy="25" r="1" fill="#047857" opacity="0.4" />
                      <circle cx="50" cy="82" r="1.5" fill="#047857" opacity="0.5" />
                      <circle cx="35" cy="75" r="1" fill="#047857" opacity="0.4" />
                      <circle cx="65" cy="75" r="1" fill="#047857" opacity="0.4" />
                    </g>
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
