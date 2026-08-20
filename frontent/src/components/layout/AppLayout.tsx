import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

export const AppLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Desktop Collapsible Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMobileNav={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-400 dark:text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>AuraLCA Enterprise — Decision Support System for Sustainable Metallurgy & Mining</span>
            <div className="flex items-center space-x-4 text-[11px]">
              <span>ISO 14040/14044 Standards Compliant</span>
              <span>•</span>
              <span>Smart India Hackathon 2026 Edition</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
