'use client';

import { motion } from 'framer-motion';

interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
  t: {
    skills: {
      categories: Array<{
        name: string;
        skills: string[];
      }>;
    };
  };
}

export default function SkillsSection({ skills, t }: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="skills-grid">
        {skills.map((category, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h3>{t.skills.categories[index]?.name || category.category}</h3>
            <div className="skill-tags">
              {(t.skills.categories[index]?.skills || category.skills).map((skill, i) => (
                <motion.span
                  key={i}
                  className="tech-tag"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.15 + i * 0.04, duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
