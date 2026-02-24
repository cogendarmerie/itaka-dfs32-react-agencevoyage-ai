import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

const MyTrip = () => {
  const navigate = useNavigate();
  const { tripData, preferences } = useTrip();
  const [expandedDay, setExpandedDay] = useState(0);

  if (!tripData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Aucun voyage généré</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Créer un voyage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🌍 {tripData.tripTitle}</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            ← Retour
          </button>
        </div>
      </nav>

      {/* Trip Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{tripData.tripTitle}</h2>
          <p className="text-gray-600 text-lg mb-6">{tripData.summary}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Destination</p>
              <p className="text-xl font-bold text-gray-800">{preferences?.destination}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Durée</p>
              <p className="text-xl font-bold text-gray-800">{tripData.days?.length} jours</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-sm text-gray-600">Budget total</p>
              <p className="text-xl font-bold text-gray-800">{tripData.totalBudget}€</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-sm text-gray-600">Style</p>
              <p className="text-xl font-bold text-gray-800 capitalize">{preferences?.vacationStyle}</p>
            </div>
          </div>
        </div>

        {/* Days */}
        <div className="space-y-4">
          {tripData.days?.map((day, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Day Header */}
              <button
                onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                className="w-full p-6 hover:bg-blue-50 transition-colors flex justify-between items-center"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Jour {day.day}: {day.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{day.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{day.totalCost}€</p>
                  <p className="text-sm text-gray-500">
                    {expandedDay === index ? '▼' : '▶'}
                  </p>
                </div>
              </button>

              {/* Day Content */}
              {expandedDay === index && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-6">
                  {/* Activities */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">📍 Activités</h4>
                    <div className="space-y-4">
                      {day.activities?.map((activity, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                              <h5 className="text-lg font-bold text-gray-800">{activity.name}</h5>
                            </div>
                            <span className="text-lg font-bold text-green-600">{activity.cost}€</span>
                          </div>
                          <p className="text-gray-600 mb-2">{activity.description}</p>
                          <p className="text-sm text-gray-500">
                            📍 {activity.location} • ⏱️ {activity.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals */}
                  {day.meals && day.meals.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">🍽️ Repas</h4>
                      <div className="space-y-2">
                        {day.meals.map((meal, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-800 capitalize">{meal.type}</p>
                              <p className="text-sm text-gray-600">{meal.restaurant}</p>
                            </div>
                            <span className="font-bold text-green-600">{meal.cost}€</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accommodation */}
                  {day.accommodation && (
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">🏨 Hébergement</h4>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                        <h5 className="font-bold text-gray-800">{day.accommodation.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{day.accommodation.location}</p>
                        <p className="text-lg font-bold text-green-600">{day.accommodation.cost}€</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
            ✅ Valider ce voyage
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg">
            🔄 Générer une autre proposition
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg">
            📊 Voir la carte
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg">
            📥 Exporter en PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTrip;
