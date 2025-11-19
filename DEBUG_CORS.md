# 🔍 Guide de Débogage CORS et Connexion

## ❌ Erreur : "Erreur de connexion au serveur"

Cette erreur peut avoir plusieurs causes. Suivez ce guide pour identifier le problème.

---

## ✅ Checklist de Vérification

### 1. Vérifier que les fichiers sont uploadés sur InfinityFree

Dans le File Manager d'InfinityFree, vérifiez que ces fichiers existent :
- `/htdocs/api/config.php` (avec le nouveau CORS)
- `/htdocs/api/.htaccess` (ou `.htaccess.simple` renommé)
- `/htdocs/api/auth/register.php`
- `/htdocs/api/auth/login.php`

---

### 2. Tester l'URL directement dans le navigateur

Ouvrez votre navigateur et testez directement :

```
https://central6rp.rf.gd/auth/register.php
```

**Si vous voyez :**
- ✅ Un JSON avec `{"success":false,"error":"Méthode non autorisée"}` → Le fichier fonctionne !
- ❌ Une erreur 404 → Le fichier n'existe pas ou est au mauvais endroit
- ❌ Une erreur 403 → Problème de permissions ou `.htaccess`
- ❌ Du HTML/JavaScript → Protection InfinityFree active

---

### 3. Vérifier la console du navigateur

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Console"
3. Essayez de vous inscrire
4. Regardez les messages dans la console :
   - `🔗 URL appelée:` → Vérifiez que l'URL est correcte
   - `📥 Statut réponse:` → Vérifiez le code HTTP
   - `📥 Réponse brute:` → Vérifiez ce que le serveur renvoie

---

### 4. Vérifier l'onglet Network

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Network" (Réseau)
3. Filtrez par "XHR" ou "Fetch"
4. Essayez de vous inscrire
5. Cliquez sur la requête `register.php`
6. Vérifiez :
   - **Status** : Doit être 200 (OK) ou 400 (Bad Request), pas 403 ou 404
   - **Headers** : Vérifiez les headers de la requête
   - **Response** : Vérifiez la réponse du serveur

---

### 5. Vérifier le CORS

Dans l'onglet Network, regardez les headers de réponse :

**Headers attendus :**
```
Access-Control-Allow-Origin: https://central6rp.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Credentials: true
```

**Si ces headers sont absents :**
- Le CORS n'est pas configuré correctement
- Vérifiez `config.php` et `.htaccess` sur InfinityFree

---

### 6. Tester avec curl (optionnel)

Si vous avez accès à un terminal, testez :

```bash
curl -X POST https://central6rp.rf.gd/auth/register.php \
  -H "Content-Type: application/json" \
  -H "Origin: https://central6rp.vercel.app" \
  -d '{"username":"test","email":"test@test.com","password":"test123","password_confirm":"test123"}'
```

**Si ça fonctionne :** Le problème vient du CORS côté navigateur.
**Si ça ne fonctionne pas :** Le problème vient du serveur PHP.

---

## 🔧 Solutions selon l'erreur

### Erreur CORS dans la console

Si vous voyez : `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution :**
1. Vérifiez que `config.php` a été uploadé avec le nouveau CORS
2. Vérifiez que `.htaccess` autorise Vercel
3. Vérifiez que votre URL Vercel correspond exactement (avec ou sans `www`)

---

### Erreur 404

**Solution :**
- Vérifiez que les fichiers sont dans `/htdocs/api/auth/`
- Vérifiez que l'URL dans `lib/api-config.ts` est correcte

---

### Erreur 403

**Solution :**
- Vérifiez les permissions des fichiers (doivent être 644)
- Vérifiez que `.htaccess` n'est pas trop restrictif

---

### Réponse HTML au lieu de JSON

**Solution :**
- La protection InfinityFree est toujours active
- Essayez d'attendre quelques minutes
- Contactez le support InfinityFree

---

## 📝 Informations à me donner

Si le problème persiste, donnez-moi :

1. **L'URL exacte** affichée dans la console (`🔗 URL appelée:`)
2. **Le statut HTTP** (`📥 Statut réponse:`)
3. **La réponse brute** (`📥 Réponse brute:`)
4. **Les erreurs CORS** dans la console (s'il y en a)
5. **Le résultat du test direct** dans le navigateur (`https://central6rp.rf.gd/auth/register.php`)

