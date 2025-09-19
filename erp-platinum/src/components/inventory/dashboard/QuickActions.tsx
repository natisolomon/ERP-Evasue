// src/components/inventory/dashboard/QuickActions.tsx
'use client';

import { motion } from 'framer-motion';
import { Plus, Package, Truck, FileText } from 'lucide-react';

const quickActions = [
  {
    title: 'Add New Product',
    description: 'Register a new product in inventory',
    icon: Plus,
    color: 'from-accent-cyan to-accent-purple',
  },
  {
    title: 'Record Shipment',
    description: 'Log a new incoming/outgoing shipment',
    icon: Truck,
    color: 'from-accent-purple to-accent-pink',
  },
  {
    title: 'Update Stock',
    description: 'Adjust inventory levels for existing products',
    icon: Package,
    color: 'from-accent-pink to-accent-cyan',
  },
  {
    title: 'Generate Report',
    description: 'Create inventory or shipment reports',
    icon: FileText,
    color: 'from-accent-success to-accent-cyan',
  },
];

export function QuickActions() {
  return (
    <div className="glass rounded-3xl p-6 border border-default mb-10">
      <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`
                p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white text-left
                shadow-lg hover:shadow-xl transition-all
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon size={20} />
                <h4 className="font-bold text-sm">{action.title}</h4>
              </div>
              <p className="text-white/90 text-xs">{action.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}