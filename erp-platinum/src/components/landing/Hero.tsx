// src/components/landing/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { heroContent } from '@/lib/constant';

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradients (Debug: Add border to see if section renders) */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-cyan/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tl from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {/* ✅ DEBUG: Add border to confirm section is rendering */}
            <div className="p-8 border-2 border-red-500 mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent mb-6"
              >
                {heroContent.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-secondary mb-10 leading-relaxed"
              >
                {heroContent.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className="px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                  {heroContent.primaryCta}
                </button>
                <button className="px-6 py-3 bg-surface-hover text-secondary border border-white/20 font-medium rounded-xl hover:bg-opacity-80 transition-all">
                  {heroContent.secondaryCta}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}