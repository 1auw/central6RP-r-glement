<?php
/**
 * Central6RP - API Admin : Gestion des paramètres
 */

require_once '../config.php';

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

$settings_file = __DIR__ . '/../settings.json';

// GET : Récupérer les paramètres
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Lire le fichier de paramètres
        if (file_exists($settings_file)) {
            $settings = json_decode(file_get_contents($settings_file), true);
        } else {
            // Paramètres par défaut
            $settings = [
                'server_name' => 'Central 6RP',
                'server_ip' => '127.0.0.1:30120',
                'max_players' => 32,
                'discord_link' => 'https://discord.gg/central6rp',
                'discord_webhook' => '',
                'fivem_connect' => 'fivem://connect/127.0.0.1:30120',
                'maintenance_mode' => false
            ];
        }
        
        echo json_encode([
            'success' => true,
            'settings' => $settings
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
    }
}

// POST : Enregistrer les paramètres
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Valider les données
        $settings = [
            'server_name' => sanitize_input($data['server_name'] ?? 'Central 6RP'),
            'server_ip' => sanitize_input($data['server_ip'] ?? '127.0.0.1:30120'),
            'max_players' => (int)($data['max_players'] ?? 32),
            'discord_link' => filter_var($data['discord_link'] ?? '', FILTER_SANITIZE_URL),
            'discord_webhook' => filter_var($data['discord_webhook'] ?? '', FILTER_SANITIZE_URL),
            'fivem_connect' => sanitize_input($data['fivem_connect'] ?? 'fivem://connect/127.0.0.1:30120'),
            'maintenance_mode' => (bool)($data['maintenance_mode'] ?? false)
        ];
        
        // Sauvegarder dans le fichier JSON
        file_put_contents($settings_file, json_encode($settings, JSON_PRETTY_PRINT));
        
        // Logger l'activité
        log_activity('settings_updated', 'Admin updated server settings', $current_user['id']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Paramètres enregistrés avec succès'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur lors de la sauvegarde']);
    }
}

else {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Méthode non autorisée']));
}

?>

