import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Scenario } from '../../types';

interface ComparisonChartProps {
  scenarios: Scenario[];
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ scenarios }) => {
  const [selectedMetric, setSelectedMetric] = useState<'ghg' | 'energy' | 'water' | 'circularityScore'>('ghg');

  const metricConfigs = {
    ghg: { label: 'GHG Footprint (t CO₂e)', dataKey: 'ghg', color: '#059669', unit: 't CO₂e' },
    energy: { label: 'Energy Demand (kWh)', dataKey: 'energy', color: '#0d9488', unit: 'kWh' },
    water: { label: 'Water Depletion (m³)', dataKey: 'water', color: '#0284c7', unit: 'm³' },
    circularityScore: { label: 'Circularity Score (MCI / 100)', dataKey: 'circularityScore', color: '#8b5cf6', unit: '/ 100' },
  };

  const chartData = scenarios.map(sc => ({
    name: sc.name.replace(' (Worst Case)', '').replace(' (15% Scrap)', ''),
    value: sc.metrics[selectedMetric],
    delta: selectedMetric === 'circularityScore' ? sc.metrics.circularityDelta : sc.metrics[`${selectedMetric}ReductionPct` as keyof typeof sc.metrics],
    isBaseline: sc.isBaseline,
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Metric Selector Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['ghg', 'energy', 'water', 'circularityScore'] as const).map(key => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedMetric === key
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {metricConfigs[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Comparison Canvas */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 15, right: 15, left: -5, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              interval={0}
              angle={-10}
              textAnchor="end"
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-slate-900/95 text-white rounded-xl shadow-xl border border-slate-700 text-xs">
                      <div className="font-bold text-slate-100">{data.name}</div>
                      <div className="text-emerald-400 font-mono font-bold text-sm mt-1">
                        {data.value} {metricConfigs[selectedMetric].unit}
                      </div>
                      <div className="mt-1 text-slate-300">
                        {data.isBaseline ? (
                          <span className="text-slate-400 font-medium">Standard Reference Baseline</span>
                        ) : (
                          <span>
                            {selectedMetric === 'circularityScore' ? (
                              <span className={data.delta >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                {data.delta >= 0 ? `+${data.delta}` : data.delta} pts vs Baseline
                              </span>
                            ) : (
                              <span className={data.delta >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                {data.delta >= 0 ? `-${data.delta}% reduction` : `+${Math.abs(data.delta)}% increase`}
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              fill={metricConfigs[selectedMetric].color}
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
