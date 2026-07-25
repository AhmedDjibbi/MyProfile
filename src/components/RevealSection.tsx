'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function RevealSection({ children, className }: RevealSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { clipPath: 'inset(0)' } : {}}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
    >
      {children}
    </motion.div>
  );
}
