import { writeFileSync, readFileSync, mkdirSync, existsSync, cpSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { SERVICES, serviceJsonLd, serviceFaqJsonLd } from './src/data/services.js'

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
    .replace('<html lang="tr">', `<html lang="${escapeAttr(opts.lang || 'tr')}">`)
    .replace(/(<title>).*?(<\/title>)/, `$1${escapeHtml(title)}$2`)
    .replace(
      /(<meta name="description" content=").*?(")/,
      `$1${escapeAttr(description)}$2`
    )
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '')
    .replace('</head>', `  <link rel="canonical" href="${escapeAttr(canonicalUrl)}">\n  </head>`)

  const headTags = [
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`,
    `<meta property="og:image" content="https://www.senninweb.com/og-image.jpg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
  ]
  for (const alternate of opts.alternates || []) {
    headTags.push(`<link rel="alternate" hreflang="${escapeAttr(alternate.lang)}" href="${escapeAttr(alternate.href)}">`)
  }
  if (opts.jsonLd) {
    // data-prerender: removed on boot (main.jsx) so React's own JSON-LD doesn't duplicate it
    for (const ld of [].concat(opts.jsonLd)) {
      headTags.push(`<script type="application/ld+json" data-prerender>${JSON.stringify(ld)}</script>`)
    }
  }

  html = html.replace('</head>', `  ${headTags.join('\n  ')}\n  </head>`)

  // Replace the homepage hero inside #root with page-specific content so crawlers
  // see the right H1 + body before JS runs (createRoot replaces it on mount).
  if (opts.bodyHtml) {
    html = html.replace(
      /<!--prerender:start-->[\s\S]*?<!--prerender:end-->/,
      `<!--prerender:start-->\n${opts.bodyHtml}\n<!--prerender:end-->`
    )
  }

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

// ── Static body helpers ──
const BODY_STYLE = 'max-width:760px;margin:0 auto;padding:140px 24px 80px;font-family:system-ui,-apple-system,sans-serif;color:rgba(255,255,255,0.75);line-height:1.7'
const H1_STYLE = 'color:#FFF;font-size:clamp(2rem,4.5vw,3.25rem);line-height:1.1;letter-spacing:-0.02em;margin:0 0 20px;font-weight:700'

// Content in blog-posts.json is authored in-repo; strings flagged isHtml (or containing tags) are trusted markup.
function rich(str, isHtml) {
  if (!str) return ''
  return isHtml || /<[a-z][^>]*>/i.test(str) ? str : escapeHtml(str)
}

const NAV_LINKS = [
  ['/hizmet/web-tasarim', 'Sağlık Turizmi Web Sitesi'],
  ['/hizmet/seo-ve-buyume', 'Sağlık Turizmi SEO'],
  ['/hizmet/dijital-pazarlama', 'Sağlık Turizmi Dijital Pazarlama'],
  ['/kocaeli', 'Kocaeli'],
  ['/bilecik', 'Bilecik'],
  ['/rehber/yurt-disindan-hasta-cekme', 'Yurt Dışından Hasta Çekme Rehberi'],
  ['/blog', 'Blog'],
  ['/sss', 'SSS'],
  ['/#contact', 'Ücretsiz Teklif Al'],
]

function navHtml() {
  return `<nav aria-label="Site" style="margin-top:40px;display:flex;flex-wrap:wrap;gap:8px 16px;font-size:14px">${
    NAV_LINKS.map(([href, label]) => `<a href="${href}" style="color:#FCD34D">${escapeHtml(label)}</a>`).join('')
  }</nav>`
}

function pageBody(h1, lead) {
  return `<main style="${BODY_STYLE}"><h1 style="${H1_STYLE}">${escapeHtml(h1)}</h1><p>${escapeHtml(lead)}</p>${navHtml()}</main>`
}

function sectionHtml(s) {
  switch (s.type) {
    case 'heroSection':
      return `<p style="font-size:1.25rem;color:#FFF">${rich(s.title)}</p>${s.subtitle ? `<p>${rich(s.subtitle)}</p>` : ''}`
    case 'intro':
    case 'paragraph':
    case 'finalParagraph':
      return `<p>${rich(s.content, s.isHtml)}</p>`
    case 'heading2':
      return `<h2 style="color:#FFF">${rich(s.content, s.isHtml)}</h2>`
    case 'heading3':
      return `<h3 style="color:#FFF">${rich(s.content, s.isHtml)}</h3>`
    case 'callout':
      return `<blockquote>${s.stat ? `<strong>${escapeHtml(s.stat)}</strong> ` : ''}${rich(s.content, s.isHtml)}${s.source ? ` <cite>${escapeHtml(s.source)}</cite>` : ''}</blockquote>`
    case 'bulletList':
      return `<ul>${(s.items || []).map(i => `<li>${rich(i, s.isHtml)}</li>`).join('')}</ul>`
    case 'question':
      return `<h3 style="color:#FFF">${rich(s.question)}</h3><p>${rich(s.answer, s.isHtml)}</p>`
    case 'conclusion':
      return `<p>${rich(s.intro, s.isHtml)}</p><ul>${(s.items || []).map(i => `<li>${rich(i, s.isHtml)}</li>`).join('')}</ul>${s.closing ? `<p>${rich(s.closing, s.isHtml)}</p>` : ''}`
    case 'section':
      return `<h2 style="color:#FFF">${rich(s.heading)}</h2>${s.content ? `<p>${rich(s.content, s.isHtml)}</p>` : ''}${
        (s.subsections || []).map(sub => `<h3 style="color:#FFF">${rich(sub.heading)}</h3><p>${rich(sub.content, true)}</p>`).join('')
      }`
    case 'image':
      return `<figure><img src="${escapeAttr(s.src)}" alt="${escapeAttr(s.alt || '')}" loading="lazy" style="max-width:100%;height:auto">${s.caption ? `<figcaption>${escapeHtml(s.caption)}</figcaption>` : ''}</figure>`
    case 'finalCta':
      return `<p style="color:#FFF"><strong>${rich(s.question)}</strong> <a href="/#contact" style="color:#FCD34D">${rich(s.ctaText)}</a></p>`
    default:
      return ''
  }
}

function articleBody(post) {
  return `<main style="${BODY_STYLE}"><article><p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#D97706">${escapeHtml(post.tag || 'Blog')} · ${escapeHtml(post.readingTime || '')}</p><h1 style="${H1_STYLE}">${escapeHtml(post.title)}</h1><p><time datetime="${escapeAttr(post.dateModified || post.datePublished)}">${escapeHtml(post.dateModified || post.datePublished)}</time> · ${escapeHtml(post.author || 'SenninWeb')}</p>${
    post.sections.map(sectionHtml).join('\n')
  }</article>${navHtml()}</main>`
}

function articleJsonLd(post) {
  const url = `https://www.senninweb.com/blog/${post.slug}`
  // Mirrors the Article schema BlogPost.jsx injects at runtime
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.coverImage ? `https://www.senninweb.com${post.coverImage}` : "https://www.senninweb.com/og-image.jpg",
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "inLanguage": "tr-TR",
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "author": { "@type": "Person", "name": "Çağatay Samet Macar", "url": "https://www.senninweb.com/hakkimizda" },
    "publisher": { "@type": "Organization", "name": "SenninWeb", "logo": { "@type": "ImageObject", "url": "https://www.senninweb.com/favicon/favicon-48x48.png" } },
  }
}

function faqJsonLd(post) {
  const qs = post.sections.filter(s => s.type === 'question')
  if (!qs.length) return null
  const strip = (h = '') => h.replace(/<[^>]+>/g, '').trim()
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qs.map(q => ({ "@type": "Question", "name": strip(q.question), "acceptedAnswer": { "@type": "Answer", "text": strip(q.answer) } })),
  }
}

function serviceSectionHtml(s) {
  switch (s.type) {
    case 'comparisonTable':
      return `<h2 style="color:#FFF">${rich(s.title)}</h2><table><thead><tr>${s.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${
        s.rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')
      }</tbody></table>`
    case 'faq':
      return `<h2 style="color:#FFF">${rich(s.title)}</h2>${s.items.map(i => `<h3 style="color:#FFF">${rich(i.q)}</h3><p>${rich(i.a, true)}</p>`).join('')}`
    case 'section':
      return `<p>${rich(s.content, true)}</p>${s.subsections.map(sub => `<h3 style="color:#FFF">${rich(sub.heading)}</h3><p>${rich(sub.content, true)}</p>`).join('')}`
    case 'paragraph':
    case 'callout':
      return `<p>${rich(s.content, true)}</p>`
    case 'bulletList':
      return `<ul>${s.items.map(i => `<li>${rich(i, true)}</li>`).join('')}</ul>`
    default:
      return sectionHtml(s)
  }
}

function serviceBody(service) {
  const h1 = service.shortTitle.charAt(0).toLocaleUpperCase('tr-TR') + service.shortTitle.slice(1)
  return `<main style="${BODY_STYLE}"><article><h1 style="${H1_STYLE}">${escapeHtml(h1)}</h1><p>${escapeHtml(service.description)}</p>${
    service.sections.map(serviceSectionHtml).join('\n')
  }</article>${navHtml()}</main>`
}

function serviceMarkdown(service) {
  const md = (h = '') => h.replace(/<strong>(.*?)<\/strong>/g, '**$1**').replace(/<em>(.*?)<\/em>/g, '*$1*').replace(/<[^>]+>/g, '')
  const out = [`# ${service.title.replace(/ \| SenninWeb$/, '')}`, '', `> ${service.description}`, '', `URL: https://www.senninweb.com${service.path}`, '']
  for (const s of service.sections) {
    if (s.type === 'heading2') out.push(`## ${s.content}`, '')
    else if (s.type === 'paragraph' || s.type === 'callout') out.push(md(s.content), '')
    else if (s.type === 'bulletList') out.push(...s.items.map(i => `- ${md(i)}`), '')
    else if (s.type === 'section') out.push(md(s.content), '', ...s.subsections.flatMap(sub => [`### ${sub.heading}`, md(sub.content), '']))
    else if (s.type === 'comparisonTable') out.push(`## ${s.title}`, '', `| ${s.headers.join(' | ')} |`, `| ${s.headers.map(() => '---').join(' | ')} |`, ...s.rows.map(r => `| ${r.join(' | ')} |`), '')
    else if (s.type === 'faq') out.push(`## ${s.title}`, '', ...s.items.flatMap(i => [`### ${i.q}`, md(i.a), '']))
    else if (s.type === 'finalCta') out.push(`**${s.question}** ${s.ctaText}`, '', 'Ücretsiz rehber: https://www.senninweb.com/rehber/yurt-disindan-hasta-cekme', '')
  }
  return out.join('\n')
}

function blogIndexBody() {
  const items = blogPosts.map(p => `<li style="margin:0 0 20px"><a href="/blog/${escapeAttr(p.slug)}" style="color:#FFF;font-weight:600">${escapeHtml(p.title)}</a><br><span>${escapeHtml(p.desc || p.description || '')}</span></li>`).join('')
  // First cover as a high-priority image: starts the LCP download before React fetches the post list
  const first = blogPosts.find(p => p.coverImage)
  const cover = first ? `<img src="${escapeAttr(first.coverImage)}" alt="${escapeAttr(first.coverImageAlt || first.title)}" width="1200" height="630" fetchpriority="high" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;margin:24px 0">` : ''
  return `<main style="${BODY_STYLE}"><h1 style="${H1_STYLE}">Web Tasarım ve SEO Rehberi</h1>${cover}<p>Küçük işletmeler ve klinikler için web tasarım, sağlık turizmi SEO'su ve dönüşüm üzerine pratik yazılar.</p><ul style="list-style:none;margin:32px 0 0">${items}</ul>${navHtml()}</main>`
}

// Mirrors the hero copy and chapter list of src/pages/Rehber.jsx
function guideBody() {
  const lead = "Saç ekim merkezleri, diş klinikleri, estetik ve veteriner klinikleri için: yurtdışından hasta bulma sürecini hedef ülke seçiminden sağlık turizmi SEO'suna, hastanın kendi dilinde Google'da bulunmaktan WhatsApp'a gelen yabancı hasta talebini randevuya dönüştürmeye kadar adım adım anlatan sistem."
  const chapters = [
    'Uluslararası hasta nasıl karar veriyor?', 'Doğru hedef ülkeyi seçmek', 'Yasal zemin ve güven temeli (yetki belgesi, 2025 tanıtım yönetmeliği, KVKK/GDPR)',
    'Çok dilli sağlık turizmi web sitesi', "Hedef ülkede Google'da görünmek", 'Hedef ülkeden otorite kazanmak (backlink)', 'Güven sinyalleri ve sosyal kanıt',
    "İlk 5 dakika: WhatsApp'ta talebi hastaya çevirmek", 'Ölçüm', 'Sektöre özel notlar: saç ekimi, diş, estetik, veteriner', '90 günlük yol haritası', 'Kontrol listesi',
  ]
  return `<main style="${BODY_STYLE}"><p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#D97706">Ücretsiz PDF Rehber · 15 sayfa</p><h1 style="${H1_STYLE}">Yurt dışından hasta çekme rehberi 2026</h1><p style="font-size:16px;line-height:1.75">${escapeHtml(lead)}</p><h2 style="color:#FFF">İçindekiler</h2><ol>${chapters.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ol>${navHtml()}</main>`
}

// SSS: same source (src/data/faqs.json) as src/pages/SSS.jsx
function faqBody() {
  const qa = faqs.map(f => `<h2 style="color:#FFF;font-size:1.15rem">${escapeHtml(f.question)}</h2><p style="white-space:pre-line">${escapeHtml(f.answer)}</p>`).join('')
  return `<main style="${BODY_STYLE}"><h1 style="${H1_STYLE}">Sıkça Sorulan Sorular</h1><p>Yurt dışından hasta çekmek isteyen saç ekim, diş, estetik ve veteriner kliniklerinin en çok sorduğu sorular.</p>${qa}${navHtml()}</main>`
}

function faqMarkdown() {
  return ['# Sık Sorulan Sorular | SenninWeb', '', '> Sağlık turizmi web sitesi, SEO ve Hasta Kazanım Paketi hakkında kliniklerin en çok sorduğu sorular.', '', 'URL: https://www.senninweb.com/sss', '',
    ...faqs.flatMap(f => [`## ${f.question}`, '', f.answer, ''])].join('\n')
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
    /(?:\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">)+/,
    `
    <link rel="canonical" href="https://www.senninweb.com/">
    <link rel="alternate" hreflang="tr" href="https://www.senninweb.com/">
    <link rel="alternate" hreflang="en-IE" href="https://www.senninweb.com/en">
    <link rel="alternate" hreflang="x-default" href="https://www.senninweb.com/">`
  )
  .replace('</head>', `  <meta property="og:title" content="${homeTitle}">
  <meta property="og:description" content="${homeDescription}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.senninweb.com/">
  <meta property="og:image" content="https://www.senninweb.com/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${homeTitle}">
  <meta name="twitter:description" content="${homeDescription}">
  </head>`)
writeFileSync(distHtmlPath, homeHtml, 'utf-8')

// ── Prerender static HTML pages ──
console.log('\n📄 Prerendering static pages:')

const faqItemsForEnglish = [
  ['Do you only work with clinics in Turkey?', 'No. This English service is built for private clinics in Ireland that want a stronger website, clearer patient journeys and visibility in selected European markets.'],
  ['Can you work with our existing brand?', 'Yes. We can retain your identity and rebuild the website around clearer treatment information, stronger proof and a more direct enquiry path.'],
  ['Do you guarantee patient numbers or Google rankings?', 'No responsible agency can guarantee either. We agree on measurable work such as technical health, qualified visibility, enquiry quality and conversion points.'],
  ['What does the first review include?', 'We review your website, treatment structure, search visibility and enquiry journey, then share the most important opportunities.'],
  ['Will the site support more than one country?', 'Yes. We plan country and language architecture, hreflang, local search intent and market-specific treatment pages.'],
]

function englishBody() {
  return `<main lang="en-IE" style="${BODY_STYLE}">
    <h1 style="${H1_STYLE}">Irish clinics, found</h1>
    <p>Patient-focused websites and international search strategy for private clinics ready to grow beyond Ireland.</p>
    <section><h2>Built for private clinics</h2><p>SenninWeb combines clear treatment content, custom design, technical SEO and a practical enquiry journey.</p></section>
    <section><h2>Start with your clinic</h2><p>Dental, aesthetic, hair restoration and private clinics receive a website and search plan shaped around their treatments and patient questions.</p></section>
    <section><h2>A patient journey you can measure</h2><h3>Clarify</h3><p>Define treatments, markets and patient questions.</p><h3>Build</h3><p>Create a custom English website and direct enquiry route.</p><h3>Reach</h3><p>Structure international SEO around real search intent.</p><h3>Convert</h3><p>Measure calls, messages and forms.</p></section>
    <section><h2>Questions before we begin</h2>${faqItemsForEnglish.map(([q, a]) => `<h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p>`).join('')}</section>
    <p><a href="mailto:business@senninweb.com?subject=Irish%20clinic%20review">Request a clinic review</a></p>
  </main>`
}

prerender(
  '/en',
  'Web Design & International SEO for Irish Clinics | SenninWeb',
  'Patient-focused websites and international SEO for dental, aesthetic, hair restoration and private clinics in Ireland. Reach patients across Europe with SenninWeb.',
  {
    lang: 'en-IE',
    bodyHtml: englishBody(),
    alternates: [
      { lang: 'en-IE', href: 'https://www.senninweb.com/en' },
      { lang: 'tr', href: 'https://www.senninweb.com/' },
      { lang: 'x-default', href: 'https://www.senninweb.com/' },
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'SenninWeb',
      url: 'https://www.senninweb.com/en', inLanguage: 'en-IE',
      areaServed: { '@type': 'Country', name: 'Ireland' },
      serviceType: ['Healthcare website design', 'International SEO', 'Patient acquisition strategy'],
    },
  }
)

// Static pages
prerender(
  '/hakkimizda',
  'Hakkımızda: SenninWeb Web Tasarım & SEO Ajansı',
  "SenninWeb'i tanıyın: KOBİ'ler için premium web tasarım ve SEO çözümleri üreten butik ajans. Çalışma sürecimizi keşfedin, ücretsiz teklif alın.",
  { bodyHtml: pageBody('Çağatay Macar — SenninWeb Kurucusu', "KOBİ'ler için premium web tasarım ve SEO çözümleri üreten butik ajans. Çalışma sürecimizi keşfedin, ücretsiz teklif alın.") }
)
prerender(
  '/blog',
  'Web Tasarım ve SEO Rehberleri 2026 | SenninWeb Blog',
  "Web tasarım fiyatlarından SEO stratejilerine, işletmenizi Google'da büyütecek güncel rehberler ve pratik ipuçları. Her hafta yeni içerik keşfedin.",
  { bodyHtml: blogIndexBody() }
)
prerender(
  '/bilecik',
  'Bilecik Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Bilecik'te profesyonel web tasarım, SEO ve Google Maps hizmetleri. Yerel işletmenizi Google'da üst sıralara taşıyın. Bilecik SEO danışmanlığı ve kurumsal web sitesi çözümleri.",
  { bodyHtml: pageBody('Bilecik Web Tasarım & SEO', "Bilecik'te profesyonel web tasarım, SEO ve Google Maps hizmetleri. Yerel işletmenizi Google'da üst sıralara taşıyın.") }
)
prerender(
  '/kocaeli',
  'Kocaeli Web Tasarım ve SEO Hizmetleri | SenninWeb',
  "Kocaeli'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri. İzmit, Gebze, Körfez ve tüm Kocaeli'de işletmenizi Google'da üst sıralara taşıyın.",
  { bodyHtml: pageBody('Kocaeli Web Tasarım & SEO', "İzmit, Gebze, Körfez ve tüm Kocaeli'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri.") }
)
prerender(
  '/sss',
  'Sağlık Turizmi Web Sitesi & SEO: Sık Sorulan Sorular | SenninWeb',
  "Hasta Kazanım Paketi, yetki belgesi, yurt dışına yönelik site, sağlık turizmi SEO'su ve WhatsApp hasta akışı hakkında kliniklerin en çok sorduğu sorular.",
  {
    bodyHtml: faqBody(),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Sağlık Turizmi Web Sitesi & SEO: Sık Sorulan Sorular | SenninWeb",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  }
)
writeFileSync(resolve(publicDir, 'docs', 'sss.md'), faqMarkdown(), 'utf-8')
// Service pages: rendered from the same data module the React pages use
for (const service of Object.values(SERVICES)) {
  prerender(service.path, service.title, service.metaDescription, {
    bodyHtml: serviceBody(service),
    jsonLd: [serviceJsonLd(service, `https://www.senninweb.com${service.path}`), serviceFaqJsonLd(service)].filter(Boolean),
  })
  writeFileSync(resolve(publicDir, 'docs', `${service.path.slice(1)}.md`), serviceMarkdown(service), 'utf-8')
}

prerender(
  '/rehber/yurt-disindan-hasta-cekme',
  'Yurt Dışından Hasta Çekme Rehberi 2026 (Ücretsiz PDF) | SenninWeb',
  "Saç ekim merkezleri, diş, estetik ve veteriner klinikleri için ücretsiz rehber: hedef ülke seçimi, çok dilli site, uluslararası SEO, backlink ve WhatsApp'ta hastaya dönüşüm.",
  { bodyHtml: guideBody() }
)

// Blog posts
for (const post of blogPosts) {
  prerender(`/blog/${post.slug}`, post.title, post.metaDescription, {
    ogType: 'article',
    bodyHtml: articleBody(post),
    jsonLd: [articleJsonLd(post), faqJsonLd(post)].filter(Boolean),
  })
}

// ── Generate sitemap ──
const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/en', priority: '1.0' },
  { loc: '/hakkimizda', priority: '0.8' },
  { loc: '/blog', priority: '0.8' },
  { loc: '/bilecik', priority: '0.9' },
  { loc: '/kocaeli', priority: '0.9' },
  ...blogPosts.map(p => ({ loc: `/blog/${p.slug}`, priority: '0.7', lastmod: p.dateModified || p.datePublished })),
  { loc: '/sss', priority: '0.8' },
  { loc: '/hizmet/web-tasarim', priority: '0.9' },
  { loc: '/hizmet/seo-ve-buyume', priority: '0.9' },
  { loc: '/hizmet/dijital-pazarlama', priority: '0.9' },
  { loc: '/rehber/yurt-disindan-hasta-cekme', priority: '0.9' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://www.senninweb.com${p.loc}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
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
