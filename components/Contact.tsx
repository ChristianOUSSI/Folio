'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent, useEffect } from 'react';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCSRFToken] = useState<string>('');

  useEffect(() => {
    // Fetch CSRF token from server
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        setCSRFToken(data.token);
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
      }
    };
    fetchCSRFToken();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Open email client with pre-filled content
    const subject = encodeURIComponent(`Message de ${name} - Portfolio`);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:christian.oussi01@gmail.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setIsLoading(false);
    setTimeout(() => setSubmitted(false), 4000);
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <MotionSection id={slugify('Contact')} className="py-20 px-4 relative bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Code symbols */}
        <span className="absolute top-20 left-16 text-4xl text-blue-200/20 dark:text-blue-700/20 font-mono">{'{ }'}</span>
        <span className="absolute bottom-40 right-10 text-3xl text-purple-300/15 dark:text-purple-600/15 font-mono">[ ]</span>
        <span className="absolute top-1/2 right-16 text-2xl text-blue-300/20 dark:text-blue-600/20 font-mono">{'</>'}</span>
        <span className="absolute bottom-20 left-1/4 text-2xl text-purple-200/15 dark:text-purple-500/15 font-mono">/* */</span>
        {/* Binary */}
        <span className="absolute top-1/3 left-10 text-xs text-blue-400/20 dark:text-blue-500/20 font-mono">01110110</span>
        <span className="absolute bottom-1/3 right-1/4 text-xs text-purple-300/15 dark:text-purple-500/15 font-mono">100101</span>
        <span className="absolute top-1/2 left-20 text-xs text-blue-300/15 dark:text-blue-500/15 font-mono">010011</span>
        {/* Tech dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/25 rounded-full" />
        <div className="absolute bottom-1/4 right-16 w-1 h-1 bg-purple-400/20 rounded-full" />
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-blue-300/20 rounded-full" />
        <div className="absolute bottom-1/3 left-16 w-2 h-2 bg-purple-300/15 rounded-full" />
        {/* Circuit lines */}
        <div className="absolute top-32 right-1/3 w-px h-16 bg-gradient-to-b from-blue-400/15 to-transparent" />
        <div className="absolute bottom-40 left-1/2 w-px h-20 bg-gradient-to-b from-purple-400/10 to-transparent" />
        {/* Blur orbs */}
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-blue-50/50 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
         Contactez-moi
        </span>
      </motion.h2>

      <div className="max-w-2xl mx-auto relative z-10">
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg text-sm flex items-center gap-2"
            >
              <span className="text-xl">✓</span>
              <span>Message envoyé avec succès ! Je vous répondrai rapidement.</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg text-sm flex items-center gap-2"
            >
              <span className="text-xl">✕</span>
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-20 rounded-xl blur transition duration-300" />
          
          <form
            onSubmit={handleSubmit}
            name="contact"
            method="POST"
            className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-xl border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all space-y-4 shadow-lg"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Name field */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <label htmlFor="name-field" className="block text-sm text-blue-800 dark:text-blue-300 mb-2">
                Nom complet <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="name-field"
                type="text"
                name="name"
                required
                aria-required="true"
                aria-describedby="name-error"
                placeholder="Votre nom..."
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm text-gray-900 dark:text-blue-100"
              />
            </motion.div>

            {/* Email field */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <label htmlFor="email-field" className="block text-sm text-blue-800 dark:text-blue-300 mb-2">
                Email <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="email-field"
                type="email"
                name="email"
                required
                aria-required="true"
                aria-describedby="email-error"
                placeholder="votre.email@exemple.com"
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm text-gray-900 dark:text-blue-100"
              />
            </motion.div>

            {/* Message field */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <label htmlFor="message-field" className="block text-sm text-blue-800 dark:text-blue-300 mb-2">
                Message <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="message-field"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-describedby="message-error"
                placeholder="Votre message ici..."
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm resize-none text-gray-900 dark:text-blue-100"
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white font-bold rounded-lg border border-blue-500 dark:border-blue-600 hover:border-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Envoyer le message</span>
                  <span>→</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact info */}
        <div className="space-y-4 text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-bold text-gray-900 dark:text-blue-300 mb-6"
          >
            Me contacter directement
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
              <span className="text-2xl">📞</span>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Téléphones</p>
                <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">+237 691 223 916 • 670 008 202 • 659 845 024</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Emails</p>
                <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">Christian.oussi01@gmail.com / wassatherese@gmail.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
              <span className="text-2xl">🌍</span>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">Localisation</p>
                <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">Douala, Cameroun 🇨🇲</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
