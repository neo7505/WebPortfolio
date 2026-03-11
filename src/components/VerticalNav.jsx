import React from 'react';

const VerticalNav = ({ sections, activeSectionIndex, onSectionClick }) => {
    if (!sections || sections.length === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.inner}>
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        style={styles.navItem}
                        onClick={() => onSectionClick(index)}
                    >
                        <span style={{
                            ...styles.label,
                            color: activeSectionIndex === index ? '#FFFFFF' : '#7A8099',
                            fontWeight: activeSectionIndex === index ? '800' : '600',
                            fontStyle: 'italic',
                        }}>
                            {activeSectionIndex === index && <span style={styles.dot}>. </span>}
                            {section.label.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '220px',
        zIndex: 500,
        backgroundColor: '#0D1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inner: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '0 28px',
    },
    navItem: {
        cursor: 'pointer',
    },
    label: {
        fontSize: '16px',
        letterSpacing: '0.12em',
        transition: 'all 0.3s ease',
        display: 'block',
    },
    dot: {
        fontSize: '1rem',
        verticalAlign: 'middle',
    }
};

export default VerticalNav;

// Add CSS to hide on mobile
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @media (max-width: 768px) {
      .vertical-nav-container { display: none !important; }
    }
  `;
  document.head.appendChild(styleSheet);
}
