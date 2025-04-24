// src/TimelineCeleste.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TimelineCeleste = ({ playButtonSound, openMessageModal }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [clickCounter, setClickCounter] = useState({});
  const [showHeartShower, setShowHeartShower] = useState(false);
  const [heartShowerPosition, setHeartShowerPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Timeline items mis à jour avec les dates spécifiées
  const timelineItems = [
    {
      id: 1,
      icon: "❤️",
      title: "Naissance",
      description: "Le 24 avril 2002, tu as vu la lumière pour la première fois, un jour béni.",
      year: "2002",
      message: "Le jour de ta naissance a été un cadeau pour le monde. Même si je n'ai pas été présent ce jour-là, je suis reconnaissant envers Dieu pour avoir créé quelqu'un d'aussi spécial que toi. Ta présence apporte lumière et grâce dans notre assemblée. Chaque année qui passe est une nouvelle page de ton témoignage vivant de la bonté divine."
    },
    {
      id: 2,
      icon: "🤝",
      title: "Notre rencontre",
      description: "En 2023, nos chemins se sont croisés à l'église, marquant le début d'une connexion spirituelle.",
      year: "2023",
      message: "Lorsque nos chemins se sont croisés à l'église en 2023, j'ai tout de suite remarqué ta présence lumineuse et ta douceur. Nos rencontres, bien que peu fréquentes, ont toujours été empreintes d'une sincérité et d'un respect mutuel qui m'ont profondément marqué. Je suis reconnaissant pour chaque moment de prière et de service partagé dans notre groupe d'intercession, où ta foi authentique rayonne."
    },
    {
      id: 3,
      icon: "🎓",
      title: "Licence en Banque et Assurance",
      description: "En 2024, tu as brillamment réussi ta licence, une étape importante dans ton parcours.",
      year: "2024",
      message: "Ta réussite académique en 2024 témoigne de ton sérieux et de ta persévérance. Bien que nous n'ayons pas beaucoup parlé de ton parcours professionnel, j'ai été inspiré d'apprendre ton accomplissement dans un domaine aussi exigeant que la Banque et l'Assurance. Cette réussite n'est pas seulement le fruit de ton travail, mais aussi un reflet de ton caractère déterminé et de ta quête d'excellence qui transparaît dans tous les aspects de ta vie."
    },
    {
      id: 4,
      icon: "🎉",
      title: "23 ans aujourd'hui",
      description: "En 2025, tu célèbres tes 23 ans, débordant de promesses divines pour ton avenir.",
      year: "2025",
      message: "En ce jour spécial de tes 23 ans, je souhaite te transmettre mon admiration et mon respect profonds. Bien que nous nous connaissions principalement dans le cadre de notre église et de nos moments d'intercession, j'ai toujours été touché par ta foi sincère et ta douceur. À 23 ans, tu incarnes déjà tant de vertus chrétiennes qui inspirent ceux qui t'entourent. Que cette nouvelle année de vie soit remplie de bénédictions divines, d'accomplissements personnels et de moments de communion profonde avec le Seigneur."
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
    
    // Play sound if available
    if (playButtonSound) playButtonSound();
    
    // Trouver l'élément correspondant
    const item = timelineItems.find(item => item.id === id);
    if (item && openMessageModal) {
      openMessageModal(item.title, item.message);
    }
    
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
  };

  // Révéler un message spécial
  const showSpecialMessage = () => {
    if (playButtonSound) playButtonSound();
    if (openMessageModal) {
      openMessageModal(
        "Un chemin guidé par la grâce", 
        "Fidèle, en contemplant ces moments clés de ton parcours, je suis émerveillé par la main divine qui guide chacun de tes pas. Bien que nous ne nous connaissions pas intimement, j'observe avec admiration ton cheminement empreint de foi et de grâce.\n\nChaque étape de ta vie témoigne d'une sagesse qui dépasse ton âge et d'une connexion profonde avec le Seigneur. De ta naissance à aujourd'hui, ton parcours révèle une âme précieuse aux yeux de Dieu.\n\nEn cette journée d'anniversaire, je prie pour que cette nouvelle année de vie t'apporte encore plus de révélations spirituelles, d'accomplissements bénis et de moments de communion profonde avec notre Créateur. Que ton témoignage continue d'inspirer ceux qui, comme moi, ont le privilège de te côtoyer dans la maison de Dieu."
      );
    }
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
        <p className="text-lg max-w-2xl mx-auto px-4">
          Un voyage à travers les moments clés de ta vie, chaque étape guidée par la lumière divine.
        </p>
      </motion.div>
      
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pale-gold transform -translate-x-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative px-4">
        {timelineItems.map((item, index) => {
          // Sur mobile, toujours à droite, sinon alterner gauche et droite
          const isMobile = window.innerWidth < 768;
          const isEven = isMobile ? true : index % 2 === 0;
          
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
              <div className={`w-full md:w-5/12 p-4 md:p-6 ${isEven ? 'md:pr-12 md:text-right text-left' : 'md:pl-12 text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="text-pale-gold text-xl md:text-2xl font-bold mb-1">{item.year}</div>
                  <h3 className="text-xl md:text-2xl font-cursive mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{item.description}</p>
                </motion.div>
              </div>
              
              {/* Icon in the middle */}
              <div className="w-2/12 flex justify-center relative z-10">
                <motion.div
                  className="w-12 h-12 md:w-14 md:h-14 bg-ivory border-4 border-pale-gold rounded-full flex items-center justify-center text-xl md:text-2xl cursor-pointer shadow-lg"
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
              
              {/* Empty space for the other side - hide on mobile */}
              <div className="hidden md:block md:w-5/12"></div>
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
      
      {/* Message spécial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-10 px-4"
      >
        <button
          onClick={showSpecialMessage}
          className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90 shadow-lg"
        >
          Découvrir un message spécial
        </button>
      </motion.div>
    </div>
  );
};

export default TimelineCeleste;