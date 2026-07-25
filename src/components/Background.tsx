'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const shapeTypes = ['circle', 'diamond', 'ring', 'plus', 'dot', 'triangle', 'square', 'ring-inner'] as const;
const colorVariants = ['accent', 'accent-alt', 'accent', 'accent-alt'] as const;

const shapeSizes = [
  { w: 48, h: 48 },
  { w: 64, h: 64 },
  { w: 32, h: 32 },
  { w: 40, h: 40 },
  { w: 56, h: 56 },
  { w: 28, h: 28 },
  { w: 72, h: 72 },
  { w: 44, h: 44 },
  { w: 36, h: 36 },
  { w: 52, h: 52 },
  { w: 60, h: 60 },
  { w: 80, h: 80 },
];

const positions = [
  { left: 5, top: 15 },
  { left: 22, top: 72 },
  { left: 50, top: 20 },
  { left: 75, top: 55 },
  { left: 38, top: 85 },
  { left: 12, top: 45 },
  { left: 88, top: 30 },
  { left: 60, top: 75 },
  { left: 30, top: 35 },
  { left: 82, top: 65 },
  { left: 45, top: 50 },
  { left: 68, top: 18 },
];

function FloatingShape({ index }: { index: number }) {
  const size = shapeSizes[index % shapeSizes.length];
  const shape = shapeTypes[index % shapeTypes.length];
  const pos = positions[index % positions.length];
  const colorKey = colorVariants[index % colorVariants.length];
  const borderColor = colorKey === 'accent' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(224, 122, 95, 0.35)';
  const bgColor = colorKey === 'accent' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(224, 122, 95, 0.1)';
  const dotBg = colorKey === 'accent' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(224, 122, 95, 0.4)';
  const triangleColor = colorKey === 'accent' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(224, 122, 95, 0.35)';

  const baseStyle: React.CSSProperties = {
    left: `${pos.left}%`,
    top: `${pos.top}%`,
    width: size.w,
    height: size.h,
  };

  const shapeStyle: React.CSSProperties = (() => {
    switch (shape) {
      case 'circle':
        return { ...baseStyle, borderColor, background: bgColor };
      case 'diamond':
        return { ...baseStyle, width: size.w * 0.7, height: size.h * 0.7, borderColor, background: bgColor };
      case 'ring':
        return { ...baseStyle, width: size.w, height: size.h, borderColor };
      case 'ring-inner':
        return { ...baseStyle, width: size.w * 0.6, height: size.h * 0.6, borderColor: 'rgba(245, 158, 11, 0.3)' };
      case 'plus':
        return { ...baseStyle, width: size.w * 0.6, height: size.h * 0.6 };
      case 'dot':
        return { ...baseStyle, width: size.w * 0.3, height: size.h * 0.3, background: dotBg };
      case 'triangle':
        return { ...baseStyle, width: 0, height: 0, borderLeft: `${size.w * 0.4}px solid transparent`, borderRight: `${size.w * 0.4}px solid transparent`, borderBottom: `${size.h * 0.7}px solid ${triangleColor}`, background: 'none' };
      case 'square':
        return { ...baseStyle, width: size.w * 0.7, height: size.h * 0.7, borderColor, background: bgColor, borderRadius: 3 };
      default:
        return baseStyle;
    }
  })();

  const getAnimations = () => {
    const drift = index % 4;
    switch (drift) {
      case 0: return {
        y: [0, -40 - (index * 3) % 25, 0],
        x: [0, (index % 2 === 0 ? 20 : -20), 0],
        rotate: shape === 'diamond' ? [45, 80, 45] : shape === 'square' ? [0, 12, 0] : [0, (index % 2 === 0 ? 15 : -15), 0],
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.55, 0.3],
      };
      case 1: return {
        y: [0, 30, 0, -20, 0],
        x: [0, -25, 10, -15, 0],
        rotate: shape === 'diamond' ? [45, 30, 60, 45] : [0, -12, 8, 0],
        scale: [1, 0.92, 1.1, 1],
        opacity: [0.25, 0.45, 0.35, 0.25],
      };
      case 2: return {
        y: [0, -20, -50, -20, 0],
        x: [0, 15, 0, -15, 0],
        rotate: [0, 8, -5, 10, 0],
        scale: [1, 1.06, 1, 1.08, 1],
        opacity: [0.28, 0.5, 0.32, 0.45, 0.28],
      };
      case 3: return {
        y: [0, -35, 15, -25, 0],
        x: [0, 10, -20, 5, 0],
        rotate: shape === 'diamond' ? [45, 55, 35, 50, 45] : [0, 10, -8, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.32, 0.55, 0.35, 0.45, 0.32],
      };
    }
  };

  return (
    <motion.div
      className={`floating-shape ${shape}`}
      style={shapeStyle}
      animate={getAnimations()}
      transition={{
        duration: 10 + (index * 1.8) % 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.8,
      }}
    />
  );
}

function FloatingLine({ index }: { index: number }) {
  const isHorizontal = index % 2 === 0;
  const length = 80 + (index * 30) % 120;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${5 + (index * 20) % 85}%`,
        top: `${10 + (index * 15) % 80}%`,
        width: isHorizontal ? length : 1,
        height: isHorizontal ? 1 : length,
        background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, rgba(245, 158, 11, 0.15), transparent)`,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: isHorizontal ? [1, 1.3, 1] : [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + (index * 1.2) % 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 1.5,
      }}
    />
  );
}

export default function Background() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
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
        {Array.from({ length: 5 }, (_, i) => (
          <FloatingLine key={`line-${i}`} index={i} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <FloatingShape key={`shape-${i}`} index={i} />
        ))}
      </div>

      <div ref={spotlightRef} className="spotlight" />
    </>
  );
}
