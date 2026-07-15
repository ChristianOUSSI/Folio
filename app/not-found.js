import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Custom404() {
  const { t } = useI18n();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-darkbg">
      <motion.h1 className="text-5xl font-bold mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        404 – {t('nav.notFound') || 'Page not found'}
      </motion.h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        <MapPin className="w-5 h-5" />
        {t('nav.home') || 'Home'}
      </Link>
    </main>
  );
}
