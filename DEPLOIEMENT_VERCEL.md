# 🚀 Guide de déploiement sur Vercel

Ce guide vous explique comment déployer votre site Central 6RP sur Vercel via GitHub.

---

## 📋 Prérequis

- ✅ Compte GitHub
- ✅ Compte Vercel (gratuit)
- ✅ Backend PHP hébergé séparément (VPS, hébergeur PHP, etc.)

---

## 🔧 Étape 1 : Préparer le projet pour GitHub

### 1.1 Créer un repository GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"**
3. Nommez-le : `central6` (ou autre nom)
4. Choisissez **Private** (recommandé)
5. Ne cochez **PAS** "Initialize with README" (vous avez déjà un README)
6. Cliquez sur **"Create repository"**

### 1.2 Initialiser Git dans votre projet

Ouvrez PowerShell dans votre dossier de projet et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Site Central 6RP"

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/central6.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

⚠️ **Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub !**

---

## 🌐 Étape 2 : Configurer Vercel

### 2.1 Connecter GitHub à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à vos repositories

### 2.2 Importer votre projet

1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez votre repository `central6`
3. Cliquez sur **"Import"**

### 2.3 Configurer les variables d'environnement

Dans la section **"Environment Variables"**, ajoutez :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://api.votresite.com` | URL de votre backend PHP |
| `NEXT_PUBLIC_SITE_URL` | `https://votresite.vercel.app` | URL de votre site Vercel |

⚠️ **Important :**
- Remplacez `https://api.votresite.com` par l'URL réelle de votre backend PHP
- `NEXT_PUBLIC_SITE_URL` sera automatiquement rempli par Vercel après le premier déploiement

### 2.4 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Votre site sera disponible sur `https://votresite.vercel.app`

---

## 🔧 Étape 3 : Configurer le backend PHP

### 3.1 Héberger le backend PHP

Le backend PHP doit être hébergé séparément. Options :

**Option A : VPS (Recommandé)**
- DigitalOcean, OVH, Hetzner, etc.
- Installez Apache/Nginx + PHP + MySQL
- Uploadez le dossier `api/`

**Option B : Hébergeur PHP classique**
- OVH, Hostinger, O2Switch, etc.
- Uploadez le dossier `api/` via FTP
- Configurez la base de données MySQL

**Option C : Serveur dédié**
- Même processus que VPS

### 3.2 Configurer CORS sur le backend PHP

Modifiez `api/config.php` pour autoriser votre domaine Vercel :

```php
// Headers CORS et JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://votresite.vercel.app');  // ← Votre URL Vercel
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
```

### 3.3 Mettre à jour `.htaccess`

Modifiez `api/.htaccess` pour autoriser votre domaine :

```apache
Header set Access-Control-Allow-Origin "https://votresite.vercel.app"
```

---

## 🔄 Étape 4 : Mises à jour automatiques

### Configuration automatique

Vercel déploiera automatiquement votre site à chaque push sur GitHub :

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour du site"
git push origin main
```

Vercel détectera le push et redéploiera automatiquement ! 🚀

---

## 🔐 Étape 5 : Configuration de production

### 5.1 Variables d'environnement en production

Dans Vercel, allez dans **Settings** → **Environment Variables** :

- **Production** : `NEXT_PUBLIC_API_URL=https://api.votresite.com`
- **Preview** : `NEXT_PUBLIC_API_URL=https://api.votresite.com` (ou URL de test)
- **Development** : `NEXT_PUBLIC_API_URL=http://localhost/central6/api`

### 5.2 Domaine personnalisé (optionnel)

1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `votresite.com`)
3. Suivez les instructions pour configurer le DNS

---

## 🧪 Tester le déploiement

### Vérifications

1. ✅ Le site charge correctement
2. ✅ Les stats s'affichent (vérifiez la console pour les erreurs CORS)
3. ✅ L'inscription fonctionne
4. ✅ La connexion fonctionne
5. ✅ Le panel admin est accessible

### Dépannage

**Problème : Erreur CORS**
- Vérifiez que `Access-Control-Allow-Origin` dans `api/config.php` correspond à votre URL Vercel
- Vérifiez que `NEXT_PUBLIC_API_URL` est correct dans Vercel

**Problème : Les stats ne s'affichent pas**
- Vérifiez que votre backend PHP est accessible publiquement
- Testez `https://api.votresite.com/stats.php` dans votre navigateur

**Problème : Les cookies ne fonctionnent pas**
- Vérifiez que `Access-Control-Allow-Credentials: true` est présent
- Vérifiez que les cookies sont en HTTPS en production

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## ✅ Checklist de déploiement

- [ ] Code poussé sur GitHub
- [ ] Projet importé dans Vercel
- [ ] Variables d'environnement configurées
- [ ] Backend PHP hébergé et accessible
- [ ] CORS configuré sur le backend
- [ ] Site déployé et testé
- [ ] Domaine personnalisé configuré (optionnel)

---

**Dernière mise à jour :** 18 novembre 2025

