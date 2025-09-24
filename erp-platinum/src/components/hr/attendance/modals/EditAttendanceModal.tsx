// src/components/hr/attendance/modals/EditAttendanceModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Staff } from '../../../../store/staffSlice'; // ✅ Real Staff
import { Attendance } from '@/store/AttendanceSlice'; // ✅ Real Attendance
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addAttendance, updateAttendance } from '@/store/AttendanceSlice';

interface EditAttendanceModalProps {
  staff: Staff;
  attendance: Attendance | null; // May not exist yet for this date
  date: string; // e.g., "2024-06-15"
  onClose: () => void;
}

export function EditAttendanceModal({ staff, attendance, date, onClose }: EditAttendanceModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isPresent, setIsPresent] = useState(attendance ? attendance.isPresent : true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (attendance) {
        await dispatch(
          updateAttendance({
            id: attendance.id,
            staffId: staff.id,
            date,
            isPresent,
          })
        ).unwrap();
      } else {
        await dispatch(
          addAttendance({
            staffId: staff.id,
            date,
            isPresent,
          })
        ).unwrap();
      }
      onClose()
    } catch (err) {
      console.error('Failed to save attendance:', err);
      alert('Failed to update attendance. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
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
            <p className="text-secondary mt-2">
              Update attendance for {staff.firstName} {staff.lastName}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-4">Attendance Details</h3>

                {/* Staff Member */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Staff Member</label>
                  <div className="flex items-center gap-3 p-3 bg-surface-hover rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold">
                      {staff.firstName.charAt(0)}
                      {staff.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-primary">
                        {staff.firstName} {staff.lastName}
                      </div>
                      <div className="text-sm text-secondary">{staff.department}</div>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Date</label>
                  <div className="p-3 bg-surface-hover rounded-xl text-primary font-medium">
                    {date}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Attendance Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={isPresent}
                        onChange={() => setIsPresent(true)}
                        className="sr-only"
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
                        checked={!isPresent}
                        onChange={() => setIsPresent(false)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-danger/20 text-status-danger">
                        <XCircle size={16} />
                        Absent
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex-1 px-6 py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white'
              }`}
            >
              {isLoading ? 'Saving...' : 'Update Attendance'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              disabled={isLoading}
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