# 🔍 Diagnostic Problème 403 InfinityFree

## ✅ Checklist de Vérification

### 1. Vérifier que le domaine est bien configuré

Dans le panneau InfinityFree :

1. Allez dans **"Domains"**
2. Vérifiez que `central6rp.rf.gd` est bien listé
3. Vérifiez qu'il est **"Active"** ou **"Attached"** à votre compte d'hébergement

**Si le domaine n'est pas attaché :**
- Cliquez sur "Attach Domain" ou "Add Domain"
- Entrez `central6rp.rf.gd`
- Attendez quelques minutes pour la propagation

---

### 2. Vérifier le dossier racine du domaine

Dans le panneau InfinityFree :

1. Allez dans votre compte d'hébergement `if0_40451098`
2. Cherchez **"Domain Settings"** ou **"Document Root"**
3. Vérifiez que le dossier racine est bien `/htdocs/`

**Si ce n'est pas `/htdocs/` :**
- Modifiez-le pour pointer vers `/htdocs/`
- Ou déplacez vos fichiers dans le bon dossier

---

### 3. Vérifier que PHP est activé

InfinityFree active PHP par défaut, mais vérifiez :

1. Dans le panneau, allez dans **"Account Settings"**
2. Cherchez **"PHP Version"** ou **"PHP Settings"**
3. Vérifiez que PHP est activé (généralement PHP 7.4 ou 8.0)

---

### 4. Vérifier la propagation DNS

Le domaine `central6rp.rf.gd` peut ne pas être encore propagé :

1. Testez avec l'URL directe InfinityFree :
   ```
   https://if0_40451098.infinityfreeapp.com/api/simple.php
   ```
   (Remplacez `if0_40451098` par votre vrai préfixe de compte)

2. Si cette URL fonctionne, le problème vient du domaine personnalisé

---

### 5. Vérifier les fichiers dans le File Manager

Dans le File Manager :

1. Naviguez vers `/htdocs/api/`
2. Vérifiez que `simple.php` est bien là
3. Vérifiez les permissions (doivent être 644 ou 755)
4. Vérifiez que le fichier n'est pas vide

---

### 6. Tester avec un fichier HTML

Créez un fichier `/htdocs/test.html` :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <h1>Test HTML</h1>
</body>
</html>
```

Testez : `https://central6rp.rf.gd/test.html`

**Si HTML fonctionne mais pas PHP :**
- Le problème vient de la configuration PHP
- Contactez le support InfinityFree

---

### 7. Vérifier les logs d'erreur

Dans le panneau InfinityFree :

1. Allez dans **"Error Logs"** ou **"Logs"**
2. Vérifiez s'il y a des erreurs récentes
3. Les erreurs peuvent indiquer le problème exact

---

## 🆘 Solutions Alternatives

### Solution A : Utiliser l'URL InfinityFree directement

Au lieu de `central6rp.rf.gd`, utilisez :
```
https://if0_40451098.infinityfreeapp.com/api/simple.php
```

Puis configurez votre frontend Next.js pour utiliser cette URL.

---

### Solution B : Vérifier le domaine dans le panneau

1. Allez dans **"Domains"** dans InfinityFree
2. Cliquez sur `central6rp.rf.gd`
3. Vérifiez qu'il pointe vers le bon compte d'hébergement
4. Si ce n'est pas le cas, attachez-le

---

### Solution C : Attendre la propagation DNS

Si vous venez de configurer le domaine :
- Attendez 24-48 heures pour la propagation DNS complète
- En attendant, utilisez l'URL InfinityFree directe

---

### Solution D : Vérifier le fichier index.php

Créez un fichier `/htdocs/index.php` :

```php
<?php
echo "PHP fonctionne !";
phpinfo();
?>
```

Testez : `https://central6rp.rf.gd/index.php`

Si ça fonctionne, le problème vient du dossier `api/`.

---

## 📞 Contacter le Support

Si rien ne fonctionne :

1. Allez sur le forum InfinityFree : https://forum.infinityfree.com/
2. Créez un sujet avec :
   - Votre domaine : `central6rp.rf.gd`
   - Le problème : "403 Forbidden sur tous les fichiers PHP"
   - Ce que vous avez testé

---

## 🔄 Alternative : Utiliser un autre hébergeur gratuit

Si InfinityFree ne fonctionne pas, vous pouvez essayer :

1. **000webhost** : https://www.000webhost.com/
2. **Freehostia** : https://www.freehostia.com/
3. **AwardSpace** : https://www.awardspace.com/

Ces hébergeurs offrent aussi PHP/MySQL gratuitement.

