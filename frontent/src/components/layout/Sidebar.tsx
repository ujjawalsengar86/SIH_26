import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  BarChart3, 
  GitCompare, 
  Cpu, 
  Recycle, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  History, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Pickaxe
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, onNavigate }) => {
  const location = useLocation();

  const navigationSections = [
    {
      title: 'CORE PLATFORM',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Projects', path: '/projects', icon: FolderKanban },
        { name: 'New LCA Wizard', path: '/new-lca', icon: PlusCircle, badge: 'New' },
        { name: 'LCA Analysis', path: '/analysis', icon: BarChart3 },
      ]
    },
    {
      title: 'CIRCULARITY & SIMULATION',
      items: [
        { name: 'Scenarios', path: '/scenarios', icon: GitCompare },
        { name: 'AI Insights Simulator', path: '/ai-simulator', icon: Cpu, badge: 'AI' },
        { name: 'Circularity Hub', path: '/circularity', icon: Recycle },
        { name: 'Material Passport', path: '/material-passport', icon: QrCode },
        { name: 'AI Recommendations', path: '/recommendations', icon: Sparkles },
      ]
    },
    {
      title: 'GOVERNANCE & AUDIT',
      items: [
        { name: 'Data Quality', path: '/data-quality', icon: ShieldCheck },
        { name: 'Assumptions', path: '/assumptions', icon: BookOpen },
        { name: 'Audit Trail', path: '/audit-trail', icon: History },
        { name: 'Reports', path: '/reports', icon: FileText },
        { name: 'Settings', path: '/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <NavLink
            to="/dashboard"
            onClick={onNavigate}
            className="flex items-center space-x-3 overflow-hidden focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
              <Pickaxe className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  AuraLCA <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">Metals</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Mining & Metallurgy LCA
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(prev => !prev)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Link List */}
        <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navigationSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {section.title}
                </div>
              )}
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onNavigate}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                            item.badge === 'AI' 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* ISO Compliance Pill Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <div className="font-semibold text-slate-200">ISO 14040/14044 Engine</div>
              <div className="text-[10px] text-slate-500">Ready for Spring Boot API</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
