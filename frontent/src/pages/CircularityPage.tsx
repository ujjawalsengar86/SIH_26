import React from 'react';
import { CircularityGauge } from '../components/common/CircularityGauge';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { 
  Recycle, 
  RotateCcw, 
  RefreshCw, 
  TrendingUp, 
  Trash2, 
  Flame, 
  Percent, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CircularityPage: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Recycled Content (Feedstock Intake)',
      value: '60%',
      rating: 'High Circular Share',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500/30',
      icon: <Recycle className="w-5 h-5 text-emerald-500" />,
      desc: 'Proportion of post-consumer and pre-consumer clean alloy scrap remelted into ingot batches.',
    },
    {
      title: 'Scrap & Dross Recovery Rate',
      value: '86%',
      rating: 'Advanced Pyrometallurgical Recovery',
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border-teal-500/30',
      icon: <RotateCcw className="w-5 h-5 text-teal-500" />,
      desc: 'Furnace skimming dross and extrusion edge trims reclaimed through rotary flux furnaces.',
    },
    {
      title: 'Byproduct Beneficial Reuse Potential',
      value: 'HIGH',
      rating: 'Industrial Symbiosis Grade',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-500/30',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
      desc: 'Bauxite residue (red mud) neutralized and co-processed into Portland cement clinker aggregate.',
    },
    {
      title: 'Unrecoverable Material Loss',
      value: '9.0%',
      rating: 'Controlled Oxidation Slag',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-500/30',
      icon: <Trash2 className="w-5 h-5 text-amber-500" />,
      desc: 'High-temperature melt vaporization, salt slag entrapment, and mill scale tare loss.',
    },
    {
      title: 'End-of-Life Recycling Potential',
      value: 'VERY HIGH',
      rating: 'Infinitely Recyclable Metallurgy',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-500/30',
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      desc: 'Aluminium retains 100% of metallurgical crystal integrity through infinite remelting cycles.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              Circularity Intelligence
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Material Circularity Indicator (MCI)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Circularity Assessment & Material Efficiency
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate linear versus circular metallurgical loops across feedstock intake, recovery yield, and byproduct symbiosis.
          </p>
        </div>

        <button
          onClick={() => navigate('/material-passport')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <span>View Digital Material Passport</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Gauge & Circularity Breakdown Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Gauge */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center">
          <CircularityGauge
            score={72}
            size={240}
            strokeWidth={18}
            label="Material Circularity Indicator (MCI)"
            sublabel="Ellen MacArthur Foundation Metric"
          />

          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-800 dark:text-emerald-200 w-full">
            <span className="font-bold block">Circularity Grade: B+ (Advanced Closed Loop)</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Alloy remelting preserves 95% of primary electrical smelting energy.
            </span>
          </div>
        </div>

        {/* MCI Breakdown Component Cards */}
        <div className="lg:col-span-7 space-y-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-2xs mt-0.5">
                  {m.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {m.desc}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                    {m.rating}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {m.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
