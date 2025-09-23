// src/components/hr/dashboard/QuickActions.tsx
'use client';

import { motion } from 'framer-motion';
import { Plus, User, Calendar, FileText, Star } from 'lucide-react';

const quickActions = [
  {
    title: 'Add New Staff',
    description: 'Onboard a new team member',
    icon: Plus,
    color: 'from-accent-cyan to-accent-purple',
  },
  {
    title: 'Record Attendance',
    description: 'Mark staff attendance for today',
    icon: Calendar,
    color: 'from-accent-purple to-accent-pink',
  },
  {
    title: 'Approve Leave',
    description: 'Review pending leave requests',
    icon: FileText,
    color: 'from-accent-pink to-accent-cyan',
  },
  {
    title: 'Start Review',
    description: 'Initiate performance review',
    icon: Star,
    color: 'from-accent-success to-accent-cyan',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4">
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
  );
}