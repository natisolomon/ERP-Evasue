// src/components/admin/finance/FinanceTable.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Transaction } from '@/lib/financeConstant';

interface FinanceTableProps {
  transactions: Transaction[];
}

export function FinanceTable({ transactions }: FinanceTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

  const openModal = (type: 'view' | 'edit' | 'delete', transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalType(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-secondary">Date</th>
              <th className="text-left p-4 font-medium text-secondary">Description</th>
              <th className="text-left p-4 font-medium text-secondary">Category</th>
              <th className="text-left p-4 font-medium text-secondary">Type</th>
              <th className="text-left p-4 font-medium text-secondary">Amount</th>
              <th className="text-left p-4 font-medium text-secondary">Status</th>
              <th className="text-right p-4 font-medium text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-medium text-primary">{transaction.date}</td>
                <td className="p-4 text-primary">{transaction.description}</td>
                <td className="p-4 text-secondary">{transaction.category}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${transaction.type === 'income' ? 'bg-accent-success/20 text-accent-success' : 'bg-accent-pink/20 text-accent-pink'}
                  `}>
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="p-4 font-medium text-primary">
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      transaction.status === 'completed' ? 'bg-accent-success/20 text-accent-success' :
                      transaction.status === 'pending' ? 'bg-status-warning/20 text-status-warning' :
                      'bg-status-danger/20 text-status-danger'
                    }
                  `}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('view', transaction)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('edit', transaction)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('delete', transaction)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedTransaction && modalType === 'view' && (
        <ViewTransactionModal transaction={selectedTransaction} onClose={closeModal} />
      )}
      {selectedTransaction && modalType === 'edit' && (
        <EditTransactionModal transaction={selectedTransaction} onClose={closeModal} />
      )}
      {selectedTransaction && modalType === 'delete' && (
        <DeleteTransactionModal transaction={selectedTransaction} onClose={closeModal} />
      )}
    </>
  );
}

// Import modals at the bottom to avoid circular dependencies
import { ViewTransactionModal } from './financeModal/ViewTransactionModal';
import { EditTransactionModal } from './financeModal/EditTransactionModal';
import { DeleteTransactionModal } from './financeModal/DeleteTransactionModal';