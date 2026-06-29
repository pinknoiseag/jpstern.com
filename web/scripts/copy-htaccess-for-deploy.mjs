#!/usr/bin/env node
/**
 * Sichtbare Kopie von .htaccess für File-Manager-Uploads.
 * Punktdateien (.htaccess) werden in Finder/Hostpoint oft ausgeblendet.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public/.htaccess');
const dest = path.join(root, 'dist/htaccess-upload.txt');

const header = `# Hostpoint: Nach Upload diese Datei umbenennen in .htaccess
# (Punkt am Anfang — sonst greifen Redirects und Pre-Shoot-Auth nicht)

`;

if (!fs.existsSync(src)) {
  console.error('missing:', src);
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, header + fs.readFileSync(src, 'utf8'));
console.log('deploy: dist/htaccess-upload.txt (auf Server → .htaccess umbenennen)');