# 🔍 Vérification de l'Emplacement des Fichiers

## ❌ Problème : Erreur 404

Le fichier `test_connection.php` n'est pas trouvé. Vérifions où il se trouve exactement.

---

## ✅ Vérifications à Faire

### 1. Où sont les fichiers dans le File Manager ?

Dans le File Manager d'InfinityFree, vérifiez :

**Option A : Fichiers dans `/htdocs/` directement**
- Chemin : `Home / htdocs / test_connection.php`
- URL à utiliser : `https://central6rp.rf.gd/test_connection.php`

**Option B : Fichiers dans `/htdocs/api/`**
- Chemin : `Home / htdocs / api / test_connection.php`
- URL à utiliser : `https://central6rp.rf.gd/api/test_connection.php`

---

### 2. Vérifier le nom exact du fichier

Le serveur est **sensible à la casse** ! Vérifiez que le nom est exactement :
- `test_connection.php` ✅
- Pas `Test_Connection.php` ❌
- Pas `test_Connection.php` ❌

---

### 3. Test avec un fichier simple

Créez un fichier `/htdocs/test.php` (directement dans htdocs) :

```php
<?php
echo "Test OK";
?>
```

Testez : `https://central6rp.rf.gd/test.php`

Si ça fonctionne, le problème vient de l'emplacement de `test_connection.php`.

---

### 4. Lister les fichiers dans le File Manager

Dans le File Manager :
1. Allez dans `/htdocs/`
2. Listez tous les fichiers PHP que vous voyez
3. Dites-moi quels fichiers sont dans `/htdocs/` et lesquels sont dans `/htdocs/api/`

---

## 🔧 Solutions

### Solution A : Si les fichiers sont dans `/htdocs/api/`

Si vos fichiers sont dans `/htdocs/api/`, utilisez cette URL :
```
https://central6rp.rf.gd/api/test_connection.php
```

Et mettez à jour `lib/api-config.ts` :
```typescript
export const API_URL = 'https://central6rp.rf.gd/api';
```

---

### Solution B : Si les fichiers sont dans `/htdocs/` directement

Si vos fichiers sont directement dans `/htdocs/`, utilisez cette URL :
```
https://central6rp.rf.gd/test_connection.php
```

Et gardez `lib/api-config.ts` comme actuellement :
```typescript
export const API_URL = 'https://central6rp.rf.gd';
```

---

## 📝 Checklist

- [ ] J'ai vérifié où se trouve `test_connection.php` dans le File Manager
- [ ] J'ai vérifié que le nom du fichier est exactement `test_connection.php` (minuscules)
- [ ] J'ai testé `https://central6rp.rf.gd/test.php` (fichier simple dans htdocs)
- [ ] Je sais si mes fichiers sont dans `/htdocs/` ou `/htdocs/api/`

