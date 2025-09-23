// src/components/hr/attendance/HRAttendanceModal/EditAttendanceModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { HRStaff } from '@/lib/hrUserData';

interface EditAttendanceModalProps {
  staff: HRStaff;
  date: string;
  onClose: () => void;
}

export function EditAttendanceModal({ staff, date, onClose }: EditAttendanceModalProps) {
  const [attendanceStatus, setAttendanceStatus] = useState<'present' | 'late' | 'absent'>(
    staff.attendance.late > 0 ? 'late' : staff.attendance.absent > 0 ? 'absent' : 'present'
  );
  const [checkInTime, setCheckInTime] = useState('09:15');
  const [checkOutTime, setCheckOutTime] = useState('17:45');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const attendanceData = {
      staffId: staff.id,
      staffName: `${staff.firstName} ${staff.lastName}`,
      date: date,
      status: attendanceStatus,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
    };

    console.log('Update attendance:', attendanceData);
    onClose();
  };

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
            <div className="w-16 h-16 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Edit Attendance
            </h2>
            <p className="text-secondary mt-2">Update attendance for {staff.firstName} {staff.lastName}</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary mb-4">Attendance Details</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-secondary">Staff Member</label>
                    <div className="flex items-center gap-3 p-3 bg-surface-hover rounded-xl">
                      <img
                        src={staff.avatar}
                        alt={`${staff.firstName} ${staff.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-primary">{staff.firstName} {staff.lastName}</div>
                        <div className="text-sm text-secondary">{staff.position}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-secondary">Date</label>
                    <div className="p-3 bg-surface-hover rounded-xl text-primary font-medium">
                      {date}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-secondary">Attendance Status</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="present"
                          checked={attendanceStatus === 'present'}
                          onChange={() => setAttendanceStatus('present')}
                          className="w-5 h-5 text-accent-cyan border-default focus:ring-accent-cyan/50"
                        />
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-success/20 text-accent-success">
                          <CheckCircle size={16} />
                          Present
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="late"
                          checked={attendanceStatus === 'late'}
                          onChange={() => setAttendanceStatus('late')}
                          className="w-5 h-5 text-status-warning border-default focus:ring-status-warning/50"
                        />
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-warning/20 text-status-warning">
                          <AlertTriangle size={16} />
                          Late
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="absent"
                          checked={attendanceStatus === 'absent'}
                          onChange={() => setAttendanceStatus('absent')}
                          className="w-5 h-5 text-status-danger border-default focus:ring-status-danger/50"
                        />
                        <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-danger/20 text-status-danger">
                          <XCircle size={16} />
                          Absent
                        </span>
                      </label>
                    </div>
                  </div>

                  {attendanceStatus !== 'absent' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-secondary">Check-in Time</label>
                        <input
                          type="time"
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-secondary">Check-out Time</label>
                        <input
                          type="time"
                          value={checkOutTime}
                          onChange={(e) => setCheckOutTime(e.target.value)}
                          className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Update Attendance
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}