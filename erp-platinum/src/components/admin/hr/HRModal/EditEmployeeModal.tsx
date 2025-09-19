// src/components/admin/hr/HRModal/EditEmployeeModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Employee } from '@/lib/hrData';

interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

export function EditEmployeeModal({ employee, onClose }: EditEmployeeModalProps) {
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    department: employee.department,
    position: employee.position,
    hireDate: employee.hireDate,
    salary: employee.salary.toString(),
    status: employee.status,
    performanceRating: employee.performanceRating.toString(),
    lastReviewDate: employee.lastReviewDate,
    manager: employee.manager,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update employee:', { ...formData, salary: parseFloat(formData.salary), performanceRating: parseFloat(formData.performanceRating) });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Edit Employee
            </h2>
            <p className="text-secondary mt-2">Update the details for {employee.firstName} {employee.lastName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Hire Date</label>
                <input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Salary ($)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'on_leave' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Performance Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.performanceRating}
                  onChange={(e) => setFormData({ ...formData, performanceRating: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Last Review Date</label>
                <input
                  type="date"
                  value={formData.lastReviewDate}
                  onChange={(e) => setFormData({ ...formData, lastReviewDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Update Employee
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-secondary font-medium rounded-xl hover:bg-white/20 transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}