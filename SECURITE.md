# 🔐 Sécurité - Central 6RP

Ce document liste toutes les mesures de sécurité implémentées sur le site.

---

## ✅ Mesures de sécurité implémentées

### 1. **Protection contre les attaques courantes**

#### Protection XSS (Cross-Site Scripting)
- ✅ Headers `X-XSS-Protection`
- ✅ Sanitization de toutes les entrées utilisateur
- ✅ `htmlspecialchars()` avec `ENT_QUOTES` sur toutes les données affichées

#### Protection CSRF (Cross-Site Request Forgery)
- ✅ Headers CORS strictes (uniquement localhost en dev)
- ✅ Vérification des origines des requêtes
- ✅ Sessions sécurisées avec `SameSite`

#### Protection SQL Injection
- ✅ Utilisation exclusive de **requêtes préparées** (PDO)
- ✅ Aucune concaténation de requêtes SQL
- ✅ Validation stricte des types de données

#### Protection contre le clickjacking
- ✅ Header `X-Frame-Options: DENY`
- ✅ Impossible d'intégrer le site dans une iframe

---

### 2. **Système de rate limiting**

Protection contre les attaques par force brute :

| Action | Limite | Fenêtre temporelle |
|--------|--------|-------------------|
| **Connexion** | 5 tentatives | 5 minutes |
| **Inscription** | 3 tentatives | 10 minutes |

En cas de dépassement, l'utilisateur est bloqué temporairement.

---

### 3. **Sécurité des mots de passe**

#### Exigences minimales
- ✅ Minimum 8 caractères
- ✅ Au moins 1 majuscule
- ✅ Au moins 1 minuscule
- ✅ Au moins 1 chiffre

#### Stockage
- ✅ Hashage avec **bcrypt** (algorithme PASSWORD_BCRYPT)
- ✅ Sel unique généré automatiquement
- ✅ Impossible de récupérer le mot de passe original

---

### 4. **Sessions sécurisées**

- ✅ Cookie `HttpOnly` (protection XSS)
- ✅ Cookie `SameSite: Lax` (protection CSRF)
- ✅ Cookie `Secure` en production (HTTPS uniquement)
- ✅ Régénération de l'ID de session après connexion
- ✅ Nettoyage automatique des sessions expirées

---

### 5. **Headers de sécurité HTTP**

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [politique stricte]
```

---

### 6. **Protection des fichiers sensibles**

#### Fichiers bloqués via `.htaccess`
- ❌ `.json` (settings.json, config.json, etc.)
- ❌ `.log` (logs d'erreurs)
- ❌ `.sql` (fichiers de base de données)
- ❌ `.bak`, `.old`, `.tmp` (fichiers de sauvegarde)
- ❌ `.ini`, `.config` (fichiers de configuration)

#### Fichiers supprimés (temporaires)
- 🗑️ `create_admin.php` (création de compte admin)
- 🗑️ `promote_to_admin.php` (promotion admin)
- 🗑️ `update_password.php` (changement de mot de passe)

⚠️ **Ces fichiers ne doivent JAMAIS être remis en ligne en production !**

---

### 7. **Validation des données**

#### Côté backend (PHP)
- ✅ Validation de type (int, string, bool)
- ✅ Validation de format (email, URL)
- ✅ Sanitization de toutes les entrées
- ✅ Longueur minimale/maximale

#### Côté frontend (Next.js)
- ✅ Validation des formulaires en temps réel
- ✅ Messages d'erreur clairs
- ✅ Vérification avant envoi au serveur

---

### 8. **Contrôle d'accès**

#### Routes protégées
- 🔒 `/admin/*` - Réservé aux administrateurs uniquement
- 🔒 `/profile` - Utilisateurs connectés uniquement

#### Vérifications
1. Vérification de la session PHP
2. Vérification du rôle utilisateur
3. Validation de l'IP (rate limiting)
4. Logs de toutes les actions admin

---

### 9. **Logs et audits**

#### Actions loggées
- ✅ Connexions (succès et échecs)
- ✅ Inscriptions
- ✅ Changements de statut utilisateur
- ✅ Actions administrateur
- ✅ Modifications de paramètres

#### Informations enregistrées
- Date et heure
- Utilisateur concerné
- Action effectuée
- Adresse IP
- Détails supplémentaires

---

### 10. **Blocage des bots et scanners**

Via `.htaccess`, blocage automatique des :
- 🚫 User-agents suspects (wget, curl, nikto, etc.)
- 🚫 Méthodes HTTP non autorisées (TRACE, TRACK)
- 🚫 Patterns d'injection SQL dans l'URL
- 🚫 Tentatives d'accès aux répertoires système

---

## 🔧 Configuration pour la production

### Avant de mettre en ligne :

1. **Modifier `config.php`** :
```php
// Passer en mode sécurisé
ini_set('session.cookie_secure', 1);      // Forcer HTTPS
ini_set('session.cookie_samesite', 'Strict'); // Protection CSRF maximale
```

2. **Mettre à jour `.htaccess`** :
```apache
# Changer l'origine CORS
Header set Access-Control-Allow-Origin "https://votre-domaine.com"
```

3. **Variables d'environnement** :
- Changer `DB_PASS` (mot de passe MySQL)
- Changer `SECRET_KEY` (unique et aléatoire)

4. **HTTPS obligatoire** :
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

---

## ⚠️ Checklist de sécurité

Avant de passer en production :

- [ ] Tous les fichiers temporaires sont supprimés
- [ ] Le fichier `settings.json` n'est pas accessible publiquement
- [ ] HTTPS est activé et forcé
- [ ] Les mots de passe de la BDD sont forts et uniques
- [ ] Le mode debug PHP est désactivé
- [ ] Les logs d'erreurs sont dans un fichier séparé (pas affichés)
- [ ] Un système de backup automatique est en place
- [ ] Les mises à jour de sécurité sont planifiées

---

## 📞 En cas de problème de sécurité

Si vous découvrez une faille de sécurité :

1. **Ne pas la divulguer publiquement**
2. Contacter l'administrateur immédiatement
3. Fournir un maximum de détails
4. Attendre le correctif avant de révéler la faille

---

## 📚 Ressources supplémentaires

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Best Practices](https://www.php.net/manual/fr/security.php)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)

---

**Dernière mise à jour :** 18 novembre 2025  
**Version :** 1.0.0

