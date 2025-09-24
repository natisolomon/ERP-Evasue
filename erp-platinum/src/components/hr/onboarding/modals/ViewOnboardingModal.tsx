// src/components/hr/onboarding/modals/ViewOnboardingModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Onboarding } from '@/store/OnboardingSlice'; // ✅ Real Onboarding
import { Staff } from '@/store/staffSlice'; // ✅ Real Staff

interface ViewOnboardingModalProps {
  onboarding: Onboarding;
  staff: Staff; // ✅ For staff name lookup
  onClose: () => void;
}

export function ViewOnboardingModal({ onboarding, staff, onClose }: ViewOnboardingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-accent-success/20 text-accent-success';
      case 'In Progress': return 'bg-accent-purple/20 text-accent-purple';
      case 'Not Started': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={20} className="text-accent-success" />;
      case 'In Progress': return <Clock size={20} className="text-accent-purple" />;
      case 'Not Started': return <AlertTriangle size={20} className="text-status-warning" />;
      default: return null;
    }
  };

  // Format date: "2024-06-15T00:00:00" → "Jun 15, 2024"
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Onboarding Details
            </h2>
            <p className="text-secondary mt-2">
              View all details for {staff ? `${staff.firstName} ${staff.lastName}` : 'this staff member'}'s onboarding
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6">
              {/* Staff Information */}
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <User size={20} className="text-accent-cyan" />
                  <h3 className="text-lg font-bold text-primary">Staff Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-secondary text-sm">Staff Member</span>
                    <p className="text-primary font-medium">
                      {staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown Staff'}
                    </p>
                  </div>
                  <div>
                    <span className="text-secondary text-sm">Start Date</span>
                    <p className="text-primary">{formatDate(onboarding.startDate)}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(onboarding.checklistStatus)}
                  <h3 className="text-lg font-bold text-primary">Status</h3>
                </div>
                <div className="flex justify-between items-center p-4 bg-surface-hover rounded-lg">
                  <span className="text-secondary">Current Status</span>
                  <span className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    ${getStatusColor(onboarding.checklistStatus)}
                  `}>
                    {onboarding.checklistStatus}
                  </span>
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