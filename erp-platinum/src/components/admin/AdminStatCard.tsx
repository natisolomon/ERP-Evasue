// src/components/admin/AdminStatCard.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Activity,
  AlertTriangle,
  Database,
} from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  variant: 'cyan' | 'green' | 'amber' | 'purple';
}

const iconMap = {
  Users,
  Activity,
  AlertTriangle,
  Database,
};

const variantClasses = {
  cyan: 'from-accent-cyan/10 to-transparent border-accent-cyan/20 text-accent-cyan',
  green: 'from-accent-success/10 to-transparent border-accent-success/20 text-accent-success',
  amber: 'from-status-warning/10 to-transparent border-status-warning/20 text-status-warning',
  purple: 'from-accent-purple/10 to-transparent border-accent-purple/20 text-accent-purple',
};

export function AdminStatCard({
  title,
  value,
  trend,
  icon,
  variant,
}: AdminStatCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const classes = variantClasses[variant];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        glass rounded-3xl p-6 border transition-all duration-500 cursor-pointer overflow-hidden
        hover:-translate-y-1 ${classes}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-white/10">
          <Icon size={24} className={variantClasses[variant].split(' ')[2]} />
        </div>
        <span className={`
          text-sm font-mono font-bold px-3 py-1 rounded-full
          ${
            trend.startsWith('+')
              ? 'bg-accent-success/20 text-accent-success'
              : 'bg-status-danger/20 text-status-danger'
          }
        `}>
          {trend}
        </span>
      </div>

      <h3 className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">
        {title}
      </h3>

      <div className="relative h-8">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold"
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  );
}