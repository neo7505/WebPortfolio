import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';

const ArtGallery = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState([false, false, false, false]);

    const artworkImages = [
        'Aujla.webp', 'Billie.webp', 'Charch.webp', 'Colors.jpg', 'Eye.jpg',
        'GLow.jpg', 'Glow2.jpg', 'Hang.jpg', 'Joker.jpg', 'kirti.jpg',
        'Kiss1.webp', 'Kiss2.webp', 'Kiss3.webp', 'Kiss4.webp', 'Kiss5.webp',
        'Kiss6.webp', 'Kiss7.webp', 'Korea.webp', 'Krishna.jpg', 'Krishna.webp',
        'Krishna2.webp', 'Krishna3.webp', 'Messi.webp', 'pider.jpg', 'Siddhu.jpg',
        'Skull.jpg', 'Stan.webp', 'Stencil.jpg', 'Stencil2.jpg', 'Trimurti.webp',
        'Virat.webp', 'Witch.jpg', 'Yin.webp', 'Zayn.jpg'
    ];

    // Divide images into 4 columns
    const columns = [
        artworkImages.slice(0, 9),
        artworkImages.slice(9, 18),
        artworkImages.slice(18, 27),
        artworkImages.slice(27, 34)
    ];

    const toggleHover = (index, value) => {
        const newHovered = [...isHovered];
        newHovered[index] = value;
        setIsHovered(newHovered);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.fullPage}
        >
            <header style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>
                <div style={styles.titleGroup}>
                    <h1 style={styles.mainTitle}>Art Gallery</h1>
                    <p style={styles.subtitle}>Traditional Sketches & Digital Art</p>
                </div>
            </header>

            <div style={styles.galleryContainer}>
                {columns.map((col, colIndex) => (
                    <div 
                        key={colIndex} 
                        style={styles.columnWrapper}
                        onMouseEnter={() => toggleHover(colIndex, true)}
                        onMouseLeave={() => toggleHover(colIndex, false)}
                    >
                        <motion.div
                            style={styles.column}
                            animate={{
                                y: isHovered[colIndex] ? 0 : (colIndex % 2 === 0 ? [0, -1200] : [-1200, 0]),
                            }}
                            transition={{
                                y: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: colIndex % 2 === 0 ? 20 : 25,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...col, ...col].map((img, imgIndex) => (
                                <motion.div
                                    key={`${colIndex}-${imgIndex}`}
                                    style={styles.imageCard}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedImage(`/assets/Art/${img}`)}
                                >
                                    <div style={styles.imageInner}>
                                        <img 
                                            src={`/assets/Art/${img}`} 
                                            alt={`Artwork ${imgIndex}`} 
                                            style={styles.image} 
                                            loading="lazy"
                                        />
                                        <div style={styles.overlay}>
                                            <ZoomIn size={24} color="white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            style={styles.closeButton}
                            onClick={() => setSelectedImage(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={32} />
                        </motion.button>
                        
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage} alt="Selected Art" style={styles.modalImage} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>
                {`
                @media (max-width: 1024px) {
                    .gallery-container {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 600px) {
                    .gallery-container {
                        grid-template-columns: 1fr !important;
                    }
                }
                `}
            </style>
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
        backgroundColor: '#0A0A0A',
        zIndex: 2000,
        overflowY: 'auto',
        overflowX: 'hidden',
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif",
    },
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px 5%',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(15px)',
        zIndex: 2100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    backButton: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '8px 16px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#FFFFFF',
        transition: 'all 0.3s ease',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainTitle: {
        fontSize: '1.2rem',
        fontWeight: '800',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '3px',
    },
    subtitle: {
        fontSize: '0.7rem',
        opacity: 0.5,
        letterSpacing: '1px',
    },
    galleryContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        width: '100%',
        minHeight: '200vh',
        gap: '15px',
        padding: '120px 15px 120px 15px',
        boxSizing: 'border-box',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    },
    columnWrapper: {
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    imageCard: {
        width: '100%',
        cursor: 'zoom-in',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: '#111',
    },
    imageInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        transition: 'transform 0.4s ease',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    closeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '12px',
        borderRadius: '50%',
        zIndex: 3001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        maxWidth: '95%',
        maxHeight: '95%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        maxWidth: '100%',
        maxHeight: '90vh',
        objectFit: 'contain',
        borderRadius: '10px',
    }
};

export default ArtGallery;
