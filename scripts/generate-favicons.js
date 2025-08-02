const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
  { name: 'favicon.ico', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'mstile-70x70.png', size: 70 },
  { name: 'mstile-144x144.png', size: 144 },
  { name: 'mstile-150x150.png', size: 150 },
  { name: 'mstile-310x150.png', size: 310, width: 310, height: 150 },
  { name: 'mstile-310x310.png', size: 310 },
  { name: 'og-image.jpg', size: 1200, width: 1200, height: 630, bg: { r: 255, g: 255, b: 255 } }
];

async function generateIcons() {
  try {
    const inputFile = path.join(__dirname, '../public/favicon.svg');
    const outputDir = path.join(__dirname, '../public');
    
    for (const icon of sizes) {
      const outputPath = path.join(outputDir, icon.name);
      const width = icon.width || icon.size;
      const height = icon.height || icon.size;
      
      const image = sharp(inputFile);
      
      if (icon.bg) {
        // For images with background (like og-image)
        const bg = Buffer.from(
          `<svg width="${width}" height="${height}">
            <rect width="100%" height="100%" fill="rgb(${icon.bg.r},${icon.bg.g},${icon.bg.b})" />
            <text x="50%" y="50%" font-family="Arial" font-size="48" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#1E40AF">DireHire Connect</text>
          </svg>`
        );
        
        await sharp(bg)
          .composite([{ input: await image.resize(width, height).toBuffer() }])
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      } else if (icon.name.endsWith('.ico')) {
        // Special handling for .ico files
        const pngBuffer = await image.png().toBuffer();
        await sharp(pngBuffer, { density: 1000 })
          .resize(width, height)
          .toFile(outputPath);
      } else {
        // Regular PNG icons
        await image
          .resize(width, height)
          .toFile(outputPath);
      }
      
      console.log(`Generated ${icon.name} (${width}x${height})`);
    }
    
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateIcons();
