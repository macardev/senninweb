import { writeFileSync, readFileSync, mkdirSync, existsSync, cpSync } from 'fs'
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

// Defer full CSS: replace render-blocking <link> with preload + onload rel swap
indexHtml = indexHtml.replace(
  /<link rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/,
  (match, href) =>
    `<link rel="preload" href="${href}" as="style" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
)
writeFileSync(distHtmlPath, indexHtml, 'utf-8')

// ── Prerender static HTML pages ──
console.log('\n📄 Prerendering static pages:')

// Static pages
prerender(
  '/hakkimizda',
  'Hakkımızda | SenninWeb - Web Tasarım & SEO Ajansı | Premium Çözümler',
  'SenninWeb: 2025\'te kurulan premium web tasarım ve SEO ajansı. KOBİ\'ler için özel web tasarımı, SEO danışmanlığı ve kurumsal kimlik çözümleri.'
)
prerender(
  '/blog',
  'Web Tasarım & SEO 2026 Rehberi: Fiyatlar, İpuçları, Stratejiler | SenninWeb',
  'Web tasarım fiyatları 2026, SEO stratejileri ve dijital büyüme rehberleri. Küçük işletmenizi Google\'da üst sıralara taşıyacak ipuçları.'
)
prerender(
  '/gebze',
  'Gebze Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Gebze'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri. Yerel işletmeniz için Google'da üst sıralarda yer alın."
)
prerender(
  '/bilecik',
  'Bilecik Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Bilecik'te profesyonel web tasarım, SEO ve Google Maps hizmetleri. Yerel işletmenizi Google'da üst sıralara taşıyın. Bilecik SEO danışmanlığı ve kurumsal web sitesi çözümleri."
)
prerender(
  '/kocaeli',
  'Kocaeli Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Kocaeli'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri. İzmit, Gebze, Körfez ve tüm Kocaeli'de işletmenizi Google'da üst sıralara taşıyın."
)
prerender(
  '/sss',
  'Sıkça Sorulan Sorular | SenninWeb',
  'Web tasarım, SEO, AEO, GEO ve daha fazlası hakkında sıkça sorulan sorular. SenninWeb ile dijital dünyada merak ettiklerinizi öğrenin.'
)
prerender(
  '/hizmet/web-tasarim',
  'Web Tasarım Hizmeti | SenninWeb - Premium Web Sitesi Tasarımı',
  'Profesyonel web tasarım hizmeti: mobil uyumlu, hızlı yüklenen, SEO altyapılı kurumsal web siteleri. İşletmenize özel tasarım ve 3D animasyonlarla rakiplerinizden sıyrılın.'
)
prerender(
  '/hizmet/seo-ve-buyume',
  'SEO & Büyüme Hizmeti | SenninWeb - Arama Motoru Optimizasyonu',
  'Profesyonel SEO hizmeti: yerel SEO, teknik SEO, AEO/GEO optimizasyonu ve anahtar kelime stratejisi. Google\'da üst sıralara çıkın, organik trafiğinizi katlayın.'
)
prerender(
  '/hizmet/eticaret-cozumleri',
  'E-Ticaret Çözümleri | SenninWeb - Online Satış Siteleri',
  'Profesyonel e-ticaret sitesi kurulumu: ödeme entegrasyonu, SEO altyapısı, mobil uyumlu online mağaza. İşletmenizi 7/24 satış yapacak şekilde dijital dönüşüme hazırlıyoruz.'
)
prerender(
  '/hizmet/dijital-pazarlama',
  'Dijital Pazarlama Hizmeti | SenninWeb - Online Büyüme Çözümleri',
  'Profesyonel dijital pazarlama hizmeti: sosyal medya yönetimi, içerik pazarlama ve dönüşüm optimizasyonu. Markanızı dijitalde büyütün, müşterilerinize ulaşın.'
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
  { loc: '/bilecik', priority: '0.9' },
  { loc: '/kocaeli', priority: '0.9' },
  ...blogPosts.map(p => ({ loc: `/blog/${p.slug}`, priority: '0.7' })),
  { loc: '/sss', priority: '0.8' },
  { loc: '/hizmet/web-tasarim', priority: '0.9' },
  { loc: '/hizmet/seo-ve-buyume', priority: '0.9' },
  { loc: '/hizmet/eticaret-cozumleri', priority: '0.9' },
  { loc: '/hizmet/dijital-pazarlama', priority: '0.9' },
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

// ── Generate MD mirrors & llms-full.txt ──
import { execSync } from 'child_process'
console.log('\n📝 Generating MD mirrors and llms-full.txt...')
execSync('node scripts/generate-md-mirrors.mjs', { stdio: 'inherit', cwd: resolve(__dirname) })
console.log('✅ MD mirrors and llms-full.txt done')

// ── Sync generated docs to dist ──
console.log('\n📋 Syncing public/docs to dist/docs...')
const sourceDocs = resolve(publicDir, 'docs')
const targetDocs = resolve(distDir, 'docs')
if (!existsSync(targetDocs)) mkdirSync(targetDocs, { recursive: true })
cpSync(sourceDocs, targetDocs, { recursive: true, force: true })
console.log('✅ docs synced to dist')
