// src/components/ModalProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalContextType {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setModal(modalContent);
  };

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modal) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [modal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {/* ✅ RENDER MODAL AT ROOT LEVEL */}
      {modal && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-2xl lg:max-w-3xl shadow-2xl border border-white/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {modal}
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body // ✅ Render directly under body
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}