'use client';

import { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  enabled: boolean;
  onComplete?: () => void;
  className?: string;
  speed?: number;
  showCursor?: boolean;
  cursorColor?: string;
}

export default function TypeWriter({
  text,
  enabled,
  onComplete,
  className = '',
  speed = 40,
  showCursor = true,
  cursorColor,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onCompleteRef = useRef(onComplete);
  const textRef = useRef(text);
  const speedRef = useRef(speed);
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    onCompleteRef.current = onComplete;
    textRef.current = text;
    speedRef.current = speed;
  });

  useEffect(() => {
    tickRef.current = () => {
      if (indexRef.current < textRef.current.length) {
        const char = textRef.current[indexRef.current];
        let delay = speedRef.current + Math.random() * 25;

        if (char === '.' || char === '!' || char === '?') delay += 250;
        else if (char === ',' || char === ';' || char === ':') delay += 120;
        else if (char === '\n') delay += 180;
        else if (char === ' ' && indexRef.current > 0 && textRef.current[indexRef.current - 1] === '.') delay += 120;

        setDisplayText(textRef.current.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(tickRef.current, delay);
      } else {
        if (!isComplete) {
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }
    };
  });

  useEffect(() => {
    if (!enabled) return;

    timeoutRef.current = setTimeout(tickRef.current, 60);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && enabled && !isComplete && (
        <span className="cursor" style={cursorColor ? { background: cursorColor } : undefined} />
      )}
      {showCursor && isComplete && (
        <span className="cursor white" />
      )}
    </span>
  );
}
