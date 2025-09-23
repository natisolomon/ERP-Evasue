// src/app/hr/attendance/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HRAttendanceTable } from '@/components/hr/attendance/HRAttendanceTable';
import { HRAttendanceFilters } from '@/components/hr/attendance/HRAttendanceFilters';
import { HRAttendanceChart } from '@/components/hr/attendance/HRAttendanceChart';
import { RecordAttendanceModal } from '@/components/hr/attendance/modals/RecordAttendanceModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockStaff } from '@/lib/hrUserData';

export default function HRAttendancePage() {
  const [filters, setFilters] = useState({
    department: 'all',
    date: new Date().toISOString().split('T')[0],
    status: 'all',
    search: '',
  });

  const [staff, setStaff] = useState(mockStaff);

  const filteredStaff = staff.filter(member => {
    if (filters.department !== 'all' && member.department !== filters.department) return false;
    if (filters.status !== 'all' && member.status !== filters.status) return false;
    if (filters.search && !member.firstName.toLowerCase().includes(filters.search.toLowerCase()) && !member.lastName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleRecordAttendance = (attendanceData: any) => {
    console.log('Record attendance:', attendanceData);
    // In a real app, you would update your state or API here
  };

  const handleOpenRecordModal = () => {
    openModal(
      <RecordAttendanceModal
        onClose={closeModal}
        onRecord={handleRecordAttendance}
      />
    );
  };

  // Calculate attendance stats
  const totalStaff = staff.length;
  const presentToday = staff.filter(s => s.attendance.present > 0).length;
  const absentToday = staff.filter(s => s.attendance.absent > 0).length;
  const lateToday = staff.filter(s => s.attendance.late > 0).length;
  const attendanceRate = ((presentToday / totalStaff) * 100).toFixed(1);

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
            <p className="text-3xl font-extrabold">{lateToday}</p>
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
      <div className="glass rounded-3xl p-6 border border-default mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Today's Attendance Rate</h3>
            <p className="text-secondary">Percentage of staff present today</p>
          </div>
          <div className="text-4xl font-bold text-accent-cyan">{attendanceRate}%</div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-4 mt-4">
          <div 
            className="bg-accent-cyan h-4 rounded-full transition-all duration-500" 
            style={{ width: `${attendanceRate}%` }}
          ></div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass rounded-3xl p-6 border border-default mb-10">
        <h3 className="text-lg font-bold mb-6">Attendance Trend (Last 6 Months)</h3>
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
            onClick={handleOpenRecordModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Record Attendance
          </motion.button>
        </div>
        <HRAttendanceTable staff={filteredStaff} date={filters.date} />
      </div>
    </div>
  );
}