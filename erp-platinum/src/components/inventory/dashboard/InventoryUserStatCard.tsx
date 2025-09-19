// src/components/inventory/dashboard/InventoryUserStatCard.tsx
'use client';

import { motion } from 'framer-motion';

interface InventoryUserStatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  variant: 'cyan' | 'green' | 'pink' | 'amber' | 'purple';
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Package: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Truck: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  ),
  AlertTriangle: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  FileText: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
};

const variantClasses = {
  cyan: 'from-accent-cyan/10 to-transparent border-accent-cyan/20 text-accent-cyan',
  green: 'from-accent-success/10 to-transparent border-accent-success/20 text-accent-success',
  pink: 'from-accent-pink/10 to-transparent border-accent-pink/20 text-accent-pink',
  amber: 'from-status-warning/10 to-transparent border-status-warning/20 text-status-warning',
  purple: 'from-accent-purple/10 to-transparent border-accent-purple/20 text-accent-purple',
};

export function InventoryUserStatCard({
  title,
  value,
  trend,
  icon,
  variant,
}: InventoryUserStatCardProps) {
  const Icon = iconMap[icon];
  const classes = variantClasses[variant];
  const isPositive = trend.startsWith('+');

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
            isPositive
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