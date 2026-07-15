import './globals.css';
import { ReactNode } from 'react';
import ThemeScript from './ThemeScript';
import { I18nProvider } from '../lib/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Cursor from '../components/Cursor';
import { JetBrains_Mono, Space_Grotesk, Special_Elite, Courier_Prime } from '@next/font/local';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const specialElite = Special_Elite({ subsets: ['latin'] });
const courierPrime = Courier_Prime({ subsets: ['latin'] });

export const metadata = {
  title: 'OJCJ Portfolio',
  description: 'Joseph Christian Josué OUSSI - Fullstack Developer',
  openGraph: {
    title: 'OJCJ Portfolio',
    description: "Portfolio of Joseph Christian Josué OUSSI, fullstack developer",
    url: 'https://your-domain.com',
    siteName: 'OJCJ',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 800,
        height: 600,
        alt: 'OJCJ Portfolio'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OJCJ Portfolio',
    description: "Portfolio of Joseph Christian Josué OUSSI, fullstack developer",
    images: ['https://your-domain.com/og-image.png']
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetBrainsMono.className} ${spaceGrotesk.className} ${specialElite.className} ${courierPrime.className}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-white dark:bg-darkbg text-gray-900 dark:text-white transition-colors duration-300 antialiased">
        <div className="fixed inset-0 -z-10 bg-gradient-animation" aria-hidden="true"></div>
        <Cursor />
        <I18nProvider>
          <a href="#accueil" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-4 bg-primary text-darkbg z-50">
            Skip to content
          </a>
          <LanguageSwitcher />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
