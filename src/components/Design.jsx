import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NoiseOverlay, InteractiveGrid, FloatingAssets } from './Home';
import { 
  Palette, 
  Sparkles, 
  FileText, 
  Layout, 
  Image as ImageIcon, 
  Maximize2, 
  Download, 
  ExternalLink, 
  X, 
  Eye, 
  Compass, 
  Layers, 
  Play, 
  ZoomIn, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const GIF_GALLERY = [
  {
    id: 'walkin-hi',
    title: 'Friendly Greeting Mascot',
    category: 'Onboarding & Flow',
    filename: 'Walkin say hi.gif',
    description: 'Smooth onboarding mascot greeting to welcome users into the EcoIndex dashboard.',
    tags: ['Onboarding', 'Character', 'Greeting']
  },
  {
    id: 'heavy-cup',
    title: 'Heavy Carbon Footprint',
    category: 'Status & Indicators',
    filename: 'Mascot_Walking_With_Heavy_Cup_Redone.gif',
    description: 'Expressive animation representing high energy consumption and heavy carbon load.',
    tags: ['Status', 'Behavioral UX', 'Feedback']
  },
  {
    id: 'progress-walk',
    title: 'Progress Bar Walker',
    category: 'Status & Indicators',
    filename: 'Progress bar walk.gif',
    description: 'Dynamic character progress indicator keeping users engaged during loading states.',
    tags: ['Loading State', 'Gamified UX', 'Motion']
  },
  {
    id: 'calculator',
    title: 'Carbon Calculator Interaction',
    category: 'Micro-interactions',
    filename: 'Calculator_Pullout_.gif',
    description: 'Interactive mascot pulling out the emissions calculation tool.',
    tags: ['Micro-interaction', 'Utility', 'UI Helper']
  },
  {
    id: 'home-impact',
    title: 'Home Energy Impact',
    category: 'Status & Indicators',
    filename: 'Home_Impact.gif',
    description: 'Visual mascot response reflecting domestic energy efficiency stats.',
    tags: ['Eco Metrics', 'Visualization', 'Mascot']
  },
  {
    id: 'onboarding-user',
    title: 'Personal Flow Onboarding',
    category: 'Onboarding & Flow',
    filename: 'Onboarding_Not_Employed.gif',
    description: 'Custom guide animation tailored for individual lifestyle emission setup.',
    tags: ['User Onboarding', 'Personal Tier']
  },
  {
    id: 'onboarding-employee',
    title: 'Workplace Employee Flow',
    category: 'Onboarding & Flow',
    filename: 'On_Employee.gif',
    description: 'Enterprise onboarding mascot guiding office team members.',
    tags: ['Enterprise', 'B2B Flow', 'Team']
  },
  {
    id: 'pointing-emission',
    title: 'Emission Spike Highlight',
    category: 'Micro-interactions',
    filename: 'Pointing_Toward_Emission.gif',
    description: 'Attention-focusing character pointing toward high-carbon metrics.',
    tags: ['Data Callout', 'Alert State']
  },
  {
    id: 'student-board',
    title: 'Sustainability Education',
    category: 'Micro-interactions',
    filename: 'Student_Black_Board.gif',
    description: 'Educational mascot presenting tips to reduce daily carbon footprint.',
    tags: ['Education', 'Tips', 'Engagement']
  },
  {
    id: 'thinking-cloud',
    title: 'AI Calculation Cloud',
    category: 'Status & Indicators',
    filename: 'Thinking cloud.gif',
    description: 'Thoughtful state animation when calculating complex carbon models.',
    tags: ['Processing', 'AI State', 'Thought']
  },
  {
    id: 'thumb-up',
    title: 'Goal Achieved Success',
    category: 'Status & Indicators',
    filename: 'Thumb_up_.gif',
    description: 'Celebratory mascot gesture triggering on user milestone completion.',
    tags: ['Success State', 'Gamification', 'Reward']
  },
  {
    id: 'typing-work',
    title: 'Active Workstation Mascot',
    category: 'Micro-interactions',
    filename: 'Typing_Working_1.gif',
    description: 'Working mascot indicating active data syncing and input entry.',
    tags: ['Active State', 'Workplace', 'Sync']
  },
  {
    id: 'pointing-screen',
    title: 'Workplace Guide',
    category: 'Micro-interactions',
    filename: 'Workplace_Pointing_Screen.gif',
    description: 'Guide mascot pointing to corporate carbon targets on dashboard screen.',
    tags: ['Dashboard Guide', 'Callout']
  },
  {
    id: 'plane-travel',
    title: 'Travel Footprint Mascot',
    category: 'Micro-interactions',
    filename: 'Plane.gif',
    description: 'Flight emission calculator mascot demonstrating transportation footprint.',
    tags: ['Travel', 'Transport', 'Footprint']
  }
];

const CATEGORIES = ['All', 'Onboarding & Flow', 'Micro-interactions', 'Status & Indicators'];

const Design = ({ onViewArtGallery }) => {
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState('logo-study');
  const [gifCategory, setGifCategory] = useState('All');
  const [selectedGif, setSelectedGif] = useState(null);
  const [isStudyZoomed, setIsStudyZoomed] = useState(false);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    if (document.getElementById('design-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'design-page-styles';
    style.innerHTML = `
      .design-tab-btn {
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .design-tab-btn:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #FFFFFF !important;
      }
      .design-card-hover {
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .design-card-hover:hover {
        transform: translateY(-6px);
        border-color: rgba(96, 165, 250, 0.4) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(96, 165, 250, 0.15) !important;
      }
      .pdf-action-btn:hover {
        background: #FFFFFF !important;
        color: #000000 !important;
        transform: translateY(-2px);
      }
      .design-container {
        height: 100vh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch;
      }
      @media (max-width: 768px) {
        .design-container { padding: 80px 20px 40px 20px !important; height: auto !important; min-height: 100vh !important; overflow-y: visible !important; }
        .design-tabs-bar { overflow-x: auto !important; width: 100% !important; justify-content: flex-start !important; padding-bottom: 8px !important; }
        .design-grid-2 { grid-template-columns: 1fr !important; }
        .design-grid-3 { grid-template-columns: 1fr !important; }
        .pdf-frame-height { height: 500px !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const filteredGifs = gifCategory === 'All' 
    ? GIF_GALLERY 
    : GIF_GALLERY.filter(item => item.category === gifCategory);

  return (
    <div ref={containerRef} style={styles.container} className="design-container">
      <NoiseOverlay />
      <FloatingAssets />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1, pointerEvents: 'none' }}>
        <InteractiveGrid />
      </div>

      <div style={styles.contentWrapper}>
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.header}
        >
          <div style={styles.headerBadge}>DESIGN SHOWCASE & CREATIVE SYSTEMS</div>
          <h1 style={styles.title}>Visual & Brand Engineering</h1>
          <p style={styles.subtitle}>
            A structured showcase of visual strategy, logo design research, mascot motion design, brand books, and digital art.
          </p>

          {/* Sub-Tab Navigation Bar */}
          <div style={styles.tabsContainer} className="design-tabs-bar">
            {[
              { id: 'logo-study', label: 'Logo & Brand Process', icon: <Palette size={16} /> },
              { id: 'motion-gifs', label: 'Motion & Mascot GIFs', icon: <Sparkles size={16} /> },
              { id: 'graphic-pdf', label: 'Graphic Design Book', icon: <FileText size={16} /> },
              { id: 'ui-ux', label: 'UI/UX Case Studies', icon: <Layout size={16} /> },
              { id: 'art-gallery', label: 'Sketches & Artwork', icon: <ImageIcon size={16} /> },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="design-tab-btn"
                  style={{
                    ...styles.tabButton,
                    backgroundColor: isActive ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isActive ? '#60A5FA' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#60A5FA' : '#9CA3AF',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          {/* TAB 1: LOGO & BRAND PROCESS */}
          {activeTab === 'logo-study' && (
            <motion.div
              key="logo-study"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={styles.tabContent}
            >
              {/* Feature Header Card */}
              <div style={styles.featureCard}>
                <div style={styles.featureHeader}>
                  <div>
                    <span style={styles.tagBadge}>FEATURED CASE STUDY</span>
                    <h2 style={styles.cardMainTitle}>EcoIndex — Logo & Brand Identity Research</h2>
                    <p style={styles.cardSubText}>
                      Deconstructing the brand geometry, carbon meter symbolism, leaf eco-structure, and color harmony.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsStudyZoomed(true)}
                    className="pdf-action-btn"
                    style={styles.actionBtnPrimary}
                  >
                    <ZoomIn size={16} />
                    Inspect High-Res Study
                  </button>
                </div>

                {/* Main Process Image Container */}
                <div 
                  style={styles.studyImageContainer}
                  onClick={() => setIsStudyZoomed(true)}
                >
                  <img 
                    src="/assets/Design_Study_Ecoindex.png" 
                    alt="EcoIndex Logo Design Study Process" 
                    style={styles.studyImg} 
                  />
                  <div style={styles.imageOverlayHint}>
                    <ZoomIn size={24} color="#FFF" />
                    <span>Click to Expand High-Resolution Process Map</span>
                  </div>
                </div>

                {/* Process Pillars Grid */}
                <div style={styles.pillarsGrid} className="design-grid-2">
                  <div style={styles.pillarBox}>
                    <div style={styles.pillarIconRow}>
                      <Compass size={20} color="#60A5FA" />
                      <h4 style={styles.pillarTitle}>01. Research & Concept Synthesis</h4>
                    </div>
                    <p style={styles.pillarDesc}>
                      Explored sustainable symbols blending nature (leaf structure), measurement (index meter gauge), and circular continuity to represent zero-emissions trajectory.
                    </p>
                  </div>

                  <div style={styles.pillarBox}>
                    <div style={styles.pillarIconRow}>
                      <Layers size={20} color="#4ADE80" />
                      <h4 style={styles.pillarTitle}>02. Geometric Precision & Grid</h4>
                    </div>
                    <p style={styles.pillarDesc}>
                      Crafted on a strict circular & isometric grid to maintain readability across micro mobile icons, web headers, and large format physical displays.
                    </p>
                  </div>

                  <div style={styles.pillarBox}>
                    <div style={styles.pillarIconRow}>
                      <Palette size={20} color="#F59E0B" />
                      <h4 style={styles.pillarTitle}>03. Color Psychology & Harmony</h4>
                    </div>
                    <p style={styles.pillarDesc}>
                      Balanced vibrant eco-green (#4ADE80) representing growth with deep slate carbon background (#0D1117) to communicate modern enterprise reliability.
                    </p>
                  </div>

                  <div style={styles.pillarBox}>
                    <div style={styles.pillarIconRow}>
                      <Sparkles size={20} color="#EC4899" />
                      <h4 style={styles.pillarTitle}>04. Mascot & Brand Voice</h4>
                    </div>
                    <p style={styles.pillarDesc}>
                      Integrated an expressive eco-mascot character into the UI system to humanize data tracking, celebrate sustainable milestones, and guide user behavior.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MOTION & MASCOT GIFS */}
          {activeTab === 'motion-gifs' && (
            <motion.div
              key="motion-gifs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={styles.tabContent}
            >
              <div style={styles.gifHeaderRow}>
                <div>
                  <h3 style={styles.sectionHeaderTitle}>EcoIndex Mascot Motion Suite</h3>
                  <p style={styles.sectionHeaderSub}>
                    Custom animated character GIFs crafted for behavioral UX micro-interactions, gamification, and state feedback.
                  </p>
                </div>

                {/* Filter Pills */}
                <div style={styles.filterPills}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setGifCategory(cat)}
                      style={{
                        ...styles.filterPill,
                        backgroundColor: gifCategory === cat ? '#60A5FA' : 'rgba(255, 255, 255, 0.04)',
                        color: gifCategory === cat ? '#000000' : '#8A8D91',
                        fontWeight: gifCategory === cat ? '700' : '500',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* GIF Cards Grid */}
              <div style={styles.gifGrid} className="design-grid-3">
                {filteredGifs.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    style={styles.gifCard}
                    className="design-card-hover"
                    onClick={() => setSelectedGif(item)}
                  >
                    <div style={styles.gifCardPreview}>
                      <img 
                        src={`/assets/Gif/${item.filename}`} 
                        alt={item.title} 
                        style={styles.gifImg}
                        loading="lazy" 
                      />
                      <div style={styles.gifLoopBadge}>
                        <Play size={10} color="#60A5FA" fill="#60A5FA" />
                        <span>LOOPING ANIMATION</span>
                      </div>
                    </div>

                    <div style={styles.gifCardBody}>
                      <div style={styles.gifCategoryTag}>{item.category}</div>
                      <h4 style={styles.gifTitle}>{item.title}</h4>
                      <p style={styles.gifDesc}>{item.description}</p>
                      
                      <div style={styles.tagRow}>
                        {item.tags.map(t => (
                          <span key={t} style={styles.miniTag}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: GRAPHIC DESIGN BOOK PDF */}
          {activeTab === 'graphic-pdf' && (
            <motion.div
              key="graphic-pdf"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={styles.tabContent}
            >
              <div style={styles.pdfContainerCard}>
                <div style={styles.pdfHeader}>
                  <div style={styles.pdfInfo}>
                    <FileText size={22} color="#60A5FA" />
                    <div>
                      <h3 style={styles.pdfTitle}>Graphic Design & Brand Book</h3>
                      <p style={styles.pdfSubtitle}>
                        Portfolio PDF showcase containing logo marks, posters, brand systems, and typography studies.
                      </p>
                    </div>
                  </div>

                  <div style={styles.pdfActions}>
                    <button 
                      onClick={() => setIsPdfFullscreen(true)}
                      className="pdf-action-btn"
                      style={styles.actionBtnSecondary}
                    >
                      <Maximize2 size={15} />
                      Fullscreen View
                    </button>

                    <a 
                      href="/assets/Portfolio_removed.pdf" 
                      download="Chitrankar_Design_Portfolio.pdf"
                      className="pdf-action-btn"
                      style={styles.actionBtnPrimary}
                    >
                      <Download size={15} />
                      Download PDF
                    </a>
                  </div>
                </div>

                {/* Embedded PDF Viewer */}
                <div style={styles.pdfViewerWrapper}>
                  <iframe 
                    src="/assets/Portfolio_removed.pdf#toolbar=1" 
                    title="Graphic Design Portfolio Book"
                    style={styles.pdfIframe}
                    className="pdf-frame-height"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: UI/UX CASE STUDIES */}
          {activeTab === 'ui-ux' && (
            <motion.div
              key="ui-ux"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={styles.tabContent}
            >
              <div style={styles.uiUxGrid} className="design-grid-2">
                {/* EcoIndex Case Study Card */}
                <div style={styles.uiUxCard} className="design-card-hover">
                  <div style={styles.uiUxBanner}>
                    <img src="/assets/app/Page30.png" alt="EcoIndex UI" style={styles.uiUxImg} />
                    <span style={styles.uiUxTag}>SUSTAINABILITY • PRODUCT UX</span>
                  </div>
                  <div style={styles.uiUxBody}>
                    <h3 style={styles.uiUxTitle}>EcoIndex — Carbon Analytics & Behavioral UX</h3>
                    <p style={styles.uiUxDesc}>
                      0→1 carbon accounting platform adopted by 250+ enterprise clients (incl. ITC & Radisson Hotels), measuring 1.8M+ kg CO₂e across 42+ events with 65% retention.
                    </p>
                    <div style={styles.uiUxFooter}>
                      <button 
                        onClick={() => navigate('/ecoindex')}
                        className="pdf-action-btn"
                        style={styles.actionBtnPrimary}
                      >
                        Read Full UX Case Study
                        <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* IntelliQ Case Study Card */}
                <div style={styles.uiUxCard} className="design-card-hover">
                  <div style={styles.uiUxBanner}>
                    <img src="/assets/IntelliQ/HomeScreen.png" alt="IntelliQ UI" style={styles.uiUxImg} />
                    <span style={{ ...styles.uiUxTag, color: '#FF3366', borderColor: '#FF336644' }}>ENTERPRISE SAAS • SYSTEMS</span>
                  </div>
                  <div style={styles.uiUxBody}>
                    <h3 style={styles.uiUxTitle}>IntelliQ — Enterprise Data & Workflow Systems</h3>
                    <p style={styles.uiUxDesc}>
                      0→1 enterprise data analytics & configurable workflow platform supporting 200+ users, 1.5k+ Smart Sheets, and 100+ dashboards across 4 orgs with 95%+ adoption.
                    </p>
                    <div style={styles.uiUxFooter}>
                      <button 
                        onClick={() => navigate('/intelliq')}
                        className="pdf-action-btn"
                        style={styles.actionBtnPrimary}
                      >
                        Read Full SaaS Case Study
                        <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SKETCHES & ARTWORK */}
          {activeTab === 'art-gallery' && (
            <motion.div
              key="art-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={styles.tabContent}
            >
              <div style={styles.artIntroCard}>
                <div style={styles.artIntroContent}>
                  <span style={styles.tagBadge}>HAND-DRAWN & DIGITAL ART</span>
                  <h2 style={styles.cardMainTitle}>Traditional Sketches & Digital Canvas Gallery</h2>
                  <p style={styles.cardSubText}>
                    A gallery of 30+ physical hand-sketches, portraiture, line art, and digital illustrations. Explore artwork in a dynamic 3D looping wall.
                  </p>

                  <div style={styles.artThumbPreviewGrid}>
                    {['Aujla.webp', 'Billie.webp', 'Colors.jpg', 'Glow2.jpg'].map((img, i) => (
                      <div key={i} style={styles.artThumbBox}>
                        <img src={`/assets/Art/${img}`} alt="Art preview" style={styles.artThumbImg} />
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={onViewArtGallery}
                    className="pdf-action-btn"
                    style={{ ...styles.actionBtnPrimary, padding: '16px 32px', fontSize: '1rem' }}
                  >
                    <Eye size={18} />
                    Open Fullscreen 3D Art Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL 1: HIGH-RES LOGO CASE STUDY LIGHTBOX */}
      <AnimatePresence>
        {isStudyZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setIsStudyZoomed(false)}
          >
            <button style={styles.modalCloseBtn} onClick={() => setIsStudyZoomed(false)}>
              <X size={28} color="#FFF" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContentImage}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src="/assets/Design_Study_Ecoindex.png" 
                alt="High-Res EcoIndex Study" 
                style={styles.modalImgFull} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: GIF DETAIL LIGHTBOX */}
      <AnimatePresence>
        {selectedGif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setSelectedGif(null)}
          >
            <button style={styles.modalCloseBtn} onClick={() => setSelectedGif(null)}>
              <X size={28} color="#FFF" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContentGif}
              onClick={e => e.stopPropagation()}
            >
              <div style={styles.modalGifMedia}>
                <img 
                  src={`/assets/Gif/${selectedGif.filename}`} 
                  alt={selectedGif.title} 
                  style={styles.modalGifImg} 
                />
              </div>

              <div style={styles.modalGifDetails}>
                <span style={styles.gifCategoryTag}>{selectedGif.category}</span>
                <h3 style={styles.modalGifTitle}>{selectedGif.title}</h3>
                <p style={styles.modalGifDesc}>{selectedGif.description}</p>
                <div style={styles.tagRow}>
                  {selectedGif.tags.map(t => (
                    <span key={t} style={styles.miniTag}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: FULLSCREEN PDF VIEWER */}
      <AnimatePresence>
        {isPdfFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setIsPdfFullscreen(false)}
          >
            <button style={styles.modalCloseBtn} onClick={() => setIsPdfFullscreen(false)}>
              <X size={28} color="#FFF" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={styles.modalContentPdf}
              onClick={e => e.stopPropagation()}
            >
              <iframe 
                src="/assets/Portfolio_removed.pdf#toolbar=1" 
                title="Fullscreen Design Portfolio PDF"
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 5% 60px 5%',
    backgroundColor: '#0D1117',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerBadge: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#60A5FA',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
    fontWeight: '900',
    color: '#F9FAFB',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#9CA3AF',
    fontFamily: "'Inter', sans-serif",
    maxWidth: '700px',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '30px',
    border: '1px solid rgba(255,255,255,0.08)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tabContent: {
    width: '100%',
  },

  // Feature Card / Logo Case Study
  featureCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '35px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  featureHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '20px',
  },
  tagBadge: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.15em',
    color: '#4ADE80',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    border: '1px solid rgba(74, 222, 128, 0.2)',
    padding: '4px 10px',
    borderRadius: '6px',
    display: 'inline-block',
    marginBottom: '10px',
  },
  cardMainTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#F9FAFB',
    fontFamily: "'Outfit', sans-serif",
    margin: '0 0 6px 0',
  },
  cardSubText: {
    color: '#9CA3AF',
    fontSize: '0.95rem',
    margin: 0,
  },
  studyImageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'zoom-in',
    backgroundColor: '#04070B',
  },
  studyImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  imageOverlayHint: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '30px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#FFF',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  pillarBox: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '20px',
  },
  pillarIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  pillarTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#F3F4F6',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  pillarDesc: {
    fontSize: '0.85rem',
    color: '#9CA3AF',
    margin: 0,
    lineHeight: '1.5',
  },

  // GIF Gallery Tab
  gifHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '25px',
  },
  sectionHeaderTitle: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#F9FAFB',
    fontFamily: "'Outfit', sans-serif",
    margin: '0 0 6px 0',
  },
  sectionHeaderSub: {
    fontSize: '0.9rem',
    color: '#9CA3AF',
    margin: 0,
  },
  filterPills: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterPill: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  gifGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  gifCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '18px',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  gifCardPreview: {
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundColor: '#04070B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
  },
  gifImg: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  gifLoopBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '3px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.6rem',
    fontWeight: '700',
    color: '#60A5FA',
    letterSpacing: '0.05em',
  },
  gifCardBody: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  gifCategoryTag: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#60A5FA',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  gifTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#F9FAFB',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  gifDesc: {
    fontSize: '0.8rem',
    color: '#9CA3AF',
    margin: 0,
    lineHeight: '1.4',
    flex: 1,
  },
  tagRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginTop: '6px',
  },
  miniTag: {
    fontSize: '0.65rem',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#D1D5DB',
  },

  // PDF Tab
  pdfContainerCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  pdfHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  pdfInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  pdfTitle: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#F9FAFB',
    margin: '0 0 4px 0',
    fontFamily: "'Outfit', sans-serif",
  },
  pdfSubtitle: {
    fontSize: '0.85rem',
    color: '#9CA3AF',
    margin: 0,
  },
  pdfActions: {
    display: 'flex',
    gap: '10px',
  },
  actionBtnPrimary: {
    padding: '10px 18px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#FFF',
    fontWeight: '700',
    fontSize: '0.8rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  actionBtnSecondary: {
    padding: '10px 18px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: '0.8rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  },
  pdfViewerWrapper: {
    width: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: '#04070B',
  },
  pdfIframe: {
    width: '100%',
    height: '700px',
    border: 'none',
    display: 'block',
  },

  // UI/UX Tab
  uiUxGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  },
  uiUxCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  uiUxBanner: {
    position: 'relative',
    width: '100%',
    height: '240px',
    backgroundColor: '#04070B',
    overflow: 'hidden',
  },
  uiUxImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  uiUxTag: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    border: '1px solid rgba(74, 222, 128, 0.4)',
    color: '#4ADE80',
    fontSize: '0.65rem',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '6px',
    letterSpacing: '0.05em',
  },
  uiUxBody: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
  },
  uiUxTitle: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#F9FAFB',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  uiUxDesc: {
    fontSize: '0.85rem',
    color: '#9CA3AF',
    margin: 0,
    lineHeight: '1.5',
    flex: 1,
  },
  uiUxFooter: {
    marginTop: '10px',
  },

  // Art Gallery Tab Intro
  artIntroCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  artIntroContent: {
    maxWidth: '650px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  artThumbPreviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    width: '100%',
    margin: '10px 0',
  },
  artThumbBox: {
    height: '110px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  artThumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Modals
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(15px)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    padding: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 3100,
  },
  modalContentImage: {
    maxWidth: '92vw',
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: '16px',
  },
  modalImgFull: {
    maxWidth: '100%',
    maxHeight: '85vh',
    objectFit: 'contain',
    borderRadius: '12px',
  },
  modalContentGif: {
    backgroundColor: '#0D1117',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '25px',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  modalGifMedia: {
    width: '100%',
    height: '240px',
    backgroundColor: '#04070B',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
  },
  modalGifImg: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  modalGifDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalGifTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#FFF',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  modalGifDesc: {
    fontSize: '0.9rem',
    color: '#9CA3AF',
    margin: 0,
    lineHeight: '1.5',
  },
  modalContentPdf: {
    width: '90vw',
    height: '90vh',
    backgroundColor: '#04070B',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.15)',
  }
};

export default Design;
