// src/app/hr/attendance/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchStaff } from '../../../store/staffSlice';
import { fetchAttendance } from '@/store/AttendanceSlice';
import { HRAttendanceTable } from '@/components/hr/attendance/HRAttendanceTable';
import { HRAttendanceFilters } from '@/components/hr/attendance/HRAttendanceFilters';
import { AttendanceTrendTable } from '@/components/hr/attendance/AttendanceTrendTable';
import { RecordAttendanceModal } from '@/components/hr/attendance/modals/RecordAttendanceModal';
import { AttendanceDetailModal } from '@/components/hr/attendance/modals/AttendanceDetailModal';
import { useModal } from '@/components/layout/ModalProvider';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
}

interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  isPresent: boolean;
}

export default function HRAttendancePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, loading: staffLoading } = useSelector((state: RootState) => state.staff);
  const { records: attendances, loading: attendanceLoading } = useSelector((state: RootState) => state.attendance);

  const [filters, setFilters] = useState({
    department: 'all',
    date: new Date().toISOString().split('T')[0],
    search: '',
  });

  const [activeTab, setActiveTab] = useState<'record' | 'analyze'>('record');
  const [detailModal, setDetailModal] = useState<{
    periodLabel: string;
    present: StaffMember[];
    absent: StaffMember[];
  } | null>(null);

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchAttendance());
  }, [dispatch]);

  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      if (filters.department !== 'all' && member.department !== filters.department) 
        return false;
      if (filters.search && 
          !member.firstName.toLowerCase().includes(filters.search.toLowerCase()) && 
          !member.lastName.toLowerCase().includes(filters.search.toLowerCase())) 
        return false;
      return true;
    });
  }, [staff, filters]);

  const { openModal, closeModal } = useModal();

  const todayAttendances = attendances.filter(att => 
    att.date.split('T')[0] === filters.date
  );
  const presentToday = todayAttendances.filter(att => att.isPresent).length;
  const absentToday = todayAttendances.filter(att => !att.isPresent).length;
  const totalStaff = filteredStaff.length;
  const attendanceRate = totalStaff > 0 ? ((presentToday / totalStaff) * 100).toFixed(1) : '0.0';

  // ✅ CORRECTED: Get staff for period using UNIQUE staff IDs
  const getStaffForPeriod = (type: 'daily' | 'weekly' | 'monthly', rawValue: string) => {
    let dates: string[] = [];

    if (type === 'daily') {
      dates = [rawValue];
    } else if (type === 'weekly') {
      const [year, weekStr] = rawValue.split('-W');
      const weekNum = parseInt(weekStr, 10);
      const jan1 = new Date(parseInt(year), 0, 1);
      const daysToMon = jan1.getDay() === 0 ? -6 : 1 - jan1.getDay();
      const firstMonday = new Date(jan1);
      firstMonday.setDate(jan1.getDate() + daysToMon + (weekNum - 1) * 7);
      dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(firstMonday);
        d.setDate(firstMonday.getDate() + i);
        return d.toISOString().split('T')[0];
      });
    } else if (type === 'monthly') {
      const [year, month] = rawValue.split('-');
      const y = parseInt(year);
      const m = parseInt(month) - 1;
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      dates = Array.from({ length: daysInMonth }, (_, i) => {
        const d = new Date(y, m, i + 1);
        return d.toISOString().split('T')[0];
      });
    }

    const periodRecords = attendances.filter(att =>
      dates.includes(att.date.split('T')[0])
    );

    // ✅ Use SET of staff IDs who were marked PRESENT
    const presentStaffIds = new Set(
      periodRecords.filter(r => r.isPresent).map(r => r.staffId)
    );

    // ✅ Present = staff in filtered list WITH a "present" record
    const presentStaff = filteredStaff.filter(s => presentStaffIds.has(s.id));
    // ✅ Absent = everyone else in filtered list
    const absentStaff = filteredStaff.filter(s => !presentStaffIds.has(s.id));

    return { presentStaff, absentStaff };
  };

  if (staffLoading || attendanceLoading) {
    return <div className="p-8">Loading attendance data...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Attendance Management
        </h1>
        <p className="text-secondary mt-2">Track and manage staff attendance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-cyan/10 text-accent-cyan"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Total Staff</h3>
          <p className="text-3xl font-extrabold">{totalStaff}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Present Today</h3>
          <p className="text-3xl font-extrabold">{presentToday}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Late Today</h3>
          <p className="text-3xl font-extrabold">0</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-danger/10 text-status-danger"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Absent Today</h3>
          <p className="text-3xl font-extrabold">{absentToday}</p>
        </motion.div>
      </div>

      {/* Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('record')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'record'
                ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-md'
                : 'bg-default/20 text-secondary hover:bg-default/40'
            }`}
          >
            Record Attendance
          </button>
          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'analyze'
                ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-md'
                : 'bg-default/20 text-secondary hover:bg-default/40'
            }`}
          >
            Analyze Trends
          </button>
        </div>
      </div>

      {activeTab === 'record' ? (
        <>
          <HRAttendanceFilters filters={filters} setFilters={setFilters} />
          <div className="glass rounded-3xl p-6 border border-default mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Daily Attendance</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(<RecordAttendanceModal onClose={closeModal} />)}
                className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                + Record Attendance
              </motion.button>
            </div>
            <HRAttendanceTable 
              staffList={filteredStaff} 
              attendances={attendances} 
              date={filters.date} 
            />
          </div>
        </>
      ) : (
        <div className="glass rounded-3xl p-6 border border-default">
          <h3 className="text-lg font-bold mb-4">Attendance Trend Analysis</h3>
          <AttendanceTrendTable 
            attendances={attendances} 
            staff={filteredStaff}
            loading={staffLoading || attendanceLoading}
            onRowClick={(item) => {
              const { presentStaff, absentStaff } = getStaffForPeriod(item.type, item.rawValue);
              setDetailModal({
                periodLabel: item.label,
                present: presentStaff,
                absent: absentStaff,
              });
            }}
          />
        </div>
      )}

      {/* Modal */}
      {detailModal && (
        <AttendanceDetailModal
          periodLabel={detailModal.periodLabel}
          presentStaff={detailModal.present}
          absentStaff={detailModal.absent}
          onClose={() => setDetailModal(null)}
        />
      )}
    </div>
  );
}