// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import UserActivity from './pages/UserActivity';
import RentPage from './pages/RentPage';
import BuyPage from './pages/BuyPage';
import PropertyTypeSelector from './components/PropertyForm/PropertyType'; 
import Login from './pages/auth/login';
import SignUpPage from './pages/auth/signup'; 

// import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/propertyform" element={<PropertyTypeSelector />} />
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/activity" element={<UserActivity />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
