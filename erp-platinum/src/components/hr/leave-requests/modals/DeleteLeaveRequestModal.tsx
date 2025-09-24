// src/components/hr/leave-requests/modals/DeleteLeaveRequestModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { LeaveRequest } from '@/store/LeaveRequestSlice';
import { Staff } from '../../../../store/staffSlice';
import { rejectLeaveRequest } from '@/store/LeaveRequestSlice'; // We'll add this below

interface DeleteLeaveRequestModalProps {
  request: LeaveRequest;
  staff: Staff; // ✅ For displaying staff name
  onClose: () => void;
}

export function DeleteLeaveRequestModal({ request, staff, onClose }: DeleteLeaveRequestModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDelete = async () => {
    try {
      await dispatch(rejectLeaveRequest(request.id)).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to delete leave request:', err);
      alert('Failed to delete leave request. Please try again.');
    }
  };

  // Format date: "2024-06-15T00:00:00" → "Jun 15"
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-white/10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center py-8">
            <div className="w-20 h-20 bg-status-danger/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="text-status-danger" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Delete Leave Request?</h2>
            <p className="text-secondary mb-6 text-lg">
              Are you sure you want to permanently delete this leave request?
              <br />
              <span className="font-medium text-primary block mt-2">
                {staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown Staff'}
              </span>
              <span className="text-sm text-secondary block mt-1">
                {formatDate(request.startDate)} to {formatDate(request.endDate)}
              </span>
            </p>
            <p className="text-status-danger text-sm font-medium">
              ⚠️ This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDelete}
              className="flex-1 px-6 py-3 bg-status-danger text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Delete Permanently
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
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