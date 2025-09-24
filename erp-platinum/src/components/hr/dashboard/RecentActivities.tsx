'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { motion } from 'framer-motion';
import { User, Calendar, FileText, Star } from 'lucide-react';

// Helper to format time ago (simple version)
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return 'just now';
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export function RecentActivities() {
  const staff = useSelector((state: RootState) => state.staff.staff);
  const onboardings = useSelector((state: RootState) => state.onboarding.onboardings);
  const leaveRequests = useSelector((state: RootState) => state.leaveRequest.requests);

  // Example: combine recent onboarding and leave request activities
  const activities = [
    ...onboardings.map((o) => {
      const s = staff.find(st => st.id === o.staffId);
      return {
        id: `onboarding-${o.id}`,
        type: 'staff',
        message: `${s ? `${s.firstName} ${s.lastName}` : 'A staff member'} completed onboarding`,
        time: timeAgo(o.startDate),
        icon: User,
      };
    }),
    ...leaveRequests.map((l) => {
      const s = staff.find(st => st.id === l.staffId);
      return {
        id: `leave-${l.id}`,
        type: 'leave',
        message: `${s ? `${s.firstName} ${s.lastName}` : 'A staff member'} requested ${l.reason || 'leave'}`,
        time: timeAgo(l.startDate),
        icon: Calendar,
      };
    }),
    // Add more activity sources as needed
  ]
    // Sort by most recent (assuming startDate is ISO string)
    .sort((a, b) => (new Date(b.time).getTime() - new Date(a.time).getTime()))
    .slice(0, 8); // Show only the latest 8

  return (
    <div className="space-y-4">
      {activities.length === 0 && (
        <div className="text-secondary text-sm">No recent activities.</div>
      )}
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