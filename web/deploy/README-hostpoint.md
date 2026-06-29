# Deploy jpstern.com auf Hostpoint

## Vorbereitung

```bash
cd ~/factory/jpstern/web
npm run sync          # Bilder von Live-Site (einmalig / bei Updates)
npm run build
```

Ergebnis: `dist/` — kompletten Inhalt nach `~/www/jpstern.com/` hochladen (SFTP).

## WordPress ersetzen

1. **Backup** von `wp-content/uploads/` (falls noch nicht lokal)
2. Inhalt von `~/www/jpstern.com/` löschen **ausser** ggf. `.htpasswd`
3. `dist/*` hochladen
4. `send-selection.php` liegt in `dist/` (Root)
5. SSL prüfen (Let's Encrypt bleibt)

## Pre-Shoot serverseitig schützen (empfohlen)

Die `.htaccess` enthält bereits den Auth-Block für alle `/pre-shoot*`-Pfade.

**Auf Hostpoint (SSH):**

```bash
cd ~/www/jpstern.com
bash deploy/setup-htpasswd.sh
# Benutzer: jpstern — Passwort z. B. Pre-Shoot (oder neu wählen)
```

**Vor dem Deploy lokal:**

1. In `public/.htaccess` den Platzhalter `__HOSTPOINT_WEBROOT__` durch den absoluten Webroot-Pfad ersetzen (siehe `deploy/hostpoint-path.txt`, typisch `/home/BENUTZER/www/jpstern.com`).
2. `npm run build`
3. `dist/*` hochladen — **`.htpasswd` separat ins Webroot**, falls nicht schon dort.

`.htpasswd` nie ins Git committen (steht in `.gitignore`).

## Bilder hinzufügen

Neue Pre-Shoot-Beispiele → Ordner:

```
public/pre-shoot/images/{kategorie}/
```

Dann `npm run build` — Manifest wird automatisch generiert.

## Redirects

Alte URLs sind in `.htaccess` (home-hero, about-me, kontakt). Weitere bei Bedarf ergänzen.