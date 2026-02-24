/**
 * Données de test pour développement local
 * Utiliser pour tester l'interface sans appeler l'API
 */

export const mockTrip = {
  tripTitle: "Mon week-end magique à Paris 🗼",
  summary: "Découvrez la magie de Paris à travers ses monuments emblématiques, ses musées de renommée mondiale et sa gastronomie exquise.",
  totalBudget: 1200,
  days: [
    {
      day: 1,
      title: "Arrivée et tour Eiffel",
      description: "Installez-vous à votre hôtel et explorez le quartier de la Tour Eiffel",
      activities: [
        {
          time: "14:00",
          name: "Visite de la Tour Eiffel",
          description: "Montez au 2ème étage de la tour pour une vue panoramique de Paris. Prenez votre temps pour admirer la vue et photographier la ville.",
          location: "Champ de Mars, Paris",
          coordinates: { lat: 48.8584, lng: 2.2945 },
          cost: 15,
          duration: "2h",
          image: "eiffel_tower"
        },
        {
          time: "17:00",
          name: "Balade en bateau sur la Seine",
          description: "Profitez d'une croisière relaxante sur la Seine avec vue sur les monuments de Paris.",
          location: "Port de l'Alma",
          coordinates: { lat: 48.8615, lng: 2.2933 },
          cost: 20,
          duration: "1h30",
          image: "seine_cruise"
        }
      ],
      totalCost: 85,
      meals: [
        {
          type: "petit-déjeuner",
          restaurant: "Café de Flore",
          cost: 15
        },
        {
          type: "déjeuner",
          restaurant: "L'As du Fallafel",
          cost: 12
        },
        {
          type: "dîner",
          restaurant: "Le Jules Verne (Tour Eiffel)",
          cost: 38
        }
      ],
      accommodation: {
        name: "Hotel Sofitel Paris Arc de Triomphe",
        location: "8e arrondissement",
        cost: 250
      }
    },
    {
      day: 2,
      title: "Musées et art",
      description: "Explorez les musées parisiens et l'art impressionniste",
      activities: [
        {
          time: "09:00",
          name: "Visite du Louvre",
          description: "Découvrez les trésors du Louvre, incluant la Joconde et la Victoire de Samothrace.",
          location: "Rue de Rivoli, Paris",
          coordinates: { lat: 48.8606, lng: 2.3376 },
          cost: 17,
          duration: "3h",
          image: "louvre_museum"
        },
        {
          time: "13:00",
          name: "Déjeuner au Marais",
          description: "Découvrez les petits restaurants du Marais et ses galeries d'art",
          location: "Le Marais, Paris",
          coordinates: { lat: 48.8609, lng: 2.3634 },
          cost: 0,
          duration: "1h30",
          image: "marais"
        },
        {
          time: "15:30",
          name: "Musée Picasso",
          description: "Explorez l'impressionniste collection Picasso dans le Marais.",
          location: "5 rue de Thorigny, Paris",
          coordinates: { lat: 48.8609, lng: 2.3634 },
          cost: 14,
          duration: "2h",
          image: "picasso_museum"
        }
      ],
      totalCost: 78,
      meals: [
        {
          type: "petit-déjeuner",
          restaurant: "Ladurée",
          cost: 12
        },
        {
          type: "déjeuner",
          restaurant: "L'Escargot Montorgueil",
          cost: 25
        },
        {
          type: "dîner",
          restaurant: "Septime",
          cost: 35
        }
      ],
      accommodation: {
        name: "Hotel Sofitel Paris Arc de Triomphe",
        location: "8e arrondissement",
        cost: 250
      }
    },
    {
      day: 3,
      title: "Paris romantique et retour",
      description: "Dernière journée pour profiter du charme de Paris",
      activities: [
        {
          time: "09:00",
          name: "Cathédrale Notre-Dame",
          description: "Admirez l'architecture gothique de Notre-Dame (visite extérieure actuellement).",
          location: "Île de la Cité, Paris",
          coordinates: { lat: 48.8530, lng: 2.3499 },
          cost: 0,
          duration: "1h",
          image: "notre_dame"
        },
        {
          time: "11:00",
          name: "Sainte-Chapelle",
          description: "Visitez cette merveille de l'architecture gothique avec ses magnifiques vitraux.",
          location: "4 rue de Montmorency, Paris",
          coordinates: { lat: 48.8556, lng: 2.3452 },
          cost: 11,
          duration: "1h30",
          image: "sainte_chapelle"
        },
        {
          time: "14:00",
          name: "Shopping aux Galeries Lafayette",
          description: "Shopping de dernière minute aux Galeries Lafayette.",
          location: "40 Boulevard Haussmann, Paris",
          coordinates: { lat: 48.8743, lng: 2.3274 },
          cost: 0,
          duration: "2h",
          image: "galeries_lafayette"
        }
      ],
      totalCost: 45,
      meals: [
        {
          type: "petit-déjeuner",
          restaurant: "Paul",
          cost: 10
        },
        {
          type: "déjeuner",
          restaurant: "Angelina",
          cost: 18
        },
        {
          type: "dîner",
          restaurant: "À emporter à l'aéroport",
          cost: 15
        }
      ],
      accommodation: {
        name: "Départ",
        location: "Charles de Gaulle",
        cost: 0
      }
    }
  ]
};

export const mockPreferences = {
  destination: "Paris",
  startDate: "2026-03-01",
  endDate: "2026-03-03",
  vacationStyle: "culture",
  activityLevel: 4,
  budgetPerDay: 400,
  travelers: 2
};
