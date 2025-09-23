// src/components/layout/PublicLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInventoryPage = pathname.startsWith('/inventory');
  const isFinancePage = pathname.startsWith('/finance'); // ✅ Add this line
  const isHRPage = pathname.startsWith('/hr');
  const isPortalPage = isInventoryPage || isFinancePage || isHRPage; // ✅ Update this line

  if (isPortalPage) {
    // Don't wrap with Header/Footer for portal pages
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}