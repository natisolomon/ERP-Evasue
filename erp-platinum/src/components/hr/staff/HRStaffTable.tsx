// src/components/hr/staff/HRStaffTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, User } from 'lucide-react';
import { HRStaff } from '@/lib/hrUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewStaffModal } from './modals/ViewStaffModal';
import { EditStaffModal } from './modals/EditStaffModal';
import { DeleteStaffModal } from './modals/DeleteStaffModal';

interface HRStaffTableProps {
  staff: HRStaff[];
}

export function HRStaffTable({ staff }: HRStaffTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (member: HRStaff) => {
    openModal(<ViewStaffModal staff={member} onClose={closeModal} />);
  };

  const handleEdit = (member: HRStaff) => {
    openModal(<EditStaffModal staff={member} onClose={closeModal} />);
  };

  const handleDelete = (member: HRStaff) => {
    openModal(<DeleteStaffModal staff={member} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Employee</th>
            <th className="text-left p-4 font-medium text-secondary">Department</th>
            <th className="text-left p-4 font-medium text-secondary">Position</th>
            <th className="text-left p-4 font-medium text-secondary">Salary</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Performance</th>
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
                    <div className="text-sm text-secondary">{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-primary">{member.department}</td>
              <td className="p-4 text-secondary">{member.position}</td>
              <td className="p-4 font-medium text-primary">${member.salary.toLocaleString()}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${
                    member.status === 'active'
                      ? 'bg-accent-success/20 text-accent-success'
                      : member.status === 'on_leave'
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-status-danger/20 text-status-danger'
                  }
                `}>
                  {member.status.replace('_', ' ').charAt(0).toUpperCase() + member.status.replace('_', ' ').slice(1)}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(member.performanceRating)
                          ? 'bg-accent-cyan'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                  <span className="text-secondary text-sm ml-2">
                    {member.performanceRating.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(member)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(member)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(member)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}