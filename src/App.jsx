import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout"; // Wrap non-dashboard routes in MainLayout
import LandingPage from "./pages/LandingPage";
import UserActivity from "./pages/UserActivity";
import RentPage from "./pages/RentPage";
import BuyPage from "./pages/BuyPage";
import PropertyOverviewPage from "./pages/PropertyOverviewPage"; // Static Property Overview Page
import PGPage from './pages/PGPage';
import PropertyTypeSelector from "./components/PropertyForm/PropertyType";
import PGCoLivingForm from './components/PropertyForm/PG-Coliving';
import DashBoard from './pages/DashBoard'; // Directly render Dashboard

const App = () => {
  return (
    <Routes>
      {/* Wrap non-dashboard routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<BuyPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/pg" element={<PGPage />} />
        <Route path="/property-overview/:id" element={<PropertyOverviewPage />} />
        <Route path="/propertyform" element={<PropertyTypeSelector />} />
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/activity" element={<UserActivity />} />
        <Route path="/pg-coliving-form" element={<PGCoLivingForm />} />
        <Route path="/property-overview/:propertyId" element={<PropertyOverviewPage />} />
      </Route>

      {/* Directly render DashBoard for /dashboard route */}
      <Route path="/dashboard/*" element={<DashBoard />} />
    </Routes>
  );
};

export default App;
