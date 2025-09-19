// src/app/finance/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ModalProvider } from '@/components/layout/ModalProvider';
import { FinanceHeader } from '@/components/finance/layout/FinanceHeader';
import { FinanceSidebar } from '@/components/finance/layout/FinanceSidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/finance/login';

  if (isLoginPage) {
    // ✅ For login page, just render children (no sidebar/header)
    return (
      <ThemeProvider>
        <ModalProvider>
          <main className="min-h-screen bg-surface-bg">
            {children}
          </main>
        </ModalProvider>
      </ThemeProvider>
    );
  }

  // ✅ For all other finance pages, render sidebar + header + content
  return (
    <ThemeProvider>
      <ModalProvider>
        <div className="flex min-h-screen bg-surface-bg">
          <FinanceSidebar />
          <div className="flex-1 flex flex-col">
            <FinanceHeader />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}