// Renders the lead-magnet guide (HTML) to PDF with headless Chrome/Chromium.
// Usage: npm run build-guide   (set CHROME_PATH to override browser detection)
import { execFileSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { homedir } from 'os'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'scripts/guide/yurt-disindan-hasta-cekme.html')
const outDir = resolve(root, 'public/rehber')
const out = resolve(outDir, 'yurt-disindan-hasta-cekme-rehberi.pdf')

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH
  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]
  // Playwright-managed Chromium (newest first)
  const pwCache = resolve(homedir(), '.cache/ms-playwright')
  if (existsSync(pwCache)) {
    for (const dir of readdirSync(pwCache).filter(d => /^chromium-\d+$/.test(d)).sort().reverse()) {
      candidates.unshift(resolve(pwCache, dir, 'chrome-linux64/chrome'))
    }
  }
  return candidates.find(p => existsSync(p))
}

const chrome = findChrome()
if (!chrome) {
  console.error('Chrome/Chromium bulunamadı. CHROME_PATH ile yolu belirtin.')
  process.exit(1)
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

execFileSync(chrome, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=8000', // let web fonts load
  `--print-to-pdf=${out}`,
  pathToFileURL(source).href,
], { stdio: 'inherit' })

console.log(`✅ ${out} (${Math.round(statSync(out).size / 1024)} KB)`)
