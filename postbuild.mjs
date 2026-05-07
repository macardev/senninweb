import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distHtml = resolve(__dirname, 'dist/index.html')

let html = readFileSync(distHtml, 'utf-8')

// 1. Make CSS non-render-blocking: <link rel="stylesheet" crossorigin href="..."> → preload onload
html = html.replace(
  /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^.]+\.css)">/,
  (match, href) =>
    `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript>${match}</noscript>`
)

// 2. Collect ALL JS chunks already referenced (script src or existing modulepreload)
const existingRefs = new Set()
for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.js)"/g)) {
  existingRefs.add(m[1])
}

// 3. Add missing modulepreload links for all JS chunks except the entry script
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
