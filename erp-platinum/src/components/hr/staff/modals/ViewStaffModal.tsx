// src/components/hr/staff/HRStaffModal/ViewStaffModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, DollarSign, Star, Users } from 'lucide-react';
import { HRStaff } from '@/lib/hrUserData';

interface ViewStaffModalProps {
  staff: HRStaff;
  onClose: () => void;
}

export function ViewStaffModal({ staff, onClose }: ViewStaffModalProps) {
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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
              <img
                src={staff.avatar}
                alt={`${staff.firstName} ${staff.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              {staff.firstName} {staff.lastName}
            </h2>
            <p className="text-secondary mt-2">{staff.position}</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="text-accent-cyan" size={20} />
                      <h3 className="font-semibold text-primary">Email</h3>
                    </div>
                    <p className="text-primary">{staff.email}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="text-accent-purple" size={20} />
                      <h3 className="font-semibold text-primary">Phone</h3>
                    </div>
                    <p className="text-primary">{staff.phone}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-accent-pink" size={20} />
                      <h3 className="font-semibold text-primary">Hire Date</h3>
                    </div>
                    <p className="text-primary">{staff.hireDate}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="text-status-warning" size={20} />
                      <h3 className="font-semibold text-primary">Salary</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">${staff.salary.toLocaleString()}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="text-accent-cyan" size={20} />
                      <h3 className="font-semibold text-primary">Department</h3>
                    </div>
                    <p className="text-primary">{staff.department}</p>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="text-accent-purple" size={20} />
                      <h3 className="font-semibold text-primary">Manager</h3>
                    </div>
                    <p className="text-primary">{staff.manager}</p>
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
                            i < Math.floor(staff.performanceRating)
                              ? 'bg-accent-cyan'
                              : 'bg-white/30'
                          }`}
                        />
                      ))}
                      <span className="text-primary font-bold ml-2">
                        {staff.performanceRating.toFixed(1)}/5.0
                      </span>
                    </div>
                  </div>

                  <div className="glass p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-status-warning" size={20} />
                      <h3 className="font-semibold text-primary">Last Review</h3>
                    </div>
                    <p className="text-primary">{staff.lastReviewDate}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-semibold text-primary mb-3">Status</h3>
                <span className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${
                    staff.status === 'active'
                      ? 'bg-accent-success/20 text-accent-success'
                      : staff.status === 'on_leave'
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-status-danger/20 text-status-danger'
                  }
                `}>
                  {staff.status.replace('_', ' ').charAt(0).toUpperCase() + staff.status.replace('_', ' ').slice(1)}
                </span>
              </div>

              {/* Attendance Summary */}
              <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="font-semibold text-primary mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-accent-success/10 rounded-xl">
                    <div className="text-2xl font-bold text-accent-success">{staff.attendance.present}</div>
                    <div className="text-secondary text-sm">Present</div>
                  </div>
                  <div className="p-4 bg-status-warning/10 rounded-xl">
                    <div className="text-2xl font-bold text-status-warning">{staff.attendance.late}</div>
                    <div className="text-secondary text-sm">Late</div>
                  </div>
                  <div className="p-4 bg-status-danger/10 rounded-xl">
                    <div className="text-2xl font-bold text-status-danger">{staff.attendance.absent}</div>
                    <div className="text-secondary text-sm">Absent</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-secondary">
                    Attendance Rate: {((staff.attendance.present / staff.attendance.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Leave Balance */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-semibold text-primary mb-4">Leave Balance</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-accent-cyan/10 rounded-xl">
                    <div className="text-2xl font-bold text-accent-cyan">{staff.leaveBalance.vacation}</div>
                    <div className="text-secondary text-sm">Vacation</div>
                  </div>
                  <div className="p-4 bg-accent-purple/10 rounded-xl">
                    <div className="text-2xl font-bold text-accent-purple">{staff.leaveBalance.sick}</div>
                    <div className="text-secondary text-sm">Sick</div>
                  </div>
                  <div className="p-4 bg-accent-pink/10 rounded-xl">
                    <div className="text-2xl font-bold text-accent-pink">{staff.leaveBalance.personal}</div>
                    <div className="text-secondary text-sm">Personal</div>
                  </div>
                </div>
              </div>
            </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}