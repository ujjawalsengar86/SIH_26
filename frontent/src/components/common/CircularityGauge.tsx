import React from 'react';
import { motion } from 'framer-motion';

interface CircularityGaugeProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  showBreakdown?: boolean;
  label?: string;
  sublabel?: string;
}

export const CircularityGauge: React.FC<CircularityGaugeProps> = ({
  score,
  size = 220,
  strokeWidth = 16,
  showBreakdown = true,
  label = 'Circularity Score',
  sublabel = 'Material Circularity Indicator (MCI)',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc of 260 degrees (leaving 100 degrees open at the bottom)
  const arcLength = circumference * (260 / 360);
  const strokeDashoffset = arcLength - (arcLength * Math.min(100, Math.max(0, score))) / 100;

  const getScoreColor = (val: number) => {
    if (val >= 80) return { stroke: '#10b981', text: 'text-emerald-500', grade: 'A+ (High Circularity)' };
    if (val >= 65) return { stroke: '#14b8a6', text: 'text-teal-500', grade: 'B+ (Moderate Circularity)' };
    if (val >= 50) return { stroke: '#f59e0b', text: 'text-amber-500', grade: 'C (Transition State)' };
    return { stroke: '#ef4444', text: 'text-rose-500', grade: 'D (Linear / Heavy Loss)' };
  };

  const status = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform rotate-[140deg] overflow-visible"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Animated active stroke */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={status.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="filter drop-shadow-sm"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
          <motion.span
            key={score}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white"
          >
            {score}
          </motion.span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            / 100
          </span>
          <span className={`text-[11px] font-semibold mt-1 ${status.text}`}>
            {status.grade}
          </span>
        </div>
      </div>

      <div className="text-center mt-1">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{label}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">{sublabel}</p>
      </div>

      {showBreakdown && (
        <div className="grid grid-cols-2 gap-2 mt-4 w-full text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Recycled Content</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">60%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Recovery Rate</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">86%</span>
          </div>
        </div>
      )}
    </div>
  );
};
