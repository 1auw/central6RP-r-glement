# 🎯 Guide de Démarrage Rapide - Central 6RP

## ⚡ Installation en 3 étapes

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Personnaliser votre configuration

Ouvrez le fichier **`config/site.ts`** et modifiez :

```typescript
export const siteConfig = {
  name: "Central 6RP",
  description: "Serveur FiveM RolePlay Français",
  
  links: {
    discord: "https://discord.gg/VOTRE-LIEN", // ⚠️ Remplacez ici
    fivem: "fivem://connect/VOTRE-IP",        // ⚠️ Remplacez ici
  },
  
  video: {
    src: "/videos/hero-bg.mp4",
  },
};
```

### 3️⃣ Ajouter votre vidéo

Placez votre vidéo FiveM dans :

```
public/videos/hero-bg.mp4
```

**Recommandations vidéo :**
- Format : MP4
- Résolution : 1920x1080 (Full HD)
- Durée : 10-20 secondes (en boucle)
- Poids : 5-10 MB max
- Audio : Silencieux (muted)
- Contenu : Plans cinématiques de votre serveur FiveM

---

## 🚀 Lancer le projet

### Mode développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

### Build production

```bash
npm run build
npm start
```

---

## 🎨 Personnalisation avancée

### Modifier les couleurs

Éditez **`tailwind.config.ts`** :

```typescript
colors: {
  primary: {
    DEFAULT: '#2a7cff',    // Votre couleur principale
    light: '#5ea3ff',      // Version claire
    neon: '#00d4ff',       // Accent néon
  }
}
```

### Modifier le règlement

Éditez **`components/RulesSection.tsx`** :

Cherchez la variable `rules` et modifiez le contenu :

```typescript
const rules: Rule[] = [
  {
    id: 'general',
    title: 'Général',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    content: [
      'Votre première règle...',
      'Votre deuxième règle...',
      // Ajoutez autant de règles que nécessaire
    ]
  },
  // Ajoutez d'autres catégories...
];
```

### Ajouter/Retirer des catégories

Dans le même fichier, dupliquez ou supprimez des objets dans le tableau `rules`.

---

## 🌐 Déploiement sur Vercel (GRATUIT)

### Étape 1 : Préparer le code

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/central6rp.git
git push -u origin main
```

### Étape 2 : Déployer

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "Import Project"
4. Sélectionnez votre repository
5. Cliquez sur "Deploy"

✅ **Votre site est en ligne en 2 minutes !**

---

## 📱 Vérifier le responsive

Testez votre site sur :
- 📱 Mobile (375px)
- 📱 Tablette (768px)
- 💻 Desktop (1920px)

Dans Chrome DevTools : `F12` → `Ctrl + Shift + M` (toggle device toolbar)

---

## 🎥 Où trouver une bonne vidéo ?

### Option 1 : Enregistrer vous-même
- Utilisez **OBS Studio** ou **Medal.tv**
- Enregistrez des plans cinématiques sur votre serveur
- Éditez avec **DaVinci Resolve** (gratuit)

### Option 2 : Sites de vidéos libres
- [Pexels Videos](https://www.pexels.com/videos/) - Recherchez "gta" ou "city night"
- [Pixabay Videos](https://pixabay.com/videos/)

### Optimiser votre vidéo
Utilisez **HandBrake** (gratuit) pour compresser :
- Format : MP4 (H.264)
- Résolution : 1920x1080
- Framerate : 30fps
- Qualité : RF 23-25
- Audio : Supprimer la piste audio

---

## ❓ Problèmes courants

### La vidéo ne s'affiche pas
- ✅ Vérifiez que le fichier est bien dans `public/videos/hero-bg.mp4`
- ✅ Vérifiez le format (MP4)
- ✅ Redémarrez le serveur de développement (`npm run dev`)

### Les liens Discord/FiveM ne fonctionnent pas
- ✅ Vérifiez `config/site.ts`
- ✅ Le lien Discord doit être une invitation permanente
- ✅ Le lien FiveM doit suivre ce format : `fivem://connect/IP:PORT`

### Le site est lent
- ✅ Compressez votre vidéo (max 10 MB)
- ✅ Utilisez le format MP4 H.264
- ✅ Vérifiez que vous n'avez pas de vidéo en 4K

### Erreur au build
```bash
# Nettoyez et réinstallez
rm -rf node_modules .next
npm install
npm run build
```

---

## 🎓 Structure des fichiers

```
central6rp/
│
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout global
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   └── contact/
│       └── page.tsx       # Page contact
│
├── components/             # Composants React
│   ├── Navbar.tsx         # Navigation
│   ├── Hero.tsx           # Hero avec vidéo
│   └── RulesSection.tsx   # Règlement (accordéons)
│
├── config/
│   └── site.ts            # ⚙️ CONFIGURATION PRINCIPALE
│
├── public/
│   └── videos/
│       └── hero-bg.mp4    # 🎥 VOTRE VIDÉO ICI
│
├── tailwind.config.ts     # Configuration Tailwind
├── package.json           # Dépendances
└── README.md              # Documentation
```

---

## 💡 Conseils Pro

1. **Optimisez votre vidéo** avant de déployer (max 10 MB)
2. **Testez sur mobile** - la majorité de vos visiteurs seront sur téléphone
3. **Utilisez une vraie vidéo** de votre serveur pour l'immersion
4. **Personnalisez le règlement** avec vos vraies règles
5. **Activez HTTPS** sur Vercel (automatique)

---

## 🆘 Besoin d'aide ?

- 📖 Lisez le [README.md](./README.md)
- 🎥 Tutoriel Next.js : [nextjs.org/learn](https://nextjs.org/learn)
- 💬 Documentation Framer Motion : [framer.com/motion](https://www.framer.com/motion/)

---

**Bonne chance avec votre serveur Central 6RP ! 🎮✨**

