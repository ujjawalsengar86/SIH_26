import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { MOCK_MATERIAL_PASSPORT } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { 
  QrCode, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Layers, 
  Flame, 
  Droplet, 
  Zap, 
  Recycle,
  Building,
  Calendar,
  Globe2
} from 'lucide-react';

export const MaterialPassportPage: React.FC = () => {
  const { showNotification } = useNotification();
  const passport = MOCK_MATERIAL_PASSPORT;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(passport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Material_Passport_${passport.passportNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showNotification({
      title: 'Passport JSON Exported',
      description: `Downloaded passport ${passport.passportNumber}`,
      type: 'success',
    });
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passport.blockchainVerificationHash);
    showNotification({
      title: 'Cryptographic Hash Copied',
      description: 'Audit hash copied to system clipboard.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              EU DPP & CBAM Compliant
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Immutable Provenance</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Digital Material Passport (DPP)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Standardized product carbon and circularity identity document for downstream OEM manufacturing and recycling loops.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DPP JSON</span>
          </button>
        </div>
      </div>

      {/* Main Material Passport Document Certificate Box */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 print:border-none print:shadow-none">
        {/* Certificate Header Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Official Digital Certificate
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {passport.grade}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {passport.materialName} • {passport.facility}
            </p>
          </div>

          {/* QR Code and Passport Serial Badge */}
          <div className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-900 dark:text-white" />
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Passport ID</span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                {passport.passportNumber}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                Verified Cryptographically
              </span>
            </div>
          </div>
        </div>

        {/* Primary Circularity & Environmental Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Virgin Content</span>
            <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white block mt-0.5">{passport.virginContentPct}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Recycled Content</span>
            <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">{passport.recycledContentPct}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Recoverability</span>
            <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white block mt-0.5">{passport.recoverabilityPct}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Material Loss</span>
            <span className="text-lg font-extrabold font-mono text-amber-600 dark:text-amber-400 block mt-0.5">{passport.materialLossPct}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Recycling Potential</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mt-1">{passport.recyclingPotential}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Reuse Potential</span>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block mt-1">{passport.reusePotential}</span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
            <span className="text-[9px] uppercase font-bold text-purple-600 dark:text-purple-400 block">Circularity Index</span>
            <span className="text-lg font-extrabold font-mono text-purple-600 dark:text-purple-400 block mt-0.5">{passport.circularityScore}/100</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Carbon Intensity</span>
            <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">{passport.carbonIntensity} t</span>
          </div>
        </div>

        {/* Chemical Composition Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Spectrometric Chemical Composition (ASTM B221 / EN 573-3)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Traceability Tolerance ±0.02%</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {passport.chemicalComposition.map(c => (
              <div
                key={c.symbol}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-center"
              >
                <span className="text-xs font-mono font-bold text-slate-500 block">{c.symbol}</span>
                <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white block mt-0.5">
                  {c.percentage}%
                </span>
                <span className="text-[9px] text-slate-400 block truncate">{c.element}</span>
              </div>
            ))}
          </div>
        </div>

        {/* End-of-Life Routes & Compliance Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Certified Standards & Regulatory Declarations
            </h4>
            <div className="space-y-2">
              {passport.complianceCertifications.map((cert, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Circular End-of-Life Allocation Pathways
            </h4>
            <div className="space-y-2 text-xs">
              {passport.endOfLifeScenarios.map((sc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{sc.route}</span>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-slate-400">{sc.sharePct}% Share</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{sc.yieldPct}% Yield</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cryptographic Hash Provenance Footer */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 truncate w-full">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Immutable Hash:</span>
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300 truncate">
              {passport.blockchainVerificationHash}
            </span>
          </div>

          <button
            onClick={handleCopyHash}
            className="shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px] rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Hash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
