// src/components/finance/dashboard/FinanceUserChart.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ✅ Define data type
interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
}

export function FinanceUserChart() {
  // ✅ Type state correctly
  const [data, setData] = useState<MonthlyData[] | null>(null);

  useEffect(() => {
    // ✅ Set data with correct type
    setData([
      { month: 'Jan', revenue: 35000, expenses: 25000 },
      { month: 'Feb', revenue: 42000, expenses: 28000 },
      { month: 'Mar', revenue: 38000, expenses: 26000 },
      { month: 'Apr', revenue: 45000, expenses: 29000 },
      { month: 'May', revenue: 48000, expenses: 28000 },
      { month: 'Jun', revenue: 52000, expenses: 30000 },
    ]);
  }, []);

  // ✅ Handle loading state
  if (!data) {
    return <div className="h-64 bg-surface-hover rounded-xl animate-pulse"></div>;
  }

  // ✅ Calculate max values
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxExpenses = Math.max(...data.map(d => d.expenses));
  const maxValue = Math.max(maxRevenue, maxExpenses);

  return (
    <div className="h-64 flex items-end justify-between gap-4">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div className="relative w-full flex justify-between">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.revenue / maxValue) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="w-1/3 bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-xl flex flex-col items-center pb-1"
            >
              <span className="text-white text-xs font-bold">{(item.revenue / 1000).toFixed(0)}K</span>
            </motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.expenses / maxValue) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="w-1/3 bg-gradient-to-t from-accent-pink to-accent-pink/50 rounded-t-xl flex flex-col items-center pb-1"
            >
              <span className="text-white text-xs font-bold">{(item.expenses / 1000).toFixed(0)}K</span>
            </motion.div>
          </div>
          <span className="text-secondary text-xs mt-2">{item.month}</span>
        </div>
      ))}
    </div>
  );
}