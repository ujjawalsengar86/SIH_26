import React from 'react';
import { SystemBoundary } from '../../types';
import { Factory, Globe2, ArrowLeftRight } from 'lucide-react';

interface Step3Props {
  systemBoundary: SystemBoundary;
  updateFormData: (fields: any) => void;
}

export const WizardStep3Boundary: React.FC<Step3Props> = ({ systemBoundary, updateFormData }) => {
  const boundaries = [
    {
      id: 'Cradle-to-Gate' as SystemBoundary,
      title: 'Cradle-to-Gate',
      badge: 'B2B Metallurgical Default',
      desc: 'Encompasses raw bauxite/ore mining, refining, smelting, casting up to the factory gate ready for shipment.',
      icon: <Factory className="w-6 h-6 text-emerald-500" />,
      includedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing'],
    },
    {
      id: 'Cradle-to-Grave' as SystemBoundary,
      title: 'Cradle-to-Grave (Full Circularity)',
      badge: 'Complete Lifecycle',
      desc: 'Covers the full cycle from primary mining through manufacturing, in-use product lifespan, and end-of-life recycling loops.',
      icon: <Globe2 className="w-6 h-6 text-teal-500" />,
      includedStages: ['Extraction', 'Processing', 'Transport', 'Manufacturing', 'Use', 'End-of-Life'],
    },
    {
      id: 'Gate-to-Gate' as SystemBoundary,
      title: 'Gate-to-Gate',
      badge: 'Single Facility Boundary',
      desc: 'Assesses strictly internal smelter or remelt furnace processes, excluding upstream mining and downstream logistics.',
      icon: <ArrowLeftRight className="w-6 h-6 text-amber-500" />,
      includedStages: ['Processing', 'Manufacturing'],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">System Boundary Definition</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Establish the operational scope and cut-off criteria for the life cycle assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boundaries.map(b => {
          const isSelected = systemBoundary === b.id;
          return (
            <div
              key={b.id}
              onClick={() => updateFormData({ systemBoundary: b.id })}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xs">
                    {b.icon}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {b.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{b.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{b.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Included Stages:</span>
                <div className="flex flex-wrap gap-1">
                  {b.includedStages.map(st => (
                    <span key={st} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
