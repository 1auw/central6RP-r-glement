<?php
/**
 * Central6RP - Déconnexion d'un utilisateur
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

// Vérifier si l'utilisateur est connecté
if (!is_logged_in()) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'Non connecté']));
}

try {
    $user_id = $_SESSION['user_id'];
    
    // Supprimer les sessions de la BDD
    $stmt = $pdo->prepare("DELETE FROM sessions WHERE user_id = ?");
    $stmt->execute([$user_id]);
    
    // Logger l'activité
    log_activity('user_logout', "User logged out", $user_id);
    
    // Détruire la session
    session_unset();
    session_destroy();
    
    echo json_encode([
        'success' => true,
        'message' => 'Déconnexion réussie'
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur lors de la déconnexion']);
}

