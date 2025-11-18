<?php
/**
 * Central6RP - API Admin : Récupérer la liste des utilisateurs
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

// Vérifier si l'utilisateur est connecté et est admin
if (!is_logged_in()) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'Non connecté']));
}

$current_user = get_logged_user();
if (!$current_user || $current_user['role'] !== 'admin') {
    http_response_code(403);
    die(json_encode(['success' => false, 'error' => 'Accès refusé']));
}

try {
    // Récupérer tous les utilisateurs
    $stmt = $pdo->query("
        SELECT id, username, email, role, is_active, created_at, last_login 
        FROM users 
        ORDER BY created_at DESC
    ");
    $users = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'users' => $users
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}

?>

