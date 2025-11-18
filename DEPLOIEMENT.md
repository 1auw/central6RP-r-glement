# 🚀 Guide de déploiement complet

Ce guide couvre tous les aspects du déploiement de Central 6RP.

---

## 📦 Table des matières

1. [Déploiement sur Vercel (Frontend Next.js)](#déploiement-sur-vercel)
2. [Hébergement du backend PHP](#hébergement-du-backend-php)
3. [Configuration de la base de données](#configuration-de-la-base-de-données)
4. [Configuration FiveM](#configuration-fivem)

---

## 🌐 Déploiement sur Vercel

Voir le guide détaillé : **[DEPLOIEMENT_VERCEL.md](DEPLOIEMENT_VERCEL.md)**

### Résumé rapide

1. **Pousser sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_USERNAME/central6.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repository GitHub
   - Configurez les variables d'environnement :
     - `NEXT_PUBLIC_API_URL` : URL de votre backend PHP
     - `NEXT_PUBLIC_SITE_URL` : URL Vercel (auto)

3. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - Votre site est en ligne ! 🎉

---

## 🖥️ Hébergement du backend PHP

### Option 1 : VPS (Recommandé)

**Avantages :**
- Contrôle total
- Performances optimales
- Coût raisonnable (5-10€/mois)

**Fournisseurs recommandés :**
- DigitalOcean (5$/mois)
- OVH (3-5€/mois)
- Hetzner (4€/mois)

**Installation :**
```bash
# Installer Apache, PHP, MySQL
sudo apt update
sudo apt install apache2 php8.1 mysql-server

# Uploader le dossier api/
scp -r api/ user@votre-vps:/var/www/html/central6/

# Configurer les permissions
sudo chown -R www-data:www-data /var/www/html/central6
```

### Option 2 : Hébergeur PHP classique

**Avantages :**
- Simple et rapide
- Support inclus
- Pas de configuration serveur

**Fournisseurs :**
- OVH (3€/mois)
- Hostinger (2€/mois)
- O2Switch (5€/mois)

**Installation :**
1. Connectez-vous via FTP
2. Uploadez le dossier `api/`
3. Configurez la base de données via le panel

---

## 🗄️ Configuration de la base de données

### 1. Créer la base de données

```sql
CREATE DATABASE central6rp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Importer la structure

```bash
mysql -u root -p central6rp < api/database.sql
```

### 3. Configurer `api/config.php`

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'central6rp');
define('DB_USER', 'votre_user');
define('DB_PASS', 'votre_mot_de_passe');
```

---

## 🎮 Configuration FiveM

### 1. Configurer l'IP et le port

Éditez `api/fivem_config.php` :

```php
define('FIVEM_IP', '127.0.0.1');  // IP de votre serveur FiveM
define('FIVEM_PORT', '30120');     // Port de votre serveur FiveM
```

### 2. Vérifier l'accès

Testez dans votre navigateur :
```
http://VOTRE_IP:VOTRE_PORT/info.json
```

Vous devriez voir un JSON avec les infos du serveur.

---

## 🔐 Sécurité en production

### Checklist

- [ ] HTTPS activé (obligatoire pour les cookies)
- [ ] Variables d'environnement configurées
- [ ] CORS configuré correctement
- [ ] Fichiers sensibles non commités (.env, settings.json)
- [ ] Mots de passe forts
- [ ] Firewall configuré
- [ ] Backups automatiques

---

## 📞 Support

Pour toute question, consultez :
- [INSTALLATION.md](INSTALLATION.md)
- [SECURITE.md](SECURITE.md)
- [DEPLOIEMENT_VERCEL.md](DEPLOIEMENT_VERCEL.md)

---

**Dernière mise à jour :** 18 novembre 2025
