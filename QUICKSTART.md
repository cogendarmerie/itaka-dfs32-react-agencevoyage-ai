# 🎯 Guide de Démarrage Rapide

## 1️⃣ Configuration Initiale

### Obtenir une clé API OpenAI

1. Allez sur https://platform.openai.com/account/api-keys
2. Créez une nouvelle clé API
3. **⚠️ NE PAS LA PARTAGER** (elle a déjà été compromise une fois!)

### Configurer le projet

```bash
# 1. Naviguez au dossier du projet
cd /home/corentin/Documents/Dev-InProgress/agencevoyage

# 2. Créez le fichier .env.local
cat > .env.local << EOF
REACT_APP_OPENAI_API_KEY=votre_clé_api_ici
REACT_APP_API_BASE_URL=https://api.openai.com/v1
EOF

# 3. Vérifiez que .env.local est dans .gitignore
grep ".env.local" .gitignore
```

## 2️⃣ Démarrage du Projet

```bash
# Installation des dépendances (déjà fait)
npm install --legacy-peer-deps

# Démarrer l'application en développement
npm start
```

L'app s'ouvrira sur **http://localhost:3000** 🚀

## 3️⃣ Tester les Fonctionnalités

### Homepage
- ✅ Vérifier que le formulaire s'affiche
- ✅ Tester les sliders
- ✅ Vérifier la responsivité (redimensionner la fenêtre)

### Formulaire
1. Remplissez tous les champs:
   - Destination: "Paris"
   - Dates: 25/02/2026 - 28/02/2026
   - Style: Culture & patrimoine
   - Activité: 3/5
   - Budget: 150€/jour
   - Voyageurs: 2

2. Cliquez sur "Générer mon itinéraire"
3. Attendez la réponse de l'IA (peut prendre 10-30 secondes)
4. Vous devriez être redirigé vers la page "Mon voyage"

### Page "Mon voyage"
- ✅ Vérifier l'affichage du titre et du résumé
- ✅ Cliquer sur les jours pour les déployer
- ✅ Vérifier que les activités, repas et hébergements s'affichent
- ✅ Vérifier les coûts

## 4️⃣ Troubleshooting

### Erreur: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom@latest --legacy-peer-deps
```

### Erreur: "API Key is missing"
- Vérifiez que `.env.local` existe
- Vérifiez la valeur de `REACT_APP_OPENAI_API_KEY`
- Redémarrez le serveur (Ctrl+C et `npm start`)

### Erreur: "CORS error"
- C'est normal si vous utilisez le localhost
- Vérifiez que votre clé API est valide

### L'IA génère du texte qui n'est pas du JSON
- Le prompt doit être amélioré
- Voir `NEXT_STEPS.md` pour les améliorations

### L'app est lente
- L'IA met du temps à générer (normal)
- Assurez-vous d'avoir une bonne connexion internet

## 5️⃣ Commandes Utiles

```bash
# Démarrer en développement
npm start

# Créer une build de production
npm run build

# Lancer les tests
npm test

# Linter le code
npm run lint

# Nettoyer les modules (si problèmes)
rm -rf node_modules && npm install --legacy-peer-deps
```

## 6️⃣ Structure du Code à Connaître

### Fichiers Importants

**`src/App.js`** - Point d'entrée principal
- Configuration de React Router
- Setup du TripProvider

**`src/pages/Home.js`** - Homepage
- Hero section
- Appel du composant TravelForm

**`src/components/TravelForm.js`** - Formulaire
- Logique de soumission du formulaire
- Appel à l'API OpenAI

**`src/services/openaiService.js`** - Communication avec l'IA
- Fonction `generateItinerary()`
- Construction du prompt
- Parsing de la réponse JSON

**`src/context/TripContext.js`** - Gestion de l'état global
- State du voyage courant
- Préférences utilisateur

### Arborescence Actuelle

```
agencevoyage/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants réutilisables
│   ├── pages/           # Pages principales (Home, MyTrip)
│   ├── services/        # Appels API
│   ├── context/         # Context React
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env.local           # Variables d'environnement (à créer)
├── .gitignore           # Fichiers à ignorer
├── package.json         # Dépendances
└── tailwind.config.js   # Configuration Tailwind
```

## 7️⃣ Prochaines Étapes Recommandées

1. **Testez le formulaire complet** - Assurez-vous que tout fonctionne
2. **Améliorez le prompt** - Pour de meilleurs itinéraires
3. **Implémenter la carte** (Étape 5) - Voir `NEXT_STEPS.md`
4. **Ajouter la validation** (Étape 4) - Boutons d'actions

Voir `NEXT_STEPS.md` pour le plan complet.

## 8️⃣ Notes de Développement

### CSS avec Tailwind
L'app utilise **Tailwind CSS** pour le styling responsive.

Classes principales utilisées:
- `grid grid-cols-1 md:grid-cols-3` - Responsive grid
- `max-w-7xl mx-auto px-4` - Conteneur responsive
- `hover:bg-blue-700` - États au survol
- `sm:`, `md:`, `lg:` - Breakpoints

### Gestion d'État
L'app utilise **React Context** pour partager l'état du voyage entre les pages.

```javascript
import { useTrip } from '../context/TripContext';

const { tripData, loading, error } = useTrip();
```

### Routage
L'app utilise **React Router v6** en mode déclaratif:
- `/` → Homepage
- `/my-trip` → Page du voyage

```javascript
<Route path="/" element={<Home />} />
<Route path="/my-trip" element={<MyTrip />} />
```

## 9️⃣ Tips pour l'École

✅ **À montrer au prof:**
- Code propre et organisé
- Structure réactive et responsive
- Utilisation correcte des API (sécurité)
- Gestion d'erreurs
- Commentaires et documentation

⚠️ **À éviter:**
- Exposer les clés API
- Pusher les .env files
- Code dupliqué
- Fonctionnalités incomplètes

📊 **Metrics de succès:**
- Application fonctionne de bout en bout
- Responsive sur mobile/desktop
- IA génère des itinéraires cohérents
- Aucune erreur de sécurité

## 🆘 Besoin d'Aide?

1. **Vérifiez les logs de la console:** F12 → Console
2. **Vérifiez network:** F12 → Network (pour les appels API)
3. **Lisez les erreurs:** Elles sont souvent explicites
4. **Testez localement:** Avant de pusher

---

**Bonne chance avec votre projet! 🚀**
