// src/components/hr/attendance/modals/RecordAttendanceModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Staff } from '../../../../store/staffSlice';
import { addAttendance } from '@/store/AttendanceSlice';

interface RecordAttendanceModalProps {
  onClose: () => void;
}

export function RecordAttendanceModal({ onClose }: RecordAttendanceModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const staffList = useSelector((state: RootState) => state.staff.staff);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [isPresentMap, setIsPresentMap] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleStaffToggle = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleStatusChange = (staffId: string, isPresent: boolean) => {
    setIsPresentMap(prev => ({
      ...prev,
      [staffId]: isPresent
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStaff.length === 0) {
      alert('Please select at least one staff member');
      return;
    }

    setIsLoading(true);

    try {
      // Dispatch one attendance record per selected staff
      const promises = selectedStaff.map(staffId => {
        return dispatch(
          addAttendance({
            staffId,
            date: selectedDate, // Backend expects ISO date string
            isPresent: isPresentMap[staffId] ?? true,
          })
        ).unwrap();
      });

      await Promise.all(promises);
      onClose();
    } catch (err) {
      console.error('Failed to record attendance:', err);
      alert('Failed to record attendance. Please try again.');
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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-4xl lg:max-w-5xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
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
              <Calendar size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Record Attendance
            </h2>
            <p className="text-secondary mt-2">Record attendance for selected staff members</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="glass p-6 rounded-2xl mb-6">
                <h3 className="text-lg font-bold text-primary mb-4">Select Date</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  disabled={isLoading}
                />
              </div>

              {/* Staff Selection */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-4">Select Staff</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {staffList.map((staff) => (
                    <div key={staff.id} className="flex items-center gap-4 p-4 bg-surface-hover rounded-xl">
                      <input
                        type="checkbox"
                        id={`staff-${staff.id}`}
                        checked={selectedStaff.includes(staff.id)}
                        onChange={() => handleStaffToggle(staff.id)}
                        className="w-5 h-5 text-accent-cyan border-default rounded focus:ring-accent-cyan/50"
                        disabled={isLoading}
                      />
                      <label htmlFor={`staff-${staff.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
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
                      </label>
                      {selectedStaff.includes(staff.id) && (
                        <div className="flex items-center gap-4 ml-4">
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`status-${staff.id}`}
                                checked={isPresentMap[staff.id] ?? true}
                                onChange={() => handleStatusChange(staff.id, true)}
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
                                name={`status-${staff.id}`}
                                checked={!isPresentMap[staff.id]}
                                onChange={() => handleStatusChange(staff.id, false)}
                                className="sr-only"
                              />
                              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-status-danger/20 text-status-danger">
                                <XCircle size={16} />
                                Absent
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
              {isLoading ? 'Recording...' : 'Record Attendance'}
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