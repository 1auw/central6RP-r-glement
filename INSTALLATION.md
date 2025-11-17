# 🔧 Instructions d'Installation

## ⚠️ Erreurs TypeScript normales

Si vous voyez des erreurs TypeScript avant l'installation, **c'est normal** !

Les erreurs comme :
- `Cannot find module 'framer-motion'`
- `Cannot find module 'lucide-react'`
- `Cannot find module 'next/link'`

...disparaîtront automatiquement après l'installation des dépendances.

---

## 📦 Installation Complète

### Étape 1 : Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

⏱️ **Durée : 1-2 minutes**

Cela va installer :
- Next.js
- React
- TailwindCSS
- Framer Motion
- Lucide React
- TypeScript
- Et toutes les autres dépendances

### Étape 2 : Vérifier l'installation

Une fois terminé, vérifiez qu'il n'y a plus d'erreurs :

```bash
npm run dev
```

Si le serveur démarre et que vous voyez :

```
✓ Ready in X ms
○ Local: http://localhost:3000
```

✅ **L'installation est réussie !**

---

## 🎯 Ordre d'exécution recommandé

1. **Installer** (obligatoire)
   ```bash
   npm install
   ```

2. **Configurer** (obligatoire)
   - Éditez `config/site.ts`
   - Ajoutez votre vidéo dans `public/videos/hero-bg.mp4`

3. **Tester en local** (recommandé)
   ```bash
   npm run dev
   ```
   Ouvrez http://localhost:3000

4. **Personnaliser** (optionnel)
   - Modifiez le règlement
   - Changez les couleurs
   - Ajustez les textes

5. **Build de production** (avant déploiement)
   ```bash
   npm run build
   ```
   
   Si ça passe sans erreur, vous êtes prêt à déployer !

6. **Déployer** (final)
   - Push sur GitHub
   - Déployer sur Vercel

---

## 🐛 Résolution de problèmes

### Erreur : `npm` n'est pas reconnu

❌ **Problème :** Node.js n'est pas installé

✅ **Solution :** 
1. Téléchargez Node.js sur [nodejs.org](https://nodejs.org)
2. Installez la version LTS (recommandée)
3. Redémarrez votre terminal
4. Vérifiez : `node --version`

### Erreur : `EACCES` ou permissions

❌ **Problème :** Permissions insuffisantes

✅ **Solution :**
```bash
# Sur Windows (PowerShell en admin)
npm install

# Sur Mac/Linux
sudo npm install
```

### Erreur pendant `npm install`

❌ **Problème :** Cache corrompu ou connexion internet

✅ **Solution :**
```bash
# Nettoyer le cache
npm cache clean --force

# Réessayer
npm install
```

### Le serveur ne démarre pas

❌ **Problème :** Port 3000 déjà utilisé

✅ **Solution :**
```bash
# Utilisez un autre port
npm run dev -- -p 3001
```

Puis ouvrez http://localhost:3001

### Erreurs TypeScript après installation

❌ **Problème :** Rare, mais peut arriver

✅ **Solution :**
```bash
# Supprimer node_modules et .next
rm -rf node_modules .next

# Réinstaller
npm install

# Rebuild
npm run dev
```

### La vidéo ne s'affiche pas

❌ **Problème :** Chemin ou format incorrect

✅ **Vérifications :**
1. Le fichier est bien dans `public/videos/hero-bg.mp4` ?
2. Le fichier est bien au format MP4 ?
3. Le nom du fichier est exactement `hero-bg.mp4` (pas de majuscule) ?
4. Redémarrez le serveur : `Ctrl+C` puis `npm run dev`

---

## ✅ Checklist post-installation

Après `npm install`, vérifiez que :

- [ ] Aucune erreur dans le terminal
- [ ] `node_modules/` existe
- [ ] `package-lock.json` a été créé
- [ ] `npm run dev` démarre sans erreur
- [ ] http://localhost:3000 s'ouvre dans le navigateur
- [ ] Vous voyez le site (même sans vidéo)

Si tout est ✅, vous êtes prêt à personnaliser !

---

## 🚀 Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build de production
npm run build

# Lancer la version de production
npm start

# Linter le code
npm run lint

# Nettoyer et réinstaller
rm -rf node_modules .next && npm install
```

---

## 📊 Taille attendue après installation

Après `npm install`, vous devriez avoir :

- **node_modules/** : ~300-500 MB (normal)
- **package-lock.json** : ~500 KB
- **.next/** (après `npm run dev`) : ~50-100 MB

Si vous voyez ces tailles, tout est normal ! 👍

---

## 💡 Prochaines étapes

Une fois l'installation terminée, consultez :

1. 📖 [QUICKSTART.md](./QUICKSTART.md) - Démarrage en 5 min
2. 🎨 [PERSONNALISATION.md](./PERSONNALISATION.md) - Personnaliser le site
3. 📚 [GUIDE.md](./GUIDE.md) - Guide complet

---

**Installation terminée ? Let's go ! 🎮**

