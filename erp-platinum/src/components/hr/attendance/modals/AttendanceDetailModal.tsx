// src/components/hr/attendance/modals/AttendanceDetailModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
}

interface AttendanceDetailModalProps {
  periodLabel: string;
  presentStaff: StaffMember[];
  absentStaff: StaffMember[];
  onClose: () => void;
}

export function AttendanceDetailModal({
  periodLabel,
  presentStaff,
  absentStaff,
  onClose
}: AttendanceDetailModalProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const filterStaff = (list: StaffMember[]) => {
    if (!search.trim()) return list;
    const term = search.toLowerCase();
    return list.filter(staff =>
      staff.firstName.toLowerCase().includes(term) ||
      staff.lastName.toLowerCase().includes(term) ||
      staff.department.toLowerCase().includes(term)
    );
  };

  const filteredPresent = filterStaff(presentStaff);
  const filteredAbsent = filterStaff(absentStaff);

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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl border border-white/10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Attendance Details
            </h2>
            <p className="text-secondary text-lg">
              {periodLabel}
            </p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search staff by name or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-default bg-surface-hover text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
          </div>

          <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-accent-success rounded-full"></div>
                <h3 className="font-bold text-lg text-accent-success">
                  Present ({presentStaff.length})
                </h3>
              </div>
              {filteredPresent.length === 0 ? (
                <p className="text-secondary pl-5">No present staff found.</p>
              ) : (
                <ul className="space-y-2">
                  {filteredPresent.map(staff => (
                    <li key={staff.id} className="flex items-center justify-between p-3 bg-surface-hover/50 rounded-xl">
                      <div>
                        <p className="font-medium text-primary">{staff.firstName} {staff.lastName}</p>
                        <p className="text-sm text-secondary">{staff.department}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-status-danger rounded-full"></div>
                <h3 className="font-bold text-lg text-status-danger">
                  Absent ({absentStaff.length})
                </h3>
              </div>
              {filteredAbsent.length === 0 ? (
                <p className="text-secondary pl-5">No absent staff found.</p>
              ) : (
                <ul className="space-y-2">
                  {filteredAbsent.map(staff => (
                    <li key={staff.id} className="flex items-center justify-between p-3 bg-surface-hover/50 rounded-xl">
                      <div>
                        <p className="font-medium text-primary">{staff.firstName} {staff.lastName}</p>
                        <p className="text-sm text-secondary">{staff.department}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}