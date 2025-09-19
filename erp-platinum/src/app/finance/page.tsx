// src/app/finance/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FinanceUserStatCard } from '@/components/finance/dashboard/FinanceUserStatCard';
import { FinanceUserChart } from '@/components/finance/dashboard/FinanceUserChart';
import { RecentTransactions } from '@/components/finance/dashboard/RecentTransactions';
import { QuickActions } from '@/components/finance/dashboard/QuickActions';

export default function FinanceDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <p className="text-secondary mt-2">Welcome back, Sarah! Here's your financial overview.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {['overview', 'transactions', 'invoices', 'reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all
              ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-accent-pink to-accent-cyan text-white shadow-lg'
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
            <FinanceUserStatCard
              title="Monthly Revenue"
              value="$48,200"
              trend="+18.2%"
              icon="DollarSign"
              variant="cyan"
            />
            <FinanceUserStatCard
              title="Monthly Expenses"
              value="$28,400"
              trend="+5.7%"
              icon="TrendingDown"
              variant="pink"
            />
            <FinanceUserStatCard
              title="Pending Invoices"
              value="$12,800"
              trend="+2"
              icon="FileText"
              variant="amber"
            />
            <FinanceUserStatCard
              title="Cash Flow"
              value="$19,800"
              trend="+12.5%"
              icon="BarChart3"
              variant="green"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Revenue vs Expenses */}
            <div className="lg:col-span-2 glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Revenue vs Expenses</h3>
              <FinanceUserChart />
            </div>

            {/* Recent Transactions */}
            <div className="glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
              <RecentTransactions />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </>
      )}

      {activeTab === 'transactions' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Transactions</h2>
          <p className="text-secondary">Transaction management coming soon...</p>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Invoices</h2>
          <p className="text-secondary">Invoice management coming soon...</p>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Financial Reports</h2>
          <p className="text-secondary">Reporting tools coming soon...</p>
        </div>
      )}
    </div>
  );
}