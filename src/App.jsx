// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import UserActivity from './pages/UserActivity';
import RentPage from './pages/RentPage';
import BuyPage from './pages/BuyPage';
import PropertyOverviewPage from './pages/PropertyOverviewPage'; // Static Property Overview Page

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/property" element={<PropertyOverviewPage />} /> {/* Static Route */}
        <Route path="/activity" element={<UserActivity />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
