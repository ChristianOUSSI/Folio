'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useI18n();

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
            {/* Portal glow - subtle and elegant */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)',
                filter: 'blur(25px)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
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
              {/* Outer ring - subtle */}
              <div className="absolute inset-0 rounded-full opacity-60" 
                style={{
                  border: '3px solid',
                  borderImage: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6)) 1',
                }}
              />
              {/* Inner rings - subtle */}
              <motion.div
                className="absolute inset-4 rounded-full border border-purple-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-blue-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-cyan-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Portal center - OJCJ Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {/* Outer decorative ring - subtle */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '1.5px solid',
                      borderImage: 'linear-gradient(90deg, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.5)) 1',
                      opacity: 0.5,
                    }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* OJCJ Text with breathing animation */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    style={{
                      width: '120px',
                      height: '120px',
                    }}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span
                      className="text-6xl md:text-7xl font-bold tracking-wider"
                      style={{
                        background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                        fontFamily: "'Special Elite', 'Courier Prime', monospace",
                        fontWeight: 'bold',
                      }}
                    >
                      OJCJ
                    </span>
                  </motion.div>
                  
                  {/* Inner glow effect - subtle */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Title - elegant fade-in */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center mb-2"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Special Elite', 'Courier Prime', monospace",
              letterSpacing: '0.15em',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            PORTFOLIO
          </motion.h1>
          
          <motion.p
            className="text-purple-300 text-lg md:text-xl mb-8 text-center font-light"
            style={{ fontFamily: "'Special Elite', 'Courier Prime', monospace" }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t('launcher.line1')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {t('launcher.line2')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {t('launcher.line3')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {t('launcher.line4')}
            </motion.span>
          </motion.p>

          {/* Découvrir Button - Elegant and subtle */}
          <motion.button
            onClick={handleDiscover}
            className="px-10 py-4 text-xl font-bold rounded-full relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
              border: '2px solid rgba(6, 182, 212, 0.6)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 15px rgba(6, 182, 212, 0.08)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.15)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 text-white flex items-center gap-3">
              {/* Tech icons - subtle */}
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="text-cyan-400/70"
              >
                ⌬
              </motion.span>
              <span className="tracking-widest">{t('launcher.discover')}</span>
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-purple-400/70"
              >
                ◇
              </motion.span>
            </span>
            {/* Scanning line effect - subtle */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            {/* Corner accents - subtle */}
            <div className="absolute top-1 left-2 w-1.5 h-1.5 border-t border-l border-cyan-400/50 rounded-tl" />
            <div className="absolute top-1 right-2 w-1.5 h-1.5 border-t border-r border-cyan-400/50 rounded-tr" />
            <div className="absolute bottom-1 left-2 w-1.5 h-1.5 border-b border-l border-cyan-400/50 rounded-bl" />
            <div className="absolute bottom-1 right-2 w-1.5 h-1.5 border-b border-r border-cyan-400/50 rounded-br" />
          </motion.button>

          {/* Floating particles - subtle and elegant */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 3 === 0 ? 'rgba(168, 85, 247, 0.6)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(6, 182, 212, 0.6)',
                boxShadow: `0 0 8px ${i % 3 === 0 ? 'rgba(168, 85, 247, 0.4)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(6, 182, 212, 0.4)'}`,
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, -80 - Math.random() * 150],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Portal energy beams - subtle */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64"
            style={{
              background: 'linear-gradient(to top, rgba(139, 92, 246, 0.2), transparent)',
              filter: 'blur(35px)',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleY: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
