'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="git-log">
        {experiences.map((exp, index) => (
          <div key={index}>
            <button
              className="git-commit"
              onClick={() => toggleExpand(index)}
              style={{
                background: expandedIndex === index ? '#18181b' : undefined,
              }}
            >
              <span className="git-hash">{exp.hash}</span>
              <span className="git-message">{exp.message}</span>
              <span className="git-date">{exp.date}</span>
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="git-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="git-details-inner">
                    <p>{exp.details}</p>
                    <div className="git-details-tags">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
