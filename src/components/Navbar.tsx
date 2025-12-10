'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
    language: 'en' | 'fr';
    onLanguageChange: (lang: 'en' | 'fr') => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: language === 'en' ? 'Home' : 'Accueil', href: '#' },
        { name: language === 'en' ? 'Projects' : 'Projets', href: '#projects' },
        { name: language === 'en' ? 'Skills' : 'Compétences', href: '#skills' },
        { name: language === 'en' ? 'Education' : 'Éducation', href: '#education' },
        { name: language === 'en' ? 'Contact' : 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo - Left */}
                <div className="navbar-logo">
                    <span className="logo-text">AS</span>
                </div>

                {/* Nav Links - Center */}
                <div className="navbar-links">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="navbar-link"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Side - Language Switcher & Download CV */}
                <div className="navbar-right">
                    {/* Language Switcher */}
                    <button
                        className="navbar-lang-btn"
                        onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
                        aria-label="Switch language"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        {language === 'en' ? 'FR' : 'EN'}
                    </button>

                    {/* Download CV Button */}
                    <a
                        href="/AHMED-SELMI-FlowCV-Resume-20251210.pdf"
                        download
                        className="navbar-cv-btn"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {language === 'en' ? 'Download CV' : 'Télécharger CV'}
                    </a>
                </div>
            </div>
        </nav>
    );
}
