'use client';

import Script from 'next/script';

export default function ThemeScript() {
  return (
    <Script id="theme-script" strategy="beforeInteractive">
      {`
        (function() {
          try {
            var stored = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', theme === 'dark');
          } catch (e) {}
        })();
      `}
    </Script>
  );
}
