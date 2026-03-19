import { notFound } from 'next/navigation';
import { getArticle, getAllArticles } from '@/lib/articles';
import BlogPostContent from '@/components/BlogPostContent';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return { title: 'Article non trouvé' };
  return { title: article.title, description: article.excerpt };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 pt-20">
      <BlogPostContent article={article!} />
    </main>
  );
}
