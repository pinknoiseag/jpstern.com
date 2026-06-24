#!/usr/bin/env node
/**
 * Scans public/gallery/{slug}/ → src/data/gallery-manifest.json
 * Alt-Texte aus gallery-meta.json oder SEO-Dateiname.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const galleryRoot = path.join(root, 'public/gallery');
const outFile = path.join(root, 'src/data/gallery-manifest.json');
const configFile = path.join(root, 'src/data/gallery-config.json');
const metaFile = path.join(root, 'src/data/gallery-meta.json');

const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};

function altFromFilename(file, cfg) {
  const stem = file.replace(/\.[^.]+$/, '').replace(/^jp-stern-/, '');
  const readable = stem.replace(/-/g, ' ');
  const base = cfg?.altBase || cfg?.title || 'JP Stern Photography';
  return `${base} — ${readable}`;
}

const manifest = Object.entries(config).map(([slug, cfg]) => {
  const dir = path.join(galleryRoot, slug);
  const metaByFile = new Map((meta[slug] || []).map((e) => [e.file, e.alt]));
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.webp$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
  return {
    slug,
    title: cfg.title,
    description: cfg.description,
    images: files.map((file) => ({
      src: `/gallery/${slug}/${file}`,
      alt: metaByFile.get(file) || altFromFilename(file, cfg),
    })),
  };
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
console.log(
  'gallery-manifest:',
  manifest.map((m) => `${m.slug}: ${m.images.length}`).join(', '),
);