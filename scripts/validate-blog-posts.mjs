// Fails the build if a blog section contains HTML tags but lacks "isHtml": true.
// BlogPost.jsx only renders a section as HTML when isHtml is set; otherwise tags like
// <strong> or <a> show up as literal text on the page.
// Usage: node scripts/validate-blog-posts.mjs   (runs automatically in `npm run build`)
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const posts = JSON.parse(readFileSync(resolve(root, 'public/data/blog-posts.json'), 'utf-8'))

const TAG = /<[a-z][^>]*>/i

const problems = []

for (const post of posts) {
  post.sections.forEach((section, i) => {
    if (section.isHtml) return
    for (const [key, value] of Object.entries(section)) {
      const values = Array.isArray(value) ? value : [value]
      const hit = values.find((v) => typeof v === 'string' && TAG.test(v))
      if (hit) {
        problems.push(`  ${post.slug} → sections[${i}] (${section.type}).${key}: "${hit.slice(0, 60)}…"`)
        break
      }
    }
  })
}

if (problems.length) {
  console.error('\n✗ Blog sections contain HTML but are missing "isHtml": true:\n' + problems.join('\n'))
  console.error('\nAdd "isHtml": true to those sections in public/data/blog-posts.json.\n')
  process.exit(1)
}

console.log(`✓ Blog HTML check passed (${posts.length} posts)`)
