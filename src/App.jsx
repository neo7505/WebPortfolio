import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useState } from 'react';

const App = () => {
  const {
    activePageIndex,
    activeSectionIndex,
    goToPage,
    goToSection,
    currentPage
  } = useScrollNavigation();

  const [showArtGallery, setShowArtGallery] = useState(false);
  const [showEcoIndexCaseStudy, setShowEcoIndexCaseStudy] = useState(false);
  const [showIntelliQCaseStudy, setShowIntelliQCaseStudy] = useState(false);

  const goToArtGallery = () => setShowArtGallery(true);
  const closeArtGallery = () => setShowArtGallery(false);

  const goToEcoIndexCaseStudy = () => setShowEcoIndexCaseStudy(true);
  const closeEcoIndexCaseStudy = () => setShowEcoIndexCaseStudy(false);

  const goToIntelliQCaseStudy = () => setShowIntelliQCaseStudy(true);
  const closeIntelliQCaseStudy = () => setShowIntelliQCaseStudy(false);

  // Lock scroll when gallery or case study is open
  React.useEffect(() => {
    if (showArtGallery || showEcoIndexCaseStudy || showIntelliQCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showArtGallery, showEcoIndexCaseStudy, showIntelliQCaseStudy]);

  const pages = [
    <Home />,
    <About
      activeSectionIndex={activeSectionIndex}
      onViewArtwork={goToArtGallery}
    />,
    <Projects
      onViewEcoIndex={goToEcoIndexCaseStudy}
      onViewIntelliQ={goToIntelliQCaseStudy}
    />,
    <Contact />
  ];

  return (
    <div className="page-container">
      <ProgressIndicator 
        activePageIndex={activePageIndex} 
        onPageClick={goToPage}
      />

      {/* Sidebar for About and Projects - Hide on Projects page */}
      {activePageIndex !== 2 && (
        <VerticalNav
          sections={currentPage.sections}
          activeSectionIndex={activeSectionIndex}
          onSectionClick={goToSection}
        />
      )}

      <div className="page-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePageIndex}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              duration: 0.8
            }}
            style={{ height: '100vh', width: '100vw' }}
          >
            {pages[activePageIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showArtGallery && (
          <ArtGallery onBack={closeArtGallery} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEcoIndexCaseStudy && (
          <EcoIndexCaseStudy onBack={closeEcoIndexCaseStudy} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntelliQCaseStudy && (
          <IntelliQCaseStudy onBack={closeIntelliQCaseStudy} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
