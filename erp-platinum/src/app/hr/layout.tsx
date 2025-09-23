


// src/app/inventory/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ModalProvider } from '@/components/layout/ModalProvider';
import { HRHeader } from '@/components/hr/layout/HRHeader';
import { HRSidebar } from '@/components/hr/layout/HRSidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    // Full-page login, no header/sidebar
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider>
            <ModalProvider>
              <main className="min-h-screen bg-surface-bg">
                {children}
              </main>
            </ModalProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ModalProvider>
            <div className="flex min-h-screen bg-surface-bg">
              <HRSidebar />
              <div className="flex-1 flex flex-col">
                <HRHeader />
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}