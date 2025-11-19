# 🆓 Guide d'hébergement gratuit du backend PHP

Ce guide vous explique comment héberger gratuitement votre backend PHP pour que votre site Vercel fonctionne 24/7.

---

## 🏆 Option 1 : InfinityFree (RECOMMANDÉ)

### ✅ Avantages
- ✅ **100% gratuit** et illimité
- ✅ PHP 8.0+ supporté
- ✅ MySQL gratuit inclus
- ✅ Pas de publicité
- ✅ Sous-domaine gratuit
- ✅ 5 GB d'espace
- ✅ 50 000 visites/mois

### 📝 Inscription

1. **Allez sur** [infinityfree.net](https://www.infinityfree.net)
2. **Cliquez sur** "Sign Up" (en haut à droite)
3. **Remplissez le formulaire** :
   - Email
   - Mot de passe
   - Confirmez votre email
4. **Connectez-vous** à votre compte

### 🚀 Installation

#### Étape 1 : Créer un site

1. Dans le **Control Panel**, cliquez sur **"Create Account"**
2. Choisissez **"Free Subdomain"** (gratuit)
3. Entrez un nom (ex: `central6api`)
4. Votre URL sera : `central6api.infinityfreeapp.com`
5. Cliquez sur **"Create Account"**

#### Étape 2 : Uploader les fichiers

1. Allez dans **"File Manager"**
2. Supprimez le fichier `index.html` par défaut
3. **Uploadez** tout le contenu du dossier `api/` :
   - Sélectionnez tous les fichiers
   - Glissez-déposez ou utilisez "Upload"
   - ⚠️ **Important** : Uploadez le **contenu** du dossier `api/`, pas le dossier lui-même

Structure attendue :
```
/
├── config.php
├── stats.php
├── .htaccess
├── auth/
│   ├── login.php
│   ├── register.php
│   └── ...
└── admin/
    └── ...
```

#### Étape 3 : Créer la base de données MySQL

1. Allez dans **"MySQL Databases"**
2. Cliquez sur **"Create Database"**
3. Nom de la base : `central6rp`
4. Cliquez sur **"Create"**
5. **Notez** :
   - **Host** : `sqlXXX.infinityfree.com` (XXX = numéro)
   - **Username** : `epiz_XXXXXX` (votre username)
   - **Password** : (celui que vous avez créé)
   - **Database** : `epiz_XXXXXX_central6rp`

#### Étape 4 : Configurer `config.php`

1. Dans le **File Manager**, ouvrez `config.php`
2. Modifiez les lignes :

```php
// Configuration de la base de données
define('DB_HOST', 'sqlXXX.infinityfree.com');  // ← Host de votre BDD
define('DB_NAME', 'epiz_XXXXXX_central6rp');   // ← Nom de votre BDD
define('DB_USER', 'epiz_XXXXXX');              // ← Username de votre BDD
define('DB_PASS', 'votre_mot_de_passe');        // ← Password de votre BDD
define('DB_CHARSET', 'utf8mb4');
```

3. **Sauvegardez**

#### Étape 5 : Importer la structure de la base de données

1. Allez dans **"phpMyAdmin"** (dans le panel)
2. Sélectionnez votre base de données
3. Cliquez sur **"Import"**
4. **Uploadez** le fichier `api/database.sql`
5. Cliquez sur **"Go"**

#### Étape 6 : Configurer CORS pour Vercel

Modifiez `config.php` pour autoriser votre domaine Vercel :

```php
// Headers CORS et JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://votresite.vercel.app');  // ← Votre URL Vercel
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
```

#### Étape 7 : Tester

Testez dans votre navigateur :
```
https://central6api.infinityfreeapp.com/stats.php
```

Vous devriez voir un JSON avec les stats.

---

## 🆓 Option 2 : 000webhost

### ✅ Avantages
- ✅ Gratuit
- ✅ PHP supporté
- ✅ MySQL inclus
- ⚠️ Limites : 300 MB, 3 GB/mois

### 📝 Inscription

1. Allez sur [000webhost.com](https://www.000webhost.com)
2. Créez un compte
3. Créez un site
4. Uploadez les fichiers via File Manager
5. Configurez MySQL

---

## 🆓 Option 3 : Freehostia

### ✅ Avantages
- ✅ Gratuit
- ✅ PHP 8.0
- ✅ MySQL inclus
- ⚠️ Limites : 250 MB, 6 GB/mois

### 📝 Inscription

1. Allez sur [freehostia.com](https://www.freehostia.com)
2. Choisissez le plan "Chocolate" (gratuit)
3. Créez un compte
4. Uploadez les fichiers

---

## 🔧 Configuration Vercel après hébergement

Une fois votre backend hébergé :

1. **Allez dans Vercel** → **Settings** → **Environment Variables**
2. **Modifiez** `NEXT_PUBLIC_API_URL` :
   ```
   https://central6api.infinityfreeapp.com
   ```
   (Remplacez par votre URL réelle)

3. **Redéployez** le site (automatique ou manuel)

---

## ⚠️ Limitations des hébergeurs gratuits

### InfinityFree
- ⚠️ Site inactif après 30 jours d'inactivité (mais se réactive automatiquement)
- ⚠️ Pas de cron jobs (mais pas nécessaire pour votre cas)

### 000webhost
- ⚠️ Site supprimé après 30 jours d'inactivité
- ⚠️ Limites de bande passante

### Solutions
- ✅ Visitez votre site régulièrement (au moins 1 fois par mois)
- ✅ Configurez un service de monitoring (UptimeRobot - gratuit) pour visiter automatiquement

---

## 🔄 Alternative : Monitoring gratuit

Pour éviter l'inactivité, utilisez **UptimeRobot** (gratuit) :

1. Allez sur [uptimerobot.com](https://uptimerobot.com)
2. Créez un compte gratuit
3. Ajoutez un monitor pour votre API :
   - URL : `https://central6api.infinityfreeapp.com/stats.php`
   - Intervalle : 5 minutes
4. Le service visitera automatiquement votre site toutes les 5 minutes

---

## 📊 Comparaison rapide

| Hébergeur | Espace | Bande passante | MySQL | Recommandé |
|-----------|--------|----------------|-------|------------|
| **InfinityFree** | 5 GB | Illimité* | ✅ | ⭐⭐⭐⭐⭐ |
| 000webhost | 300 MB | 3 GB/mois | ✅ | ⭐⭐⭐ |
| Freehostia | 250 MB | 6 GB/mois | ✅ | ⭐⭐⭐ |

\* 50 000 visites/mois

---

## ✅ Checklist

- [ ] Compte créé sur InfinityFree (ou autre)
- [ ] Site créé avec sous-domaine
- [ ] Fichiers `api/` uploadés
- [ ] Base de données MySQL créée
- [ ] `config.php` configuré avec les bonnes infos BDD
- [ ] Structure BDD importée (`database.sql`)
- [ ] CORS configuré pour Vercel
- [ ] Test de l'API réussi
- [ ] Variable `NEXT_PUBLIC_API_URL` mise à jour dans Vercel
- [ ] Monitoring configuré (optionnel mais recommandé)

---

## 🎯 Recommandation finale

**Utilisez InfinityFree** car :
- ✅ 100% gratuit et fiable
- ✅ Pas de publicité
- ✅ Support PHP 8.0+
- ✅ MySQL inclus
- ✅ Assez d'espace pour votre projet

**URL de votre API sera :**
```
https://votrenom.infinityfreeapp.com
```

---

**Dernière mise à jour :** 18 novembre 2025


