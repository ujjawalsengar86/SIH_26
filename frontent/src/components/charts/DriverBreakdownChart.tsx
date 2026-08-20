import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ImpactDriver } from '../../types';
import { Zap, Mountain, Truck, Flame } from 'lucide-react';

interface DriverBreakdownChartProps {
  drivers: ImpactDriver[];
}

export const DriverBreakdownChart: React.FC<DriverBreakdownChartProps> = ({ drivers }) => {
  const getIcon = (name: string) => {
    if (name.toLowerCase().includes('electricity') || name.toLowerCase().includes('grid')) return <Zap className="w-4 h-4 text-emerald-500" />;
    if (name.toLowerCase().includes('raw') || name.toLowerCase().includes('bauxite') || name.toLowerCase().includes('ore')) return <Mountain className="w-4 h-4 text-teal-500" />;
    if (name.toLowerCase().includes('transport') || name.toLowerCase().includes('freight')) return <Truck className="w-4 h-4 text-amber-500" />;
    return <Flame className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Donut Chart */}
        <div className="md:col-span-5 h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={drivers}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                stroke="none"
              >
                {drivers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ImpactDriver;
                    return (
                      <div className="p-3 bg-slate-900/95 text-white rounded-xl shadow-xl border border-slate-700 text-xs">
                        <div className="font-bold text-slate-100">{data.name}</div>
                        <div className="text-emerald-400 font-mono font-bold text-sm mt-0.5">
                          {data.percentage}% ({data.ghgContribution} {data.unit})
                        </div>
                        <div className="text-slate-400 text-[11px] mt-1">{data.category}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Main</span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">Drivers</span>
          </div>
        </div>

        {/* Legend & Breakdown Details */}
        <div className="md:col-span-7 space-y-2.5">
          {drivers.map((driver, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/60 dark:border-slate-800 flex items-start justify-between gap-2"
            >
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-2xs mt-0.5">
                  {getIcon(driver.name)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {driver.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {driver.explanation}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">
                  {driver.percentage}%
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">
                  {driver.ghgContribution} {driver.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
