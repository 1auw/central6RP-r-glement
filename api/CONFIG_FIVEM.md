# 🎮 Configuration du serveur FiveM

Ce guide vous explique comment configurer la connexion à votre serveur FiveM pour afficher les stats en temps réel.

---

## 📝 Configuration rapide

### Étape 1 : Ouvrir le fichier de configuration

Ouvrez le fichier : **`api/fivem_config.php`**

### Étape 2 : Modifier l'IP et le port

Remplacez les valeurs par défaut :

```php
// IP de votre serveur FiveM
define('FIVEM_IP', '127.0.0.1');  // ← Changez ici avec l'IP de votre serveur

// Port de votre serveur FiveM
define('FIVEM_PORT', '30120');     // ← Changez ici avec le port de votre serveur
```

### Exemples :

**Serveur local (même machine) :**
```php
define('FIVEM_IP', '127.0.0.1');
define('FIVEM_PORT', '30120');
```

**Serveur sur réseau local :**
```php
define('FIVEM_IP', '192.168.1.100');  // IP locale de votre serveur
define('FIVEM_PORT', '30120');
```

**Serveur distant (VPS/Dédié) :**
```php
define('FIVEM_IP', '185.123.45.67');  // IP publique de votre serveur
define('FIVEM_PORT', '30120');
```

---

## 🔍 Comment trouver l'IP et le port de votre serveur ?

### IP du serveur

1. **Serveur local** : Utilisez `127.0.0.1` ou `localhost`
2. **Serveur sur réseau local** : 
   - Sur Windows : Ouvrez CMD et tapez `ipconfig`
   - Sur Linux : Ouvrez Terminal et tapez `ifconfig` ou `ip addr`
   - Cherchez l'adresse IPv4 (ex: `192.168.1.100`)
3. **Serveur VPS/Dédié** : C'est l'IP publique fournie par votre hébergeur

### Port du serveur

Le port par défaut de FiveM est **`30120`**, mais il peut être différent selon votre configuration.

Pour vérifier :
1. Regardez dans votre fichier `server.cfg` de FiveM
2. Cherchez la ligne `endpoint_add_tcp` ou `endpoint_add_udp`
3. Le port est généralement indiqué après l'IP (ex: `0.0.0.0:30120`)

---

## ✅ Vérification

### Test 1 : Vérifier que l'API FiveM est accessible

Ouvrez votre navigateur et allez sur :
```
http://VOTRE_IP:VOTRE_PORT/info.json
```

Exemple :
```
http://127.0.0.1:30120/info.json
```

Vous devriez voir un JSON avec les informations du serveur.

### Test 2 : Vérifier les joueurs en ligne

```
http://VOTRE_IP:VOTRE_PORT/players.json
```

Exemple :
```
http://127.0.0.1:30120/players.json
```

Vous devriez voir un tableau JSON avec la liste des joueurs connectés.

### Test 3 : Vérifier sur le site

1. Allez sur votre site : http://localhost:3001
2. Regardez la section "Stats" en bas de la page
3. Le nombre de joueurs devrait s'afficher correctement

---

## 🔧 Dépannage

### Problème : "0 joueurs" s'affiche alors que le serveur est en ligne

**Solutions :**
1. Vérifiez que l'IP et le port sont corrects dans `fivem_config.php`
2. Vérifiez que le serveur FiveM est bien démarré
3. Vérifiez que le port n'est pas bloqué par un firewall
4. Testez l'URL `http://IP:PORT/info.json` dans votre navigateur

### Problème : "Hors ligne" s'affiche

**Solutions :**
1. Vérifiez que le serveur FiveM est démarré
2. Vérifiez que l'API FiveM est activée (par défaut, elle est activée)
3. Vérifiez que le port est correct
4. Si vous êtes sur un VPS, vérifiez que le port est ouvert dans le firewall

### Problème : Timeout ou erreur de connexion

**Solutions :**
1. Augmentez le timeout dans `fivem_config.php` :
   ```php
   define('FIVEM_TIMEOUT', 5);  // Augmentez à 5 secondes
   ```
2. Vérifiez que cURL est activé sur votre serveur PHP
3. Vérifiez que le serveur FiveM accepte les connexions HTTP

---

## 🔄 Actualisation automatique

Les stats sont automatiquement mises à jour :
- **À chaque chargement de la page** (quand quelqu'un visite le site)
- **Toutes les 30 secondes** sur la page d'accueil (via JavaScript)

Vous pouvez aussi créer un **cron job** pour mettre à jour les stats régulièrement :

```bash
# Toutes les minutes
* * * * * curl http://localhost/central6/api/fetch_fivem_stats.php
```

---

## 📚 API FiveM

L'API FiveM expose plusieurs endpoints :

- **`/info.json`** - Informations du serveur (nom, max players, etc.)
- **`/players.json`** - Liste des joueurs connectés
- **`/dynamic.json`** - Informations dynamiques
- **`/players.json?ids=1,2,3`** - Informations sur des joueurs spécifiques

Pour plus d'informations : https://docs.fivem.net/docs/scripting-reference/runtimes/javascript/functions/GetPlayers/

---

## ⚠️ Sécurité

**Important :** Si votre serveur FiveM est accessible depuis Internet :

1. **Ne partagez pas** l'IP et le port publiquement
2. **Protégez** l'accès à l'API FiveM avec un firewall
3. **Limitez** l'accès aux endpoints `/info.json` et `/players.json` si nécessaire

---

**Dernière mise à jour :** 18 novembre 2025

