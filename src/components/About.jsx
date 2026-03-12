import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Instagram, Linkedin, GraduationCap, BookOpen, Briefcase, Code, Cloud,
    Figma, Workflow, Layout, Layers, Image, Palette, Box,
    Atom, Database, Cpu, Table, BarChart2, Wind, BoxSelect, Brush,
    Globe, Zap, GitBranch, Github, Component, Type, Eye, Play, Shield, Search
} from 'lucide-react';
import { InteractiveGrid, NoiseOverlay, FloatingAssets } from './Home';
import ReadMore from './ReadMore';


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
                        A UX-Focused Frontend Engineer Who Enjoys Turning Complex Ideas Into Usable Products.
                    </p>
                    <p style={styles.text}>
                        Creativity Drives My Work — From Sketching On Paper To Building On Screen.
                    </p>
                    <div style={styles.socials}>
                        <p style={{ fontWeight: '700', marginBottom: '15px' }}>Let's Connect 😉</p>
                        <div style={styles.socialIcons}>
                            <a href="https://www.instagram.com/chitrankar.r_70/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}><Instagram size={20} /> Instagram</a>
                            <a href="https://www.linkedin.com/in/chitrankar-r-ba7aa920a/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}><Linkedin size={20} /> LinkedIn</a>
                            <a href="https://github.com/neo7505" target="_blank" rel="noopener noreferrer" style={styles.socialLink}><Github size={20} /> GitHub</a>
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
                                    <span style={styles.datePill}>May 2024 – Present</span>
                                </div>
                                <p style={styles.degreeText}>UX-Focused Frontend Engineer (Remote)</p>
                                <ul style={styles.bulletList}>
                                    <li>Designed UX/UI, Frontend for SaaS platforms and built scalable React interfaces.</li>
                                    <li>Developed analytics dashboards and structured data-entry systems.</li>
                                    <li>Contributed to core platforms including <strong>IntellIQ</strong> (analytics) and <strong>EcoIndex</strong> (carbon tracking).</li>
                                    <li>Collaborated with backend teams to integrate APIs and ship reliable product releases.</li>
                                    <li>Created visual assets and product demo videos using Canva and Photoshop.</li>
                                </ul>
                            </div>
                        </div>

                        <div style={styles.timelineItem}>
                            <div style={styles.timelineIconWrapper} className="about-timeline-icon">
                                <Code size={28} />
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineHeader}>
                                    <h3 style={styles.itemTitle}>OctoDo Solutions Pvt. Ltd.</h3>
                                    <span style={styles.datePill}>Nov 2020 – July 2024</span>
                                </div>
                                <p style={styles.degreeText}>Frontend Developer Intern (Remote)</p>
                                <ul style={styles.bulletList}>
                                    <li>Built client websites using React, WordPress, and Shopify for Entech, Clean Carbon, Agrasen, and ASHRAE Region.</li>
                                    <li>Designed and developed the company’s official website (UX, UI, frontend).</li>
                                    <li>Implemented frontend modules for internal tools including D2O Management.</li>
                                </ul>
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
                                    <li>Deployed a generative AI chatbot on Microsoft Azure using Azure OpenAI.</li>
                                    <li>Automated document extraction with Azure AI services and managed VM deployments.</li>
                                </ul>
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
                        {/* Group 1: Design & UX */}
                        <SkillGroup
                            title="Design & UX"
                            isMobile={isMobile}
                            skills={[
                                { name: 'Figma', icon: <Figma size={16} /> },
                                { name: 'Design Systems', icon: <Component size={16} /> },
                                { name: 'Prototyping', icon: <Workflow size={16} /> },
                                { name: 'UX Strategy', icon: <Layout size={16} /> },
                                { name: 'User Research', icon: <Search size={16} /> },
                                { name: 'Information Arch', icon: <Layers size={16} /> },
                                { name: 'Typography', icon: <Type size={16} /> },
                                { name: 'Accessibility', icon: <Eye size={16} /> },
                                { name: 'Motion Design', icon: <Play size={16} /> },
                                { name: 'Adobe Photoshop', icon: <Image size={16} /> },
                                { name: 'Illustrator', icon: <Palette size={16} /> },
                                { name: 'Blender 3D', icon: <Box size={16} /> }
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
                                { name: 'CI/CD & Testing', icon: <Shield size={16} /> },
                                { name: 'Responsive UI', icon: <BoxSelect size={16} /> }
                            ]}
                        />
       </div>

                        {/* Creative Artwork Card - De-emphasized & Refined */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            style={styles.artCard}
                            className="about-art-card"
                        >
                            <div style={styles.artCardGlow}></div>
                            <div style={styles.artCardDecoration}>
                                <Brush size={100} style={styles.brushIcon} />
                            </div>
                            <div style={styles.artCardContent} className="about-art-card-content">
                                <div style={styles.artCardLeft}>
                                    <div style={styles.artTag}>Fine Arts • Traditional Artist</div>
                                    <h3 style={styles.artCardTitle}>Hand-Drawn Pencil Art & Sketching</h3>
                                    <p style={styles.artCardDesc}>Exploring depth and texture through traditional mediums.</p>
                                </div>
                                <motion.button
                                    whileHover={{ x: 8 }}
                                    onClick={onViewArtwork}
                                    style={styles.artButton}
                                    className="about-art-button"
                                >
                                    Experience Gallery <span>→</span>
                                </motion.button>
                            </div>
                        </motion.div>
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
        padding: '100px 15% 60px 10%',
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
    socials: {
        marginTop: '28px',
    },
    socialIcons: {
        display: 'flex',
        gap: '24px',
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
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
        gap: '10px',
    },
    skillsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    skillGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    groupTitle: {
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#888',
        fontWeight: '600',
        margin: 0,
    },
    skillItem: {
        fontSize: '0.85rem',
        padding: '10px 20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #eee',
        fontWeight: '600',
        color: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        cursor: 'default',
    },
    artCard: {
        marginTop: '30px',
        background: 'linear-gradient(135deg, #0D1117 0%, #1A1A1A 100%)',
        borderRadius: '24px',
        padding: '35px 40px',
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
        gap: '40px',
        zIndex: 1,
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
