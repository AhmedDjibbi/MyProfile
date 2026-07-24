'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;

    const onMouse = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, .interactive');
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      if (isInteractive) {
        dot.style.width = '16px';
        dot.style.height = '16px';
        dot.style.background = 'rgba(245, 158, 11, 0.15)';
        ring.style.borderColor = 'rgba(245, 158, 11, 0.3)';
        ring.style.width = '40px';
        ring.style.height = '40px';
      } else {
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = '#ebebed';
        ring.style.borderColor = 'rgba(235, 235, 237, 0.15)';
        ring.style.width = '24px';
        ring.style.height = '24px';
      }
    };

    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 12}px, ${ringPos.current.y - 12}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouse);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: '#ebebed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          border: '1px solid rgba(235, 235, 237, 0.15)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.15s, height 0.15s, border-color 0.15s',
        }}
      />
    </>
  );
}
