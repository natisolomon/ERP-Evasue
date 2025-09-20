// src/components/finance/layout/FinanceHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { Bell, Search, User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { useRouter } from 'next/navigation';

export function FinanceHeader() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // ✅ Use the theme context

  const handleLogout = () => {
    // TODO: Add logout logic
    router.push('/finance/login');
  };

  return (
    <header className="bg-surface-card border-b border-default shadow-sm">
      <div className="flex items-center justify-between p-4 md:p-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-primary">
            Finance Portal
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 bg-surface-hover border border-default rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-danger rounded-full text-[10px] flex items-center justify-center text-white font-bold">
              5
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-blue-600" />
            )}
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-primary">Sarah Chen</p>
              <p className="text-xs text-secondary">Financial Analyst</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-surface-hover hover:bg-surface-hover/80 transition-colors text-secondary"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}