// src/components/finance/invoices/FinanceInvoiceModal/ViewInvoiceModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Mail, Printer, Download } from 'lucide-react';
import { FinanceInvoice } from '@/lib/financeUserData';


interface ViewInvoiceModalProps {
  invoice: FinanceInvoice;
  onClose: () => void;
}

export function ViewInvoiceModal({ invoice, onClose }: ViewInvoiceModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSend = () => {
    alert(`Sending invoice ${invoice.invoiceNumber} to ${invoice.client.email}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading invoice ${invoice.invoiceNumber} as PDF`);
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
              Invoice Details
            </h2>
            <p className="text-secondary mt-2">View all details for this invoice</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary">{invoice.invoiceNumber}</h1>
                  <p className="text-secondary">Issued: {invoice.date}</p>
                  <p className="text-secondary">Due: {invoice.dueDate}</p>
                </div>
                <div className="text-right">
                  <span className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    ${
                      invoice.status === 'paid'
                        ? 'bg-accent-success/20 text-accent-success'
                        : invoice.status === 'sent'
                        ? 'bg-status-warning/20 text-status-warning'
                        : invoice.status === 'draft'
                        ? 'bg-accent-cyan/20 text-accent-cyan'
                        : 'bg-status-danger/20 text-status-danger'
                    }
                  `}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">Bill To</h3>
                  <div className="space-y-2">
                    <p className="text-primary font-medium">{invoice.client.name}</p>
                    <p className="text-secondary">{invoice.client.email}</p>
                    <p className="text-secondary">{invoice.client.company}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">Payment Details</h3>
                  <div className="space-y-2">
                    <p className="text-secondary">Payment Terms: <span className="text-primary font-medium">{invoice.paymentTerms}</span></p>
                    <p className="text-secondary">Due Date: <span className="text-primary font-medium">{invoice.dueDate}</span></p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">Invoice Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-default">
                        <th className="text-left p-3 font-medium text-secondary">Description</th>
                        <th className="text-right p-3 font-medium text-secondary">Qty</th>
                        <th className="text-right p-3 font-medium text-secondary">Unit Price</th>
                        <th className="text-right p-3 font-medium text-secondary">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, i) => (
                        <tr key={i} className="border-b border-default/50">
                          <td className="p-3 text-primary">{item.description}</td>
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
                <h3 className="text-lg font-bold text-primary mb-4">Invoice Totals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary">Subtotal:</span>
                    <span className="text-primary font-medium">${invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Tax:</span>
                    <span className="text-primary font-medium">${invoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-default pt-2">
                    <span className="text-primary font-bold">Total:</span>
                    <span className="text-primary font-bold">${invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSend}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Mail size={18} />
                Send Invoice
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              className="px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Download size={18} />
                Download PDF
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrint}
              className="px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Printer size={18} />
                Print
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}