// src/components/ui/StatCard.tsx
"use client"; // required in Next.js App Router for components using hooks or motion

import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="text-center p-6"
    >
      <div className="text-3xl md:text-4xl font-extrabold mb-2">{value}</div>
      <div className="text-sm text-platinum-text-muted dark:text-light-text-muted uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
