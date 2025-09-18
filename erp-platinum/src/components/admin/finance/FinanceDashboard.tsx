// src/components/admin/finance/FinanceDashboard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FinanceStatCard } from '@/components/admin/finance/FinanceStatCard';
import { FinanceChart } from './FinanceChart';
import { FinanceTable } from './FinanceTable';
import { FinanceFilters } from './FinanceFilters';
import { mockTransactions, expenseCategories, revenueTrend, expenseTrend } from '@/lib/financeConstant';

export function FinanceDashboard() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    category: 'all',
    search: '',
  });

  const filteredTransactions = mockTransactions.filter(txn => {
    if (filters.type !== 'all' && txn.type !== filters.type) return false;
    if (filters.status !== 'all' && txn.status !== filters.status) return false;
    if (filters.category !== 'all' && txn.category !== filters.category) return false;
    if (filters.search && !txn.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <p className="text-secondary mt-2">Manage revenue, expenses, and financial health.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <FinanceStatCard
          title="Monthly Revenue"
          value="$48,200"
          trend="+18.2%"
          icon="DollarSign"
          variant="cyan"
        />
        <FinanceStatCard
          title="Monthly Expenses"
          value="$28,400"
          trend="+5.7%"
          icon="TrendingDown"
          variant="pink"
        />
        <FinanceStatCard
          title="Profit Margin"
          value="41.2%"
          trend="+3.1%"
          icon="BarChart3"
          variant="green"
        />
        <FinanceStatCard
          title="Pending Invoices"
          value="$12,800"
          trend="+2"
          icon="FileText"
          variant="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Revenue vs Expenses */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-6">Revenue vs Expenses</h3>
          <FinanceChart
            data={[
              { name: 'Revenue', data: revenueTrend, color: 'cyan' },
              { name: 'Expenses', data: expenseTrend, color: 'pink' },
            ]}
            height={300}
          />
        </div>

        {/* Expense Categories */}
        <div className="glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-6">Expense Categories</h3>
          <div className="space-y-4">
            {expenseCategories.map((category, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <span className="text-primary">{category.name}</span>
                </div>
                <span className="text-secondary font-medium">{category.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 h-32 flex items-end justify-between">
            {expenseCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${category.value}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`w-full max-w-8 rounded-t-xl ${category.color} mx-0.5`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <FinanceFilters filters={filters} setFilters={setFilters} />

      {/* Transactions Table */}
      <div className="glass rounded-3xl p-6 border border-white/10 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Transaction
          </motion.button>
        </div>
        <FinanceTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}