import React, { useState } from 'react';
import { MOCK_ASSUMPTIONS } from '../data/mockData';
import { BookOpen, Search, Filter, ShieldCheck, ExternalLink, Plus } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { useNotification } from '../context/NotificationContext';

export const AssumptionsPage: React.FC = () => {
  const { showNotification } = useNotification();
  const [assumptions, setAssumptions] = useState(MOCK_ASSUMPTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [impactFilter, setImpactFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAssumption, setNewAssumption] = useState({
    assumptionName: '',
    value: '',
    sourceDataset: '',
    sourceType: 'Ecoinvent 3.9' as const,
    impactArea: 'GHG' as const,
    version: 'v1.0',
    effectiveDate: new Date().toISOString().split('T')[0],
    sensitivity: 'Medium' as const,
  });

  const filtered = assumptions.filter(a => {
    const matchesSearch = a.assumptionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.sourceDataset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesImpact = impactFilter === 'All' || a.impactArea === impactFilter;
    return matchesSearch && matchesImpact;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: `asm-${Date.now()}`,
      ...newAssumption,
    };
    setAssumptions([item, ...assumptions]);
    setShowAddModal(false);
    showNotification({
      title: 'Assumption Registered',
      description: `Added "${newAssumption.assumptionName}" to ISO registry.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              Methodological Transparency
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">ISO 14044 Section 4.2.3.6</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Life Cycle Inventory Assumptions Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent catalogue of background emission factors, net calorific heating values, and grid mixes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Model Assumption</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search assumptions, datasets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-xs font-semibold">Impact Area:</span>
          <select
            value={impactFilter}
            onChange={e => setImpactFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Impact Areas</option>
            <option value="GHG">GHG Carbon Footprint</option>
            <option value="Energy">Energy Demand</option>
            <option value="Water">Water Depletion</option>
            <option value="Transport">Freight Logistics</option>
          </select>
        </div>
      </div>

      {/* Assumptions Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-extrabold tracking-wider bg-slate-50/50 dark:bg-slate-850/50">
                <th className="py-3.5 px-4">Assumption / Factor Name</th>
                <th className="py-3.5 px-3">Parameter Value</th>
                <th className="py-3.5 px-3">Dataset Source</th>
                <th className="py-3.5 px-3">Source Type</th>
                <th className="py-3.5 px-3">Impact Area</th>
                <th className="py-3.5 px-3">Sensitivity</th>
                <th className="py-3.5 px-3">Version</th>
                <th className="py-3.5 px-4 text-right">Effective Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{a.assumptionName}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{a.value}</td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">{a.sourceDataset}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {a.sourceType}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-200">{a.impactArea}</td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      a.sensitivity === 'High' 
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                        : a.sensitivity === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                    }`}>
                      {a.sensitivity}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{a.version}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 text-right">{a.effectiveDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Assumption Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Register Model Assumption"
        subtitle="Add a transparent LCA background parameter to the verifiable register."
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Assumption / Emission Factor Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Captive Solar PPA Emission Factor"
              value={newAssumption.assumptionName}
              onChange={e => setNewAssumption({ ...newAssumption, assumptionName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Value & Unit *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0.045 kg CO₂e / kWh"
                value={newAssumption.value}
                onChange={e => setNewAssumption({ ...newAssumption, value: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Source Dataset *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IEA PVPS Task 12"
                value={newAssumption.sourceDataset}
                onChange={e => setNewAssumption({ ...newAssumption, sourceDataset: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Impact Area
              </label>
              <select
                value={newAssumption.impactArea}
                onChange={e => setNewAssumption({ ...newAssumption, impactArea: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="GHG">GHG Carbon Footprint</option>
                <option value="Energy">Energy Demand</option>
                <option value="Water">Water Depletion</option>
                <option value="Transport">Freight Logistics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sensitivity Rating
              </label>
              <select
                value={newAssumption.sensitivity}
                onChange={e => setNewAssumption({ ...newAssumption, sensitivity: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="High">High Sensitivity</option>
                <option value="Medium">Medium Sensitivity</option>
                <option value="Low">Low Sensitivity</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
            >
              Save Assumption
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
