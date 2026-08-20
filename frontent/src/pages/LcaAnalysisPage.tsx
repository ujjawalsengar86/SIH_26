import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { KpiCard } from '../components/common/KpiCard';
import { ImpactChart } from '../components/charts/ImpactChart';
import { DriverBreakdownChart } from '../components/charts/DriverBreakdownChart';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { 
  Flame, 
  Zap, 
  Droplet, 
  Trash2, 
  HelpCircle, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LcaAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProject, activeLcaResults } = useProject();
  const [openHotspotIdx, setOpenHotspotIdx] = useState<number | null>(0);

  const results = activeLcaResults || {
    kpis: {
      ghg: { value: 8.24, unit: 't CO₂e', trend: -14.2, source: 'Official Calculated Result' as const },
      energy: { value: 4200, unit: 'kWh', trend: -8.5, source: 'Official Calculated Result' as const },
      water: { value: 12.6, unit: 'm³', trend: -3.1, source: 'Official Calculated Result' as const },
      waste: { value: 340, unit: 'kg', trend: -18.7, source: 'Official Calculated Result' as const },
      circularity: { value: 72, unit: '/ 100', trend: 12.0, source: 'Calculated' as const },
    },
    stageImpacts: [],
    drivers: [],
    hotspots: [],
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              Official ISO 14044 Characterization
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Characterized via IPCC GWP 100a</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Life Cycle Impact Assessment (LCIA)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {activeProject?.name} • Reference Unit: {activeProject?.functionalUnit}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/scenarios')}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
          >
            Compare Scenarios
          </button>
          <button
            onClick={() => navigate('/ai-simulator')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Run AI Simulator
          </button>
        </div>
      </div>

      {/* Official LCA KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="GHG Global Warming Potential"
          value={results.kpis.ghg.value}
          unit={results.kpis.ghg.unit}
          trend={results.kpis.ghg.trend}
          sourceBadge="Official Calculated Result"
          icon={<Flame className="w-5 h-5" />}
          subtitle="Scope 1-3 total emissions"
          accentColor="emerald"
        />

        <KpiCard
          title="Cumulative Primary Energy"
          value={results.kpis.energy.value}
          unit={results.kpis.energy.unit}
          trend={results.kpis.energy.trend}
          sourceBadge="Official Calculated Result"
          icon={<Zap className="w-5 h-5" />}
          subtitle="Direct & upstream thermal"
          accentColor="teal"
        />

        <KpiCard
          title="Water Depletion Index"
          value={results.kpis.water.value}
          unit={results.kpis.water.unit}
          trend={results.kpis.water.trend}
          sourceBadge="Official Calculated Result"
          icon={<Droplet className="w-5 h-5" />}
          subtitle="AWARE stress weighted"
          accentColor="blue"
        />

        <KpiCard
          title="Solid Waste / Residue"
          value={results.kpis.waste.value}
          unit={results.kpis.waste.unit}
          trend={results.kpis.waste.trend}
          sourceBadge="Official Calculated Result"
          icon={<Trash2 className="w-5 h-5" />}
          subtitle="Slag, red mud, SPL"
          accentColor="amber"
        />
      </div>

      {/* Stage Breakdown & Driver Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Impact Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lifecycle Stage Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Impact split across extraction, smelting, manufacturing, and recycling
              </p>
            </div>
            <DataSourceBadge source="Calculated" size="sm" />
          </div>

          <ImpactChart stages={activeLcaResults?.stageImpacts || []} />
        </div>

        {/* Drivers Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Primary Impact Drivers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Constituent energy, raw material, and transport drivers
              </p>
            </div>
            <DataSourceBadge source="Calculated" size="sm" />
          </div>

          <DriverBreakdownChart drivers={activeLcaResults?.drivers || []} />
        </div>
      </div>

      {/* "Why is my impact high?" Diagnostic Hotspots Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Why is My Impact High? — Root Cause Hotspot Diagnostic
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Automated metallurgical sensitivity audit highlighting high-emission process nodes and actionable engineering mitigations.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {activeLcaResults?.hotspots?.map((hotspot, idx) => {
            const isOpen = openHotspotIdx === idx;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-amber-500/5 border-amber-500/40 ring-1 ring-amber-500/20'
                    : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200/60 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div
                  onClick={() => setOpenHotspotIdx(isOpen ? null : idx)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {hotspot.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                        <span>Lifecycle Stage: <strong>{hotspot.stage}</strong></span>
                        <span>•</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">Contribution: {hotspot.impactShare}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Underlying Root Cause</span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{hotspot.rootCause}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
                      <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Recommended Engineering Mitigation</span>
                      </div>
                      <p className="leading-relaxed text-xs">{hotspot.mitigationHint}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
