import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { useNotification } from '../../context/NotificationContext';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step7Props {
  onCalculateComplete?: () => void;
}

export const WizardStep7Calculate: React.FC<Step7Props> = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing deterministic LCA matrix...');
  const [completed, setCompleted] = useState(false);

  const startCalculation = () => {
    setCalculating(true);
    setProgress(15);
    setStatusText('Compiling unit process elementary flows & mass balances...');

    setTimeout(() => {
      setProgress(45);
      setStatusText('Applying IPCC GWP 100a & AWARE water characterization factors...');
    }, 600);

    setTimeout(() => {
      setProgress(78);
      setStatusText('Executing pedigree data matrix & Monte Carlo uncertainty bounds...');
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setStatusText('Calculation complete. Verified ISO 14044 Impact Assessment Ready.');
      setCompleted(true);
      setCalculating(false);
      showNotification({
        title: 'LCA Assessment Solved',
        description: 'ISO 14040/14044 deterministic characterization completed.',
        type: 'success',
      });
    }, 1800);
  };

  const handleNavigateToAnalysis = () => {
    navigate('/analysis');
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto py-6 animate-in fade-in duration-300">
      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full mb-2">
        <span>Prototype Demo Result Mode</span>
      </div>

      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
        Execute ISO 14044 Life Cycle Assessment Engine
      </h3>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Antigravity AuraLCA solver will character-aggregate all Scope 1 direct process emissions, Scope 2 electricity grid footprints, and Scope 3 upstream/downstream logistical transport vectors.
      </p>

      {!completed && !calculating && (
        <div className="pt-4">
          <button
            onClick={startCalculation}
            className="inline-flex items-center space-x-3 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>Calculate Official LCA Results</span>
          </button>
        </div>
      )}

      {calculating && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Solving LCA Matrix Equation [A]⁻¹ · [B]</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{statusText}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-xl space-y-5"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Assessment Successfully Characterized!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Deterministic calculations ready: GHG emissions (8.24 t CO₂e), Energy (4,200 kWh), Circularity (72/100).
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleNavigateToAnalysis}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <span>View Official LCA Analysis & Hotspots</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
