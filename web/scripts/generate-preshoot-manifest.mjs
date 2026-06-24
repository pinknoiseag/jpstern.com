#!/usr/bin/env node
/**
 * Scans public/pre-shoot/images/{category}/ and writes src/data/preshoot-manifest.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesRoot = path.join(root, 'public/pre-shoot/images');
const outFile = path.join(root, 'src/data/preshoot-manifest.json');

const categories = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/categories.json'), 'utf8'),
);

const registeredFolders = new Set(categories.map((cat) => cat.folder));
if (fs.existsSync(imagesRoot)) {
  const orphanFolders = fs
    .readdirSync(imagesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !registeredFolders.has(name));
  if (orphanFolders.length) {
    console.warn(
      `preshoot-manifest: Ordner ohne categories.json — ${orphanFolders.join(', ')}`,
    );
  }
}

const manifest = categories.map((cat) => {
  const dir = path.join(imagesRoot, cat.folder);
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.webp$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
  const photos = files.map((file, i) => ({
    id: `${cat.idPrefix}${String(i + 1).padStart(2, '0')}`,
    src: `/pre-shoot/images/${cat.folder}/${file}`,
    alt: file.replace(/\.[^.]+$/, ''),
  }));
  return {
    slug: cat.slug,
    title: cat.title,
    emailCategory: cat.emailCategory,
    hubLabel: cat.hubLabel,
    photos,
  };
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
console.log(
  'preshoot-manifest:',
  manifest.map((m) => `${m.slug}: ${m.photos.length}`).join(', '),
);