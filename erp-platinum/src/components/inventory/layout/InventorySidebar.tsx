// src/components/inventory/layout/InventorySidebar.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

// Define sidebar items based on user role
// For now, we'll show all — you can filter by role later
const sidebarItems = [
  { name: 'Dashboard', href: '/inventory', icon: LayoutDashboard },
  { name: 'My Products', href: '/inventory/products', icon: Package },
  { name: 'Shipments', href: '/inventory/shipments', icon: Truck },
  { name: 'Orders', href: '/inventory/orders', icon: FileText },
  { name: 'Reports', href: '/inventory/reports', icon: FileText },
  { name: 'Help', href: '/inventory/help', icon: HelpCircle },
  { name: 'Settings', href: '/inventory/settings', icon: Settings },
];

export function InventorySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-card border-r border-default flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-default">
        <h1 className="text-xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
          Inventory Portal
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
                      ? 'bg-accent-cyan/10 text-accent-cyan border-r-2 border-accent-cyan'
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