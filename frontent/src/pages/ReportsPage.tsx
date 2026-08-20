import React, { useState } from 'react';
import { MOCK_REPORTS } from '../data/mockData';
import { ReportItem } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { useNotification } from '../context/NotificationContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  FileCheck, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { showNotification } = useNotification();
  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS);
  const [previewReport, setPreviewReport] = useState<ReportItem | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const [genForm, setGenForm] = useState({
    projectName: 'Aluminium Smelting & Ingot Optimization',
    reportType: 'ISO 14040/14044 Full LCA',
    format: 'PDF' as 'PDF' | 'CSV' | 'JSON',
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGenerateModal(false);
    showNotification({
      title: 'Generating Sustainability Dossier',
      description: `Compiling ${genForm.reportType}...`,
      type: 'info',
    });

    setTimeout(() => {
      const newRep: ReportItem = {
        id: `rep-${Date.now()}`,
        projectName: genForm.projectName,
        reportType: genForm.reportType as any,
        format: genForm.format,
        generatedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        fileSize: genForm.format === 'PDF' ? '4.2 MB' : '520 KB',
        status: 'Ready',
        version: 'v1.0',
      };
      setReports([newRep, ...reports]);
      showNotification({
        title: 'Report Dossier Ready',
        description: `Successfully compiled "${genForm.reportType}".`,
        type: 'success',
      });
    }, 1200);
  };

  const handleDownload = (rep: ReportItem) => {
    showNotification({
      title: 'Downloading Document',
      description: `Saved ${rep.reportType} (${rep.format}) to downloads folder.`,
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
              Audit-Ready Declarations
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">CBAM, BRSR Core & ISO 14044</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Sustainability Reports & Declarations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export compliant life cycle assessment documentation, material passports, and ESG disclosure packages.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Reports Table View */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-extrabold tracking-wider bg-slate-50/50 dark:bg-slate-850/50">
                <th className="py-3.5 px-4">Project & Title</th>
                <th className="py-3.5 px-3">Report Type</th>
                <th className="py-3.5 px-3">Format</th>
                <th className="py-3.5 px-3">Version</th>
                <th className="py-3.5 px-3">Generated Date</th>
                <th className="py-3.5 px-3">File Size</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {r.projectName}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{r.reportType}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-600 dark:text-slate-400">{r.format}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{r.version}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{r.generatedDate}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{r.fileSize}</td>
                  <td className="py-3.5 px-3"><StatusBadge status={r.status} size="sm" /></td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => setPreviewReport(r)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Preview Report"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(r)}
                        className="px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg font-bold text-[11px] hover:bg-emerald-100 transition-colors flex items-center space-x-1"
                        title="Download Dossier"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewReport}
        onClose={() => setPreviewReport(null)}
        title={previewReport ? previewReport.reportType : 'Report Document Preview'}
        subtitle={previewReport ? `${previewReport.projectName} (${previewReport.version})` : ''}
        maxWidth="2xl"
      >
        {previewReport && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Document Signature</span>
                <span className="font-bold text-slate-900 dark:text-white">Dr. Aris Thorne (Lead Metallurgical LCA)</span>
              </div>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">ISO 14044 Verified</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Executive Summary Statement</h4>
              <p>
                This life cycle assessment evaluates the environmental footprint of 1 metric tonne of structural extrusion aluminium ingot (AA 6061-T6). 
                The cradle-to-gate global warming potential is determined to be <strong>8.24 t CO₂e / tonne</strong>, representing a 14.2% reduction relative to the national smelter baseline through the incorporation of 45% scrap remelt loops.
              </p>
              
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white pt-2">CBAM / ESG Core Disclosure Index</h4>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-slate-400 block font-sans">Scope 1 Direct Process:</span>
                  <strong>2.80 t CO₂e / tonne</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-slate-400 block font-sans">Scope 2 Grid Electricity:</span>
                  <strong>4.28 t CO₂e / tonne</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-slate-400 block font-sans">Scope 3 Freight Logistics:</span>
                  <strong>1.16 t CO₂e / tonne</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-slate-400 block font-sans">Material Circularity Index:</span>
                  <strong>72 / 100 (Ellen MacArthur)</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setPreviewReport(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(previewReport);
                  setPreviewReport(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {previewReport.format}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Generate Report Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Sustainability Dossier"
        subtitle="Compile ISO 14044 certified LCA reports and carbon declarations."
      >
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Assessment Project *
            </label>
            <select
              value={genForm.projectName}
              onChange={e => setGenForm({ ...genForm, projectName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option>Aluminium Smelting & Ingot Optimization</option>
              <option>Copper Flash Smelting & Refining Assessment</option>
              <option>Steel Manufacturing Circularity (DRI-EAF)</option>
              <option>Lithium Spodumene Hard-Rock Refining LCA</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Report Template Specification *
            </label>
            <select
              value={genForm.reportType}
              onChange={e => setGenForm({ ...genForm, reportType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option>ISO 14040/14044 Full LCA</option>
              <option>CBAM Carbon Footprint</option>
              <option>ESG BRSR Core Report</option>
              <option>Circular Economy Passport</option>
              <option>Executive Sustainability Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['PDF', 'CSV', 'JSON'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setGenForm({ ...genForm, format: fmt })}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    genForm.format === fmt
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {fmt} Document
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Compile Report
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
