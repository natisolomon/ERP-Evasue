// src/app/inventory/shipments/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InventoryShipmentTable } from '@/components/inventory/shipments/InventoryShipmentTable';
import { InventoryShipmentFilters } from '@/components/inventory/shipments/InventoryShipmentFilters';
import { AddShipmentModal } from '@/components/inventory/shipments/modals/AddShipmentModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockShipments } from '@/lib/inventoryShipmentsData';

export default function InventoryShipmentsPage() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    carrier: 'all',
    search: '',
  });

  const [shipments, setShipments] = useState(mockShipments);

  const filteredShipments = shipments.filter(shipment => {
    if (filters.type !== 'all' && shipment.type !== filters.type) return false;
    if (filters.status !== 'all' && shipment.status !== filters.status) return false;
    if (filters.carrier !== 'all' && shipment.carrier !== filters.carrier) return false;
    if (filters.search && !shipment.shipmentNumber.toLowerCase().includes(filters.search.toLowerCase()) && !shipment.trackingNumber.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleAddShipment = (newShipment: any) => {
    setShipments(prev => [newShipment, ...prev]);
  };

  const handleOpenAddModal = () => {
    openModal(
      <AddShipmentModal
        onClose={closeModal}
        onAdd={handleAddShipment}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Shipments
        </h1>
        <p className="text-secondary mt-2">Manage your incoming and outgoing shipments</p>
      </div>

      {/* Filters */}
      <InventoryShipmentFilters filters={filters} setFilters={setFilters} />

      {/* Shipments Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Shipment Management</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Add Shipment
          </motion.button>
        </div>
        <InventoryShipmentTable shipments={filteredShipments} />
      </div>
    </div>
  );
}