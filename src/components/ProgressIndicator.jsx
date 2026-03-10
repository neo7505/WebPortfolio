import React from 'react';
import { motion } from 'framer-motion';
import { PAGES } from '../constants/navigation';
import { Download } from 'lucide-react';
import resumePDF from '../assets/Chitrankar_UXfocused.pdf';


const DOT_POSITIONS = [59, 72, 84, 100];

const ProgressIndicator = ({ activePageIndex, onPageClick }) => {
    const isDarkPage = activePageIndex === 2; // Projects page
    const dotLeft = DOT_POSITIONS[activePageIndex];

    const currentStyles = {
        wrapper: {
            ...styles.wrapper,
            backgroundColor: isDarkPage ? 'rgba(13, 17, 23, 0.92)' : 'rgba(253, 248, 241, 0.92)',
            borderBottom: isDarkPage ? '1px solid rgba(255,255,255,0.05)' : 'none',
        },
        track: {
            ...styles.track,
            backgroundColor: isDarkPage ? '#222' : '#D8D8D8',
        },
        dot: {
            ...styles.dot,
            backgroundColor: isDarkPage ? '#FFF' : '#000',
            borderColor: isDarkPage ? '#000' : '#FFF',
        },
        resumeButton: {
            ...styles.resumeButton,
            backgroundColor: isDarkPage ? '#FFF' : '#1A1A1A',
            color: isDarkPage ? '#000' : '#FFF',
        }
    };

    return (
        <div style={currentStyles.wrapper}>
            {/* Track */}
            <div style={currentStyles.track}>
                <motion.div
                    style={styles.fill}
                    animate={{ width: `${dotLeft}%` }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                />
                <motion.div
                    style={currentStyles.dot}
                    animate={{ left: `${dotLeft}%` }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                />
            </div>

            {/* Labels row — Resume/CV pinned left, tabs span full width */}
            <div style={styles.labelsRow}>
                {/* Resume/CV sits inside the row, absolutely on the left */}
                <a 
                    href={resumePDF} 
                    download="Chitrankar_Resume.pdf" 
                    style={{ ...currentStyles.resumeButton, textDecoration: 'none' }}
                >
                    <Download size={14} style={{ marginRight: '6px' }} />
                    Resume / CV
                </a>

                {/* 4 equal label cells across the full width */}
                <div style={styles.labels}>
                    {PAGES.map((page, index) => (
                        <div 
                            key={page.id} 
                            style={styles.labelCell}
                            onClick={() => onPageClick && onPageClick(index)}
                        >
                            <span style={{
                                ...styles.label,
                                color: activePageIndex === index
                                    ? 'var(--accent-color)'
                                    : (isDarkPage ? '#555' : '#888'),
                                fontWeight: activePageIndex === index ? '700' : '400',
                            }}>
                                {page.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(253, 248, 241, 0.92)',
        backdropFilter: 'blur(8px)',
    },
    track: {
        position: 'relative',
        width: '100%',
        height: '7px',
        backgroundColor: '#D8D8D8',
        overflow: 'visible',
    },
    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'var(--accent-color)',
    },
    dot: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: '#000000ff',
        border: '2px solid white',

        zIndex: 2,
    },
    labelsRow: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    resumeButton: {
        position: 'absolute',
        left: '24px',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        color: 'white',
        padding: '7px 14px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        whiteSpace: 'nowrap',
    },
    labels: {
        display: 'flex',

        width: '50%',
    },
    labelCell: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: '14px 0',
        cursor: 'pointer',
    },
    label: {
        fontSize: '18px',
        textTransform: 'uppercase',
        transition: 'color 0.4s ease',
        whiteSpace: 'nowrap',
    },
};

export default ProgressIndicator;
