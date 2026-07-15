// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

const urls = [
  { loc: `${siteUrl}/`, changefreq: 'daily', priority: '1.0' },
  // Add more static routes if you have them
  // { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.8' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
    <url>
      <loc>${u.loc}</loc>
      <changefreq>${u.changefreq}</changefreq>
      <priority>${u.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Sitemap generated at ${outPath}`);
