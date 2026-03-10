import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import sketch1 from '../assets/sketch1.png';
import sketch2 from '../assets/sketch2.png';
import sketch3 from '../assets/sketch3.png';

const ArtGallery = ({ onBack }) => {
    const artworks = [
        { id: 1, title: 'Mountain Serenity', image: sketch1, category: 'Landscape Sketch' },
        { id: 2, title: 'European Heritage', image: sketch2, category: 'Architectural Study' },
        { id: 3, title: 'Human Expression', image: sketch3, category: 'Portrait Study' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={styles.fullPage}
        >
            {/* Header */}
            <header style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} />
                    <span>Back to Portfolio</span>
                </button>
                <h1 style={styles.mainTitle}>Art Gallery</h1>
            </header>

            <div style={styles.container}>
                <div style={styles.intro}>
                    <p style={styles.description}>
                        Beyond the technical world of frontend and UX, I find peace in traditional pencil sketching.
                        Each piece is a journey into detail, light, and shadow.
                    </p>
                </div>

                <div style={styles.grid}>
                    {artworks.map((art) => (
                        <motion.div
                            key={art.id}
                            whileHover={{ y: -10 }}
                            style={styles.card}
                        >
                            <div style={styles.imageWrapper}>
                                <img src={art.image} alt={art.title} style={styles.image} />
                            </div>
                            <div style={styles.cardInfo}>
                                <span style={styles.category}>{art.category}</span>
                                <h3 style={styles.artTitle}>{art.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <footer style={styles.footer}>
                    <p>Interested in my traditional art? Let's talk more on <a href="#" style={styles.link}>Instagram</a>.</p>
                </footer>
            </div>
        </motion.div>
    );
};

const styles = {
    fullPage: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FDF8F1',
        zIndex: 2000,
        overflowY: 'auto',
        color: '#1A1A1A',
        fontFamily: 'var(--font-family)',
    },
    header: {
        padding: '30px 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EEE',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(253, 248, 241, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
    },
    backButton: {
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1A1A1A',
    },
    mainTitle: {
        fontSize: '1.8rem',
        fontWeight: '800',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 5%',
    },
    intro: {
        marginBottom: '60px',
        maxWidth: '700px',
    },
    description: {
        fontSize: '1.2rem',
        lineHeight: '1.7',
        color: '#555',
        fontStyle: 'italic',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '40px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #F0F0F0',
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: '4/5',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    cardInfo: {
        padding: '20px',
    },
    category: {
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#3344DD',
        fontWeight: '700',
    },
    artTitle: {
        margin: '5px 0 0 0',
        fontSize: '1.2rem',
        fontWeight: '600',
    },
    footer: {
        marginTop: '80px',
        textAlign: 'center',
        paddingBottom: '60px',
    },
    link: {
        color: '#3344DD',
        textDecoration: 'none',
        fontWeight: '700',
    }
};

export default ArtGallery;
