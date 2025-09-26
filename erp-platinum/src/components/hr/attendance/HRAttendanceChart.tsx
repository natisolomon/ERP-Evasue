// src/components/hr/attendance/HRAttendanceChart.tsx
'use client';

import { useEffect } from 'react'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const getLastNDays = (n: number) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};

export function HRAttendanceChart() {
  const staff = useSelector((state: RootState) => state.staff.staff);
  const attendances = useSelector((state: RootState) => state.attendance.records);
  const last7Days = getLastNDays(7);

  // Debug
  useEffect(() => {
    console.log('Staff:', staff.length);
    console.log('Attendances:', attendances.length);
  }, [staff, attendances]);

  const dailyRates = last7Days.map(date => {
    const dailyAttendances = attendances.filter(att => 
      att.date.split('T')[0] === date
    );
    
    // If no records for this day, show null
    if (dailyAttendances.length === 0) {
      return { date, rate: null };
    }

    const presentCount = dailyAttendances.filter(att => att.isPresent).length;
    const totalStaff = staff.length;
    const rawRate = totalStaff > 0 ? (presentCount / totalStaff) * 100 : 0;
    const rate = Math.min(100, Math.max(0, rawRate)); // Clamp 0–100
    
    return {
      date,
      rate: parseFloat(rate.toFixed(1)),
    };
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}`;
  };

  return (
    <div className="h-64 flex items-end justify-between gap-3 px-1">
      {dailyRates.map((item, i) => (
        <div key={item.date} className="flex-1 flex flex-col items-center">
          {item.rate !== null ? (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${item.rate}%` }} // ✅ Absolute scale
              transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-lg flex flex-col items-center pb-1"
              style={{ minHeight: '4px' }}
            >
              <span className="text-white text-[10px] font-bold">{Math.round(item.rate)}%</span>
            </motion.div>
          ) : (
            <div className="w-full h-8 flex items-end justify-center">
              <span className="text-secondary text-[10px]">—</span>
            </div>
          )}
          <span className="text-secondary text-[10px] mt-2 text-center">
            {formatDate(item.date)}
          </span>
        </div>
      ))}
    </div>
  );
}