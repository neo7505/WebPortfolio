import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Target, Layers, Zap, Globe, X, Maximize2 } from 'lucide-react';
import ReadMore from './ReadMore';


const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
    })
};

const float = {
    animate: {
        y: [0, -15, 0],
        rotate: [0, 5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

/* ─── Carbon Particles Background ──────────────────────── */
const CarbonParticles = React.memo(() => {
    const particles = React.useMemo(() => [...Array(12)].map((_, i) => ({
        id: i,
        x: (i * 8.3) + '%',
        y: (i * 7.5) + '%',
        duration: 25 + (i % 5) * 4,
        delay: (i % 4) * 2.5,
        size: (i % 3) * 2 + 3 + 'px'
    })), []);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        x: p.x,
                        y: p.y,
                        opacity: 0.1
                    }}
                    animate={{
                        y: [null, '-100%'],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        backgroundColor: '#111',
                        borderRadius: '50%',
                        willChange: 'transform, opacity',
                        transform: 'translateZ(0)',
                    }}
                />
            ))}
        </div>
    );
});
CarbonParticles.displayName = 'CarbonParticles';

/* ─── Decorative Leaf Component ────────────────────────── */
const FloatingLeaf = ({ style, delay = 0 }) => (
    <motion.div
        variants={float}
        animate="animate"
        style={{
            position: 'absolute',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.6,
            ...style
        }}
        transition={{ delay }}
    >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 2 12 6 12 12C12 18 16 22 16 22C16 22 20 18 20 12C20 6 16 2 12 2Z" fill="#4ade80" />
            <path d="M12 2C12 2 12 6 12 12C12 18 8 22 8 22C8 22 4 18 4 12C4 6 8 2 12 2Z" fill="#22c55e" />
        </svg>
    </motion.div>
);

/* ─── Lightbox Component ────────────────────────── */
const Lightbox = ({ src, alt, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={styles.lightboxOverlay}
    >
        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <button style={styles.lightboxClose} onClick={onClose}><X size={24} /></button>
            <img src={src} alt={alt} style={styles.lightboxImg} />
        </div>
    </motion.div>
);

/* ─── Reusable mobile phone mockup ─────────────────────── */
const PhoneFrame = ({ src, alt, style = {}, onExpand }) => (
    <div style={{ ...phoneFrameStyle, ...style, cursor: onExpand ? 'pointer' : 'default' }} onClick={onExpand} className="eco-zoom-container">
        <div style={phoneInner}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {onExpand && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '4px', opacity: 0, transition: 'opacity 0.2s' }} className="eco-zoom-icon">
                <Maximize2 size={12} color="#fff" />
            </div>
        )}
    </div>
);

/* ─── Reusable desktop browser mockup ─────────────────── */
const BrowserFrame = ({ src, alt, onExpand }) => (
    <div style={{ ...browserFrameStyle, cursor: onExpand ? 'pointer' : 'default' }} onClick={onExpand} className="eco-zoom-container">
        <div style={browserBar}>
            <div style={{ display: 'flex', gap: '6px' }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c }} />
                ))}
            </div>
            <div style={addressBar}>{alt}</div>
            {onExpand && <Maximize2 size={14} color="#999" />}
        </div>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    </div>
);

const phoneFrameStyle = {
    width: '200px',
    flexShrink: 0,
    background: '#1a1a1a',
    borderRadius: '32px',
    padding: '4px', // Thinner bezel
    boxShadow: 'none', // Removed shadow
    border: '1px solid rgba(0,0,0,0.1)',
};

const phoneInner = {
    width: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    background: '#000',
    aspectRatio: '9/19',
    position: 'relative',
};

const browserFrameStyle = {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 'none', // Removed shadow
    border: '1px solid #e8e8e8',
    background: '#fff',
};

const browserBar = {
    height: '44px',
    background: '#f5f5f5',
    borderBottom: '1px solid #e8e8e8',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 16px',
};

const addressBar = {
    flex: 1,
    background: '#e8e8e8',
    borderRadius: '6px',
    height: '24px',
    fontSize: '11px',
    color: '#777',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
};

/* ─── Scroll Progress Bar ──────────────────────────────── */
const ScrollProgress = ({ containerRef }) => {
    const { scrollYProgress } = useScroll({
        container: containerRef
    });
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 64,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--accent-color)',
                scaleX,
                transformOrigin: '0%',
                zIndex: 60,
            }}
        />
    );
};

/* ─── Section label ────────────────────────────────────── */
const Label = ({ children }) => (
    <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '16px' }}>
        {children}
    </p>
);

/* ─── Divider ──────────────────────────────────────────── */
const Divider = () => <div style={{ height: '1px', background: '#ebebeb', margin: '0 5%' }} />;

/* ─── Animated section wrapper ─────────────────────────── */
const Reveal = ({ children, delay = 0, style = {} }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        custom={delay}
        viewport={{ once: true, amount: 0.2 }}
        style={style}
    >
        {children}
    </motion.div>
);

const heroBentoWrapper = {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridAutoRows: 'minmax(100px, auto)',
    gap: '24px',
    maxWidth: '1280px',
    margin: '60px auto 0',
    padding: '0 5% 100px 5%',
};

const bentoCard = {
    background: '#fff',
    borderRadius: '24px',
    border: '1px solid #ebebeb',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
};

const EcoIndexCaseStudy = ({ onBack }) => {
    const containerRef = React.useRef(null);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Inject scoped CSS
    useEffect(() => {
        if (document.getElementById('eco-case-styles')) return;
        const s = document.createElement('style');
        s.id = 'eco-case-styles';
        s.innerHTML = `
            .eco-back-btn:hover { background: #f0f0f0 !important; }
            .eco-footer-btn:hover { opacity: 0.85; transform: translateY(-2px); }
            .eco-scope-card:hover { border-color: var(--accent-color) !important; }
            .eco-problem-card:hover { transform: translateY(-4px); border-color: var(--accent-color) !important; }
            .eco-problem-card { transition: all 0.3s ease; border: 1px solid #ebebeb !important; box-shadow: none !important; }
            .eco-zoom-container { transition: transform 0.3s ease; position: relative; }
            .eco-zoom-container:hover { transform: scale(1.02); }
            .eco-zoom-container:hover .eco-zoom-icon { opacity: 1 !important; }

            @media (max-width: 768px) {
                #case-study-root { padding-top: 0 !important; }
                .eco-nav { padding: 0 16px !important; }
                .eco-hero-title { font-size: 2.2rem !important; line-height: 1.1 !important; }
                .eco-hero-info { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
                .eco-bento-wrapper { 
                    grid-template-columns: 1fr !important; 
                    gap: 16px !important;
                    margin-top: 40px !important;
                    padding-bottom: 60px !important;
                }
                .eco-bento-card { 
                    grid-column: span 1 !important; 
                    grid-row: auto !important;
                    padding: 24px !important;
                }
                .eco-bento-card.onboarding { flex-direction: column !important; }
                .eco-section { padding: 60px 0 !important; }
                .eco-section-inner { padding: 0 20px !important; }
                .eco-h2 { font-size: 1.8rem !important; }
                .eco-grid-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
                .eco-grid-3col { grid-template-columns: 1fr !important; gap: 20px !important; }
                .eco-mobile-flex { flex-direction: column !important; gap: 24px !important; }
                .eco-browser-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                .eco-impact-grid { grid-template-columns: 1fr !important; }
                .eco-impact-item { padding: 40px 20px !important; }
                .eco-footer { padding: 60px 20px !important; }
                .eco-onboarding-mockups { height: auto !important; margin-top: 20px !important; }
                .eco-onboarding-mockup-1 { position: static !important; width: 100% !important; max-width: 140px !important; }
                .eco-onboarding-mockup-2 { position: static !important; width: 100% !important; max-width: 140px !important; }
                .eco-mockup-row { flex-direction: row !important; overflow-x: auto !important; padding-bottom: 10px !important; }
            }
        `;
        document.head.appendChild(s);
    }, []);

    const openLightbox = (src, alt) => setLightboxImage({ src, alt });

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={styles.container}
            id="case-study-root"
        >

            <ScrollProgress containerRef={containerRef} />
            <CarbonParticles />
            <FloatingLeaf style={{ top: '150px', left: '10%' }} delay={0} />
            <FloatingLeaf style={{ top: '400px', right: '5%' }} delay={2} />
            <FloatingLeaf style={{ top: '800px', left: '2%' }} delay={1} />
            <FloatingLeaf style={{ top: '1200px', right: '10%' }} delay={3} />
            <FloatingLeaf style={{ top: '2000px', left: '8%' }} delay={0.5} />
            <FloatingLeaf style={{ bottom: '200px', right: '4%' }} delay={1.5} />

            {/* ── Sticky Nav ───────────────────── */}
            <nav style={styles.nav} className="eco-nav">
                <button onClick={onBack} style={styles.backBtn} className="eco-back-btn">
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    <span>Projects</span>
                </button>
                <span style={styles.navTitle}>EcoIndex</span>
                <div style={{ width: 90 }} />
            </nav>

            {/* ── Hero ─────────────────────────── */}
            <section style={styles.hero}>
                <div style={styles.heroInner}>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                        <Label>Behavioral UX & Data Viz · Case Study</Label>
                        <h1 style={styles.heroTitle}>
                            EcoIndex: Carbon Intelligence Platform
                        </h1>
                        <p style={{ ...styles.body, fontSize: '1.2rem', marginTop: '16px', color: '#444', maxWidth: '800px' }}>
                            Translating abstract environmental metrics into intuitive, actionable user behaviors to drive organizational carbon reductions.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.25} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', borderTop: '1px solid #e8e8e8', paddingTop: '32px', marginTop: '40px' }}>
                        {[
                            { label: 'Role', value: 'Lead Product Designer & UX Strategist (End-to-End)' },
                            { label: 'Timeline & Tools', value: '12 Weeks (Q1 2025) · Figma, React, Framer Motion, Recharts' },
                            { label: 'Platform & Scope', value: 'Responsive Web Dashboard + Native Mobile App' },
                            { label: 'Core Target Metric', value: '-20% CO₂ average per attendee; +30% onboarding completion' },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ background: '#fcfcfc', border: '1px solid #ebebeb', padding: '16px', borderRadius: '12px' }}>
                                <p style={{ fontSize: '0.7rem', color: '#999', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{label}</p>
                                <p style={{ fontWeight: '700', fontSize: '0.9rem', lineHeight: '1.4', color: '#111' }}>{value}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero — Bento Dashboard Collage */}
                <div style={heroBentoWrapper} className="eco-bento-wrapper">
                    {/* Main Phone (Dashboard) */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 4', padding: '40px', background: '#F9FFF9', border: '1px solid #D1F2D1' }} className="eco-bento-card">
                        <Label>Real-time Tracking</Label>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Your Carbon Footprint at a Glance</h3>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <PhoneFrame src="/assets/app/Page22.png" alt="Dashboard" style={{ width: '100%', maxWidth: '200px' }} onExpand={() => openLightbox("/assets/app/Page22.png", "Dashboard")} />
                        </div>
                    </div>

                    {/* Onboarding Trio */}
                    <div style={{ ...bentoCard, gridColumn: 'span 8', gridRow: 'span 2', padding: '32px', background: '#fdfdfd', display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }} className="eco-bento-card onboarding">
                        <div style={{ flex: 1 }}>
                            <Label>Experience</Label>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>Intuitive Onboarding</h3>
                            <p style={styles.body}>
                                <ReadMore limit={100}>
                                    Seamlessly guiding users through their sustainability journey from day one.
                                </ReadMore>
                            </p>

                        </div>
                        <div style={{ display: 'flex', gap: '16px' }} className="eco-mockup-row">
                            <PhoneFrame src="/assets/app/Page2.png" alt="Onboarding 1" style={{ width: '140px' }} onExpand={() => openLightbox("/assets/app/Page2.png", "Onboarding 1")} />
                            <PhoneFrame src="/assets/app/Page3.png" alt="Onboarding 2" style={{ width: '140px' }} onExpand={() => openLightbox("/assets/app/Page3.png", "Onboarding 2")} />
                        </div>
                    </div>

                    {/* Stats / Carbon Counter */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 2', padding: '32px', background: '#111', color: '#fff' }} className="eco-bento-card">
                        <div style={{ height: '40px', width: '40px', borderRadius: '50%', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <Zap size={20} color="#4ade80" strokeWidth={2.5} />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#4ade80', lineHeight: 1 }}>550 kg</div>
                        <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600', marginTop: '8px' }}>Monthly Average saved</p>
                    </div>

                    {/* Data Collection Card */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 2', padding: '32px', background: '#fafafa' }} className="eco-bento-card">
                        <Label>Precision</Label>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Detailed Emission Modeling</h3>
                        <div style={{ display: 'flex', gap: '12px', overflowX: 'hidden' }} className="eco-mockup-row">
                            <PhoneFrame src="/assets/app/Page9.png" alt="Data 1" style={{ width: '100px', flexShrink: 0 }} onExpand={() => openLightbox("/assets/app/Page9.png", "Data 1")} />
                            <PhoneFrame src="/assets/app/Page11.png" alt="Data 2" style={{ width: '100px', flexShrink: 0 }} onExpand={() => openLightbox("/assets/app/Page11.png", "Data 2")} />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Problem & Behavioral Challenges ─────────────────── */}
            <section style={{ ...styles.section, background: '#F9FFF9' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }} className="eco-grid-2col">
                        <Reveal>
                            <Label>The Problem & Constraints</Label>
                            <h2 style={styles.h2} className="eco-h2">The Psychological Barriers to Sustainability</h2>
                            <p style={{ ...styles.body, marginTop: '16px' }}>
                                Carbon tracking fails because metrics like <em>kg of CO₂e</em> are too abstract. We had to solve two key product friction points:
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                                {[
                                    { title: 'The Abstract Metric Gap', desc: 'Confronting users with raw scientific numbers (e.g. 15.4 kg CO₂) triggers cognitive fatigue. We needed to map data to tangible human equivalents.' },
                                    { title: 'The Data Input Friction', desc: 'Calculating Scope 3 emissions (attendee transit, accommodation, catering) manually drops onboarding rates. We needed progressive disclosure.' }
                                ].map(({ title, desc }) => (
                                    <div key={title} style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e0e0e0' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '8px', color: '#111' }}>{title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', marginTop: '80px', alignItems: 'center' }} className="eco-grid-2col">
                        <Reveal>
                            <Label>Behavioral UX Strategy</Label>
                            <h3 style={styles.h3}>Translating Abstract Values into Relatable Actions</h3>
                            <p style={styles.body}>
                                Instead of showing raw data points, we translated values to clear, physical benchmarks:
                            </p>
                            <ul style={{ ...styles.list, marginTop: '16px', paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}>Raw Value: <strong>12.4 kg CO₂e</strong> &rarr; Translated: <em>"Equivalent to driving a standard gas car for 31 miles."</em></li>
                                <li style={{ marginBottom: '8px' }}>Offset Benchmark: &rarr; <em>"Equivalent to the daily absorption rate of 2 adult pine trees."</em></li>
                            </ul>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div style={{ padding: '32px', background: '#fff', borderRadius: '20px', border: '1.5px solid #22c55e', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-12px', left: '20px', background: '#22c55e', color: '#fff', fontSize: '0.65rem', fontWeight: '800', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    UX Decision & Trade-off
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginTop: '8px', marginBottom: '12px', color: '#111' }}>Reframing Negative Reinforcement</h4>
                                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', marginBottom: '12px' }}>
                                    <strong>What we dropped:</strong> A red "High Carbon Danger" flag for high-emission meals or flights.
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                                    <strong>Why:</strong> User testing showed negative labeling triggered defensive avoidance (users simply closed the app to avoid guilt). We replaced it with a <em>"Carbon Saver Streak"</em> focusing on relative reductions.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── User Personas ───────────────────── */}
            <section style={styles.section} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <Label>User Research</Label>
                        <h2 style={styles.h2} className="eco-h2">Who are we designing for?</h2>
                    </Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="eco-grid-2col">
                        {[
                            {
                                name: 'Rahul Negi, Corporate Event Planner',
                                goal: 'Needs to generate verifiable sustainability reports for stakeholders without spending hours manually calculating emissions.',
                                pain: 'Fragmented data sources, lack of standardized emission factors, and complex reporting frameworks.'
                            },
                            {
                                name: 'Anjali Bansal, CEO Ecoindex',
                                goal: 'Wants to understand the personal impact of attending events and discover actionable ways to reduce their footprint.',
                                pain: 'Abstract metrics, lack of motivation, and disconnected reward systems.'
                            }
                        ].map((persona, i) => (
                            <Reveal key={persona.name} delay={i * 0.15}>
                                <div style={{ padding: '32px', borderRadius: '24px', border: '1px solid #ebebeb', background: i === 0 ? '#fdfdfd' : '#fff', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-color)', opacity: 0.2 }} />
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{persona.name}</h3>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Goal</p>
                                        <p style={{ fontSize: '0.95rem', color: '#333', marginTop: '4px' }}>{persona.goal}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Core Pain Point</p>
                                        <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '4px' }}>{persona.pain}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Objective ────────────────────── */}
            <section style={{ ...styles.section, background: '#fafafa' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <Reveal style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                        <Label>Objective</Label>
                        <h2 style={{ ...styles.h2, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }} className="eco-h2">
                            Transform environmental awareness into measurable sustainability outcomes
                        </h2>
                        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', textAlign: 'left' }} className="eco-grid-2col">
                            {[
                                'Calculate emissions from events and daily activities',
                                'Track across transport, housing, food, and energy',
                                'Visualize impact in clear and actionable ways',
                                'Drive behavior change through challenges and rewards',
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                                    <CheckCircle2 size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <Divider />

            {/* ── Prioritization (RICE) ─────────────── */}
            <section style={{ ...styles.section, background: '#fafafa' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'center' }} className="eco-grid-2col">
                        <Reveal>
                            <Label>Product Strategy</Label>
                            <h2 style={styles.h2} className="eco-h2">Prioritizing the Roadmap via RICE</h2>
                            <p style={{ ...styles.body, marginTop: '16px' }}>
                                To maximize ROI and environmental impact, we prioritized features using the RICE scoring model (Reach × Impact × Confidence ÷ Effort).
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                                    <thead>
                                        <tr style={{ background: '#111', color: '#fff', textAlign: 'left' }}>
                                            <th style={{ padding: '16px' }}>Feature</th>
                                            <th style={{ padding: '16px' }}>R</th>
                                            <th style={{ padding: '16px' }}>I</th>
                                            <th style={{ padding: '16px' }}>C</th>
                                            <th style={{ padding: '16px' }}>E</th>
                                            <th style={{ padding: '16px' }}>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Scope 1/2/3 Tracking', r: 'High', i: '3 (Massive)', c: '90%', e: '3 (L)', score: '270' },
                                            { name: 'Gamification & Streaks', r: 'Med', i: '2 (High)', c: '80%', e: '2 (M)', score: '160' },
                                            { name: 'IoT Energy Sync', r: 'Low', i: '2 (High)', c: '50%', e: '5 (XL)', score: '40' }
                                        ].map((row, i) => (
                                            <tr key={row.name} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '16px', fontWeight: '700' }}>{row.name}</td>
                                                <td style={{ padding: '16px', color: '#666' }}>{row.r}</td>
                                                <td style={{ padding: '16px', color: '#666' }}>{row.i}</td>
                                                <td style={{ padding: '16px', color: '#666' }}>{row.c}</td>
                                                <td style={{ padding: '16px', color: '#666' }}>{row.e}</td>
                                                <td style={{ padding: '16px', fontWeight: '800', color: 'var(--accent-color)' }}>{row.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Carbon Model ─────────────────── */}
            <section style={{ ...styles.section, background: '#0d0d0d', color: '#fff' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'center' }} className="eco-grid-2col">
                        <Reveal>
                            <Label>Methodology</Label>
                            <h2 style={{ ...styles.h2, color: '#fff' }} className="eco-h2">Carbon emission model</h2>
                            <p style={{ ...styles.body, color: '#aaa', marginTop: '16px' }}>
                                Emissions are categorized using the globally recognized carbon accounting framework.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {[
                                    { scope: 'Scope 1', label: 'Direct Emissions', items: 'Fuel usage · On-site generators · Gas consumption', color: '#4ade80' },
                                    { scope: 'Scope 2', label: 'Energy Emissions', items: 'Electricity usage · Venue energy consumption', color: '#60a5fa' },
                                    { scope: 'Scope 3', label: 'Indirect Emissions', items: 'Attendee travel · Accommodation · Food · Materials · Waste', color: '#f472b6' },
                                ].map(({ scope, label, items, color }) => (
                                    <div key={scope} className="eco-scope-card" style={{ padding: '24px 28px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', transition: 'border-color 0.3s ease', display: 'flex', gap: '24px', alignItems: 'center' }}>
                                        <div style={{ width: '4px', height: '48px', background: color, borderRadius: '4px', flexShrink: 0 }} />
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '4px' }}>{scope}</p>
                                            <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '4px' }}>{label}</h4>
                                            <p style={{ color: '#888', fontSize: '0.9rem' }}>{items}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Event Platform ───────────────── */}
            <section style={styles.section}>
                <div style={styles.sectionInner}>
                    <Reveal>
                        <Label>Event Platform</Label>
                        <h2 style={styles.h2}>Event Sustainability Dashboard</h2>
                        <p style={{ ...styles.body, maxWidth: '560px', marginTop: '12px' }}>
                            A web-based platform for event organizers to measure emissions across the full event lifecycle — before, during, and after.
                        </p>
                    </Reveal>

                    {/* Main Dashboard — large browser frame */}
                    <Reveal delay={0.15} style={{ marginTop: '48px' }}>
                        <BrowserFrame src="/assets/app/EventDashboard.png" alt="Event Dashboard" onExpand={() => openLightbox("/assets/app/EventDashboard.png", "Event Dashboard")} />
                    </Reveal>

                    {/* Supporting desktop screens — 3-col grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }} className="eco-browser-grid">
                        {['AddEvent.png', 'EnergyConsumption.png', 'MealConsumption.png'].map((img, i) => (
                            <Reveal key={img} delay={i * 0.08}>
                                <BrowserFrame src={`/assets/app/${img}`} alt={img.replace('.png', '')} onExpand={() => openLightbox(`/assets/app/${img}`, img.replace('.png', ''))} />
                            </Reveal>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }} className="eco-grid-2col">
                        {['Transport.png', 'WasteTracking.png'].map((img, i) => (
                            <Reveal key={img} delay={i * 0.08}>
                                <BrowserFrame src={`/assets/app/${img}`} alt={img.replace('.png', '')} onExpand={() => openLightbox(`/assets/app/${img}`, img.replace('.png', ''))} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            <section style={{ ...styles.section, background: '#fafafa' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <Reveal>
                        <Label>Mobile Experience Architecture</Label>
                        <h2 style={styles.h2} className="eco-h2">Personal Carbon Tracking App</h2>
                        <p style={{ ...styles.body, maxWidth: '580px', marginTop: '12px' }}>
                            A native companion app designed to lower entry friction, establish habit streaks, and render abstract carbon footprints relatable.
                        </p>
                    </Reveal>

                    {/* Mobile App Bento Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', marginTop: '64px' }} className="eco-bento-wrapper">

                        {/* Onboarding Box */}
                        <div style={{ gridColumn: 'span 7', background: '#fff', borderRadius: '32px', border: '1px solid #ebebeb', padding: '48px', overflow: 'hidden', display: 'flex', gap: '32px', alignItems: 'center' }} className="eco-bento-card onboarding">
                            <div style={{ flex: 1 }}>
                                <Label>Phase 1: Onboarding</Label>
                                <h3 style={styles.h3}>Progressive Disclosure</h3>
                                <p style={styles.body}>
                                    Replacing an 18-field lifestyle form with a 3-step conversational flow. Completion rates increased from <strong>42% to 72%</strong>.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', position: 'relative', height: '320px', alignItems: 'flex-end' }} className="eco-onboarding-mockups">
                                <PhoneFrame src="/assets/app/Page2.png" alt="Onboarding Step 1" style={{ width: '160px', position: 'absolute', right: '40px', bottom: '-40px' }} onExpand={() => openLightbox("/assets/app/Page2.png", "Onboarding Step 1")} />
                                <PhoneFrame src="/assets/app/Page3.png" alt="Onboarding Step 2" style={{ width: '160px', position: 'relative', zIndex: 2 }} onExpand={() => openLightbox("/assets/app/Page3.png", "Onboarding Step 2")} />
                            </div>
                        </div>

                        {/* Data Collection Box */}
                        <div style={{ gridColumn: 'span 5', background: '#F4FAFF', borderRadius: '32px', border: '1px solid #D9EDFF', padding: '48px', display: 'flex', flexDirection: 'column' }} className="eco-bento-card">
                            <div style={{ marginBottom: '32px' }}>
                                <Label>Phase 2: Inputs</Label>
                                <h3 style={styles.h3}>Frictionless Logging</h3>
                                <p style={styles.body}>Familiar visual ranges and categories (transit, food, utilities) to prevent data entry dropout.</p>
                            </div>
                            <div style={{ flex: 1, display: 'flex', gap: '12px', justifyContent: 'center' }} className="eco-mockup-row">
                                <PhoneFrame src="/assets/app/Page9.png" alt="Transit input" style={{ width: '100px', transform: 'translateY(20px)' }} onExpand={() => openLightbox("/assets/app/Page9.png", "Transit input")} />
                                <PhoneFrame src="/assets/app/Page11.png" alt="Dietary range select" style={{ width: '100px' }} onExpand={() => openLightbox("/assets/app/Page11.png", "Dietary range select")} />
                                <PhoneFrame src="/assets/app/Page14.png" alt="Energy input" style={{ width: '100px', transform: 'translateY(-20px)' }} onExpand={() => openLightbox("/assets/app/Page14.png", "Energy input")} />
                            </div>
                        </div>

                        {/* Result Box */}
                        <div style={{ gridColumn: 'span 5', background: '#111', borderRadius: '32px', border: '1px solid #333', padding: '48px', color: '#fff' }} className="eco-bento-card">
                            <div style={{ marginBottom: '32px' }}>
                                <Label>Phase 3: Output Mapping</Label>
                                <h3 style={{ ...styles.h3, color: '#fff' }}>Resonant Benchmarks</h3>
                                <p style={{ ...styles.body, color: '#aaa' }}>
                                    Translating metric tonnage into comparative physics (e.g. standard car mileage driven) for immediate physical comprehension.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <PhoneFrame src="/assets/app/Page13.png" alt="Benchmark output screen" style={{ width: '180px' }} onExpand={() => openLightbox("/assets/app/Page13.png", "Benchmark output screen")} />
                            </div>
                        </div>

                        {/* Dashboard Box */}
                        <div style={{ gridColumn: 'span 7', background: '#fff', borderRadius: '32px', border: '1px solid #ebebeb', padding: '48px', display: 'flex', gap: '48px', alignItems: 'center' }} className="eco-bento-card onboarding">
                            <div style={{ flex: 1 }}>
                                <Label>Phase 4: Retention</Label>
                                <h3 style={styles.h3}>The Insights Hub</h3>
                                <p style={styles.body}>Streaks, challenges, and peer comparisons designed to be scanned in <strong>under 15 seconds</strong> of scrolling.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }} className="eco-mockup-row">
                                <PhoneFrame src="/assets/app/Page22.png" alt="Personal dashboard" style={{ width: '160px' }} onExpand={() => openLightbox("/assets/app/Page22.png", "Personal dashboard")} />
                                <PhoneFrame src="/assets/app/Page23.png" alt="Anomalous trends list" style={{ width: '160px', transform: 'translateY(32px)' }} onExpand={() => openLightbox("/assets/app/Page23.png", "Anomalous trends list")} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Divider />

            {/* ── Gamification ─────────────────── */}
            <section style={styles.section} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <Reveal>
                        <Label>Behavioral Design</Label>
                        <h2 style={styles.h2} className="eco-h2">Challenges · Levels · Rewards</h2>
                        <p style={{ ...styles.body, maxWidth: '520px', marginTop: '12px' }}>
                            A progression system that converts insights into actions and actions into tangible rewards — creating a sustainable habit loop.
                        </p>
                    </Reveal>

                    {/* Flow diagram */}
                    <Reveal delay={0.1} style={{ marginTop: '48px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', overflowX: 'auto', padding: '0 0 8px' }}>
                        {['Measure', 'Insights', 'Challenges', 'Eco Actions', 'Earn XP', 'Reduce CO₂'].map((step, i, arr) => (
                            <React.Fragment key={step}>
                                <div style={{ padding: '10px 20px', borderRadius: '40px', backgroundColor: i === 0 ? 'var(--accent-color)' : '#f0f0f0', color: i === 0 ? '#fff' : '#333', fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                    {step}
                                </div>
                                {i < arr.length - 1 && <span style={{ color: '#ccc', fontSize: '1.2rem', flexShrink: 0 }}>→</span>}
                            </React.Fragment>
                        ))}
                    </Reveal>

                    {/* App screens — properly sized phone frames */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', marginTop: '64px', alignItems: 'end', justifyItems: 'center' }} className="eco-grid-2col">
                        {[
                            { src: '/assets/app/Page24.png', label: 'Challenge List' },
                            { src: '/assets/app/Page25.png', label: 'Challenge Detail' },
                            { src: '/assets/app/Page30.png', label: 'Eco Levels' },
                            { src: '/assets/app/Page33.png', label: 'Rewards Shop' },
                        ].map(({ src, label }, i) => (
                            <Reveal key={label} delay={i * 0.08}>
                                <div style={{ textAlign: 'center' }}>
                                    <PhoneFrame src={src} alt={label} onExpand={() => openLightbox(src, label)} />
                                    <p style={{ marginTop: '16px', fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>{label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Impact ───────────────────────── */}
            <section style={{ ...styles.section, background: '#0d0d0d', color: '#fff' }} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <Label>Key UX Metrics & Business Impact</Label>
                        <h2 style={{ ...styles.h2, color: '#fff' }} className="eco-h2">Quantitative Outcomes</h2>
                    </Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }} className="eco-impact-grid">
                        {[
                            { value: '64%', label: 'Low-Carbon Transport/Diet Adoption' },
                            { value: '40%', label: 'Reduction in Post-Event Admin Overhead' },
                            { value: '-20%', label: 'Average CO₂ reduction per attendee across pilots' },
                        ].map(({ value, label }) => (
                            <Reveal key={label}>
                                <div style={{ padding: '56px 40px', textAlign: 'center', background: '#111' }} className="eco-impact-item">
                                    <div style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: '900', color: '#fff', marginBottom: '12px', lineHeight: 1 }}>{value}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600' }}>{label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── My Role ──────────────────────── */}
            <section style={styles.section} className="eco-section">
                <div style={styles.sectionInner} className="eco-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="eco-grid-2col">
                        <Reveal>
                            <Label>Product Strategy & Design Ownership</Label>
                            <h2 style={styles.h2} className="eco-h2">My Involvement</h2>
                            <p style={{ ...styles.body, marginTop: '12px' }}>
                                I served as the Lead Product Designer & Strategist, defining the behavioral architecture, emission data flow UX, and cross-platform design systems.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div style={{ display: 'grid', gap: '14px' }}>
                                {[
                                    'Conducted stakeholder and planner discovery interviews to uncover data collection friction points',
                                    'Designed emission input patterns using progressive disclosure to reduce cognitive overload',
                                    'Established design system patterns for carbon physical equivalents and streak gamification',
                                    'Partnered with product managers on RICE scoring to structure the MVP roadmap priorities',
                                    'Collaborated directly with engineering to validate charts and smooth transition states'
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 20px', borderRadius: '12px', border: '1px solid #ebebeb' }}>
                                        <CheckCircle2 size={16} color="var(--accent-color)" style={{ flexShrink: 0 }} />
                                        <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Closing / Footer ─────────────── */}
            <footer style={styles.footer} className="eco-footer">
                <Reveal>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#999', fontWeight: '700', marginBottom: '20px' }}>Closing Reflection</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: '800', maxWidth: '1200px', margin: '0 auto 40px auto', lineHeight: '1.25' }} className="eco-h2">
                        EcoIndex proves that sustainability ceases to be abstract and becomes actionable when users are empowered with physical equivalents instead of raw science.
                    </h2>
                    <button onClick={onBack} className="eco-footer-btn" style={styles.footerBtn}>
                        ← Back to Projects
                    </button>
                </Reveal>
            </footer>

            {/* ── Global Lightbox ────────────────── */}
            <AnimatePresence>
                {lightboxImage && (
                    <Lightbox
                        src={lightboxImage.src}
                        alt={lightboxImage.alt}
                        onClose={() => setLightboxImage(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 1000,
        overflowY: 'scroll',
        overflowX: 'hidden',
        color: '#1a1a1a',
        fontFamily: "'Inter', 'Outfit', sans-serif",
        height: '100vh',
        width: '100vw',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorY: 'contain',
    },
    nav: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        zIndex: 50,
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: '8px',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#333',
        background: 'transparent',
        border: '1px solid #e8e8e8',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        width: '90px',
    },
    navTitle: {
        fontWeight: '800',
        letterSpacing: '0.08em',
        fontSize: '0.95rem',
        textTransform: 'uppercase',
    },
    hero: {
        paddingTop: '80px',
        paddingBottom: '0px',
        background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 100%)',
        overflow: 'hidden',
    },
    heroInner: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 5%',
    },

    heroTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 3rem)',
        fontWeight: '800',
        lineHeight: '1.05',
        letterSpacing: '-0.03em',
        maxWidth: '1200px',
        marginTop: '12px',
    },
    section: {
        padding: '100px 0',
    },
    sectionInner: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 5%',
    },
    h2: {
        fontSize: 'clamp(2rem, 3.5vw, 3rem)',
        fontWeight: '800',
        lineHeight: '1.15',
        letterSpacing: '-0.02em',
    },
    h3: {
        fontSize: '1.4rem',
        fontWeight: '700',
        marginBottom: '12px',
    },
    body: {
        fontSize: '1rem',
        lineHeight: '1.75',
        color: '#555',
    },
    problemCard: {
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #ebebeb',
        backgroundColor: '#fff',
    },
    iconBox: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: 'rgba(0, 0, 255, 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    appRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '80px',
        marginTop: '80px',
        flexWrap: 'wrap',
    },
    appRowText: {
        flex: '1',
        minWidth: '280px',
    },
    footer: {
        padding: '120px 5%',
        textAlign: 'center',
        background: '#fafafa',
        borderTop: '1px solid #ebebeb',
    },
    footerBtn: {
        padding: '14px 32px',
        background: '#1a1a1a',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
    },
    lightboxOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
    },
    lightboxClose: {
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        background: '#fff',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 3001,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    },
    lightboxImg: {
        maxWidth: '100%',
        maxHeight: '80vh',
        borderRadius: '12px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
    }
};

export default EcoIndexCaseStudy;
