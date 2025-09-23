// src/app/hr/staff/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HRStaffTable } from '@/components/hr/staff/HRStaffTable';
import { HRStaffFilters } from '@/components/hr/staff/HRStaffFilters';
import { AddStaffModal } from '@/components/hr/staff/modals/AddStaffModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockStaff } from '@/lib/hrUserData';

export default function HRStaffPage() {
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    position: 'all',
    search: '',
  });

  const [staff, setStaff] = useState(mockStaff);

  const filteredStaff = staff.filter(member => {
    if (filters.department !== 'all' && member.department !== filters.department) return false;
    if (filters.status !== 'all' && member.status !== filters.status) return false;
    if (filters.position !== 'all' && !member.position.toLowerCase().includes(filters.position.toLowerCase())) return false;
    if (filters.search && !member.firstName.toLowerCase().includes(filters.search.toLowerCase()) && !member.lastName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleAddStaff = (newStaff: any) => {
    setStaff(prev => [newStaff, ...prev]);
  };

  const handleOpenAddModal = () => {
    openModal(
      <AddStaffModal
        onClose={closeModal}
        onAdd={handleAddStaff}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Staff Management
        </h1>
        <p className="text-secondary mt-2">Manage your team members and their information</p>
      </div>

      {/* Filters */}
      <HRStaffFilters filters={filters} setFilters={setFilters} />

      {/* Staff Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Staff Directory</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Staff
          </motion.button>
        </div>
        <HRStaffTable staff={filteredStaff} />
      </div>
    </div>
  );
}