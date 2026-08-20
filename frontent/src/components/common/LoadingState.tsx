import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading metallurgical datasets...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px] w-full text-center">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{message}</span>
      <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">Calibrating ISO 14044 process factors</span>
    </div>
  );
};
