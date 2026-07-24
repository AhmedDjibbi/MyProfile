'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypeWriter from './TypeWriter';

interface TerminalSectionProps {
  command: string;
  children: React.ReactNode;
  output?: string;
  outputType?: 'text' | 'json' | 'nano';
  className?: string;
  delay?: number;
  skipCommand?: boolean;
}

export default function TerminalSection({
  command,
  children,
  output,
  outputType = 'text',
  className = '',
  delay = 0,
  skipCommand = false,
}: TerminalSectionProps) {
  const [phase, setPhase] = useState<'hidden' | 'command' | 'executing' | 'output' | 'revealed'>('hidden');
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!ref.current || hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            timerRef.current = setTimeout(() => setPhase('command'), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasTriggered, delay]);

  const handleCommandComplete = useCallback(() => {
    setPhase('executing');
    setTimeout(() => {
      setPhase('output');
      setShowOutput(true);
    }, 700);
  }, []);

  const handleOutputComplete = useCallback(() => {
    setTimeout(() => setPhase('revealed'), 500);
  }, []);

  return (
    <div ref={ref} className={`terminal-section ${phase !== 'hidden' ? 'visible' : ''} ${className}`}>
      {phase !== 'hidden' && (
        <>
          {!skipCommand && (
            <motion.div
              className="terminal-command"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="terminal-prompt">
                <span className="terminal-prompt-sign">$</span>
              </span>
              <TypeWriter
                text={command}
                enabled={phase === 'command'}
                onComplete={handleCommandComplete}
                speed={50}
                cursorColor="#7c3aed"
              />
            </motion.div>
          )}

          {phase === 'executing' && (
            <motion.p
              className="terminal-output secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: '12px', margin: '4px 0 8px 0' }}
            >
              Loading...
            </motion.p>
          )}

          {output && showOutput && (
            <motion.div
              className="command-output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`terminal-output ${outputType === 'nano' ? 'nano-editor' : ''}`}>
                {outputType === 'nano' ? (
                  <div className="nano-editor">
                    <div className="nano-header">
                      <span>GNU nano 7.2</span>
                      <span>contact.md</span>
                    </div>
                    <div className="nano-body">
                      <TypeWriter
                        text={output}
                        enabled={phase === 'output'}
                        onComplete={handleOutputComplete}
                        speed={45}
                        showCursor={false}
                      />
                    </div>
                  </div>
                ) : (
                  <TypeWriter
                    text={output}
                    enabled={phase === 'output'}
                    onComplete={handleOutputComplete}
                    speed={50}
                    showCursor={false}
                  />
                )}
              </div>
            </motion.div>
          )}

          {!output && phase === 'output' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onAnimationComplete={handleOutputComplete}
            />
          )}

          <AnimatePresence>
            {phase === 'revealed' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
