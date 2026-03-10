import { useRef, useEffect, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Noise Overlay Component for consistency with Home
const NoiseOverlay = () => (
    <div style={styles.noiseOverlay}></div>
);

// Cursor Glow Component for premium feel
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
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(51, 68, 221, 0.1), transparent 80%)`
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

const GridCell = memo(() => (
    <div className="projects-grid-cell" style={styles.gridCell}></div>
));

const InteractiveGrid = memo(() => {
    const cells = useMemo(() => Array.from({ length: 400 }), []);

    useEffect(() => {
        if (document.getElementById('projects-grid-styles')) return;
        const style = document.createElement('style');
        style.id = 'projects-grid-styles';
        style.innerHTML = `
            .projects-grid-cell { 
                transition: border-color 0.6s ease; 
                will-change: border-color;
            }
            .projects-grid-cell:hover { 
                border-color: #3344DD !important; 
                transition: border-color 0s !important; 
                z-index: 10; 
                will-change: border-color;
            }
        `;
        document.head.appendChild(style);
    }, []);

    return (
        <div style={styles.gridContainer}>
            {cells.map((_, i) => (
                <GridCell key={i} />
            ))}
        </div>
    );
});

const MockupCollage = ({ images, type = 'phone', themeColor, isHovered }) => {
    if (type === 'phone') {
        return (
            <div style={styles.collageContainer}>
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: isHovered
                                ? (index === 0 ? -22 : index === 1 ? 22 : 0)
                                : (index === 0 ? -8 : index === 1 ? 8 : 0),
                            x: isHovered
                                ? (index === 0 ? -80 : index === 1 ? 80 : 0)
                                : 0,
                            y: isHovered
                                ? (index === 2 ? -30 : 40)
                                : (index === 2 ? 0 : 20),
                            zIndex: index === 2 ? 3 : index === 1 ? 2 : 1,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                            delay: index === 0 ? 0 : index === 1 ? 0 : 0 // Smooth synced spread
                        }}
                        style={{
                            ...styles.phoneFrame,
                            position: index === 0 ? 'relative' : 'absolute',
                            borderColor: isHovered ? `${themeColor}AA` : `${themeColor}${index === 2 ? '88' : '22'}`,
                            boxShadow: isHovered
                                ? `0 40px 80px rgba(0,0,0,0.6), 0 0 20px ${themeColor}22`
                                : '0 30px 60px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div style={styles.phoneScreen}>
                            <img src={img} alt="Preview" style={styles.phoneImg} />
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <div style={styles.collageContainer}>
            {images.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: 1,
                        y: isHovered ? (index * 60 - 20) : (index * 40),
                        x: isHovered ? (index * -40) : (index * -30),
                        rotate: isHovered ? (index * -4) : 0,
                        scale: isHovered ? 1.05 : 1,
                        zIndex: index === 0 ? 3 : 2
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    style={{
                        ...styles.imgWrapper,
                        position: index === 0 ? 'relative' : 'absolute',
                        borderColor: isHovered ? `${themeColor}AA` : `${themeColor}44`,
                        boxShadow: isHovered ? `0 40px 80px rgba(0,0,0,0.6)` : '0 20px 60px rgba(0,0,0,0.4)',
                    }}
                >
                    <img src={img} alt="Preview" style={styles.img} />
                </motion.div>
            ))}
        </div>
    );
};

const ProjectCard = ({ project, onView, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                ...styles.card,
                gridColumn: index === 0 ? 'span 1' : 'span 1',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -10 }}
        >
            {/* Accent Background Glow */}
            <div style={{ ...styles.accentGlow, backgroundColor: project.themeColor }} />

            <div style={styles.cardHeader}>
                <span style={styles.cat}>{project.category}</span>
                <h3 style={styles.cardTitle}>{project.title}</h3>
            </div>

            <div style={styles.cardVisual}>
                <MockupCollage
                    images={project.images}
                    type={project.useMockup ? 'phone' : 'desktop'}
                    themeColor={project.themeColor}
                    isHovered={isHovered}
                />
            </div>

            <div style={styles.cardFooter}>
                <div style={styles.pillBox}>
                    {project.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="project-pill">{tag}</span>
                    ))}
                </div>
                <button
                    onClick={onView}
                    className="btn-view-projects"
                    style={styles.button}
                >
                    View Case Study
                </button>
            </div>
        </motion.div>
    );
};

const Projects = ({ onViewEcoIndex, onViewIntelliQ }) => {
    useEffect(() => {
        if (document.getElementById('projects-ui-styles')) return;
        const style = document.createElement('style');
        style.id = 'projects-ui-styles';
        style.innerHTML = `
            .btn-view-projects:hover { background: #FFF !important; color: #000 !important; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
            .btn-view-projects:active { transform: translateY(-1px); }
            .project-pill { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); padding: 4px 10px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; color: #8A8D91; letter-spacing: 0.05em; }
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
        `;
        document.head.appendChild(style);
    }, []);

    const projects = [
        {
            id: 'eco-index',
            title: 'EcoIndex',
            category: 'Sustainability • Product',
            description: 'A carbon intelligence platform designed to calculate and visualize emissions through behavioral design.',
            images: [
                '/src/assets/app/Page30.png',
                '/src/assets/app/Page23.png',
                '/src/assets/app/Page22.png',
            ],
            useMockup: true,
            themeColor: '#4ade80',
            tags: ['React', 'Analytics']
        },
        {
            id: 'intelliq',
            title: 'IntelliQ',
            category: 'Analytics • Enterprise',
            description: 'Advanced data-entry and analytics system for large-scale operations, featuring real-time visualization.',
            images: [
                '/src/assets/IntelliQ/HomeScreen.png',
                // '/src/assets/IntelliQ/ManageSheets.png',
                // '/src/assets/IntelliQ/Dashboard.png',
            ],
            themeColor: '#FF3366',
            tags: ['SaaS', 'B2B']
        }
    ];

    return (
        <div style={styles.container}>
            <NoiseOverlay />
            <CursorGlow />
            <InteractiveGrid />

            <div style={styles.contentWrapper}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={styles.header}
                >
                    <h2 style={styles.sectionTitle}>Featured Projects</h2>
                    <p style={styles.sectionSubtitle}>A glimpse into my recent work in product design and development.</p>
                </motion.div>

                <div style={styles.bentoGrid}>
                    <ProjectCard
                        project={projects[0]}
                        onView={onViewEcoIndex}
                        index={0}
                    />
                    <ProjectCard
                        project={projects[1]}
                        onView={onViewIntelliQ}
                        index={1}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 5%',
        backgroundColor: '#0D1117',
        position: 'relative',
        overflow: 'hidden',
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
        pointerEvents: 'none',
    },
    gridCell: {
        border: '0.5px solid rgba(255, 255, 255, 0.04)',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
    },
    noiseOverlay: {
        position: 'fixed',
        top: '-100%',
        left: '-100%',
        width: '300%',
        height: '300%',
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 50,
        animation: 'noise 10s steps(10) infinite',
    },
    contentWrapper: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        zIndex: 10,
        height: '100%',
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    sectionTitle: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: '900',
        color: '#F9FAFB',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '10px',
        letterSpacing: '-0.02em',
    },
    sectionSubtitle: {
        fontSize: '1rem',
        color: '#9CA3AF',
        fontFamily: "'Inter', sans-serif",
        fontWeight: '500',
    },
    bentoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0px',
        width: '100%',
        height: 'auto',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',

        border: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '30px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        cursor: 'default',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
    accentGlow: {
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        opacity: 0.15,
        filter: 'blur(60px)',
        zIndex: 0,
    },
    cardHeader: {
        position: 'relative',
        zIndex: 1,
    },
    cat: {
        color: '#8A8D91',
        fontWeight: '700',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        fontFamily: "'Outfit', sans-serif",
        display: 'block',
        marginBottom: '8px',
    },
    cardTitle: {
        fontSize: '1.8rem',
        fontWeight: '800',
        color: '#F9FAFB',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-0.02em',
    },
    cardVisual: {
        flex: 1,
        width: '100%',
        minHeight: '260px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    pillBox: {
        display: 'flex',
        gap: '8px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        color: '#FFF',
        fontWeight: '700',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
    },
    collageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgWrapper: {
        width: '85%',
        height: 'auto',
        aspectRatio: '16/10',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#131921',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'all 0.4s ease',
    },
    phoneFrame: {
        width: '140px',
        height: '280px',
        background: '#04070B',
        borderRadius: '28px',
        padding: '7px',
        border: '1px solid rgba(255,255,255,0.15)',
        position: 'relative',
        transition: 'all 0.4s ease',
        willChange: 'transform, opacity, border-color, box-shadow',
    },
    phoneScreen: {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#000',
    },
    phoneImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
};

export default Projects;
