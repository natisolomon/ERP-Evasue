// src/components/finance/invoices/FinanceInvoiceModal/CreateInvoiceModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface CreateInvoiceModalProps {
  onClose: () => void;
  onCreate: (invoice: any) => void;
}

export function CreateInvoiceModal({ onClose, onCreate }: CreateInvoiceModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientCompany: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    paymentTerms: 'Net 15',
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, unitPrice: 0, total: 0 },
  ]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
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
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.clientEmail || items.some(item => !item.description || item.unitPrice <= 0)) {
      alert('Please fill in all required fields');
      return;
    }

    const { subtotal, tax, total } = calculateTotals();

    const newInvoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      client: {
        name: formData.clientName,
        email: formData.clientEmail,
        company: formData.clientCompany,
      },
      date: formData.date,
      dueDate: formData.dueDate,
      items: items,
      subtotal,
      tax,
      total,
      status: 'draft',
      paymentTerms: formData.paymentTerms,
    };

    onCreate(newInvoice);
    onClose();
  };

  const { subtotal, tax, total } = calculateTotals();

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
            <div className="w-16 h-16 bg-gradient-to-br from-accent-pink to-accent-cyan rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-transparent">
              Create New Invoice
            </h2>
            <p className="text-secondary mt-2">Fill in the details for your new invoice</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Information */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary mb-4">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-secondary">Client Name *</label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-secondary">Client Email *</label>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-secondary">Company</label>
                      <input
                        type="text"
                        value={formData.clientCompany}
                        onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-secondary">Payment Terms</label>
                      <select
                        value={formData.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      >
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Due on Receipt">Due on Receipt</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Invoice Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary">Invoice Items</h3>
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
                        <div className="col-span-6">
                          <label className="block text-sm font-medium mb-2 text-secondary">Description *</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            placeholder="e.g. Web Development Services"
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
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2 text-secondary">Total</label>
                          <div className="px-3 py-2 bg-surface-card border border-default rounded-lg text-primary font-medium">
                            ${item.total.toFixed(2)}
                          </div>
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="mt-2 text-status-danger text-sm hover:underline"
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
                  <h3 className="text-lg font-bold text-primary mb-4">Invoice Totals</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Subtotal:</span>
                      <span className="text-primary font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Tax (10%):</span>
                      <span className="text-primary font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-default pt-2">
                      <span className="text-primary font-bold">Total:</span>
                      <span className="text-primary font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Create Invoice
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