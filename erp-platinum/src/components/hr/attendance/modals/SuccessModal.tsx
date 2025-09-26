// src/components/layout/SuccessModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

export function SuccessModal({ message, onClose }: SuccessModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Auto-close after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.85, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 20 }}
          className="bg-surface-card rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/10 text-center"
        >
          <div className="w-16 h-16 bg-accent-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-accent-success" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2">Success!</h3>
          <p className="text-secondary">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}