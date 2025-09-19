// src/components/admin/finance/FinanceModal/AddTransactionModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd?: (transaction: any) => void;
}

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    type: 'income',
    amount: '',
    status: 'pending',
    paymentMethod: '',
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
    console.log('Add transaction:', formData);
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
        {/* ✅ Modal container — now with scroll support */}
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Add New Transaction
            </h2>
            <p className="text-secondary mt-2">Fill in the details for your new transaction</p>
          </div>

          {/* 👇 Scrollable Content */}
          <div className="flex-1 overflow-y-auto pr-2">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-secondary">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. Client Payment - Project Alpha"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Revenue, Payroll, Marketing"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Amount ($)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'completed' | 'failed' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Payment Method</label>
                  <input
                    type="text"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    placeholder="e.g. Bank Transfer, Credit Card"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* 👇 Fixed Footer */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Add Transaction
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