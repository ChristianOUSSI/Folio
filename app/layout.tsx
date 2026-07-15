import './globals.css';
import { ReactNode } from 'react';
import ThemeScript from './ThemeScript';
import { I18nProvider } from '../lib/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useI18n } from '../lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

export const metadata = {
  title: 'OJCJ Portfolio',
  description: 'Joseph Christian Josué OUSSI - Fullstack Developer',
  openGraph: {
    title: 'OJCJ Portfolio',
    description: "Portfolio of Joseph Christian Josué OUSSI, fullstack developer",
    url: siteUrl,
    siteName: 'OJCJ',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
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
    images: [`${siteUrl}/og-image.png`]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OJCJ Portfolio",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Joseph Christian Josué OUSSI",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://www.linkedin.com/in/joseph-christian-josu%C3%A9-oussi-75864630b",
      "https://github.com/yourusername"
    ]
  };
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Special+Elite&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{JSON.stringify(siteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </head>
      <body className="bg-white dark:bg-darkbg text-gray-900 dark:text-white transition-colors duration-300 antialiased font-mono">
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
