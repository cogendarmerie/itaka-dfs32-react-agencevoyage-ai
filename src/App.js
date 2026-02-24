import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Home from './pages/Home';
import MyTrip from './pages/MyTrip';
import './App.css';

function App() {
  return (
    <Router>
      <TripProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-trip" element={<MyTrip />} />
        </Routes>
      </TripProvider>
    </Router>
  );
}

export default App;
