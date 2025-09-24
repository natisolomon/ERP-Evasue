// src/components/hr/leave-requests/HRLeaveRequestTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { LeaveRequest } from '@/store/LeaveRequestSlice';
import { Staff } from '../../../store/staffSlice';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewLeaveRequestModal } from './modals/ViewLeaveRequestModal';
import { EditLeaveRequestModal } from './modals/EditLeaveRequestModal';
import { DeleteLeaveRequestModal } from './modals/DeleteLeaveRequestModal';

interface HRLeaveRequestTableProps {
  requests: LeaveRequest[];
  staff: Staff[];
}

export function HRLeaveRequestTable({ requests, staff }: HRLeaveRequestTableProps) {
  const { openModal, closeModal } = useModal();

  const getStaffName = (staffId: string) => {
    const member = staff.find(s => s.id === staffId);
    return member ? `${member.firstName} ${member.lastName}` : 'Unknown Staff';
  };

  const handleView = (request: LeaveRequest) => {
    const staffMember = staff.find(s => s.id === request.staffId) || ({} as Staff);
    openModal(<ViewLeaveRequestModal request={request} staff={staffMember} onClose={closeModal} />);
  };

  const handleEdit = (request: LeaveRequest) => {
    const staffMember = staff.find(s => s.id === request.staffId) || ({} as Staff);
    openModal(<EditLeaveRequestModal request={request} staff={staffMember} onClose={closeModal} />);
  };

  const handleDelete = (request: LeaveRequest) => {
    const staffMember = staff.find(s => s.id === request.staffId) || ({} as Staff);
    openModal(<DeleteLeaveRequestModal request={request} staff={staffMember} onClose={closeModal} />);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-accent-success/20 text-accent-success';
      case 'Rejected': return 'bg-status-danger/20 text-status-danger';
      case 'Pending': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
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
            <th className="text-left p-4 font-medium text-secondary">Dates</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Reason</th>
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
                {getStaffName(request.staffId)}
              </td>
              <td className="p-4 text-primary">
                <div>{formatDate(request.startDate)}</div>
                <div>→ {formatDate(request.endDate)}</div>
              </td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${getStatusColor(request.status)}
                `}>
                  {request.status}
                </span>
              </td>
              <td className="p-4 text-primary max-w-xs truncate">
                {request.reason}
              </td>
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