# Deploy jpstern.com auf Hostpoint

## Vorbereitung

```bash
cd ~/factory/jpstern/web
npm run sync          # Bilder von Live-Site (einmalig / bei Updates)
npm run build
```

Ergebnis: `dist/` — kompletten Inhalt nach `~/www/jpstern.com/` hochladen (SFTP / File Manager).

## WordPress ersetzen

1. **Backup** von `wp-content/uploads/` (falls noch nicht lokal)
2. Inhalt von `~/www/jpstern.com/` löschen **ausser** ggf. `.htpasswd`
3. `dist/*` hochladen
4. **`htaccess-upload.txt`** hochladen und auf dem Server in **`.htaccess`** umbenennen  
   (Punktdateien sieht der File Manager oft nicht — lokal liegt `.htaccess` trotzdem in `dist/`)
5. `send-selection.php` liegt in `dist/` (Root)
5. SSL prüfen (Let's Encrypt bleibt)

## Pre-Shoot serverseitig schützen (empfohlen)

Die `.htaccess` enthält bereits den Auth-Block für alle `/pre-shoot*`-Pfade.

**Auf Hostpoint (SSH):**

```bash
cd ~/www/jpstern.com
bash deploy/setup-htpasswd.sh
# Benutzer: jpstern — Passwort z. B. Pre-Shoot (oder neu wählen)
```

**Deploy:**

1. `npm run build`
2. `dist/*` nach `~/www/jpstern.com/` hochladen
3. `.htpasswd` separat ins gleiche Verzeichnis (nach `setup-htpasswd.sh`)

`.htpasswd` nie ins Git committen (steht in `.gitignore`).

## Bilder hinzufügen

Neue Pre-Shoot-Beispiele → Ordner:

```
public/pre-shoot/images/{kategorie}/
```

Dann `npm run build` — Manifest wird automatisch generiert.

## Redirects

Alte URLs sind in `.htaccess` (home-hero, about-me, kontakt). Weitere bei Bedarf ergänzen.