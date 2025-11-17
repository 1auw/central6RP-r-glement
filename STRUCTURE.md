# 📁 Structure du Projet Central 6RP

## 🗂️ Vue d'ensemble

```
central6rp/
│
├── 📄 Fichiers de configuration
│   ├── package.json           # Dépendances npm
│   ├── tsconfig.json          # Configuration TypeScript
│   ├── tailwind.config.ts     # Configuration Tailwind CSS
│   ├── next.config.mjs        # Configuration Next.js
│   ├── postcss.config.mjs     # Configuration PostCSS
│   └── .gitignore             # Fichiers à ignorer par Git
│
├── 📚 Documentation
│   ├── README.md              # Documentation principale
│   ├── QUICKSTART.md          # Démarrage rapide (5 min)
│   ├── GUIDE.md               # Guide détaillé
│   ├── PERSONNALISATION.md    # Guide de personnalisation
│   └── STRUCTURE.md           # Ce fichier !
│
├── 🎨 Application (app/)
│   ├── layout.tsx             # Layout global (inclut Navbar)
│   ├── page.tsx               # Page d'accueil (/)
│   ├── globals.css            # Styles globaux
│   └── contact/
│       └── page.tsx           # Page de contact (/contact)
│
├── 🧩 Composants (components/)
│   ├── Navbar.tsx             # Navigation avec glassmorphism
│   ├── Hero.tsx               # Hero avec vidéo + effet parallax
│   └── RulesSection.tsx       # Section règlement avec accordéons
│
├── ⚙️ Configuration (config/)
│   └── site.ts                # ⚠️ CONFIGURATION PRINCIPALE
│                              #    Modifiez Discord + FiveM ici !
│
└── 🌐 Assets publics (public/)
    └── videos/
        └── hero-bg.mp4        # 🎥 PLACEZ VOTRE VIDÉO ICI
```

---

## 🔧 Fichiers à modifier OBLIGATOIREMENT

### 1️⃣ `config/site.ts` ⚠️ IMPORTANT

**Pourquoi :** Contient les liens Discord et FiveM

**Quoi modifier :**
```typescript
links: {
  discord: "...",  // Votre lien Discord
  fivem: "...",    // Votre IP FiveM
}
```

### 2️⃣ `public/videos/hero-bg.mp4` 🎥 IMPORTANT

**Pourquoi :** Vidéo de fond du hero

**Format :** MP4, 1920x1080, max 10 MB

---

## 📝 Fichiers à modifier OPTIONNELLEMENT

### `components/RulesSection.tsx`

**Quoi modifier :** Le contenu du règlement (variable `rules`)

**Quand :** Pour personnaliser les règles de votre serveur

### `tailwind.config.ts`

**Quoi modifier :** Les couleurs du thème

**Quand :** Si vous voulez changer le bleu par une autre couleur

### `app/layout.tsx`

**Quoi modifier :** Le titre et la description du site

**Quand :** Pour le SEO

---

## 🚫 Fichiers à NE PAS modifier

❌ `package.json` (sauf si vous savez ce que vous faites)  
❌ `tsconfig.json`  
❌ `postcss.config.mjs`  
❌ `next.config.mjs`  

---

## 📄 Détail des fichiers clés

### `app/layout.tsx` 
- Layout global de l'application
- Inclut le `<Navbar />` sur toutes les pages
- Définit les métadonnées (titre, description)

### `app/page.tsx`
- Page d'accueil
- Contient `<Hero />` et `<RulesSection />`

### `app/contact/page.tsx`
- Page de contact simple
- Bouton Discord principal

### `components/Navbar.tsx`
- Navigation fixe en haut
- Effet glassmorphism au scroll
- Liens : Règlement, Contact, Discord

### `components/Hero.tsx`
- Hero avec vidéo background
- Effet parallax
- Boutons Discord et FiveM Connect
- Scroll indicator animé

### `components/RulesSection.tsx`
- Section avec accordéons animés
- 5 catégories de règles (modifiable)
- Animations Framer Motion

### `app/globals.css`
- Styles CSS globaux
- Import de la police Poppins
- Classes utilitaires (glass, glow)
- Personnalisation de la scrollbar

### `tailwind.config.ts`
- Configuration des couleurs
- Configuration des animations
- Configuration des fonts

### `config/site.ts`
- **LE PLUS IMPORTANT**
- Centralise tous les liens et configs
- Modifier ce fichier met à jour tout le site

---

## 🎨 Flow d'une page

```
User visite le site
        ↓
app/layout.tsx (charge la Navbar)
        ↓
app/page.tsx (page d'accueil)
        ↓
components/Hero.tsx (hero avec vidéo)
        ↓
components/RulesSection.tsx (règlement)
```

---

## 🔄 Processus de développement

1. **Développement local**
   ```bash
   npm run dev  # Lance le serveur de dev
   ```

2. **Build de production**
   ```bash
   npm run build  # Vérifie qu'il n'y a pas d'erreurs
   ```

3. **Test du build**
   ```bash
   npm start  # Lance la version de production
   ```

4. **Déploiement**
   - Push sur GitHub
   - Deploy sur Vercel

---

## 📦 Dépendances principales

| Package | Usage |
|---------|-------|
| `next` | Framework React |
| `react` | Librairie UI |
| `tailwindcss` | Framework CSS |
| `framer-motion` | Animations |
| `lucide-react` | Icônes |

---

## 🎯 Points d'entrée clés

- **Configuration** → `config/site.ts`
- **Couleurs** → `tailwind.config.ts`
- **Règlement** → `components/RulesSection.tsx`
- **Textes du hero** → `components/Hero.tsx`
- **Navigation** → `components/Navbar.tsx`

---

## 💡 Conseils

- ✅ Modifiez toujours `config/site.ts` en premier
- ✅ Testez sur mobile après chaque changement
- ✅ Committez régulièrement sur Git
- ✅ Faites un build avant de déployer
- ✅ Gardez votre vidéo < 10 MB

---

**Bonne personnalisation ! 🎮**

