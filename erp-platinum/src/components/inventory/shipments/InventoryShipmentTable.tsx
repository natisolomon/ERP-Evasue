// src/components/inventory/shipments/InventoryShipmentTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Truck, ArrowDown, ArrowUp } from 'lucide-react';
import { InventoryShipment } from '@/lib/inventoryShipmentsData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewShipmentModal } from './modals/ViewShipmentModal';
import { EditShipmentModal } from './modals/EditShipmentModal';
import { DeleteShipmentModal } from './modals/DeleteShipmentModal';

interface InventoryShipmentTableProps {
  shipments: InventoryShipment[];
}

export function InventoryShipmentTable({ shipments }: InventoryShipmentTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (shipment: InventoryShipment) => {
    openModal(<ViewShipmentModal shipment={shipment} onClose={closeModal} />);
  };

  const handleEdit = (shipment: InventoryShipment) => {
    openModal(<EditShipmentModal shipment={shipment} onClose={closeModal} />);
  };

  const handleDelete = (shipment: InventoryShipment) => {
    openModal(<DeleteShipmentModal shipment={shipment} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Shipment #</th>
            <th className="text-left p-4 font-medium text-secondary">Type</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-left p-4 font-medium text-secondary">Origin/Destination</th>
            <th className="text-left p-4 font-medium text-secondary">Carrier</th>
            <th className="text-left p-4 font-medium text-secondary">Items</th>
            <th className="text-left p-4 font-medium text-secondary">Total</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, i) => (
            <motion.tr
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">{shipment.shipmentNumber}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${
                    shipment.type === 'incoming'
                      ? 'bg-accent-cyan/20 text-accent-cyan'
                      : 'bg-accent-pink/20 text-accent-pink'
                  }
                `}>
                  {shipment.type === 'incoming' ? (
                    <div className="flex items-center gap-1">
                      <ArrowDown size={12} />
                      Incoming
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <ArrowUp size={12} />
                      Outgoing
                    </div>
                  )}
                </span>
              </td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${
                    shipment.status === 'delivered'
                      ? 'bg-accent-success/20 text-accent-success'
                      : shipment.status === 'in_transit'
                      ? 'bg-status-warning/20 text-status-warning'
                      : shipment.status === 'pending'
                      ? 'bg-accent-cyan/20 text-accent-cyan'
                      : 'bg-status-danger/20 text-status-danger'
                  }
                `}>
                  {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace('_', ' ')}
                </span>
              </td>
              <td className="p-4 text-sm">
                <div className="font-medium text-primary">{shipment.origin}</div>
                <div className="text-secondary">→ {shipment.destination}</div>
              </td>
              <td className="p-4 text-primary">{shipment.carrier}</td>
              <td className="p-4 text-primary">{shipment.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
              <td className="p-4 font-medium text-primary">${shipment.total.toLocaleString()}</td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(shipment)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(shipment)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(shipment)}
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