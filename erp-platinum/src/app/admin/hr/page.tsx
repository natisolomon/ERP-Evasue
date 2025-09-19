// src/app/admin/hr/page.tsx
'use client';

import { useState } from 'react';
import { HRDashboard } from '@/components/admin/hr/HRDashboard';

export default function HRPage() {
  return (
    <div className="p-6 lg:p-10">
      <HRDashboard />
    </div>
  );
}