// src/app/page.tsx
`use client`;

import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTA } from '@/components/landing/CTA';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import StatCard from '@/components/ui/StatCard';
import { stats } from '@/lib/constant';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats Bar */}
      <Section className="py-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Container>
      </Section>

      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}