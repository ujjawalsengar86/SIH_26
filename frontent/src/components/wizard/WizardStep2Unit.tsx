import React from 'react';
import { FunctionalUnit } from '../../types';
import { Scale, PackageCheck, Settings2 } from 'lucide-react';

interface Step2Props {
  functionalUnit: FunctionalUnit;
  customUnitAmount: number;
  customUnitName: string;
  updateFormData: (fields: any) => void;
}

export const WizardStep2Unit: React.FC<Step2Props> = ({
  functionalUnit,
  customUnitAmount,
  customUnitName,
  updateFormData,
}) => {
  const units = [
    {
      id: '1 tonne' as FunctionalUnit,
      title: '1 Metric Tonne (1,000 kg)',
      badge: 'Industry Standard (Recommended)',
      desc: 'Standard reference unit for smelting, metallurgical casting, and bulk commodities according to ISO 14044 and IAI rules.',
      icon: <Scale className="w-6 h-6 text-emerald-500" />,
    },
    {
      id: '1 kg' as FunctionalUnit,
      title: '1 Kilogram (1.0 kg)',
      badge: 'Component Level',
      desc: 'Ideal for precision components, precious metal refinery outputs, battery chemicals, and specialty extrusion alloys.',
      icon: <PackageCheck className="w-6 h-6 text-teal-500" />,
    },
    {
      id: 'Custom' as FunctionalUnit,
      title: 'Custom Functional Unit',
      badge: 'Configurable',
      desc: 'Define bespoke metallurgical units such as 1 coil, 1 billet batch, 10,000 hours service life, or m² cladding surface.',
      icon: <Settings2 className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Functional Unit Definition</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          ISO 14040 requires quantifying the primary service function of the metallurgical product system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {units.map(u => {
          const isSelected = functionalUnit === u.id;
          return (
            <div
              key={u.id}
              onClick={() => updateFormData({ functionalUnit: u.id })}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xs">
                    {u.icon}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {u.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{u.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{u.desc}</p>
              </div>

              {isSelected && (
                <div className="mt-4 pt-3 border-t border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Active Baseline Unit
                </div>
              )}
            </div>
          );
        })}
      </div>

      {functionalUnit === 'Custom' && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Custom Quantity Amount
            </label>
            <input
              type="number"
              value={customUnitAmount}
              onChange={e => updateFormData({ customUnitAmount: parseFloat(e.target.value) || 0 })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Unit Designation & Description
            </label>
            <input
              type="text"
              value={customUnitName}
              onChange={e => updateFormData({ customUnitName: e.target.value })}
              placeholder="e.g. 1 Billet (220mm dia x 6m length)"
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
