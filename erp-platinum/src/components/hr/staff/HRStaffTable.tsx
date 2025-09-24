// src/components/hr/staff/HRStaffTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Staff } from '../../../store/staffSlice'; // ✅ Use your Redux Staff type
import { useModal } from '@/components/layout/ModalProvider';
import { ViewStaffModal } from './modals/ViewStaffModal';
import { EditStaffModal } from './modals/EditStaffModal';
import { DeleteStaffModal } from './modals/DeleteStaffModal';

interface HRStaffTableProps {
  staff: Staff[]; // ✅ Now expects real backend Staff[]
}

export function HRStaffTable({ staff }: HRStaffTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (member: Staff) => {
    openModal(<ViewStaffModal staff={member} onClose={closeModal} />);
  };

  const handleEdit = (member: Staff) => {
    openModal(<EditStaffModal staff={member} onClose={closeModal} />);
  };

  const handleDelete = (member: Staff) => {
    openModal(<DeleteStaffModal staff={member} onClose={closeModal} />);
  };

  // Helper: Format date
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Name</th>
            <th className="text-left p-4 font-medium text-secondary">Email</th>
            <th className="text-left p-4 font-medium text-secondary">Phone</th>
            <th className="text-left p-4 font-medium text-secondary">Department</th>
            <th className="text-left p-4 font-medium text-secondary">Joined</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
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
                {member.firstName} {member.lastName}
              </td>
              <td className="p-4 text-secondary">{member.email}</td>
              <td className="p-4 text-primary">{member.phone || '—'}</td>
              <td className="p-4 text-primary">{member.department}</td>
              <td className="p-4 text-secondary">{formatDate(member.dateJoined)}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${
                    member.isActive
                      ? 'bg-accent-success/20 text-accent-success'
                      : 'bg-status-danger/20 text-status-danger'
                  }
                `}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
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