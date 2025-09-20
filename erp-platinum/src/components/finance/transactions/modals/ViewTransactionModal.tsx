// src/components/finance/transactions/FinanceTransactionModal/ViewTransactionModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Tag, CreditCard } from 'lucide-react';
import { FinanceTransaction } from '@/lib/financeUserData';

interface ViewTransactionModalProps {
  transaction: FinanceTransaction;
  onClose: () => void;
}

export function ViewTransactionModal({ transaction, onClose }: ViewTransactionModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-pink to-accent-cyan rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-transparent">
              Transaction Details
            </h2>
            <p className="text-secondary mt-2">View all details for this transaction</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="text-accent-pink" size={20} />
                      <h3 className="font-semibold text-primary">Amount</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-accent-cyan" size={20} />
                      <h3 className="font-semibold text-primary">Date</h3>
                    </div>
                    <p className="text-xl font-medium text-primary">{transaction.date}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="text-status-warning" size={20} />
                      <h3 className="font-semibold text-primary">Payment Method</h3>
                    </div>
                    <p className="text-primary">{transaction.paymentMethod}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Tag className="text-accent-purple" size={20} />
                      <h3 className="font-semibold text-primary">Category</h3>
                    </div>
                    <p className="text-primary">{transaction.category}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-accent-pink to-accent-cyan"></span>
                      <h3 className="font-semibold text-primary">Type</h3>
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${
                        transaction.type === 'income'
                          ? 'bg-accent-cyan/20 text-accent-cyan'
                          : 'bg-accent-pink/20 text-accent-pink'
                      }
                    `}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-status-warning to-status-danger"></span>
                      <h3 className="font-semibold text-primary">Status</h3>
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${
                        transaction.status === 'completed'
                          ? 'bg-accent-success/20 text-accent-success'
                          : transaction.status === 'pending'
                          ? 'bg-status-warning/20 text-status-warning'
                          : 'bg-status-danger/20 text-status-danger'
                      }
                    `}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-semibold text-primary mb-3">Description</h3>
                <p className="text-primary leading-relaxed text-lg">{transaction.description}</p>
              </div>

              {/* Reference */}
              <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-semibold text-primary mb-3">Reference</h3>
                <p className="text-primary text-lg font-mono">{transaction.reference}</p>
              </div>
            </div>
          

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}