import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'
import { extname, join } from 'path'

const imagesDir = new URL('../public/images/', import.meta.url)

const files = readdirSync(imagesDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))

for (const file of files) {
  const inputPath = join(imagesDir.pathname, file)
  const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  const outputPath = join(imagesDir.pathname, outputName)

  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)

  console.log(`✓ ${file} → ${outputName}`)
  unlinkSync(inputPath)
}

console.log('Done.')
