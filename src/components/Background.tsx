'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
}

function createParticles(): Particle[] {
  const count = Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1200) / 40);
  return Array.from({ length: Math.min(count, 30) }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 8,
  }));
}

let particlesCache: Particle[] | null = null;

function getParticles(): Particle[] {
  if (!particlesCache) {
    particlesCache = createParticles();
  }
  return particlesCache;
}

export default function Background() {
  const particles = useMemo(() => getParticles(), []);

  return (
    <div className="particles-container">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 6 + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
