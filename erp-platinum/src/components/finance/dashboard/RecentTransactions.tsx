// src/components/finance/dashboard/RecentTransactions.tsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'Client Payment - Project Alpha',
    amount: 15000,
    status: 'completed',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'expense',
    description: 'Office Rent - May 2024',
    amount: 5000,
    status: 'completed',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'income',
    description: 'Consulting Fee - Beta Corp',
    amount: 8500,
    status: 'pending',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'expense',
    description: 'Software Subscription',
    amount: 299,
    status: 'failed',
    time: '1 day ago',
  },
];

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((txn) => (
        <motion.div
          key={txn.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3 p-3 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors"
        >
          <div className={`p-2 rounded-lg ${
            txn.type === 'income' ? 'bg-accent-cyan/20' : 'bg-accent-pink/20'
          }`}>
            <DollarSign size={16} className={
              txn.type === 'income' ? 'text-accent-cyan' : 'text-accent-pink'
            } />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-primary">{txn.description}</p>
              <span className={`
                text-sm font-bold
                ${txn.type === 'income' ? 'text-accent-cyan' : 'text-accent-pink'}
              `}>
                {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${
                  txn.status === 'completed' ? 'bg-accent-success/20 text-accent-success' :
                  txn.status === 'pending' ? 'bg-status-warning/20 text-status-warning' :
                  'bg-status-danger/20 text-status-danger'
                }
              `}>
                {txn.status}
              </span>
              <span className="text-xs text-secondary">{txn.time}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}