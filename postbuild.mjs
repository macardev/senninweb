import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distHtml = resolve(__dirname, 'dist/index.html')
const distSitemap = resolve(__dirname, 'dist/sitemap.xml')
const today = new Date().toISOString().split('T')[0]

// ── Generate sitemap ──
const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/blog', priority: '0.8' },
  { loc: '/gebze', priority: '0.9' },
  { loc: '/blog/kucuk-isletme-web-sitesi', priority: '0.7' },
  { loc: '/blog/kucuk-isletmeler-icin-web-sitesi-nasil-musteri-getirir', priority: '0.7' },
  { loc: '/blog/small-businesses-visible-on-google-2026', priority: '0.7' },
  { loc: '/blog/web-siteniz-neden-hala-ilk-sayfada-degil-2026', priority: '0.7' },
  { loc: '/sss', priority: '0.8' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://senninweb.com${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(distSitemap, sitemap, 'utf-8')
console.log('✓ sitemap generated with', pages.length, 'URLs')

// ── Optimize HTML ──
let html = readFileSync(distHtml, 'utf-8')

html = html.replace(
  /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^.]+\.css)">/,
  (match, href) =>
    `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript>${match}</noscript>`
)

const existingRefs = new Set()
for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.js)"/g)) {
  existingRefs.add(m[1])
}

const entryScript = [...html.matchAll(/src="(\/assets\/index-[^.]+\.js)"/g)].map(m => m[1])[0]
const missingPreloads = [...existingRefs]
  .filter(href => href !== entryScript && !html.includes(`modulepreload" crossorigin href="${href}"`))
  .map(href => `    <link rel="modulepreload" crossorigin href="${href}">`)
  .join('\n')

if (missingPreloads) {
  html = html.replace('</head>', `${missingPreloads}\n  </head>`)
}

writeFileSync(distHtml, html, 'utf-8')
console.log('✓ postbuild: CSS non-blocking, modulepreload deduplicated')
