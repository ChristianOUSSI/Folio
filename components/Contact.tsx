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
            <InkText className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent  ">
              Me Contacter
            </InkText>
          </h2>
          <p className="text-center text-gray-600  mb-4 text-xs font-serif">
            Une question, un projet ? N'hésitez pas !
          </p>
        </motion.div>

        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100   opacity-30 group-hover:opacity-50 rounded-2xl blur transition duration-300" />
          <div className="relative bg-white/90  backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-blue-100  shadow-sm">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-2">🚀</div>
                  <h3 className="text-lg font-bold text-green-600  mb-1 font-serif">
                    Message envoyé !
                  </h3>
                  <p className="text-xs text-gray-600  font-serif">
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
                        className="w-full px-3 py-2 rounded-lg bg-gray-50  border border-gray-200  text-gray-900  hover:border-blue-300 :border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
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
                        className="w-full px-3 py-2 rounded-lg bg-gray-50  border border-gray-200  text-gray-900  hover:border-blue-300 :border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs"
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
                      className="w-full px-3 py-2 rounded-lg bg-gray-50  border border-gray-200  text-gray-900  hover:border-blue-300 :border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-xs"
                      placeholder="Votre message..."
                    />
                  </div>

                  <div className="flex justify-center mt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-[#b8860b] hover:to-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] border border-transparent hover:border-[#f9e596] text-white font-bold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 text-xs uppercase tracking-wider relative"
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
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100   p-4 md:p-5 rounded-2xl border border-blue-200  shadow-sm flex items-center gap-4"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800  mb-1 font-serif text-sm md:text-base">Téléphones</h4>
            <div className="flex flex-col">
              <a href="tel:+237691223916" className="text-blue-600  font-medium hover:text-blue-700 :text-blue-300 transition-colors text-[11px] md:text-xs">
                +237 691 223 916
              </a>
              <a href="tel:+237670008202" className="text-blue-600  font-medium hover:text-blue-700 :text-blue-300 transition-colors text-[11px] md:text-xs">
                +237 670 008 202
              </a>
              <a href="tel:+237659845024" className="text-blue-600  font-medium hover:text-blue-700 :text-blue-300 transition-colors text-[11px] md:text-xs">
                +237 659 845 024
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Emails */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100   p-4 md:p-5 rounded-2xl border border-purple-200  shadow-sm flex items-center gap-4"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800  mb-1 font-serif text-sm md:text-base">Emails</h4>
            <div className="flex flex-col">
              <a href="mailto:christian.oussi01@gmail.com" className="text-purple-600  font-medium hover:text-purple-700 :text-purple-300 transition-colors text-[11px] md:text-xs truncate max-w-[200px] md:max-w-[250px]">
                christian.oussi01@gmail.com
              </a>
              <a href="mailto:wassatherese@gmail.com" className="text-purple-600  font-medium hover:text-purple-700 :text-purple-300 transition-colors text-[11px] md:text-xs truncate max-w-[200px] md:max-w-[250px]">
                wassatherese@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Location */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-green-50 to-green-100   p-4 md:p-5 rounded-2xl border border-green-200  shadow-sm flex items-center gap-4"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800  mb-1 font-serif text-sm md:text-base">Localisation</h4>
            <div className="flex flex-col">
              <p className="text-green-700  font-medium text-[11px] md:text-xs">Bonaberi, Douala</p>
              <p className="text-green-700  font-medium text-[11px] md:text-xs">Cameroun</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
