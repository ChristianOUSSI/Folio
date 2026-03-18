"use client";
import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

const certifications = [
  'Architecting Scalable Python Applications',
  'Mobile Software Basics',
  'PyQt Python',
  'Python Programming',
  'Social Network SaaS',
  'Web Design',
  'Unreal Engine 5',
  'Data Acquisition with Python',
  'Cyber Security (Edureka)',
  'MOOC SecNumacadémie',
  'Paypal Account Setup',
  'Personal Brand 2025'
];

export default function Certifications() {
  return (
    <MotionSection id={slugify('Certifications')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Soft background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 dark:bg-blue-900/15 rounded-full blur-3xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
          Certifications
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto relative z-10">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.1 }}
            className="group relative h-full"
            whileHover={{ scale: 1.03 }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-25 rounded-lg blur transition duration-300" />
            
            <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all p-6 flex flex-col items-center justify-center min-h-[140px] shadow-md">
              <motion.p 
                className="text-3xl mb-3 group-hover:scale-110 transition-transform"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
              >
                🏆
              </motion.p>
              
              <motion.p 
                className="text-sm font-medium text-center text-gray-800 dark:text-blue-200 group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors leading-snug"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 + 0.1 }}
              >
                {cert}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
