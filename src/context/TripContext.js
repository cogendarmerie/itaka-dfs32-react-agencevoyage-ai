import React, { createContext, useState, useContext } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveTripData = (data) => {
    setTripData(data);
  };

  const savePreferences = (prefs) => {
    setPreferences(prefs);
  };

  const clearTrip = () => {
    setTripData(null);
    setPreferences(null);
    setError(null);
  };

  return (
    <TripContext.Provider
      value={{
        tripData,
        preferences,
        loading,
        error,
        saveTripData,
        savePreferences,
        setLoading,
        setError,
        clearTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within TripProvider');
  }
  return context;
};
