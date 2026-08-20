import React from 'react';
import { LifecycleStage } from '../../types';
import { Pickaxe, Factory, Truck, Cog, ShieldCheck, RefreshCw, CheckSquare, Square } from 'lucide-react';

interface Step4Props {
  selectedStages: LifecycleStage[];
  updateFormData: (fields: any) => void;
}

export const WizardStep4Stages: React.FC<Step4Props> = ({ selectedStages, updateFormData }) => {
  const allStages: { id: LifecycleStage; name: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'Extraction',
      name: '1. Extraction & Mining',
      desc: 'Bauxite / copper ore overburden extraction, diesel hauling, explosive stripping.',
      icon: <Pickaxe className="w-5 h-5 text-amber-500" />,
    },
    {
      id: 'Processing',
      name: '2. Refining & Smelting',
      desc: 'Bayer alumina digestion, Hall-Héroult reduction potlines, reverberatory melting.',
      icon: <Factory className="w-5 h-5 text-emerald-500" />,
    },
    {
      id: 'Transport',
      name: '3. Freight & Logistics',
      desc: 'Inland diesel trucking, electrified railway siding, oceanic bulk carriers.',
      icon: <Truck className="w-5 h-5 text-blue-500" />,
    },
    {
      id: 'Manufacturing',
      name: '4. Fabrication & Finishing',
      desc: 'Continuous casting, alloy heat-treatment (T6 temper), extrusion, sheet rolling.',
      icon: <Cog className="w-5 h-5 text-teal-500" />,
    },
    {
      id: 'Use',
      name: '5. In-Use Phase',
      desc: 'Operational energy savings, corrosion durability in automotive / aviation structures.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 'End-of-Life',
      name: '6. End-of-Life & Recycling',
      desc: 'Post-consumer scrap sorting, eddy current separation, remelting closed loop.',
      icon: <RefreshCw className="w-5 h-5 text-purple-500" />,
    },
  ];

  const toggleStage = (stage: LifecycleStage) => {
    if (selectedStages.includes(stage)) {
      if (selectedStages.length > 1) {
        updateFormData({ selectedStages: selectedStages.filter(s => s !== stage) });
      }
    } else {
      updateFormData({ selectedStages: [...selectedStages, stage] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Lifecycle Stages Scope</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select all lifecycle unit processes to include in the material flow inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allStages.map(st => {
          const isSelected = selectedStages.includes(st.id);
          return (
            <div
              key={st.id}
              onClick={() => toggleStage(st.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-75'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs mt-0.5">
                  {st.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{st.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
              <div className="shrink-0 text-emerald-500 ml-2 mt-0.5">
                {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
