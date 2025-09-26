// src/components/layout/Toast.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

type ToastType = 'success' | 'error' | 'delete';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

export function Toast({ message, type, isVisible }: ToastProps) {
  if (!isVisible) return null;

  // Determine icon and colors based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-accent-success" />;
      case 'delete':
        return <Trash2 size={20} className="text-status-danger" />;
      case 'error':
      default:
        return <XCircle size={20} className="text-status-danger" />;
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-accent-success/15 border border-accent-success/30';
      case 'delete':
        return 'bg-status-danger/15 border border-status-danger/30';
      case 'error':
      default:
        return 'bg-status-danger/15 border border-status-danger/30';
    }
  };

  const getTextClass = () => {
    switch (type) {
      case 'success':
        return 'text-accent-success';
      case 'delete':
      case 'error':
      default:
        return 'text-status-danger';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 right-6 z-50"
      >
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${getBgClass()} ${getTextClass()}`}>
          {getIcon()}
          <span className="font-medium">{message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}