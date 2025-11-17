# 🚀 Guide de Déploiement - GitHub + Vercel

## 📋 Prérequis

- ✅ Compte GitHub (gratuit)
- ✅ Compte Vercel (gratuit)
- ✅ Git installé sur votre PC

---

## 🎯 Étape 1 : Préparer le projet

### Vérifier que tout fonctionne

```bash
npm run build
```

Si ça passe sans erreur, vous êtes prêt ! ✅

---

## 📦 Étape 2 : GitHub

### A. Créer un repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert)
3. Nom du repo : `central6rp-website` (ou autre)
4. Description : "Site officiel Central 6RP - Règlement"
5. **Public** ou **Private** (au choix)
6. ❌ **NE PAS** cocher "Add README"
7. Cliquez sur **"Create repository"**

### B. Initialiser Git localement

Ouvrez PowerShell dans le dossier du projet :

```bash
cd C:\Users\Martin\Documents\programs\central6
```

Puis exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Site Central 6RP"

# Renommer la branche en main
git branch -M main

# Ajouter l'origine (REMPLACEZ par VOTRE URL)
git remote add origin https://github.com/VOTRE-USERNAME/central6rp-website.git

# Pusher le code
git push -u origin main
```

**⚠️ Remplacez** `VOTRE-USERNAME` par votre nom d'utilisateur GitHub !

### C. Si Git demande vos identifiants

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"
```

---

## 🌐 Étape 3 : Vercel

### A. Connexion

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Login"**
3. Connectez-vous avec **GitHub**

### B. Importer le projet

1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez votre repository **central6rp-website**
3. Cliquez sur **"Import"**

### C. Configuration (automatique)

Vercel détecte automatiquement Next.js :

- **Framework Preset** : Next.js ✅
- **Build Command** : `npm run build` ✅
- **Output Directory** : `.next` ✅

**Laissez tout par défaut !**

### D. Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes ⏱️
3. **C'est en ligne !** 🎉

---

## 🎊 Résultat

Vercel vous donnera une URL :

```
https://central6rp-website.vercel.app
```

**Votre site est maintenant accessible au monde entier ! 🌍**

---

## 🔧 Mises à jour futures

Pour mettre à jour le site :

```bash
# 1. Faites vos modifications

# 2. Commitez
git add .
git commit -m "Description des changements"

# 3. Pushez
git push
```

**Vercel redéploie automatiquement !** ✨

---

## 🌟 Domaine personnalisé (optionnel)

### Sur Vercel :

1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `central6rp.fr`)
3. Suivez les instructions DNS
4. Activez SSL (automatique)

---

## ⚠️ Avant de déployer

### Checklist finale :

- [ ] `config/site.ts` : Liens Discord et FiveM corrects
- [ ] Vidéo ajoutée dans `public/videos/hero-bg.mp4`
- [ ] Logo ajouté dans `public/logo.png`
- [ ] `npm run build` passe sans erreur
- [ ] Règlement personnalisé
- [ ] Testé sur mobile

---

## 🐛 Problèmes courants

### "git : The term 'git' is not recognized"

→ Installez Git : [git-scm.com](https://git-scm.com/download/win)

### "Support for password authentication was removed"

→ Utilisez un **Personal Access Token** :
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Cochez `repo`
4. Utilisez le token comme mot de passe

### Erreur au build sur Vercel

→ Vérifiez les logs dans Vercel
→ Vérifiez que `npm run build` fonctionne localement

---

## 📊 Statistiques Vercel (gratuit)

- ✅ Déploiements illimités
- ✅ 100 GB de bande passante/mois
- ✅ SSL automatique
- ✅ CDN mondial
- ✅ Analytics de base

**Largement suffisant pour votre site ! 🎯**

---

## 🎯 Commandes Git utiles

```bash
# Voir le statut
git status

# Voir l'historique
git log --oneline

# Annuler les modifications
git checkout .

# Créer une branche
git checkout -b nouvelle-branche

# Revenir à main
git checkout main
```

---

## 📞 Support

Des questions ? Consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Git](https://git-scm.com/doc)
- [Documentation Next.js](https://nextjs.org/docs)

---

**Bon déploiement ! 🚀**

