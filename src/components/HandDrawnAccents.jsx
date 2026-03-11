import React from 'react';
import { motion } from 'framer-motion';

export const SketchUnderline = ({ color = 'var(--accent-color)', width = '100%', delay = 0.5 }) => {
    return (
        <svg 
            viewBox="0 0 200 20" 
            preserveAspectRatio="none"
            style={{ 
                position: 'absolute', 
                bottom: '-5px', 
                left: 0, 
                width: width, 
                height: '15px',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        >
            <motion.path
                d="M5 15 Q 50 5, 100 15 T 195 10"
                fill="transparent"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                    duration: 1.2, 
                    delay: delay,
                    ease: "easeInOut"
                }}
            />
        </svg>
    );
};

export const SketchCircle = ({ color = '#FF64C8', delay = 0.8 }) => {
    return (
        <svg 
            viewBox="0 0 100 100" 
            style={{ 
                position: 'absolute', 
                top: '-10%', 
                left: '-10%', 
                width: '120%', 
                height: '120%', 
                zIndex: -1,
                pointerEvents: 'none'
            }}
        >
            <motion.path
                d="M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"
                fill="transparent"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5, 10"
                initial={{ pathLength: 0, rotate: -10 }}
                animate={{ pathLength: 1, rotate: 0 }}
                transition={{ 
                    duration: 1.5, 
                    delay: delay,
                    ease: "easeOut"
                }}
            />
        </svg>
    );
};
