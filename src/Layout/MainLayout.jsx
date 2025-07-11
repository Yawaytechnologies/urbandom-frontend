import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SidebarHome from '../components/common/Sidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

const MainLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {isDashboard ? (
        <>
          <DashboardHeader onToggleSidebar={() => setSidebarOpen(true)} />
          <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      ) : (
        <>
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
          <SidebarHome isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      <main className="pt-9">
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </>
  );
};

export default MainLayout;
