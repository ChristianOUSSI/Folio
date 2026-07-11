'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';

export function ContactLeft() {
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

    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:christian.oussi01@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full h-full flex flex-col justify-start px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 font-serif">
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
              Me Contacter
            </span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-xs font-serif">
            Une question, un projet ? N'hésitez pas !
          </p>
        </motion.div>

        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-30 group-hover:opacity-50 rounded-2xl blur transition duration-300" />
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-sm">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-2">🚀</div>
                  <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-1 font-serif">
                    Message envoyé !
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-serif">
                    Je vous répondrai rapidement.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-xs"
                      placeholder="Votre message..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 text-xs uppercase tracking-wider"
                    >
                      {isSubmitting ? 'Envoi...' : 'Envoyer'}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col gap-6 mt-4 md:mt-24">
        {/* Phone Numbers */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-2xl text-white">◈</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1 font-serif">Téléphones</h4>
            <div className="flex flex-col">
              <a href="tel:+237691223916" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs">
                +237 691 223 916
              </a>
              <a href="tel:+237670008202" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs">
                +237 670 008 202
              </a>
              <a href="tel:+237659845024" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs">
                +237 659 845 024
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Emails */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-5 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-2xl text-white">◇</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1 font-serif">Emails</h4>
            <div className="flex flex-col">
              <a href="mailto:christian.oussi01@gmail.com" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-xs truncate">
                christian.oussi01@gmail.com
              </a>
              <a href="mailto:wassatherese@gmail.com" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-xs truncate">
                wassatherese@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Location */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-5 rounded-2xl border border-green-200 dark:border-green-800 shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-2xl text-white">⬡</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1 font-serif">Localisation</h4>
            <div className="flex flex-col">
              <p className="text-green-700 dark:text-green-300 font-medium text-xs">Bonaberi, Douala</p>
              <p className="text-green-700 dark:text-green-300 font-medium text-xs">Cameroun</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
