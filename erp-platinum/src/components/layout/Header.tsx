// src/components/layout/Header.tsx
'use client';

import { useTheme } from '@/components/layout/ThemeProvider';
import { Sun, Moon, Menu } from 'lucide-react'; // ✅ Modern icons
import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface-card/5 border-b border-white/10">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              PLATINUM ERP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Inventory', href: '/inventory' },
              { name: 'Finance', href: '/finance' },
              { name: 'HR', href: '/hr' },
              { name: 'Analytics', href: '/analytics' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary hover:text-accent-cyan transition-colors relative group"
              >
                {item.name}
                <m.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-surface-hover transition-colors text-secondary"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </m.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-surface-hover transition-colors text-secondary"
            >
              <Menu size={20} />
            </button>

            {/* CTA Button */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl px-5 py-2.5 text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </m.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Inventory', href: '/inventory' },
                { name: 'Finance', href: '/finance' },
                { name: 'HR', href: '/hr' },
                { name: 'Analytics', href: '/analytics' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 px-4 text-secondary hover:text-accent-cyan transition-colors rounded-lg hover:bg-surface-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </div>
    </header>
  );
}