import { writeFileSync, readFileSync, mkdirSync, existsSync, cpSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, 'public')
const distDir = resolve(__dirname, 'dist')
const today = new Date().toISOString().split('T')[0]

// ── Prerender helper ──
function prerender(route, title, description, opts = {}) {
  const canonicalPath = route === '/' ? '' : route.replace(/\/+$/, '')
  const canonicalUrl = `https://www.senninweb.com${canonicalPath}`
  const ogType = opts.ogType || 'website'

  let html = indexHtml
    .replace(/(<title>).*?(<\/title>)/, `$1${escapeHtml(title)}$2`)
    .replace(
      /(<meta name="description" content=").*?(")/,
      `$1${escapeAttr(description)}$2`
    )
    .replace(
      /<link rel="alternate" hreflang="tr" href="[^"]*">/,
      `<link rel="canonical" href="${escapeAttr(canonicalUrl)}">`
    )

  const headTags = [
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`,
    `<meta property="og:image" content="https://www.senninweb.com/og-image.svg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
  ]
  if (opts.jsonLd) {
    headTags.push(`<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>`)
  }

  html = html.replace('</head>', `  ${headTags.join('\n  ')}\n  </head>`)

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
const faqs = JSON.parse(readFileSync(resolve(__dirname, 'src/data/faqs.json'), 'utf-8'))

// Defer full CSS: replace render-blocking <link> with preload + onload rel swap
indexHtml = indexHtml.replace(
  /<link rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/,
  (match, href) =>
    `<link rel="preload" href="${href}" as="style" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
)
// ── Home page: fix hreflang→canonical + inject og/twitter tags (title/description untouched) ──
const homeTitle = indexHtml.match(/<title>(.*?)<\/title>/)[1]
const homeDescription = indexHtml.match(/<meta name="description" content="(.*?)">/)[1]
const homeHtml = indexHtml
  .replace(
    /<link rel="alternate" hreflang="tr" href="[^"]*">/,
    `<link rel="canonical" href="https://www.senninweb.com/">`
  )
  .replace('</head>', `  <meta property="og:title" content="${homeTitle}">
  <meta property="og:description" content="${homeDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.senninweb.com/">
  <meta property="og:image" content="https://www.senninweb.com/og-image.svg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${homeTitle}">
  <meta name="twitter:description" content="${homeDescription}">
  </head>`)
writeFileSync(distHtmlPath, homeHtml, 'utf-8')

// ── Prerender static HTML pages ──
console.log('\n📄 Prerendering static pages:')

// Static pages
prerender(
  '/hakkimizda',
  'Hakkımızda: SenninWeb Web Tasarım & SEO Ajansı',
  "SenninWeb'i tanıyın: KOBİ'ler için premium web tasarım ve SEO çözümleri üreten butik ajans. Çalışma sürecimizi keşfedin, ücretsiz teklif alın."
)
prerender(
  '/blog',
  'Web Tasarım ve SEO Rehberleri 2026 | SenninWeb Blog',
  "Web tasarım fiyatlarından SEO stratejilerine, işletmenizi Google'da büyütecek güncel rehberler ve pratik ipuçları. Her hafta yeni içerik keşfedin."
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
  'Web Tasarım & SEO Sıkça Sorulan Sorular | SenninWeb',
  'Web sitesi fiyatı, teslim süresi, SEO süreci ve daha fazlası: en çok sorulan soruların net yanıtları. Cevabını bulamadınız mı? Ücretsiz danışın.',
  {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Sıkça Sorulan Sorular | SenninWeb",
      "description": "Web tasarım, SEO, mobil uyumluluk, Google'da görünürlük ve daha fazlası hakkında sıkça sorulan sorular.",
      "dateModified": today,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  }
)
prerender(
  '/hizmet/web-tasarim',
  'Profesyonel Web Tasarım Hizmeti ve Fiyatları | SenninWeb',
  'Mobil uyumlu, hızlı açılan ve SEO altyapılı kurumsal web siteniz 2-4 haftada yayında. Size özel tasarım, şeffaf fiyat. Hemen ücretsiz teklif alın.'
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
  prerender(`/blog/${post.slug}`, post.title, post.metaDescription, { ogType: 'article' })
}

// ── Generate sitemap ──
const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/hakkimizda', priority: '0.8' },
  { loc: '/blog', priority: '0.8' },
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
