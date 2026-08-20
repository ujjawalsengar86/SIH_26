import React from 'react';
import { ConfidenceLevel } from '../../types';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel | string;
  scorePct?: number;
  size?: 'sm' | 'md';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ 
  level, 
  scorePct, 
  size = 'md' 
}) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'High':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />,
          classes: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
          label: 'High Confidence'
        };
      case 'Medium':
        return {
          icon: <Shield className="w-3.5 h-3.5 text-amber-500" />,
          classes: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
          label: 'Medium Confidence'
        };
      case 'Low':
      default:
        return {
          icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />,
          classes: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
          label: 'Low Confidence'
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.classes} ${sizeClasses}`}>
      {config.icon}
      <span>{config.label}</span>
      {scorePct !== undefined && (
        <span className="font-mono opacity-80">({scorePct}%)</span>
      )}
    </span>
  );
};
