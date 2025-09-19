// src/components/finance/dashboard/QuickActions.tsx
'use client';

import { motion } from 'framer-motion';
import { Plus, DollarSign, FileText, BarChart3 } from 'lucide-react';

const quickActions = [
  {
    title: 'Record Transaction',
    description: 'Add a new income or expense',
    icon: Plus,
    color: 'from-accent-cyan to-accent-pink',
  },
  {
    title: 'Create Invoice',
    description: 'Generate and send a new invoice',
    icon: FileText,
    color: 'from-accent-pink to-accent-purple',
  },
  {
    title: 'Run Report',
    description: 'Generate financial statements',
    icon: BarChart3,
    color: 'from-accent-purple to-accent-cyan',
  },
  {
    title: 'Set Budget',
    description: 'Define budget for next quarter',
    icon: DollarSign,
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