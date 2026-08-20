import React from 'react';
import { Pickaxe, Factory, Truck, Cog, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LifecycleStagesFlowProps {
  activeStage?: string;
  onStageSelect?: (stage: string) => void;
  interactive?: boolean;
}

export const LifecycleStagesFlow: React.FC<LifecycleStagesFlowProps> = ({
  activeStage,
  onStageSelect,
  interactive = false,
}) => {
  const stages = [
    {
      id: 'Extraction',
      name: 'Extraction',
      desc: 'Bauxite & Iron Ore Mining',
      icon: <Pickaxe className="w-5 h-5" />,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'Processing',
      name: 'Processing',
      desc: 'Alumina Refining & Smelting',
      icon: <Factory className="w-5 h-5" />,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'Transport',
      name: 'Transport',
      desc: 'Rail / Road Freight Logistics',
      icon: <Truck className="w-5 h-5" />,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'Manufacturing',
      name: 'Manufacturing',
      desc: 'Extrusion, Casting & Rolling',
      icon: <Cog className="w-5 h-5" />,
      color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-600 dark:text-teal-400',
    },
    {
      id: 'Use',
      name: 'Use Phase',
      desc: 'Automotive / Infrastructure',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'End-of-Life',
      name: 'End-of-Life',
      desc: 'Scrap Recovery & Remelt',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-center min-w-[760px] justify-between gap-2">
        {stages.map((st, idx) => {
          const isSelected = activeStage === st.id;
          return (
            <React.Fragment key={st.id}>
              <motion.div
                whileHover={interactive ? { scale: 1.03, y: -2 } : {}}
                onClick={() => interactive && onStageSelect && onStageSelect(st.id)}
                className={`flex-1 flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${st.color} ${
                  interactive ? 'cursor-pointer' : ''
                } ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 shadow-md bg-white dark:bg-slate-850'
                    : 'bg-white/80 dark:bg-slate-900/80'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xs mb-2">
                  {st.icon}
                </div>
                <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">
                  {st.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {st.desc}
                </span>
              </motion.div>
              {idx < stages.length - 1 && (
                <div className="shrink-0 text-slate-300 dark:text-slate-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
