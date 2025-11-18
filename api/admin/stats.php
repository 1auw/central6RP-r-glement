<?php
/**
 * Central6RP - API Admin : Récupérer les statistiques
 */

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

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
    // Total utilisateurs
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users");
    $total_users = $stmt->fetch()['total'];
    
    // Utilisateurs actifs
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users WHERE is_active = 1");
    $active_users = $stmt->fetch()['total'];
    
    // Admins
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users WHERE role = 'admin'");
    $admins = $stmt->fetch()['total'];
    
    // Total logs
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM activity_logs");
    $total_logs = $stmt->fetch()['total'];
    
    // Connexions aujourd'hui
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM activity_logs WHERE action = 'user_login' AND DATE(created_at) = CURDATE()");
    $logins_today = $stmt->fetch()['total'];
    
    // Inscriptions aujourd'hui
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM activity_logs WHERE action = 'user_registered' AND DATE(created_at) = CURDATE()");
    $registrations_today = $stmt->fetch()['total'];
    
    echo json_encode([
        'success' => true,
        'stats' => [
            'total_users' => (int)$total_users,
            'active_users' => (int)$active_users,
            'admins' => (int)$admins,
            'total_logs' => (int)$total_logs,
            'logins_today' => (int)$logins_today,
            'registrations_today' => (int)$registrations_today
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}

?>

