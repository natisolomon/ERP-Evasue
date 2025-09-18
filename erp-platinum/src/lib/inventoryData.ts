// src/lib/inventoryData.ts

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
  supplier: string;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Wireless Headphones Pro',
    sku: 'WH-8812',
    category: 'Electronics',
    price: 129.99,
    cost: 65.50,
    stock: 42,
    reorderLevel: 10,
    supplier: 'TechSupply Inc.',
    location: 'Warehouse A, Shelf 3B',
    status: 'in_stock',
    lastUpdated: '2025-09-15',
  },
  {
    id: 'prod_002',
    name: 'Premium Cotton T-Shirt',
    sku: 'CT-4471',
    category: 'Apparel',
    price: 24.99,
    cost: 8.75,
    stock: 180,
    reorderLevel: 50,
    supplier: 'Fashion Textiles Ltd.',
    location: 'Warehouse B, Shelf 7A',
    status: 'in_stock',
    lastUpdated: '2025-09-14',
  },
  {
    id: 'prod_003',
    name: 'Stainless Steel Water Bottle',
    sku: 'SS-9923',
    category: 'Accessories',
    price: 34.99,
    cost: 12.30,
    stock: 89,
    reorderLevel: 20,
    supplier: 'EcoProducts Co.',
    location: 'Warehouse A, Shelf 1C',
    status: 'in_stock',
    lastUpdated: '2025-09-13',
  },
  {
    id: 'prod_004',
    name: 'Mechanical Gaming Keyboard',
    sku: 'MK-1029',
    category: 'Electronics',
    price: 89.99,
    cost: 45.20,
    stock: 12,
    reorderLevel: 15,
    supplier: 'GamerGear Pro',
    location: 'Warehouse C, Shelf 2D',
    status: 'low_stock',
    lastUpdated: '2025-09-12',
  },
  {
    id: 'prod_005',
    name: "Men's Denim Jeans",
    sku: 'DJ-3388',
    category: 'Apparel',
    price: 49.99,
    cost: 18.90,
    stock: 67,
    reorderLevel: 30,
    supplier: 'Denim Masters',
    location: 'Warehouse B, Shelf 5E',
    status: 'in_stock',
    lastUpdated: '2025-09-11',
  },
];

export const categoryDistribution = [
  { name: 'Electronics', value: 45, color: 'bg-accent-cyan' },
  { name: 'Apparel', value: 35, color: 'bg-accent-purple' },
  { name: 'Accessories', value: 15, color: 'bg-accent-pink' },
  { name: 'Other', value: 5, color: 'bg-status-warning' },
];

export const stockTrend = [120, 140, 135, 160, 155, 180, 200, 190, 210, 230, 220, 250];
export const valueTrend = [8500, 9200, 8900, 10500, 11200, 12800, 14500, 13800, 15200, 16800, 16200, 18500];