// src/TimelineCeleste.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TimelineCeleste = ({ playButtonSound }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [clickCounter, setClickCounter] = useState({});
  const [showHeartShower, setShowHeartShower] = useState(false);
  const [heartShowerPosition, setHeartShowerPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Timeline items
  const timelineItems = [
    {
      id: 1,
      icon: "❤️",
      title: "Premier jour",
      description: "Le jour où tu as vu la lumière pour la première fois, un jour béni.",
      year: "2002"
    },
    {
      id: 2,
      icon: "🕊️",
      title: "Chemin spirituel",
      description: "Quand la grâce divine a touché ton cœur d'une manière spéciale.",
      year: "2015"
    },
    {
      id: 3,
      icon: "🎵",
      title: "Don musical",
      description: "La musique est devenue ton langage pour toucher les âmes.",
      year: "2017"
    },
    {
      id: 4,
      icon: "🌟",
      title: "Accomplissements",
      description: "Tes réussites brillent comme des étoiles dans ton parcours.",
      year: "2020"
    },
    {
      id: 5,
      icon: "🎉",
      title: "23 ans aujourd'hui",
      description: "Un nouveau chapitre s'ouvre, rempli de promesses et de bénédictions.",
      year: "2025"
    }
  ];

  // Parallax effect with scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Handle multiple clicks on timeline item (Easter egg)
  const handleIconClick = (id) => {
    // Track clicks
    const count = (clickCounter[id] || 0) + 1;
    setClickCounter({ ...clickCounter, [id]: count });
    
    // Easter egg: After 3 clicks
    if (count === 3) {
      // Get element position
      const element = document.getElementById(`timeline-item-${id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHeartShowerPosition({ 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        });
        setShowHeartShower(true);
        setTimeout(() => setShowHeartShower(false), 3000);
      }
      
      // Reset counter
      setClickCounter({ ...clickCounter, [id]: 0 });
    }
    
    // Play sound if available
    if (playButtonSound) playButtonSound();
  };

  return (
    <div className="relative py-20 overflow-hidden" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-cursive text-pale-gold mb-4">
          Ta Timeline Céleste
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Un voyage à travers les moments clés de ta vie, chaque étape guidée par la lumière divine.
        </p>
      </motion.div>
      
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pale-gold transform -translate-x-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative">
        {timelineItems.map((item, index) => {
          // Alternate items left and right
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={item.id}
              id={`timeline-item-${item.id}`}
              className={`flex items-center mb-20 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Content */}
              <div className={`w-5/12 p-6 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="text-pale-gold text-2xl font-bold mb-1">{item.year}</div>
                  <h3 className="text-2xl font-cursive mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              </div>
              
              {/* Icon in the middle */}
              <div className="w-2/12 flex justify-center relative z-10">
                <motion.div
                  className="w-14 h-14 bg-ivory border-4 border-pale-gold rounded-full flex items-center justify-center text-2xl cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleIconClick(item.id)}
                  style={{ 
                    backgroundImage: "radial-gradient(circle, #FFFFFF 0%, #FFFFF0 100%)",
                    boxShadow: "0 0 15px rgba(230, 190, 138, 0.5)"
                  }}
                >
                  {item.icon}
                </motion.div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Heart shower effect (Easter egg) */}
      {showHeartShower && (
        <div 
          className="fixed pointer-events-none z-40"
          style={{ left: heartShowerPosition.x, top: heartShowerPosition.y }}
        >
          {[...Array(30)].map((_, i) => {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            const scale = 0.5 + Math.random() * 1;
            const duration = 1 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            
            return (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  x: randomX, 
                  y: randomY, 
                  opacity: [0, 1, 0], 
                  scale: [0, scale, 0] 
                }}
                transition={{ 
                  duration: duration, 
                  delay: delay,
                  ease: "easeOut" 
                }}
              >
                ❤️
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimelineCeleste;