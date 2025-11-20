<?php
/**
 * Central6RP - Proxy pour contourner la protection InfinityFree
 * 
 * Ce fichier accepte les requêtes de Vercel et les redirige en interne
 * vers les vrais endpoints PHP, en utilisant curl local (pas de blocage)
 */

// Headers pour accepter toutes les requêtes
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre aux OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Récupérer l'endpoint cible depuis le paramètre 'endpoint'
$target_endpoint = $_GET['endpoint'] ?? '';

if (empty($target_endpoint)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Endpoint manquant']));
}

// Construire l'URL locale (même domaine)
$base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') 
    . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
$target_url = rtrim($base_url, '/') . '/' . ltrim($target_endpoint, '/');

// Préparer la requête curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

// Copier la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// Copier les headers (sauf ceux qu'on ne veut pas)
$headers = [];
foreach (getallheaders() as $name => $value) {
    $name_lower = strtolower($name);
    // Ignorer certains headers
    if (!in_array($name_lower, ['host', 'connection', 'content-length'])) {
        $headers[] = "$name: $value";
    }
}
if (!empty($headers)) {
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
}

// Copier le body pour POST/PUT
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    $body = file_get_contents('php://input');
    if (!empty($body)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }
}

// Copier les cookies
if (!empty($_COOKIE)) {
    $cookies = [];
    foreach ($_COOKIE as $name => $value) {
        $cookies[] = "$name=$value";
    }
    curl_setopt($ch, CURLOPT_COOKIE, implode('; ', $cookies));
}

// Exécuter la requête
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$error = curl_error($ch);
curl_close($ch);

// Gérer les erreurs curl
if ($response === false || !empty($error)) {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Erreur proxy: ' . $error]));
}

// Retourner la réponse
http_response_code($http_code);
if (!empty($content_type)) {
    header('Content-Type: ' . $content_type);
}
echo $response;

