# SEO — jpstern.com (Statik)

Stand: Juni 2026

## Kurzantwort

**Ja — SEO gehört zum Statik-Relaunch.** Bei Astro/Statik oft **besser** als WordPress + Yoast, weil: schnelle Ladezeit, sauberes HTML, volle Kontrolle über Meta-Tags, keine Plugin-Konflikte.

## Was wir umsetzen können (Grok Build / Factory)

### Technisch (On-Page)

| Thema | Umsetzung |
|-------|-----------|
| `<title>`, Meta-Description | Pro Seite in Frontmatter / `seo.json` |
| Canonical URLs | Automatisch pro Route |
| Open Graph + Twitter Cards | Für Social-Sharing (Fotografie wichtig) |
| `robots.txt` | Statisch generiert |
| `sitemap.xml` | Astro `@astrojs/sitemap` — alle Seiten automatisch |
| Strukturierte Daten | JSON-LD: `Person`, `Photographer`, `WebSite`, ggf. `ImageObject` |
| Bild-SEO | `alt`-Texte, sinnvolle Dateinamen, WebP/AVIF, `width`/`height` |
| Überschriften-Hierarchie | H1 einmal, logische H2/H3 |
| Mobile / Core Web Vitals | Statik + optimierte Bilder = stark |

### Inhaltlich

| Thema | Umsetzung |
|-------|-----------|
| Keywords | «Swiss photographer», «Portrait Sámara», «Sensual photography TFP», … — in Texte einarbeiten, nicht spammen |
| Lokale Signale | Sámara / Costa Rica / Switzerland / Italy Reisen im Content |
| Interne Verlinkung | Galerien, Projekte («Close up!»), Kontakt |

### Nach Launch

| Thema | Hinweis |
|-------|---------|
| Google Search Console | Einmal einrichten, Sitemap einreichen |
| Google Business | Falls relevant für lokale Suche |
| 301-Redirects | Alte WP-URLs → neue Pfade (wichtig beim Umstieg) |
| Analytics | Optional Plausible/Fathom (datenschutzfreundlich) statt MonsterInsights |

## Was SEO **nicht** automatisch löst

- Backlinks, Instagram-Reichweite, «ranken für X» ohne Content-Strategie
- Google-Bewertungen / Maps
- Rechtliche Seiten (Impressum/Datenschutz) — müssen Inhalt haben, können wir aber technisch sauber einbinden

## jpstern-spezifisch

- Portfolio = **Bilder dominant** → Google Images / OG-Previews wichtiger als lange Blog-Texte
- Instagram parallel — Site als «Anker» mit eigenem SEO, nicht Feed als Homepage-Kern (Lesson von Magenmorsellen)

## Referenz Stack

```text
@astrojs/sitemap
@astrojs/rss          # optional Blog
schema.org JSON-LD in Layout-Komponente
```

Alles im Repo versioniert — kein Yoast-Plugin, kein Elementor-SEO-Tab.