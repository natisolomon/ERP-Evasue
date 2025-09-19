// src/components/inventory/dashboard/InventoryUserChart.tsx
'use client';

import { motion } from 'framer-motion';

export function InventoryUserChart() {
  // Mock data for chart
  const monthlyData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 67 },
    { month: 'Mar', value: 56 },
    { month: 'Apr', value: 78 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 85 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="h-64 flex items-end justify-between gap-4">
      {monthlyData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(item.value / maxValue) * 100}%` }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
          className="flex-1 bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-xl flex flex-col items-center pb-2"
        >
          <span className="text-white text-xs font-bold">{item.value}</span>
          <span className="text-secondary text-xs mt-1">{item.month}</span>
        </motion.div>
      ))}
    </div>
  );
}