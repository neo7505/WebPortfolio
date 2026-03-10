import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Instagram, Linkedin, MapPin, Send, CheckCircle, ExternalLink, Copy, Clock, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [time, setTime] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const form = useRef();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const mumbaiTime = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(now);
            setTime(mumbaiTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm('service_tu05xnu', 'template_c7rh5rb', form.current, 'xveVrnqoZQm3Gs-72')
            .then((result) => {
                console.log(result.text);
                setIsSubmitted(true);
                setIsSending(false);
                e.target.reset();
                setTimeout(() => setIsSubmitted(false), 5000);
            }, (error) => {
                console.log(error.text);
                setIsSending(false);
                alert("Failed to send message. Please try again.");
            });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={styles.container}
        >
            <div style={styles.noiseOverlay}></div>

            <motion.header style={styles.header} variants={itemVariants}>
                <h2 style={styles.title}>
                    Let's Build Something,
                    <span className="accent-text" style={styles.italicTitle}> Remarkable</span>
                </h2>
                <p style={styles.subtitle}>Currently accepting new opportunities. Let's talk about yours.</p>
            </motion.header>

            <div style={styles.contentGrid}>
                {/* Contact Info Cards */}
                <motion.div style={styles.infoCol} variants={itemVariants}>
                    <motion.div
                        style={styles.card}
                        whileHover={{ y: -5, borderColor: 'var(--accent-color)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
                        onClick={() => copyToClipboard('hello@chitrankar.design')}
                    >
                        <div style={styles.cardIcon}>
                            <Mail size={24} />
                        </div>
                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Email Me</span>
                            <span style={styles.cardValue}>chitrakarramanandi86@gmail.com</span>
                        </div>
                        <div style={styles.cardAction}>
                            {copiedEmail ? <CheckCircle size={18} color="#4CAF50" /> : <Copy size={18} />}
                        </div>
                        {copiedEmail && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.copyTooltip}>Copied!</motion.span>}
                    </motion.div>

                    <motion.div
                        style={styles.card}
                        whileHover={{ y: -5, borderColor: 'var(--accent-color)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
                    >
                        <div style={styles.cardIcon}>
                            <MapPin size={24} />
                        </div>
                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Location</span>
                            <span style={styles.cardValue}>Amroha, Uttar Pradesh, India</span>
                        </div>
                        <div style={styles.cardAction}>
                            <div style={styles.timeTag} q>
                                <Clock size={12} style={{ marginRight: 4 }} />
                                {time}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={styles.card}
                        whileHover={{ y: -5, borderColor: 'var(--accent-color)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
                    >
                        <div style={styles.cardIcon}>
                            <Sparkles size={24} />
                        </div>
                        <div style={styles.cardContent}>
                            <span style={styles.cardLabel}>Availability</span>
                            <span style={styles.cardValue}>Available for freelance</span>
                        </div>
                        <div style={styles.cardAction}>
                            <div style={styles.statusDot}></div>
                        </div>
                    </motion.div>

                    <div style={styles.socialsGrid}>
                        <motion.a
                            href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}
                            whileHover={{ scale: 1.02, backgroundColor: '#FFF', borderColor: 'var(--accent-color)' }}
                        >
                            <Github size={20} />
                            <span>Github</span>
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}
                            whileHover={{ scale: 1.02, backgroundColor: '#FFF', borderColor: 'var(--accent-color)' }}
                        >
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                        </motion.a>
                        <motion.a
                            href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}
                            whileHover={{ scale: 1.02, backgroundColor: '#FFF', borderColor: 'var(--accent-color)' }}
                        >
                            <Instagram size={20} />
                            <span>Instagram</span>
                        </motion.a>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div style={styles.formCol} variants={itemVariants}>
                    {!isSubmitted ? (
                        <form ref={form} style={styles.form} onSubmit={sendEmail}>
                            <div style={styles.inputGroup}>
                                <div style={styles.inputWrapper}>
                                    <input type="text" name="user_name" required placeholder="Name" style={styles.input} />
                                    <span style={styles.inputBar}></span>
                                </div>
                                <div style={styles.inputWrapper}>
                                    <input type="email" name="user_email" required placeholder="Email" style={styles.input} />
                                    <span style={styles.inputBar}></span>
                                </div>
                            </div>
                            <div style={styles.inputWrapper}>
                                <textarea name="message" required placeholder="Tell me about your project" style={styles.textarea}></textarea>
                                <span style={styles.inputBar}></span>
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSending}
                                style={{ ...styles.submitButton, opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                                whileHover={!isSending ? { scale: 1.02, boxShadow: '0 10px 20px rgba(0, 0, 100, 0.2)' } : {}}
                                whileTap={!isSending ? { scale: 0.98 } : {}}
                            >
                                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                                <Send size={18} />
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={styles.successMessage}
                        >
                            <div style={styles.successIcon}>
                                <CheckCircle size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Message Sent!</h3>
                            <p style={{ color: '#666' }}>I'll get back to you within 24 hours.</p>
                            <motion.button
                                onClick={() => setIsSubmitted(false)}
                                style={{ marginTop: '20px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}
                                whileHover={{ opacity: 0.7 }}
                            >
                                Send another message
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Glowing Orbs */}
            <div style={styles.orb1}></div>
            <div style={styles.orb2}></div>

            <footer style={styles.footer}>
                <p>© 2026 Chitrankar. Crafted with precision.</p>
            </footer>
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
        padding: '120px 8% 60px 8%',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden',
    },
    noiseOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 1,
    },
    orb1: {
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 0, 255, 0.05) 0%, rgba(0, 0, 255, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
    },
    orb2: {
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '35vw',
        height: '35vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 0, 255, 0.03) 0%, rgba(0, 0, 255, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
        zIndex: 2,
    },
    title: {
        fontSize: 'clamp(3rem, 4vw, 5rem)',
        lineHeight: 1,
        marginBottom: '20px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
    },
    italicTitle: {
        fontFamily: 'serif',
        fontStyle: 'italic',
        fontWeight: 400,
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        maxWidth: '700px',
        margin: '0 auto',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '60px',
        width: '100%',
        maxWidth: '1200px',
        zIndex: 2,
    },
    infoCol: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        position: 'relative',
    },
    cardIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: 'var(--accent-color)',
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    cardLabel: {
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#888',
        fontWeight: 700,
    },
    cardValue: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
    },
    cardAction: {
        color: '#AAA',
    },
    copyTooltip: {
        position: 'absolute',
        top: '-10px',
        right: '20px',
        fontSize: '0.7rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '20px',
        fontWeight: 600,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    timeTag: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: '4px 10px',
        borderRadius: '20px',
        fontWeight: 600,
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        boxShadow: '0 0 10px #4CAF50',
    },
    socialsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginTop: '8px',
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '16px',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    formCol: {
        backgroundColor: '#FFF',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 40px 80px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(0, 0, 0, 0.02)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    inputGroup: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    inputWrapper: {
        flex: 1,
        position: 'relative',
        minWidth: '200px',
    },
    input: {
        width: '100%',
        padding: '12px 0',
        border: 'none',
        borderBottom: '2px solid #EEE',
        fontSize: '1.1rem',
        fontWeight: 500,
        outline: 'none',
        background: 'transparent',
    },
    textarea: {
        width: '100%',
        minHeight: '120px',
        padding: '12px 0',
        border: 'none',
        borderBottom: '2px solid #EEE',
        fontSize: '1.1rem',
        fontWeight: 500,
        outline: 'none',
        background: 'transparent',
        resize: 'none',
        fontFamily: 'inherit',
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '18px 30px',
        backgroundColor: 'var(--accent-color)',
        color: '#FFF',
        borderRadius: '16px',
        fontSize: '1.1rem',
        fontWeight: 700,
        marginTop: '10px',
    },
    successMessage: {
        textAlign: 'center',
        padding: '40px 0',
    },
    successIcon: {
        color: '#4CAF50',
        marginBottom: '20px',
    },
    footer: {
        marginTop: '100px',
        color: '#888',
        fontSize: '0.9rem',
        zIndex: 2,
    }
};

export default Contact;


