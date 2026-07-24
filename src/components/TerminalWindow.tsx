'use client';

import { motion } from 'framer-motion';

interface TerminalWindowProps {
  children: React.ReactNode;
  language: 'en' | 'fr';
  onLanguageChange: () => void;
}

export default function TerminalWindow({ children, language, onLanguageChange }: TerminalWindowProps) {
  return (
    <motion.div
      className="terminal-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="terminal">
        <div className="terminal-titlebar">
          <div className="terminal-titlebar-dots">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>
          <span className="terminal-titlebar-text">ahmed@portfolio — bash</span>
          <button
            className="lang-toggle"
            onClick={onLanguageChange}
            aria-label="Toggle language"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
        <div className="terminal-body">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
