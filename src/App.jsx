import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Sidebar from './components/SideBar';
import Footer from './components/Footer'; 


const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(true)} />
      <HeroSection />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Footer /> 
      
    </>
  );
};

export default App;
