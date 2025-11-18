<?php
/**
 * Central6RP - Récupérer les informations de l'utilisateur connecté
 */

require_once '../config.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

// Vérifier si l'utilisateur est connecté
if (!is_logged_in()) {
    http_response_code(401);
    die(json_encode(['success' => false, 'error' => 'Non connecté']));
}

try {
    $user = get_logged_user();
    
    if (!$user) {
        http_response_code(404);
        die(json_encode(['success' => false, 'error' => 'Utilisateur introuvable']));
    }
    
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}

