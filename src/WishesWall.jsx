import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Composant pour le mur des vœux d'anniversaire
const WishesWall = ({ playButtonSound, openMessageModal }) => {
  // Données pour les vœux - tous de Mathias
  const wishes = [
    {
      id: 1,
      message: "Joyeux anniversaire Fidèle ! Que cette nouvelle année de vie soit inondée de la grâce divine et de bénédictions abondantes. Que ta lumière spirituelle continue de briller et d'inspirer notre communauté de foi.",
      color: "bg-pale-gold"
    },
    {
      id: 2,
      message: "J'admire ta persévérance dans ta marche avec Dieu et ton courage face aux défis. Ta force intérieure ancrée dans la foi est un témoignage vivant pour tous ceux qui te côtoient dans notre assemblée.",
      color: "bg-celestial-blue"
    },
    {
      id: 3,
      message: "Fidèle, ton nom reflète parfaitement ta relation avec le Seigneur ! Que cette année t'apporte encore plus de fidélité, d'amour divin et de victoires spirituelles. Ta présence lors des moments d'intercession est une bénédiction.",
      color: "bg-soft-pink"
    },
    {
      id: 4,
      message: "Que le Seigneur continue de te guider et de t'élever dans tous les domaines de ta vie. Ta douceur et ton respect envers les autres sont des qualités précieuses qui reflètent le caractère du Christ.",
      color: "bg-pale-gold"
    },
    {
      id: 5,
      message: "23 ans de grâce et de beauté divine ! Que cette nouvelle année te rapproche encore plus de ton appel céleste. J'espère sincèrement que nous pourrons partager davantage de moments spirituels ensemble dans les temps à venir.",
      color: "bg-celestial-blue"
    },
    {
      id: 6,
      message: "Même si nos chemins ne se croisent que rarement, chacune de ces rencontres m'a permis d'apprécier la profondeur de ton âme et ton authenticité. Que le Seigneur te comble de ses plus belles bénédictions en ce jour spécial.",
      color: "bg-soft-pink"
    }
  ];
  
  // Style pour les notes flottantes avec différentes rotations
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 7) - 3;
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
  
  // Révéler un message spécial
  const revealSpecialMessage = () => {
    if (playButtonSound) playButtonSound();
    if (openMessageModal) {
      openMessageModal(
        "Une prière pour toi", 
        "Chère Fidèle,\n\nEn ce jour béni qui célèbre tes 23 ans, je m'élève en prière pour toi.\n\nJe prie pour que la présence du Seigneur t'enveloppe comme jamais auparavant, que Sa sagesse guide chacun de tes pas, et que Sa paix qui surpasse toute intelligence remplisse ton cœur.\n\nJe prie pour que tes talents et tes dons s'épanouissent pleinement selon Son dessein parfait, que tes rêves s'alignent avec Sa volonté divine, et que tes projets prospèrent sous Sa direction.\n\nJe prie pour que ta relation avec Lui s'approfondisse jour après jour, que ta foi grandisse face aux défis, et que ton témoignage inspire ceux qui t'entourent.\n\nBien que nos interactions aient été limitées jusqu'à présent, j'ai toujours ressenti un profond respect et une sincère admiration pour ta foi et ta douceur. J'espère que ce message d'anniversaire pourra marquer le début d'une amitié spirituelle plus profonde, enracinée dans notre amour commun pour le Seigneur.\n\nQue cette nouvelle année de ta vie soit remplie de révélations divines, de joie céleste et de la gloire de Dieu manifestée.\n\nAvec une profonde admiration en Christ,"
      );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-cursive text-pale-gold mb-4">
          Bénédictions & Vœux
        </h2>
        <p className="text-lg max-w-2xl mx-auto px-4">
          Des messages d'admiration et d'encouragement spirituel pour toi, Fidèle, en ce jour béni.
        </p>
      </motion.div>
      
      {/* Grille de notes pour les vœux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mb-12">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            className={`${wish.color} bg-opacity-20 p-6 rounded-lg shadow-md transform`}
            style={{ rotate: `${getRandomRotation()}deg` }}
            variants={noteVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
            onClick={() => {
              if (playButtonSound) playButtonSound();
              if (openMessageModal) {
                openMessageModal("Bénédiction d'anniversaire", wish.message);
              }
            }}
          >
            <div className="bg-ivory bg-opacity-70 p-4 rounded shadow-sm relative cursor-pointer">
              {/* Épingle décorative */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-pale-gold shadow-sm"></div>
              
              <p className="italic text-gray-700 mb-4">"{wish.message.substring(0, 100)}..."</p>
              <div className="text-right font-cursive text-xl text-pale-gold">
                - Mathias
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Bouton pour révéler un message spécial */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center mb-12"
      >
        <motion.button
          onClick={revealSpecialMessage}
          className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90 shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(230, 190, 138, 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ Une prière pour toi ✨
        </motion.button>
      </motion.div>
      
      {/* Message de fond */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-8 p-6 bg-ivory bg-opacity-70 rounded-lg"
      >
        <p className="text-gray-700">
          Ces messages viennent du fond de mon cœur. Bien que nous ne nous connaissions que dans le cadre de notre église et de nos moments d'intercession, j'ai toujours admiré la profondeur de ta foi et la douceur de ton esprit.
          Que cette journée soit bénie, comme tu l'es toi-même.
        </p>
        <div className="mt-3 font-cursive text-pale-gold text-xl">
          Dans la communion fraternelle, Mathias
        </div>
      </motion.div>
    </div>
  );
};

export default WishesWall;