// src/lib/financeUserData.ts
export interface FinanceTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  reference: string;
}

export interface FinanceInvoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    company: string;
  };
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  paymentTerms: string;
}

// Mock Transactions
export const mockTransactions: FinanceTransaction[] = [
  {
    id: 'txn1',
    date: '2024-05-15',
    description: 'Client Payment - Project Alpha',
    category: 'Revenue',
    type: 'income',
    amount: 15000,
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-2024-001',
  },
  {
    id: 'txn2',
    date: '2024-05-14',
    description: 'Office Rent - May 2024',
    category: 'Expenses',
    type: 'expense',
    amount: 5000,
    status: 'completed',
    paymentMethod: 'Credit Card',
    reference: 'REF-2024-002',
  },
  {
    id: 'txn3',
    date: '2024-05-13',
    description: 'Consulting Fee - Beta Corp',
    category: 'Revenue',
    type: 'income',
    amount: 8500,
    status: 'pending',
    paymentMethod: 'PayPal',
    reference: 'REF-2024-003',
  },
  {
    id: 'txn4',
    date: '2024-05-12',
    description: 'Software Subscription',
    category: 'Expenses',
    type: 'expense',
    amount: 299,
    status: 'failed',
    paymentMethod: 'Credit Card',
    reference: 'REF-2024-004',
  },
];

// Mock Invoices
export const mockInvoices: FinanceInvoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-001',
    client: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      company: 'TechCorp Inc.',
    },
    date: '2024-05-01',
    dueDate: '2024-05-15',
    items: [
      {
        description: 'Web Development Services',
        quantity: 1,
        unitPrice: 12000,
        total: 12000,
      },
      {
        description: 'Hosting (1 year)',
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
      },
    ],
    subtotal: 13200,
    tax: 1320,
    total: 14520,
    status: 'paid',
    paymentTerms: 'Net 15',
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-002',
    client: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@startup.com',
      company: 'Startup Labs',
    },
    date: '2024-05-05',
    dueDate: '2024-05-20',
    items: [
      {
        description: 'UI/UX Design Services',
        quantity: 1,
        unitPrice: 8000,
        total: 8000,
      },
    ],
    subtotal: 8000,
    tax: 800,
    total: 8800,
    status: 'sent',
    paymentTerms: 'Net 15',
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-003',
    client: {
      name: 'Mike Davis',
      email: 'mike.davis@agency.com',
      company: 'Creative Agency',
    },
    date: '2024-05-10',
    dueDate: '2024-05-25',
    items: [
      {
        description: 'Marketing Consultation',
        quantity: 5,
        unitPrice: 1500,
        total: 7500,
      },
    ],
    subtotal: 7500,
    tax: 750,
    total: 8250,
    status: 'draft',
    paymentTerms: 'Net 15',
  },
];