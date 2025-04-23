// src/ProgressBar.jsx
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ProgressBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 20, 
    restDelta: 0.001 
  });

  // Ne pas afficher la barre sur l'écran d'accueil
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Afficher après la hauteur de la fenêtre
      if (scrollPosition > windowHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-pale-gold z-50"
      style={{ 
        scaleX,
        transformOrigin: "0%",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease"
      }}
    />
  );
};

export default ProgressBar;