// src/components/finance/dashboard/FinanceUserStatCard.tsx
'use client';

import { motion } from 'framer-motion';

interface FinanceUserStatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  variant: 'cyan' | 'green' | 'pink' | 'amber' | 'purple';
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DollarSign: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  TrendingDown: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
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
  BarChart3: ({ size = 24, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
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

export function FinanceUserStatCard({
  title,
  value,
  trend,
  icon,
  variant,
}: FinanceUserStatCardProps) {
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