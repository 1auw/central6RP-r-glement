# 📁 Fichiers à uploader dans File Manager InfinityFree

## 📋 Étape 1 : Reset htdocs

1. Connectez-vous au panneau InfinityFree
2. Allez dans **File Manager**
3. Allez dans `htdocs`
4. **Supprimez TOUS les fichiers** (reset complet)

---

## 📋 Étape 2 : Uploader les fichiers

### Fichiers racine (dans `htdocs/`) :

Uploadez ces fichiers directement dans `htdocs/` :

1. ✅ `api/config.php`
2. ✅ `api/.htaccess.simple` → **Renommez-le en `.htaccess`** après l'upload
3. ✅ `api/stats.php`
4. ✅ `api/database.sql` (optionnel, déjà importé normalement)

### Dossier `auth/` :

1. Créez le dossier `auth` dans `htdocs/`
2. Uploadez ces fichiers dans `htdocs/auth/` :
   - ✅ `api/auth/login.php`
   - ✅ `api/auth/register.php`
   - ✅ `api/auth/me.php`
   - ✅ `api/auth/logout.php`

### Dossier `admin/` :

1. Créez le dossier `admin` dans `htdocs/`
2. Uploadez ces fichiers dans `htdocs/admin/` :
   - ✅ `api/admin/settings.php`
   - ✅ `api/admin/stats.php`
   - ✅ `api/admin/users.php`
   - ✅ `api/admin/logs.php`
   - ✅ `api/admin/toggle_user.php`

---

## 📋 Structure finale dans `htdocs/`

```
htdocs/
├── config.php
├── .htaccess          ← Renommez .htaccess.simple en .htaccess
├── stats.php
├── database.sql       (optionnel)
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

---

## ⚠️ Important

1. **Renommez `.htaccess.simple` en `.htaccess`** après l'upload
2. Les dossiers `auth/` et `admin/` doivent être créés dans `htdocs/`
3. Tous les fichiers doivent être dans les bons dossiers

---

## ✅ Checklist

- [ ] htdocs reset (vide)
- [ ] `config.php` uploadé dans `htdocs/`
- [ ] `.htaccess.simple` uploadé et renommé en `.htaccess`
- [ ] `stats.php` uploadé dans `htdocs/`
- [ ] Dossier `auth/` créé avec 4 fichiers
- [ ] Dossier `admin/` créé avec 5 fichiers
- [ ] Structure vérifiée

---

**C'est tout ! 🚀**

