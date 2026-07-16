'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Briefcase, Award, Clock, Heart } from 'lucide-react';

const stats = [
  { value: 10, suffix: '+', label: 'Projets réalisés', icon: <Briefcase className="w-8 h-8" /> },
  { value: 15, suffix: '+', label: 'Certifications', icon: <Award className="w-8 h-8" /> },
  { value: 3, suffix: '+', label: 'Années d\'expérience', icon: <Clock className="w-8 h-8" /> },
  { value: 100, suffix: '%', label: 'Passion', icon: <Heart className="w-8 h-8" /> },
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
    <section className="w-full my-auto flex flex-col items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 font-serif text-slate-950"
        >
          En <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">Chiffres</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-24 h-[2px] bg-slate-700 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg text-slate-900 font-serif leading-relaxed"
        >
          Un aperçu de mon parcours, mes accomplissements et l'énergie que je mets dans chaque projet. Des résultats concrets qui reflètent mon engagement.
        </motion.p>
      </div>
    </section>
  );
}

export function StatsRight() {
  return (
    <section className="w-full my-auto flex flex-col items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:gap-6 w-full"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 shadow-md border border-slate-300 hover:border-slate-500 transition-all group"
            >
              <div className="mb-4 text-slate-800 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-slate-900 font-medium font-serif text-center uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
