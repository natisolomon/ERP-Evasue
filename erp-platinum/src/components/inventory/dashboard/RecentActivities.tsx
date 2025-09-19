// src/components/inventory/dashboard/RecentActivities.tsx
'use client';

import { motion } from 'framer-motion';
import { Package, Truck, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'shipment',
    message: 'Shipment #SH2024-058 delivered to Warehouse B',
    time: '2 hours ago',
    icon: Truck,
  },
  {
    id: 2,
    type: 'product',
    message: 'Product "Wireless Headphones" stock updated to 150 units',
    time: '5 hours ago',
    icon: Package,
  },
  {
    id: 3,
    type: 'alert',
    message: 'Low stock alert for "Bluetooth Speakers"',
    time: '1 day ago',
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: 'shipment',
    message: 'New shipment #SH2024-059 scheduled for tomorrow',
    time: '1 day ago',
    icon: Truck,
  },
];

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors"
          >
            <div className="p-2 rounded-lg bg-white/10">
              <Icon size={16} className="text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary">{activity.message}</p>
              <p className="text-xs text-secondary mt-1">{activity.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}