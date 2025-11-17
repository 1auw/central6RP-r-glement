# ⚡ Déploiement Rapide (5 minutes)

## 🚀 GitHub → Vercel en 3 étapes

### 1️⃣ Pusher sur GitHub

```bash
# Dans PowerShell, dans le dossier du projet :
cd C:\Users\Martin\Documents\programs\central6

# Initialiser Git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Créer un repo sur GitHub puis :
git remote add origin https://github.com/VOTRE-USERNAME/central6rp.git
git push -u origin main
```

### 2️⃣ Déployer sur Vercel

1. Allez sur **[vercel.com](https://vercel.com)**
2. Connectez-vous avec **GitHub**
3. Cliquez **"Add New"** → **"Project"**
4. Sélectionnez votre repo **central6rp**
5. Cliquez **"Deploy"**

### 3️⃣ C'est en ligne ! 🎉

Votre URL : `https://central6rp.vercel.app`

---

## 🔄 Mettre à jour le site

```bash
# Modifiez vos fichiers, puis :
git add .
git commit -m "Mise à jour"
git push
```

**Vercel redéploie automatiquement !** ✨

---

## ⚠️ Checklist avant de déployer

- [ ] `npm run build` fonctionne
- [ ] Vidéo dans `public/videos/hero-bg.mp4`
- [ ] Logo dans `public/logo.png`
- [ ] Liens Discord/FiveM corrects dans `config/site.ts`

---

**Guide complet :** Consultez [DEPLOIEMENT.md](./DEPLOIEMENT.md)

