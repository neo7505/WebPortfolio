import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { MousePointer2, PenTool, Zap, Sparkles } from 'lucide-react';
import { FLOWER_IMAGES } from '../constants/flower-images';
import { SketchUnderline, SketchCircle } from './HandDrawnAccents';
import Photo from "../assets/PhotoNo.png";

const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E`;

export const MovingBlobs = () => {
    return (
        <div style={styles.blobsContainer}>
            <div style={{ ...styles.blob, ...styles.blob1, animationName: 'blob1-anim' }} className="home-blob">
                <div style={styles.blobGrain}></div>
            </div>
            <div style={{ ...styles.blob, ...styles.blob2, animationName: 'blob2-anim' }} className="home-blob">
                <div style={styles.blobGrain}></div>
            </div>
            <div style={{ ...styles.blob, ...styles.blob3, animationName: 'blob3-anim' }} className="home-blob">
                <div style={styles.blobGrain}></div>
            </div>
        </div>
    );
};

// Noise Overlay Component - Static, lightweight, zero repaint overhead
export const NoiseOverlay = memo(() => (
    <div style={styles.noiseOverlay} />
));
NoiseOverlay.displayName = 'NoiseOverlay';

// Floating Creative Assets
export const FloatingAssets = memo(() => {
    const assets = useMemo(() => [
        { Icon: MousePointer2, size: 40, top: '15%', left: '10%', delay: 0 },
        { Icon: PenTool, size: 40, top: '25%', left: '85%', delay: 1 },
        { Icon: Zap, size: 32, top: '70%', left: '15%', delay: 0.5 },
        { Icon: Sparkles, size: 28, top: '65%', left: '80%', delay: 1.5 },
    ], []);

    return (
        <div style={styles.floatingContainer}>
            {assets.map((asset, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: asset.delay
                    }}
                    style={{
                        position: 'absolute',
                        top: asset.top,
                        left: asset.left,
                        opacity: 0.1,
                        color: 'var(--text-primary)',
                        willChange: 'transform',
                    }}
                >
                    <asset.Icon size={asset.size} />
                </motion.div>
            ))}
        </div>
    );
});
FloatingAssets.displayName = 'FloatingAssets';

// Split Text Component for Premium Title
const SplitText = memo(({ text, style }) => {
    return (
        <span style={{ display: 'inline-block', ...style }}>
            {text.split('').map((char, i) => (char === ' ' ? (
                <span key={i} style={{ display: 'inline-block', width: '0.25em' }}> </span>
            ) : (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.03,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{
                        display: 'inline-block',
                        willChange: 'opacity, transform',
                        color: 'inherit',
                        WebkitTextFillColor: 'inherit',
                    }}
                >
                    {char}
                </motion.span>
            )))}
        </span>
    );
});
SplitText.displayName = 'SplitText';

// Throttled Cursor Glow Component using RequestAnimationFrame
const CursorGlow = memo(() => {
    const glowRef = React.useRef(null);

    useEffect(() => {
        let rafId = null;
        let lastX = 0;
        let lastY = 0;

        const updatePosition = () => {
            if (glowRef.current) {
                glowRef.current.style.background = `radial-gradient(600px circle at ${lastX}px ${lastY}px, rgba(51, 68, 221, 0.07), transparent 80%)`;
            }
            rafId = null;
        };

        const handleMouseMove = (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
            if (!rafId) {
                rafId = requestAnimationFrame(updatePosition);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: -1,
                transform: 'translateZ(0)',
                willChange: 'background',
            }}
        />
    );
});
CursorGlow.displayName = 'CursorGlow';

// Inline CSS for the hover effect
const injectStyles = () => {
    if (document.getElementById('home-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'home-custom-styles';
    style.innerHTML = `
        .grid-cell {
            transition: border-color 0.4s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .grid-cell:hover {
            border-color: rgba(51, 68, 221, 0.4) !important;
            z-index: 10;
            box-shadow: 0 0 15px rgba(51, 68, 221, 0.2);
        }
        @keyframes blob1-anim {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
            33% { transform: translate3d(40px, -30px, 0) rotate(120deg); }
            66% { transform: translate3d(-20px, 20px, 0) rotate(240deg); }
        }
        @keyframes blob2-anim {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
            33% { transform: translate3d(-50px, 40px, 0) rotate(-120deg); }
            66% { transform: translate3d(30px, -40px, 0) rotate(-240deg); }
        }
        @keyframes blob3-anim {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
            33% { transform: translate3d(30px, 20px, 0) rotate(60deg); }
            66% { transform: translate3d(-40px, 50px, 0) rotate(120deg); }
        }
        @media (max-width: 768px) {
            .home-title { font-size: 32px !important; }
            .home-subtitle { font-size: 1rem !important; margin-bottom: 20px !important; }
            .home-image-container { width: 320px !important; height: 320px !important; margin-top: 130px !important; }
            .home-profile-img { width: 450px !important; height: 450px !important; }
            .home-blob { width: 200px !important; height: 200px !important; }
            .home-grid-container { 
                grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)) !important; 
                grid-auto-rows: 45px !important;
                pointer-events: auto !important;
            }
            .grid-cell { border-color: rgba(51, 68, 221, 0.03) !important; }
        }
    `;
    document.head.appendChild(style);
};

const GridCell = memo(({ autoReveal = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const flowerImage = useMemo(() =>
        FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)],
        []);

    const isOpen = isHovered || autoReveal;

    return (
        <div
            className="grid-cell"
            style={styles.gridCell}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isOpen && (
                <img
                    src={flowerImage}
                    alt=""
                    loading="lazy"
                    style={{
                        ...styles.flowerImg,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'scale(1)' : 'scale(0.85)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                    }}
                />
            )}
        </div>
    );
});
GridCell.displayName = 'GridCell';

export const InteractiveGrid = memo(() => {
    const [activeCellIndex, setActiveCellIndex] = useState(-1);

    useEffect(() => {
        injectStyles();

        // Single global timer for mobile/desktop auto-reveal instead of 400 individual intervals!
        const timer = setInterval(() => {
            if (Math.random() > 0.4) {
                const randomIdx = Math.floor(Math.random() * 400);
                setActiveCellIndex(randomIdx);
                setTimeout(() => setActiveCellIndex(-1), 2500);
            }
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const cells = useMemo(() => Array.from({ length: 400 }), []);

    return (
        <div style={styles.gridContainer} className="home-grid-container">
            {cells.map((_, i) => (
                <GridCell key={i} autoReveal={i === activeCellIndex} />
            ))}
        </div>
    );
});
InteractiveGrid.displayName = 'InteractiveGrid';

const Home = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    // Parallax transforms
    const textBaseX = useTransform(dx, [-500, 500], [15, -15]);
    const textBaseY = useTransform(dy, [-500, 500], [15, -15]);
    const imgBaseX = useTransform(dx, [-500, 500], [-20, 20]);
    const imgBaseY = useTransform(dy, [-500, 500], [-20, 20]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = clientX - window.innerWidth / 2;
        const y = clientY - window.innerHeight / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.container}
            onMouseMove={handleMouseMove}
        >
            <NoiseOverlay />
            <CursorGlow />
            <InteractiveGrid />
            <FloatingAssets />

            <div style={styles.content}>
                <motion.div style={{ x: textBaseX, y: textBaseY }}>
                    {/* Live Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={styles.statusBadge}
                    >
                        <span style={styles.statusDot}></span>
                        <span>AVAILABLE FOR UX & PRODUCT ROLES</span>
                    </motion.div>

                    <h1 style={styles.title} className="home-title">
                        <SplitText text="I'm " />
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ ...styles.gradientText, position: 'relative' }}
                        >
                            Chitrankar
                            <SketchCircle delay={1.2} />
                        </motion.span>
                        <SplitText text=", A " />

                        <span style={styles.italicAccent}>
                            <SplitText text="Product-Focused Engineer." />
                            <SketchUnderline delay={1.8} />
                        </span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        style={styles.subtitle}
                        className="home-subtitle"
                    >
                        <span>UX/Product Designer with 2+ years of experience crafting enterprise SaaS from <strong>0 → 1</strong>.</span>
                        <br />
                        <span style={styles.subtitleSubtext}>
                            Translating complex workflow challenges into intuitive, data-driven user experiences.
                        </span>
                    </motion.p>

                    {/* Designer Specialty Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        style={styles.specialtyContainer}
                    >
                        <span style={styles.specialtyTag}>🎨 UX & Interaction Design</span>
                        <span style={styles.specialtyTag}>⚡ 0 → 1 Enterprise SaaS</span>
                        <span style={styles.specialtyTag}>📊 Information Architecture</span>
                        <span style={styles.specialtyTag}>📐 Design Systems</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{
                        ...styles.imageContainer,
                        x: imgBaseX,
                        y: imgBaseY
                    }}
                    className="home-image-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <MovingBlobs />
                    <img
                        src={Photo}
                        alt="Chitrankar"
                        style={styles.profileImg}
                        className="home-profile-img"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x400?text=Profile";
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        maxWidth: '900px',
        position: 'relative',
        zIndex: 1,
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '20px',
        padding: '6px 16px',
        marginBottom: '24px',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '1.2px',
        color: '#1A1A1A',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
        boxShadow: '0 0 10px #10B981',
    },
    specialtyContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
    },
    specialtyTag: {
        fontSize: '0.82rem',
        fontWeight: '600',
        padding: '6px 14px',
        borderRadius: '30px',
        backgroundColor: '#FFFFFF',
        color: '#222222',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        transition: 'transform 0.2s ease, boxShadow 0.2s ease',
    },
    subtitleSubtext: {
        fontSize: '1rem',
        color: '#666666',
        fontWeight: '400',
    },
    floatingChip: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '14px',
        padding: '8px 14px',
        fontSize: '0.78rem',
        fontWeight: '700',
        color: '#111111',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    title: {
        fontSize: '48px',
        fontWeight: '700',
        marginBottom: '20px',
        color: 'var(--text-primary)',
        lineHeight: '1.2',
        fontFamily: "'Outfit', sans-serif",
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        margin: '0 auto 40px auto',
        maxWidth: '800px',
        fontWeight: '400',
        lineHeight: '1.6',
    },
    gradientText: {
        background: 'linear-gradient(to right, #5078FF, #FF64C8, #64DCFF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        fontWeight: '800',
    },
    italicAccent: {
        fontStyle: 'italic',
        color: 'var(--text-primary)',
        display: 'inline-block',
        position: 'relative',
        fontWeight: '300',
    },
    subtitleHighlight: {
        color: 'var(--text-primary)',
        fontWeight: '600',
        position: 'relative',
        display: 'inline-block',
        padding: '0 4px',
    },
    imageContainer: {
        position: 'relative',
        width: '400px',
        height: '400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        position: 'relative',
        height: '600px',
        width: '600px',
        objectFit: 'contain',
        zIndex: 1,
        pointerEvents: 'none',
    },
    gridContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
        gridAutoRows: '60px',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    gridCell: {
        border: '0.5px solid rgba(0, 0, 0, 0.06)',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        position: 'relative',
        overflow: 'hidden',
    },
    noiseOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url("${NOISE_SVG}")`,
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 50,
        transform: 'translateZ(0)',
    },
    floatingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
    },
    flowerImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
    },
    blobsContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.8,
        pointerEvents: 'none',
    },
    blob: {
        position: 'absolute',
        width: '350px',
        height: '350px',
        opacity: 0.9,
        willChange: 'transform',
        animationDuration: '25s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
    },
    blob1: {
        background: '#5078FF',
        top: '25%',
        left: '5%',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    },
    blob2: {
        background: '#FF64C8',
        bottom: '2%',
        right: '5%',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    },
    blob3: {
        background: '#64DCFF',
        bottom: '10%',
        left: '35%',
        borderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%',
    },
    blobGrain: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        opacity: 0.4,
        mixBlendMode: 'overlay',
        borderRadius: 'inherit',
    }
};

export default Home;
