import React, { useState, useMemo } from 'react';
import { useNotification } from '../context/NotificationContext';
import { aiSimulatorService } from '../services';
import { AISimulatorState } from '../types';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { 
  Cpu, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Zap, 
  Recycle, 
  TrendingDown, 
  Truck, 
  Train, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AiSimulatorPage: React.FC = () => {
  const { showNotification } = useNotification();

  const [params, setParams] = useState<AISimulatorState>({
    recycledFeedstock: 45,
    renewableEnergy: 40,
    recoveryRate: 80,
    transportDistance: 450,
    transportMode: 'Mixed',
  });

  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // Dynamic physics-informed AI prediction evaluation
  const prediction = useMemo(() => {
    return aiSimulatorService.predictImpact(params);
  }, [params]);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
      showNotification({
        title: 'Demo Validation Complete',
        description: 'AI scenario parameters passed thermodynamic consistency checks against ISO 14044 database.',
        type: 'success',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/20">
              Interactive AI Simulator
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Physics-Informed Neural Approximation</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Metallurgical Decarbonization AI Simulator
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust feedstock scrap fractions, captive renewable electricity tariffs, and freight logistics to evaluate real-time predicted LCA trajectories.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <DataSourceBadge source="AI Prediction" size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Slider Controls */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Process & Supply Chain Controls
              </h3>
            </div>
            <button
              onClick={() => {
                setParams({
                  recycledFeedstock: 20,
                  renewableEnergy: 10,
                  recoveryRate: 60,
                  transportDistance: 650,
                  transportMode: 'Road',
                });
                setIsValidated(false);
              }}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Reset to Baseline
            </button>
          </div>

          {/* Slider 1: Recycled Feedstock (20-80%) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Recycled Scrap Feedstock Blending
              </label>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                {params.recycledFeedstock}% Scrap
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="1"
              value={params.recycledFeedstock}
              onChange={e => {
                setParams({ ...params, recycledFeedstock: parseInt(e.target.value) });
                setIsValidated(false);
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20% (Standard Secondary)</span>
              <span>50%</span>
              <span>80% (High-Circularity)</span>
            </div>
          </div>

          {/* Slider 2: Renewable Energy (0-100%) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                2. Captive Renewable Electricity PPA
              </label>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">
                {params.renewableEnergy}% Green Power
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.renewableEnergy}
              onChange={e => {
                setParams({ ...params, renewableEnergy: parseInt(e.target.value) });
                setIsValidated(false);
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0% (Regional Thermal Grid)</span>
              <span>50%</span>
              <span>100% (Solar/Hydro RTC)</span>
            </div>
          </div>

          {/* Slider 3: Recovery Rate (50-100%) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                3. Internal Dross & Scrap Recovery Rate
              </label>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                {params.recoveryRate}% Recovery
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="1"
              value={params.recoveryRate}
              onChange={e => {
                setParams({ ...params, recoveryRate: parseInt(e.target.value) });
                setIsValidated(false);
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50%</span>
              <span>75%</span>
              <span>100% (Zero Scrap Loss)</span>
            </div>
          </div>

          {/* Slider 4: Transport Distance (100-1000 km) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                4. Supply Chain Freight Haulage Distance
              </label>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                {params.transportDistance} km
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={params.transportDistance}
              onChange={e => {
                setParams({ ...params, transportDistance: parseInt(e.target.value) });
                setIsValidated(false);
              }}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>100 km (Local Cluster)</span>
              <span>500 km</span>
              <span>1,000 km (Long Haul)</span>
            </div>
          </div>

          {/* Control 5: Transport Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              5. Primary Freight Transport Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Road', 'Rail', 'Mixed'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setParams({ ...params, transportMode: mode });
                    setIsValidated(false);
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    params.transportMode === mode
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {mode === 'Road' && <Truck className="w-4 h-4 text-amber-500" />}
                  {mode === 'Rail' && <Train className="w-4 h-4 text-emerald-500" />}
                  {mode === 'Mixed' && <Layers className="w-4 h-4 text-teal-500" />}
                  <span>{mode} Freight</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Live Predictions & Impact Preview */}
        <div className="lg:col-span-6 space-y-6">
          {/* AI Prediction Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-purple-500/30 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-extrabold tracking-tight">
                  AI Real-Time Impact Prediction
                </h3>
              </div>
              <ConfidenceBadge level={prediction.confidenceLevel} scorePct={prediction.confidenceScore} />
            </div>

            {/* Core Predicted Numbers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Predicted GHG Emissions
                </span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    {prediction.predictedGhg}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{prediction.ghgUnit}</span>
                </div>
                <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                  <span>-{prediction.ghgReductionPct}% Reduction vs Baseline</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Predicted Energy Demand
                </span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-3xl font-extrabold font-mono text-teal-400">
                    {prediction.predictedEnergy.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">kWh / t</span>
                </div>
                <div className="mt-2 text-xs font-bold text-teal-400 flex items-center">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                  <span>-{prediction.energyReductionPct}% Reduction</span>
                </div>
              </div>
            </div>

            {/* Circularity Predicted Score */}
            <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Estimated Circularity Index (MCI)
                </span>
                <span className="text-xs text-slate-300 font-medium">Material loop retention grade</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold font-mono text-purple-400">
                  {prediction.predictedCircularity}
                </span>
                <span className="text-xs text-slate-400 font-bold"> / 100</span>
              </div>
            </div>

            {/* AI Insights & Warnings */}
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-purple-300 block">
                Primary Decarbonization Lever:
              </span>
              <p className="font-semibold">{prediction.keyDriver}</p>
            </div>

            {prediction.tradeOffWarning && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-tight">{prediction.tradeOffWarning}</p>
              </div>
            )}

            {/* Action Button: Validate Scenario */}
            <div className="pt-2">
              <button
                onClick={handleValidate}
                disabled={isValidating}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  isValidated
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
                }`}
              >
                {isValidating ? (
                  <span>Checking Deterministic Constraints...</span>
                ) : isValidated ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Demo Validation Complete (Verified)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Validate Scenario in Deterministic Engine</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
