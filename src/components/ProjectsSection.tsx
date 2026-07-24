'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  type: string;
  date: string;
  description: string;
  tech: string[];
  icon: string;
  github: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  t: {
    projects: {
      subtitle: string;
      viewOnGithub: string;
      items: Array<{ title: string; type: string; description: string }>;
    };
  };
}

const projectImages = ['🤖', '🏥', '🔍', '💰', '🎓', '🛍️'];

function ProjectCard({ project, t, index }: {
  project: Project;
  t: { projects: { viewOnGithub: string; items: Array<{ title: string; type: string; description: string }> } };
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
    };

    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href={project.github || undefined}
      target={project.github ? '_blank' : undefined}
      rel={project.github ? 'noopener noreferrer' : undefined}
      className="project-card interactive"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={!project.github ? { cursor: 'default' } : undefined}
    >
      <div className="project-card-image">
        {projectImages[index] || '📁'}
      </div>
      <div className="project-card-body">
        <p className="project-type">
          {t.projects.items[index]?.type || project.type} • {project.date}
        </p>
        <h3>{t.projects.items[index]?.title || project.title}</h3>
        <p className="project-desc">
          {t.projects.items[index]?.description || project.description}
        </p>
        <div className="project-tech">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
        {project.github && (
          <div className="project-links">
            <span className="project-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t.projects.viewOnGithub}
            </span>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function ProjectsSection({ projects, t }: ProjectsSectionProps) {
  return (
    <section className="section" id="projects">
      <div className="section-header">
        <span className="label">Projects</span>
        <h2 className="title">Featured Work</h2>
        <p className="subtitle">{t.projects.subtitle}</p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} t={t} index={index} />
        ))}
      </div>
    </section>
  );
}
