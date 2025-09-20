// src/components/inventory/shipments/InventoryShipmentModal/AddShipmentModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck } from 'lucide-react';

interface AddShipmentModalProps {
  onClose: () => void;
  onAdd: (shipment: any) => void;
}

export function AddShipmentModal({ onClose, onAdd }: AddShipmentModalProps) {
  const [formData, setFormData] = useState({
    type: 'incoming' as 'incoming' | 'outgoing',
    status: 'pending' as 'pending' | 'in_transit' | 'delivered' | 'cancelled',
    origin: '',
    destination: '',
    carrier: '',
    trackingNumber: '',
    shippedDate: new Date().toISOString().split('T')[0],
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const [items, setItems] = useState([
    { productId: '', productName: '', quantity: 1, unitPrice: 0, total: 0 },
  ]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleAddItem = () => {
    setItems([...items, { productId: '', productName: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    setItems(newItems);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const shippingCost = subtotal * 0.05; // 5% shipping cost
    const total = subtotal + shippingCost;
    return { subtotal, shippingCost, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.origin || !formData.destination || !formData.carrier || !formData.trackingNumber || items.some(item => !item.productName || item.unitPrice <= 0)) {
      alert('Please fill in all required fields');
      return;
    }

    const { subtotal, shippingCost, total } = calculateTotals();

    const newShipment = {
      id: Date.now().toString(),
      shipmentNumber: `SHIP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...formData,
      items: items,
      subtotal,
      shippingCost,
      total,
    };

    onAdd(newShipment);
    onClose();
  };

  const { subtotal, shippingCost, total } = calculateTotals();

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
              Add New Shipment
            </h2>
            <p className="text-secondary mt-2">Fill in the details for your new shipment</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'incoming' | 'outgoing' })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    >
                      <option value="incoming">Incoming</option>
                      <option value="outgoing">Outgoing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'in_transit' | 'delivered' | 'cancelled' })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Origin *</label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="e.g. Supplier Warehouse, City"
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Destination *</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Your Warehouse, City"
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Carrier *</label>
                    <input
                      type="text"
                      value={formData.carrier}
                      onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                      placeholder="e.g. FedEx, UPS, DHL"
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Tracking Number *</label>
                    <input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                      placeholder="e.g. FX1234567890"
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Shipped Date</label>
                    <input
                      type="date"
                      value={formData.shippedDate}
                      onChange={(e) => setFormData({ ...formData, shippedDate: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Estimated Delivery</label>
                    <input
                      type="date"
                      value={formData.estimatedDelivery}
                      onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary">Shipment Items</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleAddItem}
                      className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-lg font-medium text-sm hover:bg-accent-cyan/30 transition-all"
                    >
                      + Add Item
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 bg-surface-hover rounded-xl">
                        <div className="col-span-4">
                          <label className="block text-sm font-medium mb-2 text-secondary">Product Name *</label>
                          <input
                            type="text"
                            value={item.productName}
                            onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                            placeholder="e.g. Wireless Headphones"
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2 text-secondary">Qty</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                            min="1"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2 text-secondary">Unit Price ($)</label>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="block text-sm font-medium mb-2 text-secondary">Total</label>
                          <div className="px-3 py-2 bg-surface-card border border-default rounded-lg text-primary font-medium">
                            ${item.total.toFixed(2)}
                          </div>
                        </div>
                        <div className="col-span-1 flex items-end">
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-status-danger hover:underline text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary mb-4">Shipment Totals</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Subtotal:</span>
                      <span className="text-primary font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Shipping Cost (5%):</span>
                      <span className="text-primary font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-default pt-2">
                      <span className="text-primary font-bold">Total:</span>
                      <span className="text-primary font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions or notes..."
                    rows={3}
                    className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all resize-none"
                  />
                </div>
              </form>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Add Shipment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}