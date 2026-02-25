import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const openaiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const generateItinerary = async (preferences) => {
  let modePrompt = '';

  if (preferences.mode === 'roadtrip') {
    modePrompt = 'Le voyage doit être un roadtrip, avec des étapes dans différentes villes ou régions. Assure-toi que les distances entre les étapes sont raisonnables pour une journée de conduite.';
  } else {
    modePrompt = 'Le voyage doit être un séjour dans un hôtel unique, avec des activités organisées autour de ce lieu. Assure-toi que les activités sont facilement accessibles depuis l\'hôtel.';
  }

  const prompt = `Tu es un expert en planification de voyages. Génère un itinéraire de voyage détaillé basé sur les préférences suivantes :

Dates de voyage: du ${preferences.startDate} au ${preferences.endDate}
Destination(s) souhaitée(s): ${preferences.destination}
Style de vacances: ${preferences.vacationStyle}
Niveau d'activité: ${preferences.activityLevel}/5
Budget par jour: ${preferences.budgetPerDay}€
Nombre de voyageurs: ${preferences.travelers}
Mode de voyage: ${modePrompt}

Génère une réponse au format JSON strict (valide) avec la structure suivante :
{
  "tripTitle": "Titre du voyage",
  "summary": "Résumé du voyage",
  "totalBudget": 0,
  "days": [
    {
      "day": 1,
      "title": "Titre du jour",
      "description": "Description générale du jour",
      "activities": [
        {
          "time": "09:00",
          "name": "Nom de l'activité",
          "description": "Description détaillée",
          "location": "Lieu",
          "coordinates": {"lat": 0, "lng": 0},
          "cost": 0,
          "duration": "1h30",
          "image": "nom_image_descriptif"
        }
      ],
      "totalCost": 0,
      "meals": [
        {
          "type": "petit-déjeuner|déjeuner|dîner",
          "restaurant": "Nom du restaurant",
          "cost": 0
        }
      ],
      "accommodation": {
        "name": "Nom de l'hôtel",
        "location": "Localisation",
        "cost": 0
      }
    }
  ]
}

Assure-toi que:
1. Le JSON est valide et parsable
2. Les coûts sont réalistes et incluent le budget indiqué
3. Les activités correspondent au niveau d'activité ${preferences.activityLevel}
4. Les coordonnées GPS sont exactes
5. Les descriptions sont détaillées et attrayantes`;

  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ]
    });

    // Extraire le JSON de la réponse
    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Impossible de parser la réponse JSON');
    }

    const itinerary = JSON.parse(jsonMatch[0]);
    return itinerary;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'itinéraire:', error);
    throw error;
  }
};

export default openaiClient;
