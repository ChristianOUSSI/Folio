import './globals.css';
import { ReactNode } from 'react';
import ThemeScript from './ThemeScript';

export const metadata = {
  title: 'Chris OUSSI Portfolio',
  description: 'Joseph Christian Josué OUSSI - Développeur Fullstack',
  openGraph: {
    title: 'Chris OUSSI Portfolio',
    description: "Portfolio de Joseph Christian Josué OUSSI, développeur fullstack",
    url: 'https://your-domain.com',
    siteName: 'Chris OUSSI',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 800,
        height: 600,
        alt: 'Portfolio Chris OUSSI'
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris OUSSI Portfolio',
    description: "Portfolio de Joseph Christian Josué OUSSI, développeur fullstack",
    images: ['https://your-domain.com/og-image.png']
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body className="bg-white dark:bg-darkbg text-gray-900 dark:text-white transition-colors duration-300 antialiased">
        <a href="#accueil" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-4 bg-primary text-darkbg z-50">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
