<?php
/**
 * Test direct sans config.php pour isoler le problème
 */

header('Content-Type: application/json; charset=utf-8');

// Test de connexion directe à la base de données
$host = 'sql213.infinityfree.com';
$dbname = 'if0_40451098_central6rp';
$username = 'if0_40451098';
$password = 'raGnjNeov1';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 5
        ]
    );
    
    echo json_encode([
        'success' => true,
        'message' => 'Connexion à la base de données réussie !',
        'database' => $dbname
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'code' => $e->getCode()
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>

