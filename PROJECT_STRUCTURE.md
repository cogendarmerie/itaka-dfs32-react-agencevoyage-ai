# 📁 Structure du Projet

## Arborescence Complète

```
agencevoyage/
│
├── public/                          # Fichiers statiques
│   ├── index.html                  # Point d'entrée HTML
│   ├── manifest.json               # PWA manifest
│   └── robots.txt                  # SEO robots
│
├── src/                            # Code source
│   │
│   ├── pages/                      # Pages principales (routage)
│   │   ├── Home.js                 # Page d'accueil
│   │   └── MyTrip.js               # Page du voyage générée
│   │
│   ├── components/                 # Composants réutilisables
│   │   ├── TravelForm.js           # Formulaire de voyage
│   │   ├── LoadingSpinner.js       # Indicateur de chargement
│   │   ├── ErrorAlert.js           # Affichage des erreurs
│   │   ├── TestDataLoader.js       # Outil de test (optionnel)
│   │   ├── TripMap.js              # Carte (À implémenter)
│   │   ├── BudgetSlider.js         # Budget slider (À implémenter)
│   │   ├── TripComparator.js       # Comparateur (À implémenter)
│   │   └── PDFExport.js            # Export PDF (À implémenter)
│   │
│   ├── services/                   # Appels API et services
│   │   └── openaiService.js        # Communication OpenAI
│   │
│   ├── context/                    # React Context pour état global
│   │   └── TripContext.js          # Context du voyage
│   │
│   ├── hooks/                      # Custom hooks React
│   │   └── useLocalStorage.js      # Hook pour localStorage
│   │
│   ├── utils/                      # Fonctions utilitaires
│   │   └── formatters.js           # Formatage (prix, dates, etc.)
│   │
│   ├── data/                       # Données de test
│   │   └── mockData.js             # Données mock pour test
│   │
│   ├── App.js                      # Composant principal
│   ├── App.css                     # Styles globaux
│   ├── index.js                    # Point d'entrée React
│   └── index.css                   # Styles index
│
├── Configuration Files
│   ├── .env.local                  # Variables d'environnement (À créer)
│   ├── .gitignore                  # Fichiers à ignorer
│   ├── package.json                # Dépendances et scripts
│   ├── tailwind.config.js          # Configuration Tailwind
│   └── postcss.config.js           # Configuration PostCSS
│
├── Documentation
│   ├── README.md                   # Documentation principale
│   ├── README_SETUP.md             # Guide d'installation
│   ├── QUICKSTART.md               # Guide de démarrage rapide
│   ├── NEXT_STEPS.md               # Prochaines étapes
│   ├── IMPLEMENTATION_GUIDE.md     # Guide d'implémentation détaillé
│   ├── API_DOCUMENTATION.md        # Doc API OpenAI
│   ├── SECURITY.md                 # Guide de sécurité
│   ├── PROJECT_STRUCTURE.md        # Ce fichier
│   ├── CHANGELOG.md                # Historique des versions
│   └── package-lock.json           # Lock file npm
│
└── build/ (généré après `npm run build`)
    └── static/                     # Fichiers compilés
```

## Description des Dossiers

### `/public`
Fichiers statiques servis directement par le serveur web.

```
- index.html        # Template HTML principal
- manifest.json     # Manifest pour PWA
- robots.txt        # Instructions pour les crawlers SEO
```

### `/src/pages`
Pages principales gérées par React Router.

Chaque fichier représente une route:
- `Home.js` → `/`
- `MyTrip.js` → `/my-trip`

### `/src/components`
Composants réutilisables qui peuvent être utilisés dans plusieurs pages.

**Existants:**
- `TravelForm` - Formulaire interactif
- `LoadingSpinner` - Indicateur de chargement
- `ErrorAlert` - Alertes d'erreur

**À implémenter:**
- `TripMap` - Affichage de la carte
- `BudgetSlider` - Curseur de budget
- `TripComparator` - Comparaison de voyages
- `PDFExport` - Export en PDF

### `/src/services`
Logique métier et appels API.

**openaiService.js** contient:
- Configuration du client axios
- Fonction `generateItinerary()`
- Parsing des réponses

### `/src/context`
React Context pour gérer l'état global de l'application.

**TripContext.js** partage:
- `tripData` - Voyage généré
- `preferences` - Préférences utilisateur
- `loading` - État de chargement
- `error` - Messages d'erreur

### `/src/hooks`
Custom hooks React réutilisables.

**useLocalStorage.js:**
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
const { trips, addTrip, removeTrip } = useSavedTrips();
```

### `/src/utils`
Fonctions utilitaires pures (pas de dépendances React).

**formatters.js:**
```javascript
formatPrice(150)        // "150,00 €"
formatDate("2026-02-24") // "lundi 24 février 2026"
calculateDays(start, end) // Nombre de jours
```

### `/src/data`
Données de test et constantes.

**mockData.js** contient des exemples complets pour tester l'interface sans l'API.

## Flux de Données

```
User Input (TravelForm)
        ↓
  TripContext (savePreferences)
        ↓
  openaiService.generateItinerary()
        ↓
  OpenAI API
        ↓
  Parse JSON Response
        ↓
  TripContext (saveTripData)
        ↓
  Navigate to /my-trip
        ↓
  MyTrip Component (useTrip hook)
        ↓
  Render Itinerary
```

## Hiérarchie des Composants

```
App (TripProvider wrapper)
├── Router
│   ├── Home (page)
│   │   └── TravelForm (component)
│   │       ├── LoadingSpinner
│   │       └── ErrorAlert
│   │
│   └── MyTrip (page)
│       ├── TripMap (component)
│       ├── BudgetSlider (component)
│       ├── TripComparator (component)
│       └── PDFExport (component)
```

## État Global (TripContext)

```javascript
{
  // État du voyage
  tripData: {
    tripTitle: string,
    summary: string,
    totalBudget: number,
    days: Day[]
  },

  // Préférences utilisateur
  preferences: {
    destination: string,
    startDate: string,
    endDate: string,
    vacationStyle: string,
    activityLevel: number,
    budgetPerDay: number,
    travelers: number
  },

  // État de l'app
  loading: boolean,
  error: string | null,

  // Fonctions
  saveTripData,
  savePreferences,
  setLoading,
  setError,
  clearTrip
}
```

## Variables d'Environnement

**.env.local** (À créer):
```env
REACT_APP_OPENAI_API_KEY=sk-proj-...
REACT_APP_API_BASE_URL=https://api.openai.com/v1
REACT_APP_ENVIRONMENT=development
```

**Autres fichiers ne doivent jamais contenir ces variables!**

## Dépendances Principales

### React Ecosystem
- `react@19.2.4` - Framework
- `react-dom@19.2.4` - Rendu
- `react-router-dom@6.21.1` - Routage

### API & HTTP
- `axios@1.6.5` - Requêtes HTTP

### Styling
- `tailwindcss@3.4.1` - Utility CSS
- `autoprefixer@10.4.17` - Autoprefixer
- `postcss@8.4.32` - PostCSS

### Mapping
- `leaflet@1.9.4` - Librairie cartographie
- `react-leaflet@4.2.1` - Binding React

### Export
- `jspdf@2.5.1` - Génération PDF
- `html2canvas@1.4.1` - Capture HTML

### Testing
- `@testing-library/react@16.3.2`
- `@testing-library/jest-dom@6.9.1`
- `@testing-library/user-event@13.5.0`

## Scripts NPM

```bash
npm start       # Démarrer en développement (localhost:3000)
npm run build   # Créer une build production
npm test        # Lancer les tests
npm run eject   # Éjecter de CRA (⚠️ irréversible)
```

## Points d'Entrée

### Frontend
- **URL:** `http://localhost:3000` (développement)
- **Fichier:** `public/index.html`
- **Script:** `src/index.js`
- **Composant:** `src/App.js`

### API
- **Endpoint:** `https://api.openai.com/v1/chat/completions`
- **Service:** `src/services/openaiService.js`
- **Authentification:** Bearer Token (clé API)

## Patterns Utilisés

### Context API
Pour partager l'état entre `Home` et `MyTrip` sans prop drilling.

### Hooks Personnalisés
`useLocalStorage`, `useSavedTrips` pour logique réutilisable.

### Functional Components
Tous les composants sont des fonctions (pas de classe).

### Composition
Les pages composent plusieurs petits composants.

## Performance Considerations

### Optimisations Déjà En Place
- Code splitting automatique (React Router)
- Tailwind CSS purging en production
- React.lazy pour chargement lazy

### À Ajouter
- `React.memo` pour composants lourds
- `useCallback` et `useMemo` pour optimisations
- Image optimization
- Cache des réponses API

## Responsive Design

Breakpoints Tailwind utilisés:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Classes principales:
- `grid grid-cols-1 md:grid-cols-3` - Grille responsive
- `max-w-7xl mx-auto` - Conteneur avec max-width
- `px-4 py-2` - Padding responsive

## Build Output

Après `npm run build`:

```
build/
├── static/
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [vendor].chunk.js
│   └── css/
│       └── main.[hash].css
├── index.html
└── manifest.json
```

Taille approximative: ~86KB gzipped

## Logs et Débogage

### Console du navigateur (F12)
Affiche les logs de `console.log()` et `console.error()`

### Network tab (F12)
Montre les requêtes API vers OpenAI

### Application tab (F12)
Montre le localStorage et les cookies

---

Cette structure est optimisée pour:
- ✅ Maintenabilité
- ✅ Scalabilité
- ✅ Testabilité
- ✅ Performance
- ✅ Sécurité
