import React, { useState, useEffect } from 'react';

/**
 * Helper to recursively extract plain text from React nodes / elements.
 */
const extractText = (node) => {
    if (!node) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node) && node.props && node.props.children) {
        return extractText(node.props.children);
    }
    return '';
};

/**
 * A component that truncates long text and adds a "Read More" toggle.
 * Optimized for mobile and touch screens.
 */
const ReadMore = ({ children, limit = 120, isMobileOnly = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const text = extractText(children);
    const shouldTruncate = isMobileOnly ? isMobile : true;

    if (!shouldTruncate || text.length <= limit) {
        return <>{children}</>;
    }

    const handleToggle = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsExpanded(prev => !prev);
    };

    return (
        <span style={{ transition: 'all 0.3s ease', display: 'inline' }}>
            {isExpanded ? children : `${text.substring(0, limit)}... `}
            <button 
                type="button"
                onClick={handleToggle}
                onTouchEnd={handleToggle}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563EB',
                    cursor: 'pointer',
                    fontWeight: '700',
                    padding: '0 4px',
                    fontSize: '0.72em',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    outline: 'none',
                    display: 'inline-block',
                    marginLeft: '4px',
                    position: 'relative',
                    zIndex: 50,
                    pointerEvents: 'auto'
                }}
            >
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </span>
    );
};

export default ReadMore;
