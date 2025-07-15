import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import SignUpPage from './pages/auth/signup';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      {/* Layout shown on all routes except /login and /signup */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Main app layout */}
        <Route
          path="/"
          element={
            <>
              <Header onToggleSidebar={() => setSidebarOpen(true)} />
              <HeroSection />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
