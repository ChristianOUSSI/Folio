'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code, Globe, BrainCircuit, TrendingUp, Shield, Wallet, UserCheck, Gamepad2, Database } from 'lucide-react';

const certificationsLeft = [
  { name: 'Architecting Scalable Python Apps', icon: <Cpu className="w-4 h-4 text-slate-800" /> },
  { name: 'Mobile Software Basics', icon: <Globe className="w-4 h-4 text-slate-800" /> },
  { name: 'PyQt Python', icon: <Code className="w-4 h-4 text-slate-800" /> },
  { name: 'Python Programming', icon: <Code className="w-4 h-4 text-slate-800" /> },
  { name: 'Social Network SaaS', icon: <Globe className="w-4 h-4 text-slate-800" /> },
  { name: 'Web Design', icon: <TrendingUp className="w-4 h-4 text-slate-800" /> },
];

const certificationsRight = [
  { name: 'Unreal Engine 5', icon: <Gamepad2 className="w-4 h-4 text-slate-800" /> },
  { name: 'Data Acquisition with Python', icon: <Database className="w-4 h-4 text-slate-800" /> },
  { name: 'Cyber Security (Edureka)', icon: <ShieldCheck className="w-4 h-4 text-slate-800" /> },
  { name: 'MOOC SecNumacadémie', icon: <Shield className="w-4 h-4 text-slate-800" /> },
  { name: 'Paypal Account Setup', icon: <Wallet className="w-4 h-4 text-slate-800" /> },
  { name: 'Personal Brand 2025', icon: <UserCheck className="w-4 h-4 text-slate-800" /> },
];

export function CertificationsLeft() {
  return (
    <div className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 w-full">
          {certificationsLeft.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative h-full cursor-default"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-md hover:shadow-lg p-3 flex flex-col items-center justify-center min-h-[80px] transition-all">
                <div className="mb-1.5 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </motion.div>
                <p className="text-[10px] md:text-xs font-medium text-center text-slate-900  group-hover:text-slate-800  transition-colors leading-snug font-serif">
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
    <div className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="grid grid-cols-2 gap-3 w-full">
          {certificationsRight.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative h-full cursor-default"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-md hover:shadow-lg p-3 flex flex-col items-center justify-center min-h-[80px] transition-all">
                <div className="mb-1.5 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </motion.div>
                <p className="text-[10px] md:text-xs font-medium text-center text-slate-900  group-hover:text-slate-800  transition-colors leading-snug font-serif">
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
