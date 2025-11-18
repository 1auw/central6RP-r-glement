# ✅ CHECKLIST COMPLÈTE - Central6RP

## 📋 Ce dont j'ai besoin pour que tout fonctionne parfaitement

---

## 1. 🔧 CONFIGURATION SERVEUR PHP/MYSQL

### ✅ À faire maintenant (URGENT)

**Copier les fichiers API dans XAMPP :**

1. Ouvrez l'explorateur de fichiers
2. Allez dans : `C:\Users\Martin\Documents\programs\central6\api\`
3. Copiez TOUT le dossier `api`
4. Collez-le dans : `C:\xampp\htdocs\central6\`

**Structure finale attendue :**
```
C:\xampp\htdocs\
└── central6\
    └── api\
        ├── config.php
        ├── stats.php
        ├── database.sql
        ├── .htaccess
        ├── README.md
        └── auth\
            ├── register.php
            ├── login.php
            ├── logout.php
            └── me.php
```

**Testez ensuite :**
- http://localhost/central6/api/stats.php
- Vous devriez voir du JSON avec les stats

---

## 2. 🎨 ASSETS & MÉDIAS

### Logo
- ❓ **Avez-vous un logo ?**
  - Format recommandé : PNG transparent, 500x500px minimum
  - Nom : `logo.png`
  - À placer dans : `public/logo.png`

### Vidéo de fond (Hero)
- ❓ **Avez-vous une vidéo ?**
  - Format : MP4
  - Recommandé : 1920x1080, max 10MB
  - Nom : `hero-bg.mp4`
  - À placer dans : `public/videos/hero-bg.mp4`
  - **OU** utilisez une image statique dans `public/images/hero-fallback.jpg`

---

## 3. 🔗 LIENS & INFORMATIONS

### Discord
- ✅ **Lien Discord configuré ?**
  - Actuellement : `https://discord.gg/central6rp`
  - À modifier dans : `config/site.ts` ligne 13

### FiveM
- ✅ **Adresse FiveM mise à jour !**
  - Configuré : `fivem://connect/cfx.re/join/drvao5`

### Réseaux sociaux (Footer)
- ❓ **Twitter** : Avez-vous un compte ?
- ❓ **YouTube** : Avez-vous une chaîne ?
- ❓ **Twitch** : Avez-vous un compte ?

---

## 4. 📝 CONTENU DU SITE

### Règles du serveur
- ✅ **Règles de base** : Déjà présentes (Général, Event, Staff, Légal, Illégal, Cheat)
- ❓ **Voulez-vous modifier les règles ?**
  - Fichier : `components/RulesSection.tsx` lignes 29-132

### Événements
- ✅ **Événements d'Hiver** : Configurés
- ❓ **Voulez-vous changer les événements ?**
  - Fichier : `components/EventsSection.tsx`

### Section "Pourquoi Central6RP ?"
- ✅ **6 cartes** : Déjà configurées
- ❓ **Texte à personnaliser ?**
  - Fichier : `components/WhySection.tsx`

---

## 5. 🎮 CONNEXION SERVEUR FIVEM

### Stats en temps réel (optionnel mais recommandé)
Pour afficher le nombre de joueurs réellement en ligne :

❓ **Avez-vous accès au serveur FiveM ?**
- Si OUI : Je peux créer un script qui update automatiquement la BDD
- Si NON : Les stats resteront statiques (0 joueurs)

**Script à créer :**
```lua
-- resources/[central6rp]/stats-updater/server.lua
-- Met à jour le nombre de joueurs dans la BDD MySQL
```

---

## 6. 👥 PAGES UTILISATEURS

### Pages à créer
- ❓ **Page Inscription** (`/register`)
- ❓ **Page Connexion** (`/login`)
- ❓ **Page Profil** (`/profile`)
- ❓ **Page Boutique** (`/boutique`)
- ❓ **Page Forum** (`/forum`)

**Voulez-vous que je les crée maintenant ?**

---

## 7. 🛡️ SÉCURITÉ & PRODUCTION

### Configuration de sécurité
- [ ] Changer le mot de passe admin (admin123 → nouveau mot de passe)
- [ ] Générer une vraie `SECRET_KEY` dans `api/config.php`
- [ ] Activer HTTPS en production
- [ ] Configurer les CORS pour le domaine de production

### Hébergement
- ❓ **Avez-vous un hébergeur ?**
  - Nom de l'hébergeur ?
  - Type : VPS, Shared hosting, Dédiée ?
- ❓ **Avez-vous un nom de domaine ?**
  - Exemple : central6rp.fr

---

## 8. 📧 EMAILS & NOTIFICATIONS

### Système d'emails (optionnel)
- ❓ **Voulez-vous envoyer des emails ?**
  - Confirmation d'inscription
  - Réinitialisation de mot de passe
  - Notifications

Si OUI, j'aurais besoin de :
- Serveur SMTP (Gmail, SendGrid, Mailgun, etc.)
- Identifiants SMTP

---

## 9. 💳 BOUTIQUE EN LIGNE (optionnel)

### Paiements
- ❓ **Voulez-vous une boutique avec vrais paiements ?**

Si OUI :
- **Stripe** : Clé publique + clé secrète
- **PayPal** : Client ID + Secret

---

## 10. 📊 ANALYTICS & SUIVI

### Google Analytics / Matomo
- ❓ **Voulez-vous tracker les visiteurs ?**
  - ID Google Analytics ?
  - Ou installation Matomo ?

---

## ⚡ ACTIONS IMMÉDIATES POUR DÉBLOQUER

### 1. Copiez les fichiers API
```
De : C:\Users\Martin\Documents\programs\central6\api\
Vers : C:\xampp\htdocs\central6\api\
```

### 2. Testez l'API
Ouvrez : http://localhost/central6/api/stats.php

### 3. Vérifiez le site
Allez sur : http://localhost:3001

Les stats devraient afficher **1+** membres inscrits.

---

## 📌 RÉSUMÉ : CE QUE VOUS DEVEZ ME FOURNIR

### Obligatoire pour fonctionner :
- [x] Adresse FiveM ✅ (fait : cfx.re/join/drvao5)
- [x] Base de données MySQL ✅ (créée)
- [ ] Fichiers API dans XAMPP ⚠️ (À FAIRE)

### Recommandé :
- [ ] Logo (PNG)
- [ ] Vidéo de fond (MP4)
- [ ] Lien Discord réel
- [ ] Liens réseaux sociaux

### Optionnel :
- [ ] Accès serveur FiveM (stats en temps réel)
- [ ] Clés de paiement (boutique)
- [ ] Serveur SMTP (emails)
- [ ] Analytics ID

---

## 🚀 PROCHAINES ÉTAPES

Une fois que vous aurez copié les fichiers API :
1. Je vérifierai que les stats s'affichent
2. Je créerai les pages register/login/profile
3. Je configurerai le reste selon vos besoins

**Confirmez-moi quand les fichiers API sont copiés dans XAMPP !**

