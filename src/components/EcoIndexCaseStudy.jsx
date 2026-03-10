import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Target, Layers, Zap, Globe, X, Maximize2 } from 'lucide-react';

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
const CarbonParticles = () => (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: 0.1
                }}
                animate={{
                    y: [null, '-100%'],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: Math.random() * 20 + 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 10
                }}
                style={{
                    position: 'absolute',
                    width: Math.random() * 6 + 2 + 'px',
                    height: Math.random() * 6 + 2 + 'px',
                    backgroundColor: '#111',
                    borderRadius: '50%',
                }}
            />
        ))}
    </div>
);

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
            <nav style={styles.nav}>
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
                        <Label>Case Study · 2024</Label>
                        <h1 style={styles.heroTitle}>
                            A Carbon Intelligence Platform for Sustainable Events
                        </h1>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.25} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '32px', marginTop: '40px' }}>
                        {[
                            { label: 'Role', value: 'Product Design + Dev' },
                            { label: 'Platform', value: 'Web + Mobile' },

                            { label: 'Year', value: '2025' },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</p>
                                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>{value}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero — Bento Dashboard Collage */}
                <div style={heroBentoWrapper}>
                    {/* Main Phone (Dashboard) */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 4', padding: '40px', background: '#F9FFF9', border: '1px solid #D1F2D1' }}>
                        <Label>Real-time Tracking</Label>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Your Carbon Footprint at a Glance</h3>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <PhoneFrame src="/src/assets/app/Page22.png" alt="Dashboard" style={{ width: '100%', maxWidth: '200px' }} onExpand={() => openLightbox("/src/assets/app/Page22.png", "Dashboard")} />
                        </div>
                    </div>

                    {/* Onboarding Trio */}
                    <div style={{ ...bentoCard, gridColumn: 'span 8', gridRow: 'span 2', padding: '32px', background: '#fdfdfd', display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Label>Experience</Label>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>Intuitive Onboarding</h3>
                            <p style={styles.body}>Seamlessly guiding users through their sustainability journey from day one.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <PhoneFrame src="/src/assets/app/Page2.png" alt="Onboarding 1" style={{ width: '140px' }} onExpand={() => openLightbox("/src/assets/app/Page2.png", "Onboarding 1")} />
                            <PhoneFrame src="/src/assets/app/Page3.png" alt="Onboarding 2" style={{ width: '140px' }} onExpand={() => openLightbox("/src/assets/app/Page3.png", "Onboarding 2")} />
                        </div>
                    </div>

                    {/* Stats / Carbon Counter */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 2', padding: '32px', background: '#111', color: '#fff' }}>
                        <div style={{ height: '40px', width: '40px', borderRadius: '50%', border: '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <Zap size={20} color="#4ade80" strokeWidth={2.5} />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#4ade80', lineHeight: 1 }}>550 kg</div>
                        <p style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600', marginTop: '8px' }}>Monthly Average saved</p>
                    </div>

                    {/* Data Collection Card */}
                    <div style={{ ...bentoCard, gridColumn: 'span 4', gridRow: 'span 2', padding: '32px', background: '#fafafa' }}>
                        <Label>Precision</Label>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Detailed Emission Modeling</h3>
                        <div style={{ display: 'flex', gap: '12px', overflowX: 'hidden' }}>
                            <PhoneFrame src="/src/assets/app/Page9.png" alt="Data 1" style={{ width: '100px', flexShrink: 0 }} onExpand={() => openLightbox("/src/assets/app/Page9.png", "Data 1")} />
                            <PhoneFrame src="/src/assets/app/Page11.png" alt="Data 2" style={{ width: '100px', flexShrink: 0 }} onExpand={() => openLightbox("/src/assets/app/Page11.png", "Data 2")} />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Problem ──────────────────────── */}
            <section style={styles.section}>
                <div style={styles.sectionInner}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
                        <Reveal>
                            <Label>The Problem</Label>
                            <h2 style={styles.h2}>Three barriers to sustainability</h2>
                        </Reveal>
                        <div style={{ display: 'grid', gap: '24px' }}>
                            {[
                                { Icon: Globe, title: 'Emissions are invisible', desc: 'Without visibility into how much carbon activities generate, sustainability remains abstract and disconnected from daily decisions.' },
                                { Icon: Layers, title: 'Data is fragmented', desc: 'Carbon emissions span transport, energy, food, and waste — yet they\'re rarely captured in one unified system.' },
                                { Icon: Zap, title: 'No incentive structure', desc: 'Even when impact is understood, there are few systems that reward or motivate people to act sustainably.' },
                            ].map(({ Icon, title, desc }, i) => (
                                <Reveal key={title} delay={i * 0.1}>
                                    <div className="eco-problem-card" style={styles.problemCard}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <div style={styles.iconBox}>
                                                <Icon size={18} color="var(--accent-color)" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
                                                <p style={styles.body}>{desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Objective ────────────────────── */}
            <section style={{ ...styles.section, background: '#fafafa' }}>
                <div style={styles.sectionInner}>
                    <Reveal style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                        <Label>Objective</Label>
                        <h2 style={{ ...styles.h2, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                            Transform environmental awareness into measurable sustainability outcomes
                        </h2>
                        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', textAlign: 'left' }}>
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

            {/* ── Carbon Model ─────────────────── */}
            <section style={{ ...styles.section, background: '#0d0d0d', color: '#fff' }}>
                <div style={styles.sectionInner}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'center' }}>
                        <Reveal>
                            <Label>Methodology</Label>
                            <h2 style={{ ...styles.h2, color: '#fff' }}>Carbon emission model</h2>
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
                        <BrowserFrame src="/src/assets/app/EventDashboard.png" alt="Event Dashboard" onExpand={() => openLightbox("/src/assets/app/EventDashboard.png", "Event Dashboard")} />
                    </Reveal>

                    {/* Supporting desktop screens — 3-col grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                        {['AddEvent.png', 'EnergyConsumption.png', 'MealConsumption.png'].map((img, i) => (
                            <Reveal key={img} delay={i * 0.08}>
                                <BrowserFrame src={`/src/assets/app/${img}`} alt={img.replace('.png', '')} onExpand={() => openLightbox(`/src/assets/app/${img}`, img.replace('.png', ''))} />
                            </Reveal>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                        {['Transport.png', 'WasteTracking.png'].map((img, i) => (
                            <Reveal key={img} delay={i * 0.08}>
                                <BrowserFrame src={`/src/assets/app/${img}`} alt={img.replace('.png', '')} onExpand={() => openLightbox(`/src/assets/app/${img}`, img.replace('.png', ''))} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Personal App ─────────────────── */}
            <section style={{ ...styles.section, background: '#fafafa' }}>
                <div style={styles.sectionInner}>
                    <Reveal>
                        <Label>Mobile App</Label>
                        <h2 style={styles.h2}>Personal Sustainability App</h2>
                        <p style={{ ...styles.body, maxWidth: '480px', marginTop: '12px' }}>
                            A companion app that helps individuals track their personal carbon footprint and adopt better daily habits.
                        </p>
                    </Reveal>

                    {/* Mobile App Bento Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', marginTop: '64px' }}>

                        {/* Onboarding Box */}
                        <div style={{ gridColumn: 'span 7', background: '#fff', borderRadius: '32px', border: '1px solid #ebebeb', padding: '48px', overflow: 'hidden', display: 'flex', gap: '32px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <Label>Phase 1</Label>
                                <h3 style={styles.h3}>Onboarding</h3>
                                <p style={styles.body}>Communicates the value of sustainability tracking and challenges, easing users into the platform with clarity and purpose.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', position: 'relative', height: '320px', alignItems: 'flex-end' }}>
                                <PhoneFrame src="/src/assets/app/Page2.png" alt="Onboarding 1" style={{ width: '160px', position: 'absolute', right: '40px', bottom: '-40px' }} onExpand={() => openLightbox("/src/assets/app/Page2.png", "Onboarding 1")} />
                                <PhoneFrame src="/src/assets/app/Page3.png" alt="Onboarding 2" style={{ width: '160px', position: 'relative', zIndex: 2 }} onExpand={() => openLightbox("/src/assets/app/Page3.png", "Onboarding 2")} />
                            </div>
                        </div>

                        {/* Data Collection Box */}
                        <div style={{ gridColumn: 'span 5', background: '#F4FAFF', borderRadius: '32px', border: '1px solid #D9EDFF', padding: '48px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '32px' }}>
                                <Label>Phase 2</Label>
                                <h3 style={styles.h3}>Data Collection</h3>
                                <p style={styles.body}>Lifestyle inputs that form the foundation of each user's emission model.</p>
                            </div>
                            <div style={{ flex: 1, display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <PhoneFrame src="/src/assets/app/Page9.png" alt="A" style={{ width: '100px', transform: 'translateY(20px)' }} onExpand={() => openLightbox("/src/assets/app/Page9.png", "A")} />
                                <PhoneFrame src="/src/assets/app/Page11.png" alt="B" style={{ width: '100px' }} onExpand={() => openLightbox("/src/assets/app/Page11.png", "B")} />
                                <PhoneFrame src="/src/assets/app/Page14.png" alt="C" style={{ width: '100px', transform: 'translateY(-20px)' }} onExpand={() => openLightbox("/src/assets/app/Page14.png", "C")} />
                            </div>
                        </div>

                        {/* Result Box */}
                        <div style={{ gridColumn: 'span 5', background: '#111', borderRadius: '32px', border: '1px solid #333', padding: '48px', color: '#fff' }}>
                            <div style={{ marginBottom: '32px' }}>
                                <Label>Phase 3</Label>
                                <h3 style={{ ...styles.h3, color: '#fff' }}>Footprint Result</h3>
                                <p style={{ ...styles.body, color: '#aaa' }}>Calculated carbon footprint with relatable real-world comparisons.</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <PhoneFrame src="/src/assets/app/Page13.png" alt="Result" style={{ width: '180px' }} onExpand={() => openLightbox("/src/assets/app/Page13.png", "Result")} />
                            </div>
                        </div>

                        {/* Dashboard Box */}
                        <div style={{ gridColumn: 'span 7', background: '#fff', borderRadius: '32px', border: '1px solid #ebebeb', padding: '48px', display: 'flex', gap: '48px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <Label>Phase 4</Label>
                                <h3 style={styles.h3}>Insights & Hub</h3>
                                <p style={styles.body}>The central hub for sustainability progress, summaries, streaks, and national comparisons.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <PhoneFrame src="/src/assets/app/Page22.png" alt="Dashboard" style={{ width: '160px' }} onExpand={() => openLightbox("/src/assets/app/Page22.png", "Dashboard")} />
                                <PhoneFrame src="/src/assets/app/Page23.png" alt="Insights" style={{ width: '160px', transform: 'translateY(32px)' }} onExpand={() => openLightbox("/src/assets/app/Page23.png", "Insights")} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── Gamification ─────────────────── */}
            <section style={styles.section}>
                <div style={styles.sectionInner}>
                    <Reveal>
                        <Label>Behavioral Design</Label>
                        <h2 style={styles.h2}>Challenges · Levels · Rewards</h2>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', marginTop: '64px', alignItems: 'end', justifyItems: 'center' }}>
                        {[
                            { src: '/src/assets/app/Page24.png', label: 'Challenge List' },
                            { src: '/src/assets/app/Page25.png', label: 'Challenge Detail' },
                            { src: '/src/assets/app/Page30.png', label: 'Eco Levels' },
                            { src: '/src/assets/app/Page33.png', label: 'Rewards Shop' },
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
            <section style={{ ...styles.section, background: '#0d0d0d', color: '#fff' }}>
                <div style={styles.sectionInner}>
                    <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <Label>Impact</Label>
                        <h2 style={{ ...styles.h2, color: '#fff' }}>Real-world results</h2>
                    </Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
                        {[
                            { value: '34,560+', label: 'Attendees Analyzed' },
                            { value: '218,599 kg', label: 'CO₂ Calculated' },
                            { value: '180,866 kg', label: 'CO₂ Neutralized' },
                        ].map(({ value, label }) => (
                            <Reveal key={label}>
                                <div style={{ padding: '56px 40px', textAlign: 'center', background: '#111' }}>
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
            <section style={styles.section}>
                <div style={styles.sectionInner}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <Reveal>
                            <Label>Contributions</Label>
                            <h2 style={styles.h2}>My involvement</h2>
                            <p style={{ ...styles.body, marginTop: '12px' }}>I led the product, design, and development of EcoIndex end-to-end — from system architecture to production UI.</p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div style={{ display: 'grid', gap: '14px' }}>
                                {[
                                    'Product strategy and system architecture',
                                    'UX/UI design and interaction design',
                                    'Frontend development using React',
                                    'Design system creation',
                                    'Mobile application design (iOS)',
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
            <footer style={styles.footer}>
                <Reveal>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#999', fontWeight: '700', marginBottom: '20px' }}>Closing Thought</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: '800', maxWidth: '1200px', margin: '0 auto 40px auto', lineHeight: '1.25' }}>
                        EcoIndex proves that sustainability becomes achievable when it's measurable.
                    </h2>
                    <button onClick={onBack} className="eco-footer-btn" style={styles.footerBtn}>
                        ← Back to All Projects
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
