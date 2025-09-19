// src/components/admin/finance/FinanceModal/AddPayrollModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, DollarSign, Calendar } from 'lucide-react';

interface AddPayrollModalProps {
  onClose: () => void;
}

export function AddPayrollModal({ onClose }: AddPayrollModalProps) {
  const [formData, setFormData] = useState({
    payrollPeriod: '',
    totalEmployees: '',
    totalAmount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: '',
  });

  // ✅ Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add payroll:', formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {/* ✅ Full-page backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        {/* ✅ Modal container with scroll */}
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
              Add Payroll
            </h2>
            <p className="text-secondary mt-2">Process payroll for your team</p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Payroll Period</label>
                  <input
                    type="text"
                    value={formData.payrollPeriod}
                    onChange={(e) => setFormData({ ...formData, payrollPeriod: e.target.value })}
                    placeholder="e.g. May 2024"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Payment Date</label>
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Total Employees</label>
                  <input
                    type="number"
                    value={formData.totalEmployees}
                    onChange={(e) => setFormData({ ...formData, totalEmployees: e.target.value })}
                    placeholder="e.g. 25"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Total Amount ($)</label>
                  <input
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    placeholder="e.g. 150000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'processing' | 'completed' | 'failed' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-secondary">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes about this payroll..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-purple/30 transition-all resize-none"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Process Payroll
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}