// src/components/admin/inventory/InventoryChart.tsx
'use client';

import { motion } from 'framer-motion';

interface ChartData {
  name: string;
  data: number[];  // ✅ Fixed: Add property name "data"
  color: 'cyan' | 'pink' | 'green' | 'amber';
}

interface InventoryChartProps {
  data: ChartData[];
  height?: number;
}

const colorMap = {
  cyan: 'stroke-accent-cyan fill-accent-cyan/20',
  pink: 'stroke-accent-pink fill-accent-pink/20',
  green: 'stroke-accent-success fill-accent-success/20',
  amber: 'stroke-status-warning fill-status-warning/20',
};

export function InventoryChart({ data, height = 200 }: InventoryChartProps) {
  const maxValue = Math.max(...data.flatMap(d => d.data));
  const minValue = Math.min(...data.flatMap(d => d.data));
  const range = maxValue - minValue;

  return (
    <div className="relative h-64 lg:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridLines" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.1"
            className="text-primary"
          />
        ))}
        {/* Chart lines */}
        {data.map((series, i) => (
          <motion.path
            key={series.name}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
            d={`
              M 0 ${100 - ((series.data[0] - minValue) / range) * 100}
              ${series.data.slice(1).map((value, index) => 
                `L ${(index + 1) * (100 / (series.data.length - 1))} ${100 - ((value - minValue) / range) * 100}`
              ).join(' ')}
            `}
            fill="none"
            className={colorMap[series.color]}
            strokeWidth="2"
          />
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 mt-4">
        {data.map((series, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colorMap[series.color].split(' ')[1]}`}></div>
            <span className="text-sm text-secondary">{series.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}