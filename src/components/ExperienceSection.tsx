'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Experience {
  hash: string;
  message: string;
  date: string;
  details: string;
  tags: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function TimelineEntry({ exp, index }: { exp: Experience; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { opacity: 1, y: 0, clipPath: 'inset(0)' } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
    >
      <div className="timeline-content">
        <span className="date">{exp.date}</span>
        <h3>{exp.message}</h3>
        <p className="desc">{exp.details}</p>
        <button className="timeline-expand" onClick={() => setOpen(!open)}>
          {open ? 'Less' : 'More'}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <motion.div
          className={`desc-hidden ${open ? 'open' : ''}`}
          initial={{ height: 0, opacity: 0 }}
          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="project-tech">
            {exp.tags.map((tag, i) => (
              <span key={i} className="tech-tag">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 12 }}
      />
    </motion.div>
  );
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !lineRef.current) return;
    lineRef.current.style.height = '100%';
  }, [isInView]);

  return (
    <section ref={sectionRef} className="section" id="experience">
      <div className="section-header">
        <span className="label">Experience</span>
        <h2 className="title">My Journey</h2>
      </div>
      <div className="timeline">
        <div className="timeline-line">
          <motion.div
            ref={lineRef}
            className="timeline-line-fill"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        {experiences.map((exp, index) => (
          <TimelineEntry key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
