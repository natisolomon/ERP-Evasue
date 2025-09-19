// src/components/admin/inventory/InventoryStatCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Boxes, AlertTriangle, DollarSign, RefreshCw } from 'lucide-react';

interface InventoryStatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  variant: 'cyan' | 'green' | 'pink' | 'amber' | 'purple';
}

const iconMap = {
  Boxes,
  AlertTriangle,
  DollarSign,
  RefreshCw,
};

const variantClasses = {
  cyan: 'bg-card-accent-cyan border-accent-cyan/30 text-accent-cyan',
  green: 'bg-card-accent-green border-accent-success/30 text-accent-success',
  pink: 'bg-card-accent-pink border-accent-pink/30 text-accent-pink',
  amber: 'bg-card-accent-amber border-status-warning/30 text-status-warning',
  purple: 'bg-card-accent-purple border-accent-purple/30 text-accent-purple',
};

const iconBgClasses = {
  cyan: 'bg-accent-cyan/10 border-accent-cyan/30',
  green: 'bg-accent-success/10 border-accent-success/30',
  pink: 'bg-accent-pink/10 border-accent-pink/30',
  amber: 'bg-status-warning/10 border-status-warning/30',
  purple: 'bg-accent-purple/10 border-accent-purple/30',
};

export function InventoryStatCard({
  title,
  value,
  trend,
  icon,
  variant,
}: InventoryStatCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const classes = variantClasses[variant];
  const iconBgClass = iconBgClasses[variant];
  const isPositive = trend.startsWith('+');

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        glass glass-hover p-6 border-2 transition-all duration-500 cursor-pointer overflow-hidden
        ${classes}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl border-2 ${iconBgClass}`}>
          <Icon size={24} className={classes.split(' ')[2]} />
        </div>
        <span className={`
          text-sm font-mono font-bold px-3 py-1 rounded-full
          ${
            isPositive
              ? 'bg-accent-success/20 text-accent-success border border-accent-success/30'
              : 'bg-status-danger/20 text-status-danger border border-status-danger/30'
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