import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { generateItinerary } from '../services/openaiService';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';

const TravelForm = () => {
  const navigate = useNavigate();
  const { savePreferences, saveTripData, loading, setLoading, setError } = useTrip();
  const [showForm, setShowForm] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    vacationStyle: 'culture', // culture, aventure, détente, gastronomie
    activityLevel: 3,
    budgetPerDay: 150,
    travelers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'activityLevel' || name === 'budgetPerDay' || name === 'travelers' 
        ? parseInt(value) 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      setLocalError('Veuillez remplir tous les champs requis');
      return;
    }

    // Vérifier que la date de fin est après la date de début
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      setLocalError('La date de retour doit être après la date de départ');
      return;
    }

    setLoading(true);
    setError(null);
    setLocalError(null);

    try {
      // Sauvegarder les préférences
      savePreferences(formData);

      // Générer l'itinéraire
      const itinerary = await generateItinerary(formData);
      
      // Sauvegarder le voyage
      saveTripData(itinerary);

      // Rediriger vers la page du voyage
      navigate('/my-trip');
    } catch (err) {
      const errorMsg = err.message || 'Erreur lors de la génération du voyage. Vérifiez votre clé API.';
      setError(errorMsg);
      setLocalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {localError && (
        <ErrorAlert 
          message={localError} 
          onClose={() => setLocalError(null)}
        />
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
      >
        {showForm ? 'Fermer le formulaire' : 'Créer mon voyage'}
      </button>

      {showForm && (
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Planifiez votre voyage</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination(s) *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Ex: Paris, Londres, Bali"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de départ *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de retour *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Style de vacances */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style de vacances
              </label>
              <select
                name="vacationStyle"
                value={formData.vacationStyle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="culture">Culture & patrimoine</option>
                <option value="aventure">Aventure & nature</option>
                <option value="detente">Détente & bien-être</option>
                <option value="gastronomie">Gastronomie</option>
                <option value="plage">Plage & détente</option>
                <option value="montagne">Montagne & randonnée</option>
              </select>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'activité: {formData.activityLevel}/5
                </label>
                <input
                  type="range"
                  name="activityLevel"
                  min="0"
                  max="5"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full"
                  disabled={loading}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Très relaxant</span>
                  <span>Très actif</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget par jour: {formData.budgetPerDay}€
                </label>
                <input
                  type="range"
                  name="budgetPerDay"
                  min="50"
                  max="500"
                  step="10"
                  value={formData.budgetPerDay}
                  onChange={handleChange}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de voyageurs: {formData.travelers}
                </label>
                <input
                  type="range"
                  name="travelers"
                  min="1"
                  max="10"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Génération en cours...' : 'Générer mon itinéraire'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TravelForm;
