<?php
/**
 * Central6RP - Inscription d'un nouvel utilisateur
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

// Rate limiting : 3 tentatives d'inscription max toutes les 10 minutes
check_rate_limit('register', 3, 600);

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation des champs
$username = sanitize_input($data['username'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$password = $data['password'] ?? '';
$password_confirm = $data['password_confirm'] ?? '';

$errors = [];

// Validation du nom d'utilisateur
if (empty($username)) {
    $errors[] = 'Le nom d\'utilisateur est requis';
} elseif (strlen($username) < 3 || strlen($username) > 50) {
    $errors[] = 'Le nom d\'utilisateur doit contenir entre 3 et 50 caractères';
} elseif (!preg_match('/^[a-zA-Z0-9_-]+$/', $username)) {
    $errors[] = 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores';
}

// Validation de l'email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

// Validation du mot de passe
if (empty($password)) {
    $errors[] = 'Le mot de passe est requis';
} elseif (strlen($password) < PASSWORD_MIN_LENGTH) {
    $errors[] = 'Le mot de passe doit contenir au moins ' . PASSWORD_MIN_LENGTH . ' caractères';
} elseif ($password !== $password_confirm) {
    $errors[] = 'Les mots de passe ne correspondent pas';
}

// Si des erreurs existent
if (!empty($errors)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'errors' => $errors]));
}

try {
    // Vérifier si le nom d'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        http_response_code(400);
        die(json_encode(['success' => false, 'error' => 'Ce nom d\'utilisateur est déjà pris']));
    }
    
    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        die(json_encode(['success' => false, 'error' => 'Cet email est déjà utilisé']));
    }
    
    // Hasher le mot de passe
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    
    // Insérer l'utilisateur
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $password_hash]);
    
    $user_id = $pdo->lastInsertId();
    
    // Logger l'activité
    log_activity('user_registered', "Username: $username", $user_id);
    
    // Connecter automatiquement l'utilisateur
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;
    $_SESSION['role'] = 'user';
    
    // Retourner le succès
    echo json_encode([
        'success' => true,
        'message' => 'Compte créé avec succès !',
        'user' => [
            'id' => $user_id,
            'username' => $username,
            'email' => $email,
            'role' => 'user'
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur lors de la création du compte']);
}

