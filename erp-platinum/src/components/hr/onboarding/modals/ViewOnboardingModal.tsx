// src/components/hr/onboarding/HROnboardingModal/ViewOnboardingModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, User, CheckSquare, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { HROnboarding } from '@/lib/hrUserData';

interface ViewOnboardingModalProps {
  onboarding: HROnboarding;
  onClose: () => void;
}

export function ViewOnboardingModal({ onboarding, onClose }: ViewOnboardingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent-success/20 text-accent-success';
      case 'in_progress': return 'bg-accent-purple/20 text-accent-purple';
      case 'pending': return 'bg-status-warning/20 text-status-warning';
      default: return 'bg-white/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-accent-success" />;
      case 'in_progress': return <Clock size={20} className="text-accent-purple" />;
      case 'pending': return <AlertTriangle size={20} className="text-status-warning" />;
      default: return null;
    }
  };

  const calculateProgress = () => {
    if (onboarding.tasks.length === 0) return 0;
    const completed = onboarding.tasks.filter(t => t.completed).length;
    return Math.round((completed / onboarding.tasks.length) * 100);
  };

  const progress = calculateProgress();

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
            <p className="text-secondary mt-2">View all details for {onboarding.staffName}'s onboarding</p>
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
                      <p className="text-primary font-medium">{onboarding.staffName}</p>
                    </div>
                    <div>
                      <span className="text-secondary text-sm">Start Date</span>
                      <p className="text-primary">{onboarding.startDate}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Progress */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    {getStatusIcon(onboarding.status)}
                    <h3 className="text-lg font-bold text-primary">Status & Progress</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-between items-center p-4 bg-surface-hover rounded-lg">
                      <span className="text-secondary">Current Status</span>
                      <span className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        ${getStatusColor(onboarding.status)}
                      `}>
                        {onboarding.status.charAt(0).toUpperCase() + onboarding.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-secondary">Progress</span>
                        <span className="text-primary font-bold">{progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple transition-all duration-500" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Onboarding Tasks */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckSquare size={20} className="text-accent-purple" />
                    <h3 className="text-lg font-bold text-primary">Onboarding Tasks</h3>
                  </div>
                  <div className="space-y-4">
                    {onboarding.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-surface-hover rounded-xl">
                        <div className={`
                          w-5 h-5 rounded-full flex items-center justify-center
                          ${task.completed ? 'bg-accent-success' : 'bg-white/30'}
                        `}>
                          {task.completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-primary">{task.name}</div>
                          <div className="text-sm text-secondary">
                            Due: {task.dueDate} • Assigned to: {task.assignedTo || 'N/A'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText size={20} className="text-accent-pink" />
                    <h3 className="text-lg font-bold text-primary">Required Documents</h3>
                  </div>
                  <div className="space-y-3">
                    {onboarding.documents.map((document, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-surface-hover rounded-lg">
                        <FileText size={16} className="text-secondary" />
                        <span className="text-primary">{document}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {onboarding.notes && (
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-4">Additional Notes</h3>
                    <p className="text-primary text-lg leading-relaxed">{onboarding.notes}</p>
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