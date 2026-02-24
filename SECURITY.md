# 🔒 Guide de Sécurité

## ⚠️ JAMAIS faire

### 1. Exposer votre clé API
❌ **NE PAS FAIRE:**
```javascript
const API_KEY = "sk-proj-Nz_w3I5M7Eb0zl2wJ8okl4KwqhlMjsrziQtH__bE40";

// ❌ Dans le code source
const request = {
  headers: {
    Authorization: `Bearer sk-proj-Nz_w3I5M7Eb0zl2wJ8okl4KwqhlMjsrziQtH__bE40`
  }
};

// ❌ Pusher sur GitHub
git push origin main
// votre clé est maintenant visible !
```

✅ **À FAIRE:**
```javascript
// Utiliser des variables d'environnement
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Ajouter .env.local au .gitignore
echo ".env.local" >> .gitignore

// Vérifier avant de pusher
git status
# S'assurer que .env.local n'est pas listé
```

### 2. Stocker des données sensibles en texte brut
❌ **NE PAS FAIRE:**
```javascript
// localStorage ou sessionStorage avec données sensibles
localStorage.setItem('apiKey', 'sk-proj-...');
localStorage.setItem('userToken', 'token-...');
```

✅ **À FAIRE:**
```javascript
// Stocker seulement les données publiques
localStorage.setItem('preferredDestination', 'Paris');
localStorage.setItem('lastTrip', JSON.stringify(tripData));
```

### 3. Faire des appels API côté client sans limite
❌ **NE PAS FAIRE:**
```javascript
// Pas de limite = gaspillage de budget
const handleChange = (e) => {
  generateItinerary(formData); // À chaque keystroke !
};
```

✅ **À FAIRE:**
```javascript
// Ajouter debounce ou throttle
import { useCallback } from 'react';

const handleSubmit = useCallback(async (data) => {
  if (loading) return; // Vérifier le loading
  setLoading(true);
  await generateItinerary(data);
}, [loading]);
```

## ✅ Bonnes Pratiques

### 1. Variables d'environnement

**Fichier `.env.local` (à créer):**
```env
# ✅ BON - Variables sécurisées
REACT_APP_OPENAI_API_KEY=sk-proj-votre-clé-ici
REACT_APP_API_BASE_URL=https://api.openai.com/v1
REACT_APP_ENVIRONMENT=development
```

**Fichier `.gitignore`:**
```gitignore
# Environnements
.env
.env.local
.env.*.local

# Ne jamais pusher ces fichiers !
```

### 2. Validation des entrées

```javascript
// ✅ Valider avant d'envoyer à l'API
const handleSubmit = (formData) => {
  // Vérifications basiques
  if (!formData.destination || formData.destination.length < 2) {
    throw new Error('Destination invalide');
  }
  
  if (new Date(formData.endDate) <= new Date(formData.startDate)) {
    throw new Error('Dates invalides');
  }
  
  if (formData.budgetPerDay < 0) {
    throw new Error('Budget invalide');
  }
  
  // Seulement après validation
  generateItinerary(formData);
};
```

### 3. Gestion des erreurs

```javascript
// ✅ Gérer les erreurs sans exposer les détails sensibles
try {
  const response = await openaiClient.post(...);
} catch (error) {
  if (error.response?.status === 401) {
    // ❌ NE PAS afficher: "API Key is invalid: sk-proj-..."
    // ✅ À FAIRE:
    console.error('Erreur d\'authentification avec l\'API');
    showUserError('Une erreur est survenue. Vérifiez votre configuration.');
  } else if (error.response?.status === 429) {
    showUserError('Trop de requêtes. Attendez quelques secondes.');
  } else {
    showUserError('Erreur interne. Réessayez plus tard.');
  }
}
```

### 4. CORS et en-têtes

```javascript
// ✅ Configurer correctement CORS
const client = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// ❌ NE PAS ajouter de headers potentiellement sensibles au frontend
// (Authorization doit rester privé dans .env)
```

### 5. Limiter les appels API

```javascript
// ✅ Implémenter un système de limite
let requestCount = 0;
const MAX_REQUESTS_PER_DAY = 10;

const generateItinerary = async (preferences) => {
  if (requestCount >= MAX_REQUESTS_PER_DAY) {
    throw new Error('Limite quotidienne atteinte');
  }
  
  requestCount++;
  // Continuer...
};

// Ou utiliser localStorage pour persister
const getRequestCount = () => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('requestCount');
  
  if (stored?.date !== today) {
    return { count: 0, date: today };
  }
  return stored;
};
```

## 🔍 Checklist de Sécurité Avant de Pusher

```bash
# 1. Vérifier que .env.local n'est pas commité
git status | grep ".env.local"
# Devrait retourner vide (rien trouvé)

# 2. Vérifier qu'aucune clé API n'est dans le code
grep -r "sk-proj-" src/
# Devrait retourner vide

# 3. Vérifier le .gitignore
cat .gitignore | grep ".env"
# Devrait contenir ".env.local"

# 4. Faire un dry-run avant de pusher
git diff --cached | grep -i "key\|token\|secret"
# Devrait retourner vide

# 5. Nettoyer l'historique si une clé a été commise
# (Voir section "Récupération d'urgence")
```

## 🚨 Récupération d'Urgence

**Si vous avez accidentellement pushé une clé API:**

### 1. Régénérer la clé immédiatement
```bash
# Allez sur https://platform.openai.com/account/api-keys
# Supprimez l'ancienne clé
# Générez une nouvelle clé
# Mettez à jour .env.local
```

### 2. Nettoyer l'historique Git
```bash
# Option 1: Forcer un push (nucléaire)
git reset HEAD~1
# Faire les changements
git add .
git commit -m "Security fix: remove API key"
git push --force-with-lease

# Option 2: Utiliser BFG Repo-Cleaner (recommandé)
bfg --delete-files "*env.local" --no-blob-protection
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force-with-lease
```

### 3. Monitorer les abus
```bash
# Vérifier les logs d'utilisation sur OpenAI
# https://platform.openai.com/usage/overview
```

## 📊 Monitoring

### Mettre en place des alertes

```javascript
// ✅ Alerter si les coûts augmentent anormalement
const monitorApiUsage = () => {
  const usage = localStorage.getItem('apiUsage') || { requests: 0 };
  
  if (usage.requests > 100) {
    // Envoyer une alerte
    console.warn('⚠️ Beaucoup de requêtes détectées!');
    // Potentiellement arrêter les requêtes
  }
};
```

### Logs

```javascript
// ✅ Logger les erreurs importantes (sans données sensibles)
const logError = (error) => {
  console.error({
    timestamp: new Date().toISOString(),
    error: error.message,
    errorCode: error.code,
    // ❌ NE PAS inclure:
    // fullError: error,
    // apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
};
```

## 🔐 Déploiement Sécurisé

### Sur Vercel
```bash
# Ajouter les variables d'environnement dans Vercel Dashboard
# Settings → Environment Variables
# REACT_APP_OPENAI_API_KEY = sk-proj-...

# ✅ Ne jamais les ajouter dans le .env.local du projet
```

### Sur GitHub Pages
```bash
# ❌ NE PAS déployer sur GitHub Pages (pas de backend)
# Les API keys seraient visibles dans le code cliente

# ✅ À FAIRE: Utiliser un serveur backend (Node.js, Python, etc.)
# Appeler l'API depuis le backend, pas depuis le frontend
```

## 📚 Ressources de Sécurité

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/React_Security_Cheat_Sheet.html)
- [Node.js Security Checklist](https://nodejs.org/en/knowledge/security/)

---

**Résumé: Une clé exposée = crédit utilisé par d'autres = facture énorme. Soyez vigilant! 🛡️**
