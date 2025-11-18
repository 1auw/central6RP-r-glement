# Configuration du Backend PHP - Central6RP

## Guide d'installation rapide

### Étape 1: Installer les prérequis

Vous avez besoin de:
- **XAMPP** ou **WAMP** (inclut Apache, PHP, MySQL)
- Télécharger: https://www.apachefriends.org/

### Étape 2: Démarrer les serveurs

1. Lancez **XAMPP Control Panel**
2. Démarrez **Apache** et **MySQL**

### Étape 3: Créer la base de données

1. Ouvrez **phpMyAdmin**: http://localhost/phpmyadmin
2. Créez une nouvelle base de données nommée `central6rp`
3. Sélectionnez la base de données
4. Allez dans l'onglet **SQL**
5. Copiez-collez tout le contenu du fichier `api/database.sql`
6. Cliquez sur **Exécuter**

### Étape 4: Configurer la connexion

1. Ouvrez `api/config.php`
2. Modifiez si nécessaire (par défaut devrait fonctionner):

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'central6rp');
define('DB_USER', 'root');
define('DB_PASS', ''); // Vide par défaut sur XAMPP
```

### Étape 5: Placer les fichiers API

1. Copiez le dossier `api/` dans:
   - **XAMPP**: `C:\xampp\htdocs\central6rp\`
   - **WAMP**: `C:\wamp64\www\central6rp\`

Votre structure doit être:
```
C:\xampp\htdocs\central6rp\
└── api/
    ├── config.php
    ├── database.sql
    ├── stats.php
    └── auth/
        ├── register.php
        ├── login.php
        ├── logout.php
        └── me.php
```

### Étape 6: Tester l'API

Ouvrez votre navigateur et testez:

1. **Stats**: http://localhost/central6rp/api/stats.php
   - Vous devriez voir du JSON avec les statistiques

2. **Test de connexion BDD**: Si vous voyez des erreurs, vérifiez:
   - MySQL est bien démarré
   - La base de données `central6rp` existe
   - Les informations de connexion dans `config.php` sont correctes

### Étape 7: Compte admin par défaut

Un compte administrateur est créé automatiquement:
- **Username**: admin
- **Password**: admin123
- **Email**: admin@central6rp.fr

### Étape 8: Vérifier que le frontend fonctionne

1. Le site Next.js doit tourner sur: http://localhost:3001
2. Les stats doivent s'afficher automatiquement sur la page d'accueil
3. Si les stats affichent "...", vérifiez la console du navigateur (F12) pour les erreurs

### Dépannage

**Erreur: "Failed to fetch"**
- Vérifiez qu'Apache est bien démarré
- Vérifiez que l'URL dans `StatsSection.tsx` correspond à votre installation
- Par défaut: `http://localhost/central6rp/api/stats.php`

**Erreur: "Access to fetch blocked by CORS"**
- C'est normal si vous n'utilisez pas le même port
- Les headers CORS sont déjà configurés dans `config.php`

**Erreur: "Erreur de connexion à la base de données"**
- Vérifiez que MySQL est démarré
- Vérifiez que la BDD `central6rp` existe
- Vérifiez les identifiants dans `config.php`

**Les stats affichent "0" partout**
- C'est normal au départ !
- Les joueurs en ligne seront mis à jour quand des joueurs se connecteront
- Le nombre de membres augmentera quand des gens s'inscriront

### Prochaines étapes

Une fois que l'API fonctionne, les stats s'actualiseront automatiquement toutes les 30 secondes.

Pour créer de nouveaux comptes utilisateurs, vous devrez créer les pages:
- **/register** - Inscription
- **/login** - Connexion  
- **/profile** - Profil utilisateur

Ces pages appelleront les scripts PHP dans `api/auth/`.

### Sécurité Production

Quand vous mettrez le site en ligne:
1. Changez le mot de passe admin
2. Modifiez `SECRET_KEY` dans `config.php`
3. Activez HTTPS
4. Changez les URL CORS pour votre domaine

