# 🎬 Guide d'ajout de la vidéo et du logo

## 🎥 VIDÉO

### Emplacement exact :
```
C:\Users\Martin\Documents\programs\central6\public\videos\hero-bg.mp4
```

### Étapes :
1. Localisez votre vidéo FiveM sur votre ordinateur
2. Renommez-la en `hero-bg.mp4` (exactement)
3. Copiez-la dans le dossier `public\videos\`

### Recommandations :
- **Format** : MP4 (H.264)
- **Résolution** : 1920x1080 (Full HD)
- **Durée** : 10-20 secondes
- **Poids** : Maximum 10 MB
- **Audio** : Pas nécessaire (sera muted)

### Compresser votre vidéo (si trop lourde) :

**Avec HandBrake (gratuit) :**
1. Téléchargez [HandBrake](https://handbrake.fr/)
2. Ouvrez votre vidéo
3. Preset : "Fast 1080p30"
4. Dimensions : 1920×1080
5. Framerate : 30 FPS
6. Qualité (RF) : 23-25
7. Audio : Supprimer la piste
8. Enregistrez sous `hero-bg.mp4`

---

## 🖼️ LOGO

### Emplacement exact :
```
C:\Users\Martin\Documents\programs\central6\public\logo.png
```

### Préparation du logo :

**Format :** PNG avec fond transparent (recommandé)

**Dimensions recommandées :**
- **Option 1 (horizontal)** : 150-200px largeur × 40-60px hauteur
- **Option 2 (carré)** : 60×60px
- **Option 3 (grand logo)** : 200×60px

### Étapes :
1. Préparez votre logo (PNG transparent de préférence)
2. Renommez-le en `logo.png`
3. Copiez-le dans le dossier `public\`

### Si vous n'avez pas de logo :

**Pas de problème !** Le site affichera automatiquement "Central 6RP" en texte stylisé.

---

## 📂 Structure des fichiers

Après ajout, votre dossier `public` devrait ressembler à :

```
public/
├── logo.png              ← VOTRE LOGO ICI
└── videos/
    └── hero-bg.mp4       ← VOTRE VIDÉO ICI
```

---

## 🎨 Personnaliser la taille du logo

Si votre logo est trop grand ou trop petit, éditez `components/Navbar.tsx` :

**Ligne 48 :** Modifiez `h-10` par :
- `h-8` (plus petit)
- `h-12` (plus grand)
- `h-14` (encore plus grand)

**Exemple :**
```typescript
className="h-12 w-auto"  // Logo plus grand
```

---

## 🔄 Après avoir ajouté les fichiers

1. **Rafraîchissez le navigateur** (Ctrl + R)
2. **Vérifiez** :
   - ✅ Le logo apparaît dans la navbar en haut
   - ✅ La vidéo joue en boucle dans le hero

---

## 🧪 Vérification

### Logo :
- [ ] Fichier `public/logo.png` existe
- [ ] Format PNG (transparent si possible)
- [ ] Dimensions correctes (150-200px largeur recommandée)
- [ ] Visible dans la navbar après refresh

### Vidéo :
- [ ] Fichier `public/videos/hero-bg.mp4` existe
- [ ] Format MP4
- [ ] Poids < 10 MB
- [ ] Se lance automatiquement après refresh

---

## ❌ Problèmes courants

### Le logo ne s'affiche pas

**Vérifications :**
- ✅ Le fichier s'appelle exactement `logo.png` (pas Logo.png ou logo.PNG)
- ✅ Il est bien dans `public/` (pas dans `public/images/`)
- ✅ Vous avez rafraîchi le navigateur (Ctrl + Shift + R)
- ✅ Le fichier n'est pas corrompu (ouvrez-le pour vérifier)

**Solution temporaire :**
Le site affichera automatiquement le texte "Central 6RP" si le logo n'est pas trouvé.

### La vidéo ne s'affiche pas

**Vérifications :**
- ✅ Le fichier s'appelle exactement `hero-bg.mp4` (minuscules)
- ✅ Il est bien dans `public/videos/` (avec le "s")
- ✅ Format MP4 valide
- ✅ Vous avez rafraîchi le navigateur

**Solution temporaire :**
Le site affiche un dégradé bleu en attendant la vidéo.

### La vidéo lag ou est lente

**Solutions :**
- Compressez avec HandBrake (voir ci-dessus)
- Réduisez la durée (10 secondes suffisent)
- Réduisez la qualité (RF 25 au lieu de 23)
- Vérifiez le poids (max 10 MB)

---

## 💡 Formats acceptés

### Vidéo :
- ✅ `.mp4` (recommandé)
- ❌ `.avi` (non supporté par les navigateurs)
- ❌ `.mov` (peut ne pas fonctionner)

### Logo :
- ✅ `.png` (recommandé - transparent)
- ✅ `.jpg` ou `.jpeg` (fond blanc)
- ✅ `.svg` (vectoriel, modifier le code)
- ❌ `.gif` animé (non recommandé)

---

## 🎯 Autres emplacements possibles pour le logo

Si vous voulez aussi mettre le logo sur la page hero, contactez-moi !

---

## 🚀 Prêt !

Une fois les deux fichiers ajoutés :
1. Rafraîchissez le navigateur
2. Admirez le résultat ! 🎉

**Des questions ?** Relisez ce guide ou consultez la documentation principale.

