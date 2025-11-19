<?php
/**
 * Central6RP - Script de Test de Connexion à la Base de Données
 * 
 * Ce script permet de tester si la configuration de la base de données est correcte.
 * ⚠️ SUPPRIMEZ CE FICHIER après avoir testé la connexion pour des raisons de sécurité !
 */

// Charger la configuration
require_once 'config.php';

// Désactiver l'affichage des erreurs en production
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');

$results = [
    'success' => false,
    'tests' => [],
    'errors' => []
];

// Test 1 : Vérifier les constantes
$results['tests']['constants'] = [
    'DB_HOST' => defined('DB_HOST') ? DB_HOST : 'NON DÉFINI',
    'DB_NAME' => defined('DB_NAME') ? DB_NAME : 'NON DÉFINI',
    'DB_USER' => defined('DB_USER') ? DB_USER : 'NON DÉFINI',
    'DB_PASS' => defined('DB_PASS') ? (DB_PASS === 'VOTRE_MOT_DE_PASSE_MYSQL' ? '⚠️ NON CONFIGURÉ' : '✅ Configuré') : 'NON DÉFINI',
    'DB_CHARSET' => defined('DB_CHARSET') ? DB_CHARSET : 'NON DÉFINI'
];

// Test 2 : Vérifier si le mot de passe n'a pas été changé
if (defined('DB_PASS') && DB_PASS === 'VOTRE_MOT_DE_PASSE_MYSQL') {
    $results['errors'][] = '⚠️ Le mot de passe MySQL n\'a pas été configuré ! Remplacez "VOTRE_MOT_DE_PASSE_MYSQL" dans config.php';
}

// Test 3 : Tester la connexion PDO
try {
    $test_pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 5
        ]
    );
    
    $results['tests']['connection'] = '✅ Connexion réussie !';
    $results['success'] = true;
    
    // Test 4 : Vérifier les tables
    $tables_required = ['users', 'sessions', 'activity_logs', 'server_stats'];
    $tables_found = [];
    
    $stmt = $test_pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($tables_required as $table) {
        if (in_array($table, $tables)) {
            $tables_found[] = $table;
        }
    }
    
    $results['tests']['tables'] = [
        'required' => $tables_required,
        'found' => $tables_found,
        'missing' => array_diff($tables_required, $tables_found),
        'status' => count($tables_found) === count($tables_required) ? '✅ Toutes les tables sont présentes' : '⚠️ Certaines tables manquent'
    ];
    
    // Test 5 : Vérifier la version MySQL
    $stmt = $test_pdo->query("SELECT VERSION() as version");
    $version = $stmt->fetch();
    $results['tests']['mysql_version'] = $version['version'] ?? 'Inconnue';
    
} catch (PDOException $e) {
    $results['tests']['connection'] = '❌ Échec de la connexion';
    $results['errors'][] = $e->getMessage();
    
    // Messages d'aide selon le type d'erreur
    if (strpos($e->getMessage(), 'Access denied') !== false) {
        $results['errors'][] = '💡 Vérifiez DB_USER et DB_PASS dans config.php';
    } elseif (strpos($e->getMessage(), 'Unknown database') !== false) {
        $results['errors'][] = '💡 Vérifiez DB_NAME dans config.php et assurez-vous que la base de données existe';
    } elseif (strpos($e->getMessage(), 'Connection refused') !== false || strpos($e->getMessage(), 'getaddrinfo') !== false) {
        $results['errors'][] = '💡 Vérifiez DB_HOST dans config.php';
    }
}

// Afficher les résultats
echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

?>

