<?php
/**
 * Fichier de test simple pour vérifier que PHP fonctionne
 * Si ce fichier s'affiche, PHP fonctionne correctement
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test PHP - InfinityFree</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
        }
        .success {
            background: #2d5a27;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .info {
            background: #2a4a7c;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
        }
        h1 { color: #4CAF50; }
        h2 { color: #2196F3; }
    </style>
</head>
<body>
    <h1>✅ PHP Fonctionne !</h1>
    
    <div class="success">
        <h2>Informations PHP</h2>
        <p><strong>Version PHP :</strong> <?php echo phpversion(); ?></p>
        <p><strong>Serveur :</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Inconnu'; ?></p>
        <p><strong>Document Root :</strong> <?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Inconnu'; ?></p>
        <p><strong>Script Path :</strong> <?php echo __FILE__; ?></p>
    </div>
    
    <div class="info">
        <h2>Prochaines Étapes</h2>
        <p>Si vous voyez ce message, PHP fonctionne correctement.</p>
        <p>Vous pouvez maintenant tester :</p>
        <ul>
            <li><a href="test_connection.php" style="color: #4CAF50;">test_connection.php</a> - Test de connexion à la base de données</li>
            <li><a href="stats.php" style="color: #4CAF50;">stats.php</a> - Test des statistiques</li>
        </ul>
    </div>
    
    <div class="info">
        <h2>Vérification des Fichiers</h2>
        <p><strong>config.php existe :</strong> 
            <?php 
            if (file_exists(__DIR__ . '/config.php')) {
                echo '✅ Oui';
            } else {
                echo '❌ Non - Le fichier config.php est manquant !';
            }
            ?>
        </p>
        <p><strong>Chemin du dossier api :</strong> <?php echo __DIR__; ?></p>
    </div>
</body>
</html>

