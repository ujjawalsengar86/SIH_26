import React from 'react';
import { DataSourceType } from '../../types';
import { DataSourceBadge } from './DataSourceBadge';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit: string;
  trend?: number; // negative is good for emissions/waste/energy, positive is good for circularity
  isPositiveTrendGood?: boolean; // default false for impacts, true for circularity
  sourceBadge: DataSourceType;
  icon: React.ReactNode;
  subtitle?: string;
  accentColor?: 'emerald' | 'teal' | 'blue' | 'amber' | 'purple';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  trend,
  isPositiveTrendGood = false,
  sourceBadge,
  icon,
  subtitle,
  accentColor = 'emerald',
}) => {
  const isGood = trend !== undefined 
    ? (isPositiveTrendGood ? trend > 0 : trend < 0) 
    : null;

  const colorVariants = {
    emerald: 'hover:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5',
    teal: 'hover:border-teal-500/40 text-teal-600 dark:text-teal-400 bg-teal-500/5',
    blue: 'hover:border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5',
    amber: 'hover:border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5',
    purple: 'hover:border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/5',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-200 overflow-hidden group"
    >
      {/* Top row: Title and Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-xl transition-colors ${colorVariants[accentColor]}`}>
          {icon}
        </div>
      </div>

      {/* Metric value and unit */}
      <div className="flex items-baseline space-x-2 my-1">
        <span className="text-3xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {unit}
        </span>
      </div>

      {/* Trend indicator & Subtitle */}
      {trend !== undefined && (
        <div className="flex items-center space-x-1.5 mt-2 text-xs">
          {trend !== 0 ? (
            <span
              className={`inline-flex items-center font-medium px-1.5 py-0.5 rounded-md ${
                isGood
                  ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-rose-700 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300'
              }`}
            >
              {trend > 0 ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              )}
              {Math.abs(trend)}% vs Baseline
            </span>
          ) : (
            <span className="inline-flex items-center text-slate-500 font-medium">
              <Minus className="w-3 h-3 mr-0.5" /> Baseline
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 dark:text-slate-500 truncate">{subtitle}</span>
          )}
        </div>
      )}

      {/* Provenance Badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <DataSourceBadge source={sourceBadge} size="sm" />
      </div>
    </motion.div>
  );
};
