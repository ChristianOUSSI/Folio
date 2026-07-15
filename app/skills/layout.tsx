import { ReactNode } from 'react';

export const metadata = {
  title: "Compétences | OJCJ Portfolio",
  description: "Mes compétences techniques, linguistiques et outils maîtrisés.",
  openGraph: {
    title: "Compétences | OJCJ Portfolio",
    description: "Mes compétences techniques, linguistiques et outils maîtrisés.",
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og-image.png` }],
  },
};

export default function SkillsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
