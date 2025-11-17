# ✅ Checklist Complète - Central 6RP

## 📋 Vérification des fichiers

Assurez-vous que tous ces fichiers sont présents :

### Configuration
- [x] `package.json` - Dépendances
- [x] `tsconfig.json` - Config TypeScript
- [x] `tailwind.config.ts` - Config Tailwind
- [x] `next.config.mjs` - Config Next.js
- [x] `postcss.config.mjs` - Config PostCSS
- [x] `.gitignore` - Fichiers ignorés par Git

### Documentation
- [x] `START_HERE.md` - Point de départ
- [x] `README.md` - Documentation principale
- [x] `QUICKSTART.md` - Démarrage rapide
- [x] `INSTALLATION.md` - Résolution problèmes
- [x] `GUIDE.md` - Guide complet
- [x] `PERSONNALISATION.md` - Personnalisation
- [x] `STRUCTURE.md` - Architecture
- [x] `CHECKLIST.md` - Ce fichier

### Application
- [x] `app/layout.tsx` - Layout global
- [x] `app/page.tsx` - Page d'accueil
- [x] `app/globals.css` - Styles globaux
- [x] `app/contact/page.tsx` - Page contact

### Composants
- [x] `components/Navbar.tsx` - Navigation
- [x] `components/Hero.tsx` - Hero avec vidéo
- [x] `components/RulesSection.tsx` - Règlement

### Configuration personnalisée
- [x] `config/site.ts` - Config principale

### Assets
- [x] `public/videos/.gitkeep` - Dossier vidéo
- [ ] `public/videos/hero-bg.mp4` - ⚠️ VOTRE VIDÉO À AJOUTER

---

## 🔧 Checklist d'installation

### Avant de commencer
- [ ] Node.js installé (`node --version` >= 18.0.0)
- [ ] npm installé (`npm --version` >= 9.0.0)
- [ ] Git installé (optionnel, pour déploiement)

### Installation
- [ ] Ouvrir le terminal dans le dossier du projet
- [ ] Exécuter `npm install`
- [ ] Attendre la fin (1-2 min)
- [ ] Vérifier que `node_modules/` existe

### Après installation
- [ ] Aucune erreur dans le terminal
- [ ] `package-lock.json` créé
- [ ] Dossier `node_modules/` présent (~400 MB)

---

## ⚙️ Checklist de configuration

### Fichier `config/site.ts`
- [ ] Lien Discord modifié (ligne 10)
- [ ] Lien FiveM modifié (ligne 11)
- [ ] Vérifier que les liens sont corrects

### Exemple correct :
```typescript
links: {
  discord: "https://discord.gg/abcd1234",
  fivem: "fivem://connect/123.456.789.0:30120",
}
```

### Vidéo
- [ ] Vidéo téléchargée/créée
- [ ] Format MP4 vérifié
- [ ] Poids < 10 MB
- [ ] Résolution 1920x1080 (recommandé)
- [ ] Vidéo placée dans `public/videos/hero-bg.mp4`
- [ ] Nom exact : `hero-bg.mp4` (pas de majuscule)

---

## 🧪 Checklist de test

### Test local
- [ ] Exécuter `npm run dev`
- [ ] Attendre "Ready in..."
- [ ] Ouvrir http://localhost:3000
- [ ] Le site se charge

### Test visuel
- [ ] Le hero s'affiche
- [ ] La vidéo joue en boucle
- [ ] Le texte "Central 6RP" est visible
- [ ] Les boutons sont cliquables
- [ ] La navbar est fixe en haut
- [ ] Le scroll est fluide

### Test des boutons
- [ ] Bouton "Règlement" scroll vers le règlement
- [ ] Bouton "Contact" ouvre /contact
- [ ] Bouton "Discord" (navbar) ouvre Discord
- [ ] Bouton "Rejoindre Discord" (hero) ouvre Discord
- [ ] Bouton "Se connecter" ouvre FiveM

### Test des accordéons
- [ ] Cliquer sur "Général" → s'ouvre
- [ ] Cliquer sur "RP / Roleplay" → s'ouvre
- [ ] Cliquer sur "Illégal" → s'ouvre
- [ ] Cliquer sur "Sécurité & Conduite" → s'ouvre
- [ ] Cliquer sur "Interactions joueurs" → s'ouvre
- [ ] Re-cliquer ferme l'accordéon
- [ ] Animations fluides

### Test page contact
- [ ] Aller sur /contact
- [ ] Page se charge
- [ ] Bouton "Retour à l'accueil" fonctionne
- [ ] Bouton Discord fonctionne

### Test responsive
- [ ] Ouvrir DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Tester iPhone SE (375px)
- [ ] Tester iPad (768px)
- [ ] Tester Desktop (1920px)
- [ ] Tout est lisible et cliquable

---

## 🎨 Checklist de personnalisation (optionnel)

### Règlement
- [ ] Ouvrir `components/RulesSection.tsx`
- [ ] Modifier la variable `rules` (ligne ~13)
- [ ] Personnaliser le contenu
- [ ] Tester les modifications

### Couleurs
- [ ] Ouvrir `tailwind.config.ts`
- [ ] Modifier `primary` (ligne ~13)
- [ ] Modifier `primary-neon` (ligne ~16)
- [ ] Tester les nouvelles couleurs

### Textes
- [ ] Modifier le titre dans `components/Hero.tsx`
- [ ] Modifier la description
- [ ] Vérifier l'orthographe

---

## 🏗️ Checklist de build

### Build de production
- [ ] Exécuter `npm run build`
- [ ] Attendre la fin (1-2 min)
- [ ] **AUCUNE ERREUR** dans le terminal
- [ ] Voir "Compiled successfully"

### Si erreurs
- [ ] Lire l'erreur attentivement
- [ ] Vérifier le fichier mentionné
- [ ] Corriger l'erreur
- [ ] Re-exécuter `npm run build`

### Test du build
- [ ] Exécuter `npm start`
- [ ] Ouvrir http://localhost:3000
- [ ] Vérifier que tout fonctionne
- [ ] Stopper avec Ctrl+C

---

## 🚀 Checklist de déploiement

### Préparation Git
- [ ] `git init` (si pas fait)
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] Créer un repo sur GitHub
- [ ] `git remote add origin URL`
- [ ] `git push -u origin main`

### Déploiement Vercel
- [ ] Aller sur vercel.com
- [ ] Se connecter avec GitHub
- [ ] Cliquer "Import Project"
- [ ] Sélectionner le repository
- [ ] Cliquer "Deploy"
- [ ] Attendre (2-3 min)
- [ ] Voir "Deployment Ready"

### Vérification finale
- [ ] Ouvrir l'URL Vercel
- [ ] Le site est en ligne
- [ ] Vidéo se charge
- [ ] Boutons fonctionnent
- [ ] Discord ouvre le bon serveur
- [ ] FiveM Connect fonctionne
- [ ] Tester sur mobile réel

---

## 🎯 Checklist qualité

### Performance
- [ ] Vidéo < 10 MB
- [ ] Images optimisées (si ajoutées)
- [ ] Pas de lag au scroll
- [ ] Animations fluides

### SEO
- [ ] Titre de page correct
- [ ] Description correcte
- [ ] Pas d'erreurs console (F12)

### Accessibilité
- [ ] Textes lisibles
- [ ] Contrastes suffisants
- [ ] Boutons cliquables facilement

### Compatibilité
- [ ] Testé sur Chrome
- [ ] Testé sur Firefox
- [ ] Testé sur Safari (Mac/iPhone)
- [ ] Testé sur Edge

---

## ✅ Validation finale

### Avant de partager le site
- [ ] Tous les liens fonctionnent
- [ ] Vidéo se charge correctement
- [ ] Règlement personnalisé
- [ ] Pas de texte "placeholder"
- [ ] Testé sur mobile
- [ ] Testé sur desktop
- [ ] Build passe sans erreur
- [ ] Déployé sur Vercel
- [ ] URL personnalisée (optionnel)
- [ ] Certificat SSL actif (auto Vercel)

---

## 🎊 Site prêt !

Si toutes les cases sont cochées, **félicitations** ! 🎉

Votre site Central 6RP est prêt à être partagé avec votre communauté !

---

## 📊 Statistiques attendues

Après installation et build :

| Élément | Taille attendue |
|---------|-----------------|
| `node_modules/` | ~400 MB |
| `.next/` (après build) | ~50-100 MB |
| `public/videos/hero-bg.mp4` | < 10 MB |
| **Total projet** | ~500 MB |

### Performance attendue
- **Lighthouse Score** : 90+ / 100
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Cumulative Layout Shift** : < 0.1

---

## 🆘 Problèmes courants

Si une case n'est pas cochée :

| Problème | Solution |
|----------|----------|
| npm install échoue | [INSTALLATION.md](./INSTALLATION.md) |
| Vidéo ne s'affiche pas | Vérifier le chemin et le format |
| Boutons ne fonctionnent pas | Vérifier `config/site.ts` |
| Erreurs au build | Lire l'erreur et corriger |
| Site ne se déploie pas | Vérifier les logs Vercel |

---

**Utilisez cette checklist à chaque étape ! ✅**

