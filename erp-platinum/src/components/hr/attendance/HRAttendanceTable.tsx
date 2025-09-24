// src/components/hr/attendance/HRAttendanceTable.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { Staff } from '../../../store/staffSlice'; // ✅ Real Staff
import { Attendance } from '@/store/AttendanceSlice'; // ✅ Real Attendance
import { useModal } from '@/components/layout/ModalProvider';
import { EditAttendanceModal } from './modals/EditAttendanceModal';

interface HRAttendanceTableProps {
  staffList: Staff[];
  attendances: Attendance[];
  date: string; // e.g., "2024-06-15"
}

export function HRAttendanceTable({ staffList, attendances, date }: HRAttendanceTableProps) {
  const { openModal, closeModal } = useModal();

  // Helper: Get attendance for a staff member on this date
  const getAttendanceForStaff = (staffId: string) => {
    return attendances.find(att => 
      att.staffId === staffId && 
      att.date.split('T')[0] === date
    );
  };

  const handleEditAttendance = (staff: Staff) => {
    const attendance = getAttendanceForStaff(staff.id);
    openModal(
      <EditAttendanceModal 
        staff={staff} 
        attendance={attendance || null} 
        date={date} 
        onClose={closeModal} 
      />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Employee</th>
            <th className="text-left p-4 font-medium text-secondary">Department</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, i) => {
            const attendance = getAttendanceForStaff(staff.id);
            const isPresent = attendance ? attendance.isPresent : false;

            return (
              <motion.tr
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-default/50 hover:bg-surface-hover transition-colors"
              >
                <td className="p-4 font-medium text-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold">
                      {staff.firstName.charAt(0)}
                      {staff.lastName.charAt(0)}
                    </div>
                    <div>
                      {staff.firstName} {staff.lastName}
                      <div className="text-sm text-secondary">{staff.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-primary">{staff.department}</td>
                <td className="p-4">
                  {isPresent ? (
                    <span className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-accent-success/20 text-accent-success">
                      <CheckCircle size={14} />
                      Present
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-status-danger/20 text-status-danger">
                      <XCircle size={14} />
                      Absent
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditAttendance(staff)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}