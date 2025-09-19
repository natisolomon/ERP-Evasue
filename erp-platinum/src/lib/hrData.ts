// src/lib/hrData.ts

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  performanceRating: number; // 1-5
  lastReviewDate: string;
  manager: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 'emp_001',
    firstName: 'Sarah',
    lastName: 'Lin',
    email: 'sarah.lin@company.com',
    phone: '+1-555-1234',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    hireDate: '2023-03-15',
    salary: 125000,
    status: 'active',
    performanceRating: 4.8,
    lastReviewDate: '2025-08-15',
    manager: 'James Wu',
  },
  {
    id: 'emp_002',
    firstName: 'James',
    lastName: 'Wu',
    email: 'james.wu@company.com',
    phone: '+1-555-5678',
    department: 'Finance',
    position: 'CFO',
    hireDate: '2022-01-10',
    salary: 185000,
    status: 'active',
    performanceRating: 4.9,
    lastReviewDate: '2025-07-20',
    manager: 'CEO',
  },
  {
    id: 'emp_003',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@company.com',
    phone: '+1-555-9012',
    department: 'Marketing',
    position: 'Marketing Manager',
    hireDate: '2023-08-22',
    salary: 95000,
    status: 'active',
    performanceRating: 4.5,
    lastReviewDate: '2025-09-01',
    manager: 'Sarah Lin',
  },
  {
    id: 'emp_004',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@company.com',
    phone: '+1-555-3456',
    department: 'HR',
    position: 'HR Specialist',
    hireDate: '2024-02-18',
    salary: 75000,
    status: 'on_leave',
    performanceRating: 4.2,
    lastReviewDate: '2025-06-15',
    manager: 'James Wu',
  },
  {
    id: 'emp_005',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.com',
    phone: '+1-555-7890',
    department: 'Sales',
    position: 'Sales Director',
    hireDate: '2022-11-30',
    salary: 145000,
    status: 'active',
    performanceRating: 4.7,
    lastReviewDate: '2025-08-30',
    manager: 'CEO',
  },
];

export const departmentDistribution = [
  { name: 'Engineering', value: 40, color: 'bg-accent-cyan' },
  { name: 'Sales', value: 25, color: 'bg-accent-purple' },
  { name: 'Marketing', value: 15, color: 'bg-accent-pink' },
  { name: 'Finance', value: 10, color: 'bg-status-warning' },
  { name: 'HR', value: 10, color: 'bg-status-danger' },
];

export const headcountTrend = [120, 135, 142, 158, 165, 180, 192, 205, 218, 230, 245, 260];
export const salaryTrend = [8500000, 9200000, 9800000, 10500000, 11200000, 12000000, 12800000, 13500000, 14200000, 15000000, 15800000, 16500000];