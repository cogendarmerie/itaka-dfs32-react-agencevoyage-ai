# 🌍 Agence Voyage IA

Une application React qui utilise l'API OpenAI pour générer des itinéraires de voyage personnalisés.

## 🚀 Installation

### Prérequis
- Node.js (v14+)
- npm ou yarn

### Étapes d'installation

1. **Clonez le repository**
```bash
git clone <votre-repo>
cd agencevoyage
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Configurez les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet :
```env
REACT_APP_OPENAI_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=https://api.openai.com/v1
```

**⚠️ IMPORTANT** : N'oubliez pas d'ajouter `.env.local` dans votre `.gitignore` !

4. **Démarrez l'application**
```bash
npm start
```

L'application s'ouvrira à [http://localhost:3000](http://localhost:3000)

## 📋 Fonctionnalités

### Étape 1 : Homepage + Questionnaire ✅
- Formulaire de saisie des préférences
- Interfaces responsive
- Choix de destination, dates, style de vacances, niveau d'activité, budget

### Étape 2 : Génération d'itinéraire (En développement)
- Utilisation de l'API OpenAI (GPT-4-mini)
- Format JSON structuré
- Activités jour par jour

### Étape 3 : Affichage du voyage (En développement)
- Page "Mon voyage" avec détails jour par jour
- Affichage des activités, repas et hébergements
- Interface accordéon pour naviguer

### Étapes 4-8 (À venir)
- ✅ Validation et nouvelle proposition
- ✅ Carte des activités (Leaflet)
- ✅ Budget slider
- ✅ Comparateur
- ✅ Export PDF

## 🛠️ Stack Technologique

- **React 19** - Frontend
- **React Router v6** - Routage déclaratif
- **Tailwind CSS** - Styling responsive
- **Axios** - Requêtes HTTP
- **OpenAI API** - Génération IA

## 📱 Responsive Design

L'application est entièrement responsive et fonctionne sur :
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔒 Sécurité

- Stockage de la clé API dans `.env.local`
- `.env.local` ajouté au `.gitignore`
- Jamais pusher de credentials sensibles

## 📖 Structure du projet

```
src/
├── components/       # Composants réutilisables
│   └── TravelForm.js # Formulaire de voyage
├── pages/           # Pages principales
│   ├── Home.js      # Homepage
│   └── MyTrip.js    # Page du voyage
├── services/        # Services API
│   └── openaiService.js
├── context/         # Context React
│   └── TripContext.js
├── App.js           # App principal
└── index.js
```

## 🚀 Déploiement

### Créez une build de production
```bash
npm run build
```

### Deployez sur Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

## 📝 Notes pour l'enseignant

- Application responsive ✅
- Code structuré et maintenable ✅
- Utilisation d'OpenAI API ✅
- Pas de credentials pushés ✅
- Développement itératif des étapes ✅

## 🤝 Support

Pour toute question ou problème, créez une issue sur le repository.

## 📄 Licence

Ce projet est un projet académique.
