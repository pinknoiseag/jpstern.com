#!/usr/bin/env node
/**
 * Portfolio-Bilder für Works I–III vorbereiten.
 *
 * 1. JPG/PNG in portfolio-inbox/works-i|ii|iii/ legen
 * 2. Optional: rename-plan.json pro Galerie (siehe rename-plan.example.json)
 * 3. Dry-run:  node scripts/prepare-portfolio.mjs
 * 4. Anwenden: node scripts/prepare-portfolio.mjs --apply
 *
 * Erzeugt WebP in public/gallery/{slug}/ mit SEO-Dateinamen + gallery-meta.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inboxRoot = path.join(root, 'portfolio-inbox');
const galleryRoot = path.join(root, 'public/gallery');
const configFile = path.join(root, 'src/data/gallery-config.json');
const metaFile = path.join(root, 'src/data/gallery-meta.json');

const WEBP_QUALITY = 82;
const MAX_EDGE = 2400;
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const apply = process.argv.includes('--apply');
const slugArg = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1];

const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const slugs = slugArg ? [slugArg] : Object.keys(config);

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

function loadRenamePlan(dir) {
  const planPath = path.join(dir, 'rename-plan.json');
  if (!fs.existsSync(planPath)) return new Map();
  const list = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  return new Map(list.map((e) => [e.source, e.slug]));
}

function listSources(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => SOURCE_EXTS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildFilename(gallerySlug, index, descriptor, cfg) {
  const prefix = cfg.seoPrefix || gallerySlug;
  const part = descriptor ? `${prefix}-${descriptor}` : prefix;
  return `jp-stern-${part}-${String(index).padStart(2, '0')}.webp`;
}

function buildAlt(cfg, index, descriptor) {
  const base = cfg.altBase || cfg.title || 'JP Stern Photography';
  const detail = descriptor ? descriptor.replace(/-/g, ' ') : '';
  return detail ? `${base} — ${detail}` : `${base} — Bild ${index}`;
}

async function processImage(srcPath, outPath) {
  const img = sharp(srcPath);
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
  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
}

const allMeta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};

for (const gallerySlug of slugs) {
  const cfg = config[gallerySlug];
  if (!cfg) {
    console.error(`Unbekannte Galerie: ${gallerySlug}`);
    process.exit(1);
  }

  const inboxDir = path.join(inboxRoot, gallerySlug);
  const outDir = path.join(galleryRoot, gallerySlug);
  const renamePlan = loadRenamePlan(inboxDir);
  const sources = listSources(inboxDir);

  if (!sources.length) {
    console.log(`${gallerySlug}: keine Bilder in portfolio-inbox/${gallerySlug}/`);
    continue;
  }

  const entries = [];
  let index = 1;

  for (const source of sources) {
    const customSlug = renamePlan.get(source);
    const srcPath = path.join(inboxDir, source);
    const meta = await sharp(srcPath).metadata();
    const orientation =
      meta.width && meta.height ? (meta.width >= meta.height ? 'landscape' : 'portrait') : 'photo';
    const descriptor = customSlug ? slugify(customSlug) : orientation;
    const filename = buildFilename(gallerySlug, index, descriptor, cfg);
    const alt = buildAlt(cfg, index, customSlug ? slugify(customSlug) : null);

    entries.push({ source, filename, alt, descriptor });
    console.log(`${apply ? '✓' : '→'} [${gallerySlug}] ${source}  →  ${filename}`);
    console.log(`    alt: ${alt}`);

    if (apply) {
      fs.mkdirSync(outDir, { recursive: true });
      await processImage(srcPath, path.join(outDir, filename));
    }
    index++;
  }

  allMeta[gallerySlug] = entries.map((e) => ({
    file: e.filename,
    alt: e.alt,
  }));
}

if (Object.keys(allMeta).length) {
  if (apply) {
    fs.writeFileSync(metaFile, JSON.stringify(allMeta, null, 2));
    console.log('\nGeschrieben:', path.relative(root, metaFile));
    console.log('Als Nächstes: npm run build');
  } else {
    console.log('\nDry-run — nichts geändert. Zum Anwenden: node scripts/prepare-portfolio.mjs --apply');
  }
}