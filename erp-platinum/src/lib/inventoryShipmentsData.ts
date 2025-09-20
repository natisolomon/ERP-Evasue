// src/lib/inventoryShipmentsData.ts
export interface InventoryShipment {
  id: string;
  shipmentNumber: string;
  type: 'incoming' | 'outgoing';
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  carrier: string;
  trackingNumber: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippedDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  notes?: string;
}

export const mockShipments: InventoryShipment[] = [
  {
    id: 'ship1',
    shipmentNumber: 'SHIP-2024-001',
    type: 'incoming',
    status: 'delivered',
    origin: 'TechSupply Inc., New York',
    destination: 'Warehouse A, Chicago',
    carrier: 'FedEx',
    trackingNumber: 'FX1234567890',
    items: [
      {
        productId: 'prod1',
        productName: 'Wireless Headphones',
        quantity: 50,
        unitPrice: 85.00,
        total: 4250.00,
      },
      {
        productId: 'prod2',
        productName: 'Bluetooth Speaker',
        quantity: 30,
        unitPrice: 50.00,
        total: 1500.00,
      },
    ],
    subtotal: 5750.00,
    shippingCost: 150.00,
    total: 5900.00,
    shippedDate: '2024-05-10',
    estimatedDelivery: '2024-05-15',
    actualDelivery: '2024-05-14',
    notes: 'Delivered ahead of schedule',
  },
  {
    id: 'ship2',
    shipmentNumber: 'SHIP-2024-002',
    type: 'outgoing',
    status: 'in_transit',
    origin: 'Warehouse B, Chicago',
    destination: 'Retail Store #5, Los Angeles',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456784',
    items: [
      {
        productId: 'prod3',
        productName: 'Laptop Sleeve',
        quantity: 100,
        unitPrice: 12.00,
        total: 1200.00,
      },
      {
        productId: 'prod1',
        productName: 'Wireless Headphones',
        quantity: 20,
        unitPrice: 129.99,
        total: 2599.80,
      },
    ],
    subtotal: 3799.80,
    shippingCost: 85.00,
    total: 3884.80,
    shippedDate: '2024-05-12',
    estimatedDelivery: '2024-05-18',
    notes: 'Fragile items - handle with care',
  },
  {
    id: 'ship3',
    shipmentNumber: 'SHIP-2024-003',
    type: 'incoming',
    status: 'pending',
    origin: 'CaseMakers Co., Dallas',
    destination: 'Warehouse C, Houston',
    carrier: 'DHL',
    trackingNumber: 'JD0123456789',
    items: [
      {
        productId: 'prod3',
        productName: 'Laptop Sleeve',
        quantity: 200,
        unitPrice: 12.00,
        total: 2400.00,
      },
    ],
    subtotal: 2400.00,
    shippingCost: 120.00,
    total: 2520.00,
    shippedDate: '2024-05-15',
    estimatedDelivery: '2024-05-20',
    notes: 'Expected to ship tomorrow',
  },
];