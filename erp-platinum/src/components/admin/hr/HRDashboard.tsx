// src/components/admin/hr/HRDashboard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HRStatCard } from './HRStatCard';
import { HRChart } from './HRChart';
import { HREmployeeTable } from './HREmployeeTable';
import { HRFilters } from './HRFilters';
import { mockEmployees, departmentDistribution, headcountTrend, salaryTrend } from '@/lib/hrData';

export function HRDashboard() {
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    position: 'all',
    search: '',
  });

  const filteredEmployees = mockEmployees.filter(employee => {
    if (filters.department !== 'all' && employee.department !== filters.department) return false;
    if (filters.status !== 'all' && employee.status !== filters.status) return false;
    if (filters.position !== 'all' && !employee.position.toLowerCase().includes(filters.position.toLowerCase())) return false;
    if (filters.search && !employee.firstName.toLowerCase().includes(filters.search.toLowerCase()) && !employee.lastName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Human Resources Dashboard
        </h1>
        <p className="text-secondary mt-2">Manage employees, departments, and performance reviews.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <HRStatCard
          title="Total Employees"
          value="260"
          trend="+15"
          icon="Users"
          variant="cyan"
        />
        <HRStatCard
          title="Active Employees"
          value="245"
          trend="+12"
          icon="CheckCircle"
          variant="green"
        />
        <HRStatCard
          title="Avg. Salary"
          value="$98,500"
          trend="+5.2%"
          icon="DollarSign"
          variant="purple"
        />
        <HRStatCard
          title="On Leave"
          value="15"
          trend="+3"
          icon="Coffee"
          variant="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Headcount vs Salary */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-6">Headcount vs Salary Expenditure</h3>
          <HRChart
            data={[
              { name: 'Headcount', data: headcountTrend, color: 'cyan' },
              { name: 'Salary Expenditure', data: salaryTrend, color: 'green' },
            ]}
            height={300}
          />
          
        </div>

        {/* Department Distribution */}
        <div className="glass rounded-3xl p-6 border border-white/10">
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
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`w-full max-w-8 rounded-t-xl ${dept.color} mx-0.5`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <HRFilters filters={filters} setFilters={setFilters} />

      {/* Employees Table */}
      <div className="glass rounded-3xl p-6 border border-white/10 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Employee Directory</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Employee
          </motion.button>
        </div>
        <HREmployeeTable employees={filteredEmployees} />
      </div>
    </div>
  );
}