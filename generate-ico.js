/**
 * Generate favicon.ico from SVG
 * Creates ICO file for browser favicon support
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFaviconICO() {
  try {
    const svgSource = path.join(__dirname, 'public/favicon/favicon.svg');
    const icoTarget = path.join(__dirname, 'public/favicon.ico');
    
    console.log('🔄 Converting favicon.svg to favicon.ico...');
    
    // Convert SVG to PNG buffer first
    const pngBuffer = await sharp(svgSource, { density: 96 })
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();
    
    // Write as favicon.ico (PNG format, browser will handle it)
    fs.writeFileSync(icoTarget, pngBuffer);
    
    const stats = fs.statSync(icoTarget);
    console.log(`✓ Created favicon.ico (${stats.size} bytes)`);
    console.log('\n✅ Favicon generation complete!');
    console.log(`📍 Files ready:`);
    console.log(`   - public/favicon/favicon.svg`);
    console.log(`   - public/favicon.ico`);
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error.message);
    process.exit(1);
  }
}

generateFaviconICO();
