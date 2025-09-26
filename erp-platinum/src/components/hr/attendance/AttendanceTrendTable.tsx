// src/components/hr/attendance/AttendanceTrendTable.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  isPresent: boolean;
}

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
}

interface TrendItem {
  key: string;
  label: string;
  rawValue: string;
  type: 'daily' | 'weekly' | 'monthly';
  present: number;
  absent: number;
  rate: number;
  isToday: boolean;
}

interface AttendanceTrendTableProps {
  attendances: AttendanceRecord[];
  staff: StaffMember[];
  loading?: boolean;
  onRowClick?: (item: TrendItem) => void;
}

const getWeekKey = (dateStr: string): string => {
  const date = new Date(dateStr);
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const week = Math.ceil((days + start.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${week.toString().padStart(2, '0')}`;
};

const getMonthKey = (dateStr: string): string => {
  return dateStr.split('T')[0].slice(0, 7);
};

export function AttendanceTrendTable({
  attendances,
  staff,
  loading = false,
  onRowClick
}: AttendanceTrendTableProps) {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const today = new Date().toISOString().split('T')[0];

  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });
  }, []);

  const last4Weeks = useMemo(() => {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i * 7);
      weeks.push(getWeekKey(d.toISOString()));
    }
    return [...new Set(weeks)].reverse();
  }, []);

  const last6Months = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      return getMonthKey(d.toISOString());
    });
  }, []);

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.toLocaleDateString('en-US', { weekday: 'short' })}, ${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getDate()}`;
  };

  const formatWeekLabel = (weekKey: string) => {
    const [year, w] = weekKey.split('-W');
    return `Week ${w} ${year}`;
  };

  const formatMonthLabel = (monthKey: string) => {
    const d = new Date(monthKey + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const trendData = useMemo(() => {
    if (loading) return [];

    const totalStaff = staff.length;

    const computeForDays = (dates: string[]): TrendItem[] => {
      return dates.map(date => {
        const records = attendances.filter(att => att.date.split('T')[0] === date);
        const presentStaffIds = new Set(records.filter(r => r.isPresent).map(r => r.staffId));
        const present = Math.min(totalStaff, presentStaffIds.size);
        const absent = totalStaff - present;
        const rate = totalStaff > 0 ? Math.min(100, Math.round((present / totalStaff) * 100)) : 0;
        return {
          key: date,
          label: formatDateLabel(date),
          rawValue: date,
          type: 'daily',
          present,
          absent,
          rate,
          isToday: date === today,
        };
      });
    };

    const computeForWeeks = (weeks: string[]): TrendItem[] => {
      return weeks.map(weekKey => {
        const [year, weekStr] = weekKey.split('-W');
        const weekNum = parseInt(weekStr, 10);
        const jan1 = new Date(parseInt(year), 0, 1);
        const daysToMon = jan1.getDay() === 0 ? -6 : 1 - jan1.getDay();
        const firstMonday = new Date(jan1);
        firstMonday.setDate(jan1.getDate() + daysToMon + (weekNum - 1) * 7);
        const dates = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(firstMonday);
          d.setDate(firstMonday.getDate() + i);
          return d.toISOString().split('T')[0];
        });

        const records = attendances.filter(att =>
          dates.includes(att.date.split('T')[0])
        );
        const presentStaffIds = new Set(records.filter(r => r.isPresent).map(r => r.staffId));
        const present = Math.min(totalStaff, presentStaffIds.size);
        const absent = totalStaff - present;
        const rate = totalStaff > 0 ? Math.min(100, Math.round((present / totalStaff) * 100)) : 0;
        return {
          key: weekKey,
          label: formatWeekLabel(weekKey),
          rawValue: weekKey,
          type: 'weekly',
          present,
          absent,
          rate,
          isToday: false,
        };
      });
    };

    const computeForMonths = (months: string[]): TrendItem[] => {
      return months.map(monthKey => {
        const [year, month] = monthKey.split('-');
        const y = parseInt(year);
        const m = parseInt(month) - 1;
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const dates = Array.from({ length: daysInMonth }, (_, i) => {
          const d = new Date(y, m, i + 1);
          return d.toISOString().split('T')[0];
        });

        const records = attendances.filter(att =>
          dates.includes(att.date.split('T')[0])
        );
        const presentStaffIds = new Set(records.filter(r => r.isPresent).map(r => r.staffId));
        const present = Math.min(totalStaff, presentStaffIds.size);
        const absent = totalStaff - present;
        const rate = totalStaff > 0 ? Math.min(100, Math.round((present / totalStaff) * 100)) : 0;
        return {
          key: monthKey,
          label: formatMonthLabel(monthKey),
          rawValue: monthKey,
          type: 'monthly',
          present,
          absent,
          rate,
          isToday: false,
        };
      });
    };

    switch (view) {
      case 'daily': return computeForDays(last7Days);
      case 'weekly': return computeForWeeks(last4Weeks);
      case 'monthly': return computeForMonths(last6Months);
      default: return [];
    }
  }, [view, attendances, staff, loading, today]);

  const handleExport = () => {
    const headers = ['Period', 'Present', 'Absent', 'Rate (%)'];
    const rows = trendData.map(item => `"${item.label}",${item.present},${item.absent},${item.rate}`);
    const csvContent = 'text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `attendance_trend_${view}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-6 bg-default/20 rounded animate-pulse" />)}</div>;
  }

  if (trendData.length === 0 || trendData.every(d => d.present === 0 && d.absent === 0)) {
    return <div className="text-center py-8 text-secondary"><p>No attendance data available.</p></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                view === v ? 'bg-primary text-white' : 'bg-default/20 text-secondary hover:bg-default/40'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="text-sm flex items-center gap-1.5 px-3 py-1.5 bg-accent-cyan/10 text-accent-cyan rounded-lg hover:bg-accent-cyan/20 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </motion.button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-default/20">
        <table className="w-full text-sm">
          <thead className="bg-default/10">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-secondary">Period</th>
              <th className="text-center py-3 px-4 font-medium text-secondary">Present</th>
              <th className="text-center py-3 px-4 font-medium text-secondary">Absent</th>
              <th className="text-right py-3 px-4 font-medium text-secondary">Rate</th>
            </tr>
          </thead>
          <tbody>
            {trendData.map((item) => (
              <tr
                key={item.key}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-default/10 hover:bg-default/10 cursor-pointer transition-colors ${
                  item.isToday ? 'bg-accent-cyan/5' : ''
                }`}
              >
                <td className="py-3 px-4 font-medium">
                  {item.label}
                  {item.isToday && (
                    <span className="ml-2 text-xs bg-accent-cyan/20 text-accent-cyan px-1.5 py-0.5 rounded">
                      Today
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center text-accent-success font-medium">{item.present}</td>
                <td className="py-3 px-4 text-center text-status-danger font-medium">{item.absent}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`font-bold ${item.rate >= 80 ? 'text-accent-success' : item.rate >= 60 ? 'text-status-warning' : 'text-status-danger'}`}>
                    {item.rate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}