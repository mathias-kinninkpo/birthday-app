// src/Carousel3D.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Carousel3D = ({ playButtonSound, openMessageModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [interactedWith, setInteractedWith] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  
  // Données pour la galerie avec messages adaptés
  const memories = [
    {
      id: 1,
      title: "Foi Rayonnante",
      description: "Ta relation avec Dieu transparaît dans chacun de tes actes et inspire ceux qui t'entourent.",
      color: "bg-pale-gold",
      message: "Fidèle, j'ai toujours admiré la profondeur de ta relation avec Dieu. Même si nos chemins ne se croisent que lors des moments d'église et d'intercession, j'ai pu observer combien ta foi est authentique et rayonnante. Ta manière de prier et de servir reflète une connexion véritable avec le Seigneur. Cette dévotion est une inspiration pour notre communauté et pour moi personnellement."
    },
    {
      id: 2,
      title: "Douceur Bienveillante",
      description: "Ta douceur et ta bienveillance créent une atmosphère de paix lors de chacune de nos rencontres.",
      color: "bg-celestial-blue",
      message: "À chaque fois que nous nous rencontrons, même si ces moments sont rares, ta douceur et ta bienveillance m'ont profondément marqué. Tu as cette capacité à créer un espace de paix autour de toi, où chacun se sent écouté et valorisé. Cette qualité est un véritable don du ciel qui touche tous ceux qui ont le privilège de te connaître. J'espère sincèrement avoir plus d'occasions de partager ces moments de grâce avec toi."
    },
    {
      id: 3,
      title: "Respect & Humilité",
      description: "Ton respect envers les autres et ton humilité sont des qualités qui te distinguent.",
      color: "bg-soft-pink",
      message: "Parmi toutes tes qualités, ton respect envers les autres et ton humilité m'ont particulièrement marqué. Dans un monde où ces vertus se font rares, tu les incarnes avec une sincérité qui inspire. En te côtoyant dans notre groupe d'intercession, j'ai pu observer comment tu honores chaque personne, quelle que soit sa position. Cette attitude reflète un cœur aligné avec les valeurs du Christ et mérite d'être célébrée."
    },
    {
      id: 4,
      title: "Détermination & Travail",
      description: "Ta détermination et ton éthique de travail témoignent de ton engagement envers l'excellence.",
      color: "bg-pale-gold",
      message: "Ta réussite dans tes études et ta carrière n'est pas le fruit du hasard. J'admire profondément ta détermination et ton éthique de travail. Ces qualités témoignent de ton engagement envers l'excellence et de ta persévérance face aux défis. Même si nous ne parlons pas souvent de nos parcours professionnels, ton exemple m'encourage à donner le meilleur de moi-même dans mes propres entreprises. Tu démontres que la foi et l'ambition peuvent coexister harmonieusement."
    },
    {
      id: 5,
      title: "Amitié Naissante",
      description: "Ce souhait d'anniversaire marque peut-être le début d'une amitié plus profonde entre nous.",
      color: "bg-celestial-blue",
      message: "Bien que nous nous connaissions principalement dans le contexte de notre église et de nos moments d'intercession, j'ai toujours ressenti une connexion spirituelle avec toi. Peut-être que ce message d'anniversaire pourrait marquer le début d'une amitié plus profonde. Je serais honoré de mieux te connaître et de partager davantage de moments ensemble, dans la foi et dans la vie. Ton âme bienveillante et ta présence lumineuse sont des dons précieux que j'apprécie sincèrement."
    }
  ];
  
  // Auto-défilement
  useEffect(() => {
    if (autoPlay && !interactedWith) {
      autoPlayTimerRef.current = setInterval(() => {
        navigateCarousel('auto');
      }, 5000);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, currentIndex, interactedWith]);
  
  // Arrêter l'auto-défilement temporairement après interaction
  const pauseAutoPlay = () => {
    setInteractedWith(true);
    clearInterval(autoPlayTimerRef.current);
    // Reprendre après 10 secondes d'inactivité
    setTimeout(() => {
      setInteractedWith(false);
    }, 10000);
  };
  
  // Navigation dans le carrousel
  const navigateCarousel = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Si c'est une navigation manuelle
    if (direction !== 'auto') {
      pauseAutoPlay();
      if (playButtonSound) playButtonSound();
    }
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % memories.length;
    } else if (direction === 'prev') {
      newIndex = currentIndex - 1 < 0 ? memories.length - 1 : currentIndex - 1;
    } else {
      // Auto
      newIndex = (currentIndex + 1) % memories.length;
    }
    
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };
  
  // Afficher le message dans la modale
  const revealMessage = (id) => {
    const memory = memories.find(m => m.id === id);
    if (memory && openMessageModal) {
      if (playButtonSound) playButtonSound();
      openMessageModal(memory.title, memory.message);
    }
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
          Galerie de Vertus Lumineuses
        </h2>
        <p className="text-lg max-w-2xl mx-auto px-4">
          Explore ces qualités que j'admire profondément en toi, des rayons de lumière divine qui brillent à travers ta vie.
        </p>
      </motion.div>
      
      {/* 3D Carousel */}
      <div 
        className="relative h-96 w-full max-w-5xl mx-auto perspective-1000 px-4"
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
                           border border-ivory flex flex-col items-center justify-center p-6 text-center
                           transform-style-preserve-3d`}
                style={{ 
                  backgroundImage: "radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2), 0 0 20px rgba(230, 190, 138, 0.3)"
                }}
              >
                <div className="p-6 md:p-12 bg-ivory bg-opacity-80 rounded-lg transform-gpu">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-cursive mb-4 text-pale-gold">{memory.title}</h3>
                    <p className="text-gray-700 mb-6 text-sm md:text-base">{memory.description}</p>
                    <div className="w-16 h-1 bg-pale-gold mx-auto mb-4"></div>
                    
                    {index === currentIndex && (
                      <motion.button
                        className="mt-4 px-4 py-2 bg-pale-gold text-ivory rounded-full text-sm hover:bg-opacity-90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => revealMessage(memory.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ pointerEvents: 'auto' }}
                      >
                        Lire mon message
                      </motion.button>
                    )}
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
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pale-gold bg-opacity-70 rounded-full flex items-center justify-center text-white z-10"
          onClick={() => navigateCarousel('prev')}
          whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        
        <motion.button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pale-gold bg-opacity-70 rounded-full flex items-center justify-center text-white z-10"
          onClick={() => navigateCarousel('next')}
          whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
        
        {/* Auto-play toggle */}
        <motion.button
          className={`absolute bottom-0 right-4 p-2 rounded-full ${autoPlay ? 'bg-pale-gold' : 'bg-gray-400'} text-white`}
          onClick={() => {
            setAutoPlay(!autoPlay);
            if (playButtonSound) playButtonSound();
            pauseAutoPlay();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {autoPlay ? '⏸' : '▶️'}
        </motion.button>
        
        {/* Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
          {memories.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentIndex ? 'bg-pale-gold' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                setCurrentIndex(index);
                if (playButtonSound) playButtonSound();
                pauseAutoPlay();
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