// src/components/hr/layout/HRSidebar.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  Star,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Dashboard', href: '/hr', icon: LayoutDashboard },
  { name: 'Staff List', href: '/hr/staff', icon: Users },
  { name: 'Attendance', href: '/hr/attendance', icon: Calendar },
  { name: 'Leave Requests', href: '/hr/leave-requests', icon: FileText },
  { name: 'Onboarding', href: '/hr/onboarding', icon: GraduationCap },
  { name: 'Performance', href: '/hr/performance', icon: Star },
  { name: 'Help', href: '/hr/help', icon: HelpCircle },
  { name: 'Settings', href: '/hr/settings', icon: Settings },
];

export function HRSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-card border-r border-default flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-default">
        <h1 className="text-xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
          HR Portal
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