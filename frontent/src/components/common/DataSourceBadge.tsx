import React from 'react';
import { DataSourceType } from '../../types';
import { Database, BookOpen, Sparkles, Cpu, CheckCircle, Calculator } from 'lucide-react';

interface DataSourceBadgeProps {
  source: DataSourceType | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const DataSourceBadge: React.FC<DataSourceBadgeProps> = ({ 
  source, 
  size = 'md',
  showIcon = true 
}) => {
  const getBadgeConfig = (src: string) => {
    switch (src) {
      case 'Official Calculated Result':
        return {
          label: 'Official ISO 14044 Result',
          icon: <CheckCircle className="w-3.5 h-3.5" />,
          classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
        };
      case 'Calculated':
        return {
          label: 'Calculated',
          icon: <Calculator className="w-3.5 h-3.5" />,
          classes: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30'
        };
      case 'Ground Data':
        return {
          label: 'Ground Data (Site Metered)',
          icon: <Database className="w-3.5 h-3.5" />,
          classes: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
        };
      case 'Reference Data':
        return {
          label: 'Reference Data (Ecoinvent/IAI)',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          classes: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30'
        };
      case 'AI Estimated':
        return {
          label: 'AI Estimated (UI Placeholder)',
          icon: <Sparkles className="w-3.5 h-3.5" />,
          classes: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30 border-dashed'
        };
      case 'AI Prediction':
        return {
          label: 'AI Prediction (Simulated)',
          icon: <Cpu className="w-3.5 h-3.5" />,
          classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
        };
      default:
        return {
          label: src,
          icon: <Database className="w-3.5 h-3.5" />,
          classes: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20'
        };
    }
  };

  const config = getBadgeConfig(source);

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-md border tracking-tight ${config.classes} ${sizeClasses[size]}`}
      title={`Data Provenance: ${config.label}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
