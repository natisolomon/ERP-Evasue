// src/app/hr/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchStaff } from '../../store/staffSlice';
import { HRStatCard } from '@/components/hr/dashboard/HRStatCard';
import { HRChart } from '@/components/hr/dashboard/HRChart';
import { RecentActivities } from '@/components/hr/dashboard/RecentActivities';
import { QuickActions } from '@/components/hr/dashboard/QuickActions';
import { mockLeaveRequests } from '@/lib/hrUserData'; // Keep for now if leave module isn't built

export default function HRDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, loading } = useSelector((state: RootState) => state.staff);

  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real staff on mount
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // ✅ Use real staff data
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.isActive).length;
  // Note: "on_leave" doesn't exist in backend → treat all non-active as inactive
  const staffOnLeave = 0; // or remove this stat if not needed
  const pendingLeaveRequests = mockLeaveRequests.filter(r => r.status === 'pending').length;

  // Mock performance (since backend doesn't have it yet)
  const averagePerformance = 4.2;

  // Mock chart data (okay for visuals)
  const departmentDistribution = [
    { name: 'Engineering', value: 40, color: 'bg-accent-cyan' },
    { name: 'Marketing', value: 25, color: 'bg-accent-purple' },
    { name: 'Sales', value: 20, color: 'bg-accent-pink' },
    { name: 'HR', value: 15, color: 'bg-status-warning' },
  ];

  const performanceTrend = [
    { month: 'Jan', value: 3.8 },
    { month: 'Feb', value: 4.1 },
    { month: 'Mar', value: 4.2 },
    { month: 'Apr', value: 4.3 },
    { month: 'May', value: 4.4 },
    { month: 'Jun', value: 4.5 },
  ];

  if (loading && staff.length === 0) {
    return (
      <div className="p-8">
        <p className="text-secondary">Loading HR dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          HR Dashboard
        </h1>
        <p className="text-secondary mt-2">Welcome back! Here's your HR overview.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {['overview', 'staff', 'attendance', 'performance'].map((tab) => (
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
            <HRStatCard
              title="Total Staff"
              value={totalStaff.toString()}
              trend="+2"
              icon="Users"
              variant="cyan"
            />
            <HRStatCard
              title="Active Staff"
              value={activeStaff.toString()}
              trend="+1"
              icon="CheckCircle"
              variant="green"
            />
            <HRStatCard
              title="Staff on Leave"
              value={staffOnLeave.toString()}
              trend="+1"
              icon="Coffee"
              variant="amber"
            />
            <HRStatCard
              title="Pending Leaves"
              value={pendingLeaveRequests.toString()}
              trend="+3"
              icon="FileText"
              variant="pink"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Performance Trend */}
            <div className="lg:col-span-2 glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Performance Trend</h3>
              <HRChart
                data={[
                  { name: 'Average Rating', data: performanceTrend.map(p => p.value), color: 'cyan' },
                ]}
                height={300}
              />
            </div>

            {/* Department Distribution */}
            <div className="glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">By Department</h3>
              <div className="space-y-4">
                {departmentDistribution.map((dept, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${dept.color}`}></div>
                      <span className="text-primary">{dept.name}</span>
                    </div>
                    <span className="text-secondary font-medium">{dept.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-32 flex items-end justify-between">
                {departmentDistribution.map((dept, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${dept.value}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className={`w-full max-w-8 rounded-t-xl ${dept.color} mx-0.5`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <RecentActivities />
            </div>
            <div className="glass rounded-3xl p-6 border border-default">
              <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
              <QuickActions />
            </div>
          </div>
        </>
      )}

      {activeTab === 'staff' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Staff Overview</h2>
          <p className="text-secondary">Staff management coming soon...</p>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Attendance Overview</h2>
          <p className="text-secondary">Attendance tracking coming soon...</p>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="glass rounded-3xl p-8 border border-default">
          <h2 className="text-2xl font-bold text-primary mb-6">Performance Overview</h2>
          <p className="text-secondary">Performance reviews coming soon...</p>
        </div>
      )}
    </div>
  );
}