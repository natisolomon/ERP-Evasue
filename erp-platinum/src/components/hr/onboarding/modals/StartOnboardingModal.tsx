// src/components/hr/onboarding/modals/StartOnboardingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Staff } from '@/store/staffSlice';
import { addOnboarding } from '@/store/OnboardingSlice';
import { Onboarding } from '@/store/OnboardingSlice';

interface StartOnboardingModalProps {
  onClose: () => void;
}

export function StartOnboardingModal({ onClose }: StartOnboardingModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const staffList = useSelector((state: RootState) => state.staff.staff);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    staffId: '',
    startDate: new Date().toISOString().split('T')[0],
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

    if (!formData.staffId || !formData.startDate) {
      alert('Please select a staff member and set a start date');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Send ONLY backend-supported fields
      await dispatch(
        addOnboarding({
          staffId: formData.staffId,
          startDate: formData.startDate,
          checklistStatus: "Not Started",
        })
      ).unwrap();

      onClose();
    } catch (err) {
      console.error('Failed to start onboarding:', err);
      alert('Failed to start onboarding. Please try again.');
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
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Start New Onboarding
            </h2>
            <p className="text-secondary mt-2">Fill in the details to start onboarding a new staff member</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Staff Selection */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-4">Staff Information</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-secondary">Staff Member *</label>
                  <select
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Staff Member</option>
                    {staffList.map((staff: Staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.firstName} {staff.lastName} - {staff.department}
                      </option>
                    ))}
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
                  Starting...
                </div>
              ) : (
                'Start Onboarding'
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