'use client';

import { useRef } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  as = 'button',
  href,
  target,
  rel,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className="interactive"
      style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}
      onMouseMove={onMouse}
      onMouseLeave={onLeave}
    >
      {as === 'a' ? (
        <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );
}
