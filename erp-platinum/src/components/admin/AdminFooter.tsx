'use client';

export function AdminFooter() {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-4">
      <div className="container mx-auto text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Platinum ERP. All rights reserved.
      </div>
    </footer>
  );
}
