// src/app/admin/finance/page.tsx
'use client';

import { useState } from 'react';
import { FinanceDashboard } from '@/components/admin/finance/FinanceDashboard';

export default function FinancePage() {
  return (
    <div className="p-6 lg:p-10">
      <FinanceDashboard />
    </div>
  );
}