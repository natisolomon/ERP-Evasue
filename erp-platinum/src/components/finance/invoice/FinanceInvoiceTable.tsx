// src/components/finance/invoices/FinanceInvoiceTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, FileText } from 'lucide-react';
import { FinanceInvoice } from '@/lib/financeUserData';
import { useModal } from '@/components/layout/ModalProvider';
import { ViewInvoiceModal } from './modals/ViewInvoiceModal';
import { EditInvoiceModal } from './modals/EditInvoiceModal';
import { DeleteInvoiceModal } from './modals/DeleteInvoiceModal';

interface FinanceInvoiceTableProps {
  invoices: FinanceInvoice[];
}

export function FinanceInvoiceTable({ invoices }: FinanceInvoiceTableProps) {
  const { openModal, closeModal } = useModal();

  const handleView = (invoice: FinanceInvoice) => {
    openModal(<ViewInvoiceModal invoice={invoice} onClose={closeModal} />);
  };

  const handleEdit = (invoice: FinanceInvoice) => {
    openModal(<EditInvoiceModal invoice={invoice} onClose={closeModal} />);
  };

  const handleDelete = (invoice: FinanceInvoice) => {
    openModal(<DeleteInvoiceModal invoice={invoice} onClose={closeModal} />);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-strong">
            <th className="text-left p-4 font-medium text-secondary">Invoice #</th>
            <th className="text-left p-4 font-medium text-secondary">Client</th>
            <th className="text-left p-4 font-medium text-secondary">Date</th>
            <th className="text-left p-4 font-medium text-secondary">Due Date</th>
            <th className="text-left p-4 font-medium text-secondary">Amount</th>
            <th className="text-left p-4 font-medium text-secondary">Status</th>
            <th className="text-right p-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, i) => (
            <motion.tr
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border-b border-default/50 hover:bg-surface-hover transition-colors"
            >
              <td className="p-4 font-medium text-primary">{invoice.invoiceNumber}</td>
              <td className="p-4">
                <div>
                  <div className="font-medium text-primary">{invoice.client.name}</div>
                  <div className="text-secondary text-sm">{invoice.client.company}</div>
                </div>
              </td>
              <td className="p-4 text-primary">{invoice.date}</td>
              <td className="p-4">
                <div className={`
                  ${new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' ? 'text-status-danger font-bold' : 'text-primary'}
                `}>
                  {invoice.dueDate}
                </div>
              </td>
              <td className="p-4 font-medium text-primary">${invoice.total.toLocaleString()}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
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
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleView(invoice)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(invoice)}
                    className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(invoice)}
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