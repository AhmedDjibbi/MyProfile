'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<'os' | 'modules' | 'ready' | 'done'>('os');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('modules'), 1400);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'modules') return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('ready');
          return 100;
        }
        return p + Math.random() * 15 + 3;
      });
    }, 220);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'ready') return;
    const t = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1500);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="boot-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="boot-line accent"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        AhmedOS v3.0
      </motion.p>

      {phase !== 'os' && (
        <motion.p
          className="boot-line"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Initializing portfolio...
        </motion.p>
      )}

      {(phase === 'modules' || phase === 'ready' || phase === 'done') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="boot-line">Loading modules...</p>
          <div className="loading-bar-container">
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {(phase === 'ready' || phase === 'done') && (
        <motion.p
          className="boot-line success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Ready.
        </motion.p>
      )}

      {phase === 'done' && (
        <motion.p
          className="boot-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          ahmed@portfolio:~$ <span className="cursor" />
        </motion.p>
      )}
    </motion.div>
  );
}
