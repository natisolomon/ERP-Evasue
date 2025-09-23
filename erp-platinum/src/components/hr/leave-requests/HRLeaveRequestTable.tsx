// src/components/hr/leave-requests/HRLeaveRequestTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { HRLeaveRequest } from '@/lib/hrUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewLeaveRequestModal } from './modals/ViewLeaveRequestModal';
import { EditLeaveRequestModal } from './modals/EditLeaveRequestModal';
import { DeleteLeaveRequestModal } from './modals/DeleteLeaveRequestModal';

interface HRLeaveRequestTableProps {
  requests: HRLeaveRequest[];
}

export function HRLeaveRequestTable({ requests }: HRLeaveRequestTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (request: HRLeaveRequest) => {
    openModal(<ViewLeaveRequestModal request={request} onClose={closeModal} />);
  };

  const handleEdit = (request: HRLeaveRequest) => {
    openModal(<EditLeaveRequestModal request={request} onClose={closeModal} />);
  };

  const handleDelete = (request: HRLeaveRequest) => {
    openModal(<DeleteLeaveRequestModal request={request} onClose={closeModal} />);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-accent-cyan/20 text-accent-cyan';
      case 'sick': return 'bg-accent-pink/20 text-accent-pink';
      case 'personal': return 'bg-accent-purple/20 text-accent-purple';
      case 'unpaid': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-accent-success/20 text-accent-success';
      case 'rejected': return 'bg-status-danger/20 text-status-danger';
      case 'pending': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Staff Member</th>
            <th className="text-left p-4 font-medium text-secondary">Type</th>
            <th className="text-left p-4 font-medium text-secondary">Dates</th>
            <th className="text-left p-4 font-medium text-secondary">Days</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Submitted</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, i) => (
            <motion.tr
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">
                {request.staffName}
                <div className="text-sm text-secondary">{request.submittedDate}</div>
              </td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${getTypeColor(request.type)}
                `}>
                  {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                </span>
              </td>
              <td className="p-4 text-primary">
                <div>{request.startDate}</div>
                <div>→ {request.endDate}</div>
              </td>
              <td className="p-4 font-medium text-primary">{request.days} days</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${getStatusColor(request.status)}
                `}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </td>
              <td className="p-4 text-primary">{request.submittedDate}</td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(request)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(request)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(request)}
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