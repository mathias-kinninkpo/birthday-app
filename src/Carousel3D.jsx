// src/Carousel3D.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Carousel3D = ({ playButtonSound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  
  // Données pour la galerie
  const memories = [
    {
      id: 1,
      title: "Moments de joie",
      description: "Les sourires partagés sont les trésors les plus précieux de la vie.",
      color: "bg-pale-gold"
    },
    {
      id: 2,
      title: "Musique & Louange",
      description: "Quand ton âme s'élève à travers les mélodies sacrées.",
      color: "bg-celestial-blue"
    },
    {
      id: 3,
      title: "Amitiés bénies",
      description: "Entouré de ceux qui t'aiment et te soutiennent dans ton chemin.",
      color: "bg-soft-pink"
    },
    {
      id: 4,
      title: "Croissance spirituelle",
      description: "Chaque épreuve t'a rapproché de ta destinée divine.",
      color: "bg-pale-gold"
    },
    {
      id: 5,
      title: "Regard vers l'avenir",
      description: "Tes 23 ans sont le début d'un nouveau chapitre glorieux.",
      color: "bg-celestial-blue"
    }
  ];
  
  // Navigation dans le carrousel
  const navigateCarousel = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (playButtonSound) playButtonSound();
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % memories.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? memories.length - 1 : currentIndex - 1;
    }
    
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };
  
  // Variantes d'animation pour les cartes
  const cardVariants = {
    center: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      z: 0,
      transition: { duration: 0.6 }
    },
    left: {
      rotateY: 45,
      scale: 0.8,
      opacity: 0.5,
      z: -100,
      x: '-40%',
      transition: { duration: 0.6 }
    },
    right: {
      rotateY: -45,
      scale: 0.8,
      opacity: 0.5,
      z: -100,
      x: '40%',
      transition: { duration: 0.6 }
    },
    far: {
      rotateY: 0,
      scale: 0.6,
      opacity: 0,
      z: -200,
      transition: { duration: 0.6 }
    }
  };
  
  // Déterminer la position des cartes en fonction de l'index
  const getCardPosition = (index) => {
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + memories.length) % memories.length) return 'left';
    if (index === (currentIndex + 1) % memories.length) return 'right';
    return 'far';
  };

  return (
    <div className="py-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-cursive text-pale-gold mb-4">
          Galerie de Souvenirs Lumineux
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Navigue à travers ces moments précieux qui ont illuminé ton chemin.
        </p>
      </motion.div>
      
      {/* 3D Carousel */}
      <div 
        className="relative h-96 w-full max-w-5xl mx-auto perspective-1000"
        ref={carouselRef}
      >
        <div className="transform-style-preserve-3d relative h-full w-full">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="absolute top-0 left-0 right-0 mx-auto w-full max-w-md h-80 pointer-events-none"
              custom={index}
              variants={cardVariants}
              initial="far"
              animate={getCardPosition(index)}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Card Content */}
              <div 
                className={`w-full h-full ${memory.color} bg-opacity-30 rounded-xl overflow-hidden shadow-xl 
                           border border-ivory flex flex-col items-center justify-center p-8 text-center
                           transform-style-preserve-3d`}
                style={{ 
                  backgroundImage: "radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2), 0 0 20px rgba(230, 190, 138, 0.3)"
                }}
              >
                <div className="p-12 bg-ivory bg-opacity-80 rounded-lg transform-gpu">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h3 className="text-3xl font-cursive mb-4 text-pale-gold">{memory.title}</h3>
                    <p className="text-gray-700 mb-6">{memory.description}</p>
                    <div className="w-16 h-1 bg-pale-gold mx-auto"></div>
                  </motion.div>
                </div>
              </div>
              
              {/* Legend underneath */}
              <motion.div 
                className="mt-4 text-center font-cursive text-lg text-pale-gold"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                {memory.title}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <motion.button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-pale-gold bg-opacity-70 rounded-full flex items-center justify-center text-white z-10"
          onClick={() => navigateCarousel('prev')}
          whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        
        <motion.button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-pale-gold bg-opacity-70 rounded-full flex items-center justify-center text-white z-10"
          onClick={() => navigateCarousel('next')}
          whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
        
        {/* Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
          {memories.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-pale-gold' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                setCurrentIndex(index);
                if (playButtonSound) playButtonSound();
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;