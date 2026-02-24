import React from 'react';
import { useTrip } from '../context/TripContext';
import { mockTrip, mockPreferences } from '../data/mockData';

/**
 * Composant de test - À SUPPRIMER après les tests
 * Permet de charger les données mock pour tester l'interface
 */
const TestDataLoader = ({ onClose }) => {
  const { saveTripData, savePreferences } = useTrip();

  const handleLoadMockData = () => {
    saveTripData(mockTrip);
    savePreferences(mockPreferences);
    alert('Données de test chargées ! Rendez-vous sur /my-trip');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-200 border-2 border-yellow-600 p-4 rounded-lg shadow-lg z-50">
      <p className="text-sm text-yellow-800 mb-2">⚙️ Outils de test (dev seulement)</p>
      <button
        onClick={handleLoadMockData}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Charger données de test
      </button>
      <button
        onClick={onClose}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
      >
        Fermer
      </button>
    </div>
  );
};

export default TestDataLoader;
