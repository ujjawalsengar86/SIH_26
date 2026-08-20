import React, { useState } from 'react';
import { MOCK_DATA_QUALITY } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { useNotification } from '../context/NotificationContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Database, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const DataQualityPage: React.FC = () => {
  const { showNotification } = useNotification();
  const [dataQuality, setDataQuality] = useState(MOCK_DATA_QUALITY);

  const breakdownData = [
    { name: 'Ground Data (Site Telemetry)', value: dataQuality.groundDataPct, color: '#3b82f6' },
    { name: 'Reference Data (Ecoinvent / IAI)', value: dataQuality.referenceDataPct, color: '#64748b' },
    { name: 'AI Estimated Parameters', value: dataQuality.aiEstimatedPct, color: '#a855f7' },
  ];

  const handleResolveAnomaly = (id: string) => {
    setDataQuality(prev => ({
      ...prev,
      anomalies: prev.anomalies.map(a => a.id === id ? { ...a, status: 'Reviewed' } : a)
    }));

    showNotification({
      title: 'Telemetry Anomaly Resolved',
      description: 'Recalibration note logged to verifiable audit trail.',
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
              ISO 14044 Pedigree Compliance
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">Weidema Pedigree Matrix Assessment</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Data Quality & Provenance Verification
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit ground data completeness, reference database correlations, and automated anomaly flagging.
          </p>
        </div>

        <ConfidenceBadge level={dataQuality.confidence} scorePct={dataQuality.overallScore} size="md" />
      </div>

      {/* Top 4 Quality Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Data Quality</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{dataQuality.overallScore}</span>
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
            High Scientific Confidence
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Ground Data Telemetry</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">{dataQuality.groundDataPct}%</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            SCADA & Weighbridge Metered
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Reference Databases</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-slate-700 dark:text-slate-300">{dataQuality.referenceDataPct}%</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            Ecoinvent 3.9 & IAI Factors
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Flagged Anomalies</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">{dataQuality.anomaliesDetected}</span>
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-1">
            Requires Engineer Review
          </span>
        </div>
      </div>

      {/* Visual Provenance Mix & Pedigree Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Data Source Provenance Mix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proportion of primary vs background data
            </p>
          </div>

          <div className="h-48 relative my-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={4}
                  stroke="none"
                >
                  {breakdownData.map((e, idx) => (
                    <Cell key={`cell-${idx}`} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {breakdownData.map(b => (
              <div key={b.name} className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }}></span>
                  <span>{b.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{b.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Anomalies & Resolution Recommendations */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Detected Telemetry Anomalies & Outliers
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full font-bold">
              2 Open Items
            </span>
          </div>

          <div className="space-y-3">
            {dataQuality.anomalies.map(anom => (
              <div
                key={anom.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {anom.parameter}
                    </span>
                    <span className="text-[10px] text-slate-400">({anom.stage} Stage)</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    anom.status === 'Reviewed' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {anom.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Reported Telemetry</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{anom.reportedValue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Standard Expected Range</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{anom.expectedRange}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-normal">
                  <strong>Recommendation:</strong> {anom.resolutionRecommendation}
                </p>

                {anom.status !== 'Reviewed' && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handleResolveAnomaly(anom.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Mark Reviewed & Recalibrate
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weidema Pedigree Matrix Detailed Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          Weidema Pedigree Matrix Evaluation (1–5 Criteria)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">
                <th className="pb-3 px-3">Inventory Parameter</th>
                <th className="pb-3 px-2 text-center">Reliability</th>
                <th className="pb-3 px-2 text-center">Completeness</th>
                <th className="pb-3 px-2 text-center">Temporal</th>
                <th className="pb-3 px-2 text-center">Geographic</th>
                <th className="pb-3 px-2 text-center">Technological</th>
                <th className="pb-3 px-3 text-right">Pedigree DQ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dataQuality.pedigreeMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{row.parameter}</td>
                  <td className="py-3 px-2 text-center font-mono">{row.reliability}/5</td>
                  <td className="py-3 px-2 text-center font-mono">{row.completeness}/5</td>
                  <td className="py-3 px-2 text-center font-mono">{row.temporalCorrelation}/5</td>
                  <td className="py-3 px-2 text-center font-mono">{row.geographicCorrelation}/5</td>
                  <td className="py-3 px-2 text-center font-mono">{row.technologicalCorrelation}/5</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {row.overallDQ}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
