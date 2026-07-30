import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Instagram, Linkedin, GraduationCap, BookOpen, Briefcase, Code, Cloud,
    Figma, Workflow, Layout, Layers, Image, Palette, Box,
    Atom, Database, Cpu, Table, BarChart2, Wind, BoxSelect, Brush,
    Globe, Zap, GitBranch, Github, Component, Type, Eye, Play, Shield, Search,
    Users, MousePointer2
} from 'lucide-react';
import { InteractiveGrid, NoiseOverlay, FloatingAssets } from './Home';
import ReadMore from './ReadMore';
import sketch1 from '../assets/sketch1.png';
import sketch2 from '../assets/sketch2.png';
import sketch3 from '../assets/sketch3.png';


const About = ({ activeSectionIndex, onViewArtwork }) => {
    const prevIndexRef = useRef(activeSectionIndex);
    const direction = activeSectionIndex >= prevIndexRef.current ? 1 : -1;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        prevIndexRef.current = activeSectionIndex;
    }, [activeSectionIndex]);

    useEffect(() => {
        if (document.getElementById('about-responsive-styles')) return;
        const style = document.createElement('style');
        style.id = 'about-responsive-styles';
        style.innerHTML = `
            @media (max-width: 768px) {
                .about-container { padding: 80px 5% 40px 5% !important; }
                .about-section-title { fontSize: 2rem !important; }
                .about-timeline { padding-left: 40px !important; }
                .about-timeline-line { left: 15px !important; }
                .about-timeline-icon { left: -45px !important; width: 30px !important; height: 30px !important; }
                .about-timeline-icon svg { width: 18px !important; height: 18px !important; }
                .about-item-title { fontSize: 1.2rem !important; }
                .about-art-card { padding: 25px !important; }
                .about-art-card-content { flex-direction: column !important; gap: 20px !important; align-items: flex-start !important; }
                .about-art-button { width: 100% !important; justify-content: center !important; }
                .about-skill-item { padding: 8px 14px !important; font-size: 0.8rem !important; }
            }
        `;
        document.head.appendChild(style);
    }, []);

    const SkillGroup = ({ title, skills, isMobile }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const limit = 6;
        const showToggle = isMobile && skills.length > limit;
        const visibleSkills = showToggle && !isExpanded ? skills.slice(0, limit) : skills;

        return (
            <div style={styles.skillGroup}>
                <h3 style={styles.groupTitle}>{title}</h3>
                <div style={styles.skillsGrid}>
                    {visibleSkills.map(skill => (
                        <div key={skill.name} style={styles.skillItem} className="about-skill-item">
                            {skill.icon}
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
                {showToggle && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent-color, #3344DD)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            padding: '8px 0',
                            fontSize: '0.8rem',
                            textAlign: 'left',
                            width: 'fit-content',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {isExpanded ? 'Show Less' : `+ Show ${skills.length - limit} More`}
                    </button>
                )}
            </div>
        );
    };

    const sections = [
        {
            id: 'intro',
            content: (
                <div style={styles.sectionContent}>
                    <h2 style={styles.sectionTitle} className="about-section-title">Introduction</h2>
                    <p style={styles.text}>
                        UX/Product Designer with 2 years of experience designing 0→1 enterprise SaaS products from user research to delivery.
                    </p>
                    <p style={styles.text}>
                        Experienced in discovery, workflow design, information architecture, interaction design, and translating complex business problems into intuitive, data-driven experiences.
                    </p>

                    {/* Designer Impact Stat Row */}
                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>2+</div>
                            <div style={styles.statLabel}>Years Experience</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>0 → 1</div>
                            <div style={styles.statLabel}>SaaS Product Systems</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>IIT Ropar</div>
                            <div style={styles.statLabel}>B.Tech Alumni</div>
                        </div>
                    </div>

                    <div style={styles.socials}>
                        <p style={{ fontWeight: '700', marginBottom: '15px' }}>Let's Connect 😉</p>
                        <div style={styles.socialIcons}>
                            <a
                                href="https://www.instagram.com/chitrankar.r_70/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.socialLink}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open('https://www.instagram.com/chitrankar.r_70/', '_blank', 'noopener,noreferrer');
                                }}
                            >
                                <Instagram size={18} /> Instagram
                            </a>
                            <a
                                href="https://www.linkedin.com/in/chitrankar-r-ba7aa920a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.socialLink}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open('https://www.linkedin.com/in/chitrankar-r-ba7aa920a/', '_blank', 'noopener,noreferrer');
                                }}
                            >
                                <Linkedin size={18} /> LinkedIn
                            </a>
                            <a
                                href="https://github.com/neo7505"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.socialLink}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open('https://github.com/neo7505', '_blank', 'noopener,noreferrer');
                                }}
                            >
                                <Github size={18} /> GitHub
                            </a>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'education',
            content: (
                <div style={styles.sectionContent}>
                    <h2 style={styles.sectionTitle} className="about-section-title">Education</h2>
                    <div style={styles.timeline} className="about-timeline">
                        <div style={styles.timelineLine} className="about-timeline-line"></div>

                        <div style={styles.timelineItem}>
                            <div style={styles.timelineIconWrapper} className="about-timeline-icon">
                                <GraduationCap size={32} />
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineHeader}>
                                    <h3 style={styles.itemTitle} className="about-item-title">Indian Institute Of Technology (IIT), Ropar</h3>
                                    <span style={styles.datePill}>2020-2024</span>
                                </div>
                                <p style={styles.degreeText}>B.Tech In Metallurgical And Materials Engineering</p>
                                <p style={styles.descriptionText}>
                                    <ReadMore limit={150}>
                                        During My Time At IIT Ropar, I Actively Took On Leadership Roles Across Creative And Student Communities. From Serving As A <strong>Representative</strong> And <strong>Mentor</strong> In Vibgyor (Fine Arts Club) To Leading Design And Decoration Teams For <strong>Zeitgeist</strong> And <strong>Aarohan</strong>.
                                    </ReadMore>
                                </p>
                                <p style={styles.descriptionText}>
                                    <ReadMore limit={100}>
                                        I Learned How To Manage Teams, Coordinate Events, And Bring Creative Ideas To Life Through Collaboration And Design.
                                    </ReadMore>
                                </p>
                            </div>
                        </div>

                        <div style={styles.timelineItem}>
                            <div style={styles.timelineIconWrapper}>
                                <BookOpen size={30} />
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineHeader}>
                                    <h3 style={styles.itemTitle}>Jaswant Modern School, Dehradun</h3>
                                    <span style={styles.datePill}>2017-2019</span>
                                </div>
                                <p style={styles.degreeText}>GRADE XII</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'experience',
            content: (
                <div style={styles.sectionContent}>
                    <h2 style={styles.sectionTitle} className="about-section-title">Work Experience</h2>
                    <div style={styles.timeline} className="about-timeline">
                        <div style={styles.timelineLine} className="about-timeline-line"></div>

                        <div style={styles.timelineItem}>
                            <div style={styles.timelineIconWrapper} className="about-timeline-icon">
                                <Briefcase size={28} />
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineHeader}>
                                    <h3 style={styles.itemTitle}>OctoDo Solutions Pvt. Ltd.</h3>
                                    <span style={styles.datePill}>May 2024 – March 2026</span>
                                </div>
                                <p style={styles.degreeText}>Product Engineer (UX & Product Systems) (Intern → Full-time)</p>
                                <ul style={styles.bulletList}>
                                    <li>Led stakeholder interviews and discovery workshops, translating workflow challenges into actionable product requirements.</li>
                                    <li>Designed end-to-end user journeys, task flows, information architecture, and interaction models for complex enterprise workflows.</li>
                                    <li>Created wireframes, high-fidelity interfaces, reusable design systems, and dashboard experiences for data-heavy SaaS products.</li>
                                    <li>Validated and iterated designs through stakeholder feedback while leading UX design from discovery to production across multiple enterprise products.</li>
                                </ul>
                                <div style={styles.roleTags}>
                                    <span style={styles.roleTag}>User Discovery</span>
                                    <span style={styles.roleTag}>Information Architecture</span>
                                    <span style={styles.roleTag}>Task Flows</span>
                                    <span style={styles.roleTag}>Wireframing</span>
                                    <span style={styles.roleTag}>Design Systems</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.timelineItem}>
                            <div style={styles.timelineIconWrapper} className="about-timeline-icon">
                                <Cloud size={28} />
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineHeader}>
                                    <h3 style={styles.itemTitle}>KloudStac</h3>
                                    <span style={styles.datePill}>June 2023 – Aug 2023</span>
                                </div>
                                <p style={styles.degreeText}>Cloud Developer Intern (Remote)</p>
                                <ul style={styles.bulletList}>
                                    <li>Deployed a generative AI chatbot on Azure using OpenAI and Cognitive Search for document-based query resolution.</li>
                                    <li>Built automated document extraction pipelines using Azure Form Recognizer, reducing manual processing effort.</li>
                                </ul>
                                <div style={styles.roleTags}>
                                    <span style={styles.roleTag}>Generative AI</span>
                                    <span style={styles.roleTag}>Azure OpenAI</span>
                                    <span style={styles.roleTag}>Cognitive Search</span>
                                    <span style={styles.roleTag}>Pipeline Design</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'skills',
            content: (
                <div style={styles.sectionContent}>
                    <h2 style={styles.sectionTitle}>Skills</h2>

                    <div style={styles.skillsContainer}>
                        {/* Group 0: Product & Strategy */}
                        <SkillGroup
                            title="Product & Strategy"
                            isMobile={isMobile}
                            skills={[
                                { name: 'Product Discovery', icon: <Layout size={16} /> },
                                { name: 'User Research', icon: <Search size={16} /> },
                                { name: 'Discovery Workshops', icon: <Users size={16} /> },
                                { name: 'Roadmapping & Strategy', icon: <GitBranch size={16} /> },
                                { name: 'Prioritization (RICE)', icon: <Zap size={16} /> },
                                { name: 'Workflow Design', icon: <Workflow size={16} /> },
                                { name: 'Stakeholder Mgmt.', icon: <Layers size={16} /> },
                                { name: 'Data-Driven UX', icon: <BarChart2 size={16} /> }
                            ]}
                        />

                        {/* Group 1: Design & UX */}
                        <SkillGroup
                            title="Design & UX"
                            isMobile={isMobile}
                            skills={[
                                { name: 'Figma', icon: <Figma size={16} /> },
                                { name: 'Interaction Design', icon: <MousePointer2 size={16} /> },
                                { name: 'Wireframing', icon: <Layout size={16} /> },
                                { name: 'High-Fidelity Prototyping', icon: <Workflow size={16} /> },
                                { name: 'Information Architecture', icon: <Layers size={16} /> },
                                { name: 'User Journeys & Task Flows', icon: <GitBranch size={16} /> },
                                { name: 'Design Systems', icon: <Component size={16} /> },
                                { name: 'UX Strategy', icon: <Layout size={16} /> },
                                { name: 'Dashboard Design', icon: <BarChart2 size={16} /> },
                                { name: 'Typography & Layout', icon: <Type size={16} /> },
                                { name: 'Accessibility', icon: <Eye size={16} /> },
                                { name: 'Motion Design', icon: <Play size={16} /> }
                            ]}
                        />

                        {/* Group 2: Frontend & Data UI */}
                        <SkillGroup
                            title="Frontend & Data UI"
                            isMobile={isMobile}
                            skills={[
                                { name: 'React.js', icon: <Atom size={16} /> },
                                { name: 'JavaScript (ES6+)', icon: <Cpu size={16} /> },
                                { name: 'API Handling', icon: <Globe size={16} /> },
                                { name: 'State (Redux/Zustand)', icon: <Database size={16} /> },
                                { name: 'Data Visualization', icon: <BarChart2 size={16} /> },
                                { name: 'TanStack Table', icon: <Table size={16} /> },
                                { name: 'Tailwind CSS', icon: <Wind size={16} /> },
                                { name: 'Performance Opt.', icon: <Zap size={16} /> },
                                { name: 'Version Control', icon: <Github size={16} /> },
                                { name: 'Responsive UI', icon: <BoxSelect size={16} /> }
                            ]}
                        />
                    </div>
                </div>
            )
        }
    ];

    return (
        <div style={styles.container} className="about-container">
            <NoiseOverlay />
            <FloatingAssets />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
                <InteractiveGrid />
            </div>
            <div style={styles.mainContent}>
                {isMobile ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '60px' }}>
                        {sections.map(section => (
                            <div key={section.id}>
                                {section.content}
                            </div>
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={activeSectionIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -50 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ width: '100%' }}
                        >
                            {sections[activeSectionIndex]?.content}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '60px 15% 40px 10%',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '900px',
    },
    sectionContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    sectionTitle: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '12px',
        fontFamily: "'Outfit', sans-serif",
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
    statsRow: {
        display: 'flex',
        gap: '16px',
        margin: '20px 0 10px 0',
        flexWrap: 'wrap',
    },
    statCard: {
        flex: 1,
        minWidth: '140px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    statNumber: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#111111',
        fontFamily: "'Outfit', sans-serif",
    },
    statLabel: {
        fontSize: '0.78rem',
        color: '#666666',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    roleTags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '12px',
    },
    roleTag: {
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: '#F3F4F6',
        color: '#374151',
        borderRadius: '6px',
        padding: '4px 10px',
        border: '1px solid #E5E7EB',
    },
    socials: {
        marginTop: '28px',
        position: 'relative',
        zIndex: 20,
    },
    socialIcons: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 20,
    },
    socialLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#111111',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '12px',
        padding: '10px 18px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.85rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 25,
        transition: 'all 0.2s ease',
    },
    item: {
        marginBottom: '20px',
    },
    itemTitle: {
        fontSize: '1.4rem',
        fontWeight: '700',
        margin: 0,
        fontFamily: "'Outfit', sans-serif",
    },
    timeline: {
        position: 'relative',
        paddingLeft: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        marginTop: '20px',
    },
    timelineLine: {
        position: 'absolute',
        left: '20px',
        top: '10px',
        bottom: '10px',
        width: '1px',
        backgroundColor: '#333',
        zIndex: 0,
    },
    timelineItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    timelineIconWrapper: {
        position: 'absolute',
        left: '-60px',
        top: '0',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color)',
        zIndex: 1,
    },
    timelineContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    timelineHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap',
    },
    datePill: {
        backgroundColor: '#E0E0E0',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#333',
        fontFamily: "'Outfit', sans-serif",
    },
    degreeText: {
        fontSize: '1rem',
        fontStyle: 'italic',
        color: '#3344DD',
        fontWeight: '600',
        margin: 0,
    },
    descriptionText: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: '#333',
        maxWidth: '800px',
        margin: 0,
        marginTop: '10px',
    },
    bulletList: {
        margin: 0,
        paddingLeft: '20px',
        fontSize: '0.92rem',
        lineHeight: '1.6',
        color: '#333',
        maxWidth: '850px',
    },
    date: {
        color: 'var(--accent-color)',
        fontWeight: '700',
        marginTop: '4px',
        fontSize: '0.85rem',
    },
    skillsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    skillsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    skillGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    groupTitle: {
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#888',
        fontWeight: '600',
        margin: 0,
    },
    skillItem: {
        fontSize: '0.75rem',
        padding: '6px 12px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #eee',
        fontWeight: '600',
        color: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        cursor: 'default',
    },
    artCard: {
        marginTop: '15px',
        background: 'linear-gradient(135deg, #0D1117 0%, #1A1A1A 100%)',
        borderRadius: '24px',
        padding: '20px 30px',
        color: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '900px',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    artCardGlow: {
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(51, 68, 221, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    artCardDecoration: {
        position: 'absolute',
        right: '4%',
        top: '50%',
        transform: 'translateY(-50%) rotate(15deg)',
        opacity: 0.08,
        pointerEvents: 'none',
    },
    brushIcon: {
        color: 'white',
    },
    artCardContent: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        zIndex: 1,
    },
    sketchPreviewFan: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '70px',
        width: '100px',
        minWidth: '100px',
    },
    sketchMini: {
        position: 'absolute',
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '2px solid rgba(255, 255, 255, 0.85)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.3s ease',
    },
    artCardLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    artTag: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: '#7A8099',
        fontWeight: '700',
    },
    artCardTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        margin: 0,
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif",
    },
    artCardDesc: {
        fontSize: '0.95rem',
        color: '#9CA3AF',
        margin: 0,
        fontWeight: '500',
        lineHeight: '1.5',
    },
    artButton: {
        background: 'rgba(255,255,255,0.05)',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '0.95rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        transition: 'all 0.3s ease',
    }
};

export default About;
