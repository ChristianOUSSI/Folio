'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const statsLeft = [
  { value: 4, suffix: '+', label: 'Projets réalisés', icon: '◈' },
  { value: 10, suffix: '+', label: 'Certifications', icon: '⬡' },
];

const statsRight = [
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

export function StatsLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent dark:from-slate-400 dark:to-slate-300">
            Statistiques
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        >
          {statsLeft.map((stat, idx) => (
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
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium font-serif">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function StatsRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col items-center mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        >
          {statsRight.map((stat, idx) => (
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
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium font-serif">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
