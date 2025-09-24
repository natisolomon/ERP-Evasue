// src/components/hr/staff/modals/ViewStaffModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, Users } from 'lucide-react';
import { Staff } from '../../../../store/staffSlice'; // ✅ Real Staff type

interface ViewStaffModalProps {
  staff: Staff; // ✅ Not HRStaff
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

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString();
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
            <div className="w-20 h-20 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {staff.firstName.charAt(0)}
                {staff.lastName.charAt(0)}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-primary">
              {staff.firstName} {staff.lastName}
            </h2>
            <p className="text-secondary mt-2">{staff.department}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
              staff.isActive
                ? 'bg-accent-success/20 text-accent-success'
                : 'bg-status-danger/20 text-status-danger'
            }`}>
              {staff.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-5">
              <div className="glass p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Mail className="text-accent-cyan mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-primary">{staff.email}</p>
                  </div>
                </div>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Phone className="text-accent-purple mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-primary">{staff.phone || '—'}</p>
                  </div>
                </div>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Calendar className="text-accent-pink mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Hire Date</h3>
                    <p className="text-primary">{formatDate(staff.dateJoined)}</p>
                  </div>
                </div>
              </div>

              <div className="glass p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Users className="text-accent-cyan mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Department</h3>
                    <p className="text-primary">{staff.department}</p>
                  </div>
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