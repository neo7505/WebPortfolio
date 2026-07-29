import React from 'react';

// Lightweight, pre-calculated noise SVG data URI for smooth 60fps rendering without live SVG filter overhead
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E`;

const ArtisticTexture = React.memo(() => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9998,
                backgroundImage: `url("${NOISE_SVG}")`,
                opacity: 0.4,
                mixBlendMode: 'multiply',
                transform: 'translateZ(0)',
                willChange: 'auto',
            }}
        />
    );
});

ArtisticTexture.displayName = 'ArtisticTexture';

export default ArtisticTexture;

