"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

// Articles du blog - vous pouvez ajouter plus d'articles ici
const articles = [
  {
    id: 1,
    slug: 'mon-parcours-gamer-dev',
    title: 'Mon parcours : De gamer à développeur',
    excerpt: 'Comment mes sessions de jeu nocturnes m\'ont conduit vers le développement web et la passion du code.',
    date: '2024-03-15',
    readTime: '5 min',
    category: 'Parcours',
    icon: '🎮',
    featured: true
  },
  {
    id: 2,
    slug: 'pourquoi-nextjs',
    title: 'Pourquoi j\'ai choisi Next.js pour mes projets',
    excerpt: 'Un retour d\'expérience sur l\'utilisation de Next.js et ses avantages pour le SEO et les performances.',
    date: '2024-02-28',
    readTime: '8 min',
    category: 'Tech',
    icon: '⚡'
  },
  {
    id: 3,
    slug: 'creer-jeu-2d-canvas',
    title: 'Créer un jeu 2D avec HTML5 Canvas',
    excerpt: 'Tutoriel sur la création d\'un prototype de jeu 2D utilisant uniquement HTML, CSS et JavaScript.',
    date: '2024-02-10',
    readTime: '12 min',
    category: 'Tuto',
    icon: '🎮'
  },
  {
    id: 4,
    slug: 'inspirations-mangas-jeux-code',
    title: 'Mes inspirations : Mangas, jeux etコード',
    excerpt: 'Comment les œuvres qui m\'ont marqué influencent ma façon de coder et de créer des projets.',
    date: '2024-01-20',
    readTime: '6 min',
    category: 'Lifestyle',
    icon: '📚'
  },
  {
    id: 5,
    slug: 'firebase-react-combo',
    title: 'Firebase + React : Le combo parfait ?',
    excerpt: 'Analyse de l\'utilisation de Firebase avec React pour créer des applications mobiles performantes.',
    date: '2024-01-05',
    readTime: '10 min',
    category: 'Tech',
    icon: '🔥'
  },
  {
    id: 6,
    slug: 'reve-game-developer',
    title: 'Mon rêve : Devenir Game Developer',
    excerpt: 'Réflexions sur mon objectif de devenir développeur de jeux vidéo et les étapes pour y arriver.',
    date: '2023-12-15',
    readTime: '7 min',
    category: 'Parcours',
    icon: '⭐'
  }
];

export default function Blog() {
  const featuredArticle = articles.find(a => a.featured);
  const otherArticles = articles.filter(a => !a.featured);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setNewsletterStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 3000);
  };

  return (
    <MotionSection id={slugify('Blog')} className="py-20 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center"
        >
          <span className="bg-gradient-to-r from-purple-700 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
            Blog & Articles
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Mes réflexions, tutoriels et partagent sur mon parcours dans le développement.
        </motion.p>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 opacity-30 group-hover:opacity-60 rounded-2xl blur transition duration-300" />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/50 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-5xl">
                      {featuredArticle.icon}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                        Article en vedette
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {featuredArticle.date}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        •
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {featuredArticle.readTime} de lecture
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Lire l'article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 opacity-0 group-hover:opacity-30 rounded-xl blur transition duration-300" />
              
              <div className="relative bg-white dark:bg-slate-800/90 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 group-hover:border-purple-200 dark:group-hover:border-purple-600 transition-all h-full">
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center text-2xl mb-3">
                    {article.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {article.date}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                      Lire 
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📬 Restez informé !
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Abonnez-vous pour recevoir mes derniers articles et tutoriels.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre email..."
                disabled={newsletterStatus === 'loading'}
                className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 text-sm"
              />
              <motion.button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm disabled:opacity-50"
              >
                {newsletterStatus === 'loading' ? '⏳' : 'S\'abonner'}
              </motion.button>
            </form>
            {newsletterStatus === 'success' && (
              <p className="mt-2 text-green-600 dark:text-green-400 text-sm">Merci pour votre inscription !</p>
            )}
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
