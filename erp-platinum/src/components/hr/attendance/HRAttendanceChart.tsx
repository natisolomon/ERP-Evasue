// src/components/hr/attendance/HRAttendanceChart.tsx
'use client';

import { motion } from 'framer-motion';

export function HRAttendanceChart() {
  // Mock data for last 6 months
  const attendanceData = [
    { month: 'Jan', rate: 92.5 },
    { month: 'Feb', rate: 94.2 },
    { month: 'Mar', rate: 91.8 },
    { month: 'Apr', rate: 95.6 },
    { month: 'May', rate: 93.4 },
    { month: 'Jun', rate: 96.1 },
  ];

  const maxValue = Math.max(...attendanceData.map(d => d.rate));

  return (
      <div className="h-64 flex items-end justify-between gap-4">
        {attendanceData.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.rate / maxValue) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="w-full bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-xl flex flex-col items-center pb-1"
            >
              <span className="text-white text-xs font-bold">{item.rate.toFixed(1)}%</span>
            </motion.div>
            <span className="text-secondary text-xs mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    
  );
}