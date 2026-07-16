'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Newspaper, BellRing } from 'lucide-react';
import InkText from './InkText';

const articlesLeft = [
  {
    id: 1,
    slug: 'Arrêtez-d\'actualiser-des-pages-vides',
    title: "Arrêtez d'actualiser vos pages dans le vide",
    excerpt: "Explications sur ce que signifie chaque code d'erreur HTTP et comment les résoudre efficacement.",
    date: '2026-02-15',
    readTime: '6 min',
    category: 'Tech',
    icon: '⚙️',
    featured: true
  },
  {
    id: 2,
    slug: 'cables-ethernet-2026',
    title: "Câbles Ethernet : ce qu'il faut vraiment retenir",
    excerpt: "Explication sur les 3 méthodes de création de câble Ethernet et leurs utilités.",
    date: '2026-02-20',
    readTime: '5 min',
    category: 'Réseau',
    icon: '🔗',
    featured: false
  },
  {
    id: 3,
    slug: 'anatomie-site-mobile-macro',
    title: "L'Anatomie d'un Site mobile Macro",
    excerpt: "De quoi est constitué un pylône télécom et quel est son système.",
    date: '2026-03-01',
    readTime: '7 min',
    category: 'Télécom',
    icon: '🛰️',
    featured: false
  }
];

const articlesRight = [
  {
    id: 4,
    slug: 'meilleurs-guides-ia-gratuits-2026',
    title: 'Guides IA gratuits',
    excerpt: "Post qui centralise les meilleures ressources gratuites.",
    date: '2026-03-07',
    readTime: '4 min',
    category: 'IA',
    icon: '🧠',
    featured: false
  },
  {
    id: 5,
    slug: 'fullstack-pas-juste-coder',
    title: "Le Fullstack ce n'est pas juste coder",
    excerpt: "Explication sur ce qu'est vraiment le fullstack.",
    date: '2026-03-10',
    readTime: '5 min',
    category: 'Career',
    icon: '💼',
    featured: false
  },
  {
    id: 6,
    slug: 'relation-senior-junior',
    title: 'Relation Senior/Junior',
    excerpt: "Vidéo repost : Comment chacun gère les problèmes.",
    date: '2026-03-12',
    readTime: '3 min',
    category: 'Career',
    icon: '🤝',
    featured: false
  }
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/joseph-christian-josu%C3%A9-oussi-75864630b';

export function BlogLeft() {
  return (
    <section className="w-full mb-auto mt-0 md:mt-4 flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-3 text-center font-serif"
        >
          <InkText className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] bg-clip-text text-transparent drop-shadow-sm">
            Blog
          </InkText>
        </motion.h2>

        <div className="flex flex-col gap-3 w-full">
          {articlesLeft.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group cursor-default"
            >
              <div className={`relative bg-black/80 backdrop-blur-sm rounded-xl border hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:border-[#d4af37] transition-all ${article.featured ? 'border-[#d4af37]/60 shadow-[0_4px_15px_rgba(0,0,0,0.5)]' : 'border-[#d4af37]/30 shadow-sm'}`}>
                <div className="p-3 md:p-4 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center mb-1.5 w-full gap-2">
                    <span className="px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wider">
                      {article.category} {article.featured && '★'}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-[#8a6d1c] font-semibold uppercase tracking-wider">
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] flex items-center justify-center text-sm flex-shrink-0 border border-[#d4af37]/30">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-[#d4af37] mb-0.5 font-serif line-clamp-1 group-hover:text-[#f9e596] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white text-[9px] md:text-[10px] mb-1.5 line-clamp-2 font-serif transition-colors">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[#d4af37]/30 w-full">
                    <span className="text-[9px] md:text-[10px] text-[#8a6d1c] font-semibold">{article.date}</span>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-[#d4af37] font-bold uppercase tracking-wider hover:text-[#f9e596] transition-colors">
                      Lire →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogRight() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      const subject = encodeURIComponent('Nouvel abonné au blog');
      const body = encodeURIComponent(`Nom/Profil LinkedIn soumis : ${newsletterEmail}\n\nJe souhaite être informé des nouvelles publications.`);
      window.location.href = `mailto:wassatherese@gmail.com?subject=${subject}&body=${body}`;
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    } catch (err) {
      setNewsletterStatus('error');
    }
  };

  return (
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="flex flex-col gap-3 w-full mb-3">
          {articlesRight.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group cursor-default"
            >
              <div className="relative bg-black/80 backdrop-blur-sm rounded-xl border border-[#d4af37]/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:border-[#d4af37] transition-all">
                <div className="p-3 md:p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-[#8a6d1c] font-semibold uppercase tracking-wider">
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#8a6d1c] to-[#2a1305] flex items-center justify-center text-sm flex-shrink-0 border border-[#d4af37]/30">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-[#d4af37] mb-0.5 font-serif line-clamp-1 group-hover:text-[#f9e596] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white text-[9px] md:text-[10px] mb-1.5 line-clamp-2 font-serif transition-colors">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[#d4af37]/30">
                    <span className="text-[9px] md:text-[10px] text-[#8a6d1c] font-semibold">{article.date}</span>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-[#d4af37] font-bold uppercase tracking-wider hover:text-[#f9e596] transition-colors">
                      Lire →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="text-center w-full cursor-default"
        >
          <div className="p-3 md:p-4 bg-black/60 backdrop-blur-md rounded-xl border border-[#d4af37]/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BellRing className="w-4 h-4 text-[#d4af37]" />
              <h3 className="text-xs md:text-sm font-bold text-[#d4af37] font-serif">
                Restez informé !
              </h3>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Nom complet ou LinkedIn..."
                disabled={newsletterStatus === 'loading'}
                className="w-full px-3 py-1.5 rounded-md bg-[#1a0a02]/80 border border-[#8a6d1c]/50 text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none text-[10px]"
              />
              <motion.button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-1.5 bg-gradient-to-r from-[#d4af37] to-[#8a6d1c] hover:from-[#f9e596] hover:to-[#d4af37] text-[#1a0a02] font-bold rounded-md text-[10px] uppercase tracking-wider transition-all"
              >
                {newsletterStatus === 'loading' ? '⏳' : "S'abonner"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
