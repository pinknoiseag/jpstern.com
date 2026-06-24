#!/usr/bin/env node
/**
 * JPG/PNG → WebP in konfigurierten Ordnern.
 * Workflow: Bilder reinlegen, `npm run build` — fertig.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** Ordner relativ zu public/ — neue Galerien einfach hier ergänzen */
const SCAN_DIRS = [
  'pre-shoot/images',
  'gallery/works-i',
  'gallery/works-ii',
  'gallery/works-iii',
  'images/hero',
  'images/about',
  'images/contact',
];

const WEBP_QUALITY = 82;
const MAX_EDGE = 2400;
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function convertFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) return null;

  const webpPath = absPath.replace(/\.(jpe?g|png)$/i, '.webp');
  const srcMtime = fs.statSync(absPath).mtimeMs;
  if (fs.existsSync(webpPath) && fs.statSync(webpPath).mtimeMs >= srcMtime) {
    return 'skip';
  }

  const img = sharp(absPath);
  const meta = await img.metadata();
  let pipeline = img.rotate();

  if (meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_EDGE : undefined,
      height: meta.height > meta.width ? MAX_EDGE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);
  fs.unlinkSync(absPath);
  return 'converted';
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) walk(abs, out);
    else if (SOURCE_EXTS.has(path.extname(entry.name).toLowerCase())) out.push(abs);
  }
  return out;
}

let converted = 0;
let skipped = 0;
let failed = 0;

for (const rel of SCAN_DIRS) {
  const absDir = path.join(root, 'public', rel);
  const files = walk(absDir);
  for (const file of files) {
    try {
      const r = await convertFile(file);
      if (r === 'converted') {
        converted++;
        console.log('webp:', path.relative(path.join(root, 'public'), file));
      } else if (r === 'skip') skipped++;
    } catch (e) {
      failed++;
      console.error('fail:', file, e.message);
    }
  }
}

console.log(`optimize-images: ${converted} converted, ${skipped} up-to-date, ${failed} failed`);