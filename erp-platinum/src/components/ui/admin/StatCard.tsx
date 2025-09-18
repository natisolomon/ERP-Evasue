'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg text-center"
    >
      <div className="flex justify-center items-center mb-3">{icon}</div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}
