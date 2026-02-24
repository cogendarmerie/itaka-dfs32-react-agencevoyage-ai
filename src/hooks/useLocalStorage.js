import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour utiliser localStorage avec React
 * Synchronise automatiquement avec le state
 */
export const useLocalStorage = (key, initialValue) => {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      
      if (item) {
        return JSON.parse(item);
      } else {
        // Stocker la valeur initiale
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return initialValue;
    }
  });

  // Mettre à jour localStorage quand storedValue change
  const setValue = (value) => {
    try {
      // Permettre des fonctions qui prennent la valeur précédente
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture de ${key}:`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook pour sauvegarder les voyages générés
 */
export const useSavedTrips = () => {
  const [trips, setTrips] = useLocalStorage('savedTrips', []);

  const addTrip = (trip) => {
    const newTrips = [...trips, { ...trip, id: Date.now() }];
    setTrips(newTrips);
  };

  const removeTrip = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
  };

  const updateTrip = (tripId, updatedTrip) => {
    setTrips(trips.map(trip => trip.id === tripId ? updatedTrip : trip));
  };

  return { trips, addTrip, removeTrip, updateTrip };
};
