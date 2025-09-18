// src/components/ui/Button.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary:
      'bg-white/10 dark:bg-white/5 text-platinum-text dark:text-light-text border border-white/20 hover:bg-white/20 hover:border-white/40',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}