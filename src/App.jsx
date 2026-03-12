import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import ProgressIndicator from './components/ProgressIndicator';
import VerticalNav from './components/VerticalNav';
import MobileMenu from './components/MobileMenu';
import ArtisticTexture from './components/ArtisticTexture';
import SectionWrapper from './components/SectionWrapper';
import { useState, lazy, Suspense } from 'react';
import { PAGES } from './constants/navigation';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const ArtGallery = lazy(() => import('./components/ArtGallery'));
const EcoIndexCaseStudy = lazy(() => import('./components/EcoIndexCaseStudy'));
const IntelliQCaseStudy = lazy(() => import('./components/IntelliQCaseStudy'));

const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF8F1',
    color: '#0000FF',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.2rem',
    letterSpacing: '0.1em'
  }}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      LOADING EXPERIENCE...
    </motion.div>
  </div>
);

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
            <Suspense fallback={<LoadingFallback />}>
              {pages.map((page, idx) => (
                <SectionWrapper key={idx} id={`${PAGES[idx].id}-section`}>
                  {page}
                </SectionWrapper>
              ))}
            </Suspense>
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
              <Suspense fallback={<LoadingFallback />}>
                {pages[activePageIndex]}
              </Suspense>
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
      <ArtisticTexture />
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>

      <AnimatePresence>
        {showArtGallery && (
          <Suspense fallback={null}>
            <ArtGallery onBack={closeArtGallery} />
          </Suspense>
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
