# jpstern.com — Statik-Site

Astro + React (nur Pre-Shoot). Deploy auf Hostpoint.

## Entwicklung

```bash
npm install
npm run sync      # Bilder von Live-Site (optional, bei Updates)
npm run build     # → dist/  (inkl. JPG/PNG → WebP automatisch)
```

### Bilder-Workflow (minimaler Aufwand)

| Zweck | Ordner | Aktion |
|-------|--------|--------|
| Pre-Shoot Beispiele | `public/pre-shoot/images/{kategorie}/` | JPG/PNG reinlegen → `npm run build` |
| Portfolio Works I–III | `public/gallery/works-i/` usw. | JPG/PNG reinlegen → `npm run build` |
| Hero / About | `public/images/hero/`, `about/` | JPG/PNG reinlegen → `npm run build` |

Build wandelt automatisch in **WebP** um (max. 2400px, Qualität 82) und löscht die Originale.

Kein `npm run dev` nötig zur Verifikation — `npm run build` reicht.

## Struktur

| Pfad | Inhalt |
|------|--------|
| `src/pages/` | Home (Hero), About, Contact, Pre-Shoot |
| `public/pre-shoot/images/{kategorie}/` | Beispielbilder — **hier neue Bilder ablegen** |
| `public/send-selection.php` | E-Mail mit eingebetteten Thumbnails (ohne WP) |
| `scripts/sync-assets.mjs` | Export von jpstern.com |
| `deploy/README-hostpoint.md` | Upload-Anleitung |

## Pre-Shoot

- Einstieg: `/pre-shoot-style-clarification/` — Passwort `Pre-Shoot`
- Bilder: Ordner pro Kategorie, Build generiert Manifest automatisch
- E-Mail: Favorit + Machbar an info@jpstern.com

## Deploy

Siehe `deploy/README-hostpoint.md` — `dist/` per SFTP nach `~/www/jpstern.com/`.