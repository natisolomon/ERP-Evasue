// src/components/layout/AdminLayout.tsx
'use client';

import { useTheme } from '@/components/layout/ThemeProvider';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useState, useEffect } from 'react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!mounted) return <div>{children}</div>;

  return (
    <div className="min-h-screen bg-surface-bg text-primary">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 border transition-transform duration-300 ease-in-out
          ${theme === 'dark' ? 'bg-platinum-bg border-platinum-border' : 'bg-light-surface border-light-border'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
        {/* ❌ NO FOOTER HERE */}
      </div>
    </div>
  );
}