import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const CreativeCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    
    // Core position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    
    // Velocity tracking for dynamic stretching
    const xVelocity = useVelocity(mouseX);
    const yVelocity = useVelocity(mouseY);
    
    // Calculate overall speed for scaling/stretching
    const speed = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
        return Math.sqrt(vx * vx + vy * vy) / 1000;
    });

    const scaleX = useTransform(speed, [0, 2], [1, 1.5]);
    const scaleY = useTransform(speed, [0, 2], [1, 0.5]);
    const rotation = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
        return Math.atan2(vy, vx) * (180 / Math.PI);
    });

    // Layered Spring configs for different trail "depths"
    const springFast = { damping: 20, stiffness: 300 };
    const springMid = { damping: 15, stiffness: 150 };
    const springSlow = { damping: 10, stiffness: 80 };

    const trailX1 = useSpring(mouseX, springFast);
    const trailY1 = useSpring(mouseY, springFast);
    
    const trailX2 = useSpring(mouseX, springMid);
    const trailY2 = useSpring(mouseY, springMid);
    
    const trailX3 = useSpring(mouseX, springSlow);
    const trailY3 = useSpring(mouseY, springSlow);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            if (isClickable) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible || window.innerWidth < 768) return null;

    return (
        <div style={styles.cursorWrapper}>
            {/* Layer 3: Slowest "Vapor" / Ink Bleed */}
            <motion.div
                style={{
                    ...styles.trailLarge,
                    x: trailX3,
                    y: trailY3,
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.3 : 0.15,
                }}
            />

            {/* Layer 2: Mid Shadow */}
            <motion.div
                style={{
                    ...styles.trailMid,
                    x: trailX2,
                    y: trailY2,
                    scale: isHovering ? 1.8 : 1,
                    opacity: isHovering ? 0.4 : 0.25,
                }}
            />

            {/* Layer 1: Fast Spring Ring (Stretches with velocity) */}
            <motion.div
                style={{
                    ...styles.trailFast,
                    x: trailX1,
                    y: trailY1,
                    scaleX: isHovering ? 1.5 : scaleX,
                    scaleY: isHovering ? 1.5 : scaleY,
                    rotate: rotation,
                    opacity: isHovering ? 0.8 : 0.5,
                }}
            />
            
            {/* Core Dot */}
            <motion.div
                style={{
                    ...styles.dot,
                    x: mouseX,
                    y: mouseY,
                    scale: isHovering ? 0.4 : 1,
                }}
            />
            
            {/* Global SVG Filters for Gooey/Inky effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>
        </div>
    );
};

const styles = {
    cursorWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
    },
    dot: {
        position: 'absolute',
        width: '6px',
        height: '6px',
        backgroundColor: '#FFF',
        borderRadius: '50%',
        marginLeft: '-3px',
        marginTop: '-3px',
    },
    trailFast: {
        position: 'absolute',
        width: '30px',
        height: '30px',
        border: '1.5px solid #FFF',
        borderRadius: '50%',
        marginLeft: '-15px',
        marginTop: '-15px',
    },
    trailMid: {
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', // Organic shape
        marginLeft: '-25px',
        marginTop: '-25px',
        filter: 'blur(4px)',
    },
    trailLarge: {
        position: 'absolute',
        width: '80px',
        height: '80px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', // Different organic shape
        marginLeft: '-40px',
        marginTop: '-40px',
        filter: 'blur(8px)',
    }
};

export default CreativeCursor;
