// src/app/hr/leave-requests/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HRLeaveRequestTable } from '@/components/hr/leave-requests/HRLeaveRequestTable';
import { HRLeaveRequestFilters } from '@/components/hr/leave-requests/HRLeaveRequestFilters';
import { CreateLeaveRequestModal } from '@/components/hr/leave-requests/modals/CreateLeaveRequestModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockLeaveRequests, mockStaff } from '@/lib/hrUserData';

export default function HRLeaveRequestsPage() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    department: 'all',
    search: '',
  });

  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);

  const filteredRequests = leaveRequests.filter(request => {
    const staff = mockStaff.find(s => s.id === request.staffId);
    if (filters.type !== 'all' && request.type !== filters.type) return false;
    if (filters.status !== 'all' && request.status !== filters.status) return false;
    if (filters.department !== 'all' && staff && staff.department !== filters.department) return false;
    if (filters.search && !request.staffName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleCreateRequest = (newRequest: any) => {
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  const handleOpenCreateModal = () => {
    openModal(
      <CreateLeaveRequestModal
        onClose={closeModal}
        onCreate={handleCreateRequest}
      />
    );
  };

  // Calculate stats
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'rejected').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Leave Requests
        </h1>
        <p className="text-secondary mt-2">Manage and approve staff leave requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-cyan/10 text-accent-cyan"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Total Requests</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{totalRequests}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Pending</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{pendingRequests}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Approved</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{approvedRequests}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-danger/10 text-status-danger"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Rejected</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{rejectedRequests}</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <HRLeaveRequestFilters filters={filters} setFilters={setFilters} />

      {/* Leave Requests Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Leave Request Management</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Create Request
          </motion.button>
        </div>
        <HRLeaveRequestTable requests={filteredRequests} />
      </div>
    </div>
  );
}