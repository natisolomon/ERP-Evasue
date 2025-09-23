// src/app/hr/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HROnboardingTable } from '@/components/hr/onboarding/HROnboardingTable';
import { HROnboardingFilters } from '@/components/hr/onboarding/HROnboardingFilters';
import { StartOnboardingModal } from '@/components/hr/onboarding/modals/StartOnboardingModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockOnboarding, mockStaff } from '@/lib/hrUserData';

export default function HROnboardingPage() {
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    search: '',
  });

  const [onboarding, setOnboarding] = useState(mockOnboarding);

  const filteredOnboarding = onboarding.filter(item => {
    const staff = mockStaff.find(s => s.id === item.staffId);
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.department !== 'all' && staff && staff.department !== filters.department) return false;
    if (filters.search && !item.staffName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleStartOnboarding = (newOnboarding: any) => {
    setOnboarding(prev => [newOnboarding, ...prev]);
  };

  const handleOpenStartModal = () => {
    openModal(
      <StartOnboardingModal
        onClose={closeModal}
        onStart={handleStartOnboarding}
      />
    );
  };

  // Calculate stats
  const totalOnboarding = onboarding.length;
  const pendingOnboarding = onboarding.filter(o => o.status === 'pending').length;
  const inProgressOnboarding = onboarding.filter(o => o.status === 'in_progress').length;
  const completedOnboarding = onboarding.filter(o => o.status === 'completed').length;

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
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{totalOnboarding}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-status-warning/10 text-status-warning"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Pending</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{pendingOnboarding}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-purple/10 text-accent-purple"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">In Progress</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{inProgressOnboarding}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass rounded-3xl p-6 border border-default transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-1 bg-accent-success/10 text-accent-success"
        >
          <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Completed</h3>
          <div className="relative h-8">
            <p className="text-3xl font-extrabold">{completedOnboarding}</p>
          </div>
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
            onClick={handleOpenStartModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Start Onboarding
          </motion.button>
        </div>
        <HROnboardingTable onboarding={filteredOnboarding} />
      </div>
    </div>
  );
}