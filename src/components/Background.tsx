'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

function FloatingShape({ index }: { index: number }) {
  const size = useMemo(() => {
    const sizes = [
      { w: 24, h: 24 },
      { w: 16, h: 16 },
      { w: 32, h: 32 },
      { w: 20, h: 20 },
      { w: 28, h: 28 },
      { w: 14, h: 14 },
    ];
    return sizes[index % sizes.length];
  }, [index]);

  const shape = useMemo(() => {
    const types = ['circle', 'diamond', 'circle', 'diamond'] as const;
    return types[index % types.length];
  }, [index]);

  const style = useMemo(() => ({
    left: `${10 + (index * 17) % 80}%`,
    top: `${60 + (index * 13) % 35}%`,
    width: size.w,
    height: size.h,
  }), [index, size]);

  return (
    <motion.div
      className={`floating-shape ${shape}`}
      style={style}
      animate={{
        y: [0, -30 - (index * 7) % 20, 0],
        x: [0, (index % 2 === 0 ? 15 : -15), 0],
        rotate: shape === 'diamond' ? [45, 65, 45] : [0, 15, 0],
        opacity: [0.06, 0.12, 0.06],
      }}
      transition={{
        duration: 8 + (index * 1.5) % 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 1.2,
      }}
    />
  );
}

export default function Background() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <>
      <div className="orbs-container">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div className="grid-overlay" />

      <div className="shapes-container">
        {Array.from({ length: 8 }, (_, i) => (
          <FloatingShape key={i} index={i} />
        ))}
      </div>

      <div ref={spotlightRef} className="spotlight" />
    </>
  );
}
