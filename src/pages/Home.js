import React from 'react';
import TravelForm from '../components/TravelForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-600">🌍 Agence Voyage IA</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Créez votre voyage de rêve en quelques clics
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notre intelligence artificielle génère un itinéraire personnalisé adapté à vos préférences
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">IA Personnalisée</h3>
            <p className="text-gray-600">
              Notre IA analyse vos préférences pour créer un voyage unique
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Jour par Jour</h3>
            <p className="text-gray-600">
              Chaque journée est minutieusement planifiée avec activités et restaurants
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Budget Maîtrisé</h3>
            <p className="text-gray-600">
              Définissez votre budget et nous l'optimiserons pour vous
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="text-center">
          <TravelForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
