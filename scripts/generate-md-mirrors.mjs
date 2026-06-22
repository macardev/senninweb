import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')
const docsDir = resolve(publicDir, 'docs')
const blogDir = resolve(docsDir, 'blog')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const siteUrl = 'https://www.senninweb.com'

function sectionToMd(section) {
  switch (section.type) {
    case 'heroSection':
      return `# ${section.title}\n\n> ${section.subtitle}\n`
    case 'intro':
    case 'paragraph':
    case 'finalParagraph': {
      let content = section.content || ''
      return (section.isHtml ? stripHtml(content) : content) + '\n\n'
    }
    case 'callout': {
      let lines = []
      if (section.stat) lines.push(`> **${section.stat}** — ${section.isHtml ? stripHtml(section.content) : section.content}`)
      else lines.push(`> ${section.isHtml ? stripHtml(section.content) : section.content}`)
      if (section.source) lines.push(`> *Kaynak: ${section.source}*`)
      return lines.join('\n') + '\n\n'
    }
    case 'heading2':
      return `## ${section.content}\n\n`
    case 'heading3':
      return `### ${section.content}\n\n`
    case 'bulletList': {
      let items = (section.items || []).map(item => {
        if (typeof item === 'string') {
          return `- ${section.isHtml ? stripHtml(item) : item}`
        }
        return `- ${item}`
      })
      return items.join('\n') + '\n\n'
    }
    case 'question':
      return `**S: ${section.question}**\n\n${section.answer}\n\n`
    case 'conclusion': {
      let lines = []
      if (section.intro) lines.push(section.isHtml ? stripHtml(section.intro) : section.intro)
      for (const item of (section.items || [])) {
        lines.push(`- ${section.isHtml ? stripHtml(item) : item}`)
      }
      if (section.closing) lines.push('\n' + (section.isHtml ? stripHtml(section.closing) : section.closing))
      return lines.join('\n') + '\n\n'
    }
    case 'finalCta':
      return `**${section.question}**\n${section.ctaText}\n\n`
    case 'section': {
      let lines = []
      if (section.heading) lines.push(`### ${section.heading}\n`)
      if (section.content) lines.push(section.content + '\n')
      for (const sub of (section.subsections || [])) {
        lines.push(`**${sub.heading}**`)
        let content = sub.content || ''
        lines.push((sub.isHtml ? stripHtml(content) : content) + '\n')
      }
      return lines.join('\n') + '\n'
    }
    default:
      console.warn(`  ⚠ Unknown section type: ${section.type}`)
      return ''
  }
}

function stripHtml(html) {
  let result = html
  // Convert <a href="URL">text</a> to [text](URL) first
  result = result.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (match, url, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '').trim()
    if (url.startsWith('/')) {
      return `[${cleanText}](${siteUrl}${url})`
    }
    return `[${cleanText}](${url})`
  })
  // Strip remaining HTML tags
  result = result.replace(/<[^>]+>/g, '')
  // Decode entities
  result = result.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  return result.trim()
}

function generateBlogPostMd(post) {
  let md = `# ${post.title}\n\n`
  md += `> *Yazar: ${post.author} | ${post.datePublished} | ${post.readingTime}*\n\n`
  if (post.description) md += `${post.description}\n\n`

  for (const section of post.sections) {
    md += sectionToMd(section)
  }

  md += `---\n\n*Bu yazı [SenninWeb](${post.schemaUrl}) sitesinde yayınlanmıştır.*\n`

  return md
}

function generateLlmsFull(blogPosts) {
  let content = `# Sennin Web — Full Documentation\n\n`
  content += `> Sennin Web, KOBİ'lere web tasarım, SEO ve dijital pazarlama hizmeti sağlayan bir ajans. 2025'te Çağatay Macar tarafından kuruldu. Bilecik/Gölpazarı merkezli, Türkiye geneline hizmet veriyor.\n\n`

  content += `## Pages\n\n`
  content += `- [Hakkımızda](hakkimizda.md): Sennin Web kurucusu Çağatay Macar ve şirket hikayesi\n`
  content += `- [SSS](sss.md): Web tasarım, SEO, AEO, GEO, mobil uyumluluk ve fiyatlandırma hakkında soru-cevap\n`
  content += `- [Web Tasarım](hizmet/web-tasarim.md): Sıfırdan tasarlanmış, mobil öncelikli web siteleri\n`
  content += `- [SEO ve Büyüme](hizmet/seo-ve-buyume.md): Arama motoru optimizasyonu, yerel SEO, AEO/GEO\n`
  content += `- [E-Ticaret Çözümleri](hizmet/eticaret-cozumleri.md): Online satış siteleri, ödeme entegrasyonu\n`
  content += `- [Dijital Pazarlama](hizmet/dijital-pazarlama.md): Sosyal medya yönetimi, içerik pazarlama\n`
  content += `- [Gebze](gebze.md): Gebze'de web tasarım, yerel SEO, e-ticaret ve dijital pazarlama\n`
  content += `- [Bilecik](bilecik.md): Bilecik'te web tasarım, SEO, Google Maps optimizasyonu\n`
  content += `- [Kocaeli](kocaeli.md): Kocaeli genelinde web tasarım, SEO ve dijital pazarlama\n\n`

  content += `## Blog Posts\n\n`
  for (const post of blogPosts) {
    content += `- [${post.title}](blog/${post.slug}.md): ${post.description || ''}\n`
  }
  content += '\n'

  content += `## Blog İçerikleri\n\n`
  for (const post of blogPosts) {
    content += `---\n\n`
    content += generateBlogPostMd(post)
    content += `\n`
  }

  return content
}

// ── Main ──
const blogPosts = JSON.parse(readFileSync(resolve(publicDir, 'data/blog-posts.json'), 'utf-8'))

// Ensure output dirs
if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true })

console.log('\n📝 Generating blog post .md mirrors:')
for (const post of blogPosts) {
  const md = generateBlogPostMd(post)
  const outPath = resolve(blogDir, `${post.slug}.md`)
  writeFileSync(outPath, md, 'utf-8')
  console.log(`  ✓ blog/${post.slug}.md`)
}

// Generate llms-full.txt
console.log('\n📄 Generating llms-full.txt...')
const fullContent = generateLlmsFull(blogPosts)
const llmsFullPath = resolve(docsDir, 'llms-full.txt')
writeFileSync(llmsFullPath, fullContent, 'utf-8')
console.log(`  ✓ docs/llms-full.txt`)

console.log('\n✅ MD mirrors and llms-full.txt generated successfully.')
