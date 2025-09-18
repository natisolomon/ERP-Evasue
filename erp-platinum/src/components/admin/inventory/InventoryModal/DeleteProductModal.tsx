// src/components/admin/inventory/InventoryModal/DeleteProductModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { Product } from '@/lib/inventoryData';

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
}

export function DeleteProductModal({ product, onClose }: DeleteProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDelete = () => {
    console.log('Delete product:', product.id);
    onClose();
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
            <h2 className="text-3xl font-bold text-primary mb-4">Delete Product?</h2>
            <p className="text-secondary mb-6 text-lg">
              Are you sure you want to permanently delete this product?
              <br />
              <span className="font-medium text-primary block mt-2">"{product.name}" (SKU: {product.sku})</span>
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
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-secondary font-medium rounded-xl hover:bg-white/20 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}