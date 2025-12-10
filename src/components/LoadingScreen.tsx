'use client';

import { useEffect, useState } from 'react';

const techIcons = [
  { label: 'React', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M12 21.35c-1.1 0-2.15-.28-3.05-.78-.15.08-.3.15-.45.22-1.95.85-3.6.65-4.35-.6-.75-1.25-.25-3.05 1.25-4.85-.1-.25-.2-.55-.3-.85C3.75 12.25 3.5 9.9 4.5 8.5c1-1.35 3.1-1.6 5.55-.7.2-.15.4-.3.6-.45 1.75-1.25 3.55-1.7 4.85-.95 1.3.75 1.75 2.55 1.35 4.75.25.1.5.25.75.4 2 1.25 3.15 2.85 2.9 4.45-.25 1.6-1.85 2.7-4.15 2.95-.15.2-.35.4-.55.6-1.45 1.35-3 2.1-4.3 2.1l-.5-.3Z"/></svg>' },
  { label: 'Java', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.573-2.627s-1.029.762.544.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.944-1.218m4.84-4.458c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573"/></svg>' },
  { label: 'Python', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 6 4.02 6 5.5V8h6v1H5c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h1v-2.5c0-1.93 1.57-3.5 3.5-3.5h5c1.38 0 2.5-1.12 2.5-2.5v-4C17 4.02 16.52 2 12 2zm-2 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM18 8.5V11c0 1.93-1.57 3.5-3.5 3.5h-5c-1.38 0-2.5 1.12-2.5 2.5v4c0 1.48.52 3.5 5 3.5s5-2.02 5-3.5V18h-6v-1h7c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3h-1zm-4 10.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>' },
  { label: 'Flutter', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.493 11.762l3.667 3.667L20.047 0h-5.733zM14.314 11.467L7.848 18l6.466 6h5.733l-6.464-6.466 6.464-6.467h-5.733z"/></svg>' },
  { label: 'Spring', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>' },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
    }));
    setParticles(newParticles);

    // Complete loading after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-container">
      {/* Background gradient */}
      <div className="loading-bg-gradient" />

      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Floating particles */}
      <div className="loading-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Name container */}
      <div className="name-container">
        <h1 className="loading-name">Ahmed Selmi</h1>
        <p className="loading-subtitle">Full Stack Developer</p>

        {/* Loading bar */}
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>

        {/* Tech icons */}
        <div className="tech-icons">
          {techIcons.map((icon, index) => (
            <div
              key={index}
              className="tech-icon"
              title={icon.label}
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
