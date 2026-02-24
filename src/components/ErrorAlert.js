import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-md z-50 animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold">⚠️ Erreur</p>
          <p className="mt-2">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-red-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
