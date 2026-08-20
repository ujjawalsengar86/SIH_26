import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { useNotification } from '../context/NotificationContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Trash2, 
  ExternalLink, 
  FolderKanban, 
  ArrowUpDown,
  FileCheck,
  QrCode,
  Building,
  MapPin
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, activeProject, setActiveProjectId, duplicateProject, deleteProject } = useProject();
  const { showNotification } = useNotification();

  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial = materialFilter === 'All' || p.material === materialFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesMaterial && matchesStatus;
  });

  const handleDuplicate = async (id: string, name: string) => {
    await duplicateProject(id);
    showNotification({
      title: 'Project Duplicated',
      description: `Created working copy of "${name}"`,
      type: 'success',
    });
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    const projToDelete = projects.find(p => p.id === deleteConfirmId);
    await deleteProject(deleteConfirmId);
    setDeleteConfirmId(null);
    showNotification({
      title: 'Project Removed',
      description: `Assessment "${projToDelete?.name}" has been deleted.`,
      type: 'warning',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
            Metallurgical LCA Projects
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, duplicate, and audit facility life cycle assessments and circularity models
          </p>
        </div>

        <button
          onClick={() => navigate('/new-lca')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New LCA Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, site, organization..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Material Filter */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Material:</span>
            <select
              value={materialFilter}
              onChange={e => setMaterialFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Metals</option>
              <option value="Aluminium">Aluminium</option>
              <option value="Copper">Copper</option>
              <option value="Steel">Steel</option>
              <option value="Lithium">Lithium</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Validated">Validated</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table View */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-extrabold tracking-wider bg-slate-50/50 dark:bg-slate-850/50">
                <th className="py-3.5 px-4">Project Name & Site</th>
                <th className="py-3.5 px-3">Material</th>
                <th className="py-3.5 px-3">Functional Unit</th>
                <th className="py-3.5 px-3">System Boundary</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Circularity</th>
                <th className="py-3.5 px-3">Carbon Footprint</th>
                <th className="py-3.5 px-3">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProjects.map(p => {
                const isActive = activeProject?.id === p.id;
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors ${
                      isActive ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Project"></span>
                        )}
                        <span className="text-xs font-extrabold">{p.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{p.organization} • {p.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 font-semibold text-slate-800 dark:text-slate-200">{p.material}</td>
                    <td className="py-4 px-3 font-mono text-slate-500">{p.functionalUnit}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400">{p.systemBoundary}</td>
                    <td className="py-4 px-3"><StatusBadge status={p.status} size="sm" /></td>
                    <td className="py-4 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                      {p.circularityScore} / 100
                    </td>
                    <td className="py-4 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {p.ghgIntensity} t CO₂e
                    </td>
                    <td className="py-4 px-3 font-mono text-[11px] text-slate-400">{p.lastUpdated}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => {
                            setActiveProjectId(p.id);
                            navigate('/analysis');
                          }}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] transition-colors"
                          title="Open LCA Analysis"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleDuplicate(p.id, p.name)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Duplicate Scenario"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Assessment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Assessment Removal"
        subtitle="This action will delete the selected project scenario from your workspace."
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Are you sure you want to remove this project? All associated unit processes and mock telemetry will be removed.
          </p>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
