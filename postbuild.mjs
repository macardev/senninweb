import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, 'public')
const distDir = resolve(__dirname, 'dist')
const today = new Date().toISOString().split('T')[0]

// ── Prerender helper ──
function prerender(route, title, description) {
  const html = indexHtml
    .replace(/(<title>).*?(<\/title>)/, `$1${escapeHtml(title)}$2`)
    .replace(
      /(<meta name="description" content=").*?(")/,
      `$1${escapeAttr(description)}$2`
    )

  const outPath = resolve(distDir, route.slice(1), 'index.html')
  const outDir = dirname(outPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  writeFileSync(outPath, html, 'utf-8')
  console.log(`  ✓ ${route}`)
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Read template and blog data ──
const distHtmlPath = resolve(distDir, 'index.html')
let indexHtml = readFileSync(distHtmlPath, 'utf-8')
const blogPosts = JSON.parse(readFileSync(resolve(publicDir, 'data/blog-posts.json'), 'utf-8'))

// Defer full CSS: replace render-blocking <link> with media="print" onload pattern
indexHtml = indexHtml.replace(
  /<link rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/,
  (match, href) =>
    `<link rel="preload" href="${href}" as="style" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet'" media="print">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
)
writeFileSync(distHtmlPath, indexHtml, 'utf-8')

// ── Prerender static HTML pages ──
console.log('\n📄 Prerendering static pages:')

// Static pages
prerender(
  '/hakkimizda',
  'Hakkımızda | SenninWeb — Premium Web Tasarım & SEO',
  "2025'te kurulan SenninWeb, işletmelerin marka görünürlüğünü artırmak, müşteri kazanımını hızlandırmak ve aylık gelirlerini yükseltmek için premium web tasarım ve SEO hizmetleri sunar."
)
prerender(
  '/blog',
  'Web Tasarım ve SEO Rehberi | SenninWeb',
  'Web tasarım, SEO ve dijital büyüme üzerine rehberler. İşletmenizi internette büyütmek için stratejiler.'
)
prerender(
  '/gebze',
  'Gebze Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Gebze'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri. Yerel işletmeniz için Google'da üst sıralarda yer alın."
)
prerender(
  '/sss',
  'Sıkça Sorulan Sorular | SenninWeb',
  'Web tasarım, SEO, AEO, GEO ve daha fazlası hakkında sıkça sorulan sorular. SenninWeb ile dijital dünyada merak ettiklerinizi öğrenin.'
)

// Blog posts
for (const post of blogPosts) {
  prerender(`/blog/${post.slug}`, post.title, post.metaDescription)
}

// ── Generate sitemap ──
const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/hakkimizda', priority: '0.8' },
  { loc: '/blog', priority: '0.8' },
  { loc: '/gebze', priority: '0.9' },
  ...blogPosts.map(p => ({ loc: `/blog/${p.slug}`, priority: '0.7' })),
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

const publicSitemap = resolve(publicDir, 'sitemap.xml')
const distSitemap = resolve(distDir, 'sitemap.xml')
writeFileSync(publicSitemap, sitemap, 'utf-8')
writeFileSync(distSitemap, sitemap, 'utf-8')
console.log('\n📄 Sitemap generated with', pages.length, 'URLs')
