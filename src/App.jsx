import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import DashBoard from './pages/DashBoard';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && (
        <Header onToggleSidebar={() => setSidebarOpen(true)} />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
};

export default App;
