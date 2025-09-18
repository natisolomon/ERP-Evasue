// src/components/landing/Testimonials.tsx
'use client'; // ✅ MUST be first line

import { motion } from 'framer-motion'; // ✅ Use "motion" (not "m")
import { testimonials } from '@/lib/constant';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export function Testimonials() {
  return (
    <Section className="py-20 bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Industry Leaders</h2>
          <p className="text-platinum-text-muted dark:text-light-text-muted max-w-2xl mx-auto">
            See why thousands of companies trust Platinum ERP to run their operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div // ✅ Now safe
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-platinum-text-muted dark:text-light-text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed italic">“{testimonial.content}”</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}