import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { StageImpact } from '../../types';
import { DataSourceBadge } from '../common/DataSourceBadge';

interface ImpactChartProps {
  stages: StageImpact[];
}

export const ImpactChart: React.FC<ImpactChartProps> = ({ stages }) => {
  const [activeMetric, setActiveMetric] = useState<'ghg' | 'energy' | 'water' | 'waste'>('ghg');

  const metricLabels = {
    ghg: { label: 'GHG Emissions', unit: 't CO₂e', color: '#059669' },
    energy: { label: 'Cumulative Energy Demand', unit: 'kWh', color: '#0d9488' },
    water: { label: 'Water Depletion', unit: 'm³', color: '#0284c7' },
    waste: { label: 'Solid Waste / Tailings', unit: 'kg', color: '#d97706' },
  };

  const chartData = stages.map(st => ({
    stage: st.stage,
    value: st[activeMetric],
    source: st.source,
    pct: st.percentage,
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['ghg', 'energy', 'water', 'waste'] as const).map(key => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeMetric === key
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {metricLabels[key].label}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <DataSourceBadge source="Calculated" size="sm" />
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" vertical={false} />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              unit={` ${metricLabels[activeMetric].unit.split(' ')[0]}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-slate-900/95 text-white rounded-xl shadow-xl border border-slate-700 text-xs">
                      <div className="font-bold text-slate-100 mb-1">{data.stage} Stage</div>
                      <div className="text-emerald-400 font-mono font-bold text-sm">
                        {data.value} {metricLabels[activeMetric].unit}
                      </div>
                      <div className="text-slate-400 mt-1">Impact Share: <span className="text-white font-semibold">{data.pct}%</span></div>
                      <div className="mt-2 pt-2 border-t border-slate-700">
                        <DataSourceBadge source={data.source} size="sm" />
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              fill={metricLabels[activeMetric].color} 
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stage Footnote */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 px-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Boundary: Cradle-to-Grave</span>
        <span className="font-mono">ISO 14044 Characterization (IPCC GWP 100a)</span>
      </div>
    </div>
  );
};
