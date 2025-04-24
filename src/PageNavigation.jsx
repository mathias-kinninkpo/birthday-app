// src/PageNavigation.jsx
import { motion } from 'framer-motion';

const PageNavigation = ({ currentPage, navigateToPage, playButtonSound }) => {
  // Configuration des pages dans l'ordre
  const pages = [
    { id: 'greeting-card', name: 'Carte', icon: '💌' },
    { id: 'carousel', name: 'Galerie', icon: '🖼️' },
    { id: 'timeline', name: 'Timeline', icon: '✨' },
    { id: 'wishes-wall', name: 'Vœux', icon: '💝' },
    { id: 'fireworks', name: 'Finale', icon: '🎆' }
  ];

  // Gérer la navigation
  const handleNavigate = (pageId) => {
    if (playButtonSound) playButtonSound();
    navigateToPage(pageId);
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-40 flex justify-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="bg-ivory bg-opacity-90 backdrop-blur-sm shadow-lg rounded-b-lg p-1 md:p-2 flex space-x-1 md:space-x-2">
        {pages.map(page => (
          <motion.button
            key={page.id}
            onClick={() => handleNavigate(page.id)}
            className={`px-2 py-1 md:px-3 md:py-2 rounded-lg flex flex-col items-center transition-colors text-xs md:text-sm ${
              currentPage === page.id 
                ? 'bg-pale-gold text-ivory' 
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base md:text-xl mb-1">{page.icon}</span>
            <span className="hidden md:block">{page.name}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Bouton pour revenir à l'accueil */}
      <motion.button
        onClick={() => handleNavigate('welcome')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-pale-gold text-ivory rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        🏠
      </motion.button>
    </motion.div>
  );
};

export default PageNavigation;