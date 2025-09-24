// src/components/hr/attendance/HRAttendanceChart.tsx
'use client';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Helper: Get last N days (e.g., 7 days)
const getLastNDays = (n: number) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]); // YYYY-MM-DD
  }
  return days;
};

export function HRAttendanceChart() {
  const staff = useSelector((state: RootState) => state.staff.staff);
  const attendances = useSelector((state: RootState) => state.attendance.records);
  const last7Days = getLastNDays(7);

  // Calculate daily attendance rate
  const dailyRates = last7Days.map(date => {
    const dailyAttendances = attendances.filter(att => 
      att.date.split('T')[0] === date
    );
    
    const presentCount = dailyAttendances.filter(att => att.isPresent).length;
    const totalStaff = staff.length;
    const rate = totalStaff > 0 ? (presentCount / totalStaff) * 100 : 0;
    
    return {
      date,
      rate: parseFloat(rate.toFixed(1)),
    };
  });

  const maxValue = Math.max(...dailyRates.map(d => d.rate), 1); // avoid 0 max

  // Format date for display (e.g., "Mon 10")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `${weekday} ${day}`;
  };

  return (
    <div className="h-64 flex items-end justify-between gap-3">
      {dailyRates.map((item, i) => (
        <div key={item.date} className="flex-1 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(item.rate / maxValue) * 100}%` }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
            className="w-full bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-xl flex flex-col items-center pb-1"
          >
            <span className="text-white text-xs font-bold">{item.rate}%</span>
          </motion.div>
          <span className="text-secondary text-xs mt-2">{formatDate(item.date)}</span>
        </div>
      ))}
    </div>
  );
}