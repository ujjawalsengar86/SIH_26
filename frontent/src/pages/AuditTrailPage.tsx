import React from 'react';
import { MOCK_AUDIT_LOGS } from '../data/mockData';
import { 
  History, 
  ShieldCheck, 
  User, 
  Cpu, 
  FileText, 
  GitCommit, 
  Clock, 
  Copy, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const AuditTrailPage: React.FC = () => {
  const { showNotification } = useNotification();
  const logs = MOCK_AUDIT_LOGS;

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    showNotification({
      title: 'Cryptographic Hash Copied',
      description: 'Audit entry hash copied to clipboard.',
      type: 'info',
    });
  };

  const getActionIcon = (entityType: string) => {
    switch (entityType) {
      case 'Calculation':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Inventory':
        return <GitCommit className="w-4 h-4 text-blue-500" />;
      case 'Scenario':
        return <Cpu className="w-4 h-4 text-purple-500" />;
      case 'Report':
        return <FileText className="w-4 h-4 text-amber-500" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
              Immutable Governance
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">ISO 14044 Verification Chain</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Enterprise Compliance Audit Trail
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cryptographically sealed event logs recording all parameter revisions, scenario creations, and report signing events.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Hash Ledger: Synced (5 Events)
          </span>
        </div>
      </div>

      {/* Chronological Audit Timeline */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {logs.map(log => (
            <div key={log.id} className="relative space-y-2">
              {/* Timeline Bullet Icon */}
              <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                {getActionIcon(log.entityType)}
              </div>

              {/* Event Container */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {log.action}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                      {log.entityType}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {log.details}
                </p>

                {/* Diff View Box if change occurred */}
                {log.changeDiff && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center space-x-3 font-mono">
                    <span className="text-slate-400 font-sans">{log.changeDiff.field}:</span>
                    <span className="text-rose-600 dark:text-rose-400 line-through">{log.changeDiff.oldValue}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{log.changeDiff.newValue}</span>
                  </div>
                )}

                {/* User & Hash Provenance */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>{log.userName}</strong> ({log.userRole})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] truncate max-w-[140px]">{log.hash}</span>
                    <button
                      onClick={() => handleCopyHash(log.hash)}
                      className="p-1 hover:text-white rounded transition-colors"
                      title="Copy Hash"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
