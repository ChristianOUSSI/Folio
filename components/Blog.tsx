'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Newspaper, BellRing } from 'lucide-react';

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
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-3 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-purple-700 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
            Blog
          </span>
        </motion.h2>

        <div className="flex flex-col gap-3 w-full">
          {articlesLeft.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group cursor-default"
            >
              <div className={`relative bg-white dark:bg-slate-800/90 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all ${article.featured ? 'border-purple-200 dark:border-purple-600 shadow-md' : 'shadow-sm'}`}>
                <div className="p-3 md:p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wider">
                      {article.category} {article.featured && '★'}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 flex items-center justify-center text-sm flex-shrink-0">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 font-serif line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-[9px] md:text-[10px] mb-1.5 line-clamp-2 font-serif">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-gray-50 dark:border-slate-700">
                    <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold">{article.date}</span>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider hover:underline">
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
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-4 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 flex flex-col">
        <div className="flex flex-col gap-3 w-full mb-3">
          {articlesRight.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="group cursor-default"
            >
              <div className="relative bg-white dark:bg-slate-800/90 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
                <div className="p-3 md:p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 flex items-center justify-center text-sm flex-shrink-0">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 font-serif line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-[9px] md:text-[10px] mb-1.5 line-clamp-2 font-serif">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-gray-50 dark:border-slate-700">
                    <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold">{article.date}</span>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] md:text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider hover:underline">
                      Lire →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="text-center w-full cursor-default"
        >
          <div className="p-3 md:p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BellRing className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white font-serif">
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
                className="w-full px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-purple-500 focus:outline-none text-[10px]"
              />
              <motion.button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-md text-[10px] uppercase tracking-wider transition-all"
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
