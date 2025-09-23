// src/components/hr/dashboard/RecentActivities.tsx
'use client';

import { motion } from 'framer-motion';
import { User, Calendar, FileText, Star } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'staff',
    message: 'John Doe completed onboarding',
    time: '2 hours ago',
    icon: User,
  },
  {
    id: 2,
    type: 'leave',
    message: 'Jane Smith requested vacation leave',
    time: '5 hours ago',
    icon: Calendar,
  },
  {
    id: 3,
    type: 'review',
    message: 'Mike Johnson received performance review',
    time: '1 day ago',
    icon: Star,
  },
  {
    id: 4,
    type: 'document',
    message: 'New policy document uploaded',
    time: '1 day ago',
    icon: FileText,
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