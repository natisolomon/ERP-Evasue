// src/components/admin/AdminActivityFeed.tsx
'use client';

import { motion } from "framer-motion";

interface Activity {
  user: string;
  action: string;
  time: string;
  avatar: string;
}

interface AdminActivityFeedProps {
  activities: Activity[];
}

export function AdminActivityFeed({ activities }: AdminActivityFeedProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-sm">
            {activity.avatar}
          </div>
          <div className="flex-1">
            <p className="text-primary">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-tertiary text-sm">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}