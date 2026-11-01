import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import GovTopStrip from './GovTopStrip';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="gov-portal-bg flex h-screen w-screen overflow-hidden font-sans flex-col">
      {/* 1. Global Accessibility Top Ribbon with Skip to Content */}
      <GovTopStrip showSkipToMain={true} />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Collapsible Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* 3. Top Header & Scrollable Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Transparent backdrop allowing gov-bg to shine through smoothly */}
          <main id="main-content" className="flex-1 overflow-y-auto px-4 py-6 md:px-8 bg-slate-900/[0.02]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;