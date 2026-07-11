'use client';
import { motion } from 'framer-motion';

const certificationsLeft = [
  'Architecting Scalable Python Applications',
  'Mobile Software Basics',
  'PyQt Python',
  'Python Programming',
  'Social Network SaaS',
  'Web Design',
];

const certificationsRight = [
  'Unreal Engine 5',
  'Data Acquisition with Python',
  'Cyber Security (Edureka)',
  'MOOC SecNumacadémie',
  'Paypal Account Setup',
  'Personal Brand 2025'
];

export function CertificationsLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-8 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Certifications
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 w-full">
          {certificationsLeft.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group relative h-full"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-blue-100 dark:border-blue-800 shadow-md p-4 flex flex-col items-center justify-center min-h-[100px]">
                <motion.p 
                  className="text-xl mb-2 group-hover:scale-110 transition-transform text-blue-500"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  ◈
                </motion.p>
                <p className="text-xs font-medium text-center text-gray-800 dark:text-blue-200 group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors leading-snug font-serif">
                  {cert}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsRight() {
  return (
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col mt-4 md:mt-16">
        <div className="grid grid-cols-2 gap-4 w-full">
          {certificationsRight.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group relative h-full"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-blue-100 dark:border-blue-800 shadow-md p-4 flex flex-col items-center justify-center min-h-[100px]">
                <motion.p 
                  className="text-xl mb-2 group-hover:scale-110 transition-transform text-blue-500"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  ◈
                </motion.p>
                <p className="text-xs font-medium text-center text-gray-800 dark:text-blue-200 group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors leading-snug font-serif">
                  {cert}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
