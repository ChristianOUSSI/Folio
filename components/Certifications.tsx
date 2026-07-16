'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code, Globe, BrainCircuit, TrendingUp, Shield, Wallet, UserCheck, Gamepad2, Database } from 'lucide-react';

export function CertificationsLeft() {
  return (
    <div className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] bg-clip-text text-transparent drop-shadow-sm">
            Certifications
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 w-full">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Cpu className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Architecting Scalable Python Apps</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Globe className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Mobile Software Basics</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Code className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">PyQt Python</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Code className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Python Programming</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Globe className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Social Network SaaS</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <TrendingUp className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Web Design</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function CertificationsRight() {
  return (
    <div className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="grid grid-cols-2 gap-4 w-full mt-4 sm:mt-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Gamepad2 className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Unreal Engine 5</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Database className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Data Acquisition with Python</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <ShieldCheck className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Cyber Security (Edureka)</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Shield className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">MOOC SecNumacadémie</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <Wallet className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Paypal Account Setup</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.02 }} className="group relative h-full cursor-default">
            <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-lg border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] p-4 flex flex-col items-center justify-center min-h-[100px] transition-all">
              <UserCheck className="w-6 h-6 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform drop-shadow-md" />
              <p className="text-xs font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-snug font-serif">Personal Brand 2025</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
