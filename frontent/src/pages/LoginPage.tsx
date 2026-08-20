import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Pickaxe, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  EyeOff, 
  Building, 
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchDemoUser } = useAuth();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState('dr.aris.thorne@vedanta-hindalco.com');
  const [password, setPassword] = useState('passcode1234');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<'thorne' | 'sharma' | 'mehta'>('thorne');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const persona = DEMO_PERSONAS[selectedPersona] || DEMO_PERSONAS.thorne;
    login({
      name: persona.name,
      email: email,
      title: persona.title,
      organization: persona.organization,
      facility: persona.facility,
      role: persona.role,
    });

    showNotification({
      title: 'Authentication Successful',
      description: `Welcome back, ${persona.name}. ISO 14044 workspace ready.`,
      type: 'success',
    });
    navigate('/dashboard');
  };

  const handleSelectPersona = (key: 'thorne' | 'sharma' | 'mehta') => {
    setSelectedPersona(key);
    const p = DEMO_PERSONAS[key];
    setEmail(p.email);
    setPassword('demoSecureKey#2026');
    showNotification({
      title: 'Demo Persona Applied',
      description: `Loaded credentials for ${p.name} (${p.title})`,
      type: 'info',
    });
  };

  const handleSsoLogin = () => {
    login(DEMO_PERSONAS.thorne);
    showNotification({
      title: 'Enterprise SSO Verified',
      description: 'Logged in via Corporate Metallurgical Identity Provider.',
      type: 'success',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md text-center">
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
          Sign In to Workspace
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Life Cycle Assessment & Circularity Intelligence Engine
        </p>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-2xl space-y-6">
          {/* Top Auth Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-850 border border-slate-800 text-xs font-bold">
            <button
              className="py-2.5 rounded-xl bg-emerald-600 text-white shadow-sm transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="py-2.5 rounded-xl text-slate-400 hover:text-white transition-all"
            >
              Register Facility
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="engineer@miningcorp.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Security Passcode / Token
                </label>
                <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">
                  Forgot token?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-slate-850 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-850 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember session credentials</span>
              </label>
              <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>ISO 14044 Verified</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>Access Assessment Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSsoLogin}
              className="w-full py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs rounded-xl border border-slate-800 transition-colors flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-teal-400" />
              <span>Enterprise SAML / OAuth SSO Login</span>
            </button>
          </form>

          {/* Quick Demo Personas For Hackathon Evaluators */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Quick Demo Personas (One-Click Fill)</span>
              <span className="text-[10px] text-emerald-400 font-mono">SIH 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectPersona('thorne')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedPersona === 'thorne'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 ring-1 ring-emerald-500/30'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs truncate">Dr. Aris Thorne</div>
                <div className="text-[10px] text-slate-400 truncate">Lead Metallurgist</div>
                <div className="text-[9px] text-emerald-400 font-mono mt-1">Aluminium Smelter</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPersona('sharma')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedPersona === 'sharma'
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300 ring-1 ring-teal-500/30'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs truncate">Priya Sharma</div>
                <div className="text-[10px] text-slate-400 truncate">Process Engineer</div>
                <div className="text-[9px] text-teal-400 font-mono mt-1">Tata Steel DRI-EAF</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPersona('mehta')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedPersona === 'mehta'
                    ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 ring-1 ring-purple-500/30'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs truncate">Vikram Mehta</div>
                <div className="text-[10px] text-slate-400 truncate">CBAM Auditor</div>
                <div className="text-[9px] text-purple-400 font-mono mt-1">Copper Refinery</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
