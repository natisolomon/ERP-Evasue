// src/components/inventory/shipments/InventoryShipmentModal/ViewShipmentModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, ArrowDown, ArrowUp, MapPin, Package } from 'lucide-react';
import { InventoryShipment } from '@/lib/inventoryShipmentsData';

interface ViewShipmentModalProps {
  shipment: InventoryShipment;
  onClose: () => void;
}

export function ViewShipmentModal({ shipment, onClose }: ViewShipmentModalProps) {
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
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-4xl lg:max-w-5xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
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
              <Truck size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Shipment Details
            </h2>
            <p className="text-secondary mt-2">View all details for this shipment</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Shipment Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary">{shipment.shipmentNumber}</h1>
                  <p className="text-secondary">Shipped: {shipment.shippedDate}</p>
                  <p className="text-secondary">Estimated Delivery: {shipment.estimatedDelivery}</p>
                  {shipment.actualDelivery && (
                    <p className="text-secondary">Actual Delivery: {shipment.actualDelivery}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`
                    px-4 py-2 rounded-full text-sm font-medium
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
                  <div className="mt-2 text-sm">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
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
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={20} className="text-accent-cyan" />
                    <h3 className="text-lg font-bold text-primary">Origin</h3>
                  </div>
                  <p className="text-primary text-lg font-medium">{shipment.origin}</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={20} className="text-accent-purple" />
                    <h3 className="text-lg font-bold text-primary">Destination</h3>
                  </div>
                  <p className="text-primary text-lg font-medium">{shipment.destination}</p>
                </div>
              </div>

              {/* Carrier & Tracking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck size={20} className="text-accent-pink" />
                    <h3 className="text-lg font-bold text-primary">Carrier</h3>
                  </div>
                  <p className="text-primary text-lg font-medium">{shipment.carrier}</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Package size={20} className="text-status-warning" />
                    <h3 className="text-lg font-bold text-primary">Tracking Number</h3>
                  </div>
                  <p className="text-primary text-lg font-mono">{shipment.trackingNumber}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">Shipment Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-default">
                        <th className="text-left p-3 font-medium text-secondary">Product</th>
                        <th className="text-right p-3 font-medium text-secondary">Qty</th>
                        <th className="text-right p-3 font-medium text-secondary">Unit Price</th>
                        <th className="text-right p-3 font-medium text-secondary">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipment.items.map((item, i) => (
                        <tr key={i} className="border-b border-default/50">
                          <td className="p-3 text-primary">{item.productName}</td>
                          <td className="p-3 text-primary text-right">{item.quantity}</td>
                          <td className="p-3 text-primary text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="p-3 text-primary font-medium text-right">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="glass p-6 rounded-2xl mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">Shipment Totals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary">Subtotal:</span>
                    <span className="text-primary font-medium">${shipment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Shipping Cost:</span>
                    <span className="text-primary font-medium">${shipment.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-default pt-2">
                    <span className="text-primary font-bold">Total:</span>
                    <span className="text-primary font-bold">${shipment.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {shipment.notes && (
                <div className="glass p-6 rounded-2xl mb-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Notes</h3>
                  <p className="text-primary text-lg">{shipment.notes}</p>
                </div>
              )}
            </div>

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