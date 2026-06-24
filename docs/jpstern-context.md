# jpstern — Project Context for AI Collaboration

**Purpose of this file:** Self-contained summary of the JP Stern Photography portfolio project and its web presence for quick context sharing with another AI.

**Last updated:** 2026-06-24

---

## 1. What the Project Is

**jpstern.com** is the professional website for **JP Stern Photography** (photographer, Costa Rica / Switzerland connections).

The site serves two distinct audiences:
- **Public / Marketing:** Portfolio (Works I–III), About, Contact, FAQ. Goal: attract potential clients/models, showcase work, enable inquiries.
- **Private Pre-Shoot Tool:** Password-protected flow for models with a confirmed upcoming shoot. Models review style examples, make selections (yes/no per category or image), which helps the photographer clarify creative direction before the shoot.

Current live site was rebuilt in WordPress + Elementor (with Grok assistance) but has maintenance pain and some structural issues (wrong homepage, incomplete galleries, backend email problems).

**Goal:** Relaunch as a clean, fast, maintainable **static site** (Astro) deployed on Hostpoint. Keep or improve the private pre-shoot functionality using lightweight React islands inside Astro.

---

## 2. Main Sections & Features (from planning + current web/)

Public:
- Hero / landing with strong call-to-action ("Jetzt bewerben")
- About (full bio text + portrait)
- Works / Galleries (I, II, III — image grids)
- FAQ
- Contact form (name, email, shooting type, moodboard upload)
- Impressum / Datenschutz (CH + CR requirements)

Private / Pre-Shoot:
- Entry gate: `/pre-shoot-style-clarification/` + password (shared personally)
- Style selection / hub with categories
- Interactive reviewer (React components: PreShootGate, PreShootHub, PreShootReviewer)
- Selections feed into review + (planned) email notification to photographer

**Important distinction:** Public site should feel professional and open. Pre-shoot is separate, gated, and not promoted on the public homepage.

---

## 3. Technology Stack (Target & Current web/)

**Target architecture (from planning docs):**
- Astro (static site generation)
- Markdown / JSON / data files for content (easy for Grok to edit)
- React islands (`@astrojs/react`) only where needed — primarily the private pre-shoot interactive UI
- Image optimization (Sharp in build scripts)
- Sitemap, SEO considerations (see 02-seo-statik.md)
- Deploy as pure static files to Hostpoint

**Current implementation in `web/`:**
- Astro 4.x + React 19
- Custom components (Header, GalleryGrid, HeroSlider, Footer, FaqAnswer, and pre-shoot React components)
- Data-driven: `data/` (categories.json, gallery-manifest.json, preshoot-manifest.json, faq.ts, etc.)
- Build scripts for image optimization and manifest generation
- Pages for index, about, contact, works-*, faq, dynamic [slug], pre-shoot flow
- Global CSS + component styles

Scripts include prebuild steps for manifests and image processing.

---

## 4. Current State (June 2026)

- Detailed planning documents exist at root (01-ist-analyse, 02-seo-statik, 03-plan-aufwand, 04-pre-shoot-spec).
- A working Astro + React static implementation lives in `web/`.
- Live site still runs on the old WP + Elementor version.
- Pre-shoot flow logic is specified and partially implemented in the Astro web/.
- Galleries and some public polish still incomplete on the new stack.
- Hosting decision: stay on Hostpoint, pure static (no PHP/WordPress).

The `web/` folder is the candidate for deployment once content is finalized and SEO/redirects handled.

---

## 5. Plans & Roadmap (high level from docs)

- Complete migration of content, images, and galleries from live WP site into Astro data + optimized assets.
- Make `/` the proper hero landing (currently galleries dominate on old site).
- Finalize and harden the private pre-shoot flow (email delivery of selections, clean UX).
- SEO-friendly static build + sitemap (exclude private paths).
- Deploy to Hostpoint.
- Add proper legal pages (Impressum/Datenschutz for CH + CR).
- Post-launch: minimal maintenance (Grok edits content in repo + rebuild/deploy).

See:
- `03-plan-aufwand.md` for effort breakdown and phases
- `04-pre-shoot-spec.md` for detailed pre-shoot requirements extracted from live site
- `02-seo-statik.md` for static SEO approach
- Cross-reference `../magenmorsellen/06-vorschlag-architektur.md` for Astro + static hosting recommendations used across Pink Noise projects

---

## 6. Development Notes

- Content lives in data files and Markdown/Astro pages — prefer editing those over hard-coded text.
- Pre-shoot uses React inside Astro for interactivity; keep the rest pure Astro where possible for performance.
- Build process has image optimization and manifest generation — run full build for verification.
- Follow factory static-site patterns (Astro, Hostpoint deploy).

**Commands (in `web/`):**
```bash
npm install
npm run dev
npm run build          # runs prebuild scripts automatically
npm run optimize-images
```

Open the project in the browser after build for visual QA.

---

## 7. Key Files

- Root planning: `03-plan-aufwand.md`, `04-pre-shoot-spec.md`, `01-ist-analyse.md`
- `web/astro.config.mjs`
- `web/src/data/` (manifests, categories, gallery config)
- `web/src/components/preshoot/` (interactive React parts)
- `web/src/pages/` and layouts

When collaborating, read the planning docs first — the Astro web/ is an implementation of the spec, not the spec itself.
