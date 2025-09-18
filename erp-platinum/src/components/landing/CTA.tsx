// src/components/landing/CTA.tsx
'use client'; // ✅ MUST be first line

import { motion } from 'framer-motion'; // ✅ Use "motion" (not "m")
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export function CTA() {
  return (
    <Section className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-platinum-text-muted dark:text-light-text-muted mb-10"
          >
            Join thousands of companies using Platinum ERP to streamline operations and drive growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button size="xl" variant="primary">
              Start Your Free Trial Today
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}