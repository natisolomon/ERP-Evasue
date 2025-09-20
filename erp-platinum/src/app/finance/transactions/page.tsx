// src/app/finance/transactions/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FinanceTransactionTable } from '@/components/finance/transactions/FinanceTransactionTable';
import { FinanceTransactionFilters } from '@/components/finance/transactions/FinanceTransactionFilters';
import { AddTransactionModal } from '@/components/finance/transactions/modals/AddTransactionModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockTransactions } from '@/lib/financeUserData';

export default function FinanceTransactionsPage() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    category: 'all',
    search: '',
  });

  const [transactions, setTransactions] = useState(mockTransactions);

  const filteredTransactions = transactions.filter(txn => {
    if (filters.type !== 'all' && txn.type !== filters.type) return false;
    if (filters.status !== 'all' && txn.status !== filters.status) return false;
    if (filters.category !== 'all' && txn.category !== filters.category) return false;
    if (filters.search && !txn.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleAddTransaction = (newTransaction: any) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleOpenAddModal = () => {
    openModal(
      <AddTransactionModal
        onClose={closeModal}
        onAdd={handleAddTransaction}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          Transactions
        </h1>
        <p className="text-secondary mt-2">Manage your financial transactions</p>
      </div>

      {/* Filters */}
      <FinanceTransactionFilters filters={filters} setFilters={setFilters} />

      {/* Transactions Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Transaction History</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Transaction
          </motion.button>
        </div>
        <FinanceTransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}