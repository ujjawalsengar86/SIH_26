import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pickaxe, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Recycle, 
  BarChart3, 
  Cpu, 
  Layers, 
  QrCode, 
  CheckCircle, 
  TrendingDown, 
  Globe2, 
  Database,
  Lock,
  ChevronRight,
  Flame,
  Zap,
  Leaf
} from 'lucide-react';
import { LifecycleStagesFlow } from '../components/charts/LifecycleStagesFlow';
import { CircularityGauge } from '../components/common/CircularityGauge';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: 'Real-Time Process Data Fidelity',
      desc: 'Ingest ground-level smelter potline meters, SCADA energy streams, and mass telemetry alongside validated Ecoinvent reference databases.',
      icon: <Database className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Physics-Guided AI Simulator',
      desc: 'Simulate high-temperature scrap remelting yields, captive renewable PPAs, and rail modal shifts with instant multi-parameter feedback.',
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
    },
    {
      title: 'Digital Material Passports (DPP)',
      desc: 'Generate tamper-evident passports for alloy ingots, cathodes, and billets with verifiable QR codes and full elemental traceability.',
      icon: <QrCode className="w-6 h-6 text-blue-500" />,
    },
    {
      title: 'CBAM & ISO 14040/14044 Ready',
      desc: 'Audit-grade carbon declarations and pedigree matrix scoring tailored for European Union CBAM compliance and BRSR Core ESG disclosures.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    },
  ];

  const pillars = [
    {
      number: '01',
      title: 'The Challenge in Mining & Metals',
      headline: 'Heavy Emissions & Complex Supply Chains',
      desc: 'Mining and primary metallurgy account for over 10% of global greenhouse gas emissions. Complex thermodynamics and data fragmentation make standard sustainability reporting slow, opaque, and non-actionable.',
      metric: '10%+',
      subtext: 'of Global Greenhouse Emissions',
    },
    {
      number: '02',
      title: 'Our AI-Driven Solution',
      headline: 'Deterministic LCA Powered by Intelligent Synthesis',
      desc: 'AuraLCA bridges the gap between rigorous ISO 14044 deterministic life cycle assessment and AI-powered scenario optimization, empowering metallurgical engineers to de-risk circular transition pathways.',
      metric: '95%',
      subtext: 'Energy Savings in Circular Remelt',
    },
    {
      number: '03',
      title: 'Decarbonization at Scale',
      headline: 'From Linear Smelting to Closed-Loop Systems',
      desc: 'Model scrap blends, spent potlining hydrometallurgical recovery, red mud valorization in cement clinker, and captive renewable energy integration in minutes instead of months.',
      metric: '70%+',
      subtext: 'Achievable Decarbonization Potential',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Pickaxe className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
                AuraLCA <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">Enterprise</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Mining & Metallurgy Sustainability Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/40 transition-all flex items-center space-x-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
            <Leaf className="w-3.5 h-3.5" />
            <span>SIH 2026 Innovation Showcase • ISO 14040/14044 Certified Methodology</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI-Powered LCA for a <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Circular Mining & Metallurgy Future
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Calculate environmental impacts from real process data, compare circular alternatives, and use AI to discover better sustainability strategies across extraction, smelting, and alloy fabrication.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/new-lca')}
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start LCA Wizard</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Enterprise Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metallurgical Visual Lifecycle Flow */}
        <div className="max-w-6xl mx-auto mt-16 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
              End-to-End Metallurgical Material Flow
            </span>
            <h2 className="text-lg font-bold text-white mt-1">
              Integrated Cradle-to-Grave System Architecture
            </h2>
          </div>
          <LifecycleStagesFlow />
        </div>
      </section>

      {/* Problem, Solution & Decarbonization Pillars */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900/60 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Core Value Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Transforming Heavy Industry With Transparent Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(p => (
              <div
                key={p.number}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold font-mono text-emerald-500 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/20 inline-block mb-4">
                    {p.number}
                  </span>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{p.title}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{p.headline}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold font-mono text-emerald-400">{p.metric}</span>
                    <span className="block text-[11px] text-slate-400">{p.subtext}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Grid: AI Decision Support, Material Passport, Scenarios */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section 1: AI Decision Support */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded border border-purple-500/20 inline-block">
                AI Decision Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Physics-Informed AI Simulator for Metallurgical Optimization
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tune feedstock scrap ratios, captive solar/wind PPAs, spent potlining recovery, and freight haulage modes. Our responsive AI simulator predicts emissions reductions, confidence bounds, and technology feasibility in real time before formal deterministic engine validation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/ai-simulator')}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-purple-400 hover:text-purple-300"
                >
                  <span>Launch AI Simulator</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300">Live AI Estimation Preview</span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">AI Prediction Mode</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Predicted GHG</span>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">5.9 t CO₂e</div>
                  <span className="text-[10px] text-emerald-500 font-semibold">-28% vs Baseline</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">AI Confidence</span>
                  <div className="text-xl font-mono font-bold text-purple-400 mt-0.5">88%</div>
                  <span className="text-[10px] text-purple-400 font-semibold">High Model Agreement</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                Key Driver: Upgrading to 60% post-consumer scrap sorting saves 3.2 t CO₂e/t.
              </div>
            </div>
          </div>

          {/* Section 2: Circularity & Material Passport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
              <CircularityGauge score={84} />
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/20 inline-block">
                Circularity & Traceability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tamper-Evident Digital Material Passports
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Embed verified recycled content (60%), scrap recoverability (86%), and embodied carbon intensity (3.2 t CO₂e/t) into an enterprise Digital Material Passport (DPP) with immutable hash validation for downstream automotive and aerospace buyers.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/material-passport')}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Inspect Digital Material Passport</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Benefits */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Built For Industry</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Enterprise Features For Metallurgists & Sustainability Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="p-3 bg-slate-800 w-fit rounded-2xl">{b.icon}</div>
                <h3 className="text-sm font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-emerald-900/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Decarbonize Your Metallurgical Value Chain?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Step through the 7-step guided LCA wizard, simulate clean scrap scenarios, and generate audit-grade reports.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/new-lca')}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Start New LCA Assessment
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all"
            >
              View Analytics Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
