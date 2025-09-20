// src/lib/inventoryUserData.ts
export interface InventoryProduct {
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
  imageUrl?: string;
}

export const mockProducts: InventoryProduct[] = [
  {
    id: 'prod1',
    name: 'Wireless Headphones',
    sku: 'WH-2024-BLK',
    category: 'Electronics',
    price: 129.99,
    cost: 85.00,
    stock: 47,
    reorderLevel: 20,
    supplier: 'TechSupply Inc.',
    location: 'Warehouse A, Shelf 12',
    status: 'in_stock',
    lastUpdated: '2024-05-15',
    imageUrl: '/images/products/headphones.jpg',
  },
  {
    id: 'prod2',
    name: 'Bluetooth Speaker',
    sku: 'BS-2024-RED',
    category: 'Electronics',
    price: 79.99,
    cost: 50.00,
    stock: 15,
    reorderLevel: 25,
    supplier: 'AudioGear Ltd.',
    location: 'Warehouse B, Shelf 8',
    status: 'low_stock',
    lastUpdated: '2024-05-14',
    imageUrl: '/images/products/speaker.jpg',
  },
  {
    id: 'prod3',
    name: 'Laptop Sleeve',
    sku: 'LS-2024-GRY',
    category: 'Accessories',
    price: 24.99,
    cost: 12.00,
    stock: 128,
    reorderLevel: 50,
    supplier: 'CaseMakers Co.',
    location: 'Warehouse A, Shelf 24',
    status: 'in_stock',
    lastUpdated: '2024-05-13',
    imageUrl: '/images/products/sleeve.jpg',
  },
  {
    id: 'prod4',
    name: 'Wireless Mouse',
    sku: 'WM-2024-SIL',
    category: 'Electronics',
    price: 34.99,
    cost: 20.00,
    stock: 0,
    reorderLevel: 30,
    supplier: 'Peripherals Plus',
    location: 'Warehouse C, Shelf 5',
    status: 'out_of_stock',
    lastUpdated: '2024-05-10',
    imageUrl: '/images/products/mouse.jpg',
  },
];