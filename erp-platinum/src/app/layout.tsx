// src/app/layout.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        {/* ✅ Wrap entire app with Redux Provider */}
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}