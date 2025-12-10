'use client';

import { useState, useEffect, useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import SkeletonLoader from '@/components/SkeletonLoader';
import Navbar from '@/components/Navbar';
import { translations } from '@/data/translations';

const projects = [
  {
    title: 'AI Social Media Management System',
    type: 'Personal Project',
    date: '2025',
    description: 'Social media account and content creation management system using AI for generating posts and content. Built with MERN stack for seamless content scheduling and automation.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AI'],
    icon: '🤖',
    github: 'https://github.com/Ahmedselmi/social-media-ai-manager',
  },
  {
    title: 'AI Doctor Appointment Assistant',
    type: 'Team Project',
    date: '2025 – 2026',
    description: 'Developed an intelligent mobile assistant for managing doctor appointments with real-time scheduling via Google Calendar API and AI chatbot powered by Gemini AI.',
    tech: ['Flutter', 'Gemini AI', 'Google Calendar API', 'Firebase'],
    icon: '🏥',
    github: 'https://github.com/Ahmedselmi/ai-doctor-assistant',
  },
  {
    title: 'Website Update Detection Scraper',
    type: 'Personal Project',
    date: '2025 – 2026',
    description: 'Python-based web scraper that analyzes websites to detect those needing design improvements, technology upgrades, security enhancements, or SEO optimization.',
    tech: ['Python', 'BeautifulSoup', 'Web Analysis', 'Automation'],
    icon: '🔍',
    github: 'https://github.com/Ahmedselmi/website-update-scraper',
  },
  {
    title: 'Crowdfunding Platform',
    type: 'Team Project',
    date: '2024 – 2025',
    description: 'Complete crowdfunding web application with JWT authentication, role-based access, campaign creation, and user contributions.',
    tech: ['React', 'Tailwind CSS', 'Spring Boot', 'JWT'],
    icon: '💰',
    github: 'https://github.com/Ahmedselmi/crowdfunding-platform',
  },
  {
    title: 'University Management Website',
    type: 'Personal Project',
    date: '2024 – 2025',
    description: 'Full-stack web application with secure authentication, user management, routing, and responsive UI.',
    tech: ['Spring Boot', 'JavaScript', 'HTML', 'CSS'],
    icon: '🎓',
    github: 'https://github.com/Ahmedselmi/university-management',
  },
  {
    title: 'Mobile Shopping Application',
    type: 'Freelance Team Project',
    date: '2024 – 2025',
    description: 'Cross-platform mobile shopping app with product listing, smooth navigation, and optimized UI for multiple screen sizes.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    icon: '🛍️',
    github: 'https://github.com/Ahmedselmi/mobile-shopping-app',
  },
];

const skills = [
  {
    category: 'Web Development',
    icon: '🌐',
    skills: ['React', 'Next.js', 'Spring Boot', 'Node.js', 'Express.js'],
  },
  {
    category: 'Frontend & Styling',
    icon: '🎨',
    skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    category: 'Mobile Development',
    icon: '📱',
    skills: ['Flutter', 'Dart', 'Cross-Platform', 'State Management'],
  },
  {
    category: 'Programming Languages',
    icon: '💻',
    skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Arduino'],
  },
  {
    category: 'APIs & Backend',
    icon: '⚙️',
    skills: ['RESTful APIs', 'JWT Auth', 'API Integration', 'Database'],
  },
  {
    category: 'Tools & Automation',
    icon: '🛠️',
    skills: ['Git', 'Web Scraping', 'Automation', 'CI/CD'],
  },
];

const certifications = [
  { title: 'AWS Training & Certification', org: 'Faculty of Sciences', date: '2025 - 2026' },
  { title: 'Certified Cybersecurity Educator Professional (CCEP)', org: 'RedTeamLeaders', date: '2025 - 2026' },
  { title: 'Arduino Programming Certificate', org: 'Faculty of Sciences', date: '2023 - 2024' },
  { title: 'Python Programming Certificate', org: 'Faculty of Sciences', date: '2023 - 2024' },
];

const softSkills = [
  'Fast Learner', 'Problem-solving', 'Adaptability', 'Stress Management',
  'Teamwork', 'Professional Responsibility', 'Attention to Detail', 'Communication', 'Time Management',
];

const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Proficient' },
  { name: 'French', level: 'Basic' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Get translations for current language
  const t = translations[language];

  const handleLoadingComplete = () => {
    setLoadingFadeOut(true);
    setTimeout(() => {
      setLoading(false);
      // Content is ready immediately after loading screen
      setContentReady(true);
    }, 10);
  };

  useEffect(() => {
    if (contentReady) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observerRef.current?.observe(el);
      });

      return () => observerRef.current?.disconnect();
    }
  }, [contentReady]);

  // Show skeleton only when loading is done but content isn't ready yet
  const showSkeleton = !loading && !contentReady;

  return (
    <>
      {loading && (
        <div className={loadingFadeOut ? 'fade-out' : ''}>
          <LoadingScreen onComplete={handleLoadingComplete} />
        </div>
      )}

      {showSkeleton && <SkeletonLoader />}

      {!loading && <Navbar language={language} onLanguageChange={setLanguage} />}

      <main className={contentReady ? 'content-ready' : ''} style={{ display: contentReady ? 'block' : 'none' }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-bg" />
          <div className="hero-content">
            <p className="hero-greeting">{t.hero.greeting}</p>
            <h1 className="hero-name">{t.hero.name}</h1>
            <p className="hero-title">{t.hero.title}</p>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                <span>{t.hero.viewProjects}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                <span>{t.hero.contactMe}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title animate-on-scroll">{t.projects.title}</h2>
          <p className="section-subtitle animate-on-scroll">{t.projects.subtitle}</p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card project-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none', color: 'inherit' }}
              >
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{t.projects.items[index].title}</h3>
                <p className="project-type">{t.projects.items[index].type} • {project.date}</p>
                <p className="project-description">{t.projects.items[index].description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-github-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {t.projects.viewOnGithub}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title animate-on-scroll">{t.skills.title}</h2>
          <p className="section-subtitle animate-on-scroll">{t.skills.subtitle}</p>
          <div className="skills-container">
            <div className="skills-grid">
              {skills.map((category, index) => (
                <div key={index} className="card skill-category animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="skill-category-title">
                    <span className="skill-category-icon">{category.icon}</span>
                    {t.skills.categories[index].name}
                  </h3>
                  <div className="skill-tags">
                    {t.skills.categories[index].skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section id="education" className="section">
          <h2 className="section-title animate-on-scroll">{t.education.title}</h2>
          <p className="section-subtitle animate-on-scroll">{t.education.subtitle}</p>
          <div className="timeline-container">
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-dot" />
              <p className="timeline-date">2025 – 2026</p>
              <h3 className="timeline-title">{t.education.degree.title}</h3>
              <p className="timeline-subtitle">{t.education.degree.org} {t.education.degree.status}</p>
            </div>
            {certifications.map((cert, index) => (
              <div key={index} className="timeline-item animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="timeline-dot" />
                <p className="timeline-date">{cert.date}</p>
                <h3 className="timeline-title">{t.education.certifications[index].title}</h3>
                <p className="timeline-subtitle">{t.education.certifications[index].org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages & Soft Skills */}
        <section className="section">
          <h2 className="section-title animate-on-scroll">{t.languagesAndSkills.title}</h2>
          <p className="section-subtitle animate-on-scroll">{t.languagesAndSkills.subtitle}</p>
          <div className="info-grid">
            <div className="card info-card animate-on-scroll">
              <h3>{t.languagesAndSkills.languagesTitle}</h3>
              <div className="lang-items">
                {t.languagesAndSkills.languages.map((lang, index) => (
                  <div key={index} className="lang-item">
                    <span>{lang.name}</span>
                    <span className="lang-level">• {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card info-card animate-on-scroll">
              <h3>{t.languagesAndSkills.softSkillsTitle}</h3>
              <div className="soft-skills-items">
                {t.languagesAndSkills.softSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="contact-container">
            <h2 className="section-title animate-on-scroll">{t.contact.title}</h2>
            <p className="section-subtitle animate-on-scroll">
              {t.contact.subtitle}
            </p>
            <div className="contact-links animate-on-scroll">
              <a href="mailto:ahmedselmi55023612@gmail.com" className="contact-link">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                ahmedselmi55023612@gmail.com
              </a>
              <a href="tel:+21654033871" className="contact-link">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                +216 54 03 38 71
              </a>
              <a href="https://github.com/Ahmedselmi" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                GitHub
              </a>
              <a href="https://linkedin.com/in/ahmed-selmi" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            {t.footer.text} • {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </>
  );
}
