'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Automatically transition after a few seconds or when user clicks
    const timer = setTimeout(() => {
      handleDiscover();
    }, 4500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDiscover = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 1000); // Wait for exit animation
  };

  const text = "cadc code axis digital cameroun";
  const words = text.split(" ");
  const devSymbols = ["</>", "{ }", "[ ]", "()", ";", "#", "&&", "||", "=>"];

  // Return a static placeholder during SSR to prevent any hydration mismatch
  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-x-4 max-w-4xl px-8 text-center opacity-0">
             {words.map((word, i) => (
                <span key={i} className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase">{word}</span>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="launcher-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', // Midnight blue theme
          }}
          onClick={handleDiscover}
        >
          {/* Golden Stars */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-[#d4af37]"
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0,
              }}
              animate={{
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 180]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Web Dev Symbols */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sym-${i}`}
              className="absolute text-[#d4af37] opacity-20 font-mono text-xl md:text-3xl font-bold select-none"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360,
                opacity: 0,
              }}
              animate={{
                y: [null, -100 - Math.random() * 200],
                opacity: [0, 0.15, 0],
                rotate: [null, Math.random() * 360]
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              {devSymbols[Math.floor(Math.random() * devSymbols.length)]}
            </motion.div>
          ))}

          <motion.div 
            className="flex flex-col items-center gap-4 relative z-10 pointer-events-none"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {/* Main Text */}
            <div className="flex flex-wrap justify-center gap-x-4 max-w-4xl px-8 text-center">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase"
                  style={{
                    color: i === 0 ? '#d4af37' : '#ffffff', // First word gold, rest white
                    textShadow: i === 0 ? '0 0 20px rgba(212, 175, 55, 0.4)' : '0 0 20px rgba(255, 255, 255, 0.2)',
                    fontFamily: i === 0 ? 'serif' : 'sans-serif',
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Glowing line underneath */}
            <motion.div
              className="h-[1px] w-0 mt-8"
              style={{
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                boxShadow: '0 0 15px #d4af37'
              }}
              animate={{ width: ["0%", "80%", "40%"] }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
