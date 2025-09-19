// src/components/admin/hr/HREmployeeTable.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Employee } from '@/lib/hrData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewEmployeeModal } from './HRModal/ViewEmployeeModal';
import { EditEmployeeModal } from './HRModal/EditEmployeeModal';
import { DeleteEmployeeModal } from './HRModal/DeleteEmployeeModal';

interface HREmployeeTableProps {
  employees: Employee[];
}

export function HREmployeeTable({ employees }: HREmployeeTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (employee: Employee) => {
    openModal(<ViewEmployeeModal employee={employee} onClose={closeModal} />);
  };

  const handleEdit = (employee: Employee) => {
    openModal(<EditEmployeeModal employee={employee} onClose={closeModal} />);
  };

  const handleDelete = (employee: Employee) => {
    openModal(<DeleteEmployeeModal employee={employee} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left p-4 font-medium text-secondary">Employee</th>
            <th className="text-left p-4 font-medium text-secondary">Department</th>
            <th className="text-left p-4 font-medium text-secondary">Position</th>
            <th className="text-left p-4 font-medium text-secondary">Salary</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Performance</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, i) => (
            <motion.tr
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="p-4 font-medium text-primary">
                {employee.firstName} {employee.lastName}
                <div className="text-sm text-secondary">{employee.email}</div>
              </td>
              <td className="p-4 text-primary">{employee.department}</td>
              <td className="p-4 text-secondary">{employee.position}</td>
              <td className="p-4 font-medium text-primary">${employee.salary.toLocaleString()}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${
                    employee.status === 'active' ? 'bg-accent-success/20 text-accent-success' :
                    employee.status === 'on_leave' ? 'bg-status-warning/20 text-status-warning' :
                    'bg-status-danger/20 text-status-danger'
                  }
                `}>
                  {employee.status.replace('_', ' ').charAt(0).toUpperCase() + employee.status.replace('_', ' ').slice(1)}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(employee.performanceRating)
                          ? 'bg-accent-cyan'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                  <span className="text-secondary text-sm ml-2">
                    {employee.performanceRating.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(employee)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(employee)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(employee)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}