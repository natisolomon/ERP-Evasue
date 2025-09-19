// src/components/admin/inventory/InventoryFilters.tsx
'use client';

import { useState } from 'react';

interface InventoryFiltersProps {
  filters: {
    category: string;
    status: string;
    location: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string;
    status: string;
    location: string;
    search: string;
  }>>;
}

export function InventoryFilters({ filters, setFilters }: InventoryFiltersProps) {
  return (
    <div className="glass glass-hover rounded-3xl p-6 border-2 border-default mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/50 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/50 transition-all"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/50 transition-all"
          >
            <option value="all">All Locations</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2 text-secondary">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-surface-card border border-default rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/50 transition-all"
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