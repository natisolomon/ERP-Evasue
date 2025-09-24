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
import { HRAttendanceChart } from '@/components/hr/attendance/HRAttendanceChart';
import { RecordAttendanceModal } from '@/components/hr/attendance/modals/RecordAttendanceModal';
import { useModal } from '@/components/layout/ModalProvider';

export default function HRAttendancePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, loading: staffLoading } = useSelector((state: RootState) => state.staff);
  const { records: attendances, loading: attendanceLoading } = useSelector((state: RootState) => state.attendance);

  const [filters, setFilters] = useState({
    department: 'all',
    date: new Date().toISOString().split('T')[0],
    search: '',
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchAttendance());
  }, [dispatch]);

  // Filter staff (no status filter — backend doesn't have it)
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

  // ✅ Calculate stats from REAL attendance data
  const todayAttendances = attendances.filter(att => 
    att.date.split('T')[0] === filters.date
  );

  const presentToday = todayAttendances.filter(att => att.isPresent).length;
  const absentToday = todayAttendances.filter(att => !att.isPresent).length;
  const totalStaff = filteredStaff.length;
  const attendanceRate = totalStaff > 0 ? ((presentToday / totalStaff) * 100).toFixed(1) : '0.0';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-cyan/10 text-accent-cyan"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Total Staff</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{totalStaff}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Present Today</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{presentToday}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Late Today</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">0</p> {/* ❌ No 'late' in backend */}
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-danger/10 text-status-danger"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Absent Today</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{absentToday}</p>
          </div>
        </motion.div>
      </div>

      {/* Attendance Rate */}

      {/* Chart */}
      <div className="glass rounded-3xl p-6 border border-default mb-10">
        <h3 className="text-lg font-bold mb-6">Attendance Trend </h3>
        <HRAttendanceChart />
      </div>

      {/* Filters */}
      <HRAttendanceFilters filters={filters} setFilters={setFilters} />

      {/* Attendance Table */}
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
    </div>
  );
}