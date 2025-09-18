// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
          <div className="flex min-h-screen flex-col">
            <Header />        {/* ✅ Only for non-admin routes */}
            <main className="flex-1">{children}</main>
            <Footer />        {/* ✅ Only for non-admin routes */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}