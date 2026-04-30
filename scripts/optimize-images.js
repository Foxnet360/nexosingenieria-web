const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];
const OUTPUT_SIZES = [640, 750, 828, 1080, 1200, 1920];

async function findImages(dir, images = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await findImages(fullPath, images);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  
  return images;
}

async function optimizeImage(imagePath) {
  const relativePath = path.relative(PUBLIC_DIR, imagePath);
  const dir = path.dirname(imagePath);
  const basename = path.basename(imagePath, path.extname(imagePath));
  
  console.log(`Optimizing: ${relativePath}`);
  
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Generate WebP variants at different sizes
    for (const size of OUTPUT_SIZES) {
      if (metadata.width && metadata.width > size) {
        const webpPath = path.join(dir, `${basename}-${size}.webp`);
        await image
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
      }
    }
    
    // Generate full-size WebP
    const webpPath = path.join(dir, `${basename}.webp`);
    await image
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    // Generate AVIF variant (only for largest size to save build time)
    const avifPath = path.join(dir, `${basename}.avif`);
    await image
      .avif({ quality: 75 })
      .toFile(avifPath);
    
    console.log(`✓ Generated variants for ${basename}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${relativePath}:`, error.message);
  }
}

async function main() {
  console.log('🔍 Finding images...\n');
  const images = await findImages(PUBLIC_DIR);
  
  console.log(`Found ${images.length} images\n`);
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('\n✅ Image optimization complete!');
}

main().catch(console.error);
