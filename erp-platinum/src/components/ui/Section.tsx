// src/components/ui/Section.tsx
`use client`;

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}