import { useEffect, useRef, useState } from 'react';
import './Timeline.css';
import HI from './hi';

function TimelineItem({ align, tagline, heading, content, isActive, image }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`timeline-item ${align} ${isActive ? 'active' : ''}`} role="listitem" aria-current={isActive}>
      <div className={`timeline-content ${isFlipped ? 'flipped' : ''}`}>
        <div className="timeline-front">
          <span className="tagline">{tagline}</span>
          <h2 className="heading">{heading}</h2>
          <p className="content">{content}</p>
          <button onClick={handleFlip} className="flip-button">
            Flip
          </button>
        </div>
        <div className="timeline-back">
          <img src={image} alt="Backside Image" className="back-image" />
          <button onClick={handleFlip} className="flip-button">
            Flip Back
          </button>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  const [activeSections, setActiveSections] = useState(new Set());
  const [showTimeline, setShowTimeline] = useState(false);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Delay showing the timeline until Noob animation is complete
    const timer = setTimeout(() => {
      setShowTimeline(true);
    }, 1500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTimeline) return;

    const timeline = timelineRef.current;
    const progress = progressRef.current;
  
    if (!timeline || !progress) return;
  
    const items = timeline.querySelectorAll('.timeline-item');
  
    const updateProgress = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      const timelineStart = timelineRect.top + window.scrollY;
      const timelineEnd = timelineRect.bottom + window.scrollY;
      const scrollY = window.scrollY + windowHeight / 2;
      const totalHeight = timelineEnd - timelineStart;
  
      const progressPercent = ((scrollY - timelineStart) / totalHeight) * 100;
      progress.style.height = `${Math.min(Math.max(progressPercent, 0), 100)}%`;
  
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top + window.scrollY;
  
        if (scrollY >= itemTop) {
          setActiveSections((prev) => new Set([...prev, index]));
          item.classList.add('passed');
        } else {
          setActiveSections((prev) => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
          item.classList.remove('passed');
        }
      });
    };
  
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [showTimeline]);

  if (!showTimeline) {
    return null; // Don't render anything until animation is complete
  }

  const items = [
    {
      tagline: 'Tagline 1',
      heading: 'Heading 1',
      content: 'noob '.repeat(100).trim(),
      image: 'src/assets/img1.webp', // Add image URL
    },
    {
      tagline: 'Tagline 2',
      heading: 'Heading 2',
      content: 'noob '.repeat(100).trim(),
      image: 'src/assets/img3.avif', // Add image URL
    },
    {
      tagline: 'Tagline 3',
      heading: 'Why so stressed',
      content: 'noob '.repeat(100).trim(),
      image: 'src/assets/img2.jpeg', // Add image URL
    },
    {
      tagline: 'tagline',
      heading: 'Its you right??',
      content: 'you '.repeat(100).trim(),
      image: 'src/assets/img4.jpeg', // Add image URL
    },
    {
      tagline: 'these is you',
      heading: 'something special for you',
      content: 'noob '.repeat(100).trim(),
      image: 'src/assets/img5.jpg', // Add image URL
    },
    // Add more items as needed
  ];

  return (
    <>
      <HI />
    <div className="timeline-container">
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-progress-bar">
          <div className="timeline-progress" ref={progressRef}></div>
        </div>
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            align={index % 2 === 0 ? 'left' : 'right'}
            isActive={activeSections.has(index)}
            {...item}
          />
        ))}
      </div>
    </div>
      <HI/>
    </>
  );
}

export default Timeline;