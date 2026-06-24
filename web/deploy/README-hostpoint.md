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

Im Hostpoint-Panel oder per SSH:

```bash
htpasswd -c .htpasswd jpstern
# Passwort: Pre-Shoot (oder neu wählen)
```

In `.htaccess` den auskommentierten `LocationMatch`-Block aktivieren und `AuthUserFile`-Pfad anpassen.

## Bilder hinzufügen

Neue Pre-Shoot-Beispiele → Ordner:

```
public/pre-shoot/images/{kategorie}/
```

Dann `npm run build` — Manifest wird automatisch generiert.

## Redirects

Alte URLs sind in `.htaccess` (home-hero, about-me, kontakt). Weitere bei Bedarf ergänzen.