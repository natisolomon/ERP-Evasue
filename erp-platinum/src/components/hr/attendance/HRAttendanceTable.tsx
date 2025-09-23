// src/components/hr/attendance/HRAttendanceTable.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Edit2 } from 'lucide-react';
import { HRStaff } from '@/lib/hrUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { EditAttendanceModal } from './modals/EditAttendanceModal';

interface HRAttendanceTableProps {
  staff: HRStaff[];
  date: string;
}

export function HRAttendanceTable({ staff, date }: HRAttendanceTableProps) {
  const { openModal, closeModal } = useModal();

  const handleEditAttendance = (member: HRStaff) => {
    openModal(<EditAttendanceModal staff={member} date={date} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Employee</th>
            <th className="text-left p-4 font-medium text-secondary">Department</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Check-in Time</th>
            <th className="text-left p-4 font-medium text-secondary">Check-out Time</th>
            <th className="text-left p-4 font-medium text-secondary">Hours Worked</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member, i) => (
            <motion.tr
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    {member.firstName} {member.lastName}
                    <div className="text-sm text-secondary">{member.position}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-primary">{member.department}</td>
              <td className="p-4">
                {member.attendance.late > 0 ? (
                  <span className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-status-warning/20 text-status-warning">
                    <AlertTriangle size={14} />
                    Late
                  </span>
                ) : member.attendance.absent > 0 ? (
                  <span className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-status-danger/20 text-status-danger">
                    <XCircle size={14} />
                    Absent
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-accent-success/20 text-accent-success">
                    <CheckCircle size={14} />
                    Present
                  </span>
                )}
              </td>
              <td className="p-4 text-primary">
                {member.attendance.present > 0 ? '09:15 AM' : '-'}
              </td>
              <td className="p-4 text-primary">
                {member.attendance.present > 0 ? '05:45 PM' : '-'}
              </td>
              <td className="p-4 text-primary font-medium">
                {member.attendance.present > 0 ? '8.5 hrs' : '-'}
              </td>
              <td className="p-4 text-right">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditAttendance(member)}
                  className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                >
                  <Edit2 size={16} />
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}