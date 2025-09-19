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

  if (isInventoryPage) {
    // Don't wrap with Header/Footer for inventory pages
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