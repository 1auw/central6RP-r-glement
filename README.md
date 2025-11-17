# 🎮 Central 6RP - Site Officiel

Site web moderne et animé pour le serveur FiveM RolePlay **Central 6RP**.

---

## 🚀 PREMIÈRE FOIS ICI ?

👉 **Lisez [START_HERE.md](./START_HERE.md)** pour commencer !

---

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TailwindCSS** - Design system moderne
- **Framer Motion** - Animations fluides
- **TypeScript** - Type safety
- **Lucide React** - Icônes modernes

## ✨ Fonctionnalités

- 🎥 **Vidéo background** avec effet parallax
- 🎨 **Design sombre et moderne** avec glassmorphism
- ⚡ **Animations fluides** avec Framer Motion
- 📱 **Responsive** - Compatible mobile, tablette et desktop
- 🎯 **Accordéons animés** pour le règlement
- 🔵 **Thème bleu néon** personnalisé
- 🎭 **Navigation smooth** entre les sections

## 📦 Installation rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Personnaliser votre configuration

**Fichier : `config/site.ts`**

```typescript
export const siteConfig = {
  links: {
    discord: "https://discord.gg/central6rp",  // ⚠️ Remplacez par votre lien
    fivem: "fivem://connect/central6rp.fr",    // ⚠️ Remplacez par votre IP
  },
};
```

### 3. Ajouter votre vidéo

Placez votre vidéo FiveM dans `/public/videos/hero-bg.mp4`

> **Recommandations** : MP4, 1920x1080, 10-20 secondes, max 10 MB

---

## 📚 Documentation complète

- 📖 **[GUIDE.md](./GUIDE.md)** - Guide de démarrage rapide
- 🎨 **[PERSONNALISATION.md](./PERSONNALISATION.md)** - Guide de personnalisation détaillé
- 💡 Lisez ces guides avant de déployer !

## 🎬 Lancement

### Mode développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build production :

```bash
npm run build
npm start
```

## 🌐 Déploiement sur Vercel

1. **Push votre code sur GitHub**

2. **Connectez-vous sur [Vercel](https://vercel.com)**

3. **Importez votre repository**

4. **Déployez** (Vercel détecte automatiquement Next.js)

Votre site sera en ligne en quelques secondes ! ⚡

## 📂 Structure du projet

```
central6rp/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   ├── globals.css         # Styles globaux
│   └── contact/
│       └── page.tsx        # Page contact
├── components/
│   ├── Navbar.tsx          # Navigation avec glassmorphism
│   ├── Hero.tsx            # Hero avec vidéo + parallax
│   └── RulesSection.tsx    # Section règlement avec accordéons
├── public/
│   └── videos/
│       └── hero-bg.mp4     # 🎥 AJOUTEZ VOTRE VIDÉO ICI
├── tailwind.config.ts      # Configuration Tailwind
├── next.config.mjs         # Configuration Next.js
└── package.json
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :

```typescript
primary: '#2a7cff',        // Bleu principal
primary-light: '#5ea3ff',  // Bleu clair
primary-neon: '#00d4ff',   // Cyan néon
```

### Règlement

Modifiez le contenu dans `components/RulesSection.tsx` (variable `rules`)

### Polices

Police actuelle : **Poppins** (Google Fonts)

Pour changer : modifiez l'import dans `app/globals.css`

## 📝 Pages

- **/** - Accueil avec hero animé + règlement en accordéons
- **/contact** - Page de contact avec bouton Discord

## 🎯 Checklist de déploiement

- [ ] Modifier `config/site.ts` avec vos liens Discord et FiveM
- [ ] Ajouter votre vidéo dans `/public/videos/hero-bg.mp4`
- [ ] Personnaliser le règlement dans `components/RulesSection.tsx`
- [ ] Tester sur mobile et desktop
- [ ] Build de production sans erreur (`npm run build`)
- [ ] Déployer sur Vercel

## 💡 Ressources utiles

- 🎥 [Comment optimiser votre vidéo](./GUIDE.md#-où-trouver-une-bonne-vidéo)
- 🎨 [Changer les couleurs du site](./PERSONNALISATION.md#-4-changer-les-couleurs-du-site)
- 📜 [Personnaliser le règlement](./PERSONNALISATION.md#-3-personnaliser-le-règlement)
- 🚀 [Déployer sur Vercel](./GUIDE.md#-déploiement-sur-vercel-gratuit)

## 🛠️ Support

Des questions ? Consultez les guides :
- **Débutant** : Lisez [GUIDE.md](./GUIDE.md)
- **Personnalisation** : Lisez [PERSONNALISATION.md](./PERSONNALISATION.md)

---

**Fait avec ❤️ pour Central 6RP**

