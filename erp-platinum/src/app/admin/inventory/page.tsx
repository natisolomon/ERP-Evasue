// src/app/admin/inventory/page.tsx
'use client';

import { useState } from 'react';
import { InventoryDashboard } from '@/components/admin/inventory/InventoryDashboard';

export default function InventoryPage() {
  return (
    <div className="p-6 lg:p-10">
      <InventoryDashboard />
    </div>
  );
}