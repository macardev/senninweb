import { writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicSitemap = resolve(__dirname, 'public/sitemap.xml')
const distSitemap = resolve(__dirname, 'dist/sitemap.xml')
const today = new Date().toISOString().split('T')[0]

// ── Generate sitemap ──
const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/blog', priority: '0.8' },
  { loc: '/gebze', priority: '0.9' },
  { loc: '/blog/kucuk-isletme-web-sitesi', priority: '0.7' },
  { loc: '/blog/kucuk-isletmeler-icin-web-sitesi-nasil-musteri-getirir', priority: '0.7' },
  { loc: '/blog/kucuk-isletmeler-google-da-gorunurluk-2026', priority: '0.7' },
  { loc: '/blog/web-siteniz-neden-hala-ilk-sayfada-degil-2026', priority: '0.7' },
  { loc: '/blog/web-sitesi-tasarim-fiyatlari-2026', priority: '0.7' },
  { loc: '/blog/tasarimin-5-temel-ilkesi', priority: '0.7' },
  { loc: '/sss', priority: '0.8' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://www.senninweb.com${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(publicSitemap, sitemap, 'utf-8')
console.log('✓ sitemap generated with', pages.length, 'URLs')

// ── Cleanup: dist'teki dosyaları kaldır (kaynaklar public/ veya root'ta) ──
const distCleanup = [
  resolve(__dirname, 'dist/robots.txt'),
  resolve(__dirname, 'dist/llms.txt'),
  resolve(__dirname, 'dist/sitemap.xml'),
  resolve(__dirname, 'dist/index.html'),
]
for (const p of distCleanup) {
  try { unlinkSync(p) } catch {}
}
