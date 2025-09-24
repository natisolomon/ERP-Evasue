// src/app/hr/onboarding/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchStaff } from '@/store/staffSlice';
import { fetchOnboardings } from '@/store/OnboardingSlice';
import { HROnboardingTable } from '@/components/hr/onboarding/HROnboardingTable';
import { HROnboardingFilters } from '@/components/hr/onboarding/HROnboardingFilters';
import { StartOnboardingModal } from '@/components/hr/onboarding/modals/StartOnboardingModal';
import { useModal } from '@/components/layout/ModalProvider';

export default function HROnboardingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff } = useSelector((state: RootState) => state.staff);
  const { onboardings, loading } = useSelector((state: RootState) => state.onboarding);

  const [filters, setFilters] = useState({
    staffId: 'all',
    startDate: 'all',
    checklistStatus: 'all',
  });

  useEffect(() => {
    dispatch(fetchStaff());
    dispatch(fetchOnboardings());
  }, [dispatch]);

  const filteredOnboarding = useMemo(() => {
    return onboardings.filter(item => {
      const staffMember = staff.find(s => s.id === item.staffId);
      
      if (filters.staffId !== 'all' && item.checklistStatus !== filters.startDate) 
        return false;
      
      return true;
    });
  }, [onboardings, staff, filters]);

  const { openModal, closeModal } = useModal();

  // ✅ Stats from real data
  const totalOnboarding = onboardings.length;
  const pendingOnboarding = onboardings.filter(o => o.checklistStatus === 'Not Started').length;
  const inProgressOnboarding = onboardings.filter(o => o.checklistStatus === 'In Progress').length;
  const completedOnboarding = onboardings.filter(o => o.checklistStatus === 'Completed').length;

  if (loading && onboardings.length === 0) {
    return <div className="p-8">Loading onboarding data...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Onboarding
        </h1>
        <p className="text-secondary mt-2">Manage new staff onboarding process</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-cyan/10 text-accent-cyan"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Total Onboarding</h3>
          <p className="text-3xl font-extrabold">{totalOnboarding}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Pending</h3>
          <p className="text-3xl font-extrabold">{pendingOnboarding}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-purple/10 text-accent-purple"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">In Progress</h3>
          <p className="text-3xl font-extrabold">{inProgressOnboarding}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Completed</h3>
          <p className="text-3xl font-extrabold">{completedOnboarding}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <HROnboardingFilters filters={filters} setFilters={setFilters} />

      {/* Onboarding Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Onboarding Management</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(<StartOnboardingModal onClose={closeModal} />)}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Start Onboarding
          </motion.button>
        </div>
        <HROnboardingTable onboarding={filteredOnboarding} staff={staff} />
      </div>
    </div>
  );
}