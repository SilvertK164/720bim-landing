import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const dir = 'src/assets/images/hero';
const files = ['drone-3d.png', 'vr-headset-3d.png', 'camera-360-3d.png', 'tablet-3d.png', 'helmet-3d.png', 'laptop-3d.png', 'ar-glasses-3d.png'];

for (const file of files) {
  const inputPath = join(dir, file);
  const outputPath = join(dir, file.replace('.png', '-clean.png'));

  try {
    const image = sharp(inputPath);
    const { width, height } = await image.metadata();

    // Get raw pixel data
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    const pixels = Buffer.from(data);

    // The checkerboard pattern uses ~204,204,204 and ~255,255,255 colors
    // We make those pixels transparent
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Detect checkerboard colors (light gray ~204 and white ~255)
      const isLightGray = r >= 195 && r <= 215 && g >= 195 && g <= 215 && b >= 195 && b <= 215;
      const isWhite = r >= 240 && g >= 240 && b >= 240;

      if (isLightGray || isWhite) {
        pixels[i + 3] = 0; // Make transparent
      }
    }

    await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(outputPath);

    console.log(`✓ ${file} -> ${file.replace('.png', '-clean.png')}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log('Done!');
