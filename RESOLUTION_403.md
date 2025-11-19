# 🔧 Résolution de l'Erreur 403 Forbidden sur InfinityFree

## ✅ Checklist de Vérification

### 1. Vérifier la Structure des Dossiers

Dans le File Manager d'InfinityFree, la structure doit être :

```
/htdocs/
└── api/
    ├── config.php
    ├── stats.php
    ├── test_connection.php
    ├── .htaccess
    ├── fivem_config.php
    ├── fetch_fivem_stats.php
    ├── auth/
    │   ├── login.php
    │   ├── register.php
    │   ├── logout.php
    │   └── me.php
    └── admin/
        ├── users.php
        ├── logs.php
        └── stats.php
```

**⚠️ IMPORTANT** : Les fichiers doivent être dans `/htdocs/api/`, PAS directement dans `/htdocs/` !

---

### 2. Vérifier les Permissions des Fichiers

Dans le File Manager d'InfinityFree :

1. Sélectionnez tous les fichiers du dossier `api/`
2. Cliquez sur "Edit" ou "Permissions"
3. Définissez les permissions à **644** pour les fichiers PHP
4. Définissez les permissions à **755** pour les dossiers (`auth/`, `admin/`)

**Ou via le terminal (si disponible)** :
```bash
chmod 644 api/*.php
chmod 755 api/auth api/admin
```

---

### 3. Vérifier que `.htaccess` n'est pas trop restrictif

Le fichier `.htaccess` peut bloquer l'accès. Testez en le renommant temporairement :

1. Renommez `.htaccess` en `.htaccess.backup`
2. Testez `test_connection.php`
3. Si ça fonctionne, le problème vient du `.htaccess`

---

### 4. Créer un fichier `index.php` dans `/htdocs/`

InfinityFree peut bloquer l'accès direct aux dossiers. Créez un fichier `/htdocs/index.php` :

```php
<?php
header('Location: /api/test_connection.php');
exit;
?>
```

---

### 5. Vérifier l'URL Utilisée

Assurez-vous d'utiliser l'URL complète :

✅ **BON** :
```
https://votrenom.infinityfreeapp.com/api/test_connection.php
```

❌ **MAUVAIS** :
```
https://votrenom.infinityfreeapp.com/api/
https://votrenom.infinityfreeapp.com/htdocs/api/test_connection.php
```

---

### 6. Tester avec un fichier PHP simple

Créez un fichier `/htdocs/api/test.php` :

```php
<?php
echo "PHP fonctionne !";
phpinfo();
?>
```

Si ce fichier fonctionne mais pas `test_connection.php`, le problème vient de `config.php` ou de la connexion à la base de données.

---

### 7. Vérifier les Logs d'Erreur

Dans le panneau InfinityFree :
1. Allez dans "Error Logs" ou "Logs"
2. Vérifiez s'il y a des erreurs PHP ou Apache

---

## 🔍 Solutions Spécifiques

### Solution A : Simplifier temporairement `.htaccess`

Créez un `.htaccess` minimal pour tester :

```apache
# .htaccess minimal pour test
RewriteEngine On

# Autoriser l'accès aux fichiers PHP
<FilesMatch "\.php$">
    Require all granted
</FilesMatch>
```

Si ça fonctionne, réintroduisez progressivement les règles de sécurité.

---

### Solution B : Vérifier que `config.php` est accessible

Le `.htaccess` bloque les fichiers `.config`, mais `config.php` devrait passer. Vérifiez que le fichier existe bien et qu'il n'est pas vide.

---

### Solution C : Utiliser un chemin absolu dans `test_connection.php`

Modifiez `test_connection.php` pour utiliser un chemin absolu :

```php
require_once __DIR__ . '/config.php';
```

Au lieu de :

```php
require_once 'config.php';
```

---

## 📝 Test Final

Une fois les corrections appliquées, testez dans cet ordre :

1. `https://votrenom.infinityfreeapp.com/api/test.php` (fichier simple)
2. `https://votrenom.infinityfreeapp.com/api/test_connection.php` (test de connexion)

---

## 🆘 Si Rien ne Fonctionne

1. Contactez le support InfinityFree via le forum
2. Vérifiez que votre compte n'est pas en mode "maintenance"
3. Vérifiez que vous utilisez bien HTTPS (InfinityFree nécessite HTTPS)

