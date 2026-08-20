import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ComparisonChart } from '../components/charts/ComparisonChart';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { 
  GitCompare, 
  TrendingDown, 
  TrendingUp, 
  Recycle, 
  Zap, 
  Flame, 
  Droplet, 
  Trash2, 
  Plus, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScenarioComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const { scenarios } = useProject();
  const [activeTab, setActiveTab] = useState<'matrix' | 'cards'>('matrix');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              Demo Scenario Simulation
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Multi-Variant Sensitivity</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Metallurgical Scenario Comparison
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare environmental trade-offs between 100% Virgin Mining, Current Baseline, 30% Scrap, 60% Closed-Loop, and 80% High-Circularity Green Metal.
          </p>
        </div>

        <button
          onClick={() => navigate('/ai-simulator')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simulate Custom Scenario</span>
        </button>
      </div>

      {/* Comparison Grouped Bar Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Comparative Impact Metrics (Per 1 Tonne Metal)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select metric to view cross-scenario variance
            </p>
          </div>
          <DataSourceBadge source="AI Prediction" size="sm" />
        </div>

        <ComparisonChart scenarios={scenarios} />
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map(sc => {
          const isBaseline = sc.isBaseline;
          return (
            <div
              key={sc.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                isBaseline
                  ? 'bg-slate-50 dark:bg-slate-850/80 border-slate-300 dark:border-slate-700 shadow-xs'
                  : sc.recycledContentPct >= 60
                  ? 'bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                    isBaseline
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {isBaseline ? 'Reference Baseline' : 'Demo Scenario'}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                    MCI {sc.metrics.circularityScore}/100
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                  {sc.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {sc.description}
                </p>

                {/* Scenario Parameter Specs */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 mb-4 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Recycled Scrap</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{sc.recycledContentPct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Renewable Power</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{sc.renewableEnergyPct}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Logistics Mode</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate block">{sc.transportMode.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Scrap Recovery</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{sc.recoveryRatePct}%</span>
                  </div>
                </div>
              </div>

              {/* Environmental Metrics Result Box */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-emerald-500" /> GHG Emissions:
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{sc.metrics.ghg} t CO₂e</span>
                    {!isBaseline && (
                      <span className={`text-[10px] font-bold ${sc.metrics.ghgReductionPct >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        ({sc.metrics.ghgReductionPct >= 0 ? `-${sc.metrics.ghgReductionPct}%` : `+${Math.abs(sc.metrics.ghgReductionPct)}%`})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-teal-500" /> Energy Demand:
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{sc.metrics.energy.toLocaleString()} kWh</span>
                    {!isBaseline && (
                      <span className={`text-[10px] font-bold ${sc.metrics.energyReductionPct >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        ({sc.metrics.energyReductionPct >= 0 ? `-${sc.metrics.energyReductionPct}%` : `+${Math.abs(sc.metrics.energyReductionPct)}%`})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Recycle className="w-3.5 h-3.5 text-purple-500" /> Circularity Delta:
                  </span>
                  <span className={`font-mono font-bold ${sc.metrics.circularityDelta >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-rose-500'}`}>
                    {sc.metrics.circularityDelta >= 0 ? `+${sc.metrics.circularityDelta} pts` : `${sc.metrics.circularityDelta} pts`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
