import { ReactNode } from 'react';

export const metadata = {
  title: "À propos | OJCJ Portfolio",
  description: "Découvrez mon parcours, mes passions et mon expertise en développement fullstack.",
  openGraph: {
    title: "À propos | OJCJ Portfolio",
    description: "Découvrez mon parcours, mes passions et mon expertise en développement fullstack.",
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og-image.png` }],
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
