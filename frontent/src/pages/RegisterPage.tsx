import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Pickaxe, 
  Lock, 
  Mail, 
  Building, 
  MapPin, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    title: 'Senior Metallurgical Process Engineer',
    email: '',
    organization: '',
    facilityLocation: 'Jharsuguda Smelter Complex, Odisha',
    sector: 'Aluminium Smelting & Ingot Casting',
    energySource: 'Captive Thermal + 25MW Solar PPA',
    password: '',
    confirmPassword: '',
    agreeCompliance: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      showNotification({
        title: 'Passcode Mismatch',
        description: 'Password and confirmation passcodes do not match.',
        type: 'error',
      });
      return;
    }

    login({
      name: formData.name || 'Dr. Aris Thorne',
      email: formData.email || 'engineer@metals-lca.org',
      title: formData.title,
      organization: formData.organization || 'National Metallurgy Group',
      facility: formData.facilityLocation,
      role: 'Lead Metallurgical LCA Specialist',
    });

    showNotification({
      title: 'Facility Registered & Verified',
      description: `Welcome ${formData.name || 'Engineer'}. ISO 14044 baseline workspace deployed.`,
      type: 'success',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center space-x-3 mb-4 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Pickaxe className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              AuraLCA <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">Enterprise</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Mining & Metallurgy Decision Support
            </span>
          </div>
        </Link>

        <h2 className="text-2xl font-extrabold tracking-tight text-white mt-2">
          Register Mining & Smelter Facility
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Deploy ISO 14044 Compliant Life Cycle Assessment Infrastructure
        </p>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-2xl space-y-6">
          {/* Top Auth Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-850 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => navigate('/login')}
              className="py-2.5 rounded-xl text-slate-400 hover:text-white transition-all"
            >
              Sign In
            </button>
            <button
              className="py-2.5 rounded-xl bg-emerald-600 text-white shadow-sm transition-all"
            >
              Register Facility
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name / Lead Engineer *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Aris Thorne"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Engineering Designation
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Corporate Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="engineer@hindalco-metals.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Metallurgical Enterprise *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hindalco / Tata Steel / Adani Copper"
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Smelter / Facility Site Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jharsuguda Smelter Complex, Odisha"
                  value={formData.facilityLocation}
                  onChange={e => setFormData({ ...formData, facilityLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Primary Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={e => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option>Aluminium Smelting & Ingot Casting</option>
                  <option>Copper Flash Smelting & Refining</option>
                  <option>Green Steel (DRI-EAF Route)</option>
                  <option>Lithium Chemical Hydrometallurgy</option>
                  <option>Zinc & Lead Pyrometallurgy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Primary Power Supply Mix
                </label>
                <select
                  value={formData.energySource}
                  onChange={e => setFormData({ ...formData, energySource: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option>Captive Thermal + 25MW Solar PPA</option>
                  <option>Regional Grid (33kV/132kV CEA Baseline)</option>
                  <option>100% Round-the-Clock (RTC) Renewable</option>
                  <option>Natural Gas Co-Generation Turbine</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Security Passcode *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Confirm Passcode *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1 text-xs text-slate-400">
              <input
                type="checkbox"
                id="agree"
                checked={formData.agreeCompliance}
                onChange={e => setFormData({ ...formData, agreeCompliance: e.target.checked })}
                className="rounded border-slate-700 bg-slate-850 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="agree" className="cursor-pointer">
                I agree to adhere to ISO 14040/14044 data integrity protocols & CBAM audit guidelines.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>Deploy Facility Assessment Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-400 font-bold hover:underline">
              Sign In to Workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
