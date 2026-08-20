import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import { 
  User, 
  Building, 
  Sun, 
  Moon, 
  Scale, 
  Bell, 
  CheckCircle2, 
  ShieldCheck,
  Save,
  Globe2,
  Sliders
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { showNotification } = useNotification();

  const [activeTab, setActiveTab] = useState<'profile' | 'organization' | 'theme' | 'units' | 'notifications'>('profile');

  const [profile, setProfile] = useState({
    name: 'Dr. Aris Thorne',
    title: 'Lead Metallurgical LCA Specialist',
    email: 'dr.aris.thorne@vedanta-hindalco.com',
    role: 'Principal Evaluator / System Admin',
  });

  const [organization, setOrganization] = useState({
    name: 'Vedanta / Hindalco Primary Metals Ltd.',
    facility: 'Odisha Primary Smelter Complex',
    gridRegion: 'CEA Eastern Regional Grid (India)',
    country: 'India',
    annualCapacity: '1,500,000 Tonnes / Year',
  });

  const [units, setUnits] = useState({
    massUnit: 'Metric Tonne (t)',
    energyUnit: 'Kilowatt-hour (kWh)',
    ghgUnit: 't CO₂e (IPCC AR6 GWP 100)',
    waterUnit: 'Cubic Metres (m³)',
  });

  const [notificationsConfig, setNotificationsConfig] = useState({
    emailAlerts: true,
    anomalyDetection: true,
    scenarioValidation: true,
    weeklyReportDigest: false,
  });

  const handleSave = (section: string) => {
    showNotification({
      title: 'Preferences Updated',
      description: `Saved changes to ${section} configuration.`,
      type: 'success',
    });
  };

  const tabs = [
    { id: 'profile' as const, label: 'User Profile', icon: User },
    { id: 'organization' as const, label: 'Facility & Organization', icon: Building },
    { id: 'theme' as const, label: 'Theme & Appearance', icon: Sun },
    { id: 'units' as const, label: 'Scientific Units', icon: Scale },
    { id: 'notifications' as const, label: 'Notifications & Alerts', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
          System Preferences & Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure user identity, smelting facility parameters, scientific units, and notification triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-8 lg:col-span-9 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                User Engineering Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name & Title
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Engineering Role
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={e => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Permission Group
                  </label>
                  <input
                    type="text"
                    disabled
                    value={profile.role}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => handleSave('Profile')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Smelter & Mining Facility Metadata
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Corporate Entity
                  </label>
                  <input
                    type="text"
                    value={organization.name}
                    onChange={e => setOrganization({ ...organization, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Smelter / Refinery Site
                  </label>
                  <input
                    type="text"
                    value={organization.facility}
                    onChange={e => setOrganization({ ...organization, facility: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Regional Electricity Grid Interconnection
                  </label>
                  <input
                    type="text"
                    value={organization.gridRegion}
                    onChange={e => setOrganization({ ...organization, gridRegion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Annual Smelting Output Capacity
                  </label>
                  <input
                    type="text"
                    value={organization.annualCapacity}
                    onChange={e => setOrganization({ ...organization, annualCapacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => handleSave('Facility Metadata')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Facility Config</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Visual Theme & Display Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setTheme('light')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Sun className="w-6 h-6 text-amber-500 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Light Mode</h4>
                  <p className="text-xs text-slate-500 mt-1">Crisp high-contrast daylight presentation mode.</p>
                </div>

                <div
                  onClick={() => setTheme('dark')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Moon className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode (Default)</h4>
                  <p className="text-xs text-slate-500 mt-1">Slate & emerald low-glare control room theme.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Scientific Unit Systems & Characterization Standards
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mass & Weight Base Unit
                  </label>
                  <select
                    value={units.massUnit}
                    onChange={e => setUnits({ ...units, massUnit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option>Metric Tonne (t)</option>
                    <option>Kilogram (kg)</option>
                    <option>Short Ton (US)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Energy Characterization Unit
                  </label>
                  <select
                    value={units.energyUnit}
                    onChange={e => setUnits({ ...units, energyUnit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option>Kilowatt-hour (kWh)</option>
                    <option>Megawatt-hour (MWh)</option>
                    <option>Gigajoule (GJ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Global Warming Characterization Model
                  </label>
                  <select
                    value={units.ghgUnit}
                    onChange={e => setUnits({ ...units, ghgUnit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option>t CO₂e (IPCC AR6 GWP 100)</option>
                    <option>kg CO₂e (IPCC AR5 GWP 100)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Water Stress Characterization Model
                  </label>
                  <select
                    value={units.waterUnit}
                    onChange={e => setUnits({ ...units, waterUnit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option>Cubic Metres (m³ AWARE)</option>
                    <option>Kilolitres (kL)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => handleSave('Units')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Unit Configuration</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Automated Alerts & Telemetry Triggers
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Telemetry Anomaly Detection Alerts
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Flag SCADA water / power intake outliers that deviate &gt;20% from historical benchmarks.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsConfig.anomalyDetection}
                    onChange={e => setNotificationsConfig({ ...notificationsConfig, anomalyDetection: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      AI Scenario Simulation Validation Notifications
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Notify when AI neural approximation finishes physics convergence checks.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsConfig.scenarioValidation}
                    onChange={e => setNotificationsConfig({ ...notificationsConfig, scenarioValidation: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Weekly Executive ESG Dossier Summary
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Automated digest of total Scope 1-3 emissions and scrap recovery rates.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsConfig.weeklyReportDigest}
                    onChange={e => setNotificationsConfig({ ...notificationsConfig, weeklyReportDigest: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => handleSave('Notifications')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notification Preferences</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
