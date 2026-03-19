'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type Article = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  content: string;
};

export default function BlogPostContent({ article }: { article: Article }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(article.date).toLocaleDateString('fr-FR')}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {article.readTime} min de lecture
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {article.excerpt}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose dark:prose-invert max-w-none prose-lg mb-12"
      >
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('#')) {
            const level = paragraph.match(/^#+/)?.[0].length || 1;
            const text = paragraph.replace(/^#+\s/, '');
            const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';
            return <HeadingTag key={index} className="text-gray-900 dark:text-white">{text}</HeadingTag>;
          }
          if (paragraph.startsWith('```')) {
            const code = paragraph.replace(/```[a-z]*\n?/g, '');
            return (
              <pre key={index} className="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code className="text-white font-mono text-sm">{code}</code>
              </pre>
            );
          }
          return (
            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4"
      >
        <Link href="/#blog" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          ← Retour au blog
        </Link>
      </motion.div>
    </article>
  );
}
