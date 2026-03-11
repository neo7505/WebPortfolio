import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Github, Linkedin, Instagram } from 'lucide-react';
import { PAGES } from '../constants/navigation';
import resumePDF from '../assets/Chitrankar_UXfocused.pdf';

const MobileMenu = ({ isOpen, onClose, activePageIndex, onPageClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={styles.overlay}
        >
          <div style={styles.header}>
            <span style={styles.menuTitle}>MENU</span>
            <button onClick={onClose} style={styles.closeButton}>
              <X size={32} color="#FFF" />
            </button>
          </div>

          <nav style={styles.nav}>
            {PAGES.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                onClick={() => {
                  onPageClick(index);
                  onClose();
                  
                  // Mobile continuous scroll handling
                  const sectionId = `${PAGES[index].id}-section`;
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  ...styles.navItem,
                  color: activePageIndex === index ? 'var(--accent-color)' : '#FFF',
                }}
              >
                <span style={styles.navNumber}>0{index + 1}</span>
                <span style={styles.navLabel}>{page.label.toUpperCase()}</span>
              </motion.div>
            ))}
          </nav>

          <div style={styles.footer}>
            <a 
              href={resumePDF} 
              download="Chitrankar_Resume.pdf" 
              style={styles.resumeButton}
            >
              <Download size={18} style={{ marginRight: '10px' }} />
              RESUME / CV
            </a>

            <div style={styles.socials}>
              <motion.a 
                href="https://github.com/neo7505" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialLink}
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Github size={20} color="#7A8099" style={styles.socialIcon} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/chitrankar-r-ba7aa920a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialLink}
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Linkedin size={20} color="#7A8099" style={styles.socialIcon} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/chitrankar.r_70/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.socialLink}
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Instagram size={20} color="#7A8099" style={styles.socialIcon} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#0D1117',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '60px',
  },
  menuTitle: {
    color: '#7A8099',
    fontSize: '14px',
    letterSpacing: '0.2em',
    fontWeight: '600',
  },
  closeButton: {
    padding: '10px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '15px',
    cursor: 'pointer',
    fontSize: '28px',
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: '0.05em',
  },
  navNumber: {
    fontSize: '16px',
    fontStyle: 'normal',
    color: '#7A8099',
    fontWeight: '400',
  },
  navLabel: {
    transition: 'all 0.3s ease',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  resumeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    color: '#000',
    padding: '16px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '700',
    textDecoration: 'none',
    letterSpacing: '0.1em',
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  socialIcon: {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  socialLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default MobileMenu;
