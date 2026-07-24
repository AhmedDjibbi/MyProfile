'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalWindow from '@/components/TerminalWindow';
import BootSequence from '@/components/BootSequence';
import TerminalSection from '@/components/TerminalSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Background from '@/components/Background';
import { translations } from '@/data/translations';

const projects = [
  {
    title: 'AI Social Media Management System',
    type: 'Personal Project',
    date: '2025',
    description: 'Social media account and content creation management system using AI for generating posts and content. Built with MERN stack for seamless content scheduling and automation.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AI'],
    icon: '🤖',
    github: 'https://github.com/AhmedDjibbi/Nexura-ai-POC/tree/first-branch',
  },
  {
    title: 'AI Doctor Appointment Assistant',
    type: 'Team Project',
    date: '2025 - 2026',
    description: 'Developed an intelligent mobile assistant for managing doctor appointments with real-time scheduling via Google Calendar API and AI chatbot powered by Gemini AI.',
    tech: ['Flutter', 'Gemini AI', 'Google Calendar API', 'Firebase'],
    icon: '🏥',
    github: '',
  },
  {
    title: 'Website Update Detection Scraper',
    type: 'Personal Project',
    date: '2025 - 2026',
    description: 'Python-based web scraper that analyzes websites to detect those needing design improvements, technology upgrades, security enhancements, or SEO optimization.',
    tech: ['Python', 'BeautifulSoup', 'Web Analysis', 'Automation'],
    icon: '🔍',
    github: 'https://github.com/AhmedDjibbi/webcrowler',
  },
  {
    title: 'Crowdfunding Platform',
    type: 'Team Project',
    date: '2024 - 2025',
    description: 'Complete crowdfunding web application with JWT authentication, role-based access, campaign creation, and user contributions.',
    tech: ['React', 'Tailwind CSS', 'Spring Boot', 'JWT'],
    icon: '💰',
    github: 'https://github.com/AhmedDjibbi/crowdfunding-backend',
  },
  {
    title: 'University Management Website',
    type: 'Personal Project',
    date: '2024 - 2025',
    description: 'Full-stack web application with secure authentication, user management, routing, and responsive UI.',
    tech: ['Spring Boot', 'JavaScript', 'HTML', 'CSS'],
    icon: '🎓',
    github: 'https://github.com/AhmedDjibbi/university-management-system',
  },
  {
    title: 'Mobile Shopping Application',
    type: 'Freelance Team Project',
    date: '2024 - 2025',
    description: 'Cross-platform mobile shopping app with product listing, smooth navigation, and optimized UI for multiple screen sizes.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    icon: '🛍️',
    github: '',
  },
];

const skills = [
  { category: 'Web Development', icon: '🌐', skills: ['React', 'Next.js', 'Spring Boot', 'Node.js', 'Express.js'] },
  { category: 'Frontend & Styling', icon: '🎨', skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'] },
  { category: 'Mobile Development', icon: '📱', skills: ['Flutter', 'Dart', 'Cross-Platform', 'State Management'] },
  { category: 'Programming Languages', icon: '💻', skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Arduino'] },
  { category: 'APIs & Backend', icon: '⚙️', skills: ['RESTful APIs', 'JWT Auth', 'API Integration', 'Database'] },
  { category: 'Tools & Automation', icon: '🛠️', skills: ['Git', 'Web Scraping', 'Automation', 'CI/CD'] },
];

const experiences = [
  {
    hash: 'a4f91d2',
    message: 'Built AI Social Media Platform',
    date: '2025',
    details: 'Developed a full-stack AI-powered social media management system using React, Node.js, Express, and MongoDB. Integrated AI for content generation and automated scheduling.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI'],
  },
  {
    hash: '1fe329b',
    message: 'Developed AI Doctor Appointment Assistant',
    date: '2025',
    details: 'Led development of a cross-platform mobile app using Flutter with Gemini AI integration, Google Calendar API for real-time scheduling, and Firebase for backend services.',
    tags: ['Flutter', 'Gemini AI', 'Firebase', 'Google API'],
  },
  {
    hash: '8cb1221',
    message: 'Started Freelance Development',
    date: '2024',
    details: 'Began freelancing as a full-stack developer, building web and mobile applications for clients. Specialized in React, Spring Boot, and Flutter development.',
    tags: ['Freelance', 'Full Stack', 'Mobile', 'Web'],
  },
  {
    hash: '3d9e42a',
    message: 'Began Computer Science Degree',
    date: '2024',
    details: 'Started Bachelor\'s degree in Computer Science at the Faculty of Sciences. Focusing on software engineering, algorithms, and intelligent systems.',
    tags: ['Computer Science', 'Faculty of Sciences'],
  },
  {
    hash: 'e7b2a1c',
    message: 'Built Crowdfunding Platform',
    date: '2024',
    details: 'Collaborated on a full-stack crowdfunding application with JWT authentication, role-based access, campaign management, and secure payment processing.',
    tags: ['Spring Boot', 'React', 'JWT', 'Team Project'],
  },
];

const skillsJson = `{
  "Frontend": ["React", "Next.js", "Flutter"],
  "Backend": ["Spring Boot", "Node.js", "FastAPI"],
  "AI": ["OpenAI", "LangChain", "RAG", "MCP"],
  "Mobile": ["Flutter", "Dart"]
}`;

const contactMd = `# Contact

Email: ahmedselmi55023612@gmail.com
Phone: +216 54 03 38 71
GitHub: github.com/AhmedDjibbi
LinkedIn: linkedin.com/in/ahmed-selmi`;

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const t = translations[language];

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  }, []);

  return (
    <>
      <Background />
      <TerminalWindow language={language} onLanguageChange={toggleLanguage}>
        <AnimatePresence mode="wait">
          {!bootComplete ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            >
              <BootSequence onComplete={() => setBootComplete(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TerminalSection
                command="cat about.md"
                output="# Ahmed Selmi\nAI & Full Stack Engineer\n\nI build intelligent software that lives at the intersection of modern web technologies, artificial intelligence, and elegant design."
                delay={800}
                autoStart
              >
                <AboutSection t={t} />
              </TerminalSection>

              <TerminalSection
                command="ls projects/"
                output={`ai-social-platform/\tdoctor-assistant/\nweb-scraper/\t\tcrowdfunding/\nuniversity-mgmt/\tmobile-shop/`}
                delay={300}
              >
                <ProjectsSection projects={projects} t={t} />
              </TerminalSection>

              <TerminalSection
                command="cat skills.json"
                output={skillsJson}
                delay={300}
              >
                <SkillsSection skills={skills} t={t} />
              </TerminalSection>

              <TerminalSection
                command="git log --oneline"
                delay={300}
                skipCommand={false}
              >
                <ExperienceSection experiences={experiences} />
              </TerminalSection>

              <TerminalSection
                command="nano contact.md"
                output={contactMd}
                outputType="nano"
                delay={300}
              >
                <ContactSection />
              </TerminalSection>

              <motion.div
                className="terminal-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p>{t.footer.text} • {new Date().getFullYear()}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </TerminalWindow>
    </>
  );
}
