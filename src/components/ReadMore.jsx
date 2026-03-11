import React, { useState, useEffect } from 'react';

/**
 * A component that truncates long text and adds a "Read More" toggle.
 * Optimized for mobile screens as per user request.
 */
const ReadMore = ({ children, limit = 150, isMobileOnly = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const text = children?.toString() || "";
    const shouldTruncate = isMobileOnly ? isMobile : true;

    if (!shouldTruncate || text.length <= limit) {
        return <>{children}</>;
    }

    return (
        <span style={{ transition: 'all 0.3s ease' }}>
            {isExpanded ? text : `${text.substring(0, limit)}...`}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-color, #3344DD)',
                    cursor: 'pointer',
                    fontWeight: '700',
                    padding: '0 5px',
                    fontSize: '0.85em',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    outline: 'none',
                    display: 'inline-block'
                }}
            >
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </span>
    );
};

export default ReadMore;
