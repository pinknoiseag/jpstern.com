# jpstern.com — Gallery / Works Workflow

**Ziel**: Bilder einfach hinzufügen, entfernen oder neue Works-Alben erstellen — ohne Code zu ändern.

Stand: Juni 2026

---

## Ordner-Struktur

web/public/gallery/ ├── works-i/           ← bestehend ├── works-ii/ ├── works-iii/ ├── works-iv/          ← neu anlegen, wenn gewünscht └── …

Jeder Ordner enthält die Bilder eines Works-Albums.

---

## Bild-Namenskonvention (wichtig!)

- `01-titel-des-fotos.webp`
- `02-andere-aufnahme.webp`
- `03-monochrome-portrait.webp`

**Vorteile**:
- Automatische Sortierung
- Alt-Text wird automatisch generiert
- Übersichtlich im Dateisystem

---

## Ablauf – Neue Bilder hinzufügen / ersetzen / löschen

1. Bilder in den passenden Ordner legen (`works-i/`, `works-ii/` etc.)
2. Optional: Bilder schon optimieren (max. ~2400px Breite, WebP)
3. Im `web/`-Ordner ausführen:
   ```bash
   npm run build

   
