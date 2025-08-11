import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SideBarHome from "../components/common/SideBar"
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

const MainLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* HEADER & SIDEBAR */}
      {isDashboard ? (
        <>
          <DashboardHeader onToggleSidebar={() => setSidebarOpen(true)} />
          <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      ) : (
        <>
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
          <SideBarHome isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {/* MAIN CONTENT */}
      <main className={isDashboard ? "pt-4" : "pt-"}>
        <Outlet />
      </main>

      {/* FOOTER (Public pages only) */}
      {!isDashboard && <Footer />}
    </>
  );
};

export default MainLayout;
