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
      subtitle: string;
      categories: Array<{ name: string; skills: string[] }>;
    };
  };
}

const skillIcons: Record<string, string> = {
  'Web Development': '🌐',
  'Frontend & Styling': '🎨',
  'Mobile Development': '📱',
  'Programming Languages': '💻',
  'APIs & Backend': '⚙️',
  'Tools & Automation': '🛠️',
};

export default function SkillsSection({ skills, t }: SkillsSectionProps) {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <span className="label">Skills</span>
        <h2 className="title">Technologies I Work With</h2>
        <p className="subtitle">{t.skills.subtitle}</p>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="skill-card-icon">{skillIcons[skill.category] || '🔧'}</div>
            <h3>{t.skills.categories[index]?.name || skill.category}</h3>
            <div className="skill-tags">
              {(t.skills.categories[index]?.skills || skill.skills).map((s: string, i: number) => (
                <motion.span
                  key={i}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 + 0.2 + i * 0.04, duration: 0.2 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
