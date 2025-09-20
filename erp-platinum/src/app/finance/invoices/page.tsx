// src/app/finance/invoices/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FinanceInvoiceTable } from '@/components/finance/invoice/FinanceInvoiceTable';
import { FinanceInvoiceFilters } from '@/components/finance/invoice/FinanceInvoiceFilters';
import { CreateInvoiceModal } from '@/components/finance/invoice/modals/CreateInvoiceModal';
import { useModal } from '@/components/layout/ModalProvider';
import { mockInvoices } from '@/lib/financeUserData';

export default function FinanceInvoicesPage() {
  const [filters, setFilters] = useState({
    status: 'all',
    client: 'all',
    search: '',
  });

  const [invoices, setInvoices] = useState(mockInvoices);

  const filteredInvoices = invoices.filter(invoice => {
    if (filters.status !== 'all' && invoice.status !== filters.status) return false;
    if (filters.client !== 'all' && !invoice.client.name.toLowerCase().includes(filters.client.toLowerCase())) return false;
    if (filters.search && !invoice.invoiceNumber.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const { openModal, closeModal } = useModal();

  const handleCreateInvoice = (newInvoice: any) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const handleOpenCreateModal = () => {
    openModal(
      <CreateInvoiceModal
        onClose={closeModal}
        onCreate={handleCreateInvoice}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          Invoices
        </h1>
        <p className="text-secondary mt-2">Manage your client invoices</p>
      </div>

      {/* Filters */}
      <FinanceInvoiceFilters filters={filters} setFilters={setFilters} />

      {/* Invoices Table */}
      <div className="glass rounded-3xl p-6 border border-default mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Invoice Management</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-gradient-to-r from-accent-pink to-accent-cyan text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            + Create Invoice
          </motion.button>
        </div>
        <FinanceInvoiceTable invoices={filteredInvoices} />
      </div>
    </div>
  );
}