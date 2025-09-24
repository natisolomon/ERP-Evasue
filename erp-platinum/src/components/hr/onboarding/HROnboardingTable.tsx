// src/components/hr/onboarding/HROnboardingTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Onboarding } from '@/store/OnboardingSlice'; // ✅ Real Onboarding
import { Staff } from '@/store/staffSlice'; // ✅ Real Staff
import { useModal } from '@/components/layout/ModalProvider';
import { ViewOnboardingModal } from './modals/ViewOnboardingModal';
import { EditOnboardingModal } from './modals/EditOnboardingModal';
import { DeleteOnboardingModal } from './modals/DeleteOnboardingModal';

interface HROnboardingTableProps {
  onboarding: Onboarding[];
  staff: Staff[]; // ✅ For staff name lookup
}

export function HROnboardingTable({ onboarding, staff }: HROnboardingTableProps) {
  const { openModal, closeModal } = useModal();

  const getStaffName = (staffId: string) => {
    const member = staff.find(s => s.id === staffId);
    return member ? `${member.firstName} ${member.lastName}` : 'Unknown Staff';
  };

  const handleView = (item: Onboarding) => {
    const staffMember = staff.find(s => s.id === item.staffId) || ({} as Staff);
    openModal(<ViewOnboardingModal onboarding={item} staff={staffMember} onClose={closeModal} />);
  };

  const handleEdit = (item: Onboarding) => {
    const staffMember = staff.find(s => s.id === item.staffId) || ({} as Staff);
    openModal(<EditOnboardingModal onboarding={item} staff={staffMember} onClose={closeModal} />);
  };

  const handleDelete = (item: Onboarding) => {
  const staffMember = staff.find(s => s.id === item.staffId) || ({} as Staff);
  openModal(<DeleteOnboardingModal onboarding={item} staff={staffMember} onClose={closeModal} />);
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-accent-success/20 text-accent-success';
      case 'In Progress': return 'bg-accent-purple/20 text-accent-purple';
      case 'Not Started': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-accent-success" />;
      case 'In Progress': return <Clock size={16} className="text-accent-purple" />;
      case 'Not Started': return <AlertTriangle size={16} className="text-status-warning" />;
      default: return null;
    }
  };

  // Format date: "2024-06-15T00:00:00" → "Jun 15, 2024"
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Staff Member</th>
            <th className="text-left p-4 font-medium text-secondary">Start Date</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {onboarding.map((item, i) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">
                {getStaffName(item.staffId)}
              </td>
              <td className="p-4 text-primary">{formatDate(item.startDate)}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                  ${getStatusColor(item.checklistStatus)}
                `}>
                  {getStatusIcon(item.checklistStatus)}
                  {item.checklistStatus}
                </span>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(item)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(item)}
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