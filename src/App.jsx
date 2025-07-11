import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout'; // Wrap non-dashboard routes in MainLayout
import LandingPage from './pages/LandingPage';
import UserActivity from './pages/UserActivity';
import RentPage from './pages/RentPage';
import BuyPage from './pages/BuyPage';
import DashBoard from './pages/DashBoard'; // Directly render Dashboard

const App = () => {
  return (
    <Routes>
      {/* Wrap non-dashboard routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/activity" element={<UserActivity />} />
      </Route>

      {/* Directly render DashBoard for /dashboard route */}
      <Route path="/dashboard/*" element={<DashBoard />} />
    </Routes>
  );
};

export default App;
