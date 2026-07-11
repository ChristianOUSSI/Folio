'use client';
import { motion } from 'framer-motion';

interface InkTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function InkText({ children, className = '', delay = 0 }: InkTextProps) {
  return (
    <motion.span
      className={`inline-block relative ${className}`}
      initial={{ opacity: 0, filter: 'blur(4px)', clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.span>
  );
}
