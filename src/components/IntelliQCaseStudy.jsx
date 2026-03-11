import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Layout, Database, Users, Shield, BarChart3, Settings, ClipboardList, Info, X, Maximize2, PieChart, Activity, Zap, FileText } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
    })
};

/* ─── Particles Background ──────────────────────── */
const Particles = () => (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: 0.05
                }}
                animate={{
                    y: [null, '-100%'],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                    duration: Math.random() * 20 + 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 10
                }}
                style={{
                    position: 'absolute',
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    backgroundColor: '#FF3366',
                    borderRadius: '50%',
                }}
            />
        ))}
    </div>
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

/* ─── Reusable Browser Mockup ─────────────────── */
const BrowserFrame = ({ src, alt, caption, onExpand, maxHeight }) => (
    <div style={styles.browserContainer}>
        <div
            style={{
                ...styles.browserFrame,
                cursor: 'pointer',
                maxHeight: maxHeight || 'none',
                overflow: 'hidden'
            }}
            className="iq-zoom-container"
            onClick={onExpand}
        >
            <div style={styles.browserBar}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
                    ))}
                </div>
                <div style={styles.addressBar}>{alt}</div>
                <Maximize2 size={12} color="#999" />
            </div>
            <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
        </div>
        {caption && <p style={styles.imgCaption}>{caption}</p>}
    </div>
);

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
                background: '#FF3366',
                scaleX,
                transformOrigin: '0%',
                zIndex: 61,
            }}
        />
    );
};

/* ─── Section label ────────────────────────────────────── */
const Label = ({ children, color = '#FF3366' }) => (
    <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.7rem', fontWeight: '800', color: color, marginBottom: '16px' }}>
        {children}
    </p>
);

/* ─── Divider ──────────────────────────────────────────── */
const Divider = () => <div style={{ height: '1px', background: '#e0e0e0', margin: '0 5%' }} />;

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

const IntelliQCaseStudy = ({ onBack }) => {
    const containerRef = React.useRef(null);
    const [showFlowDiagram, setShowFlowDiagram] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Inject scoped CSS
    useEffect(() => {
        if (document.getElementById('intelliq-case-styles')) return;
        const s = document.createElement('style');
        s.id = 'intelliq-case-styles';
        s.innerHTML = `
            .iq-back-btn:hover { background: #f5f5f5 !important; }
            .iq-footer-btn:hover { opacity: 0.85; transform: translateY(-2px); }
            .iq-card:hover { border-color: #FF3366 !important; }
            .iq-feature-card:hover { transform: translateY(-4px); border-color: #FF3366 !important; }
            .iq-feature-card { transition: all 0.3s ease; border: 1px solid #ebebeb !important; }
            .iq-flow-btn:hover { background: #FF3366 !important; color: white !important; }
            .iq-zoom-container { transition: transform 0.3s ease; }
            .iq-zoom-container:hover { transform: scale(1.02); }
            .iq-content-scroll { scrollbar-width: thin; scrollbar-color: #ccc transparent; }
            .iq-content-scroll::-webkit-scrollbar { width: 6px; }
            .iq-content-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

            @media (max-width: 768px) {
                #iq-case-root { padding-top: 0 !important; }
                .iq-nav { padding: 0 16px !important; }
                .iq-hero-title { font-size: 2.2rem !important; line-height: 1.1 !important; }
                .iq-hero-info { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
                .iq-bento-wrapper { 
                    grid-template-columns: 1fr !important; 
                    gap: 16px !important;
                    margin-top: 40px !important;
                }
                .iq-bento-card { 
                    grid-column: span 1 !important; 
                    grid-row: auto !important;
                    padding: 24px !important;
                }
                .iq-section { padding: 60px 0 !important; }
                .iq-section-inner { padding: 0 20px !important; }
                .iq-h2 { font-size: 1.8rem !important; }
                .iq-grid-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
                .iq-grid-3col { grid-template-columns: 1fr !important; gap: 20px !important; }
                .iq-grid-dashboard { grid-template-columns: 1fr !important; gap: 16px !important; }
                .iq-dashboard-card { grid-column: span 1 !important; }
                .iq-footer { padding: 60px 20px !important; }
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
            id="iq-case-root"
        >
            <ScrollProgress containerRef={containerRef} />
            <Particles />

            {/* ── Sticky Nav ───────────────────── */}
            <nav style={styles.nav} className="iq-nav">
                <button onClick={onBack} style={styles.backBtn} className="iq-back-btn">
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    <span>Projects</span>
                </button>
                <span style={styles.navTitle}>IntelliQ</span>
                <div style={{ width: 90 }} />
            </nav>

            {/* ── Hero ─────────────────────────── */}
            <section style={styles.hero}>
                <div style={styles.heroInner}>
                    <Reveal>
                        <Label>Case Study · 2024</Label>
                        <h1 style={styles.heroTitle} className="iq-hero-title">
                            Enterprise Data Aggregation & Analytics Platform
                        </h1>
                        <p style={{ ...styles.body, maxWidth: '800px', fontSize: '1.2rem', marginTop: '24px', color: '#666' }}>
                            Replacing fragmented spreadsheet workflows with a structured system for distributed data collection, role-based access, and real-time analytics.
                        </p>
                    </Reveal>

                    <div style={styles.heroInfoGrid} className="iq-hero-info">
                        {[
                            { label: 'Role', value: 'Product Engineer / Frontend' },
                            { label: 'Platform', value: 'Web Dashboard' },
                            { label: 'Focus', value: 'UX & Implementation' },
                            { label: 'Status', value: 'In Production' },
                        ].map(({ label, value }) => (
                            <Reveal key={label} delay={0.2}>
                                <div key={label}>
                                    <p style={styles.infoLabel}>{label}</p>
                                    <p style={styles.infoValue}>{value}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Hero Bento Grid */}
                <div style={styles.bentoWrapper} className="iq-bento-wrapper">
                    <Reveal delay={0.3} style={{ gridColumn: 'span 8', gridRow: 'span 4' }} className="iq-bento-card">
                        <div style={{ ...styles.bentoCard, background: '#fff' }}>
                            <BrowserFrame
                                src="/assets/IntelliQ/DataEntry1.png"
                                alt="Data Entry"
                                onExpand={() => openLightbox("/assets/IntelliQ/DataEntry1.png", "Data Entry")}
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={0.4} style={{ gridColumn: 'span 4', gridRow: 'span 2' }} className="iq-bento-card">
                        <div style={{ ...styles.bentoCard, background: '#111', color: '#fff', padding: '32px' }}>
                            <Label color="#FF3366">Tech Stack</Label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                                {['React', 'Vite', 'Redux', 'TanStack Table', 'Recharts', 'Tailwind'].map(tech => (
                                    <span key={tech} style={styles.techBadge}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.5} style={{ gridColumn: 'span 4', gridRow: 'span 2' }} className="iq-bento-card">
                        <div style={{ ...styles.bentoCard, background: '#F8F9FF', padding: '32px' }}>
                            <Label color="#3344DD">Real World Impact</Label>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '8px' }}>Active Production Use</h3>
                            <p style={{ ...styles.body, fontSize: '0.9rem', marginTop: '8px' }}>Currently deployed at Agrasen Manufacturing and D2O.</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Divider />

            {/* ── Problem ──────────────────────── */}
            <section style={styles.section} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }} className="iq-grid-2col">
                        <Reveal>
                            <Label>The Problem</Label>
                            <h2 style={styles.h2}>Fragmented Spreadsheet Workflows</h2>
                            <p style={{ ...styles.body, marginTop: '24px' }}>
                                Organizations were managing operational data through multiple Excel files across teams, leading to:
                            </p>
                        </Reveal>
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {[
                                { title: 'Editing Conflicts', desc: 'Multiple users attempting to edit the same spreadsheet simultaneously.' },
                                { title: 'No Clear Ownership', desc: 'Lack of accountability for specific data fields and updates.' },
                                { title: 'Manual Aggregation', desc: 'Hours spent manually merging sheets for daily or monthly reporting.' },
                                { title: 'Data Inconsistency', desc: 'Inconsistent data structures making analytics nearly impossible.' },
                            ].map(({ title, desc }, i) => (
                                <Reveal key={title} delay={i * 0.1}>
                                    <div className="iq-feature-card" style={styles.featureCard}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
                                        <p style={styles.body}>{desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Architecture Flow ───────────────── */}
            <section style={{ ...styles.section, background: '#f9f9f9' }} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <Reveal style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <Label color="#3344DD">System Flow</Label>
                        <h2 style={styles.h2}>Understanding the Architecture</h2>
                        <p style={{ ...styles.body, marginTop: '20px', marginBottom: '40px' }}>
                            The platform follows a structured workflow starting from authentication, followed by organization configuration, data collection, and analytics visualization.
                        </p>
                        <button
                            onClick={() => setShowFlowDiagram(true)}
                            style={styles.flowBtn}
                            className="iq-flow-btn"
                        >
                            View Flow Diagram
                        </button>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '80px' }} className="iq-grid-3col">
                        {[
                            { step: '1', title: 'Auth & Roles', desc: 'Secure login and granular permission assignment.' },
                            { step: '2', title: 'Sheet Creation', desc: 'Define schema or import Excel templates.' },
                            { step: '3', title: 'Data Entry', desc: 'Distributed collection with clear ownership.' },
                            { step: '4', title: 'Review', desc: 'Admin approval workflow to ensure data quality.' },
                            { step: '5', title: 'Analytics', desc: 'Automated dashboards and real-time insights.' },
                            { step: '6', title: 'Governance', desc: 'Tracking history and submission status.' },
                        ].map(({ step, title, desc }) => (
                            <Reveal key={step}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={styles.stepCircle}>{step}</div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>{title}</h4>
                                        <p style={{ ...styles.body, fontSize: '0.9rem' }}>{desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Organization & Roles ────────────── */}
            <section style={styles.section} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <Reveal>
                        <Label>Governance</Label>
                        <h2 style={styles.h2}>Organization & Role Management</h2>
                        <p style={{ ...styles.body, maxWidth: '600px', marginTop: '16px' }}>
                            Admins define the hierarchy and control permissions across the platform with granular role-based access.
                        </p>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginTop: '64px' }} className="iq-grid-2col">
                        {[
                            { src: "/assets/IntelliQ/Organization.png", alt: "Organization Management", caption: "Hierarchy definition" },
                            { src: "/assets/IntelliQ/Users.png", alt: "User Management", caption: "Distributed user access" },
                            { src: "/assets/IntelliQ/EditRole.png", alt: "Role Permissions", caption: "Granular permission control" },
                            { src: "/assets/IntelliQ/EditUser.png", alt: "Edit User", caption: "User profile management" },
                        ].map((item, i) => (
                            <Reveal key={item.src} delay={i * 0.1}>
                                <BrowserFrame
                                    src={item.src}
                                    alt={item.alt}
                                    caption={item.caption}
                                    onExpand={() => openLightbox(item.src, item.alt)}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Smart Sheets ────────────────────── */}
            <section style={{ ...styles.section, background: '#0d0d0d', color: '#fff' }} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <Reveal>
                        <Label color="#FF3366">The Core Engine</Label>
                        <h2 style={{ ...styles.h2, color: '#fff' }}>Smart Sheets Engine</h2>
                        <p style={{ ...styles.body, color: '#aaa', maxWidth: '600px', marginTop: '20px' }}>
                            A high-performance alternative to spreadsheets, designed for structured data entry with automated schema extraction.
                        </p>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginTop: '64px', alignItems: 'center' }} className="iq-grid-2col">
                        <Reveal>
                            <BrowserFrame
                                src="/assets/IntelliQ/ManageSheets.png"
                                alt="Manage Sheets"
                                onExpand={() => openLightbox("/assets/IntelliQ/ManageSheets.png", "Manage Sheets")}
                            />
                        </Reveal>
                        <div style={{ display: 'grid', gap: '24px' }}>
                            {[
                                { icon: Layout, title: 'Manual Schema', desc: 'Define columns, data types, and validations from scratch.' },
                                { icon: Database, title: 'Excel Import', desc: 'Upload existing files to automatically extract headers and structure.' },
                                { icon: ClipboardList, title: 'Template Library', desc: 'Quickly deploy common operational workflows from templates.' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <Reveal key={title}>
                                    <div style={{ display: 'flex', gap: '20px', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                                        <div style={{ background: '#FF3366', padding: '12px', borderRadius: '12px' }}>
                                            <Icon size={20} color="#fff" />
                                        </div>
                                        <div>
                                            <h4 style={{ color: '#fff', fontWeight: '700', marginBottom: '4px' }}>{title}</h4>
                                            <p style={{ color: '#888', fontSize: '0.9rem' }}>{desc}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }} className="iq-grid-3col">
                        {[
                            { src: "/assets/IntelliQ/SheetType.png", alt: "Sheet Types" },
                            { src: "/assets/IntelliQ/CreationMethod.png", alt: "Creation Method" },
                            { src: "/assets/IntelliQ/ImportData.png", alt: "Import Data" },
                        ].map((item, i) => (
                            <Reveal key={item.src} delay={i * 0.1}>
                                <BrowserFrame
                                    src={item.src}
                                    alt={item.alt}
                                    onExpand={() => openLightbox(item.src, item.alt)}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Sheet Types Detail ──────────────── */}
            <section style={styles.section} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <Reveal>
                        <Label>Specialization</Label>
                        <h2 style={styles.h2}>Optimized Sheet Types</h2>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }} className="iq-grid-3col">
                        {[
                            {
                                type: 'Master Sheets',
                                desc: 'Perfect for reference data like employee catalogues or product lists.',
                                img: '/assets/IntelliQ/MasterSheetScreen.png',
                                tags: ['View-Only', 'Static']
                            },
                            {
                                type: 'Non-Periodic',
                                desc: 'Collaborative collection where columns are assigned to specific users.',
                                img: '/assets/IntelliQ/NonPeriodicScreen.png',
                                tags: ['Column-Level Permissions', 'One-time']
                            },
                            {
                                type: 'Periodic Sheets',
                                desc: 'Automated recurring reporting: Daily, Weekly, or Monthly.',
                                img: '/assets/IntelliQ/PeriodicScreen.png',
                                tags: ['Recurring', 'Frequency']
                            }
                        ].map((item, i) => (
                            <Reveal key={item.type} delay={i * 0.1}>
                                <div style={styles.typeCard} onClick={() => openLightbox(item.img, item.type)}>
                                    <div style={{ overflow: 'hidden', height: '180px' }}>
                                        <img src={item.img} alt={item.type} style={{ ...styles.typeImg, transition: 'transform 0.5s ease' }} className="iq-zoom-container" />
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                            {item.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                                        </div>
                                        <h4 style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '8px' }}>{item.type}</h4>
                                        <p style={{ ...styles.body, fontSize: '0.9rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Data Entry ──────────────────────── */}
            <section style={{ ...styles.section, background: '#F8FAFF' }} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'center' }} className="iq-grid-2col">
                        <Reveal>
                            <Label color="#3344DD">User Experience</Label>
                            <h2 style={styles.h2}>High-Performance Spreadsheet Interface</h2>
                            <p style={{ ...styles.body, marginTop: '24px' }}>
                                Replicating the feel of Excel with enterprise-grade features:
                            </p>
                            <ul style={{ ...styles.list, marginTop: '20px' }}>
                                <li>Bulk copy-paste support</li>
                                <li>Column pinning & freezing</li>
                                <li>Cell-level history tracking</li>
                                <li>Row/Column duplication</li>
                                <li>Dynamic filtering & sorting</li>
                            </ul>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ position: 'relative' }}>
                                <BrowserFrame
                                    src="/assets/IntelliQ/DataEntry1.png"
                                    alt="Data Entry"
                                    onExpand={() => openLightbox("/assets/IntelliQ/DataEntry1.png", "Data Entry")}
                                />
                                <div style={styles.floater}>
                                    <BrowserFrame
                                        src="/assets/IntelliQ/MasterTable.png"
                                        alt="Master Table"
                                        onExpand={() => openLightbox("/assets/IntelliQ/MasterTable.png", "Master Table")}
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Dashboard & Analytics ─────────────── */}
            <section style={styles.section} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <Reveal style={{ textAlign: 'center' }}>
                        <Label>Visualization</Label>
                        <h2 style={styles.h2}>Dynamic Dashboard Builder</h2>
                        <p style={{ ...styles.body, maxWidth: '700px', margin: '20px auto 64px auto' }}>
                            A drag-and-drop layout system fed by real-time sheet data sources.
                        </p>
                    </Reveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }} className="iq-grid-dashboard">
                        <Reveal delay={0.1} style={{ gridColumn: 'span 7' }} className="iq-dashboard-card">
                            <BrowserFrame
                                src="/assets/IntelliQ/Dashboard.png"
                                alt="Main Dashboard"
                                onExpand={() => openLightbox("/assets/IntelliQ/Dashboard.png", "Main Dashboard")}
                            />
                        </Reveal>
                        <Reveal delay={0.2} style={{ gridColumn: 'span 5' }} className="iq-dashboard-card">
                            <BrowserFrame
                                src="/assets/IntelliQ/EditPanel.png"
                                alt="Widget Config"
                                caption="Deep Widget Configuration"
                                maxHeight="450px"
                                onExpand={() => openLightbox("/assets/IntelliQ/EditPanel.png", "Widget Configuration")}
                            />
                        </Reveal>
                        <Reveal delay={0.3} style={{ gridColumn: 'span 4' }} className="iq-dashboard-card">
                            <BrowserFrame
                                src="/assets/IntelliQ/DashboardEdit.png"
                                alt="Layout Selection"
                                onExpand={() => openLightbox("/assets/IntelliQ/DashboardEdit.png", "Layout Selection")}
                            />
                        </Reveal>
                        <Reveal delay={0.4} style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', padding: '40px', background: '#F0F4FF', borderRadius: '24px', border: '1px solid #D9E1FF' }} className="iq-dashboard-card">
                            <h3 style={{ fontWeight: '800', marginBottom: '24px', fontSize: '1.4rem' }}>Supported Widgets & Features</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="iq-grid-2col">
                                {[
                                    { icon: PieChart, label: 'Visualization Types', desc: 'Bar, Line, Pie, and Donut charts for trend analysis.' },
                                    { icon: Activity, label: 'KPI Monitoring', desc: 'Real-time number widgets for critical metrics.' },
                                    { icon: Settings, label: 'Custom Aggregations', desc: 'Sum, Average, Count, and custom formulae.' },
                                    { icon: Zap, label: 'Live Data Feed', desc: 'Automatic updates as Smart Sheets are populated.' },
                                    { icon: Filter, label: 'Time Granularity', desc: 'Daily, Weekly, Monthly view switches.' },
                                    { icon: FileText, label: 'Report Export', desc: 'Instant PDF and Excel generation from widgets.' }
                                ].map((w, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ background: '#3344DD', padding: '10px', borderRadius: '10px' }}>
                                            <w.icon size={18} color="#fff" />
                                        </div>
                                        <div>
                                            <h5 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{w.label}</h5>
                                            <p style={{ ...styles.body, fontSize: '0.85rem' }}>{w.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Contributions Section (EcoIndex Style) ── */}
            <section style={{ ...styles.section, background: '#fafafa' }} className="iq-section">
                <div style={styles.sectionInner} className="iq-section-inner">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="iq-grid-2col">
                        <Reveal>
                            <Label>My Role</Label>
                            <h2 style={styles.h2}>Contributions & Tech</h2>
                            <p style={{ ...styles.body, marginTop: '20px' }}>
                                As a Product Engineer, I led the development of the core data-entry engine and the analytics visualization layer.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {[
                                    'Architecture design of the Smart Sheets system',
                                    'Development of the drag-and-drop dashboard builder',
                                    'Implementation of role-based permission system',
                                    'Advanced grid virtualization for high-performance data entry',
                                    'Client-side data aggregation and charting logic',
                                    'Excel import/export engine integration'
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 20px', borderRadius: '12px', border: '1px solid #ebebeb', background: '#fff' }}>
                                        <CheckCircle2 size={16} color="#FF3366" style={{ flexShrink: 0 }} />
                                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Closing / Footer ─────────────── */}
            <footer style={styles.footer} className="iq-footer">
                <Reveal>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#999', fontWeight: '700', marginBottom: '20px' }}>Closing Thought</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: '800', maxWidth: '1000px', margin: '0 auto 40px auto', lineHeight: '1.2' }}>
                        IntelliQ transforms raw operational data into a powerful asset through structured governance.
                    </h2>
                    <button onClick={onBack} className="iq-footer-btn" style={styles.footerBtn}>
                        ← Back to All Projects
                    </button>
                </Reveal>
            </footer>

            {/* ── Flow Diagram Modal (Scrollable) ────────── */}
            <AnimatePresence>
                {showFlowDiagram && (
                    <div
                        style={styles.modalOverlay}
                        onClick={() => setShowFlowDiagram(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={styles.modalContent}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={styles.modalHeader}>
                                <h3 style={{ margin: 0, fontWeight: '800' }}>System Flow Diagram</h3>
                                <button style={styles.modalCloseIcon} onClick={() => setShowFlowDiagram(false)}><X size={24} /></button>
                            </div>
                            <div style={styles.modalScrollArea} className="iq-content-scroll">
                                <img
                                    src="/assets/IntelliQ/Flow Diagram.png"
                                    alt="System Flow Diagram"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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

// Lucide Icons that weren't imported but needed for mapping
const Filter = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

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
        zIndex: 60,
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
    },
    navTitle: {
        fontWeight: '800',
        letterSpacing: '0.08em',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
    },
    hero: {
        paddingTop: '80px',
        paddingBottom: '100px',
        background: 'linear-gradient(180deg, #fff 0%, #f8faff 100%)',
    },
    heroInner: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 5%',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 3rem)',
        fontWeight: '900',
        lineHeight: '1.05',
        letterSpacing: '-0.04em',
        maxWidth: '1200px',
    },
    heroInfoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '40px',
        marginTop: '60px',
    },
    infoLabel: {
        fontSize: '0.75rem',
        color: '#999',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '8px',
    },
    infoValue: {
        fontWeight: '800',
        fontSize: '1rem',
    },
    bentoWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '24px',
        maxWidth: '1280px',
        margin: '60px auto 0',
        padding: '0 5%',
    },
    bentoCard: {
        borderRadius: '24px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    techBadge: {
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '600',
        border: '1px solid rgba(255,255,255,0.2)',
    },
    section: {
        padding: '120px 0',
    },
    sectionInner: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 5%',
    },
    h2: {
        fontSize: 'clamp(2rem, 2vw, 3.2rem)',
        fontWeight: '900',
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
    },
    body: {
        fontSize: '1.05rem',
        lineHeight: '1.7',
        color: '#555',
    },
    featureCard: {
        padding: '28px',
        borderRadius: '16px',
        background: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
    },
    browserContainer: {
        width: '100%',
    },
    browserFrame: {
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        background: '#fff',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        position: 'relative',
    },
    browserBar: {
        height: '36px',
        background: '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '12px',
        borderBottom: '1px solid #e0e0e0',
    },
    addressBar: {
        flex: 1,
        background: '#fff',
        borderRadius: '4px',
        height: '20px',
        fontSize: '10px',
        color: '#999',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8px',
    },
    imgCaption: {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#999',
        textAlign: 'center',
        marginTop: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    flowBtn: {
        padding: '16px 32px',
        background: 'transparent',
        border: '2px solid #FF3366',
        color: '#FF3366',
        borderRadius: '12px',
        fontWeight: '800',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    stepCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#FF3366',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        flexShrink: 0,
    },
    typeCard: {
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    typeImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderBottom: '1px solid #e0e0e0',
    },
    tag: {
        fontSize: '0.65rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#FF3366',
        padding: '4px 8px',
        background: '#FFF0F3',
        borderRadius: '4px',
    },
    list: {
        paddingLeft: '20px',
        display: 'grid',
        gap: '12px',
        color: '#555',
        fontWeight: '500',
    },
    floater: {
        position: 'absolute',
        bottom: '-40px',
        right: '-40px',
        width: '70%',
        zIndex: 2,
    },
    footer: {
        padding: '120px 5%',
        textAlign: 'center',
        background: '#F8F9FF',
        borderTop: '1px solid #e0e0e0',
    },
    footerBtn: {
        padding: '16px 36px',
        background: '#111',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '800',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backdropFilter: 'blur(10px)',
    },
    modalContent: {
        maxWidth: '1100px',
        width: '100%',
        maxHeight: '85vh',
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
    },
    modalHeader: {
        padding: '20px 32px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fcfcfc',
    },
    modalCloseIcon: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#666',
    },
    modalScrollArea: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px',
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

export default IntelliQCaseStudy;
