// src/components/admin/AdminHeader.tsx
'use client'; // ✅ MUST be first line

import { useTheme } from '@/components/layout/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

export function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl lg:hidden text-secondary hover:text-accent-cyan transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page Title */}
          <h2 className="text-xl font-bold hidden lg:block">Admin Dashboard</h2>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-surface-hover text-secondary hover:text-accent-cyan transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-sm border-2 border-surface-bg">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}