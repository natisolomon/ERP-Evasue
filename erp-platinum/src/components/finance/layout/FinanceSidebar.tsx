// src/components/finance/layout/FinanceSidebar.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Dashboard', href: '/finance', icon: LayoutDashboard },
  { name: 'Transactions', href: '/finance/transactions', icon: DollarSign },
  { name: 'Invoices', href: '/finance/invoices', icon: FileText },
  { name: 'Reports', href: '/finance/reports', icon: BarChart3 },
  { name: 'Budget', href: '/finance/budget', icon: BarChart3 },
  { name: 'Help', href: '/finance/help', icon: HelpCircle },
  { name: 'Settings', href: '/finance/settings', icon: Settings },
];

export function FinanceSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-card border-r border-default flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-default">
        <h1 className="text-xl font-bold bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-transparent">
          Finance Portal
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? 'bg-accent-pink/10 text-accent-pink border-r-2 border-accent-pink'
                      : 'text-secondary hover:bg-surface-hover'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}