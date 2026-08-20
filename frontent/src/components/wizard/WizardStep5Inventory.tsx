import React from 'react';
import { DataSourceType, TransportMode } from '../../types';
import { Database, BookOpen, Sparkles } from 'lucide-react';

export interface InventoryDataState {
  rawMaterialQty: { value: number; unit: string; source: DataSourceType };
  electricity: { value: number; unit: string; source: DataSourceType };
  fuel: { value: number; unit: string; source: DataSourceType };
  water: { value: number; unit: string; source: DataSourceType };
  processEnergy: { value: number; unit: string; source: DataSourceType };
  transportDistance: { value: number; unit: string; source: DataSourceType };
  transportMode: { value: TransportMode; source: DataSourceType };
  recycledContent: { value: number; unit: string; source: DataSourceType };
  recoveryRate: { value: number; unit: string; source: DataSourceType };
  reuse: { value: number; unit: string; source: DataSourceType };
  waste: { value: number; unit: string; source: DataSourceType };
  materialLoss: { value: number; unit: string; source: DataSourceType };
}

interface Step5Props {
  inventory: InventoryDataState;
  updateInventoryField: (fieldKey: keyof InventoryDataState, updates: any) => void;
}

export const WizardStep5Inventory: React.FC<Step5Props> = ({ inventory, updateInventoryField }) => {
  const dataSources: { value: DataSourceType; label: string; icon: React.ReactNode }[] = [
    { value: 'Ground Data', label: 'Ground Data (Site Metered)', icon: <Database className="w-3 h-3 text-blue-500" /> },
    { value: 'Reference Data', label: 'Reference Data (Ecoinvent/IAI)', icon: <BookOpen className="w-3 h-3 text-slate-500" /> },
    { value: 'AI Estimated', label: 'AI Estimated (Placeholder)', icon: <Sparkles className="w-3 h-3 text-purple-500" /> },
  ];

  const inventorySections = [
    {
      title: '1. Raw Material & Feedstock Intake',
      fields: [
        {
          key: 'rawMaterialQty' as keyof InventoryDataState,
          label: 'Primary Raw Material Quantity (Bauxite / Iron Ore)',
          units: ['kg / tonne', 'tonnes', 'dry metric tonnes (dmt)'],
          helper: 'Standard primary bauxite requirement is approx 1,800 - 2,000 kg per tonne of aluminium.',
        },
        {
          key: 'recycledContent' as keyof InventoryDataState,
          label: 'Secondary Recycled Scrap Feedstock Content',
          units: ['% by mass', 'kg / tonne'],
          helper: 'Clean industrial scrap or post-consumer extrusion blends into the remelt furnace.',
        },
      ]
    },
    {
      title: '2. Energy & Utility Consumptions',
      fields: [
        {
          key: 'electricity' as keyof InventoryDataState,
          label: 'Electrical Power Intake (Hall-Héroult Electrolysis / EAF)',
          units: ['kWh / tonne', 'MWh / tonne', 'MJ / tonne'],
          helper: 'Typical primary Hall-Héroult smelter uses 13,500 - 15,000 kWh/t; scrap remelting uses ~700 kWh/t.',
        },
        {
          key: 'processEnergy' as keyof InventoryDataState,
          label: 'Thermal & Process Energy (Bayer Digestion & Calcination)',
          units: ['GJ / tonne', 'MMBtu / tonne', 'MWh / tonne'],
          helper: 'High-temperature thermal steam and calciner kiln heat energy.',
        },
        {
          key: 'fuel' as keyof InventoryDataState,
          label: 'Direct Fuel Consumption (Natural Gas / Heavy Fuel Oil)',
          units: ['litres / tonne', 'Nm³ / tonne', 'kg / tonne'],
          helper: 'Natural gas or light diesel consumed in holding furnaces and anode baking pits.',
        },
        {
          key: 'water' as keyof InventoryDataState,
          label: 'Fresh Water Withdrawal & Process Makeup',
          units: ['m³ / tonne', 'litres / tonne', 'kL / tonne'],
          helper: 'Cooling tower evaporative loss and hydrometallurgical washing baths.',
        },
      ]
    },
    {
      title: '3. Freight Logistics & Supply Chain',
      fields: [
        {
          key: 'transportDistance' as keyof InventoryDataState,
          label: 'Raw Material & Product Freight Haulage Distance',
          units: ['km', 'miles', 'metric ton-km (tkm)'],
          helper: 'Average freight distance between mine, refinery, smelter, and distribution harbor.',
        },
      ]
    },
    {
      title: '4. Circularity, Recovery & Waste Yields',
      fields: [
        {
          key: 'recoveryRate' as keyof InventoryDataState,
          label: 'Internal Process Scrap & Dross Recovery Rate',
          units: ['% yield', '% recovery'],
          helper: 'Percentage of furnace skimming dross and edge trimmings recaptured in the plant loop.',
        },
        {
          key: 'reuse' as keyof InventoryDataState,
          label: 'Byproduct Beneficial Reuse (e.g. Red Mud in Pozzolanic Cement)',
          units: ['% reused', 'kg / tonne'],
          helper: 'Solid residues diverted from landfill into civil construction or mineral extraction.',
        },
        {
          key: 'waste' as keyof InventoryDataState,
          label: 'Total Solid Hazardous & Non-Hazardous Waste',
          units: ['kg / tonne', 'tonnes'],
          helper: 'Spent potlining (SPL), filter cake, furnace refractory dust, and unrecovered tailings.',
        },
        {
          key: 'materialLoss' as keyof InventoryDataState,
          label: 'Unrecoverable Oxidation & Metallurgical Slag Loss',
          units: ['% tare loss', 'kg / tonne'],
          helper: 'Vaporization, oxidation burn-off loss, and unrecoverable mill scale.',
        },
      ]
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Life Cycle Inventory (LCI) Inputs & Data Provenance</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Enter operational telemetry or reference factors. Each input parameter must declare its verifiable data source.
        </p>
      </div>

      <div className="space-y-8">
        {inventorySections.map((sec, sIdx) => (
          <div key={sIdx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              {sec.title}
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sec.fields.map(f => {
                const fieldState = inventory[f.key] as { value: number; unit: string; source: DataSourceType };
                return (
                  <div key={f.key} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {f.label}
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 leading-normal">
                        {f.helper}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-2">
                      {/* Value Input */}
                      <div className="sm:col-span-4">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Value</span>
                        <input
                          type="number"
                          value={fieldState.value}
                          onChange={e => updateInventoryField(f.key, { value: parseFloat(e.target.value) || 0 })}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      {/* Unit Selector */}
                      <div className="sm:col-span-3">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Unit</span>
                        <select
                          value={fieldState.unit}
                          onChange={e => updateInventoryField(f.key, { unit: e.target.value })}
                          className="w-full px-2 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                        >
                          {f.units.map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </div>

                      {/* Data Source Selector */}
                      <div className="sm:col-span-5">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Data Source</span>
                        <select
                          value={fieldState.source}
                          onChange={e => updateInventoryField(f.key, { source: e.target.value as DataSourceType })}
                          className={`w-full px-2 py-1.5 rounded-lg text-xs font-medium border focus:outline-none ${
                            fieldState.source === 'Ground Data'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                              : fieldState.source === 'AI Estimated'
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {dataSources.map(ds => (
                            <option key={ds.value} value={ds.value}>{ds.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Transport Mode Field */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
            Transport Logistics Mode
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Primary Freight Transport Mode
              </label>
              <select
                value={inventory.transportMode.value}
                onChange={e => updateInventoryField('transportMode', { ...inventory.transportMode, value: e.target.value as TransportMode })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Road (Diesel Heavy Truck)">Road (Diesel Heavy Truck 32-40t)</option>
                <option value="Rail (Electric Freight)">Rail (Dedicated Indian Railways Electrified Freight)</option>
                <option value="Mixed (Multimodal)">Mixed Multimodal (Rail + Road Feeders)</option>
                <option value="Inland Waterway">Inland Waterway (Barge / Coastal Carrier)</option>
                <option value="Ocean Freight">Ocean Freight (Cape-size Bulk Vessel)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Transport Logistics Data Source
              </label>
              <select
                value={inventory.transportMode.source}
                onChange={e => updateInventoryField('transportMode', { ...inventory.transportMode, source: e.target.value as DataSourceType })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {dataSources.map(ds => (
                  <option key={ds.value} value={ds.value}>{ds.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
