<?php
/**
 * Central6RP - Installation Wizard
 * Version: 2.0
 * 
 * Ce script vérifie et installe tous les composants nécessaires au site
 */

session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Vérifier si déjà installé
if (file_exists('includes/config.php') && !isset($_GET['force'])) {
    $config = @file_get_contents('includes/config.php');
    if ($config && strpos($config, 'INSTALL_COMPLETE') !== false) {
        header('Location: index.php');
        exit;
    }
}

$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;
$errors = [];
$success = [];
$warnings = [];

/**
 * Fonction pour créer un dossier s'il n'existe pas
 */
function createDirectory($path, $permissions = 0755) {
    if (!file_exists($path)) {
        if (mkdir($path, $permissions, true)) {
            return ['success' => true, 'message' => "Dossier créé : $path"];
        } else {
            return ['success' => false, 'message' => "Impossible de créer : $path"];
        }
    }
    return ['success' => true, 'message' => "Dossier existe : $path"];
}

/**
 * Fonction pour créer un fichier avec contenu
 */
function createFile($path, $content) {
    $dir = dirname($path);
    if (!file_exists($dir)) {
        mkdir($dir, 0755, true);
    }
    
    if (file_put_contents($path, $content) !== false) {
        return ['success' => true, 'message' => "Fichier créé : $path"];
    } else {
        return ['success' => false, 'message' => "Impossible de créer : $path"];
    }
}

/**
 * Vérifier la structure des dossiers
 */
function checkAndCreateStructure() {
    global $success, $errors, $warnings;
    
    $directories = [
        'includes',
        'pages',
        'assets',
        'assets/css',
        'assets/js',
        'assets/img',
        'uploads',
        'sql',
        'fivem-script'
    ];
    
    foreach ($directories as $dir) {
        $result = createDirectory($dir);
        if ($result['success']) {
            $success[] = $result['message'];
        } else {
            $errors[] = $result['message'];
        }
    }
    
    // Créer .htaccess si n'existe pas
    if (!file_exists('.htaccess')) {
        $htaccess = <<<'HTACCESS'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Empêcher l'accès aux fichiers sensibles
    <FilesMatch "\.(ini|log|sql)$">
        Order allow,deny
        Deny from all
    </FilesMatch>
    
    # Protection des dossiers includes et sql
    RewriteRule ^(includes|sql)/ - [F,L]
</IfModule>

# Désactiver l'affichage des erreurs PHP
php_flag display_errors Off

# Augmenter les limites
php_value upload_max_filesize 50M
php_value post_max_size 50M
php_value max_execution_time 300
php_value max_input_time 300
HTACCESS;
        
        $result = createFile('.htaccess', $htaccess);
        if ($result['success']) {
            $success[] = $result['message'];
        } else {
            $warnings[] = $result['message'];
        }
    }
    
    // Créer .gitkeep dans uploads
    if (!file_exists('uploads/.gitkeep')) {
        file_put_contents('uploads/.gitkeep', '');
        $success[] = "Fichier créé : uploads/.gitkeep";
    }
    
    return count($errors) === 0;
}

/**
 * Vérifier et créer les fichiers PHP nécessaires
 */
function checkAndCreatePHPFiles() {
    global $success, $errors, $warnings;
    
    $requiredPages = [
        'pages/404.php',
        'pages/contact.php',
        'pages/login.php',
        'pages/logout.php',
        'pages/profile.php',
        'pages/register.php',
        'pages/rules.php',
        'pages/shop.php',
        'pages/admin.php',
        'pages/checkout.php'
    ];
    
    foreach ($requiredPages as $page) {
        if (!file_exists($page)) {
            $warnings[] = "Fichier manquant : $page (sera créé avec un template)";
            createDefaultPage($page);
        } else {
            $success[] = "Fichier existe : $page";
        }
    }
    
    // Vérifier includes/functions.php
    if (!file_exists('includes/functions.php')) {
        $warnings[] = "Fichier manquant : includes/functions.php (sera créé)";
        createFunctionsFile();
    } else {
        $success[] = "Fichier existe : includes/functions.php";
    }
    
    // Vérifier includes/db.php
    if (!file_exists('includes/db.php')) {
        $warnings[] = "Fichier manquant : includes/db.php (sera créé)";
        createDbFile();
    } else {
        $success[] = "Fichier existe : includes/db.php";
    }
    
    return true;
}

/**
 * Créer une page par défaut
 */
function createDefaultPage($path) {
    $filename = basename($path, '.php');
    $title = ucfirst(str_replace('-', ' ', $filename));
    
    $content = <<<PHP
<?php
\$pageTitle = '$title';
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

include __DIR__ . '/../includes/header.php';
?>

<section class="section">
    <div class="container">
        <h1 class="text-center text-gradient" style="font-size: 3rem; margin-bottom: 2rem;">
            $title
        </h1>
        
        <div class="card">
            <div class="card-body">
                <p>Cette page est en cours de développement.</p>
            </div>
        </div>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
PHP;
    
    createFile($path, $content);
}

/**
 * Créer le fichier functions.php
 */
function createFunctionsFile() {
    $content = <<<'PHP'
<?php
/**
 * Central6RP - Fonctions utilitaires
 */

// Flash messages
function setFlashMessage($message, $type = 'success') {
    $_SESSION['flash_message'] = [
        'message' => $message,
        'type' => $type
    ];
}

function getFlashMessage() {
    if (isset($_SESSION['flash_message'])) {
        $flash = $_SESSION['flash_message'];
        unset($_SESSION['flash_message']);
        return $flash;
    }
    return null;
}

// Authentification
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: /pages/login.php');
        exit;
    }
}

function requireAdmin() {
    requireLogin();
    if (!isAdmin()) {
        header('Location: /index.php');
        exit;
    }
}

// Settings
function getSetting($key, $default = '') {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT value FROM settings WHERE key_name = ?");
        $stmt->execute([$key]);
        $result = $stmt->fetch();
        return $result ? $result['value'] : $default;
    } catch (PDOException $e) {
        return $default;
    }
}

function getModuleSetting($key) {
    return getSetting($key, '0') === '1';
}

// Joueurs en ligne (FiveM)
function getOnlinePlayers() {
    $serverIp = getSetting('fivem_server_ip', '');
    $serverPort = getSetting('fivem_server_port', '30120');
    
    if (empty($serverIp)) {
        return 0;
    }
    
    try {
        $url = "http://{$serverIp}:{$serverPort}/players.json";
        $context = stream_context_create(['http' => ['timeout' => 2]]);
        $players = @file_get_contents($url, false, $context);
        
        if ($players !== false) {
            $data = json_decode($players, true);
            return is_array($data) ? count($data) : 0;
        }
    } catch (Exception $e) {
        // Silently fail
    }
    
    return 0;
}

// Sécurité
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}
PHP;
    
    createFile('includes/functions.php', $content);
}

/**
 * Créer le fichier db.php
 */
function createDbFile() {
    $content = <<<'PHP'
<?php
/**
 * Central6RP - Connexion Base de Données
 */

if (!defined('DB_HOST')) {
    die('Configuration non chargée');
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
PHP;
    
    createFile('includes/db.php', $content);
}

// Traitement des étapes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($step) {
        case 1: // Vérification des fichiers
            if (checkAndCreateStructure() && checkAndCreatePHPFiles()) {
                header('Location: install.php?step=2');
                exit;
            }
            break;
            
        case 2: // Configuration BDD
            $db_host = trim($_POST['db_host'] ?? 'localhost');
            $db_name = trim($_POST['db_name'] ?? '');
            $db_user = trim($_POST['db_user'] ?? '');
            $db_pass = $_POST['db_pass'] ?? '';
            
            if (empty($db_name) || empty($db_user)) {
                $errors[] = "Le nom de la base de données et l'utilisateur sont requis";
            } else {
                try {
                    $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass);
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    // Créer la BDD
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    $pdo->exec("USE `$db_name`");
                    
                    // Exécuter le SQL
                    if (file_exists('sql/init.sql')) {
                        $sql = file_get_contents('sql/init.sql');
                        $statements = array_filter(array_map('trim', explode(';', $sql)));
                        foreach ($statements as $statement) {
                            if (!empty($statement)) {
                                $pdo->exec($statement);
                            }
                        }
                    }
                    
                    $_SESSION['install'] = [
                        'db_host' => $db_host,
                        'db_name' => $db_name,
                        'db_user' => $db_user,
                        'db_pass' => $db_pass
                    ];
                    
                    $success[] = "Base de données créée et initialisée avec succès";
                    header('Location: install.php?step=3');
                    exit;
                } catch (PDOException $e) {
                    $errors[] = "Erreur de base de données : " . $e->getMessage();
                }
            }
            break;
            
        case 3: // Compte Admin + Site
            $admin_username = trim($_POST['admin_username'] ?? '');
            $admin_email = trim($_POST['admin_email'] ?? '');
            $admin_password = $_POST['admin_password'] ?? '';
            $admin_password_confirm = $_POST['admin_password_confirm'] ?? '';
            $site_name = trim($_POST['site_name'] ?? 'Central6RP');
            $site_url = trim($_POST['site_url'] ?? '');
            
            if (empty($admin_username) || empty($admin_email) || empty($admin_password)) {
                $errors[] = "Tous les champs administrateur sont requis";
            } elseif (!filter_var($admin_email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Email invalide";
            } elseif (strlen($admin_password) < 8) {
                $errors[] = "Le mot de passe doit contenir au moins 8 caractères";
            } elseif ($admin_password !== $admin_password_confirm) {
                $errors[] = "Les mots de passe ne correspondent pas";
            } elseif (empty($site_url)) {
                $errors[] = "L'URL du site est requise";
            } else {
                try {
                    $install = $_SESSION['install'];
                    $pdo = new PDO(
                        "mysql:host={$install['db_host']};dbname={$install['db_name']};charset=utf8mb4",
                        $install['db_user'],
                        $install['db_pass']
                    );
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    // Créer l'admin
                    $hashed = password_hash($admin_password, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, 'admin', NOW())");
                    $stmt->execute([$admin_username, $admin_email, $hashed]);
                    
                    // Mettre à jour les settings
                    $stmt = $pdo->prepare("UPDATE settings SET value = ? WHERE key_name = 'site_name'");
                    $stmt->execute([$site_name]);
                    
                    $stmt = $pdo->prepare("UPDATE settings SET value = ? WHERE key_name = 'site_url'");
                    $stmt->execute([$site_url]);
                    
                    $_SESSION['install']['admin_username'] = $admin_username;
                    $_SESSION['install']['admin_email'] = $admin_email;
                    $_SESSION['install']['site_name'] = $site_name;
                    $_SESSION['install']['site_url'] = $site_url;
                    
                    $success[] = "Compte administrateur créé avec succès";
                    header('Location: install.php?step=4');
                    exit;
                } catch (PDOException $e) {
                    $errors[] = "Erreur : " . $e->getMessage();
                }
            }
            break;
            
        case 4: // Modules
            $modules = [
                'module_shop' => isset($_POST['module_shop']) ? '1' : '0',
                'module_forum' => isset($_POST['module_forum']) ? '1' : '0',
                'module_gallery' => isset($_POST['module_gallery']) ? '1' : '0',
                'module_support' => isset($_POST['module_support']) ? '1' : '0',
                'module_livechat' => isset($_POST['module_livechat']) ? '1' : '0',
                'module_votes' => isset($_POST['module_votes']) ? '1' : '0',
            ];
            
            try {
                $install = $_SESSION['install'];
                $pdo = new PDO(
                    "mysql:host={$install['db_host']};dbname={$install['db_name']};charset=utf8mb4",
                    $install['db_user'],
                    $install['db_pass']
                );
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                foreach ($modules as $key => $value) {
                    $stmt = $pdo->prepare("UPDATE settings SET value = ? WHERE key_name = ?");
                    $stmt->execute([$value, $key]);
                }
                
                $_SESSION['install']['modules'] = $modules;
                $success[] = "Modules configurés avec succès";
                header('Location: install.php?step=5');
                exit;
            } catch (PDOException $e) {
                $errors[] = "Erreur : " . $e->getMessage();
            }
            break;
            
        case 5: // API & Intégrations
            $config_data = [
                'fivem_server_ip' => trim($_POST['fivem_server_ip'] ?? ''),
                'fivem_server_port' => trim($_POST['fivem_server_port'] ?? '30120'),
                'discord_widget_id' => trim($_POST['discord_widget_id'] ?? ''),
                'stripe_public_key' => trim($_POST['stripe_public_key'] ?? ''),
                'stripe_secret_key' => trim($_POST['stripe_secret_key'] ?? ''),
                'paypal_client_id' => trim($_POST['paypal_client_id'] ?? ''),
                'paypal_secret' => trim($_POST['paypal_secret'] ?? ''),
                'tawk_widget_id' => trim($_POST['tawk_widget_id'] ?? ''),
            ];
            
            try {
                $install = $_SESSION['install'];
                $pdo = new PDO(
                    "mysql:host={$install['db_host']};dbname={$install['db_name']};charset=utf8mb4",
                    $install['db_user'],
                    $install['db_pass']
                );
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                foreach ($config_data as $key => $value) {
                    $stmt = $pdo->prepare("UPDATE settings SET value = ? WHERE key_name = ?");
                    $stmt->execute([$value, $key]);
                }
                
                $_SESSION['install'] = array_merge($_SESSION['install'], $config_data);
                $success[] = "Intégrations configurées avec succès";
                header('Location: install.php?step=6');
                exit;
            } catch (PDOException $e) {
                $errors[] = "Erreur : " . $e->getMessage();
            }
            break;
            
        case 6: // Finalisation
            $install = $_SESSION['install'];
            $api_key = bin2hex(random_bytes(32));
            
            // Créer config.php
            $config_content = "<?php\n";
            $config_content .= "/**\n";
            $config_content .= " * Central6RP - Configuration\n";
            $config_content .= " * Généré automatiquement le " . date('Y-m-d H:i:s') . "\n";
            $config_content .= " */\n\n";
            $config_content .= "define('INSTALL_COMPLETE', true);\n";
            $config_content .= "define('DB_HOST', '{$install['db_host']}');\n";
            $config_content .= "define('DB_NAME', '{$install['db_name']}');\n";
            $config_content .= "define('DB_USER', '{$install['db_user']}');\n";
            $config_content .= "define('DB_PASS', '{$install['db_pass']}');\n";
            $config_content .= "define('SITE_NAME', '{$install['site_name']}');\n";
            $config_content .= "define('SITE_URL', '{$install['site_url']}');\n";
            $config_content .= "define('API_KEY', '$api_key');\n\n";
            $config_content .= "// Démarrer la session si ce n'est pas déjà fait\n";
            $config_content .= "if (session_status() === PHP_SESSION_NONE) {\n";
            $config_content .= "    session_start();\n";
            $config_content .= "}\n";
            
            if (file_put_contents('includes/config.php', $config_content)) {
                $success[] = "Fichier de configuration créé";
                
                // Nettoyer la session
                unset($_SESSION['install']);
                
                header('Location: install.php?step=7');
                exit;
            } else {
                $errors[] = "Impossible de créer le fichier de configuration";
            }
            break;
    }
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation - Central6RP</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #FF0000;
            --primary-dark: #CC0000;
            --secondary: #00D9FF;
            --dark-bg: #0B0E1F;
            --dark-surface: #141827;
            --dark-card: #1A1F35;
            --text-primary: #FFFFFF;
            --text-secondary: #B8C5D6;
            --text-muted: #7A8BA0;
            --success: #51CF66;
            --warning: #FFB800;
            --error: #FF6B6B;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--dark-bg);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .container {
            max-width: 800px;
            width: 100%;
        }
        
        .install-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .install-header h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
        }
        
        .logo-highlight {
            color: var(--primary);
        }
        
        .install-header p {
            color: var(--text-secondary);
            font-size: 1.1rem;
        }
        
        .progress-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            position: relative;
        }
        
        .progress-bar::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 0;
        }
        
        .progress-step {
            flex: 1;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .progress-step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--dark-card);
            border: 2px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            font-weight: 700;
            transition: all 0.3s;
        }
        
        .progress-step.active .progress-step-circle {
            background: var(--primary);
            border-color: var(--primary);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }
        
        .progress-step.completed .progress-step-circle {
            background: var(--success);
            border-color: var(--success);
        }
        
        .progress-step-label {
            font-size: 0.85rem;
            color: var(--text-muted);
        }
        
        .progress-step.active .progress-step-label {
            color: var(--primary);
            font-weight: 600;
        }
        
        .card {
            background: var(--dark-card);
            border-radius: 15px;
            padding: 2.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        
        .card h2 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .card p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.875rem 1rem;
            background: var(--dark-surface);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
        }
        
        .form-group small {
            display: block;
            margin-top: 0.25rem;
            color: var(--text-muted);
            font-size: 0.875rem;
        }
        
        .checkbox-group {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: var(--dark-surface);
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
        }
        
        .checkbox-group:hover {
            border-color: var(--primary);
        }
        
        .checkbox-group input[type="checkbox"] {
            width: auto;
            margin-right: 1rem;
            cursor: pointer;
        }
        
        .checkbox-group label {
            margin: 0;
            cursor: pointer;
            flex: 1;
        }
        
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            text-align: center;
            text-decoration: none;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: var(--text-primary);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
        }
        
        .btn-success {
            background: var(--success);
            color: var(--text-primary);
        }
        
        .btn-block {
            width: 100%;
        }
        
        .alert {
            padding: 1rem 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            border-left: 4px solid;
        }
        
        .alert-success {
            background: rgba(81, 207, 102, 0.1);
            border-color: var(--success);
            color: var(--success);
        }
        
        .alert-error {
            background: rgba(255, 107, 107, 0.1);
            border-color: var(--error);
            color: var(--error);
        }
        
        .alert-warning {
            background: rgba(255, 184, 0, 0.1);
            border-color: var(--warning);
            color: var(--warning);
        }
        
        .alert ul {
            margin: 0.5rem 0 0 1.5rem;
        }
        
        .file-list {
            background: var(--dark-surface);
            border-radius: 10px;
            padding: 1.5rem;
            margin: 1.5rem 0;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .file-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .file-item:last-child {
            border-bottom: none;
        }
        
        .file-item-icon {
            width: 30px;
            height: 30px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-weight: 700;
        }
        
        .file-item-icon.success {
            background: rgba(81, 207, 102, 0.2);
            color: var(--success);
        }
        
        .file-item-icon.warning {
            background: rgba(255, 184, 0, 0.2);
            color: var(--warning);
        }
        
        .file-item-icon.error {
            background: rgba(255, 107, 107, 0.2);
            color: var(--error);
        }
        
        .file-item-text {
            flex: 1;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .info-card {
            background: var(--dark-surface);
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .info-card h4 {
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-card p {
            margin: 0;
            color: var(--text-primary);
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .footer-text {
            text-align: center;
            margin-top: 2rem;
            color: var(--text-muted);
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            
            .card {
                padding: 1.5rem;
            }
            
            .progress-bar {
                flex-wrap: wrap;
            }
            
            .progress-step {
                flex-basis: 33.333%;
                margin-bottom: 1rem;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="install-header">
            <h1>Central<span class="logo-highlight">6</span>RP</h1>
            <p>Assistant d'Installation</p>
        </div>
        
        <div class="progress-bar">
            <div class="progress-step <?php echo $step >= 1 ? 'active' : ''; ?> <?php echo $step > 1 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">1</div>
                <div class="progress-step-label">Vérification</div>
            </div>
            <div class="progress-step <?php echo $step >= 2 ? 'active' : ''; ?> <?php echo $step > 2 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">2</div>
                <div class="progress-step-label">Base de données</div>
            </div>
            <div class="progress-step <?php echo $step >= 3 ? 'active' : ''; ?> <?php echo $step > 3 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">3</div>
                <div class="progress-step-label">Administrateur</div>
            </div>
            <div class="progress-step <?php echo $step >= 4 ? 'active' : ''; ?> <?php echo $step > 4 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">4</div>
                <div class="progress-step-label">Modules</div>
            </div>
            <div class="progress-step <?php echo $step >= 5 ? 'active' : ''; ?> <?php echo $step > 5 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">5</div>
                <div class="progress-step-label">Intégrations</div>
            </div>
            <div class="progress-step <?php echo $step >= 6 ? 'active' : ''; ?> <?php echo $step > 6 ? 'completed' : ''; ?>">
                <div class="progress-step-circle">6</div>
                <div class="progress-step-label">Finalisation</div>
            </div>
            <div class="progress-step <?php echo $step >= 7 ? 'active' : ''; ?>">
                <div class="progress-step-circle">✓</div>
                <div class="progress-step-label">Terminé</div>
            </div>
        </div>
        
        <?php if (!empty($errors)): ?>
            <div class="alert alert-error">
                <strong>❌ Erreurs :</strong>
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($warnings)): ?>
            <div class="alert alert-warning">
                <strong>⚠️ Avertissements :</strong>
                <ul>
                    <?php foreach ($warnings as $warning): ?>
                        <li><?php echo htmlspecialchars($warning); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($success) && $step === 1): ?>
            <div class="alert alert-success">
                <strong>✅ Succès :</strong>
                <div class="file-list">
                    <?php foreach ($success as $msg): ?>
                        <div class="file-item">
                            <div class="file-item-icon success">✓</div>
                            <div class="file-item-text"><?php echo htmlspecialchars($msg); ?></div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
        
        <div class="card">
            <?php if ($step === 1): ?>
                <h2>📋 Vérification des Fichiers</h2>
                <p>Vérification et création de la structure des fichiers nécessaires</p>
                
                <form method="POST">
                    <?php
                    // Lancer la vérification
                    checkAndCreateStructure();
                    checkAndCreatePHPFiles();
                    ?>
                    
                    <?php if (!empty($warnings)): ?>
                        <div class="alert alert-warning" style="margin-top: 1rem;">
                            <strong>⚠️ Note :</strong> Certains fichiers ont été recréés avec des templates par défaut. Vous pourrez les personnaliser après l'installation.
                        </div>
                    <?php endif; ?>
                    
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 2rem;">
                        Continuer →
                    </button>
                </form>
                
            <?php elseif ($step === 2): ?>
                <h2>🗄️ Configuration de la Base de Données</h2>
                <p>Configurez la connexion à votre base de données MySQL</p>
                
                <form method="POST">
                    <div class="form-group">
                        <label for="db_host">Hôte de la Base de Données</label>
                        <input type="text" id="db_host" name="db_host" value="localhost" required>
                        <small>Généralement "localhost" pour un serveur local</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="db_name">Nom de la Base de Données</label>
                        <input type="text" id="db_name" name="db_name" placeholder="central6rp" required>
                        <small>Sera créée si elle n'existe pas</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="db_user">Utilisateur</label>
                        <input type="text" id="db_user" name="db_user" placeholder="root" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="db_pass">Mot de Passe</label>
                        <input type="password" id="db_pass" name="db_pass" placeholder="••••••••">
                        <small>Peut être vide pour un serveur de développement local</small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Créer la Base de Données →
                    </button>
                </form>
                
            <?php elseif ($step === 3): ?>
                <h2>👤 Compte Administrateur</h2>
                <p>Créez votre compte administrateur et configurez le site</p>
                
                <form method="POST">
                    <div class="form-group">
                        <label for="admin_username">Nom d'utilisateur</label>
                        <input type="text" id="admin_username" name="admin_username" placeholder="admin" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="admin_email">Email</label>
                        <input type="email" id="admin_email" name="admin_email" placeholder="admin@central6rp.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="admin_password">Mot de Passe</label>
                        <input type="password" id="admin_password" name="admin_password" placeholder="••••••••" required>
                        <small>Minimum 8 caractères</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="admin_password_confirm">Confirmer le Mot de Passe</label>
                        <input type="password" id="admin_password_confirm" name="admin_password_confirm" placeholder="••••••••" required>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 2rem 0;">
                    
                    <div class="form-group">
                        <label for="site_name">Nom du Site</label>
                        <input type="text" id="site_name" name="site_name" value="Central6RP" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="site_url">URL du Site</label>
                        <input type="url" id="site_url" name="site_url" placeholder="https://central6rp.com" required>
                        <small>URL complète de votre site (sans / à la fin)</small>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Créer le Compte →
                    </button>
                </form>
                
            <?php elseif ($step === 4): ?>
                <h2>🧩 Modules du Site</h2>
                <p>Sélectionnez les modules que vous souhaitez activer</p>
                
                <form method="POST">
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_shop" name="module_shop" value="1">
                        <label for="module_shop">
                            <strong>🛒 Boutique</strong><br>
                            <small>Système de boutique avec paiements</small>
                        </label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_forum" name="module_forum" value="1">
                        <label for="module_forum">
                            <strong>💬 Forum</strong><br>
                            <small>Forum de discussion communautaire</small>
                        </label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_gallery" name="module_gallery" value="1">
                        <label for="module_gallery">
                            <strong>📸 Galerie</strong><br>
                            <small>Galerie photos et vidéos</small>
                        </label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_support" name="module_support" value="1">
                        <label for="module_support">
                            <strong>🎫 Support</strong><br>
                            <small>Système de tickets de support</small>
                        </label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_livechat" name="module_livechat" value="1">
                        <label for="module_livechat">
                            <strong>💭 Chat en Direct</strong><br>
                            <small>Widget de chat en temps réel</small>
                        </label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="module_votes" name="module_votes" value="1">
                        <label for="module_votes">
                            <strong>⭐ Votes</strong><br>
                            <small>Système de votes avec récompenses</small>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 1rem;">
                        Continuer →
                    </button>
                </form>
                
            <?php elseif ($step === 5): ?>
                <h2>🔌 API & Intégrations</h2>
                <p>Configurez les intégrations avec les services externes (optionnel)</p>
                
                <form method="POST">
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">FiveM</h3>
                    
                    <div class="form-group">
                        <label for="fivem_server_ip">IP du Serveur FiveM</label>
                        <input type="text" id="fivem_server_ip" name="fivem_server_ip" placeholder="127.0.0.1">
                    </div>
                    
                    <div class="form-group">
                        <label for="fivem_server_port">Port</label>
                        <input type="text" id="fivem_server_port" name="fivem_server_port" value="30120">
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 2rem 0;">
                    
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Discord</h3>
                    
                    <div class="form-group">
                        <label for="discord_widget_id">Widget ID Discord</label>
                        <input type="text" id="discord_widget_id" name="discord_widget_id" placeholder="123456789">
                        <small>Pour afficher le widget Discord sur le site</small>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 2rem 0;">
                    
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Paiements (si boutique activée)</h3>
                    
                    <div class="form-group">
                        <label for="stripe_public_key">Stripe - Clé Publique</label>
                        <input type="text" id="stripe_public_key" name="stripe_public_key" placeholder="pk_test_...">
                    </div>
                    
                    <div class="form-group">
                        <label for="stripe_secret_key">Stripe - Clé Secrète</label>
                        <input type="password" id="stripe_secret_key" name="stripe_secret_key" placeholder="sk_test_...">
                    </div>
                    
                    <div class="form-group">
                        <label for="paypal_client_id">PayPal - Client ID</label>
                        <input type="text" id="paypal_client_id" name="paypal_client_id" placeholder="AY...">
                    </div>
                    
                    <div class="form-group">
                        <label for="paypal_secret">PayPal - Secret</label>
                        <input type="password" id="paypal_secret" name="paypal_secret" placeholder="EL...">
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 2rem 0;">
                    
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Tawk.to (Chat)</h3>
                    
                    <div class="form-group">
                        <label for="tawk_widget_id">Tawk.to Widget ID</label>
                        <input type="text" id="tawk_widget_id" name="tawk_widget_id" placeholder="123abc...">
                    </div>
                    
                    <div class="alert alert-warning">
                        <strong>💡 Astuce :</strong> Vous pouvez laisser ces champs vides et les configurer plus tard dans le panneau d'administration.
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        Continuer →
                    </button>
                </form>
                
            <?php elseif ($step === 6): ?>
                <h2>✨ Finalisation</h2>
                <p>Génération du fichier de configuration</p>
                
                <form method="POST">
                    <div class="alert alert-success">
                        <strong>✅ Prêt à finaliser</strong><br>
                        Le fichier de configuration va être créé avec les informations suivantes :
                    </div>
                    
                    <?php $install = $_SESSION['install'] ?? []; ?>
                    
                    <div class="info-grid">
                        <div class="info-card">
                            <h4>Base de Données</h4>
                            <p><?php echo htmlspecialchars($install['db_name'] ?? 'N/A'); ?></p>
                        </div>
                        
                        <div class="info-card">
                            <h4>Administrateur</h4>
                            <p><?php echo htmlspecialchars($install['admin_username'] ?? 'N/A'); ?></p>
                        </div>
                        
                        <div class="info-card">
                            <h4>Nom du Site</h4>
                            <p><?php echo htmlspecialchars($install['site_name'] ?? 'N/A'); ?></p>
                        </div>
                        
                        <div class="info-card">
                            <h4>URL</h4>
                            <p style="font-size: 0.9rem; word-break: break-all;"><?php echo htmlspecialchars($install['site_url'] ?? 'N/A'); ?></p>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 2rem;">
                        Finaliser l'Installation ✓
                    </button>
                </form>
                
            <?php elseif ($step === 7): ?>
                <h2 style="color: var(--success);">🎉 Installation Terminée !</h2>
                <p>Votre site Central6RP est maintenant prêt à être utilisé</p>
                
                <div class="alert alert-success">
                    <strong>✅ Succès !</strong> L'installation s'est terminée avec succès.
                </div>
                
                <div class="info-grid" style="margin-top: 2rem;">
                    <div class="info-card">
                        <h4>Prochaines Étapes</h4>
                        <p style="font-size: 0.9rem; font-weight: normal;">
                            1. Connectez-vous au panneau d'administration<br>
                            2. Personnalisez votre site<br>
                            3. Configurez vos réseaux sociaux dans le footer
                        </p>
                    </div>
                    
                    <div class="info-card">
                        <h4>Sécurité</h4>
                        <p style="font-size: 0.9rem; font-weight: normal;">
                            ⚠️ Pour des raisons de sécurité, supprimez ou renommez le fichier install.php
                        </p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem;">
                    <a href="index.php" class="btn btn-primary">
                        Accéder au Site →
                    </a>
                    <a href="pages/admin.php" class="btn btn-success">
                        Panneau Admin →
                    </a>
                </div>
                
                <div class="alert alert-warning" style="margin-top: 2rem;">
                    <strong>⚠️ Important :</strong> N'oubliez pas de :
                    <ul>
                        <li>Configurer l'IP du serveur FiveM dans le footer</li>
                        <li>Ajouter vos liens de réseaux sociaux</li>
                        <li>Personnaliser les couleurs si nécessaire</li>
                    </ul>
                </div>
                
            <?php endif; ?>
        </div>
        
        <div class="footer-text">
            Fait avec <span style="color: var(--primary);">❤</span> pour Central6RP<br>
            Version 2.0 - Installation Wizard
        </div>
    </div>
</body>
</html>
