# 🔧 Guide de Configuration InfinityFree - Étape par Étape

## 📋 Informations à Récupérer dans le Panneau InfinityFree

Avant de commencer, vous devez avoir ces informations depuis votre panneau InfinityFree :

1. **MySQL Hostname** : `sql213.infinityfree.com` (visible dans "MySQL Databases")
2. **MySQL Username** : `if0_40451098` (visible dans "MySQL Databases")
3. **MySQL Password** : (cliquez sur l'icône 👁️ pour le voir)
4. **Nom de la base de données** : (vous allez le créer)

---

## Étape 1 : Créer la Base de Données MySQL

1. Dans le panneau InfinityFree, allez dans **"MySQL Databases"**
2. Cliquez sur le bouton **"Create Database"** (bouton violet avec +)
3. Entrez un nom pour votre base de données : `central6rp` (ou un autre nom)
4. Cliquez sur **"Create"**
5. **Notez le nom complet** : il sera au format `if0_40451098_central6rp` (préfixe + nom)

---

## Étape 2 : Récupérer le Mot de Passe MySQL

1. Dans la section **"MySQL Databases"**, trouvez **"MYSQL PASSWORD"**
2. Cliquez sur l'icône **👁️ (œil)** à côté du mot de passe masqué
3. **Copiez le mot de passe** qui s'affiche
4. ⚠️ **IMPORTANT** : C'est différent du mot de passe de votre compte InfinityFree !

---

## Étape 3 : Configurer `api/config.php`

Ouvrez le fichier `api/config.php` et modifiez ces 5 lignes :

### 🔹 DB_HOST (Hostname)

**Où trouver** : Dans le panneau InfinityFree → "MySQL Databases" → "MYSQL HOSTNAME"

**Valeur à mettre** : `sql213.infinityfree.com`

```php
define('DB_HOST', 'sql213.infinityfree.com');
```

**✅ Vérification** : C'est l'adresse du serveur MySQL d'InfinityFree.

---

### 🔹 DB_NAME (Nom de la Base de Données)

**Où trouver** : C'est le nom complet de la base que vous avez créée à l'Étape 1

**Format** : `if0_40451098_central6rp` (préfixe + nom que vous avez choisi)

```php
define('DB_NAME', 'if0_40451098_central6rp');
```

**✅ Vérification** : 
- Commence par `if0_40451098_` (votre préfixe)
- Suivi du nom que vous avez choisi lors de la création

**⚠️ Si vous avez choisi un autre nom que "central6rp"**, remplacez-le dans la valeur !

---

### 🔹 DB_USER (Username MySQL)

**Où trouver** : Dans le panneau InfinityFree → "MySQL Databases" → "MYSQL USERNAME"

**Valeur à mettre** : `if0_40451098`

```php
define('DB_USER', 'if0_40451098');
```

**✅ Vérification** : C'est votre identifiant MySQL (généralement le même que votre préfixe de compte).

---

### 🔹 DB_PASS (Mot de Passe MySQL)

**Où trouver** : Dans le panneau InfinityFree → "MySQL Databases" → "MYSQL PASSWORD" → Cliquez sur 👁️

**Valeur à mettre** : Le mot de passe que vous avez copié à l'Étape 2

```php
define('DB_PASS', 'votre_mot_de_passe_ici');
```

**⚠️ IMPORTANT** :
- Remplacez `votre_mot_de_passe_ici` par le vrai mot de passe
- Ne mettez PAS d'espaces avant/après
- C'est différent du mot de passe de votre compte InfinityFree !

**Exemple** :
```php
define('DB_PASS', 'MyP@ssw0rd123');
```

---

### 🔹 DB_CHARSET (Encodage)

**Valeur** : Ne changez PAS cette valeur, elle est déjà correcte !

```php
define('DB_CHARSET', 'utf8mb4');
```

**✅ Vérification** : `utf8mb4` permet de gérer les emojis et caractères spéciaux.

---

## Étape 4 : Exemple de Configuration Complète

Voici à quoi devrait ressembler votre configuration finale :

```php
// Configuration de la base de données InfinityFree
define('DB_HOST', 'sql213.infinityfree.com');
define('DB_NAME', 'if0_40451098_central6rp');  // ⚠️ Remplacez par VOTRE nom de BDD
define('DB_USER', 'if0_40451098');
define('DB_PASS', 'VotreMotDePasseMySQL123');   // ⚠️ Remplacez par VOTRE mot de passe
define('DB_CHARSET', 'utf8mb4');
```

---

## Étape 5 : Importer la Structure de la Base de Données

1. Dans le panneau InfinityFree, trouvez **"phpMyAdmin"** (dans le menu de gauche ou dans la section MySQL)
2. Cliquez dessus (s'ouvre dans un nouvel onglet)
3. Dans phpMyAdmin :
   - Sélectionnez votre base de données dans la liste de gauche : `if0_40451098_central6rp`
   - Cliquez sur l'onglet **"Importer"** (en haut)
   - Cliquez sur **"Choisir un fichier"**
   - Sélectionnez le fichier `api/database.sql` depuis votre ordinateur
   - Cliquez sur **"Exécuter"** en bas de la page
4. ✅ Vous devriez voir un message de succès avec les tables créées

---

## Étape 6 : Tester la Connexion

1. Uploadez tous les fichiers du dossier `api/` sur InfinityFree via le File Manager
2. Testez l'API dans votre navigateur :
   ```
   https://votrenom.infinityfreeapp.com/api/stats.php
   ```
3. Vous devriez voir un JSON avec les statistiques

---

## ❌ Problèmes Courants

### Erreur : "Access denied for user"
- **Cause** : Mauvais username ou mot de passe
- **Solution** : Vérifiez `DB_USER` et `DB_PASS` dans `config.php`

### Erreur : "Unknown database"
- **Cause** : Le nom de la base de données est incorrect
- **Solution** : Vérifiez que `DB_NAME` correspond exactement au nom complet dans phpMyAdmin

### Erreur : "Connection refused"
- **Cause** : Mauvais hostname
- **Solution** : Vérifiez `DB_HOST` dans le panneau InfinityFree

### Erreur : "Table doesn't exist"
- **Cause** : La base de données n'a pas été importée
- **Solution** : Réimportez `database.sql` via phpMyAdmin

---

## 📝 Checklist Finale

- [ ] Base de données créée dans InfinityFree
- [ ] Mot de passe MySQL récupéré (icône 👁️)
- [ ] `DB_HOST` configuré avec le hostname InfinityFree
- [ ] `DB_NAME` configuré avec le nom complet de la BDD (préfixe + nom)
- [ ] `DB_USER` configuré avec le username MySQL
- [ ] `DB_PASS` configuré avec le mot de passe MySQL
- [ ] `database.sql` importé via phpMyAdmin
- [ ] Fichiers `api/` uploadés sur InfinityFree
- [ ] Test de l'API réussi (`/api/stats.php`)

---

## 🚀 Prochaine Étape

Une fois la configuration terminée, vous pouvez :
1. Configurer CORS pour autoriser votre domaine Vercel
2. Tester l'authentification
3. Vérifier les stats FiveM en temps réel

