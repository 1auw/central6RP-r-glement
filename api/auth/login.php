<?php
/**
 * Central6RP - Connexion d'un utilisateur
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

// Rate limiting : 5 tentatives de connexion max toutes les 5 minutes
check_rate_limit('login', 5, 300);

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation des champs
$login = sanitize_input($data['login'] ?? ''); // Peut être username ou email
$password = $data['password'] ?? '';

if (empty($login) || empty($password)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Identifiant et mot de passe requis']));
}

try {
    // Chercher l'utilisateur par username ou email
    $stmt = $pdo->prepare("SELECT id, username, email, password, role, is_active FROM users WHERE (username = ? OR email = ?)");
    $stmt->execute([$login, $login]);
    $user = $stmt->fetch();
    
    // Vérifier si l'utilisateur existe
    if (!$user) {
        http_response_code(401);
        die(json_encode(['success' => false, 'error' => 'Identifiants incorrects']));
    }
    
    // Vérifier si le compte est actif
    if (!$user['is_active']) {
        http_response_code(403);
        die(json_encode(['success' => false, 'error' => 'Compte désactivé']));
    }
    
    // Vérifier le mot de passe
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        die(json_encode(['success' => false, 'error' => 'Identifiants incorrects']));
    }
    
    // Créer la session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['logged_in_at'] = time();
    
    // Créer un token de session dans la BDD
    $session_token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    $stmt = $pdo->prepare("INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$user['id'], $session_token, $ip_address, $user_agent, $expires_at]);
    
    // Mettre à jour la dernière connexion
    $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    // Logger l'activité
    log_activity('user_login', "User logged in", $user['id']);
    
    // Retourner les infos utilisateur
    echo json_encode([
        'success' => true,
        'message' => 'Connexion réussie !',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ],
        'session_token' => $session_token
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur lors de la connexion']);
}

