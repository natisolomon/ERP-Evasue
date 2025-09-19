// src/components/admin/hr/HRModal/ViewEmployeeModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Briefcase, Calendar, DollarSign, Star, Users } from 'lucide-react';
import { Employee } from '@/lib/hrData';

interface ViewEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

export function ViewEmployeeModal({ employee, onClose }: ViewEmployeeModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Employee Details
            </h2>
            <p className="text-secondary mt-2">View all details for {employee.firstName} {employee.lastName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <User className="text-accent-cyan" size={20} />
                  <h3 className="font-semibold text-primary">Full Name</h3>
                </div>
                <p className="text-xl font-bold text-primary">{employee.firstName} {employee.lastName}</p>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-accent-purple" size={20} />
                  <h3 className="font-semibold text-primary">Email</h3>
                </div>
                <p className="text-primary">{employee.email}</p>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="text-accent-pink" size={20} />
                  <h3 className="font-semibold text-primary">Phone</h3>
                </div>
                <p className="text-primary">{employee.phone}</p>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-status-warning" size={20} />
                  <h3 className="font-semibold text-primary">Hire Date</h3>
                </div>
                <p className="text-primary">{employee.hireDate}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="text-accent-cyan" size={20} />
                  <h3 className="font-semibold text-primary">Department & Position</h3>
                </div>
                <p className="text-primary">
                  <span className="font-bold">{employee.department}</span> / {employee.position}
                </p>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="text-accent-purple" size={20} />
                  <h3 className="font-semibold text-primary">Salary</h3>
                </div>
                <p className="text-2xl font-bold text-primary">${employee.salary.toLocaleString()}</p>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="text-accent-pink" size={20} />
                  <h3 className="font-semibold text-primary">Performance Rating</h3>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < Math.floor(employee.performanceRating)
                          ? 'bg-accent-cyan'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                  <span className="text-primary font-bold ml-2">{employee.performanceRating.toFixed(1)}</span>
                </div>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-status-warning" size={20} />
                  <h3 className="font-semibold text-primary">Manager</h3>
                </div>
                <p className="text-primary">{employee.manager}</p>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl mb-8">
            <h3 className="font-semibold text-primary mb-3">Status & Last Review</h3>
            <div className="flex flex-wrap gap-4">
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${
                  employee.status === 'active' ? 'bg-accent-success/20 text-accent-success' :
                  employee.status === 'on_leave' ? 'bg-status-warning/20 text-status-warning' :
                  'bg-status-danger/20 text-status-danger'
                }
              `}>
                {employee.status.replace('_', ' ').charAt(0).toUpperCase() + employee.status.replace('_', ' ').slice(1)}
              </span>
              <span className="text-secondary">Last Review: {employee.lastReviewDate}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}