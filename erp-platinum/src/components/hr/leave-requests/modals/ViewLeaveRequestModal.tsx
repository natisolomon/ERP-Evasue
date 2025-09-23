// src/components/hr/leave-requests/HRLeaveRequestModal/ViewLeaveRequestModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Calendar, User, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { HRLeaveRequest } from '@/lib/hrUserData';

interface ViewLeaveRequestModalProps {
  request: HRLeaveRequest;
  onClose: () => void;
}

export function ViewLeaveRequestModal({ request, onClose }: ViewLeaveRequestModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-accent-cyan/20 text-accent-cyan';
      case 'sick': return 'bg-accent-pink/20 text-accent-pink';
      case 'personal': return 'bg-accent-purple/20 text-accent-purple';
      case 'unpaid': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-accent-success/20 text-accent-success';
      case 'rejected': return 'bg-status-danger/20 text-status-danger';
      case 'pending': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={20} className="text-accent-success" />;
      case 'rejected': return <XCircle size={20} className="text-status-danger" />;
      case 'pending': return <AlertTriangle size={20} className="text-status-warning" />;
      default: return null;
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
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Leave Request Details
            </h2>
            <p className="text-secondary mt-2">View all details for this leave request</p>
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
                      <p className="text-primary font-medium">{request.staffName}</p>
                    </div>
                    <div>
                      <span className="text-secondary text-sm">Submitted Date</span>
                      <p className="text-primary">{request.submittedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Leave Details */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar size={20} className="text-accent-purple" />
                    <h3 className="text-lg font-bold text-primary">Leave Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-surface-hover rounded-lg">
                      <span className="text-secondary">Leave Type</span>
                      <span className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${getTypeColor(request.type)}
                      `}>
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-surface-hover rounded-lg">
                      <span className="text-secondary">Dates</span>
                      <div className="text-right">
                        <div className="text-primary font-medium">{request.startDate}</div>
                        <div className="text-secondary">→ {request.endDate}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-surface-hover rounded-lg">
                      <span className="text-secondary">Duration</span>
                      <span className="text-primary font-bold">{request.days} days</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    {getStatusIcon(request.status)}
                    <h3 className="text-lg font-bold text-primary">Status</h3>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-surface-hover rounded-lg">
                    <span className="text-secondary">Current Status</span>
                    <span className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${getStatusColor(request.status)}
                    `}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  {request.approvedBy && (
                    <div className="mt-4 p-3 bg-white/5 border border-white/20 rounded-lg">
                      <span className="text-secondary text-sm">Approved By</span>
                      <p className="text-primary">{request.approvedBy}</p>
                    </div>
                  )}
                </div>

                {/* Reason */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary mb-4">Reason</h3>
                  <p className="text-primary text-lg leading-relaxed">{request.reason}</p>
                </div>

                {/* Notes */}
                {request.notes && (
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-4">Additional Notes</h3>
                    <p className="text-primary text-lg leading-relaxed">{request.notes}</p>
                  </div>
                )}
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