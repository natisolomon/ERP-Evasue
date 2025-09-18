// src/components/landing/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/constant';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export function Features() {
  return (
    <Section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need, In One Place</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Powerful modules designed to work together seamlessly — no more switching between disconnected tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 bg-surface-card/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-accent-cyan/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* ✅ Render Lucide Icon */}
              <div className="text-5xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">{feature.title}</h3>
              <p className="text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}