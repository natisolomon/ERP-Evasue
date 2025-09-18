// src/lib/financeData.ts

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    date: '2025-09-15',
    description: 'Client Payment - Project Alpha',
    category: 'Revenue',
    type: 'income',
    amount: 12500.00,
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'txn_002',
    date: '2025-09-14',
    description: 'AWS Cloud Services',
    category: 'Infrastructure',
    type: 'expense',
    amount: 847.50,
    status: 'completed',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'txn_003',
    date: '2025-09-13',
    description: 'Monthly Salary - John Doe',
    category: 'Payroll',
    type: 'expense',
    amount: 5000.00,
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'txn_004',
    date: '2025-09-12',
    description: 'New Client Onboarding',
    category: 'Revenue',
    type: 'income',
    amount: 8900.00,
    status: 'pending',
    paymentMethod: 'Stripe',
  },
  {
    id: 'txn_005',
    date: '2025-09-11',
    description: 'Office Rent - September',
    category: 'Overhead',
    type: 'expense',
    amount: 3200.00,
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
];

export const expenseCategories = [
  { name: 'Payroll', value: 60, color: 'bg-accent-cyan' },
  { name: 'Infrastructure', value: 25, color: 'bg-accent-purple' },
  { name: 'Marketing', value: 10, color: 'bg-accent-pink' },
  { name: 'Overhead', value: 5, color: 'bg-status-warning' },
];

export const revenueTrend = [120, 140, 135, 160, 155, 180, 200, 220, 210, 240, 260, 280];
export const expenseTrend = [80, 90, 85, 100, 95, 110, 105, 120, 115, 130, 125, 140];