# 📚 Documentation API OpenAI

## Configuration

### Endpoint utilisé
- **URL:** `https://api.openai.com/v1/chat/completions`
- **Méthode:** POST
- **Authentification:** Bearer Token (API Key)

### Modèles disponibles
- `gpt-4-mini` - Recommandé (rapide et moins coûteux)
- `gpt-4` - Plus puissant mais plus cher
- `gpt-3.5-turbo` - Plus ancien mais très rapide

## Fonction principale: `generateItinerary(preferences)`

### Paramètres d'entrée

```typescript
interface Preferences {
  destination: string;        // Ex: "Paris"
  startDate: string;          // Format: "2026-03-01"
  endDate: string;            // Format: "2026-03-03"
  vacationStyle: string;      // culture, aventure, detente, etc.
  activityLevel: number;      // 0-5
  budgetPerDay: number;       // En euros
  travelers: number;          // Nombre de voyageurs
}
```

### Retour

```typescript
interface Itinerary {
  tripTitle: string;
  summary: string;
  totalBudget: number;
  days: Day[];
}

interface Day {
  day: number;
  title: string;
  description: string;
  activities: Activity[];
  totalCost: number;
  meals: Meal[];
  accommodation: Accommodation;
}

interface Activity {
  time: string;              // "09:00"
  name: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  cost: number;
  duration: string;          // "2h30"
  image: string;             // Descripteur pour image
}

interface Meal {
  type: string;              // "petit-déjeuner", "déjeuner", "dîner"
  restaurant: string;
  cost: number;
}

interface Accommodation {
  name: string;
  location: string;
  cost: number;
}
```

## Prompt Engineering

### Stratégie actuelle
Le prompt utilise:
1. **Contexte:** "Tu es un expert en planification de voyages"
2. **Input:** Préférences utilisateur
3. **Format:** Demande explicite de JSON
4. **Validations:** Instructions sur le réalisme des coûts et activités

### Améliorer le prompt

#### Variante pour budget serré
```
Génère un itinéraire ÉCONOMIQUE avec:
- Activités gratuites ou peu coûteuses
- Petits restaurants locaux
- Transports en commun
- Hébergements bon marché
```

#### Variante pour luxe
```
Génère un itinéraire LUXE avec:
- Activités premium et exclusives
- Restaurants étoilés Michelin
- Hôtels 5 étoiles
- Services haut de gamme
```

#### Variante avec surprise
```
Ajoute 1-2 activités surprises hors du commun que les touristes ne connaissent pas
```

## Coûts API

### Tarification (Février 2026)
- **gpt-4-mini:** ~$0.15 pour 1M tokens
- **gpt-4:** ~$30 pour 1M tokens
- **gpt-3.5-turbo:** ~$0.50 pour 1M tokens

### Estimation par requête
- **gpt-4-mini (3 jours):** ~$0.002-0.005
- **Limite recommandée:** 4000 tokens max_tokens

## Gestion des erreurs

### Erreurs possibles

```javascript
// Erreur: Clé API invalide
{
  error: {
    message: "Incorrect API key provided",
    type: "invalid_request_error"
  }
}

// Erreur: Rate limit dépassé
{
  error: {
    message: "Rate limit exceeded",
    type: "server_error"
  }
}

// Erreur: JSON invalide
// Le prompt génère du texte au lieu de JSON
```

### Stratégies de récupération

```javascript
// 1. Retry avec exponential backoff
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
};

// 2. Fallback sur données locales
if (error.code === 'API_ERROR') {
  return loadMockData();
}

// 3. Validation du JSON
try {
  JSON.parse(response);
} catch {
  // Nettoyer et réessayer
  const cleaned = extractJSON(response);
  return JSON.parse(cleaned);
}
```

## Améliorations futures

### 1. Streaming des réponses
```javascript
// Afficher la réponse au fur et à mesure
const stream = await openaiClient.post('/chat/completions', {
  ...config,
  stream: true
});
```

### 2. Cache des réponses
```javascript
// Stocker les itinéraires générés pour les mêmes préférences
localStorage.setItem(`cache_${preferences_hash}`, response);
```

### 3. Utiliser embeddings
```javascript
// Pour des recommandations similaires
const embedding = await generateEmbedding(destination);
```

### 4. Fine-tuning
```javascript
// Entraîner un modèle personnalisé sur vos données
// (Requiert plus de données)
```

## Testing

### Tester avec mock
```javascript
import { mockTrip } from '../data/mockData';

const response = mockTrip;
```

### Tester avec vraie API
```bash
# Assurez-vous que REACT_APP_OPENAI_API_KEY est défini
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $REACT_APP_OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4-mini", ...}'
```

## Références
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)
- [Chat Completions](https://platform.openai.com/docs/api-reference/chat)
- [Rate Limits](https://platform.openai.com/docs/guides/rate-limits)
- [Pricing](https://openai.com/pricing)
