'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import SplitType from 'split-type';

interface AboutSectionProps {
  t: {
    hero: { description: string };
  };
}

export default function AboutSection({ t }: AboutSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const textRef = useRef<HTMLDivElement>(null);
  const [projectCount] = useState(6);
  const [yearCount] = useState(3);
  const [projectsDisplay, setProjectsDisplay] = useState(0);
  const [yearsDisplay, setYearsDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: 'lines' });
        if (split.lines) {
          gsap.from(split.lines, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
          });
        }
      }

      const counter1 = { val: 0 };
      gsap.to(counter1, {
        val: projectCount,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => setProjectsDisplay(Math.round(counter1.val)),
      });

      const counter2 = { val: 0 };
      gsap.to(counter2, {
        val: yearCount,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.2,
        onUpdate: () => setYearsDisplay(Math.round(counter2.val)),
      });
    });

    return () => ctx.revert();
  }, [isInView, projectCount, yearCount]);

  return (
    <section ref={sectionRef} className="section" id="about">
      <div className="section-header">
        <span className="label">About</span>
        <h2 className="title">Who I Am</h2>
      </div>
      <div className="about-grid">
        <div className="about-visual">
          <div className="about-monogram">AS</div>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">{projectsDisplay}+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">{yearsDisplay}+</span>
              <span className="stat-label">Years Building</span>
            </div>
          </div>
        </div>
        <div className="about-text">
          <div ref={textRef} className="text-block" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)' }}>
            {t.hero.description}
          </div>
        </div>
      </div>
    </section>
  );
}
