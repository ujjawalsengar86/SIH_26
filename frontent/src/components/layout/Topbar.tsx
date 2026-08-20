import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useAuth, DEMO_PERSONAS } from '../../context/AuthContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  Plus, 
  Download, 
  Layers, 
  ChevronDown, 
  Menu, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  User,
  LogOut,
  Settings,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onOpenMobileNav: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileNav }) => {
  const { projects, activeProject, setActiveProjectId } = useProject();
  const { theme, toggleTheme } = useTheme();
  const { showNotification } = useNotification();
  const { user, logout, switchDemoUser } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Scrap Blend Feasibility Verified',
      desc: 'AI verified 60% scrap remelt meets AA 6061 ductility standard.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Pedigree Data Matrix Updated',
      desc: '2 anomalies flagged in smelter potline water consumption telemetry.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'CBAM Compliance Dossier Exported',
      desc: 'Export signed by Dr. Aris Thorne for EU customs submission.',
      time: '3h ago',
      unread: false,
    },
  ];

  const handleExport = () => {
    showNotification({
      title: 'Generating Sustainability Dossier',
      description: 'Compiling ISO 14044 LCA metrics and Digital Material Passport...',
      type: 'info',
      duration: 3000,
    });
    setTimeout(() => {
      showNotification({
        title: 'Export Ready (Mock)',
        description: 'Report "ISO_14044_Aluminium_LCA_2026.pdf" prepared for download.',
        type: 'success',
      });
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    showNotification({
      title: 'Signed Out',
      description: 'You have been safely signed out of your session.',
      type: 'info',
    });
    navigate('/login');
  };

  const currentUser = user || DEMO_PERSONAS.thorne;

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Left side: Mobile menu toggle + Project switcher */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(prev => !prev)}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 leading-none">
                Active Assessment
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-[240px]">
                {activeProject ? activeProject.name : 'Select Project'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          </button>

          {/* Project Dropdown Menu */}
          {showProjectMenu && (
            <div 
              className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setShowProjectMenu(false)}
            >
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Mining & Metallurgy Projects</span>
                <span className="text-emerald-500 font-mono font-bold">{projects.length} Total</span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                {projects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProjectId(proj.id);
                      setShowProjectMenu(false);
                      showNotification({
                        title: 'Project Activated',
                        description: `Switched active context to ${proj.name}`,
                        type: 'info',
                      });
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between ${
                      activeProject?.id === proj.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-500/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold truncate max-w-[200px]">{proj.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{proj.material} • {proj.organization}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {proj.ghgIntensity} t
                    </span>
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                <button
                  onClick={() => {
                    setShowProjectMenu(false);
                    navigate('/new-lca');
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start New Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Quick Actions, Theme, Notifications, Profile */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* New Project Quick Button */}
        <button
          onClick={() => navigate('/new-lca')}
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New LCA</span>
        </button>

        {/* Export Report Quick Button */}
        <button
          onClick={handleExport}
          className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          {showNotifications && (
            <div 
              className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in"
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">System Notifications</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 py-1 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="py-2.5 hover:bg-slate-50 dark:hover:bg-slate-850 px-2 rounded-xl transition-colors">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{n.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Interactive Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(prev => !prev)}
            className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block" />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              {/* User Info Header */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 mb-2">
                <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{currentUser.email}</div>
                <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{currentUser.complianceLevel}</span>
                </div>
              </div>

              {/* Quick Switch Persona Section */}
              <div className="py-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                  <span>Switch Evaluator Persona</span>
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      switchDemoUser('thorne');
                      setShowUserMenu(false);
                      showNotification({
                        title: 'Persona Switched',
                        description: 'Active user is now Dr. Aris Thorne (Aluminium Lead)',
                        type: 'info',
                      });
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>Dr. Aris Thorne (Aluminium)</span>
                    {currentUser.name.includes('Thorne') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoUser('sharma');
                      setShowUserMenu(false);
                      showNotification({
                        title: 'Persona Switched',
                        description: 'Active user is now Priya Sharma (Tata Steel DRI-EAF)',
                        type: 'info',
                      });
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>Priya Sharma (Tata Steel)</span>
                    {currentUser.name.includes('Sharma') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoUser('mehta');
                      setShowUserMenu(false);
                      showNotification({
                        title: 'Persona Switched',
                        description: 'Active user is now Vikram Mehta (Copper CBAM Auditor)',
                        type: 'info',
                      });
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>Vikram Mehta (CBAM Auditor)</span>
                    {currentUser.name.includes('Mehta') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                </div>
              </div>

              {/* Account Navigation & Sign Out */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 space-y-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
