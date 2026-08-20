import React, { useState } from 'react';
import { MOCK_AI_RECOMMENDATIONS } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { 
  Sparkles, 
  CheckCircle, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  Recycle, 
  Flame, 
  Truck,
  CheckSquare
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const RecommendationsPage: React.FC = () => {
  const { showNotification } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const recommendations = MOCK_AI_RECOMMENDATIONS;

  const filtered = recommendations.filter(r => {
    return selectedCategory === 'All' || r.category === selectedCategory;
  });

  const toggleActionItem = (recId: string, itemIdx: number) => {
    const key = `${recId}-${itemIdx}`;
    const newState = !completedItems[key];
    setCompletedItems(prev => ({ ...prev, [key]: newState }));

    if (newState) {
      showNotification({
        title: 'Action Item Marked Completed',
        description: 'Roadmap progress saved to audit log.',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/20">
              AI Decision Support
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Neural Decarbonization Roadmap</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Decarbonization & Circularity Recommendations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ranked metallurgical interventions with quantified GHG abatement potential, CAPEX feasibility, and engineering action checklists.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <DataSourceBadge source="AI Prediction" size="md" />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Feedstock', 'Energy Transition', 'Process Metallurgy', 'Logistics'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        {filtered.map(rec => (
          <div
            key={rec.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
          >
            {/* Top Row: Category & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                  {rec.category}
                </span>
                <ConfidenceBadge level={rec.confidenceLevel} scorePct={rec.confidencePct} size="sm" />
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <span>Feasibility: <strong className="text-emerald-600 dark:text-emerald-400">{rec.feasibility}</strong></span>
                <span>•</span>
                <span>Est. ROI: <strong className="text-slate-800 dark:text-slate-200">{rec.estimatedRoiMonths} Months</strong></span>
                <span>•</span>
                <span>CAPEX: <strong className="text-slate-800 dark:text-slate-200">{rec.capexRequirement}</strong></span>
              </div>
            </div>

            {/* Main Content & Expected Improvement */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-center shrink-0 min-w-[180px]">
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                  Expected GHG Abatement
                </span>
                <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  -{rec.expectedGhgImprovementPct}%
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Scope 1 & 2 Reduction</span>
              </div>
            </div>

            {/* Implementation Action Checklist */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Engineering Action Roadmap Checklist:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {rec.actionItems.map((item, idx) => {
                  const isChecked = !!completedItems[`${rec.id}-${idx}`];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleActionItem(rec.id, idx)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start space-x-2 ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 line-through opacity-80'
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <div className="w-4 h-4 rounded border border-slate-400 dark:border-slate-600"></div>
                        )}
                      </div>
                      <span className="text-[11px] leading-tight">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
