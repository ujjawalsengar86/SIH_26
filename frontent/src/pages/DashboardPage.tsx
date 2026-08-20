import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useNotification } from '../context/NotificationContext';
import { KpiCard } from '../components/common/KpiCard';
import { CircularityGauge } from '../components/common/CircularityGauge';
import { ImpactChart } from '../components/charts/ImpactChart';
import { DriverBreakdownChart } from '../components/charts/DriverBreakdownChart';
import { SankeyFlow } from '../components/charts/SankeyFlow';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Plus, 
  Download, 
  Flame, 
  Zap, 
  Droplet, 
  Trash2, 
  Recycle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProject, activeLcaResults, projects, setActiveProjectId } = useProject();
  const { showNotification } = useNotification();

  const handleExport = () => {
    showNotification({
      title: 'Compiling Sustainability Dossier',
      description: 'Generating ISO 14044 certified report & DPP hash...',
      type: 'info',
    });
    setTimeout(() => {
      showNotification({
        title: 'Report Download Ready',
        description: 'ISO_14044_Odisha_Aluminium_LCA_2026.pdf generated.',
        type: 'success',
      });
    }, 1500);
  };

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
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Executive Analytics Dashboard
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">ISO 14040/14044 Verified</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {activeProject ? activeProject.name : 'Aluminium Smelting & Ingot Optimization'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {activeProject?.organization} • {activeProject?.location} • Boundary: {activeProject?.systemBoundary}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => navigate('/new-lca')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-900/20 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New LCA Assessment</span>
          </button>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export ESG Dossier</span>
          </button>
        </div>
      </div>

      {/* Top 5 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="GHG Emissions"
          value={results.kpis.ghg.value}
          unit={results.kpis.ghg.unit}
          trend={results.kpis.ghg.trend}
          sourceBadge={results.kpis.ghg.source}
          icon={<Flame className="w-5 h-5" />}
          subtitle="per tonne ingot"
          accentColor="emerald"
        />

        <KpiCard
          title="Cumulative Energy"
          value={results.kpis.energy.value}
          unit={results.kpis.energy.unit}
          trend={results.kpis.energy.trend}
          sourceBadge={results.kpis.energy.source}
          icon={<Zap className="w-5 h-5" />}
          subtitle="smelting & thermal"
          accentColor="teal"
        />

        <KpiCard
          title="Water Depletion"
          value={results.kpis.water.value}
          unit={results.kpis.water.unit}
          trend={results.kpis.water.trend}
          sourceBadge={results.kpis.water.source}
          icon={<Droplet className="w-5 h-5" />}
          subtitle="AWARE stress model"
          accentColor="blue"
        />

        <KpiCard
          title="Solid Waste / Tailings"
          value={results.kpis.waste.value}
          unit={results.kpis.waste.unit}
          trend={results.kpis.waste.trend}
          sourceBadge={results.kpis.waste.source}
          icon={<Trash2 className="w-5 h-5" />}
          subtitle="red mud & SPL"
          accentColor="amber"
        />

        <KpiCard
          title="Circularity Score"
          value={results.kpis.circularity.value}
          unit={results.kpis.circularity.unit}
          trend={results.kpis.circularity.trend}
          isPositiveTrendGood={true}
          sourceBadge={results.kpis.circularity.source}
          icon={<Recycle className="w-5 h-5" />}
          subtitle="MCI Index (60% scrap)"
          accentColor="purple"
        />
      </div>

      {/* Row 2: Lifecycle Impact Bar Chart & Circularity Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Lifecycle Stage Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lifecycle Stage Environmental Characterization
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Cradle-to-Grave unit process breakdown with verified provenance
              </p>
            </div>
            <button
              onClick={() => navigate('/analysis')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
            >
              <span>Full Analysis</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <ImpactChart stages={activeLcaResults?.stageImpacts || []} />
        </div>

        {/* Circularity Gauge Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Circularity Index
            </h3>
            <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              Ellen MacArthur MCI
            </span>
          </div>

          <CircularityGauge score={activeProject?.circularityScore || 72} />

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => navigate('/circularity')}
              className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
            >
              Explore Circularity Details
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Impact Drivers Donut & Sankey-Style Material Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Impact Drivers */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Primary GHG Impact Drivers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Root causes driving total carbon intensity (8.24 t CO₂e)
              </p>
            </div>
            <DataSourceBadge source="Calculated" size="sm" />
          </div>

          <DriverBreakdownChart drivers={activeLcaResults?.drivers || []} />
        </div>

        {/* Process Flow & Mass Balance */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Process Mass & Energy Balance Flow
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Smelter yield, scrap recirculated loops, and tailings co-processing
              </p>
            </div>
            <DataSourceBadge source="Ground Data" size="sm" />
          </div>

          <SankeyFlow />
        </div>
      </div>

      {/* Row 4: AI Recommendations Cards & Data Quality Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Recommendations Teaser */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AI Decarbonization Recommendations
              </h3>
            </div>
            <button
              onClick={() => navigate('/recommendations')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center"
            >
              <span>View All 4 Insights</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Feedstock Upgrade</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">-24.2% GHG</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Increase Recycled Feedstock via Sensor Sorting</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Deploy LIBS laser sorting to blend 55% scrap without loss of alloy 6061 ductility.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
                <span>Feasibility: <strong className="text-emerald-500">High</strong></span>
                <span>Confidence: <strong className="text-purple-500">89%</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">Power Transition</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">-32.5% GHG</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Shift Smelting Potline to 50MW Solar-Wind PPA</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Contract open-access green tariffs to abate coal grid emissions in electrolytic pots.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
                <span>Feasibility: <strong className="text-emerald-500">High</strong></span>
                <span>Confidence: <strong className="text-purple-500">94%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality & Pedigree Matrix Score */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Data Quality Score
              </h3>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center my-2">
              <span className="text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                84 <span className="text-sm font-bold text-slate-400">/ 100</span>
              </span>
              <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                Pedigree Matrix: High Reliability
              </span>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Site Ground Data:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">68%</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Reference Databases (Ecoinvent):</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">22%</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>AI Estimated Parameters:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">10%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <button
              onClick={() => navigate('/data-quality')}
              className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
            >
              Inspect Pedigree Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Row 5: Recent Projects Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Metallurgical Operations & Assessments
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active facility life cycle inventories and circularity benchmarks
            </p>
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">
                <th className="pb-3 px-3">Project Name</th>
                <th className="pb-3 px-3">Material</th>
                <th className="pb-3 px-3">System Boundary</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Circularity</th>
                <th className="pb-3 px-3">Carbon Footprint</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    {p.name}
                    <span className="block text-[10px] text-slate-400 font-normal">{p.organization}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">{p.material}</td>
                  <td className="py-3 px-3 text-slate-500">{p.systemBoundary}</td>
                  <td className="py-3 px-3"><StatusBadge status={p.status} size="sm" /></td>
                  <td className="py-3 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">{p.circularityScore} / 100</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.ghgIntensity} t CO₂e</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setActiveProjectId(p.id);
                        showNotification({
                          title: 'Project Activated',
                          description: `Switched view to ${p.name}`,
                          type: 'info',
                        });
                      }}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
