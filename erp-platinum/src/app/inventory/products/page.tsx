// src/app/inventory/products/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InventoryProductTable } from '@/components/inventory/products/InventoryProductTable';
import { InventoryProductFilters } from '@/components/inventory/products/InventoryProductFilters';
import { AddProductModal } from '@/components/inventory/products/modal/AddProductModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockProducts } from '@/lib/inventoryUserData';

export default function InventoryProductsPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    location: 'all',
    search: '',
  });

  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.status !== 'all' && product.status !== filters.status) return false;
    if (filters.location !== 'all' && !product.location.includes(filters.location)) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleAddProduct = (newProduct: any) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleOpenAddModal = () => {
    openModal(
      <AddProductModal
        onClose={closeModal}
        onAdd={handleAddProduct}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Products
        </h1>
        <p className="text-secondary mt-2">Manage your product inventory</p>
      </div>

      {/* Filters */}
      <InventoryProductFilters filters={filters} setFilters={setFilters} />

      {/* Products Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Product Inventory</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Product
          </motion.button>
        </div>
        <InventoryProductTable products={filteredProducts} />
      </div>
    </div>
  );
}