import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { MousePointer2, PenTool, Zap, Sparkles } from 'lucide-react';
import { FLOWER_IMAGES } from '../constants/flower-images';
import { SketchUnderline, SketchCircle } from './HandDrawnAccents';
// import Photo from "../assets/Group 5.png";
import Photo from "../assets/PhotoNo.png";

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

// Noise Overlay Component
export const NoiseOverlay = () => (
    <div style={styles.noiseOverlay}></div>
);

// Floating Creative Assets
export const FloatingAssets = () => {
    const assets = [
        { Icon: MousePointer2, size: 40, top: '15%', left: '10%', delay: 0 },
        { Icon: PenTool, size: 40, top: '25%', left: '85%', delay: 1 },
        { Icon: Zap, size: 32, top: '70%', left: '15%', delay: 0.5 },
        { Icon: Sparkles, size: 28, top: '65%', left: '80%', delay: 1.5 },
    ];

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
                    }}
                >
                    <asset.Icon size={asset.size} />
                </motion.div>
            ))}
        </div>
    );
};

// Split Text Component for Premium Title
const SplitText = ({ text }) => {
    return (
        <span style={{ display: 'inline-block' }}>
            {text.split('').map((char, i) => (char === ' ' ? (
                <span key={i} style={{ display: 'inline-block', width: '0.25em' }}> </span>
            ) : (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.04,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char}
                </motion.span>
            )))}
        </span>
    );
};

// Cursor Glow Component
const CursorGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(51, 68, 221, 0.07), transparent 80%)`
    );

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: -1,
                background: background
            }}
        />
    );
};

// Inline CSS for the hover effect and noise
const injectStyles = () => {
    if (document.getElementById('home-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'home-custom-styles';
    style.innerHTML = `
        .grid-cell {
            transition: border-color 0.6s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .grid-cell:hover {
            border-color: rgba(51, 68, 221, 0.4) !important;
            transition: border-color 0s !important;
            z-index: 10;
            box-shadow: 0 0 15px rgba(51, 68, 221, 0.2);
            will-change: transform;
        }
        @keyframes blob1-anim {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(40px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes blob2-anim {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(-50px, 40px) rotate(-120deg); }
            66% { transform: translate(30px, -40px) rotate(-240deg); }
        }
        @keyframes blob3-anim {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, 20px) rotate(60deg); }
            66% { transform: translate(-40px, 50px) rotate(120deg); }
        }
        @keyframes noise {
            0%, 100% { transform: translate(0, 0) }
            10% { transform: translate(-5%, -10%) }
            20% { transform: translate(-15%, 5%) }
            30% { transform: translate(7%, -25%) }
            40% { transform: translate(-5%, 25%) }
            50% { transform: translate(-15%, 10%) }
            60% { transform: translate(15%, 0) }
            70% { transform: translate(0, 15%) }
            80% { transform: translate(3%, 35%) }
            90% { transform: translate(-10%, 10%) }
        }
        @media (max-width: 768px) {
            .home-container-alt { padding-top: 40px !important; }
            .home-title { font-size: 32px !important; }
            .home-subtitle { font-size: 1rem !important; margin-bottom: 20px !important; }
            .home-image-container { width: 320px !important; height: 320px !important; }
            .home-profile-img { width: 480px !important; height: 480px !important; }
            .home-blob { width: 280px !important; height: 280px !important; }
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

const GridCell = memo(({ initialOpen = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [autoReveal, setAutoReveal] = useState(false);
    const flowerImage = useMemo(() =>
        FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)],
        []);

    useEffect(() => {
        // Only run auto-reveal logic on mobile
        if (window.innerWidth >= 768) return;

        const triggerAutoReveal = () => {
            // Randomly decide whether to reveal
            if (Math.random() > 0.97) { // 3% chance per pulse
                setAutoReveal(true);
                setTimeout(() => setAutoReveal(false), 2000 + Math.random() * 3000); // Stay open for 2-5s
            }
        };

        const interval = setInterval(triggerAutoReveal, 4000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);

    const isOpen = isHovered || autoReveal || initialOpen;

    return (
        <div
            className="grid-cell"
            style={styles.gridCell}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.img
                        src={flowerImage}
                        initial={initialOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                            ...styles.flowerImg,
                            willChange: 'opacity, scale'
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
});

export const InteractiveGrid = memo(() => {
    useEffect(() => {
        injectStyles();
    }, []);

    const cells = useMemo(() => Array.from({ length: 400 }), []);
    const initialOpenIndex = useMemo(() => Math.floor(Math.random() * 80) + 40, []);

    return (
        <div style={styles.gridContainer} className="home-grid-container">
            {cells.map((_, i) => (
                <GridCell key={i} initialOpen={i === initialOpenIndex} />
            ))}
        </div>
    );
});

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
                    <h1 style={styles.title} className="home-title">
                        <SplitText text="I'm " />
                        <span style={{ ...styles.gradientText, position: 'relative' }}>
                            <SplitText text="Chitrankar" />
                            <SketchCircle delay={1.2} />
                        </span>
                        <SplitText text=", A " />

                        <span style={styles.italicAccent}>
                            <SplitText text="Product Designer." />
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
                        <span>A techie with a creative mind.</span>
                        <br />
                        I turn complex ideas into {" "}
                        <span style={styles.subtitleHighlight}>
                            products people actually use.
                        </span>
                    </motion.p>
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

        paddingTop: '270px',
        marginLeft: '30px',
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
        top: '-100%',
        left: '-100%',
        width: '300%',
        height: '300%',
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        opacity: 0.05,
        pointerEvents: 'none',
        zIndex: 50,
        animation: 'noise 8s steps(10) infinite',
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
