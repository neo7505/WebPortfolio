import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NoiseOverlay, InteractiveGrid, FloatingAssets } from './Home';
import { 
  FolderGit2, 
  Palette, 
  Sparkles, 
  FileText, 
  Image as ImageIcon,
  ExternalLink, 
  ArrowRight, 
  ZoomIn, 
  Maximize2, 
  Download, 
  Play, 
  X, 
  Compass, 
  Layers,
  ChevronRight,
  ChevronLeft,
  Eye,
  RefreshCw
} from 'lucide-react';

const FigmaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 38 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const MockupCollage = ({ images, type = 'phone', themeColor, isHovered }) => {
  if (type === 'phone') {
    return (
      <div style={mockupStyles.collageContainer}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: isHovered
                ? (index === 0 ? -16 : index === 1 ? 16 : 0)
                : (index === 0 ? -5 : index === 1 ? 5 : 0),
              x: isHovered
                ? (index === 0 ? -55 : index === 1 ? 55 : 0)
                : (index === 0 ? -12 : index === 1 ? 12 : 0),
              y: isHovered
                ? (index === 2 ? -10 : 15)
                : (index === 2 ? 0 : 8),
              zIndex: index === 2 ? 3 : index === 1 ? 2 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 130,
              damping: 18
            }}
            style={{
              ...mockupStyles.phoneFrame,
              position: index === 0 ? 'relative' : 'absolute',
              borderColor: isHovered ? themeColor : 'rgba(0,0,0,0.12)',
              boxShadow: isHovered
                ? `0 20px 40px rgba(0,0,0,0.15), 0 0 20px ${themeColor}25`
                : '0 10px 25px rgba(0,0,0,0.08)',
            }}
          >
            <div style={mockupStyles.phoneScreen}>
              <img src={img} alt="Mobile App Screen" style={mockupStyles.phoneImg} />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div style={mockupStyles.collageContainerDesktop}>
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        style={{
          ...mockupStyles.desktopFrame,
          borderColor: isHovered ? themeColor : 'rgba(0,0,0,0.12)',
          boxShadow: isHovered
            ? `0 20px 45px rgba(0,0,0,0.15)`
            : '0 10px 25px rgba(0,0,0,0.06)',
        }}
      >
        <div style={mockupStyles.desktopHeader}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: '600' }}>app.intelliq.internal</span>
        </div>
        <div style={mockupStyles.desktopScreen}>
          <img src={images[0]} alt="Desktop System Interface" style={mockupStyles.desktopImg} />
        </div>
      </motion.div>
    </div>
  );
};

const mockupStyles = {
  collageContainer: {
    position: 'relative',
    height: '220px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  phoneFrame: {
    width: '115px',
    height: '215px',
    borderRadius: '18px',
    backgroundColor: '#FFFFFF',
    border: '2px solid rgba(0,0,0,0.12)',
    padding: '4px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  phoneImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  collageContainerDesktop: {
    position: 'relative',
    width: '100%',
    padding: '6px 0',
  },
  desktopFrame: {
    width: '100%',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0,0,0,0.12)',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  desktopHeader: {
    padding: '8px 14px',
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desktopScreen: {
    width: '100%',
    height: '190px',
    overflow: 'hidden',
  },
  desktopImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
};

const REAL_GIF_GALLERY = [
  {
    id: 'hi-mascot',
    title: 'Wave & Welcome Mascot',
    category: 'Onboarding & Flow',
    filename: 'Hi_.gif',
    description: 'Friendly eco-mascot welcoming users into the platform.',
    tags: ['Welcome', 'Onboarding', 'Looping']
  },
  {
    id: 'walkin-hi',
    title: 'Walking & Waving Mascot',
    category: 'Onboarding & Flow',
    filename: 'Walkin say hi.gif',
    description: 'Animated walk cycle welcoming new user sessions.',
    tags: ['Walk Cycle', 'Character UX']
  },
  {
    id: 'heavy-cup',
    title: 'Coffee Commute Mascot',
    category: 'Micro-interactions',
    filename: 'Mascot_Walking_With_Heavy_Cup_Redone.gif',
    description: 'Expressive morning commute carbon tracking animation.',
    tags: ['Micro-UX', 'Daily Routine']
  },
  {
    id: 'typing-1',
    title: 'Productivity Desk Mascot 1',
    category: 'Micro-interactions',
    filename: 'Typing_Working_1.gif',
    description: 'Data entry and task completion feedback mascot.',
    tags: ['Productivity', 'Task State']
  },
  {
    id: 'typing-2',
    title: 'Productivity Desk Mascot 2',
    category: 'Micro-interactions',
    filename: 'Typing_Working_2.gif',
    description: 'Deep focus work session indicator animation.',
    tags: ['Focus Mode', 'UI Feedback']
  },
  {
    id: 'thinking-cloud',
    title: 'Brainstorming & Thinking Cloud',
    category: 'Status & Indicators',
    filename: 'Thinking cloud.gif',
    description: 'AI recommendation loading state mascot.',
    tags: ['Loading State', 'Thinking']
  },
  {
    id: 'thumbs-up',
    title: 'Milestone Celebration Mascot',
    category: 'Micro-interactions',
    filename: 'Thumb_up_.gif',
    description: 'Gamification reward unlock & success confirmation.',
    tags: ['Reward UI', 'Success State']
  },
  {
    id: 'calc-pullout',
    title: 'Carbon Calculator Mascot',
    category: 'Status & Indicators',
    filename: 'Calculator_Pullout_.gif',
    description: 'Real-time carbon footprint calculation visualizer.',
    tags: ['Carbon Math', 'Analytics']
  },
  {
    id: 'coin-flip',
    title: 'Eco Savings Coin Flip',
    category: 'Micro-interactions',
    filename: 'Coin flip.gif',
    description: 'Financial & carbon credits milestone animation.',
    tags: ['Savings', 'Credits']
  },
  {
    id: 'current-tv',
    title: 'Live Energy TV Dashboard',
    category: 'Status & Indicators',
    filename: 'Current_Tv.gif',
    description: 'Live power consumption stream mascot.',
    tags: ['Live Stream', 'Energy Viz']
  },
  {
    id: 'tv-screen',
    title: 'Monitor Analytics Mascot',
    category: 'Status & Indicators',
    filename: 'Tv_Screen_.gif',
    description: 'System health dashboard indicator character.',
    tags: ['Dashboard', 'Status']
  },
  {
    id: 'home-impact',
    title: 'Home Energy Impact Tracker',
    category: 'Onboarding & Flow',
    filename: 'Home_Impact.gif',
    description: 'Residential emissions tracking mascot.',
    tags: ['Home Power', 'Impact']
  },
  {
    id: 'onboarding-not-emp',
    title: 'Individual Onboarding Flow',
    category: 'Onboarding & Flow',
    filename: 'Onboarding_Not_Employed.gif',
    description: 'Customized flow setup character illustration.',
    tags: ['Onboarding', 'User Flow']
  },
  {
    id: 'on-emp',
    title: 'Enterprise Workspace Setup',
    category: 'Onboarding & Flow',
    filename: 'On_Employee.gif',
    description: 'Team workspace setup guidance mascot.',
    tags: ['Enterprise', 'B2B Flow']
  },
  {
    id: 'plane-flight',
    title: 'Flight Emission Tracker',
    category: 'Micro-interactions',
    filename: 'Plane.gif',
    description: 'Transportation emissions calculator mascot.',
    tags: ['Travel', 'Flights']
  },
  {
    id: 'pointing-emission',
    title: 'Emissions Gauge Indicator',
    category: 'Status & Indicators',
    filename: 'Pointing_Toward_Emission.gif',
    description: 'Interactive callout mascot highlighting high usage.',
    tags: ['Callout', 'Alert UI']
  },
  {
    id: 'progress-walk',
    title: 'Progress Bar Walking Mascot',
    category: 'Status & Indicators',
    filename: 'Progress bar walk.gif',
    description: 'Step completion progress loader character.',
    tags: ['Progress Bar', 'Loader']
  },
  {
    id: 'blackboard',
    title: 'Eco Education Mascot',
    category: 'Onboarding & Flow',
    filename: 'Student_Black_Board.gif',
    description: 'Interactive sustainability tips & tutorial character.',
    tags: ['Education', 'Tips']
  },
  {
    id: 'workplace-pointing',
    title: 'Workplace Presentation Mascot',
    category: 'Onboarding & Flow',
    filename: 'Workplace_Pointing_Screen.gif',
    description: 'Analytics summary presentation mascot.',
    tags: ['Presentation', 'Reporting']
  },
  {
    id: 'still-mascot',
    title: 'Idle Neutral Mascot',
    category: 'Micro-interactions',
    filename: 'Still.gif',
    description: 'Default idle state character mascot.',
    tags: ['Idle State', 'Character']
  }
];

const GIF_CATEGORIES = ['All', 'Onboarding & Flow', 'Micro-interactions', 'Status & Indicators'];

const ARTWORK_IMAGES = [
  'Aujla.webp', 'Billie.webp', 'Charch.webp', 'Colors.jpg', 'Eye.jpg',
  'GLow.jpg', 'Glow2.jpg', 'Hang.jpg', 'Joker.jpg', 'kirti.jpg',
  'Kiss1.webp', 'Kiss2.webp', 'Kiss3.webp', 'Kiss4.webp', 'Kiss5.webp',
  'Kiss6.webp', 'Kiss7.webp', 'Korea.webp', 'Krishna.jpg', 'Krishna.webp',
  'Krishna2.webp', 'Krishna3.webp', 'Messi.webp', 'pider.jpg', 'Siddhu.jpg',
  'Skull.jpg', 'Stan.webp', 'Stencil.jpg', 'Stencil2.jpg', 'Trimurti.webp',
  'Virat.webp', 'Witch.jpg', 'Yin.webp', 'Zayn.jpg'
];

const DynamicSketchGallery = ({ onSelectSketch, onViewArtGallery }) => {
  const [gridImages, setGridImages] = useState(ARTWORK_IMAGES);
  const [spotlightIndices, setSpotlightIndices] = useState([0, 4, 11, 17, 24, 30]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Shift spotlights to 5 new random tile indices
      setSpotlightIndices([
        Math.floor(Math.random() * 34),
        Math.floor(Math.random() * 34),
        Math.floor(Math.random() * 34),
        Math.floor(Math.random() * 34),
        Math.floor(Math.random() * 34),
      ]);

      // 2. Constantly change / swap 3 random tiles with different artwork images
      setGridImages(prev => {
        const next = [...prev];
        for (let i = 0; i < 3; i++) {
          const targetIndex = Math.floor(Math.random() * next.length);
          const randomImage = ARTWORK_IMAGES[Math.floor(Math.random() * ARTWORK_IMAGES.length)];
          next[targetIndex] = randomImage;
        }
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
      <div style={styles.sketchHeaderRow}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={styles.livePulseDot} />
            <h3 style={styles.sectionHeaderTitle}>Constantly Changing Sketch Mosaic ({ARTWORK_IMAGES.length})</h3>
          </div>
          <p style={styles.sectionHeaderSub}>
            Live constantly-morphing wall of physical sketches, line art, and portraits continuously morphing in real-time.
          </p>
        </div>

        <button 
          onClick={onViewArtGallery}
          className="clean-btn-primary"
          style={styles.actionBtnPrimarySmall}
        >
          <Eye size={14} />
          <span>Launch 3D Art Gallery</span>
        </button>
      </div>

      {/* Zero Gap Mosaic Grid with Live Auto-Swapping Images */}
      <div className="sketch-gapless-mosaic">
        {gridImages.map((img, idx) => {
          const isSpotlight = spotlightIndices.includes(idx);
          return (
            <div
              key={`${idx}-${img}`}
              className={`sketch-tile ${isSpotlight ? 'tile-active-spotlight' : ''}`}
              onClick={() => onSelectSketch(img, idx)}
            >
              <img
                src={`/assets/Art/${img}`}
                alt={`Sketch artwork ${img}`}
                className="sketch-tile-img sketch-tile-morph-in"
                loading="lazy"
              />
              <div className="sketch-tile-overlay">
                <ZoomIn size={20} color="#FFFFFF" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProjectCardItem = ({ project, onViewCaseStudy, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.4 }}
      style={{
        ...styles.projectCard,
        borderTop: `4px solid ${project.themeColor}`
      }}
      className="clean-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardHeaderRow}>
        <div>
          <span style={{ 
            ...styles.projectTagBadge, 
            color: project.themeColor, 
            backgroundColor: `${project.themeColor}12`, 
            borderColor: `${project.themeColor}30` 
          }}>
            {project.category}
          </span>
          <h2 style={styles.projectTitle}>{project.title}</h2>
          <h4 style={styles.projectSubTitle}>{project.subTitle}</h4>
        </div>
      </div>

      {/* Visual Preview Box */}
      <div style={styles.cardVisualBox}>
        <MockupCollage
          images={project.images}
          type={project.useMockup ? 'phone' : 'desktop'}
          themeColor={project.themeColor}
          isHovered={isHovered}
        />
      </div>

      <p style={styles.projectDesc}>{project.description}</p>

      <div style={styles.tagRow}>
        {project.tags.map(t => (
          <span key={t} style={styles.miniTag}>{t}</span>
        ))}
      </div>

      <div style={styles.projectCardFooter}>
        {project.caseStudyPath && (
          <button
            onClick={onViewCaseStudy}
            className="clean-btn-primary"
            style={styles.actionBtnPrimary}
          >
            Read Case Study
            <ArrowRight size={14} style={{ marginLeft: '6px' }} />
          </button>
        )}

        {project.figmaUrl && (
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="clean-btn-figma"
            style={styles.actionBtnFigma}
          >
            <FigmaIcon />
            <span>Figma System</span>
            <ExternalLink size={12} style={{ marginLeft: '4px' }} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = ({ onViewArtGallery }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const tabsBarRef = useRef(null);
  const [activeTab, setActiveTab] = useState('projects-figma');
  const [gifCategory, setGifCategory] = useState('All');
  const [selectedGif, setSelectedGif] = useState(null);
  const [selectedSketchIndex, setSelectedSketchIndex] = useState(null);
  const [isStudyZoomed, setIsStudyZoomed] = useState(false);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    let style = document.getElementById('projects-light-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'projects-light-styles';
      document.head.appendChild(style);
    }
    style.innerHTML = `
      @keyframes tileMorphIn {
        0% { opacity: 0.3; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      .sketch-tile-morph-in {
        animation: tileMorphIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      .clean-tab-btn {
        transition: color 0.25s ease;
      }
      .clean-tab-btn:hover:not(.active-tab) {
        color: #111827 !important;
      }
      .clean-card-hover {
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .clean-card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.2) !important;
        border-color: rgba(0, 0, 0, 0.15) !important;
      }
      .clean-btn-primary {
        background: #111827;
        color: #FFFFFF;
        transition: all 0.25s ease;
      }
      .clean-btn-primary:hover {
        background: #000000 !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.18);
      }
      .clean-btn-figma {
        background: #FFFFFF;
        border: 1px solid rgba(162, 89, 255, 0.3);
        color: #7E22CE;
        transition: all 0.25s ease;
      }
      .clean-btn-figma:hover {
        background: rgba(162, 89, 255, 0.08) !important;
        border-color: #A259FF !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(162, 89, 255, 0.15);
      }
      .projects-container {
        height: 100vh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch;
      }
      .mobile-sticky-tabs {
        position: sticky;
        top: 55px;
        z-index: 100;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(253, 248, 241, 0.94);
        padding: 8px 4%;
        margin: 0 -4% 15px -4%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tabs-scroll-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .tabs-edge-shadow-right {
        display: none !important;
      }
      .projects-tabs-bar {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scroll-behavior: smooth;
        scrollbar-width: none;
        -ms-overflow-style: none;
        width: 100%;
      }
      .projects-tabs-bar::-webkit-scrollbar {
        display: none;
      }
      .mobile-scroll-hint-btn {
        display: none !important;
      }

      /* Gapless Sketch Gallery Grid */
      .sketch-gapless-mosaic {
        display: grid !important;
        grid-template-columns: repeat(6, 1fr) !important;
        gap: 3px !important;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        width: 100% !important;
      }
      .sketch-tile {
        position: relative !important;
        width: 100% !important;
        aspect-ratio: 1 / 1 !important;
        overflow: hidden !important;
        background: #F3F4F6;
        cursor: zoom-in;
        border-radius: 4px;
      }
      .sketch-tile-img {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
        transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
      }
      .sketch-tile:hover .sketch-tile-img {
        transform: scale(1.08);
        filter: brightness(0.88);
      }
      .sketch-tile-overlay {
        position: absolute !important;
        inset: 0 !important;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(2px);
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .sketch-tile:hover .sketch-tile-overlay {
        opacity: 1;
      }
      .tile-active-spotlight {
        box-shadow: inset 0 0 0 2px #2563EB, 0 0 14px rgba(37, 99, 235, 0.45);
        z-index: 5;
      }

      @media (max-width: 1200px) {
        .sketch-gapless-mosaic { grid-template-columns: repeat(5, 1fr) !important; }
      }
      @media (max-width: 900px) {
        .sketch-gapless-mosaic { grid-template-columns: repeat(4, 1fr) !important; }
      }
      @media (max-width: 768px) {
        .projects-container { padding: 75px 14px 30px 14px !important; height: auto !important; min-height: 100vh !important; overflow-y: visible !important; }
        .mobile-sticky-tabs { top: 50px !important; margin: 0 -14px 15px -14px !important; padding: 6px 14px !important; }
        .projects-tabs-bar { overflow-x: auto !important; width: 100% !important; justify-content: flex-start !important; padding-bottom: 4px !important; }
        .tab-btn-responsive { padding: 8px 15px !important; font-size: 0.78rem !important; }
        .projects-grid-2 { grid-template-columns: 1fr !important; }
        .projects-grid-3 { grid-template-columns: 1fr !important; }
        .pdf-frame-height { height: 450px !important; }
        .sketch-gapless-mosaic { grid-template-columns: repeat(3, 1fr) !important; }
        .tabs-edge-shadow-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 32px;
          background: linear-gradient(to left, rgba(253, 248, 241, 0.95), rgba(253, 248, 241, 0));
          pointer-events: none;
          z-index: 10;
          display: block !important;
        }
        .mobile-scroll-hint-btn {
          display: flex !important;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #2563EB;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          padding: 6px 11px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
        }
      }
      @media (max-width: 440px) {
        .sketch-gapless-mosaic { grid-template-columns: repeat(2, 1fr) !important; }
      }
    `;
  }, []);

  const projectsList = [
    {
      id: 'eco-index',
      title: 'EcoIndex',
      subTitle: 'Sustainability & Behavioral UX Platform',
      category: 'SUSTAINABILITY • PRODUCT UX',
      description: '0→1 carbon accounting platform adopted by 250+ enterprise clients (incl. ITC & Radisson Hotels), measuring 1.8M+ kg CO₂e across 42+ events with 65% retention.',
      images: [
        '/assets/app/Page30.png',
        '/assets/app/Page23.png',
        '/assets/app/Page22.png',
      ],
      useMockup: true,
      themeColor: '#10B981',
      caseStudyPath: '/ecoindex',
      figmaUrl: 'https://www.figma.com/design/SgjQWSYfLQ2U0IBfqyXvXG/EcoIndex-App?node-id=0-1&p=f',
      tags: ['0→1 Enterprise SaaS', 'Scope 1, 2, 3 Accounting', '65% Retention', '250+ Enterprise Clients', '1.8M+ kg CO₂e Tracked']
    },
    {
      id: 'intelliq',
      title: 'IntelliQ',
      subTitle: 'Enterprise SaaS & Operations System',
      category: 'ENTERPRISE SAAS • SYSTEMS',
      description: '0→1 enterprise data analytics & configurable workflow platform supporting 200+ users, 1.5k+ Smart Sheets, and 100+ dashboards across 4 orgs. Achieved 95%+ adoption and ~60% manual effort reduction.',
      images: [
        '/assets/IntelliQ/HomeScreen.png',
      ],
      useMockup: false,
      themeColor: '#E11D48',
      caseStudyPath: '/intelliq',
      figmaUrl: 'https://www.figma.com/design/z3PBXuvZ5UXjlrNlgcjBYi/IntelliQ?node-id=0-1&p=f',
      tags: ['0→1 Enterprise SaaS', '95%+ Adoption', '200+ Users & 1.5k+ Sheets', '40+ Releases (80+ APIs)', '~60% Effort Reduction']
    },
    {
      id: 'octodo-websites',
      title: 'OctoDo Websites',
      subTitle: 'Web Experience & Landing Page Systems',
      category: 'WEB DESIGN • VISUAL SYSTEMS',
      description: 'Custom marketing web architectures, sleek landing page systems, responsive typography grids, and interactive web component design.',
      images: [
        '/assets/app/Page23.png',
      ],
      useMockup: false,
      themeColor: '#2563EB',
      figmaUrl: 'https://www.figma.com/design/4u6acZxdDvE4ovS381UVT6/OctoDo-Websites?node-id=6-2884',
      tags: ['Web Architecture', 'Design System', 'Responsive UI', 'Figma Tokens']
    }
  ];

  const filteredGifs = gifCategory === 'All' 
    ? REAL_GIF_GALLERY 
    : REAL_GIF_GALLERY.filter(item => item.category === gifCategory);

  return (
    <div ref={containerRef} style={styles.container} className="projects-container">
      <NoiseOverlay />
      <FloatingAssets />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.12, pointerEvents: 'none' }}>
        <InteractiveGrid />
      </div>

      <div style={styles.contentWrapper}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.header}
        >
          <div style={styles.headerBadge}>PROJECTS & VISUAL SYSTEMS</div>
          <h1 style={styles.title}>Selected Works & Design Files</h1>
        </motion.div>

        {/* Sticky Mobile & Desktop Sub-Tabs Track */}
        <div className="mobile-sticky-tabs">
          <div className="tabs-scroll-wrapper">
            <div style={styles.dropletTrackContainer} className="projects-tabs-bar" ref={tabsBarRef}>
              {[
                { id: 'projects-figma', label: 'Projects & Figma Files', icon: <FolderGit2 size={15} /> },
                { id: 'logo-study', label: 'Logo & Brand Process', icon: <Palette size={15} /> },
                { id: 'motion-gifs', label: 'Mascot Motion GIFs', icon: <Sparkles size={15} /> },
                { id: 'graphic-pdf', label: 'Graphic Design Book', icon: <FileText size={15} /> },
                { id: 'sketches-art', label: 'Sketches & Art Gallery', icon: <ImageIcon size={15} /> },
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`clean-tab-btn tab-btn-responsive ${isActive ? 'active-tab' : ''}`}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '11px 22px',
                      borderRadius: '30px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: isActive ? '#FFFFFF' : '#6B7280',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? '700' : '500',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      outline: 'none',
                      flexShrink: 0,
                    }}
                  >
                    {/* Liquid Droplet Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="droplet-subtab-active-pill"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 26,
                          mass: 0.75
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: '#111827',
                          borderRadius: '30px',
                          boxShadow: '0 8px 24px rgba(17, 24, 39, 0.22), 0 2px 6px rgba(0, 0, 0, 0.08)',
                          zIndex: 0,
                        }}
                      />
                    )}

                    <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {tab.icon}
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="tabs-edge-shadow-right" />
          </div>

          <button 
            className="mobile-scroll-hint-btn"
            onClick={() => {
              if (tabsBarRef.current) {
                tabsBarRef.current.scrollBy({ left: 160, behavior: 'smooth' });
              }
            }}
            title="Scroll sub-tabs"
          >
            <span>Scroll</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* TAB CONTENTS WITH LIQUID CROSSFADE */}
        <AnimatePresence mode="wait">
          {/* TAB 1: PROJECTS & FIGMA DESIGN FILES */}
          {activeTab === 'projects-figma' && (
            <motion.div
              key="projects-figma"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
              style={styles.tabContent}
            >
              <div style={styles.projectsGrid} className="projects-grid-2">
                {projectsList.map((item, idx) => (
                  <ProjectCardItem
                    key={item.id}
                    project={item}
                    idx={idx}
                    onViewCaseStudy={() => navigate(item.caseStudyPath)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: MINIMAL LOGO & BRAND PROCESS */}
          {activeTab === 'logo-study' && (
            <motion.div
              key="logo-study"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
              style={styles.tabContent}
            >
              <div style={styles.featureCardMinimal}>
                <div style={styles.featureHeaderMinimal}>
                  <div>
                    <span style={styles.tagBadgeMinimal}>BRAND IDENTITY STUDY</span>
                    <h3 style={styles.cardMainTitleMinimal}>EcoIndex — Logo & Brand Geometry</h3>
                  </div>
                  <button 
                    onClick={() => setIsStudyZoomed(true)}
                    className="clean-btn-primary"
                    style={styles.actionBtnPrimarySmall}
                  >
                    <ZoomIn size={14} />
                    Inspect Process Map
                  </button>
                </div>

                <div 
                  style={styles.studyImageContainerMinimal}
                  onClick={() => setIsStudyZoomed(true)}
                >
                  <img 
                    src="/assets/Design_Study_Ecoindex.png" 
                    alt="EcoIndex Logo Design Process Map" 
                    style={styles.studyImgMinimal} 
                  />
                </div>

                <div style={styles.pillarsGridMinimal} className="projects-grid-2">
                  <div style={styles.pillarBoxMinimal}>
                    <div style={styles.pillarIconRow}>
                      <Compass size={16} color="#2563EB" />
                      <h5 style={styles.pillarTitleMinimal}>Concept & Symbol Synthesis</h5>
                    </div>
                    <p style={styles.pillarDescMinimal}>
                      Blending leaf nature geometry with measuring gauge iconography.
                    </p>
                  </div>

                  <div style={styles.pillarBoxMinimal}>
                    <div style={styles.pillarIconRow}>
                      <Layers size={16} color="#10B981" />
                      <h5 style={styles.pillarTitleMinimal}>Isometric Grid Precision</h5>
                    </div>
                    <p style={styles.pillarDescMinimal}>
                      Calculated ratio grids ensuring crisp legibility on micro icons.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MASCOT MOTION GIFS (20 REAL WORKING GIFS) */}
          {activeTab === 'motion-gifs' && (
            <motion.div
              key="motion-gifs"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
              style={styles.tabContent}
            >
              <div style={styles.gifHeaderRow}>
                <div>
                  <h3 style={styles.sectionHeaderTitle}>Mascot Motion Suite ({filteredGifs.length})</h3>
                  <p style={styles.sectionHeaderSub}>
                    Animated character GIFs designed for gamified UX states and micro-interactions.
                  </p>
                </div>

                <div style={styles.filterPills}>
                  {GIF_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setGifCategory(cat)}
                      style={{
                        ...styles.filterPill,
                        backgroundColor: gifCategory === cat ? '#111827' : '#FFFFFF',
                        color: gifCategory === cat ? '#FFFFFF' : '#4B5563',
                        borderColor: gifCategory === cat ? '#111827' : 'rgba(0,0,0,0.1)',
                        fontWeight: gifCategory === cat ? '700' : '500',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.gifGrid} className="projects-grid-3">
                {filteredGifs.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    style={styles.gifCard}
                    className="clean-card-hover"
                    onClick={() => setSelectedGif(item)}
                  >
                    <div style={styles.gifCardPreview}>
                      <img 
                        src={`/assets/Gif/${item.filename}`} 
                        alt={item.title} 
                        style={styles.gifImg}
                      />
                      <div style={styles.gifLoopBadge}>
                        <Play size={9} color="#2563EB" fill="#2563EB" />
                        <span>LOOPING</span>
                      </div>
                    </div>

                    <div style={styles.gifCardBody}>
                      <div style={styles.gifCategoryTag}>{item.category}</div>
                      <h4 style={styles.gifTitle}>{item.title}</h4>
                      <p style={styles.gifDesc}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: GRAPHIC DESIGN BOOK PDF */}
          {activeTab === 'graphic-pdf' && (
            <motion.div
              key="graphic-pdf"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
              style={styles.tabContent}
            >
              <div style={styles.pdfContainerCard}>
                <div style={styles.pdfHeader}>
                  <div style={styles.pdfInfo}>
                    <FileText size={22} color="#2563EB" />
                    <div>
                      <h3 style={styles.pdfTitle}>Graphic Design & Brand Book</h3>
                      <p style={styles.pdfSubtitle}>
                        Portfolio PDF containing logo marks, posters, brand systems, and print graphics.
                      </p>
                    </div>
                  </div>

                  <div style={styles.pdfActions}>
                    <button 
                      onClick={() => setIsPdfFullscreen(true)}
                      style={styles.actionBtnSecondaryLight}
                    >
                      <Maximize2 size={14} />
                      Fullscreen
                    </button>

                    <a 
                      href="/assets/Portfolio_removed.pdf" 
                      download="Chitrankar_Design_Portfolio.pdf"
                      className="clean-btn-primary"
                      style={styles.actionBtnPrimarySmall}
                    >
                      <Download size={14} />
                      Download PDF
                    </a>
                  </div>
                </div>

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

          {/* TAB 5: GAPLESS DYNAMIC SKETCHES & ART GALLERY */}
          {activeTab === 'sketches-art' && (
            <motion.div
              key="sketches-art"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
              style={styles.tabContent}
            >
              <DynamicSketchGallery 
                onSelectSketch={(img, idx) => setSelectedSketchIndex(idx)}
                onViewArtGallery={onViewArtGallery}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL 1: HIGH-RES LOGO LIGHTBOX */}
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
              <X size={24} color="#111827" />
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
              <X size={24} color="#111827" />
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
              <X size={24} color="#111827" />
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
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '16px' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 4: SKETCH LIGHTBOX WITH NAVIGATION */}
      <AnimatePresence>
        {selectedSketchIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setSelectedSketchIndex(null)}
          >
            <button style={styles.modalCloseBtn} onClick={() => setSelectedSketchIndex(null)}>
              <X size={24} color="#111827" />
            </button>

            <button
              style={{ ...styles.modalNavBtn, left: '20px' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSketchIndex((prev) => (prev > 0 ? prev - 1 : ARTWORK_IMAGES.length - 1));
              }}
              title="Previous sketch"
            >
              <ChevronLeft size={22} color="#111827" />
            </button>

            <button
              style={{ ...styles.modalNavBtn, right: '20px' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSketchIndex((prev) => (prev < ARTWORK_IMAGES.length - 1 ? prev + 1 : 0));
              }}
              title="Next sketch"
            >
              <ChevronRight size={22} color="#111827" />
            </button>

            <motion.div
              key={selectedSketchIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContentImage}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`/assets/Art/${ARTWORK_IMAGES[selectedSketchIndex]}`}
                alt={`Artwork ${ARTWORK_IMAGES[selectedSketchIndex]}`}
                style={styles.modalImgFull}
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
    padding: '85px 4% 50px 4%',
    backgroundColor: '#FDF8F1',
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
    gap: '24px',
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
    color: '#2563EB',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
    fontWeight: '900',
    color: '#111827',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: '10px',
    letterSpacing: '-0.02em',
  },
  dropletTrackContainer: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '35px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
  },
  tabContent: {
    width: '100%',
  },

  // Projects Grid & Clean Cards
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  projectCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
    padding: '26px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTagBadge: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.12em',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid',
    display: 'inline-block',
    marginBottom: '8px',
  },
  projectTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#111827',
    fontFamily: "'Outfit', sans-serif",
    margin: '0 0 4px 0',
  },
  projectSubTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#6B7280',
    margin: 0,
  },
  cardVisualBox: {
    width: '100%',
    borderRadius: '14px',
    backgroundColor: '#F8FAFC',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    padding: '10px',
    boxSizing: 'border-box',
  },
  projectDesc: {
    fontSize: '0.9rem',
    color: '#4B5563',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
  },
  projectCardFooter: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '6px',
  },
  actionBtnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  actionBtnPrimarySmall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  actionBtnFigma: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  tagRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  miniTag: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    border: '1px solid #E5E7EB',
    padding: '3px 8px',
    borderRadius: '6px',
  },

  // Minimal Logo Process Tab
  featureCardMinimal: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
  },
  featureHeaderMinimal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  tagBadgeMinimal: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.12em',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    border: '1px solid #A7F3D0',
    padding: '4px 10px',
    borderRadius: '6px',
    display: 'inline-block',
    marginBottom: '4px',
  },
  cardMainTitleMinimal: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#111827',
    fontFamily: "'Outfit', sans-serif",
    margin: 0,
  },
  studyImageContainerMinimal: {
    width: '100%',
    maxHeight: '340px',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    cursor: 'zoom-in',
    backgroundColor: '#F8FAFC',
  },
  studyImgMinimal: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  pillarsGridMinimal: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  pillarBoxMinimal: {
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '14px',
    padding: '16px',
  },
  pillarIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  pillarTitleMinimal: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  pillarDescMinimal: {
    fontSize: '0.82rem',
    color: '#6B7280',
    margin: 0,
    lineHeight: '1.5',
  },

  // GIF Gallery Tab
  gifHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '18px',
  },
  sectionHeaderTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#111827',
    fontFamily: "'Outfit', sans-serif",
    margin: '0 0 2px 0',
  },
  sectionHeaderSub: {
    fontSize: '0.85rem',
    color: '#6B7280',
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
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  gifGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '18px',
  },
  gifCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
  },
  gifCardPreview: {
    position: 'relative',
    width: '100%',
    height: '165px',
    backgroundColor: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px',
    borderBottom: '1px solid #F1F5F9',
  },
  gifImg: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  gifLoopBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '2px 7px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.6rem',
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: '0.05em',
  },
  gifCardBody: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  gifCategoryTag: {
    fontSize: '0.62rem',
    fontWeight: '700',
    color: '#2563EB',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  gifTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  gifDesc: {
    fontSize: '0.8rem',
    color: '#6B7280',
    margin: 0,
    lineHeight: '1.4',
    flex: 1,
  },

  // PDF Viewer Tab
  pdfContainerCard: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
  },
  pdfHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  pdfInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pdfTitle: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#111827',
    fontFamily: "'Outfit', sans-serif",
    margin: 0,
  },
  pdfSubtitle: {
    fontSize: '0.85rem',
    color: '#6B7280',
    margin: 0,
  },
  pdfActions: {
    display: 'flex',
    gap: '10px',
  },
  actionBtnSecondaryLight: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '25px',
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid #E5E7EB',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  pdfViewerWrapper: {
    width: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: '#FFFFFF',
  },
  pdfIframe: {
    width: '100%',
    height: '560px',
    border: 'none',
  },

  // Modal Lightbox Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(10px)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2010,
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  modalContentImage: {
    maxWidth: '92vw',
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
  modalImgFull: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  modalContentGif: {
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    maxWidth: '550px',
    width: '90%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
  },
  modalGifMedia: {
    backgroundColor: '#F8FAFC',
    padding: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '240px',
    borderBottom: '1px solid #E2E8F0',
  },
  modalGifImg: {
    maxHeight: '220px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  modalGifDetails: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalGifTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  modalGifDesc: {
    fontSize: '0.85rem',
    color: '#4B5563',
    margin: 0,
    lineHeight: '1.5',
  },
  sketchHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '4px',
  },
  livePulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    boxShadow: '0 0 10px #10B981',
    display: 'inline-block',
  },
  modalNavBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2010,
    boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
  },
  modalContentPdf: {
    width: '95vw',
    height: '92vh',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  }
};

export default Projects;
