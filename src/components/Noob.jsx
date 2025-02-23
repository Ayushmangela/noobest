import React, { useState, useEffect } from 'react';
import './Noob.css';

function Noob() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Calculate scroll percentage with consistent steps
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = currentScrollY / maxScroll;
          
          // Use easing function for more consistent speed
          const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const easedScale = easeInOut(scrollPercent);
          
          // Apply consistent scaling
          const newScale = 1 + (easedScale * 3000);
          setScale(newScale);
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="noob-container" style={{
      backgroundColor: '#ffffff',
      visibility: scale > 35 ? 'hidden' : 'visible',
      pointerEvents: scale > 35 ? 'none' : 'auto'
    }}>
      <div className="text-container" style={{ 
        transform: `scale(${scale})`,
        opacity: Math.max(0, 1 - ((scale - 1) / 3000)),
        color: '#000000'
      }}>
        <span className="hello">Hello</span>
        <span className="noob">
          <span className="zoom-origin">N</span>oob
        </span>
      </div>
    </div>
  );
}

export default Noob;