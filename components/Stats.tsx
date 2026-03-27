'use client';

import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';
import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 4, suffix: '+', label: 'Projets réalisés', icon: '◈' },
  { value: 10, suffix: '+', label: 'Certifications', icon: '⬡' },
  { value: 3, suffix: '+', label: 'Années d\'expérience', icon: '◇' },
  { value: 100, suffix: '%', label: 'Passion', icon: '⬢' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <MotionSection id={slugify('Stats')} className="py-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all group"
            >
              <div className="text-3xl mb-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
