import React from 'react';
import { MaterialType } from '../../types';
import { Layers, ShieldAlert, Sparkles, Mountain } from 'lucide-react';

interface Step1Props {
  formData: {
    name: string;
    organization: string;
    location: string;
    description: string;
    material: MaterialType;
  };
  updateFormData: (fields: Partial<Step1Props['formData']>) => void;
}

export const WizardStep1Info: React.FC<Step1Props> = ({ formData, updateFormData }) => {
  const materials: { type: MaterialType; label: string; desc: string; density: string; color: string }[] = [
    {
      type: 'Aluminium',
      label: 'Aluminium (Primary / Secondary)',
      desc: 'Hall-Héroult reduction, scrap remelting & extrusion alloys (AA 6061 / 7075).',
      density: '2.70 g/cm³',
      color: 'border-emerald-500/50 bg-emerald-500/5',
    },
    {
      type: 'Copper',
      label: 'Copper (Refined Cathode)',
      desc: 'Outokumpu flash smelting, solvent extraction & electro-refining 99.99% purity.',
      density: '8.96 g/cm³',
      color: 'border-orange-500/50 bg-orange-500/5',
    },
    {
      type: 'Steel',
      label: 'Green Steel (DRI-EAF / BF-BOF)',
      desc: 'Hydrogen direct reduction, electric arc furnace circular scrap melting.',
      density: '7.85 g/cm³',
      color: 'border-blue-500/50 bg-blue-500/5',
    },
    {
      type: 'Lithium',
      label: 'Lithium (Battery Chemical Grade)',
      desc: 'Hard-rock spodumene roasting vs brine hydrometallurgical LiOH extraction.',
      density: '0.534 g/cm³',
      color: 'border-purple-500/50 bg-purple-500/5',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Project Identity & Material Selection</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Define assessment parameters and select the metallurgical feedstock class.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Project Assessment Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => updateFormData({ name: e.target.value })}
            placeholder="e.g. Odisha Smelter Potline #4 Ingot Optimization"
            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Operating Organization / Entity *
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={e => updateFormData({ organization: e.target.value })}
            placeholder="e.g. Vedanta / Hindalco Metals Ltd."
            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Facility Location / Geographic Boundary *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={e => updateFormData({ location: e.target.value })}
            placeholder="e.g. Jharsuguda Smelter Complex, Odisha, India"
            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Scope Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={e => updateFormData({ description: e.target.value })}
            placeholder="e.g. Cradle-to-gate LCA assessing 40% post-consumer scrap integration."
            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Material Selection Cards */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
          Select Target Metallurgical Material *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {materials.map(m => {
            const isSelected = formData.material === m.type;
            return (
              <div
                key={m.type}
                onClick={() => updateFormData({ material: m.type })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? `${m.color} ring-2 ring-emerald-500 shadow-md`
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">{m.type}</span>
                  <span className="text-[10px] font-mono text-slate-400">{m.density}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {m.desc}
                </p>
                {isSelected && (
                  <div className="mt-3 flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Selected Material
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
