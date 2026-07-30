import { useState, useEffect, useCallback, useRef } from 'react';
import { PAGES } from '../constants/navigation';

export const useScrollNavigation = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);
  const THROTTLE_MS = 800;
  const DELTA_THRESHOLD = 120; // Requires deliberate scroll momentum

  const navigate = useCallback((delta) => {
    const now = Date.now();
    if (now - lastScrollTime.current < THROTTLE_MS) return;
    
    // Accumulate scroll direction
    if ((delta > 0 && accumulatedDelta.current < 0) || (delta < 0 && accumulatedDelta.current > 0)) {
      accumulatedDelta.current = 0;
    }
    accumulatedDelta.current += delta;

    if (Math.abs(accumulatedDelta.current) < DELTA_THRESHOLD) return;

    lastScrollTime.current = now;
    const direction = accumulatedDelta.current > 0 ? 1 : -1;
    accumulatedDelta.current = 0;

    const currentPage = PAGES[activePageIndex];
    const hasSections = currentPage.sections.length > 0;

    if (direction > 0) {
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

  const edgeReachedTime = useRef(Date.now());

  useEffect(() => {
    const onWheel = (e) => {
      // If scroll is locked on the body (e.g. modal is open), don't intercept
      if (document.body.style.overflow === 'hidden') return;
      
      // On mobile, allow natural native scrolling
      if (window.innerWidth < 768) return;

      // Ignore micro-scroll jitter
      if (Math.abs(e.deltaY) < 5) return;

      // Check if target is inside an internally scrollable container (e.g. Projects container)
      let el = e.target;
      let insideScrollable = false;

      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const canScroll = (overflowY === 'auto' || overflowY === 'scroll');

        if (canScroll) {
          insideScrollable = true;
          const maxScroll = el.scrollHeight - el.clientHeight;
          
          if (maxScroll > 10) {
            const isAtTop = el.scrollTop <= 10;
            const isAtBottom = (maxScroll - el.scrollTop) <= 10;

            // If scrolling down and not at bottom, or scrolling up and not at top -> allow container scroll
            if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
              edgeReachedTime.current = Date.now();
              accumulatedDelta.current = 0;
              return;
            }

            // At edge: enforce 600ms momentum buffer before allowing page jump
            const timeAtEdge = Date.now() - edgeReachedTime.current;
            if (timeAtEdge < 600) {
              return;
            }
          }
        }
        el = el.parentElement;
      }

      // If inside a scrollable container that is currently at edge or short, prevent accidental jump unless intended
      if (insideScrollable && Math.abs(e.deltaY) < 30) {
        return;
      }

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
      if (document.body.style.overflow === 'hidden') return;
      if (window.innerWidth < 768) return;
    };
    const onTouchEnd = (e) => {
      if (document.body.style.overflow === 'hidden') return;
      if (window.innerWidth < 768) return;

      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 80) navigate(delta);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
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
      accumulatedDelta.current = 0;
    }
  };

  const goToSection = (sectionIndex) => {
    const currentPage = PAGES[activePageIndex];
    if (sectionIndex >= 0 && sectionIndex < currentPage.sections.length) {
      setActiveSectionIndex(sectionIndex);
      accumulatedDelta.current = 0;
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
