import React from 'react';

const ArtisticTexture = () => {
    return (
        <div style={styles.textureWrapper}>
            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <filter id="paper-texture">
                    {/* Organic grain */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
                        <feDistantLight azimuth="45" elevation="60" />
                    </feDiffuseLighting>
                </filter>
                
                <filter id="ink-bleed">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                </filter>
            </svg>
            
            <div style={styles.overlay}></div>
        </div>
    );
};

const styles = {
    textureWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.03, // Very subtle
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'url(#paper-texture)',
        mixBlendMode: 'multiply',
    }
};

export default ArtisticTexture;
