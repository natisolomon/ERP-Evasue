// src/components/admin/inventory/InventoryTable.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product } from '@/lib/inventoryData';

interface InventoryTableProps {
  products: Product[];
}

export function InventoryTable({ products }: InventoryTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

  const openModal = (type: 'view' | 'edit' | 'delete', product: Product) => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-secondary">Product Name</th>
              <th className="text-left p-4 font-medium text-secondary">SKU</th>
              <th className="text-left p-4 font-medium text-secondary">Category</th>
              <th className="text-left p-4 font-medium text-secondary">Stock</th>
              <th className="text-left p-4 font-medium text-secondary">Price</th>
              <th className="text-left p-4 font-medium text-secondary">Status</th>
              <th className="text-right p-4 font-medium text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-medium text-primary">{product.name}</td>
                <td className="p-4 text-primary">{product.sku}</td>
                <td className="p-4 text-secondary">{product.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {product.stock <= product.reorderLevel && (
                      <AlertTriangle size={16} className="text-status-warning" />
                    )}
                    <span className="font-medium text-primary">{product.stock}</span>
                  </div>
                </td>
                <td className="p-4 font-medium text-primary">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      product.status === 'in_stock' ? 'bg-accent-success/20 text-accent-success' :
                      product.status === 'low_stock' ? 'bg-status-warning/20 text-status-warning' :
                      'bg-status-danger/20 text-status-danger'
                    }
                  `}>
                    {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('view', product)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('edit', product)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal('delete', product)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-secondary"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedProduct && modalType === 'view' && (
        <ViewProductModal product={selectedProduct} onClose={closeModal} />
      )}
      {selectedProduct && modalType === 'edit' && (
        <EditProductModal product={selectedProduct} onClose={closeModal} />
      )}
      {selectedProduct && modalType === 'delete' && (
        <DeleteProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
}

// Import modals at the bottom
import { ViewProductModal } from './InventoryModal/ViewProductModal';
import { EditProductModal } from './InventoryModal/EditProductModal';
import { DeleteProductModal } from './InventoryModal/DeleteProductModal';