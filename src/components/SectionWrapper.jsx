import React, { useState, useEffect, useRef } from 'react';

const SectionWrapper = ({ children, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before it enters the viewport
        threshold: 0.01
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id={id} 
      style={{ 
        minHeight: window.innerWidth < 768 ? '300px' : '100vh', 
        width: '100%',
        position: 'relative'
      }}
    >
      {isVisible ? children : (
        <div style={{ 
          height: window.innerWidth < 768 ? '300px' : '100vh', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'rgba(0,0,255,0.1)',
          fontSize: '0.8rem',
          letterSpacing: '2px'
        }}>
          PREPARING SECTION...
        </div>
      )}
    </div>
  );
};

export default SectionWrapper;
