// src/components/admin/hr/HRFilters.tsx
'use client';

import { useState } from 'react';

interface HRFiltersProps {
  filters: {
    department: string;
    status: string;
    position: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    department: string;
    status: string;
    position: string;
    search: string;
  }>>;
}

export function HRFilters({ filters, setFilters }: HRFiltersProps) {
  return (
    <div className="glass rounded-3xl p-6 border border-white/10 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Department</label>
          <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Position</label>
          <input
            type="text"
            value={filters.position}
            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
            placeholder="e.g. Engineer, Manager"
            className="w-full px-4 py-3 bg-surface-card border border-white/20 rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2 text-secondary">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
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