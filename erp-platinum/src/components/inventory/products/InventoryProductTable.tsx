// src/components/inventory/products/InventoryProductTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { InventoryProduct } from '@/lib/inventoryUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewProductModal } from './modal/ViewProductModal';
import { EditProductModal } from './modal/EditProductModal';
import { DeleteProductModal } from './modal/DeleteProductModal';

interface InventoryProductTableProps {
  products: InventoryProduct[];
}

export function InventoryProductTable({ products }: InventoryProductTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (product: InventoryProduct) => {
    openModal(<ViewProductModal product={product} onClose={closeModal} />);
  };

  const handleEdit = (product: InventoryProduct) => {
    openModal(<EditProductModal product={product} onClose={closeModal} />);
  };

  const handleDelete = (product: InventoryProduct) => {
    openModal(<DeleteProductModal product={product} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
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
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">{product.name}</td>
              <td className="p-4 text-primary">{product.sku}</td>
              <td className="p-4 text-secondary">{product.category}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {product.stock <= product.reorderLevel && product.stock > 0 && (
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
                    product.status === 'in_stock'
                      ? 'bg-accent-success/20 text-accent-success'
                      : product.status === 'low_stock'
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-status-danger/20 text-status-danger'
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
                    onClick={() => handleView(product)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(product)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(product)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
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
  );
}