import React from 'react';
import { motion } from 'framer-motion';
import { PAGES } from '../constants/navigation';
import { Download, Menu } from 'lucide-react';
import resumePDF from '../assets/ResumeDesigner_Chitrankar.pdf';

const ProgressIndicator = ({ activePageIndex, onPageClick, onToggleMenu }) => {
    const isDarkPage = false; // Unified light theme across all pages

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: isDarkPage ? 'rgba(13, 17, 23, 0.88)' : 'rgba(253, 248, 241, 0.90)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: isDarkPage ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            padding: '12px 5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            transition: 'background-color 0.4s ease, border-color 0.4s ease',
        }}>
            {/* Left: Resume / CV Button */}
            <a
                href={resumePDF}
                download="Chitrankar_Resume.pdf"
                className="resume-button-global"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: isDarkPage ? 'rgba(255, 255, 255, 0.1)' : '#1A1A1A',
                    color: '#FFFFFF',
                    border: isDarkPage ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                    padding: '8px 18px',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isDarkPage ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.15)',
                }}
            >
                <Download size={14} />
                <span>Resume / CV</span>
            </a>

            {/* Center/Right: Clean Navigation Links with Liquid Droplet Indicator */}
            <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
                {PAGES.map((page, index) => {
                    const isActive = activePageIndex === index;
                    return (
                        <button
                            key={page.id}
                            onClick={() => onPageClick && onPageClick(index)}
                            style={{
                                position: 'relative',
                                background: 'transparent',
                                border: 'none',
                                color: isActive ? '#111827' : '#555555',
                                padding: '8px 18px',
                                borderRadius: '25px',
                                fontSize: '0.85rem',
                                fontWeight: isActive ? '700' : '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'color 0.25s ease',
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-droplet-pill"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 380,
                                        damping: 26,
                                        mass: 0.8
                                    }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(0, 0, 255, 0.08)',
                                        border: '1px solid rgba(0, 0, 255, 0.2)',
                                        borderRadius: '25px',
                                        zIndex: -1,
                                    }}
                                />
                            )}
                            <span style={{ position: 'relative', zIndex: 1 }}>{page.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                onClick={onToggleMenu}
                className="mobile-only"
                style={{
                    background: 'none',
                    border: 'none',
                    color: isDarkPage ? '#FFFFFF' : '#000000',
                    cursor: 'pointer',
                    display: 'none',
                    padding: '6px',
                }}
                aria-label="Toggle Navigation Menu"
            >
                <Menu size={26} />
            </button>

            <style>{`
              @media (max-width: 768px) {
                .desktop-only { display: none !important; }
                .mobile-only { display: block !important; }
              }
            `}</style>
        </header>
    );
};

export default ProgressIndicator;
