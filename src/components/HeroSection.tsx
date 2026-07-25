'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import MagneticButton from './MagneticButton';

interface HeroSectionProps {
  t: {
    hero: {
      greeting: string;
      name: string;
      title: string;
      description: string;
      viewProjects: string;
      contactMe: string;
    };
  };
}

export default function HeroSection({ t }: HeroSectionProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameSplit = nameRef.current ? new SplitType(nameRef.current, { types: 'words' }) : null;
      if (nameSplit?.words) {
        gsap.fromTo(nameSplit.words,
          { y: 120, opacity: 0, scale: 0.5, rotateX: -50 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, stagger: 0.04, duration: 1, ease: 'power4.out' }
        );
      }

      if (taglineRef.current) {
        gsap.fromTo(taglineRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, delay: 0.8, duration: 0.8, ease: 'power3.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 ref={nameRef} className="hero-name">
          {t.hero.name}
        </h1>
        <p ref={taglineRef} className="hero-tagline">
          {t.hero.title}
        </p>
        <div className="hero-buttons">
          <MagneticButton as="a" href="#projects" className="btn btn-primary">
            {t.hero.viewProjects}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton as="a" href="#contact" className="btn btn-secondary">
            {t.hero.contactMe}
          </MagneticButton>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
