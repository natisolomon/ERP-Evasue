// src/app/inventory/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InventoryUserStatCard } from '@/components/inventory/dashboard/InventoryUserStatCard';
import { InventoryUserChart } from '@/components/inventory/dashboard/InventoryUserChart';
import { RecentActivities } from '@/components/inventory/dashboard/RecentActivities';
import { QuickActions } from '@/components/inventory/dashboard/QuickActions';

export default function InventoryDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Inventory Dashboard
        </h1>
        <p className="text-secondary mt-2">Welcome back, Alex! Here's your inventory overview.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {['overview', 'products', 'shipments', 'reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all
              ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg'
                  : 'bg-surface-hover text-secondary hover:bg-surface-hover/80'
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <InventoryUserStatCard
              title="Total Products"
              value="247"
              trend="+12"
              icon="Package"
              variant="cyan"
            />
            <InventoryUserStatCard
              title="Pending Shipments"
              value="8"
              trend="+2"
              icon="Truck"
              variant="amber"
            />
            <InventoryUserStatCard
              title="Low Stock Items"
              value="15"
              trend="+3"
              icon="AlertTriangle"
              variant="pink"
            />
            <InventoryUserStatCard
              title="This Month Orders"
              value="42"
              trend="+8"
              icon="FileText"
              variant="green"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Activity Chart */}
            <div className="lg:col-span-2 glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Monthly Activity</h3>
              <InventoryUserChart />
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <RecentActivities />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </>
      )}

      {activeTab === 'products' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">My Products</h2>
          <p className="text-secondary">Product management coming soon...</p>
        </div>
      )}

      {activeTab === 'shipments' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Shipments</h2>
          <p className="text-secondary">Shipment tracking coming soon...</p>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Reports</h2>
          <p className="text-secondary">Reporting tools coming soon...</p>
        </div>
      )}
    </div>
  );
}