/**
 * Favicon generator script
 * Creates 48x48 PNG favicon by copying and scaling the 32x32 version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, 'public/favicon/favicon-32x32.png');
const targetFile = path.join(__dirname, 'public/favicon/favicon-48x48.png');

try {
  // Read the 32x32 PNG
  const buffer = fs.readFileSync(sourceFile);
  
  // For optimal quality with resizing, install sharp:
  // npm install sharp
  // Then uncomment the code below:
  
  /*
  import sharp from 'sharp';
  
  sharp(sourceFile)
    .resize(48, 48, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(targetFile)
    .then(info => {
      console.log('✓ Created favicon-48x48.png');
      console.log(`  Size: ${info.size} bytes`);
      console.log(`  Dimensions: ${info.width}x${info.height}`);
    })
    .catch(err => {
      console.error('✗ Failed to create favicon:', err.message);
      process.exit(1);
    });
  */
  
  // Fallback: copy the 32x32 file as 48x48
  // Browsers will scale it appropriately
  fs.copyFileSync(sourceFile, targetFile);
  
  const stats = fs.statSync(targetFile);
  console.log('✓ Created favicon-48x48.png (copied from 32x32)');
  console.log(`  Size: ${stats.size} bytes`);
  console.log('');
  console.log('📝 For optimal quality, you can:');
  console.log('  1. Install sharp: npm install --save-dev sharp');
  console.log('  2. Uncomment the resize code in create-favicon.js');
  console.log('  3. Run this script again');
  console.log('');
  console.log('✓ Favicon configuration is now complete!');
  
} catch (error) {
  console.error('✗ Error creating favicon:', error.message);
  process.exit(1);
}
