/**
 * Generate favicon.ico and favicon.svg
 * Creates proper favicon assets for SEO and browser compatibility
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const faviconDir = path.join(__dirname, 'public/favicon');
const publicDir = path.join(__dirname, 'public');

async function generateFaviconAssets() {
  try {
    // 1. Generate favicon.ico from 32x32 PNG
    const pngSource = path.join(faviconDir, 'favicon-32x32.png');
    const icoTarget = path.join(publicDir, 'favicon.ico');
    
    console.log('🔄 Generating favicon.ico...');
    await sharp(pngSource)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(icoTarget);
    
    const icoStats = fs.statSync(icoTarget);
    console.log(`✓ Created favicon.ico (${icoStats.size} bytes)`);
    
    // 2. Generate favicon.svg - simple SVG wrapper for the PNG
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <style>
      @media (prefers-color-scheme: dark) {
        rect { fill: #1a1a1a; }
      }
      @media (prefers-color-scheme: light) {
        rect { fill: #ffffff; }
      }
    </style>
  </defs>
  <rect width="32" height="32" class="bg"/>
  <text x="16" y="22" font-size="20" font-weight="700" text-anchor="middle" fill="#D97706" font-family="system-ui, -apple-system, sans-serif">S</text>
</svg>`;

    const svgTarget = path.join(faviconDir, 'favicon.svg');
    fs.writeFileSync(svgTarget, svgContent);
    console.log(`✓ Created favicon.svg (${svgContent.length} bytes)`);
    
    console.log('\n✅ All favicon assets generated successfully!');
    console.log(`\n📍 Files created:`);
    console.log(`   - ${icoTarget}`);
    console.log(`   - ${svgTarget}`);
    
  } catch (error) {
    console.error('❌ Error generating favicon assets:', error.message);
    process.exit(1);
  }
}

generateFaviconAssets();
