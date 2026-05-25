import sharp from 'sharp'
import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const imagesDir = new URL('../public/images/', import.meta.url)

const files = readdirSync(imagesDir).filter(f => /\.webp$/i.test(f))

for (const file of files) {
  const inputPath = join(imagesDir.pathname, file)

  const metadata = await sharp(inputPath).metadata()
  const needsResize = metadata.width > 800 || metadata.height > 800

  if (!needsResize) {
    console.log(`✓ ${file} already ≤800px (${metadata.width}×${metadata.height}), skipping`)
    continue
  }

  const resized = await sharp(inputPath)
    .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  writeFileSync(inputPath, resized)

  console.log(`✓ ${file} resized ${metadata.width}×${metadata.height} → (fit inside 800×800)`)
}

console.log('Done.')
