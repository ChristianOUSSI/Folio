import { SkillsLeft, SkillsRight } from "@/components/Skills";
import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export const metadata = {
  title: "Compétences | OJCJ Portfolio",
  description: "Mes compétences techniques, linguistiques et outils maîtrisés.",
  openGraph: {
    title: "Compétences | OJCJ Portfolio",
    description: "Mes compétences techniques, linguistiques et outils maîtrisés.",
    images: [{ url: "${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png" }],
  },
};

export default function SkillsPage() {
  const { t } = useI18n();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-center">
          {t('skills.title')}
        </h1>
        <p className="text-center text-gray-600">
          {t('skills.note')}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <SkillsLeft />
          <SkillsRight />
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          ? {t('nav.home')}
        </Link>
      </div>
    </>
  );
}
