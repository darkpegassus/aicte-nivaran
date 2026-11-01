import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import GovTopStrip from './GovTopStrip';

const AppLayout = () => {
  // On desktop default to open, on mobile default to closed
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  // Auto-close sidebar on mobile when navigating to a new route
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="gov-portal-bg flex h-screen w-screen overflow-hidden font-sans flex-col">
      {/* 1. Global Accessibility Top Ribbon with Skip to Content */}
      <GovTopStrip showSkipToMain={true} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* 2. Mobile Backdrop (ONLY visible on mobile when sidebar is open) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs transition-opacity md:hidden cursor-pointer"
            title="Click outside to close menu"
          />
        )}

        {/* 3. Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* 4. Top Header & Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <TopHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <main 
            id="main-content" 
            className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 md:px-8 bg-slate-900/[0.02]"
            onClick={() => {
              // Clicking the main content area also closes the sidebar on mobile
              if (window.innerWidth < 768 && sidebarOpen) {
                setSidebarOpen(false);
              }
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;