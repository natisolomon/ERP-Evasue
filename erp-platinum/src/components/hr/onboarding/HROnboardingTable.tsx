// src/components/hr/onboarding/HROnboardingTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, GraduationCap, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { HROnboarding } from '@/lib/hrUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewOnboardingModal } from './modals/ViewOnboardingModal';
import { EditOnboardingModal } from './modals/EditOnboardingModal';
import { DeleteOnboardingModal } from './modals/DeleteOnboardingModal';

interface HROnboardingTableProps {
  onboarding: HROnboarding[];
}

export function HROnboardingTable({ onboarding }: HROnboardingTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (item: HROnboarding) => {
    openModal(<ViewOnboardingModal onboarding={item} onClose={closeModal} />);
  };

  const handleEdit = (item: HROnboarding) => {
    openModal(<EditOnboardingModal onboarding={item} onClose={closeModal} />);
  };

  const handleDelete = (item: HROnboarding) => {
    openModal(<DeleteOnboardingModal onboarding={item} onClose={closeModal} />);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent-success/20 text-accent-success';
      case 'in_progress': return 'bg-accent-purple/20 text-accent-purple';
      case 'pending': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-accent-success" />;
      case 'in_progress': return <Clock size={16} className="text-accent-purple" />;
      case 'pending': return <AlertTriangle size={16} className="text-status-warning" />;
      default: return null;
    }
  };

  const calculateProgress = (tasks: { completed: boolean }[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Staff Member</th>
            <th className="text-left p-4 font-medium text-secondary">Start Date</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Progress</th>
            <th className="text-left p-4 font-medium text-secondary">Tasks</th>
            <th className="text-left p-4 font-medium text-secondary">Documents</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {onboarding.map((item, i) => {
            const progress = calculateProgress(item.tasks);
            return (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-default/50 hover:bg-surface-hover transition-colors"
              >
                <td className="p-4 font-medium text-primary">
                  {item.staffName}
                  <div className="text-sm text-secondary">{item.startDate}</div>
                </td>
                <td className="p-4 text-primary">{item.startDate}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                    ${getStatusColor(item.status)}
                  `}>
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-20 bg-white/10 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-secondary mt-1">{progress}%</div>
                </td>
                <td className="p-4 text-primary">
                  {item.tasks.filter(t => t.completed).length}/{item.tasks.length} completed
                </td>
                <td className="p-4 text-primary">
                  {item.documents.length} documents
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}