<?php
/**
 * Pre-Shoot selection mail — no WordPress.
 * Embeds thumbnails as base64 in HTML (archivfest, keine Hotlinks).
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Nur POST erlaubt.';
    exit;
}

$raw = $_POST['data'] ?? file_get_contents('php://input');
$data = json_decode(stripslashes($raw), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo 'Fehler: Keine Daten empfangen.';
    exit;
}

$name = trim($data['name'] ?? 'Unbekanntes Model');
$email = trim($data['email'] ?? '');
$category = trim($data['category'] ?? 'Pre-Shoot Selection');
$to = 'info@jpstern.com';
$subject = "Pre-Shoot Selection - $category - $name";

function esc($s) {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function thumbDataUri($webPath) {
    if (!is_string($webPath) || $webPath === '') return null;
    $webPath = parse_url($webPath, PHP_URL_PATH) ?: $webPath;
    $full = __DIR__ . $webPath;
    if (!is_file($full)) return null;
    $info = @getimagesize($full);
    if (!$info) return null;
    $mime = $info['mime'];
    $max = 400;
    $w = $info[0];
    $h = $info[1];
    if ($w <= 0 || $h <= 0) return null;
    $scale = min(1, $max / max($w, $h));
    $nw = (int) round($w * $scale);
    $nh = (int) round($h * $scale);

    $src = null;
    switch ($mime) {
        case 'image/jpeg': $src = @imagecreatefromjpeg($full); break;
        case 'image/png': $src = @imagecreatefrompng($full); break;
        case 'image/webp':
            if (function_exists('imagecreatefromwebp')) {
                $src = @imagecreatefromwebp($full);
            }
            break;
        case 'image/gif': $src = @imagecreatefromgif($full); break;
    }
    if (!$src) {
        $bin = @file_get_contents($full);
        if ($bin === false) return null;
        return 'data:' . $mime . ';base64,' . base64_encode($bin);
    }

    $dst = imagecreatetruecolor($nw, $nh);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
    ob_start();
    imagejpeg($dst, null, 82);
    $jpeg = ob_get_clean();
    imagedestroy($src);
    imagedestroy($dst);
    if ($jpeg === false) return null;
    return 'data:image/jpeg;base64,' . base64_encode($jpeg);
}

function renderSection($title, $paths) {
    if (empty($paths)) return '';
    $html = '<h3 style="margin:28px 0 14px;">' . esc($title) . '</h3><div style="display:flex;flex-wrap:wrap;gap:12px;">';
    foreach ($paths as $path) {
        $uri = thumbDataUri($path);
        if ($uri) {
            $html .= '<img src="' . $uri . '" alt="" style="width:200px;height:200px;object-fit:cover;border-radius:8px;border:2px solid #eee;">';
        } else {
            $html .= '<p style="color:#999;font-size:13px;">' . esc(basename($path)) . ' (nicht gefunden)</p>';
        }
    }
    $html .= '</div>';
    return $html;
}

$message = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:24px;">';
$message .= '<div style="max-width:900px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">';
$message .= '<div style="background:#111;color:#fff;padding:28px;text-align:center;"><h1 style="margin:0;">Pre-Shoot Selection</h1>';
$message .= '<p style="margin:8px 0 0;font-size:17px;">' . esc($category) . '</p></div>';
$message .= '<div style="padding:32px;"><h2>Model: ' . esc($name) . '</h2>';
if ($email !== '') {
    $message .= '<p><strong>Email:</strong> ' . esc($email) . '</p>';
}
$message .= '<hr style="margin:28px 0;border:none;border-top:1px solid #eee;">';
$message .= renderSection('❤️ Favorit', $data['fav'] ?? []);
$message .= renderSection('👍 Machbar', $data['alright'] ?? []);
$message .= '</div><div style="background:#f8f8f8;padding:20px;text-align:center;font-size:13px;color:#777;">JP Stern Photography</div></div></body></html>';

$headers = [
    'Content-Type: text/html; charset=UTF-8',
    'From: JP Stern Photography <info@jpstern.com>',
];

$ok = mail($to, $subject, $message, implode("\r\n", $headers));
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mail($email, $subject, $message, implode("\r\n", $headers));
}

if (!$ok) {
    http_response_code(500);
    echo 'Mail-Versand fehlgeschlagen.';
    exit;
}

header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
echo '<title>Gesendet</title></head><body style="background:#1a1a1a;color:#ddd;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">';
echo '<div style="text-align:center;max-width:520px;padding:24px;"><h1 style="color:#4caf50;">✅ Gesendet!</h1>';
echo '<p>Deine Auswahl wurde erfolgreich per E-Mail verschickt.</p>';
echo '<p><a href="/pre-shoot-style-clarification/" style="color:#aaa;">Zurück zur Übersicht</a></p></div></body></html>';