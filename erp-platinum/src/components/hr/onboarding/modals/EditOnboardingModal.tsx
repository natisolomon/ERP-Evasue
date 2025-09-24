// src/components/hr/onboarding/modals/EditOnboardingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { Onboarding } from '@/store/OnboardingSlice';
import { Staff } from '@/store/staffSlice';
import { updateOnboarding } from '@/store/OnboardingSlice';

interface EditOnboardingModalProps {
  onboarding: Onboarding;
  staff: Staff; // ✅ For displaying staff name
  onClose: () => void;
}

export function EditOnboardingModal({ onboarding, staff, onClose }: EditOnboardingModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    startDate: onboarding.startDate.split('T')[0], // Convert ISO to date string
    checklistStatus: onboarding.checklistStatus, // "Not Started", "In Progress", "Completed"
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate) {
      alert('Please set a start date');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Send ONLY backend-supported fields
      await dispatch(
        updateOnboarding({
          id: onboarding.id,
          staffId: onboarding.staffId,
          startDate: formData.startDate,
          checklistStatus: formData.checklistStatus,
        })
      ).unwrap();

      onClose();
    } catch (err) {
      console.error('Failed to update onboarding:', err);
      alert('Failed to update onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
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
            disabled={isLoading}
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
              Edit Onboarding
            </h2>
            <p className="text-secondary mt-2">
              Update the details for {staff ? `${staff.firstName} ${staff.lastName}` : 'this staff member'}'s onboarding
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status & Start Date */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Status *</label>
                    <select
                      value={formData.checklistStatus}
                      onChange={(e) => setFormData({ ...formData, checklistStatus: e.target.value as 'Not Started' | 'In Progress' | 'Completed' })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                      disabled={isLoading}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className={`flex-1 px-6 py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                'Update Onboarding'
              )}
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
            </form>
          </div>

          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}