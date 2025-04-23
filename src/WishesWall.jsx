import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Composant pour le mur des vœux d'anniversaire
const WishesWall = ({ playButtonSound }) => {
  // Données pour les vœux
  const wishes = [
    {
      id: 1,
      name: "Marie",
      message: "Joyeux anniversaire Fidèle ! Que cette nouvelle année de vie t'apporte toutes les bénédictions que ton cœur désire. Que ta lumière continue de briller et d'inspirer tous ceux qui t'entourent.",
      color: "bg-pale-gold"
    },
    {
      id: 2,
      name: "David",
      message: "Mon frère, je te souhaite un anniversaire rempli de joie et de paix. Que la grâce de Dieu t'accompagne chaque jour de tes 23 ans !",
      color: "bg-celestial-blue"
    },
    {
      id: 3,
      name: "Sophie",
      message: "Fidèle, ton nom te va si bien ! Je souhaite que cette année soit pleine de fidélité, d'amour et de victoires. Joyeux 23e anniversaire !",
      color: "bg-soft-pink"
    },
    {
      id: 4,
      name: "Jean",
      message: "Que les mélodies de la vie t'inspirent et t'élèvent encore plus haut. Joyeux anniversaire, musicien talentueux !",
      color: "bg-pale-gold"
    },
    {
      id: 5,
      name: "Esther",
      message: "23 ans de grâce et de beauté ! Que cette nouvelle année te rapproche encore plus de tes rêves et de ton appel divin. Je t'embrasse !",
      color: "bg-celestial-blue"
    },
    {
      id: 6,
      name: "Papa & Maman",
      message: "Notre fils bien-aimé, nous sommes si fiers de l'homme que tu deviens. Que Dieu continue à guider tes pas dans ta 23e année. On t'aime infiniment !",
      color: "bg-soft-pink"
    }
  ];

  // État pour le vœu personnel à ajouter
  const [newWish, setNewWish] = useState({
    name: '',
    message: ''
  });
  
  // État pour les vœux affichés
  const [displayedWishes, setDisplayedWishes] = useState(wishes);
  
  // Gérer la soumission d'un nouveau vœu
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newWish.name.trim() && newWish.message.trim()) {
      // Son du bouton si disponible
      if (playButtonSound) playButtonSound();
      
      // Créer un nouveau vœu
      const addedWish = {
        id: displayedWishes.length + 1,
        name: newWish.name,
        message: newWish.message,
        color: `bg-${['pale-gold', 'celestial-blue', 'soft-pink'][Math.floor(Math.random() * 3)]}`
      };
      
      // Ajouter le vœu à la liste
      setDisplayedWishes([...displayedWishes, addedWish]);
      
      // Réinitialiser le formulaire
      setNewWish({
        name: '',
        message: ''
      });
    }
  };
  
  // Variantes d'animation pour les notes
  const noteVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-cursive text-pale-gold mb-4">
          Mur de Vœux
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Lis tous ces messages d'amour et d'encouragement de ceux qui t'apprécient. 
          Tu peux aussi ajouter ton propre message !
        </p>
      </motion.div>
      
      {/* Grille de notes pour les vœux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mb-12">
        {displayedWishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            className={`${wish.color} bg-opacity-20 p-6 rounded-lg shadow-md transform rotate-${Math.floor(Math.random() * 6) - 3}`}
            variants={noteVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
          >
            <div className="bg-ivory bg-opacity-70 p-4 rounded shadow-sm relative">
              {/* Épingle décorative */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-pale-gold shadow-sm"></div>
              
              <p className="italic text-gray-700 mb-4">"{wish.message}"</p>
              <div className="text-right font-cursive text-xl text-pale-gold">
                - {wish.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Formulaire pour ajouter un vœu */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-md mx-auto p-6 bg-ivory rounded-lg shadow-lg mb-12"
      >
        <h3 className="text-2xl font-cursive text-pale-gold mb-4 text-center">
          Ajoute ton message
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Ton nom</label>
            <input
              type="text"
              id="name"
              value={newWish.name}
              onChange={(e) => setNewWish({...newWish, name: e.target.value})}
              className="w-full px-4 py-2 border border-pale-gold rounded-md focus:outline-none focus:ring-2 focus:ring-pale-gold"
              placeholder="Entre ton nom"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">Ton message pour Fidèle</label>
            <textarea
              id="message"
              value={newWish.message}
              onChange={(e) => setNewWish({...newWish, message: e.target.value})}
              className="w-full px-4 py-2 border border-pale-gold rounded-md focus:outline-none focus:ring-2 focus:ring-pale-gold h-32"
              placeholder="Entre ton message d'anniversaire..."
              required
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Ajouter mon message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default WishesWall;