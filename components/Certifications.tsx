'use client';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code, Globe, BrainCircuit, TrendingUp, Shield, Wallet, UserCheck, Gamepad2, Database } from 'lucide-react';

const certificationsLeft = [
  { name: 'Architecting Scalable Python Apps', icon: <Cpu className="w-4 h-4 text-blue-500" /> },
  { name: 'Mobile Software Basics', icon: <Globe className="w-4 h-4 text-blue-500" /> },
  { name: 'PyQt Python', icon: <Code className="w-4 h-4 text-blue-500" /> },
  { name: 'Python Programming', icon: <Code className="w-4 h-4 text-blue-500" /> },
  { name: 'Social Network SaaS', icon: <Globe className="w-4 h-4 text-blue-500" /> },
  { name: 'Web Design', icon: <TrendingUp className="w-4 h-4 text-blue-500" /> },
];

const certificationsRight = [
  { name: 'Unreal Engine 5', icon: <Gamepad2 className="w-4 h-4 text-blue-500" /> },
  { name: 'Data Acquisition with Python', icon: <Database className="w-4 h-4 text-blue-500" /> },
  { name: 'Cyber Security (Edureka)', icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> },
  { name: 'MOOC SecNumacadémie', icon: <Shield className="w-4 h-4 text-blue-500" /> },
  { name: 'Paypal Account Setup', icon: <Wallet className="w-4 h-4 text-blue-500" /> },
  { name: 'Personal Brand 2025', icon: <UserCheck className="w-4 h-4 text-blue-500" /> },
];

export function CertificationsLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            Certifications
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 w-full">
          {certificationsLeft.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="group relative h-full cursor-default"
            >
              <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg p-3 flex flex-col items-center justify-center min-h-[80px] transition-all">
                <motion.div 
                  className="mb-1.5 group-hover:scale-110 transition-transform"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  {cert.icon}
                </motion.div>
                <p className="text-[10px] md:text-xs font-medium text-center text-gray-800 dark:text-blue-200 group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors leading-snug font-serif">
                  {cert.name}
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
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="grid grid-cols-2 gap-3 w-full">
          {certificationsRight.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="group relative h-full cursor-default"
            >
              <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg p-3 flex flex-col items-center justify-center min-h-[80px] transition-all">
                <motion.div 
                  className="mb-1.5 group-hover:scale-110 transition-transform"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  {cert.icon}
                </motion.div>
                <p className="text-[10px] md:text-xs font-medium text-center text-gray-800 dark:text-blue-200 group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors leading-snug font-serif">
                  {cert.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
