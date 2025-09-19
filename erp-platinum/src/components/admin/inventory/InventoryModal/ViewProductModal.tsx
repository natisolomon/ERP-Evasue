// src/components/admin/inventory/InventoryModal/ViewProductModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Tag, DollarSign, Warehouse, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product } from '@/lib/inventoryData';

interface ViewProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ViewProductModal({ product, onClose }: ViewProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
              <Package size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Product Details
            </h2>
            <p className="text-secondary mt-2">View all details for this product</p>
          </div>

          {/* 👇 Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="text-accent-cyan" size={20} />
                    <h3 className="font-semibold text-primary">Product Name</h3>
                  </div>
                  <p className="text-xl font-bold text-primary">{product.name}</p>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Tag className="text-accent-purple" size={20} />
                    <h3 className="font-semibold text-primary">SKU</h3>
                  </div>
                  <p className="text-primary">{product.sku}</p>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="text-accent-pink" size={20} />
                    <h3 className="font-semibold text-primary">Price & Cost</h3>
                  </div>
                  <p className="text-primary">
                    <span className="font-bold">${product.price.toFixed(2)}</span> / 
                    <span className="text-secondary"> ${product.cost.toFixed(2)}</span>
                  </p>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Warehouse className="text-status-warning" size={20} />
                    <h3 className="font-semibold text-primary">Location</h3>
                  </div>
                  <p className="text-primary">{product.location}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Tag className="text-accent-purple" size={20} />
                    <h3 className="font-semibold text-primary">Category</h3>
                  </div>
                  <p className="text-primary">{product.category}</p>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="text-accent-cyan" size={20} />
                    <h3 className="font-semibold text-primary">Stock Level</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.stock <= product.reorderLevel && (
                      <AlertTriangle size={20} className="text-status-warning" />
                    )}
                    <span className="text-2xl font-bold text-primary">{product.stock}</span>
                    <span className="text-secondary">/ {product.reorderLevel} (reorder level)</span>
                  </div>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-status-warning to-status-danger"></span>
                    <h3 className="font-semibold text-primary">Status</h3>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      product.status === 'in_stock'
                        ? 'bg-accent-success/20 text-accent-success'
                        : product.status === 'low_stock'
                        ? 'bg-status-warning/20 text-status-warning'
                        : 'bg-status-danger/20 text-status-danger'
                    }
                  `}>
                    {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                  </span>
                </div>

                <div className="glass p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"></span>
                    <h3 className="font-semibold text-primary">Supplier</h3>
                  </div>
                  <p className="text-primary">{product.supplier}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl mb-8">
              <h3 className="font-semibold text-primary mb-3">Last Updated</h3>
              <p className="text-primary text-lg">{product.lastUpdated}</p>
            </div>
          </div>

          {/* 👇 Fixed Footer */}
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