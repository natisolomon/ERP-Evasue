// src/components/admin/finance/FinanceFilters.tsx
'use client';

import { useState } from 'react';

interface FinanceFiltersProps {
  filters: {
    type: string;
    status: string;
    category: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: string;
    status: string;
    category: string;
    search: string;
  }>>;
}

export function FinanceFilters({ filters, setFilters }: FinanceFiltersProps) {
  return (
    <div className="glass rounded-3xl p-6 border border-white/10 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Revenue">Revenue</option>
            <option value="Payroll">Payroll</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Marketing">Marketing</option>
            <option value="Overhead">Overhead</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2 text-secondary">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}