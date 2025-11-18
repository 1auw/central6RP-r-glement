# Backend PHP - Central6RP

## Installation

### 1. Prérequis
- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur
- Apache avec mod_rewrite activé
- Extension PHP: pdo_mysql, session

### 2. Configuration de la base de données

1. Ouvrez phpMyAdmin ou votre client MySQL
2. Exécutez le fichier `database.sql` pour créer la base de données et les tables
3. Modifiez `config.php` avec vos informations de connexion MySQL

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'central6rp');
define('DB_USER', 'votre_utilisateur');
define('DB_PASS', 'votre_mot_de_passe');
```

### 3. Configuration Apache

Placez le dossier `api/` dans le dossier racine de votre projet.

Assurez-vous que mod_rewrite est activé :
```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

### 4. Compte administrateur par défaut

- **Username**: admin
- **Password**: admin123
- **Email**: admin@central6rp.fr

**Changez ces identifiants immédiatement après la première connexion !**

### 5. Structure des fichiers

```
api/
├── config.php          # Configuration BDD et fonctions
├── database.sql        # Structure de la base de données
├── .htaccess          # Configuration Apache
├── stats.php          # Récupérer les statistiques
└── auth/
    ├── register.php   # Inscription
    ├── login.php      # Connexion
    ├── logout.php     # Déconnexion
    └── me.php         # Infos utilisateur
```

### 6. Endpoints API

#### Inscription
```
POST /api/auth/register.php
Body: {
  "username": "string",
  "email": "string",
  "password": "string",
  "password_confirm": "string"
}
```

#### Connexion
```
POST /api/auth/login.php
Body: {
  "login": "string", // username ou email
  "password": "string"
}
```

#### Déconnexion
```
POST /api/auth/logout.php
```

#### Informations utilisateur
```
GET /api/auth/me.php
```

#### Statistiques
```
GET /api/stats.php
Response: {
  "success": true,
  "stats": {
    "players_online": 0,
    "max_players": 32,
    "total_users": 1,
    "server_status": "24/7",
    "shop_items": 5
  }
}
```

### 7. Sécurité

- Les mots de passe sont hashés avec bcrypt
- Les sessions utilisent des tokens sécurisés
- Protection CSRF
- Validation et nettoyage des entrées
- Headers de sécurité configurés
- CORS configuré pour localhost:3001

### 8. Logs d'activité

Toutes les actions importantes sont enregistrées dans la table `activity_logs`:
- Inscription
- Connexion
- Déconnexion
- Actions administratives

### 9. Dépannage

**Erreur: "Erreur de connexion à la base de données"**
- Vérifiez les informations de connexion dans `config.php`
- Vérifiez que MySQL est démarré
- Vérifiez que la base de données existe

**Erreur CORS**
- Vérifiez que l'URL dans `config.php` correspond à votre frontend
- Vérifiez que les headers CORS sont bien configurés

**Sessions ne fonctionnent pas**
- Vérifiez que PHP a les droits d'écriture sur le dossier de sessions
- Vérifiez que session_start() est appelé

## Mise en production

1. Changez `SECRET_KEY` dans `config.php` avec une valeur aléatoire
2. Désactivez l'affichage des erreurs PHP
3. Activez HTTPS et mettez `session.cookie_secure` à 1
4. Changez les identifiants admin par défaut
5. Mettez à jour l'URL CORS avec votre domaine de production

