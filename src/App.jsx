// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import UserActivity from './pages/UserActivity';
import RentPage from './pages/RentPage';
import BuyPage from './pages/BuyPage';
<<<<<<< HEAD
import PGPage from './pages/PGPage';

=======
import PropertyTypeSelector from './components/PropertyForm/PropertyType'; 
// import SearchResults from './pages/SearchResults';
>>>>>>> c959e5f8a4e38de209c825d1e5084b59edcf428a

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<BuyPage/>} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
<<<<<<< HEAD
        <Route path="/pg" element={<PGPage />} />
=======
        <Route path="/propertyform" element={<PropertyTypeSelector />} />
>>>>>>> c959e5f8a4e38de209c825d1e5084b59edcf428a
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/activity" element={<UserActivity />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
