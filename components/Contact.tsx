'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import InkText from './InkText';

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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 font-serif">
            <InkText className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] bg-clip-text text-transparent drop-shadow-sm">
              Me Contacter
            </InkText>
          </h2>
          <p className="text-center text-[#1a0a02] mb-4 text-xs font-serif">
            Une question, un projet ? N'hésitez pas !
          </p>
        </motion.div>

        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] opacity-30 group-hover:opacity-50 rounded-2xl blur transition duration-300" />
          <div className="relative bg-black/90 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-2">🚀</div>
                  <h3 className="text-lg font-bold text-[#d4af37] mb-1 font-serif">
                    Message envoyé !
                  </h3>
                  <p className="text-xs text-gray-300 font-serif">
                    Je vous répondrai rapidement.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-[#1a0a02]/80 border border-[#8a6d1c]/50 text-white hover:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all text-xs"
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
                        className="w-full px-3 py-2 rounded-lg bg-[#1a0a02]/80 border border-[#8a6d1c]/50 text-white hover:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all text-xs"
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
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-[#1a0a02]/80 border border-[#8a6d1c]/50 text-white hover:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all resize-none text-xs"
                      placeholder="Votre message..."
                    />
                  </div>

                  <div className="flex justify-center mt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-2 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] hover:from-[#f9e596] hover:to-[#d4af37] border border-transparent hover:border-[#d4af37] text-[#1a0a02] font-bold rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-50 text-xs uppercase tracking-wider relative"
                    >
                      {isSubmitting ? 'Envoi...' : 'Envoyer ✉'}
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
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col gap-4">
        {/* Phone Numbers */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-black/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] flex items-center gap-4 transition-all"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] rounded-full flex items-center justify-center shadow-md border border-[#d4af37]/50 flex-shrink-0">
            <Phone className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h4 className="font-bold text-[#d4af37] mb-1 font-serif text-sm md:text-base">Téléphones</h4>
            <div className="flex flex-col">
              <a href="tel:+237691223916" className="text-gray-300 font-medium hover:text-white transition-colors text-[11px] md:text-xs">
                +237 691 223 916
              </a>
              <a href="tel:+237670008202" className="text-gray-300 font-medium hover:text-white transition-colors text-[11px] md:text-xs">
                +237 670 008 202
              </a>
              <a href="tel:+237659845024" className="text-gray-300 font-medium hover:text-white transition-colors text-[11px] md:text-xs">
                +237 659 845 024
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Emails */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-black/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] flex items-center gap-4 transition-all"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] rounded-full flex items-center justify-center shadow-md border border-[#d4af37]/50 flex-shrink-0">
            <Mail className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h4 className="font-bold text-[#d4af37] mb-1 font-serif text-sm md:text-base">Emails</h4>
            <div className="flex flex-col">
              <a href="mailto:christian.oussi01@gmail.com" className="text-gray-300 font-medium hover:text-white transition-colors text-[11px] md:text-xs truncate max-w-[200px] md:max-w-[250px]">
                christian.oussi01@gmail.com
              </a>
              <a href="mailto:wassatherese@gmail.com" className="text-gray-300 font-medium hover:text-white transition-colors text-[11px] md:text-xs truncate max-w-[200px] md:max-w-[250px]">
                wassatherese@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Location */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-black/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#d4af37] flex items-center gap-4 transition-all"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] rounded-full flex items-center justify-center shadow-md border border-[#d4af37]/50 flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h4 className="font-bold text-[#d4af37] mb-1 font-serif text-sm md:text-base">Localisation</h4>
            <div className="flex flex-col">
              <p className="text-gray-300 font-medium text-[11px] md:text-xs">Bonaberi, Douala</p>
              <p className="text-gray-300 font-medium text-[11px] md:text-xs">Cameroun</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
