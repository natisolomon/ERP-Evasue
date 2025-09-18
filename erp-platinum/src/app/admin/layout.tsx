// src/app/admin/layout.tsx
import { AdminLayout } from '@/components/layout/AdminLayout';

// ✅ This layout will completely replace the root layout for /admin/*
export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Return ONLY the AdminLayout — no <Header />, no <Footer />
  return <AdminLayout>{children}</AdminLayout>;
}