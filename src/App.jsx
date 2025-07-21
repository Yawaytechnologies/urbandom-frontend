// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import UserActivity from './pages/UserActivity';
import RentPage from './pages/RentPage';
import BuyPage from './pages/BuyPage';
import PGPage from './pages/PGPage';

import PropertyTypeSelector from './components/PropertyForm/PropertyType'; 
import PGCoLivingForm from './components/';
// import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<BuyPage/>} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/pg" element={<PGPage />} />
        <Route path="/propertyform" element={<PropertyTypeSelector />} />
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/activity" element={<UserActivity />} />
        <Route path="/pg-coliving-form" element={<PGCoLivingForm />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
