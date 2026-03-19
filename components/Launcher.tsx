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
              
              {/* Portal center - Yugo's silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #f0abfc 0%, #a855f7 30%, #4c1d95 70%, #1e1b4b 100%)',
                    boxShadow: '0 0 80px rgba(168, 85, 247, 0.9), inset 0 0 40px rgba(59, 130, 246, 0.6)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 80px rgba(168, 85, 247, 0.9), inset 0 0 40px rgba(59, 130, 246, 0.6)',
                      '0 0 100px rgba(139, 92, 246, 1), inset 0 0 50px rgba(6, 182, 212, 0.8)',
                      '0 0 80px rgba(168, 85, 247, 0.9), inset 0 0 40px rgba(59, 130, 246, 0.6)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Yugo l'Eliatrophe - detailed figure with Eliacub creating portal */}
                  <div className="w-full h-full flex items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="yugoHair" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff6b35" />
                          <stop offset="100%" stopColor="#f7931e" />
                        </linearGradient>
                        <linearGradient id="yugoCloak" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4a154b" />
                          <stop offset="100%" stopColor="#1e1b4b" />
                        </linearGradient>
                        <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                      
                      {/* Yugo's body - realistic Wakfu style */}
                      <g>
                        {/* Hair - Yugo's spiky orange hair */}
                        <path d="M35 18 L38 8 L42 15 L45 5 L50 14 L55 5 L58 15 L62 8 L65 18 Q68 22 65 26 L62 22 L58 25 L55 20 L50 24 L45 20 L42 25 L38 22 L35 26 Q32 22 35 18" fill="url(#yugoHair)" />
                        {/* Face */}
                        <ellipse cx="50" cy="32" rx="14" ry="16" fill="#ffd5b4" />
                        {/* Eyes - Yugo's blue eyes */}
                        <ellipse cx="44" cy="30" rx="3" ry="4" fill="#1e40af" />
                        <ellipse cx="56" cy="30" rx="3" ry="4" fill="#1e40af" />
                        <circle cx="45" cy="29" r="1.5" fill="white" />
                        <circle cx="57" cy="29" r="1.5" fill="white" />
                        {/* Eyebrows */}
                        <path d="M40 25 Q44 23 48 25" stroke="#c4875a" strokeWidth="1.5" fill="none" />
                        <path d="M52 25 Q56 23 60 25" stroke="#c4875a" strokeWidth="1.5" fill="none" />
                        {/* Nose */}
                        <path d="M50 32 L48 38 L50 39 L52 38" stroke="#e8b89d" strokeWidth="1" fill="none" />
                        {/* Mouth - determined expression */}
                        <path d="M46 42 Q50 44 54 42" stroke="#c97c6a" strokeWidth="1.5" fill="none" />
                        
                        {/* White adventurer outfit - Yugo's signature outfit */}
                        <path d="M35 48 L32 75 L40 78 L50 80 L60 78 L68 75 L65 48 Q50 45 35 48" fill="#f8f8f8" stroke="#ddd" strokeWidth="1" />
                        {/* Red scarf */}
                        <path d="M38 48 Q50 52 62 48 L65 55 Q50 60 35 55 Z" fill="#dc2626" />
                        <path d="M62 48 Q70 50 72 55 L68 58 Q65 52 62 50" fill="#dc2626" />
                        {/* Belt */}
                        <rect x="38" y="58" width="24" height="4" rx="1" fill="#92400e" />
                        <rect x="48" y="57" width="4" height="6" rx="1" fill="#fbbf24" />
                        
                        {/* Arms */}
                        <path d="M32 50 L22 60 L18 58 L28 48 Z" fill="#f8f8f8" stroke="#ddd" />
                        <path d="M68 50 L78 60 L82 58 L72 48 Z" fill="#f8f8f8" stroke="#ddd" />
                        {/* Hands */}
                        <circle cx="20" cy="59" r="4" fill="#ffd5b4" />
                        <circle cx="80" cy="59" r="4" fill="#ffd5b4" />
                        
                        {/* Legs */}
                        <path d="M40 78 L38 95 L44 95 L46 80" fill="#374151" />
                        <path d="M60 78 L62 95 L56 95 L54 80" fill="#374151" />
                        {/* Boots */}
                        <path d="M36 92 L38 98 L46 98 L44 92" fill="#1f2937" />
                        <path d="M64 92 L62 98 L54 98 L56 92" fill="#1f2937" />
                      </g>
                      
                      {/* Eliacub (Yugo's creature) - small fox-like creature on shoulder */}
                      <g transform="translate(60, 20)">
                        <ellipse cx="0" cy="0" rx="5" ry="4" fill="#8b5cf6" />
                        <circle cx="-3" cy="-3" r="2" fill="#a78bfa" />
                        <circle cx="3" cy="-3" r="2" fill="#a78bfa" />
                        <ellipse cx="0" cy="2" rx="1.5" ry="1" fill="#c4b5fd" />
                        {/* Tiny ears */}
                        <path d="M-4 -3 L-5 -6 L-2 -4 Z" fill="#8b5cf6" />
                        <path d="M4 -3 L5 -6 L2 -4 Z" fill="#8b5cf6" />
                        {/* Energy connection to Yugo */}
                        <path d="M-5 2 Q-10 8 -15 12" stroke="url(#portalGradient)" strokeWidth="1.5" fill="none" opacity="0.8" />
                      </g>
                      
                      {/* Portal energy - flowing from hands */}
                      <motion.g stroke="url(#portalGradient)" strokeWidth="2" fill="none" opacity="0.9">
                        <motion.path
                          d="M18 45 Q10 35 15 20"
                          animate={{ opacity: [0.4, 1, 0.4], d: ["M18 45 Q10 35 15 20", "M16 43 Q5 28 18 12", "M18 45 Q10 35 15 20"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.path
                          d="M82 45 Q90 35 85 20"
                          animate={{ opacity: [0.4, 1, 0.4], d: ["M82 45 Q90 35 85 20", "M84 43 Q95 28 82 12", "M82 45 Q90 35 85 20"] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        {/* Additional energy beams */}
                        <motion.path
                          d="M20 48 Q12 42 18 30"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.path
                          d="M80 48 Q88 42 82 30"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </motion.g>
                      
                      {/* Small portal particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.circle
                          key={i}
                          r="1.5"
                          fill={i % 2 === 0 ? '#a855f7' : '#06b6d4'}
                          initial={{ cx: 50, cy: 50, opacity: 0 }}
                          animate={{
                            cx: [50, 50 + Math.cos(i * Math.PI / 4) * 15, 50],
                            cy: [50, 50 + Math.sin(i * Math.PI / 4) * 15, 50],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </svg>
                  </div>
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
            <span className="block">Entrez dans un monde</span>
            <span className="block">Enter a world</span>
            <span className="block">Betreten Sie eine Welt</span>
            <span className="block">世界に入ってください</span>
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
