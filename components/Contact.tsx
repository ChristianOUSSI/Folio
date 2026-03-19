'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent, useEffect } from 'react';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

// LinkedIn profile URL
const LINKEDIN_URL = 'https://www.linkedin.com/in/christian-oussingletoua';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:christian.oussi01@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setSubmitStatus('success');
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: '', email: '', message: '' });

    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <MotionSection id={slugify('Contact')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-20 right-10 text-4xl text-blue-200/20 dark:text-blue-700/20 font-mono">{'</>'}</span>
        <span className="absolute bottom-32 left-16 text-3xl text-purple-300/15 dark:text-purple-600/15 font-mono">[ ]</span>
        <span className="absolute top-1/2 left-8 text-2xl text-purple-300/20 dark:text-purple-600/20 font-mono">{'{ }'}</span>
        
        {/* Binary numbers */}
        <span className="absolute top-1/4 right-1/4 text-xs text-blue-400/20 dark:text-blue-500/20 font-mono">01001001</span>
        <span className="absolute bottom-1/3 left-10 text-xs text-purple-300/15 dark:text-purple-500/15 font-mono">110101</span>
        
        {/* Decorative dots */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/25 rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-1 h-1 bg-purple-400/20 rounded-full" />
        <div className="absolute top-2/3 left-20 w-1 h-1 bg-blue-300/20 rounded-full" />
        
        {/* Circuit lines */}
        <div className="absolute top-20 right-1/3 w-px h-16 bg-gradient-to-b from-blue-400/15 to-transparent" />
        <div className="absolute bottom-40 left-1/2 w-px h-20 bg-gradient-to-b from-purple-400/10 to-transparent" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
              Me Contacter
            </span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Une question, un projet, ou simplement envie de discuter ? N'hésitez pas à me laisser un message !
          </p>
        </motion.div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-30 group-hover:opacity-50 rounded-2xl blur transition duration-300" />
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-blue-100 dark:border-blue-800">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Merci pour votre message. Je vous répondrai rapidement.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Envoi...
                        </span>
                      ) : (
                        'Envoyer le message'
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Contact Info - Phones, Emails, Location */}
                  <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Phone Numbers */}
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
                      >
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-2xl">📱</span>
                        </div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3">Téléphones</h4>
                        <div className="space-y-2">
                          <a href="tel:+237690000000" className="block text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 text-center transition-colors">
                            +237 691 223 916
                          </a>
                          <a href="tel:+237650000000" className="block text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 text-center transition-colors">
                            +237 670 008 202
                          </a>
                          <a href="tel:+237670000000" className="block text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 text-center transition-colors">
                            +237 659 845 024
                          </a>
                        </div>
                      </motion.div>
                      
                      {/* Emails */}
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
                      >
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-2xl">✉️</span>
                        </div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3">Emails</h4>
                        <div className="space-y-2">
                          <a href="mailto:christian.oussi01@gmail.com" className="block text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 text-center transition-colors text-sm">
                            christian.oussi01@gmail.com
                          </a>
                          <a href="mailto:wassatherese@mail.com" className="block text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 text-center transition-colors text-sm">
                            wassatherese@gmail.com
                          </a>
                        </div>
                      </motion.div>
                      
                      {/* Location */}
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
                      >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-2xl">📍</span>
                        </div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3">Localisation</h4>
                        <div className="text-center">
                          <p className="text-green-700 dark:text-green-300 font-medium">Bonaberi, Douala</p>
                          <p className="text-green-700 dark:text-green-300 font-medium">Cameroun</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
