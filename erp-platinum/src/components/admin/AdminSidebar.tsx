// src/components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Boxes,
  ListTodo,
  BarChart3,
  Headphones,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// ✅ Updated Navigation Items
const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Finance', href: '/admin/finance', icon: DollarSign },
  { name: 'Human Resource', href: '/admin/hr', icon: Users },
  { name: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { name: 'Task Management', href: '/admin/tasks', icon: ListTodo },
  { name: 'Reports and Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Customer Service CRM', href: '/admin/crm', icon: Headphones },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full pt-8 pb-6 px-6">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple"></div>
          <span className="hidden lg:block text-lg font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            PLATINUM ADMIN
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-4 px-3 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 text-accent-cyan shadow-lg'
                    : 'text-secondary hover:bg-surface-hover hover:text-accent-cyan'
                }
              `}
            >
              <Icon size={20} className={isActive ? 'text-accent-cyan' : 'group-hover:text-accent-cyan'} />
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Footer */}
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-hover border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-sm">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-primary">John Doe</p>
            <p className="text-xs text-secondary">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}