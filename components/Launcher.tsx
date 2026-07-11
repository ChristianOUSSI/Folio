'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically transition after a few seconds or when user clicks
    const timer = setTimeout(() => {
      handleDiscover();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDiscover = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 1000); // Wait for exit animation
  };

  const text = "cadc code axis digital cameroun";
  const words = text.split(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', // Midnight blue theme
          }}
          onClick={handleDiscover}
        >
          {/* Subtle golden particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'rgba(212, 175, 55, 0.4)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
              }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, -100 - Math.random() * 200],
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div 
            className="flex flex-col items-center gap-4 relative z-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
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
              animate={{ w: "100%", width: ["0%", "80%", "40%"] }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
