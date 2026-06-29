#!/usr/bin/env bash
# Erzeugt .htpasswd für Pre-Shoot Basic Auth auf Hostpoint.
#
# Auf dem Server im Webroot ausführen:
#   cd ~/www/jpstern.com
#   bash deploy/setup-htpasswd.sh
#
# Die Datei .htpasswd nie ins Git committen.

set -euo pipefail

USERNAME="${HTPASSWD_USER:-jpstern}"
OUT_FILE=".htpasswd"

for arg in "$@"; do
  case "$arg" in
    --user=*) USERNAME="${arg#*=}" ;;
    --help)
      echo "Usage: setup-htpasswd.sh [--user=NAME]"
      echo "  Erstellt oder erweitert .htpasswd im aktuellen Verzeichnis."
      exit 0
      ;;
  esac
done

if ! command -v htpasswd >/dev/null 2>&1; then
  echo "htpasswd nicht gefunden."
  echo "Auf Hostpoint per SSH: htpasswd ist in der Regel verfügbar."
  echo "Alternativ lokal: brew install httpd  (macOS)"
  exit 1
fi

echo "Benutzer: $USERNAME"
if [[ -f "$OUT_FILE" ]]; then
  echo "Bestehende $OUT_FILE wird erweitert."
  htpasswd -B "$OUT_FILE" "$USERNAME"
else
  echo "Neue $OUT_FILE wird angelegt."
  htpasswd -cB "$OUT_FILE" "$USERNAME"
fi

chmod 640 "$OUT_FILE"
echo ""
echo "✓ $OUT_FILE bereit."
echo ""
echo "Nächste Schritte:"
echo "  1. In public/.htaccess: __HOSTPOINT_WEBROOT__ → absoluter Webroot-Pfad"
echo "     (siehe deploy/hostpoint-path.txt)"
echo "  2. .htpasswd ins Webroot legen (gleicher Ordner wie index.html)"
echo "  3. npm run build && dist/ deployen"
echo ""
echo "Test nach Deploy:"
echo "  curl -I -u $USERNAME:DEIN_PASSWORT https://jpstern.com/pre-shoot-style-clarification/"