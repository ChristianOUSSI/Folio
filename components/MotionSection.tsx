"use client";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MotionSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function MotionSection({ id, className, children }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={`${className || ''} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* manga-speed line */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-primary"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      {children}
    </motion.section>
  );
}
