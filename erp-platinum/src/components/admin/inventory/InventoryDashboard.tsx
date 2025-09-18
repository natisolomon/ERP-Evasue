// src/components/admin/inventory/InventoryDashboard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InventoryStatCard } from './InventoryStatCard';
import { InventoryChart } from './InventoryChart';
import { InventoryTable } from './InventoryTable';
import { InventoryFilters } from './InventoryFilters';
import { mockProducts, categoryDistribution, stockTrend, valueTrend } from '@/lib/inventoryData';

export function InventoryDashboard() {
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    location: 'all',
    search: '',
  });

  const filteredProducts = mockProducts.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.status !== 'all' && product.status !== filters.status) return false;
    if (filters.location !== 'all' && !product.location.includes(filters.location)) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Inventory Dashboard
        </h1>
        <p className="text-secondary mt-2">Manage stock levels, suppliers, and warehouse operations.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <InventoryStatCard
          title="Total Products"
          value="8,420"
          trend="+142"
          icon="Boxes"
          variant="cyan"
        />
        <InventoryStatCard
          title="Low Stock Items"
          value="24"
          trend="+3"
          icon="AlertTriangle"
          variant="amber"
        />
        <InventoryStatCard
          title="Total Value"
          value="$482K"
          trend="+18.2%"
          icon="DollarSign"
          variant="green"
        />
        <InventoryStatCard
          title="Avg. Turnover"
          value="4.2x"
          trend="+0.8x"
          icon="RefreshCw"
          variant="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Stock vs Value */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-6">Stock Levels vs Inventory Value</h3>
          <InventoryChart
            data={[
              { name: 'Stock Units', data: stockTrend, color: 'cyan' },
              { name: 'Inventory Value', data: valueTrend, color: 'green' },
            ]}
            height={300}
          />
        </div>

        {/* Category Distribution */}
        <div className="glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-6">Product Categories</h3>
          <div className="space-y-4">
            {categoryDistribution.map((category, i) => (
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
            {categoryDistribution.map((category, i) => (
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
      <InventoryFilters filters={filters} setFilters={setFilters} />

      {/* Products Table */}
      <div className="glass rounded-3xl p-6 border border-white/10 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Product Inventory</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Product
          </motion.button>
        </div>
        <InventoryTable products={filteredProducts} />
      </div>
    </div>
  );
}