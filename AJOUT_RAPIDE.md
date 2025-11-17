# ⚡ Ajout Rapide - Vidéo & Logo

## 📍 Deux fichiers à ajouter

### 1️⃣ LOGO (navbar en haut)

**Chemin :**
```
C:\Users\Martin\Documents\programs\central6\public\logo.png
```

**Où le placer ?**
```
central6/
└── public/
    └── logo.png  ← ICI
```

**Format :** PNG transparent recommandé  
**Taille :** 150-200px de largeur

---

### 2️⃣ VIDÉO (fond du hero)

**Chemin :**
```
C:\Users\Martin\Documents\programs\central6\public\videos\hero-bg.mp4
```

**Où la placer ?**
```
central6/
└── public/
    └── videos/
        └── hero-bg.mp4  ← ICI
```

**Format :** MP4  
**Résolution :** 1920x1080  
**Poids :** Max 10 MB

---

## 🎯 Instructions pas-à-pas

### Étape 1 : Préparez vos fichiers

**Logo :**
- Renommez votre logo en `logo.png`
- Format PNG avec fond transparent si possible

**Vidéo :**
- Renommez votre vidéo en `hero-bg.mp4`
- Si trop lourde (> 10 MB), compressez-la avec HandBrake

### Étape 2 : Copiez les fichiers

**Méthode 1 - Explorateur Windows :**
1. Ouvrez l'Explorateur de fichiers
2. Naviguez vers : `C:\Users\Martin\Documents\programs\central6\public`
3. Collez `logo.png` dans `public/`
4. Collez `hero-bg.mp4` dans `public/videos/`

**Méthode 2 - Glisser-déposer dans VS Code :**
1. Dans VS Code, ouvrez le dossier `public`
2. Glissez-déposez `logo.png` directement
3. Ouvrez le dossier `videos`
4. Glissez-déposez `hero-bg.mp4` directement

### Étape 3 : Rafraîchissez le navigateur

Dans votre navigateur (http://localhost:3000), appuyez sur :

**Windows :** `Ctrl + Shift + R`  
**Mac :** `Cmd + Shift + R`

---

## ✅ Vérification

Après refresh, vous devriez voir :

✅ **Logo** dans la navbar en haut à gauche  
✅ **Vidéo** qui joue en boucle en fond du hero

---

## ⚙️ Personnaliser la taille du logo

Si le logo est trop grand ou trop petit :

**Fichier :** `config/site.ts`

**Ligne 21 :** Modifiez le nombre
```typescript
height: 40,  // Changez cette valeur
```

**Exemples :**
- `height: 30` → Logo plus petit
- `height: 50` → Logo plus grand
- `height: 60` → Logo encore plus grand

**Puis rafraîchissez le navigateur !**

---

## ❌ Problèmes ?

### Le logo ne s'affiche pas
- Vérifiez le nom : `logo.png` (minuscules, pas d'espace)
- Vérifiez l'emplacement : `public/logo.png`
- Rafraîchissez avec `Ctrl + Shift + R`

👉 **Pas grave !** Le texte "Central 6RP" s'affiche automatiquement en attendant.

### La vidéo ne s'affiche pas
- Vérifiez le nom : `hero-bg.mp4` (minuscules)
- Vérifiez l'emplacement : `public/videos/hero-bg.mp4`
- Vérifiez le format : MP4
- Rafraîchissez avec `Ctrl + Shift + R`

👉 **Pas grave !** Un dégradé bleu s'affiche automatiquement en attendant.

---

## 📚 Documentation complète

Pour plus de détails, consultez **[AJOUTER_MEDIAS.md](./AJOUTER_MEDIAS.md)**

---

**Ajoutez vos fichiers et c'est prêt ! 🎉**

