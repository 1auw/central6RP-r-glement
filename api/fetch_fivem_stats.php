<?php
/**
 * Central6RP - Récupérer les stats en temps réel depuis le serveur FiveM
 * 
 * Ce script doit être appelé régulièrement (cron job toutes les minutes)
 * ou peut être intégré dans get_server_stats() pour un refresh automatique
 */

require_once 'config.php';

// Charger la configuration FiveM
$fivem_config_file = __DIR__ . '/fivem_config.php';
if (file_exists($fivem_config_file)) {
    require_once $fivem_config_file;
    $fivem_ip = defined('FIVEM_IP') ? FIVEM_IP : '127.0.0.1';
    $fivem_port = defined('FIVEM_PORT') ? FIVEM_PORT : '30120';
} else {
    // Valeurs par défaut
    $fivem_ip = '127.0.0.1';
    $fivem_port = '30120';
}

// URL de l'API FiveM
$info_url = "http://{$fivem_ip}:{$fivem_port}/info.json";
$players_url = "http://{$fivem_ip}:{$fivem_port}/players.json";

function fetch_fivem_data($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200 && $response !== false) {
        return json_decode($response, true);
    }
    
    return null;
}

try {
    // Récupérer les infos du serveur
    $server_info = fetch_fivem_data($info_url);
    
    // Récupérer la liste des joueurs
    $players_data = fetch_fivem_data($players_url);
    
    // Calculer le nombre de joueurs en ligne
    $players_online = 0;
    if ($players_data && isset($players_data)) {
        $players_online = is_array($players_data) ? count($players_data) : 0;
    }
    
    // Récupérer le max_players depuis les infos du serveur
    $max_players = 32; // Valeur par défaut
    if ($server_info && isset($server_info['vars']['sv_maxclients'])) {
        $max_players = (int)$server_info['vars']['sv_maxclients'];
    } elseif ($server_info && isset($server_info['maxClients'])) {
        $max_players = (int)$server_info['maxClients'];
    }
    
    // Mettre à jour la table server_stats
    global $pdo;
    
    // Vérifier si une entrée existe
    $stmt = $pdo->query("SELECT id FROM server_stats LIMIT 1");
    $exists = $stmt->fetch();
    
    if ($exists) {
        // Mettre à jour
        $stmt = $pdo->prepare("UPDATE server_stats SET players_online = ?, max_players = ?, last_updated = NOW() WHERE id = ?");
        $stmt->execute([$players_online, $max_players, $exists['id']]);
    } else {
        // Créer une nouvelle entrée
        $stmt = $pdo->prepare("INSERT INTO server_stats (players_online, max_players, last_updated) VALUES (?, ?, NOW())");
        $stmt->execute([$players_online, $max_players]);
    }
    
    // Retourner les stats
    echo json_encode([
        'success' => true,
        'message' => 'Stats mises à jour',
        'stats' => [
            'players_online' => $players_online,
            'max_players' => $max_players,
            'server_online' => $server_info !== null
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors de la mise à jour des stats'
    ]);
}

?>

