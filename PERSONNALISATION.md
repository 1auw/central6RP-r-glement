# 🎨 Guide de Personnalisation Détaillé

## 📋 Checklist de personnalisation

Avant de déployer votre site, voici la checklist complète :

- [ ] Modifier les liens Discord et FiveM dans `config/site.ts`
- [ ] Ajouter votre vidéo dans `public/videos/hero-bg.mp4`
- [ ] Personnaliser le règlement dans `components/RulesSection.tsx`
- [ ] (Optionnel) Changer les couleurs dans `tailwind.config.ts`
- [ ] (Optionnel) Modifier le nom du serveur dans `config/site.ts`
- [ ] Tester sur mobile et desktop
- [ ] Déployer sur Vercel

---

## 🔗 1. Modifier les liens (OBLIGATOIRE)

### Fichier : `config/site.ts`

```typescript
links: {
  discord: "https://discord.gg/central6rp",  // ⚠️ CHANGEZ CECI
  fivem: "fivem://connect/central6rp.fr",    // ⚠️ CHANGEZ CECI
},
```

### Comment obtenir votre lien Discord ?

1. Ouvrez Discord
2. Cliquez droit sur votre serveur
3. "Paramètres du serveur" → "Invitations"
4. "Créer une invitation"
5. **Important** : Réglez "L'invitation expire après" sur **Jamais**
6. Copiez le lien (ex: `https://discord.gg/abcd1234`)

### Format du lien FiveM

```
fivem://connect/IP:PORT
```

**Exemples :**
- `fivem://connect/123.456.789.0:30120`
- `fivem://connect/central6rp.fr:30120`
- `fivem://connect/play.monserveur.fr`

---

## 🎥 2. Vidéo Background

### Où placer la vidéo ?

```
public/videos/hero-bg.mp4
```

### Caractéristiques recommandées

| Paramètre | Valeur recommandée |
|-----------|-------------------|
| **Format** | MP4 (H.264) |
| **Résolution** | 1920x1080 (Full HD) |
| **Durée** | 10-20 secondes |
| **Poids** | 5-10 MB maximum |
| **FPS** | 30 fps |
| **Audio** | Aucun (muted) |

### Compresser une vidéo avec HandBrake

1. Téléchargez [HandBrake](https://handbrake.fr/)
2. Ouvrez votre vidéo
3. **Preset** : "Fast 1080p30"
4. **Dimensions** : 1920 × 1080
5. **Framerate** : 30 FPS constant
6. **Qualité (RF)** : 23-25
7. **Audio** : Supprimer la piste
8. Enregistrez sous `hero-bg.mp4`

### Si vous n'avez pas de vidéo

**Option A : Image fixe temporaire**

Remplacez dans `components/Hero.tsx` :

```typescript
{/* Remplacez la balise <video> par : */}
<div
  className="w-full h-full object-cover bg-cover bg-center"
  style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
/>
```

**Option B : Dégradé temporaire**

```typescript
<div className="w-full h-full bg-gradient-to-br from-primary/30 via-dark-bg to-primary-neon/20" />
```

---

## 📜 3. Personnaliser le règlement

### Fichier : `components/RulesSection.tsx`

Cherchez la variable `rules` (ligne ~13) et modifiez :

```typescript
const rules: Rule[] = [
  {
    id: 'general',              // ID unique (ne pas changer)
    title: 'Général',           // Titre de la catégorie
    icon: Shield,               // Icône (voir liste ci-dessous)
    color: 'from-blue-500 to-blue-600',  // Dégradé de couleur
    content: [
      'Première règle de cette catégorie...',
      'Deuxième règle...',
      'Troisième règle...',
      // Ajoutez autant de paragraphes que nécessaire
    ]
  },
  // Dupliquez ce bloc pour ajouter d'autres catégories
];
```

### Icônes disponibles

Importez depuis `lucide-react` :

```typescript
import { 
  Shield,        // Bouclier
  Users,         // Personnes
  Ban,           // Interdit
  Car,           // Voiture
  MessageSquare, // Message
  AlertTriangle, // Attention
  Sparkles,      // Étoiles
  FileText,      // Document
  Zap,           // Éclair
  Heart,         // Cœur
} from 'lucide-react';
```

### Couleurs disponibles

```typescript
'from-blue-500 to-blue-600'      // Bleu
'from-cyan-500 to-cyan-600'      // Cyan
'from-red-500 to-red-600'        // Rouge
'from-purple-500 to-purple-600'  // Violet
'from-green-500 to-green-600'    // Vert
'from-orange-500 to-orange-600'  // Orange
'from-pink-500 to-pink-600'      // Rose
'from-yellow-500 to-yellow-600'  // Jaune
```

### Exemple complet d'une nouvelle catégorie

```typescript
{
  id: 'economy',
  title: 'Économie',
  icon: Sparkles,
  color: 'from-green-500 to-green-600',
  content: [
    'Les transactions doivent être RP et cohérentes.',
    'Le farm intensif est interdit.',
    'Les prix doivent rester réalistes.',
  ]
}
```

---

## 🎨 4. Changer les couleurs du site

### Fichier : `tailwind.config.ts`

```typescript
colors: {
  primary: {
    DEFAULT: '#2a7cff',    // Couleur principale (boutons, accents)
    light: '#5ea3ff',      // Version claire (hover)
    dark: '#1e5bc4',       // Version sombre
    neon: '#00d4ff',       // Néon/cyan (accents lumineux)
  },
  dark: {
    bg: '#0a0a0f',         // Fond principal
    card: '#12121a',       // Fond des cartes
    lighter: '#1a1a25',    // Fond plus clair
  }
}
```

### Palettes de couleurs suggérées

**Bleu classique (défaut)**
```typescript
primary: '#2a7cff'
neon: '#00d4ff'
```

**Rouge/Orange agressif**
```typescript
primary: '#ff3838'
neon: '#ff6b35'
```

**Violet/Magenta mystique**
```typescript
primary: '#8b5cf6'
neon: '#d946ef'
```

**Vert/Cyan cyberpunk**
```typescript
primary: '#10b981'
neon: '#06b6d4'
```

**Or/Jaune luxe**
```typescript
primary: '#f59e0b'
neon: '#fbbf24'
```

---

## 📝 5. Modifier les textes

### Nom du serveur

**Fichier : `config/site.ts`**

```typescript
name: "Central 6RP",              // Changez ici
description: "Serveur FiveM RolePlay Français",
```

### Titre de la page d'accueil

**Fichier : `components/Hero.tsx`** (ligne ~52)

```typescript
<h1 className="...">
  <span className="...">
    Central 6RP  {/* Changez ici */}
  </span>
</h1>

<h2 className="...">
  Règlement Officiel  {/* Changez ici */}
</h2>

<p className="...">
  Serveur RolePlay Français  {/* Changez ici */}
</p>
```

### Texte des boutons

**Hero (components/Hero.tsx)**

```typescript
Rejoindre Discord  // ligne ~96
Se connecter       // ligne ~107
```

**Navbar (components/Navbar.tsx)**

```typescript
Règlement  // ligne ~49
Contact    // ligne ~57
Discord    // ligne ~78
```

---

## 🔧 6. Options avancées

### Désactiver la vidéo parallax

Si l'effet parallax vous déplaît, dans `components/Hero.tsx` :

```typescript
// Remplacez :
<motion.div style={{ y }} className="...">

// Par :
<div className="...">
```

### Modifier la vitesse du scroll indicator

Dans `components/Hero.tsx` (ligne ~115) :

```typescript
transition={{ duration: 1.5, repeat: Infinity }}
// Changez 1.5 par une autre valeur (plus petit = plus rapide)
```

### Changer la police

**Fichier : `app/globals.css`** (ligne 1)

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
```

Remplacez `Poppins` par :
- `Montserrat`
- `Inter`
- `Roboto`
- `Raleway`
- `Outfit`

Puis dans `tailwind.config.ts` :

```typescript
fontFamily: {
  sans: ['Montserrat', 'sans-serif'],  // Changez ici
},
```

### Ajouter une nouvelle page

1. Créez `app/nouvelle-page/page.tsx` :

```typescript
export default function NouvellePage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Nouvelle Page</h1>
      </div>
    </main>
  );
}
```

2. Ajoutez un lien dans `components/Navbar.tsx` :

```typescript
<Link href="/nouvelle-page">
  <motion.button {...}>
    Nouvelle Page
  </motion.button>
</Link>
```

---

## 🚀 7. Optimisations avant déploiement

### Compresser les assets

- ✅ Vidéo < 10 MB
- ✅ Images optimisées (WebP si possible)

### Tester les performances

```bash
npm run build
```

Vérifiez qu'il n'y a pas d'erreurs.

### Tester sur différents appareils

- 📱 iPhone (Safari)
- 📱 Android (Chrome)
- 💻 Desktop (Chrome, Firefox, Edge)

### Vérifier les liens

- [ ] Discord fonctionne
- [ ] FiveM Connect fonctionne
- [ ] Navigation fluide
- [ ] Scroll smooth

---

## ✅ Validation finale

Avant de déployer, testez :

1. **Navbar** : Tous les liens fonctionnent
2. **Hero** : Vidéo se charge et joue en boucle
3. **Boutons** : Discord et FiveM ouvrent les bons liens
4. **Accordéons** : S'ouvrent et se ferment correctement
5. **Page Contact** : Bouton Discord fonctionne
6. **Mobile** : Tout est responsive
7. **Animations** : Fluides et sans lag

---

**Votre site est maintenant prêt ! 🎉**

