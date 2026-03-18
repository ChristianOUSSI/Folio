"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ParticleBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate tech-inspired particles
    const count = 30;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles - tech dots */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'rgba(59, 130, 246, 0.4)',
            boxShadow: '0 0 6px rgba(59, 130, 246, 0.6)'
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Circuit-like lines - subtle horizontal lines */}
      <motion.div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        style={{ top: '20%' }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent"
        style={{ top: '40%' }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
        style={{ top: '60%' }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      <motion.div 
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        style={{ top: '80%' }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Corner tech decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 20 L0 0 L20 0" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1" />
          <circle cx="5" cy="5" r="2" fill="rgba(59, 130, 246, 0.8)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100 20 L100 0 L80 0" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1" />
          <circle cx="95" cy="5" r="2" fill="rgba(59, 130, 246, 0.8)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 80 L0 100 L20 100" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1" />
          <circle cx="5" cy="95" r="2" fill="rgba(59, 130, 246, 0.8)" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100 80 L100 100 L80 100" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1" />
          <circle cx="95" cy="95" r="2" fill="rgba(59, 130, 246, 0.8)" />
        </svg>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
