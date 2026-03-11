import { useState, useEffect, useCallback, useRef } from 'react';
import { PAGES } from '../constants/navigation';

export const useScrollNavigation = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const THROTTLE_MS = 900;

  const navigate = useCallback((delta) => {
    const now = Date.now();
    if (now - lastScrollTime.current < THROTTLE_MS) return;
    lastScrollTime.current = now;

    const currentPage = PAGES[activePageIndex];
    const hasSections = currentPage.sections.length > 0;

    if (delta > 0) {
      if (hasSections && activeSectionIndex < currentPage.sections.length - 1) {
        setActiveSectionIndex(prev => prev + 1);
      } else if (activePageIndex < PAGES.length - 1) {
        setActivePageIndex(prev => prev + 1);
        setActiveSectionIndex(0);
      }
    } else {
      if (hasSections && activeSectionIndex > 0) {
        setActiveSectionIndex(prev => prev - 1);
      } else if (activePageIndex > 0) {
        const prevPage = PAGES[activePageIndex - 1];
        setActivePageIndex(prev => prev - 1);
        setActiveSectionIndex(prevPage.sections.length > 0 ? prevPage.sections.length - 1 : 0);
      }
    }
  }, [activePageIndex, activeSectionIndex]);

  useEffect(() => {
    const onWheel = (e) => {
      // If scroll is locked on the body (e.g. modal is open), don't prevent default
      if (document.body.style.overflow === 'hidden') return;
      
      // On mobile, allow natural scrolling
      if (window.innerWidth < 768) return;

      e.preventDefault();
      navigate(e.deltaY);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [navigate]);

  const touchStartY = useRef(0);
  useEffect(() => {
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      // If scroll is locked on the body (e.g. modal is open), don't prevent default
      if (document.body.style.overflow === 'hidden') return;
      
      // On mobile, allow natural scrolling
      if (window.innerWidth < 768) return;

      e.preventDefault();
    };
    const onTouchEnd = (e) => {
      // If scroll is locked, let the browser handle it
      if (document.body.style.overflow === 'hidden') return;

      // On mobile, allow natural scrolling
      if (window.innerWidth < 768) return;

      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) navigate(delta);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigate]);

  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < PAGES.length) {
      setActivePageIndex(pageIndex);
      setActiveSectionIndex(0);
    }
  };

  const goToSection = (sectionIndex) => {
    const currentPage = PAGES[activePageIndex];
    if (sectionIndex >= 0 && sectionIndex < currentPage.sections.length) {
      setActiveSectionIndex(sectionIndex);
    }
  };

  return {
    activePageIndex,
    activeSectionIndex,
    goToPage,
    goToSection,
    currentPage: PAGES[activePageIndex],
    currentSection: PAGES[activePageIndex].sections[activeSectionIndex] || null
  };
};
