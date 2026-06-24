#!/usr/bin/env node
/**
 * Download public assets + pre-shoot images from live jpstern.com HTML.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const BASE = 'https://jpstern.com';

const publicDirs = [
  ['public/images/logo.png', `${BASE}/wp-content/uploads/2026/04/Logo-JPStern-silver-transp.png`],
  ['public/images/about/portrait.webp', `${BASE}/wp-content/uploads/2026/05/JPStern-Nikon-square-300x300.webp`],
  ['public/images/about/hero-bw.webp', `${BASE}/wp-content/uploads/2026/05/JpStern-Hero-bw.webp`],
  ['public/images/contact/hero.webp', `${BASE}/wp-content/uploads/2026/05/IMG_5383.webp`],
  ['public/images/hero/01.jpg', `${BASE}/wp-content/uploads/2026/04/DSC8250-2-scaled.jpg`],
  ['public/images/hero/02.jpg', `${BASE}/wp-content/uploads/2026/04/DSC6326.jpg`],
  ['public/images/hero/03.jpg', `${BASE}/wp-content/uploads/2026/04/DSC_4810-scaled.jpg`],
];

const categoryPages = [
  { folder: 'lifestyle', url: '/pre-shoot-lifestyle/' },
  { folder: 'sensual-bedroom', url: '/pre-shoot-sensual-bedroom/' },
  { folder: 'sensual-portrait', url: '/pre-shoot-sensual-portrait/' },
  { folder: 'sensual-shibari', url: '/pre-shoot-sensual-shibari/' },
  { folder: 'sensual-implied', url: '/pre-shoot-sensual-implied/' },
];

async function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) return 'skip';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return 'ok';
}

function extractPhotoUrls(html) {
  const urls = new Set();
  const re = /https:\/\/jpstern\.com\/wp-content\/uploads\/2026\/05\/([^"'\\]+\.webp)/g;
  let m;
  while ((m = re.exec(html))) {
    const file = m[1];
    if (!file.includes('Logo') && !file.includes('Nikon') && !file.includes('IMG_5383')) {
      urls.add(m[0]);
    }
  }
  return [...urls].sort();
}

let ok = 0;
let skip = 0;
let fail = 0;

for (const [dest, url] of publicDirs) {
  try {
    const r = await download(url, path.join(root, dest));
    r === 'skip' ? skip++ : ok++;
  } catch (e) {
    fail++;
    console.error(dest, e.message);
  }
}

for (const cat of categoryPages) {
  console.log(`\n${cat.folder}:`);
  const html = await fetch(`${BASE}${cat.url}`).then((r) => r.text());
  const urls = extractPhotoUrls(html);
  console.log(`  ${urls.length} images found`);
  for (const url of urls) {
    const file = url.split('/').pop();
    const dest = path.join(root, 'public/pre-shoot/images', cat.folder, file);
    try {
      const r = await download(url, dest);
      r === 'skip' ? skip++ : ok++;
    } catch (e) {
      fail++;
      console.error(' ', file, e.message);
    }
  }
}

console.log(`\nDone: ${ok} downloaded, ${skip} skipped, ${fail} failed`);