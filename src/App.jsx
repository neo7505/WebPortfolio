import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import ProgressIndicator from './components/ProgressIndicator';
import VerticalNav from './components/VerticalNav';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ArtGallery from './components/ArtGallery';
import EcoIndexCaseStudy from './components/EcoIndexCaseStudy';
import IntelliQCaseStudy from './components/IntelliQCaseStudy';
import MobileMenu from './components/MobileMenu';
import CreativeCursor from './components/CreativeCursor';
import ArtisticTexture from './components/ArtisticTexture';
import { useState } from 'react';
import { PAGES } from './constants/navigation';

const MainPortfolio = ({ 
  activePageIndex, 
  activeSectionIndex, 
  goToPage, 
  goToSection, 
  currentPage,
  onViewArtGallery,
  onToggleMobileMenu
}) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = [
    <Home />,
    <About
      activeSectionIndex={activeSectionIndex}
      onViewArtwork={onViewArtGallery}
    />,
    <Projects />,
    <Contact />
  ];

  return (
    <div className="page-container">
      <ProgressIndicator 
        activePageIndex={activePageIndex} 
        onPageClick={goToPage}
        onToggleMenu={onToggleMobileMenu}
      />

      {/* Sidebar for About and Projects - Hide on Projects page */}
      {activePageIndex !== 2 && (
        <div className="vertical-nav-container">
          <VerticalNav
            sections={currentPage.sections}
            activeSectionIndex={activeSectionIndex}
            onSectionClick={goToSection}
          />
        </div>
      )}

      <div className="page-wrapper">
        {isMobile ? (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            {pages.map((page, idx) => (
              <div key={idx} id={`${PAGES[idx].id}-section`} style={{ width: '100%', height: 'auto' }}>
                {page}
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activePageIndex}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ height: '100vh', width: '100%' }}
            >
              {pages[activePageIndex]}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const {
    activePageIndex,
    activeSectionIndex,
    goToPage,
    goToSection,
    currentPage
  } = useScrollNavigation();

  const [showArtGallery, setShowArtGallery] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToArtGallery = () => setShowArtGallery(true);
  const closeArtGallery = () => setShowArtGallery(false);

  // Lock scroll when gallery or case study is open
  React.useEffect(() => {
    const isCaseStudy = location.pathname === '/ecoindex' || location.pathname === '/intelliq';
    if (showArtGallery || isCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showArtGallery, location.pathname]);

  return (
    <>
      <CreativeCursor />
      <ArtisticTexture />
      <Routes>
        <Route 
          path="/" 
          element={
            <MainPortfolio 
              activePageIndex={activePageIndex}
              activeSectionIndex={activeSectionIndex}
              goToPage={goToPage}
              goToSection={goToSection}
              currentPage={currentPage}
              onViewArtGallery={goToArtGallery}
              onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
            />
          } 
        />
        <Route path="/ecoindex" element={<EcoIndexCaseStudy onBack={() => navigate('/')} />} />
        <Route path="/intelliq" element={<IntelliQCaseStudy onBack={() => navigate('/')} />} />
      </Routes>

      <AnimatePresence>
        {showArtGallery && (
          <ArtGallery onBack={closeArtGallery} />
        )}
      </AnimatePresence>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activePageIndex={activePageIndex}
        onPageClick={goToPage}
      />
    </>
  );
};

export default App;
