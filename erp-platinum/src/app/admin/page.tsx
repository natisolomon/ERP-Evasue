// src/app/admin/page.tsx
'use client';

import { motion } from 'framer-motion';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { AdminActivityFeed } from '@/components/admin/AdminActivityFeed';
import { adminStats, recentActivity, systemStatus } from '@/lib/adminConstants';

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-secondary mt-2">Monitor system health, user activity, and security alerts.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {adminStats.map((stat, i) => (
          <AdminStatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <AdminActivityFeed activities={recentActivity} />
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">System Status</h3>
            <div className="space-y-4">
              {systemStatus.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-secondary">{item.name}</span>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      item.color === 'green' ? 'bg-accent-success/20 text-accent-success' :
                      item.color === 'amber' ? 'bg-status-warning/20 text-status-warning' :
                      'bg-status-danger/20 text-status-danger'
                    }
                  `}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl"
              >
                Create New User
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 bg-surface-hover text-secondary border border-white/20 font-medium rounded-xl"
              >
                View Audit Logs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 bg-surface-hover text-secondary border border-white/20 font-medium rounded-xl"
              >
                System Backup
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}