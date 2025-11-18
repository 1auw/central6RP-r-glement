<?php
/**
 * Central6RP - API Admin : Activer/Désactiver un utilisateur
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

// Récupérer les données
$data = json_decode(file_get_contents('php://input'), true);
$user_id = (int)($data['user_id'] ?? 0);
$is_active = (bool)($data['is_active'] ?? true);

if (empty($user_id)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'ID utilisateur manquant']));
}

// Ne pas désactiver son propre compte
if ($user_id === $current_user['id']) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Vous ne pouvez pas désactiver votre propre compte']));
}

try {
    // Mettre à jour le statut de l'utilisateur
    $stmt = $pdo->prepare("UPDATE users SET is_active = ? WHERE id = ?");
    $stmt->execute([$is_active ? 1 : 0, $user_id]);
    
    // Logger l'activité
    log_activity('user_status_changed', "User ID $user_id set to " . ($is_active ? 'active' : 'inactive'), $current_user['id']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Statut utilisateur mis à jour'
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}

?>

