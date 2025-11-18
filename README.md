# 🎮 Central 6RP - Site Web

Site web moderne pour le serveur FiveM Central 6RP, construit avec Next.js 14, TailwindCSS et Framer Motion.

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** avec vidéo en arrière-plan et animations
- 📋 **Règlement** interactif avec recherche et catégories
- 👤 **Système d'authentification** complet (inscription, connexion, profil)
- 🛡️ **Panel d'administration** (gestion utilisateurs, logs, stats, paramètres)
- 📊 **Statistiques en temps réel** depuis le serveur FiveM
- 🔐 **Sécurité renforcée** (rate limiting, protection XSS/CSRF/SQL injection)
- 📱 **Design responsive** et moderne

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn
- PHP 8.0+ avec MySQL (pour le backend)
- XAMPP ou serveur web local

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/central6.git
cd central6
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditez `.env.local` et configurez :
```env
NEXT_PUBLIC_API_URL=http://localhost/central6/api
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

4. **Configurer le backend PHP**

- Copiez le dossier `api/` vers votre serveur web (XAMPP, etc.)
- Configurez la base de données MySQL (voir `api/database.sql`)
- Modifiez `api/config.php` avec vos identifiants MySQL
- Configurez `api/fivem_config.php` avec l'IP et le port de votre serveur FiveM

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3001](http://localhost:3001)

## 📁 Structure du projet

```
central6/
├── app/                    # Pages Next.js (App Router)
│   ├── admin/             # Pages d'administration
│   ├── api/               # Routes API Next.js
│   ├── login/             # Page de connexion
│   ├── register/          # Page d'inscription
│   └── profile/           # Page de profil
├── components/            # Composants React réutilisables
├── api/                   # Backend PHP (à héberger séparément)
│   ├── auth/             # Authentification
│   ├── admin/            # API admin
│   └── config.php        # Configuration
├── config/               # Configuration du site
└── public/               # Fichiers statiques
```

## 🌐 Déploiement

### Déploiement sur Vercel

1. **Pousser le code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repository GitHub
   - Configurez les variables d'environnement :
     - `NEXT_PUBLIC_API_URL` : URL de votre backend PHP
     - `NEXT_PUBLIC_SITE_URL` : URL de votre site Vercel

3. **Déployer**
   - Vercel déploiera automatiquement à chaque push sur GitHub

### Hébergement du backend PHP

Le backend PHP doit être hébergé séparément (VPS, hébergeur PHP, etc.) :

- **Option 1** : VPS avec Apache/Nginx + PHP + MySQL
- **Option 2** : Hébergeur PHP classique (OVH, Hostinger, etc.)
- **Option 3** : Serveur dédié

Voir `DEPLOIEMENT.md` pour plus de détails.

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL du backend PHP | `https://api.votresite.com` |
| `NEXT_PUBLIC_SITE_URL` | URL du site | `https://votresite.com` |

### Configuration FiveM

Éditez `api/fivem_config.php` :
```php
define('FIVEM_IP', '127.0.0.1');
define('FIVEM_PORT', '30120');
```

## 📚 Documentation

- [INSTALLATION.md](INSTALLATION.md) - Guide d'installation complet
- [DEPLOIEMENT.md](DEPLOIEMENT.md) - Guide de déploiement
- [SECURITE.md](SECURITE.md) - Documentation de sécurité
- [api/CONFIG_FIVEM.md](api/CONFIG_FIVEM.md) - Configuration FiveM

## 🛠️ Technologies utilisées

- **Frontend** : Next.js 14, React, TypeScript, TailwindCSS, Framer Motion
- **Backend** : PHP 8.0+, MySQL
- **Sécurité** : Rate limiting, CSRF protection, XSS protection, SQL injection protection

## 📝 Licence

Ce projet est privé et propriétaire de Central 6RP.

## 👥 Contribution

Ce projet est privé. Pour toute question, contactez l'administrateur.

---

**Central 6RP** - Serveur FiveM Roleplay
