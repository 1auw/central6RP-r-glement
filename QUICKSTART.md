# ⚡ Démarrage Ultra-Rapide (5 minutes)

## 🎯 Pour les pressés

### 1️⃣ Installation (30 secondes)

```bash
npm install
```

### 2️⃣ Configuration (2 minutes)

Ouvrez **`config/site.ts`** et changez ces 2 lignes :

```typescript
discord: "https://discord.gg/VOTRE-LIEN",  // ⚠️ ICI
fivem: "fivem://connect/VOTRE-IP",         // ⚠️ ICI
```

### 3️⃣ Vidéo (2 minutes)

Placez votre vidéo MP4 dans :

```
public/videos/hero-bg.mp4
```

### 4️⃣ Lancement (10 secondes)

```bash
npm run dev
```

Ouvrez **http://localhost:3000** 🎉

---

## 🚀 Déploiement Express (2 minutes)

### Sur Vercel (GRATUIT)

```bash
# 1. Push sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/central6rp.git
git push -u origin main

# 2. Allez sur vercel.com
# 3. Import project → Sélectionnez votre repo → Deploy
```

✅ **C'est en ligne !**

---

## 📝 Ce qui est DÉJÀ fait pour vous

✅ Design sombre et moderne  
✅ Animations fluides  
✅ Responsive mobile/desktop  
✅ Navbar avec glassmorphism  
✅ Hero avec vidéo + parallax  
✅ Règlement avec accordéons  
✅ Page de contact  
✅ Optimisé pour Vercel  

---

## 🎨 Personnalisation (OPTIONNEL)

### Changer les couleurs

**Fichier : `tailwind.config.ts`**

```typescript
primary: '#2a7cff',  // Votre couleur principale
```

### Modifier le règlement

**Fichier : `components/RulesSection.tsx`**

Ligne ~13, variable `rules` → Modifiez le texte

---

## 📚 Plus d'infos ?

- **Débutant** : [GUIDE.md](./GUIDE.md)
- **Personnalisation** : [PERSONNALISATION.md](./PERSONNALISATION.md)
- **Documentation** : [README.md](./README.md)

---

**C'est parti ! 🎮**

