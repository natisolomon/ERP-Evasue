// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ModalProvider } from '@/components/layout/ModalProvider';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Platinum ERP',
  description: 'Enterprise Resource Planning — Reimagined',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ModalProvider>
            <div className="flex min-h-screen flex-col">
              <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}