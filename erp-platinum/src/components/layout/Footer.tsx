// src/components/layout/Footer.tsx
'use client';

import { m } from 'framer-motion'; // ✅ FIXED: use "m" not "motion"
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-background-dark to-transparent border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-400"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                PLATINUM ERP
              </span>
            </div>
            <p className="text-text-tertiary leading-relaxed mb-6 max-w-md">
              Enterprise Resource Planning, reimagined for modern businesses.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <m.a // ✅ FIXED: use "m.a" not "motion.a"
                  key={social}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="text-text-tertiary hover:text-primary-400 transition-colors"
                >
                  {social}
                </m.a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6">Product</h3>
            <ul className="space-y-3">
              {[
                { name: 'Features', href: '/features' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Inventory', href: '/inventory' },
                { name: 'Finance', href: '/finance' },
                { name: 'Analytics', href: '/analytics' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Security', href: '/security' },
                { name: 'Compliance', href: '/compliance' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-tertiary hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} Platinum ERP. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="text-text-tertiary text-sm">v1.0.0</span>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse"></div>
              <span className="text-success-400 text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}