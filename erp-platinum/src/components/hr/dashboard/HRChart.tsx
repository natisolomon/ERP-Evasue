// src/components/hr/dashboard/HRChart.tsx
'use client';

import { motion } from 'framer-motion';

interface HRChartData {
  name: string;
  data: number[];
  color: 'cyan' | 'green' | 'pink' | 'amber' | 'purple';
}

interface HRChartProps {
  data: HRChartData[];
  height?: number;
}

export function HRChart({ data, height = 200 }: HRChartProps) {
  if (data.length === 0 || data[0].data.length === 0) return null;

  const maxValue = Math.max(...data.flatMap(d => d.data));
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, data[0].data.length);

  const colorMap = {
    cyan: 'bg-accent-cyan',
    green: 'bg-accent-success',
    pink: 'bg-accent-pink',
    amber: 'bg-status-warning',
    purple: 'bg-accent-purple',
  };

  return (
    
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-end justify-between gap-2 mb-4">
          {data[0].data.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full ${colorMap[data[0].color]} rounded-t-xl flex flex-col items-center pb-1`}
              >
                <span className="text-white text-xs font-bold">{value.toFixed(1)}</span>
              </motion.div>
              <span className="text-secondary text-xs mt-2">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
  );
}