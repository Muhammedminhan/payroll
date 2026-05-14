import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import TopHeader from '../components/TopHeader';
import MobileBottomNav from '../components/MobileBottomNav';
import { useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const hideRightSidebar = location.pathname.includes('/payslips') ||
    location.pathname === '/' ||
    location.pathname.includes('/documents') ||
    location.pathname === '/profile';

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="main-content" style={{ marginRight: hideRightSidebar ? '0' : '350px' }}>
        <TopHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <Outlet />
      </main>
      {!hideRightSidebar && <RightSidebar />}
      <MobileBottomNav />

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-color);
          transition: background-color 0.3s ease;
        }
        
        .main-content {
          margin-left: 250px; /* Width of left sidebar */
          flex: 1;
          padding: 2.5rem 3rem;
          min-height: 100vh;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        @media (max-width: 1200px) {
            .main-content {
                margin-left: 0;
                margin-right: 0 !important;
                padding: 1rem;
                padding-top: 64px; /* Matches new header height */
            }
        }

        @media (max-width: 768px) {
            .main-content {
                padding: 1rem;
                padding-top: 64px;
                padding-bottom: 85px; /* Space for bottom nav */
            }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
