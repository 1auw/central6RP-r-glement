<?php
/**
 * Central6RP - Configuration de la base de données
 */

// Démarrer la session de manière sécurisée
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_secure', 0); // Désactivé en développement (activer en production avec HTTPS)
    ini_set('session.cookie_samesite', 'Lax'); // Lax pour permettre les requêtes cross-origin en développement
    session_start();
}

// Configuration de la base de données InfinityFree
// ⚠️ IMPORTANT : Remplissez les valeurs ci-dessous avec vos informations InfinityFree
define('DB_HOST', 'sql213.infinityfree.com');  // Hostname MySQL (visible dans le panneau InfinityFree)
define('DB_NAME', 'if0_40451098_central6rp');  // Nom complet de votre BDD (préfixe + nom que vous avez choisi)
define('DB_USER', 'if0_40451098');              // Username MySQL (visible dans le panneau InfinityFree)
define('DB_PASS', 'raGnjNeov1');  // Mot de passe MySQL
define('DB_CHARSET', 'utf8mb4');

// Configuration de sécurité
define('SECRET_KEY', 'votre_clé_secrète_très_longue_et_aléatoire_' . bin2hex(random_bytes(32)));
define('PASSWORD_MIN_LENGTH', 8);

// Connexion à la base de données
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']));
}

// Configuration CORS - DOIT ÊTRE AVANT TOUT AUTRE HEADER
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Autoriser localhost (développement)
if (preg_match('/^https?:\/\/localhost(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
}
// Autoriser votre domaine InfinityFree
elseif (preg_match('/^https?:\/\/central6rp\.rf\.gd$/', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
}
// Autoriser toutes les URLs Vercel (production)
elseif (preg_match('/^https:\/\/.*\.vercel\.app$/', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
}
// Autoriser toutes les origines si aucune ne correspond (pour le débogage)
elseif (!empty($origin)) {
    header("Access-Control-Allow-Origin: $origin");
}
// Par défaut, autoriser localhost en développement
else {
    header('Access-Control-Allow-Origin: http://localhost:3001');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Cookie');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); // Cache preflight pendant 24h

// Répondre aux requêtes OPTIONS (preflight) IMMÉDIATEMENT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Headers JSON (seulement pour les autres requêtes)
header('Content-Type: application/json; charset=utf-8');

/**
 * Fonction pour valider et nettoyer les données
 */
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Système de rate limiting pour prévenir les attaques brute force
 */
function check_rate_limit($action, $max_attempts = 5, $time_window = 300) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = "rate_limit_{$action}_{$ip}";
    
    // Récupérer ou initialiser le compteur
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = [
            'attempts' => 0,
            'first_attempt' => time()
        ];
    }
    
    $data = $_SESSION[$key];
    $current_time = time();
    
    // Réinitialiser si la fenêtre de temps est expirée
    if ($current_time - $data['first_attempt'] > $time_window) {
        $_SESSION[$key] = [
            'attempts' => 1,
            'first_attempt' => $current_time
        ];
        return true;
    }
    
    // Vérifier si la limite est atteinte
    if ($data['attempts'] >= $max_attempts) {
        $remaining_time = $time_window - ($current_time - $data['first_attempt']);
        http_response_code(429);
        die(json_encode([
            'success' => false,
            'error' => "Trop de tentatives. Réessayez dans " . ceil($remaining_time / 60) . " minutes."
        ]));
    }
    
    // Incrémenter le compteur
    $_SESSION[$key]['attempts']++;
    return true;
}

/**
 * Fonction pour valider un email
 */
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Fonction pour valider la force d'un mot de passe
 */
function validate_password_strength($password) {
    $errors = [];
    
    if (strlen($password) < PASSWORD_MIN_LENGTH) {
        $errors[] = "Le mot de passe doit contenir au moins " . PASSWORD_MIN_LENGTH . " caractères";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "Le mot de passe doit contenir au moins une majuscule";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "Le mot de passe doit contenir au moins une minuscule";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Le mot de passe doit contenir au moins un chiffre";
    }
    
    return empty($errors) ? true : $errors;
}

/**
 * Fonction pour nettoyer les anciennes sessions expirées
 */
function clean_expired_sessions() {
    global $pdo;
    try {
        $stmt = $pdo->prepare("DELETE FROM sessions WHERE expires_at < NOW()");
        $stmt->execute();
    } catch (PDOException $e) {
        // Log silencieux
    }
}

/**
 * Fonction pour vérifier si l'utilisateur est connecté
 */
function is_logged_in() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Fonction pour obtenir l'utilisateur actuel
 */
function get_logged_user() {
    global $pdo;
    
    if (!is_logged_in()) {
        return null;
    }
    
    $stmt = $pdo->prepare("SELECT id, username, email, role, created_at FROM users WHERE id = ? AND is_active = 1");
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch();
}

/**
 * Fonction pour logger une activité
 */
function log_activity($action, $details = null, $user_id = null) {
    global $pdo;
    
    if ($user_id === null && is_logged_in()) {
        $user_id = $_SESSION['user_id'];
    }
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    $stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $action, $details, $ip]);
}

/**
 * Fonction pour récupérer les stats FiveM en temps réel
 */
function fetch_fivem_stats($fivem_ip = '127.0.0.1', $fivem_port = '30120') {
    $info_url = "http://{$fivem_ip}:{$fivem_port}/info.json";
    $players_url = "http://{$fivem_ip}:{$fivem_port}/players.json";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    // Récupérer les infos du serveur
    curl_setopt($ch, CURLOPT_URL, $info_url);
    $server_info = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    // Récupérer la liste des joueurs
    curl_setopt($ch, CURLOPT_URL, $players_url);
    $players_data = curl_exec($ch);
    curl_close($ch);
    
    $players_online = 0;
    $max_players = 32;
    
    if ($http_code === 200 && $server_info !== false) {
        $info = json_decode($server_info, true);
        if ($info) {
            $max_players = (int)($info['vars']['sv_maxclients'] ?? $info['maxClients'] ?? 32);
        }
    }
    
    if ($players_data !== false) {
        $players = json_decode($players_data, true);
        if (is_array($players)) {
            $players_online = count($players);
        }
    }
    
    return [
        'players_online' => $players_online,
        'max_players' => $max_players,
        'server_online' => $http_code === 200
    ];
}

/**
 * Fonction pour obtenir les stats du serveur
 */
function get_server_stats() {
    global $pdo;
    
    // Charger la configuration FiveM
    $fivem_config_file = __DIR__ . '/fivem_config.php';
    if (file_exists($fivem_config_file)) {
        require_once $fivem_config_file;
        $fivem_ip = defined('FIVEM_IP') ? FIVEM_IP : '127.0.0.1';
        $fivem_port = defined('FIVEM_PORT') ? FIVEM_PORT : '30120';
    } else {
        // Valeurs par défaut si le fichier de config n'existe pas
        $fivem_ip = '127.0.0.1';
        $fivem_port = '30120';
    }
    
    // Essayer de récupérer les stats en temps réel depuis FiveM
    $fivem_stats = fetch_fivem_stats($fivem_ip, $fivem_port);
    
    // Si le serveur est en ligne, utiliser les stats en temps réel
    // Sinon, utiliser les stats de la base de données
    if ($fivem_stats['server_online']) {
        $players_online = $fivem_stats['players_online'];
        $max_players = $fivem_stats['max_players'];
        
        // Mettre à jour la base de données avec les nouvelles stats
        try {
            $stmt = $pdo->query("SELECT id FROM server_stats LIMIT 1");
            $exists = $stmt->fetch();
            
            if ($exists) {
                $stmt = $pdo->prepare("UPDATE server_stats SET players_online = ?, max_players = ?, last_updated = NOW() WHERE id = ?");
                $stmt->execute([$players_online, $max_players, $exists['id']]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO server_stats (players_online, max_players, last_updated) VALUES (?, ?, NOW())");
                $stmt->execute([$players_online, $max_players]);
            }
        } catch (PDOException $e) {
            // En cas d'erreur, continuer avec les stats récupérées
        }
    } else {
        // Serveur hors ligne, utiliser les stats de la BDD
        $stmt = $pdo->query("SELECT players_online, max_players FROM server_stats LIMIT 1");
        $server = $stmt->fetch();
        $players_online = $server['players_online'] ?? 0;
        $max_players = $server['max_players'] ?? 32;
    }
    
    // Nombre total d'utilisateurs
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users WHERE is_active = 1");
    $users = $stmt->fetch();
    
    return [
        'players_online' => $players_online,
        'max_players' => $max_players,
        'total_users' => $users['total'] ?? 0,
        'server_status' => $fivem_stats['server_online'] ? '24/7' : 'Hors ligne',
        'shop_items' => 5
    ];
}

