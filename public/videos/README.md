# 🎥 Dossier Vidéo

## 📍 Placez votre vidéo ici

Le fichier doit s'appeler **exactement** :

```
hero-bg.mp4
```

---

## ✅ Spécifications recommandées

| Paramètre | Valeur recommandée |
|-----------|-------------------|
| **Nom du fichier** | `hero-bg.mp4` (exactement) |
| **Format** | MP4 (H.264) |
| **Résolution** | 1920x1080 (Full HD) |
| **Durée** | 10-20 secondes |
| **Poids** | 5-10 MB maximum |
| **FPS** | 30 fps |
| **Audio** | Aucun (muted) |

---

## 🎬 Où trouver une vidéo ?

### Option 1 : Enregistrer vous-même
- Utilisez **OBS Studio** ou **Medal.tv**
- Enregistrez des plans cinématiques sur votre serveur FiveM
- Éditez avec **DaVinci Resolve** (gratuit)

### Option 2 : Sites de vidéos libres
- [Pexels Videos](https://www.pexels.com/videos/) - Recherchez "gta" ou "city night"
- [Pixabay Videos](https://pixabay.com/videos/)

---

## 🔧 Comment compresser votre vidéo ?

### Avec HandBrake (gratuit)

1. Téléchargez [HandBrake](https://handbrake.fr/)
2. Ouvrez votre vidéo
3. **Preset** : "Fast 1080p30"
4. **Dimensions** : 1920 × 1080
5. **Framerate** : 30 FPS constant
6. **Qualité (RF)** : 23-25
7. **Audio** : Supprimer la piste
8. Enregistrez sous `hero-bg.mp4`

### Avec FFmpeg (ligne de commande)

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 -preset medium -an hero-bg.mp4
```

---

## 📂 Structure finale

Une fois la vidéo ajoutée :

```
public/
└── videos/
    ├── hero-bg.mp4      ← VOTRE VIDÉO ICI
    ├── .gitkeep         (fichier de maintien Git)
    └── README.md        (ce fichier)
```

---

## ⚠️ Important

- Le nom doit être **exactement** `hero-bg.mp4` (minuscules)
- Format MP4 obligatoire
- Poids maximum 10 MB pour de bonnes performances
- Vidéo en boucle (elle se répétera automatiquement)
- Aucun audio nécessaire (sera muted)

---

## 🧪 Tester votre vidéo

Après avoir ajouté votre vidéo :

1. Redémarrez le serveur (`Ctrl+C` puis `npm run dev`)
2. Ouvrez http://localhost:3000
3. La vidéo doit se lancer automatiquement en boucle

---

## ❌ Problèmes courants

### La vidéo ne s'affiche pas

✅ **Vérifications :**
- Le fichier est bien nommé `hero-bg.mp4` ?
- Il est bien dans `public/videos/` ?
- Le format est bien MP4 ?
- Vous avez redémarré le serveur ?

### La vidéo est trop lourde

✅ **Solution :**
- Compressez avec HandBrake (voir ci-dessus)
- Réduisez la durée (10-15 secondes suffisent)
- Réduisez la qualité (RF 25 au lieu de 23)

### La vidéo lag

✅ **Solutions :**
- Réduisez le poids (max 10 MB)
- Vérifiez la résolution (1920x1080 max)
- Réduisez le framerate à 24 fps

---

## 💡 Conseils Pro

1. **Choisissez des plans cinématiques** : Évitez les scènes d'action rapides
2. **Privilégiez l'ambiance** : Couchers de soleil, ville de nuit, etc.
3. **Testez sur mobile** : La vidéo doit être fluide même sur smartphone
4. **Raccourcissez si nécessaire** : 10-15 secondes suffisent amplement
5. **Pas d'audio** : La vidéo sera de toute façon en mode muted

---

## 🎨 Exemples de plans idéaux

- 🌆 Ville de nuit avec néons
- 🚗 Voiture qui roule (plan large)
- 🌅 Coucher de soleil sur Los Santos
- 🏙️ Vue aérienne de la ville
- 🌃 Plan fixe d'une rue animée
- 🚁 Plan d'hélicoptère survolant la ville

---

**Ajoutez votre vidéo et votre site sera complet ! 🎬**

