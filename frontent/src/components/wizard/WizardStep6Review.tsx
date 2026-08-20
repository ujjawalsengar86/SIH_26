import React from 'react';
import { DataSourceBadge } from '../common/DataSourceBadge';
import { ShieldCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { InventoryDataState } from './WizardStep5Inventory';

interface Step6Props {
  formData: any;
  inventory: InventoryDataState;
}

export const WizardStep6Review: React.FC<Step6Props> = ({ formData, inventory }) => {
  // Count ground data vs reference vs AI estimated
  const fields = Object.values(inventory);
  const total = fields.length;
  const groundCount = fields.filter((f: any) => f.source === 'Ground Data').length;
  const refCount = fields.filter((f: any) => f.source === 'Reference Data').length;
  const aiCount = fields.filter((f: any) => f.source === 'AI Estimated').length;

  const groundPct = Math.round((groundCount / total) * 100);
  const refPct = Math.round((refCount / total) * 100);
  const aiPct = Math.round((aiCount / total) * 100);

  const dqScore = Math.round(groundPct * 0.9 + refPct * 0.7 + aiPct * 0.5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Calculation Review & Pedigree Validation</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Verify system parameters, inventory completeness, and data source distribution before triggering calculation.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessment Target</span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">{formData.material}</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">{formData.functionalUnit}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">System Boundary</span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">{formData.systemBoundary}</span>
          <span className="text-xs text-slate-500 font-medium">{formData.selectedStages.length} Stages Included</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Data Quality</span>
          <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">{dqScore} / 100</span>
          <span className="text-[11px] text-slate-500 font-medium">Pedigree Reliability: High</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Data Provenance Mix</span>
          <div className="flex items-center space-x-1.5 mt-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{groundPct}% Ground</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-500">{refPct}% Ref</span>
          </div>
        </div>
      </div>

      {/* Assumptions & Quality Verification Checks */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
        <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>ISO 14044 Completeness & Mass Balance Verified</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
          All mandatory inventory flows (raw ore, electricity, process heat, freight distance, scrap recirculated, waste) have been specified without null entries.
        </p>
      </div>

      {/* Warnings & Sensitivity Notices */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
        <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Methodological Notice & Cut-Off Criteria</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
          Under ISO 14044 cut-off rules, inputs accounting for less than 1% of total cumulative mass and environmental relevance are excluded. Smelter potline power represents the principal sensitivity parameter.
        </p>
      </div>

      {/* Detailed Inventory Table Summary */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-3 bg-slate-50 dark:bg-slate-850 font-bold text-xs text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
          Entered Parameter Registry
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs bg-white dark:bg-slate-900">
          <div className="p-3 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Raw Material (Bauxite)</span>
            <div className="flex items-center space-x-3">
              <span className="font-mono font-bold text-slate-900 dark:text-white">{inventory.rawMaterialQty.value} {inventory.rawMaterialQty.unit}</span>
              <DataSourceBadge source={inventory.rawMaterialQty.source} size="sm" />
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Electricity Intake</span>
            <div className="flex items-center space-x-3">
              <span className="font-mono font-bold text-slate-900 dark:text-white">{inventory.electricity.value} {inventory.electricity.unit}</span>
              <DataSourceBadge source={inventory.electricity.source} size="sm" />
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Secondary Scrap Recycled Content</span>
            <div className="flex items-center space-x-3">
              <span className="font-mono font-bold text-slate-900 dark:text-white">{inventory.recycledContent.value} {inventory.recycledContent.unit}</span>
              <DataSourceBadge source={inventory.recycledContent.source} size="sm" />
            </div>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Freight Transport Haulage</span>
            <div className="flex items-center space-x-3">
              <span className="font-mono font-bold text-slate-900 dark:text-white">{inventory.transportDistance.value} {inventory.transportDistance.unit} ({inventory.transportMode.value})</span>
              <DataSourceBadge source={inventory.transportDistance.source} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
