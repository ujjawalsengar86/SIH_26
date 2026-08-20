import React from 'react';
import { motion } from 'framer-motion';

export const SankeyFlow: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
        <span>Mass & Energy Balance (Per 1 Tonne Finished Metal)</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Circularity Efficiency: 89.2%</span>
      </div>

      <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-850/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
        {/* Visual Process Flow Nodes */}
        <div className="grid grid-cols-4 gap-4 h-full relative z-10">
          {/* Column 1: Inputs */}
          <div className="flex flex-col justify-around">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">Primary Feed</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Bauxite Ore</span>
              <span className="text-[10px] text-slate-400 block font-mono">1,820 kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs">
              <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block">Circular Loop</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Secondary Scrap</span>
              <span className="text-[10px] text-slate-400 block font-mono">600 kg</span>
            </div>
          </div>

          {/* Column 2: Reduction & Energy */}
          <div className="flex flex-col justify-center">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Hall-Héroult / EAF</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Smelting Potline</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-mono mt-1 font-semibold">14.2 MWh / tonne</span>
              <span className="text-[10px] text-slate-400 block">Thermal & Electrolytic</span>
            </div>
          </div>

          {/* Column 3: Output Finished Products */}
          <div className="flex flex-col justify-center">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">Finished Product</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Alloy 6061 Ingot</span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 block font-mono mt-1 font-semibold">1,000 kg Yield</span>
              <span className="text-[10px] text-slate-400 block">Carbon: 3.2 t CO₂e</span>
            </div>
          </div>

          {/* Column 4: Byproducts & Recirculation */}
          <div className="flex flex-col justify-around">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">Recirculated</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Dross & Trimmings</span>
              <span className="text-[10px] text-slate-400 block font-mono">140 kg (94% Recovery)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs">
              <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block">Waste Residue</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Red Mud Clinker</span>
              <span className="text-[10px] text-slate-400 block font-mono">340 kg Co-processed</span>
            </div>
          </div>
        </div>

        {/* Ambient SVG connecting flow lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20" preserveAspectRatio="none">
          <path d="M 120,60 C 220,60 220,130 320,130" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
          <path d="M 120,190 C 220,190 220,130 320,130" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="4 4" />
          <path d="M 450,130 C 550,130 550,130 650,130" fill="none" stroke="#0284c7" strokeWidth="4" />
          <path d="M 680,110 C 740,110 740,60 800,60" fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <path d="M 680,150 C 740,150 740,200 800,200" fill="none" stroke="#ef4444" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
