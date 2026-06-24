# jpstern.com — Relaunch-Plan & Aufwand (Statik)

Stand: Juni 2026. **Nur Planung** — noch nicht bauen.

## Ausgangslage

| Punkt | Status |
|-------|--------|
| Live-Site | WordPress + Elementor, neu gebaut mit Grok (Web) |
| Erfahrung | Funktionalität teils ok, **Wartung/Patching ätzend** |
| Kernfeature | **Pre-Shoot-Flow** — **privat**, passwortgeschützt; nur für Models mit geplantem Shooting |
| Pre-Shoot-Einstieg | `https://jpstern.com/pre-shoot-style-clarification/` + Passwort (per DM/Mail) |
| Lücke | **`/` ist nicht die Hero-Startseite** — die liegt unter `/home-hero/` |
| Ziel | **Neustart Statik (Astro)**, möglichst viel übernehmen (Texte, Bilder, Logik) |

---

## Status-Matrix: fertig / halbfertig / fehlt

Stand Juni 2026 — bestätigt durch Live-Check + dein Feedback («Logik funktioniert, Seite nicht ganz fertig»).

| Bereich | Status | Befund |
|---------|--------|--------|
| **Pre-Shoot Ja/Nein** | ✅ **fertig (WP)** | 6 Kategorien, Model wählt aus Beispielbildern — funktioniert |
| **Pre-Shoot Einstieg** | ✅ **fertig (WP)** | `/pre-shoot-style-clarification/` — passwortgeschützt |
| **Pre-Shoot Hub** | ✅ **fertig (WP)** | 5 Kategorien — siehe `04-pre-shoot-spec.md` |
| **Pre-Shoot Review + E-Mail** | ⚠️ **teilweise** | Ja/Nein-Logik ok; `send-selection.php` → HTTP 500 |
| **Pre-Shoot → Kontakt** | ❓ unklar | Auswahl evtl. nur für dich sichtbar, nicht öffentliches Formular |
| **home-hero** | ✅ **fertig** | 3 Hero-Slides, Slogans, «Jetzt bewerben» |
| **Startseite `/`** | ⚠️ **falsch** | Galerie + IG-Feed statt Hero — **Haupt-Lücke** |
| **about-me** | ✅ **fertig** | Vollständiger DE-Text + Portrait |
| **kontakt** | ✅ **fertig** | WPForms: Name, Mail, Shooting-Art, Moodboard-Upload |
| **Works I–III** | ⚠️ **leer** | Seiten existieren, kein Galerie-Inhalt |
| **Navigation** | ⚠️ unklar | Kein sichtbares Hauptmenü auf Live-Abruf |
| **Instagram** | ➡️ **nur Link** | Kein Feed auf Homepage; früher nur «Site lebt» für Google — entfällt bei Statik |
| **Impressum / Datenschutz** | ❓ ungeprüft | Vor Go-Live nötig (CH + CR) |
| **SEO / Redirects** | ❌ fehlt | Erst beim Statik-Launch |

**Kernbotschaft:** Öffentliche Site braucht **Seriosität + Hero als `/`**; Pre-Shoot ist **separater, geschützter Bereich** — nicht Teil der öffentlichen Bewerbung.

---

## Zwei Welten: öffentlich vs. Pre-Shoot

| | **Öffentliche Site** | **Pre-Shoot (privat)** |
|--|----------------------|-------------------------|
| **Zielgruppe** | Interessentinnen, Besucherinnen, Google | Nur Models mit **vereinbartem** Shooting |
| **Zugang** | Offen | Link + **Passwort** (gibst du persönlich) |
| **Einstieg** | `/`, About, Kontakt | `/pre-shoot-style-clarification/` |
| **«Jetzt bewerben»** | → **Kontakt** (Bewerbung) | **nicht** → Pre-Shoot |
| **In Navigation** | Ja | **Nein** — nicht verlinkt, nicht in Sitemap |
| **SEO** | Voll (Sitemap, OG, JSON-LD) | **Ausgeschlossen** (`noindex`, nicht in Sitemap) |
| **Ton** | Seriös, professionell, Fine Art | Vertrauensvoll, Grenzen klären, Beispielbilder |
| **Instagram** | Link im Header (Social Proof) | Irrelevant |

**Positionierung:** Homepage = **Anker für Seriosität**; Instagram bleibt Kanal für Model-Kontakte; Pre-Shoot = **Werkzeug nach dem Ja**, nicht Marketing-Funnel.

---

## Inventar Live-Site (14+ WordPress-Seiten)

| URL | Rolle | Inhalt (Stand Analyse) |
|-----|-------|------------------------|
| `/` | **Aktuelle Startseite** | Bildergalerie + Instagram-Feed — **nicht** Hero |
| `/home-hero/` | **Gewünschte Startseite** | Hero-Slides (DE), «Jetzt bewerben» → Kontakt |
| `/pre-shoot-style-clarification/` | **Pre-Shoot Einstieg** | Passwort-Gate → Style-Auswahl (Inhalt hinter Schutz) |
| `/about-me/` | Über mich | ✅ Vollständiger DE-Text + Portrait |
| `/kontakt/` | Kontakt | (noch nicht detailliert geprüft) |
| `/works-i/` … `/works-iii/` | Portfolio-Galerien | 3 Galerie-Seiten (Inhalt teils leer im Abruf) |
| `/pre-shoot-lifestyle/` | Pre-Shoot Kategorie | Beispielbilder + Auswahl |
| `/pre-shoot-sensual-bedroom/` | Pre-Shoot Kategorie | … |
| `/pre-shoot-sensual-portrait/` | Pre-Shoot Kategorie | … |
| `/pre-shoot-sensual-shibari/` | Pre-Shoot Kategorie | … |
| `/pre-shoot-sensual-nude/` | Pre-Shoot Kategorie | … |
| `/pre-shoot-sensual-implied/` | Pre-Shoot Kategorie | … |

**Dokumentiert:** Vollständiger Flow in [`04-pre-shoot-spec.md`](./04-pre-shoot-spec.md).

**Noch offen / Bugs:**

- `send-selection.php` defekt (500) — neu bauen mit **Bild-Anhängen/PDF**, keine URL-Links (archivfest)
- Kategorie-URLs **nicht** passwortgeschützt (Sicherheitslücke)
- `sensual-nude`: eigene Kategorie — Bilder fehlten in WP (Elementor zu mühsam); im Repo per Ordner `pre-shoot/images/sensual-nude/`
- Falsche `category`-Strings in E-Mail bei Lifestyle/Portrait/Shibari
- Impressum / Datenschutz

---

## Ziel-Architektur (Statik)

```
jpstern.com/                          ÖFFENTLICH
├── /                      ← home-hero (echte Startseite)
├── /about                 ← about-me
├── /contact               ← kontakt («Jetzt bewerben» landet hier)
├── /portfolio             ← Works / Galerie(n)
├── impressum, datenschutz
└── SEO, sitemap (nur öffentliche Routen)

jpstern.com/pre-shoot-style-clarification/   PRIVAT (Passwort)
├── [Gate]                 ← WP-Passwort → Statik: siehe unten
├── /lifestyle …           ← 6 Kategorie-Seiten (URLs wie heute)
└── [summary?]             ← noch zu klären
```

**Passwort-Schutz (Statik auf Hostpoint):**

| Option | Sicherheit | Empfehlung |
|--------|------------|------------|
| **A — `.htaccess` Basic Auth** | Hoch — Bilder nicht ohne Login | ✅ **Default** für sensual Beispielbilder |
| B — Client-JS + sessionStorage | Niedrig — Assets öffentlich abrufbar | Nur wenn A auf Hostpoint scheitert |
| C — Ein Passwort für alle Models | Praktisch (wie heute?) | Oder rotierendes Passwort — deine Wahl |

**Tech:** Astro + React nur im Pre-Shoot-Bereich; Beispielbilder in geschütztem Ordner oder hinter Auth; Zustand in `sessionStorage`; **kein** Pre-Shoot in öffentlicher Sitemap.

**Instagram:** Nur Icon/Link im Header — **kein Feed-Block** auf `/`. «Site lebt»-Signal für Google: statische Site + regelmässige kleine Content-Updates (neues Portfolio-Bild) reicht; optional Blog später.

---

## Was wir übernehmen können

| Asset | Übernahme | Aufwand |
|-------|-----------|---------|
| **Texte** | about-me, home-hero, Kontakt — copy/paste oder WP-Export | Gering |
| **Fotos** | `wp-content/uploads/2026/04/` (+ ältere Works) — Download, WebP | Mittel (viele Dateien) |
| **Logo, Portrait** | PNG/WebP vorhanden | Gering |
| **Design** | Farben, Typo, Hero-Layout als Referenz (Screenshot + Nachbau) | Mittel |
| **Pre-Shoot-Logik** | **Konzept ja**, Elementor-Widgets **nein** — in Astro/React neu, gleiches UX | **Hoch** (Kernarbeit) |
| **Instagram** | Nur Header-Link — kein Feed, kein Homepage-Block | Gering |
| **SEO** | Meta aus AIOSEO manuell / aus Live-HTML | Gering |

**Wichtig vor WP-Abbau — Pre-Shoot-Spec (vom Nutzer):**

1. Ablauf nach Passwort-Eingabe — Schritt für Schritt
2. Pro Kategorie: welche Bilder, Labels, Reihenfolge?
3. Ja/Nein pro **Bild** oder pro **Kategorie**? «Vielleicht»?
4. Ende des Flows: Summary? E-Mail an JP? Speichern für später?
5. Ein Passwort für alle oder pro Model?
6. Screenshots der geschützten Seiten (Grok kann `/pre-shoot-style-clarification/` nicht lesen)

---

## Phasenplan

### Phase 0 — Inventar & Export (vor Code)

| # | Aufgabe | Wer |
|---|---------|-----|
| 0.1 | Alle WP-Seiten im Browser durchklicken, Screenshots | Du |
| 0.2 | Pre-Shoot-Flow dokumentieren (Schritte, Felder, Ja/Nein) | Du + Grok |
| 0.3 | Bilder von Hostpoint laden (`uploads/`) | Grok |
| 0.4 | Texte exportieren (WP XML oder manuell) | Grok |
| 0.5 | Liste «fertig / halbfertig / fehlt» bestätigen | Du |

**Aufwand:** ~0.5–1 Tag

---

### Phase 1 — Fundament Statik

| # | Aufgabe |
|---|---------|
| 1.1 | Astro-Projekt in `~/factory/jpstern/web/` |
| 1.2 | Layout: Header (Logo, Nav, IG, Mail, Tel), Footer |
| 1.3 | Design-Tokens (dunkel, silber, Typo wie jetzt) |
| 1.4 | Bild-Pipeline (responsive, lazy load, WebP) |
| 1.5 | SEO-Basis (sitemap, OG, Layout-Meta) — siehe `02-seo-statik.md` |

**Aufwand:** ~1–2 Tage (Grok Build)

---

### Phase 2 — Marketing-Seiten

| # | Aufgabe | Priorität |
|---|---------|-----------|
| 2.1 | **`/` = home-hero** (Slides, Slogans, CTA «Jetzt bewerben») | P0 |
| 2.2 | `/about` — Text von about-me | P0 |
| 2.3 | `/contact` — Formular (Formspree o.ä.) + WhatsApp/Tel | P0 |
| 2.4 | Portfolio `/works-*` — Galerie(n), Lightbox | P1 |
| 2.5 | Instagram: **nur** Header-Link (kein Feed) | P0 |
| 2.6 | Seriosität: Typo, Text, keine «social feed»-Optik auf `/` | P0 |
| 2.7 | Alte `/` Galerie: in Portfolio integrieren | P2 |

**Aufwand:** ~2–3 Tage

---

### Phase 3 — Pre-Shoot (privat, passwortgeschützt)

| # | Aufgabe |
|---|---------|
| 3.1 | Passwort-Gate (`/pre-shoot-style-clarification/`) — `.htaccess` oder äquivalent |
| 3.2 | Einstiegsseite nach Login — Erklärung, 6 Kategorien, Fortschritt |
| 3.3 | Pro Kategorie: Beispiel-Galerie, Ja / Nein (ggf. «unsicher») |
| 3.4 | State (`sessionStorage`), Navigation zwischen Kategorien |
| 3.5 | `send-selection.php` **neu** — ohne WP, Bilder als Anhang/PDF (nicht URL) |
| 3.6 | `noindex`, nicht in Sitemap; sensual Bilder nicht öffentlich |
| 3.7 | Mobile UX (Models am Handy) |

**Aufwand:** ~3–5 Tage — abhängig von Feinheit (pro Bild vs. pro Kategorie)

| Variante | Beschreibung | Aufwand Phase 3 |
|----------|--------------|-----------------|
| **A — Einfach** | Ja/Nein nur pro **Kategorie** (6 Entscheidungen) | ~2 Tage |
| **B — Standard** | Pro Kategorie mehrere Beispielbilder, Ja/Nein **pro Bild** | ~4 Tage |
| **C — Plus** | Wie B + Kommentarfeld + Moodboard-Upload-Link | ~5–6 Tage |

*(Deine WP-Version klingt nach **B** oder **C**.)*

---

### Phase 4 — SEO, Recht, Go-Live

| # | Aufgabe |
|---|---------|
| 4.1 | 301-Redirects (alle 13 alten URLs) |
| 4.2 | Alt-Texte wichtigster Bilder |
| 4.3 | Impressum/Datenschutz (CH/CR relevant?) |
| 4.4 | Search Console, Sitemap einreichen |
| 4.5 | Deploy Hostpoint (Statik), WP abschalten |

**Aufwand:** ~1–2 Tage

---

## Scope-Abgrenzung Relaunch vs. später

| Feature | Relaunch (Szenario M) | Später |
|---------|----------------------|--------|
| Hero, About, Kontakt | ✅ | |
| Pre-Shoot (vor Shooting, Moodboard) | ✅ | |
| Bilder-Ordner statt WP Media | ✅ | |
| Post-Shoot Model-Galerie (Auswahl nach Shooting) | ❌ | Phase 2, manuell möglich |
| Works-Portfolio | optional P1 | |

**Model-Journey:** TFP-Anfrage → JP gibt Pre-Shoot-Link → Model wählt Stile → E-Mail (Favorit/Machbar) → Shooting → *(später)* individuelle Auswahl-Galerie, temporär, löschbar.

---

## Aufwandssumme

| Phase | Tage (Grok Build + dein Review) | Anmerkung |
|-------|----------------------------------|-----------|
| 0 Inventar | 0.5–1 | Pre-Shoot dokumentieren spart Phase 3 |
| 1 Fundament | 1–2 | Astro, Layout, Bild-Pipeline |
| 2 Marketing | 2–3 | Hero, About, Kontakt, Works |
| 3 Pre-Shoot (Standard B) | **3–4** | Logik **portieren**, nicht neu erfinden |
| 4 SEO & Launch | 1–2 | Redirects, Recht, Deploy |
| **Total** | **~8–12 Arbeitstage** | −1 Tag wenn Pre-Shoot gut dokumentiert |

### Drei Szenarien

| Szenario | Umfang | Tage | Kalender |
|----------|--------|------|----------|
| **S — Schnell live** | Hero + About + Kontakt + minimal SEO | **5–6** | ~1–1.5 Wochen |
| **M — Empfohlen** | S + Pre-Shoot komplett (Hub, 6 Kat., Summary → Kontakt) | **9–11** | ~2–3 Wochen |
| **L — Komplett** | M + Works-Galerien gefüllt + IG-Entscheidung + Feinschliff | **11–14** | ~3–4 Wochen |

**Dein «Neustart ok, viel übernehmen»** passt zu **Szenario M**: Texte, Bilder, UX-Idee bleiben; nur Tech-Stack und fehlende Teile werden neu gebaut.

**Kalender:** mit Abstimmungen, Bildauswahl, Feinschliff eher **2–4 Wochen**.

**Vergleich:**

| Projekt | Aufwand |
|---------|---------|
| jpstern Statik (dieser Plan) | 8–13 Tage |
| magenmorsellen nur Phase 1 | ~5–8 Tage |
| escuela Portierung Standard | 3–5 Tage |

jpstern ist **mehr Aufwand als escuela**, wegen **Pre-Shoot-App-Logik** und Galerien — aber **weniger** als Magenmorsellen inkl. Shop.

---

## Empfohlene Reihenfolge (MVP → komplett)

```
MVP (live-fähig):     Phase 0 → 1 → 2.1–2.3 → 4 (minimal)     ≈ 5–7 Tage
Dann:                 Phase 3 Pre-Shoot Standard                 ≈ +4 Tage
Dann:                 Works-Galerien + Instagram-Entscheidung    ≈ +2 Tage
```

So hast du schnell **Hero-Home + About + Kontakt** live, Pre-Shoot folgt als zweiter Schritt — oder alles in einem Rutsch, wenn du wartest.

---

## Risiken & Annahmen

| Risiko | Mitigation |
|--------|------------|
| Pre-Shoot-Logik in Elementor undokumentiert | Phase 0: du klickst Flow durch, Screenshots |
| Viele Bilder, Hostpoint-Download langsam | Einmalig rsync/FTP, dann lokal |
| Works-Seiten unvollständig | Priorität klären: welche Galerie zuerst? |
| Rechte an Model-Bildern (Sensual) | Nur bereits veröffentlichte Bilder übernehmen |
| Formular SPAM | Formspree + Honeypot |

**Annahme:** Einsprachig **DE** primär (EN optional später +1–2 Tage).

---

## Nächste Entscheidungen von dir

1. **MVP zuerst** (öffentliche Site) **oder** alles zusammen?
3. **Works I–III:** alle drei oder eine Galerie?
4. **Sensual-Nude Bilder:** schon vorhanden lokal oder erst später befüllen?

**Erledigt / geklärt:**

- Instagram = nur Link; Homepage = Seriositäts-Anker
- Pre-Shoot privat, Passwort ok, Model wählt Kategorien frei
- E-Mail nur Favorit + Machbar (Moodboard)
- Bilder künftig per **Ordner** statt WP Media — siehe `04-pre-shoot-spec.md`

---

## Nach «bau»-Freigabe

1. Phase 0 starten (Export)
2. `web/` Astro anlegen
3. Kein WordPress mehr anfassen — Live-Site bleibt bis Redirect-Tag