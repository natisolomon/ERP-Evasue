// src/components/ui/Container.tsx
`use client`;

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}