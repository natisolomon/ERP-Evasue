// src/app/hr/leave-requests/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchStaff } from '../../../store/staffSlice';
import { fetchLeaveRequests } from '@/store/LeaveRequestSlice'; // ✅ Use your existing slice
import { HRLeaveRequestTable } from '@/components/hr/leave-requests/HRLeaveRequestTable';
import { HRLeaveRequestFilters } from '@/components/hr/leave-requests/HRLeaveRequestFilters';
import { CreateLeaveRequestModal } from '@/components/hr/leave-requests/modals/CreateLeaveRequestModal';
import { useModal } from '@/components/layout/ModalProvider';

export default function HRLeaveRequestsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff } = useSelector((state: RootState) => state.staff);
  const { requests: leaveRequests, loading } = useSelector((state: RootState) => state.leaveRequest); // ✅ matches slice name

  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    search: '',
  });

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchLeaveRequests());
  }, [dispatch]);

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(request => {
      const staffMember = staff.find(s => s.id === request.staffId);
      
      // Filter by department
      if (filters.department !== 'all' && staffMember?.department !== filters.department) 
        return false;
      
      // Filter by status
      if (
        filters.status !== 'all' && 
        String(request.status).toLowerCase() !== filters.status
      )
      return false;
      
      // Search by staff name
      if (filters.search) {
        const name = staffMember 
          ? `${staffMember.firstName} ${staffMember.lastName}`.toLowerCase()
          : '';
        if (!name.includes(filters.search.toLowerCase())) 
          return false;
      }
      
      return true;
    });
  }, [leaveRequests, staff, filters]);

  const { openModal, closeModal } = useModal();

  // ✅ Stats from real data
  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'Pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'Rejected').length;

  if (loading && leaveRequests.length === 0) {
    return <div className="p-8">Loading leave requests...</div>;
  }

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
          <p className="text-3xl font-extrabold">{totalRequests}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Pending</h3>
          <p className="text-3xl font-extrabold">{pendingRequests}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Approved</h3>
          <p className="text-3xl font-extrabold">{approvedRequests}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-danger/10 text-status-danger"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Rejected</h3>
          <p className="text-3xl font-extrabold">{rejectedRequests}</p>
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
            onClick={() => openModal(<CreateLeaveRequestModal onClose={closeModal} />)}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Create Request
          </motion.button>
        </div>
        <HRLeaveRequestTable requests={filteredRequests} staff={staff} />
      </div>
    </div>
  );
}