"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already clicked the button in this session
    const hasVisited = sessionStorage.getItem('portfolio_launcher_visited');
    if (hasVisited) {
      setIsVisible(false);
      onComplete?.();
    }
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
                      
                      {/* Yugo's body - wearing his characteristic cloak */}
                      <g>
                        {/* Cloak */}
                        <path d="M35 45 Q30 55 32 75 Q35 85 50 88 Q65 85 68 75 Q70 55 65 45 Z" fill="url(#yugoCloak)" />
                        {/* Head */}
                        <circle cx="50" cy="28" r="10" fill="#ffd5b4" />
                        {/* Hair - Yugo's characteristic spiky orange hair */}
                        <path d="M40 22 Q38 15 42 12 Q45 8 50 10 Q55 8 58 12 Q62 15 60 22 Q62 18 60 15 Q55 12 50 14 Q45 12 40 15 Q38 18 40 22" fill="url(#yugoHair)" />
                        {/* Eyes */}
                        <ellipse cx="46" cy="27" rx="2" ry="2.5" fill="#2d1b4e" />
                        <ellipse cx="54" cy="27" rx="2" ry="2.5" fill="#2d1b4e" />
                        {/* Determined expression */}
                        <path d="M47 32 Q50 34 53 32" stroke="#c4a77d" strokeWidth="1" fill="none" />
                        
                        {/* Arms raised creating portal - with energy flowing */}
                        {/* Left arm */}
                        <path d="M38 38 Q28 32 20 38 Q15 42 18 48 Q22 45 30 42 Q35 40 38 42" fill="#ffd5b4" />
                        {/* Right arm */}
                        <path d="M62 38 Q72 32 80 38 Q85 42 82 48 Q78 45 70 42 Q65 40 62 42" fill="#ffd5b4" />
                        
                        {/* Legs */}
                        <ellipse cx="44" cy="78" rx="4" ry="8" fill="#3d2a5c" />
                        <ellipse cx="56" cy="78" rx="4" ry="8" fill="#3d2a5c" />
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
            className="text-purple-300 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Entrez dans un monde de代码
          </motion.p>

          {/* Découvrir Button */}
          <motion.button
            onClick={handleDiscover}
            className="px-10 py-4 text-xl font-bold rounded-full relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(37, 99, 235, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white flex items-center gap-2">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <span>Découvrir</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                🌌
              </motion.span>
            </span>
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.5))',
                filter: 'blur(10px)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
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
