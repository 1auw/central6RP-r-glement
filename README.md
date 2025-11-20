# 🚀 Central6RP - Site Web

## ✅ Configuration actuelle

- **Frontend** : Next.js sur Vercel
- **Backend** : PHP sur InfinityFree
- **Architecture** : API Routes Next.js comme proxy (pas de CORS nécessaire)

---

## 📋 Déploiement

### Backend PHP (InfinityFree)

Les fichiers PHP doivent être dans `htdocs/` :

```
htdocs/
├── config.php
├── .htaccess
├── stats.php
├── auth/
│   ├── login.php
│   ├── register.php
│   ├── me.php
│   └── logout.php
└── admin/
    ├── settings.php
    ├── stats.php
    ├── users.php
    ├── logs.php
    └── toggle_user.php
```

### Frontend Next.js (Vercel)

Le déploiement est automatique via GitHub.

---

## 🔧 Configuration

### Variables d'environnement

Créez `.env.local` :

```env
NEXT_PUBLIC_API_URL=https://central6rp.rf.gd
NEXT_PUBLIC_SITE_URL=https://central6rp.vercel.app
```

---

## 🎉 C'est tout !

Le site est prêt à être utilisé ! 🚀
