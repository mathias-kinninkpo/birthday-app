import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryGallery = () => {
  // Données factices pour la galerie
  const memories = [
    {
      id: 1,
      title: "Une journée bénie",
      description: "Un souvenir précieux dans ta vie spirituelle",
      color: "bg-pale-gold"
    },
    {
      id: 2,
      title: "Moment musical",
      description: "Ta passion pour la musique et la louange",
      color: "bg-celestial-blue"
    },
    {
      id: 3,
      title: "Entre amis",
      description: "De précieux moments d'amitié partagés",
      color: "bg-soft-pink"
    },
    {
      id: 4,
      title: "Service et dévouement",
      description: "Ton cœur de service pour les autres",
      color: "bg-pale-gold"
    },
    {
      id: 5,
      title: "Rires et joie",
      description: "La joie qui illumine ton visage",
      color: "bg-celestial-blue"
    },
    {
      id: 6,
      title: "Accomplissements",
      description: "Les étapes franchies cette année",
      color: "bg-soft-pink"
    }
  ];

  const [selectedMemory, setSelectedMemory] = useState(null);

  // Animation variants pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Ouvrir modal pour afficher détails du souvenir
  const openMemoryModal = (memory) => {
    setSelectedMemory(memory);
  };

  // Fermer modal
  const closeMemoryModal = () => {
    setSelectedMemory(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="bg-ivory rounded-lg shadow-lg overflow-hidden cursor-pointer transform-gpu"
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
            whileTap="tap"
            onClick={() => openMemoryModal(memory)}
          >
            <div className={`${memory.color} h-48 w-full bg-opacity-30 flex items-center justify-center p-6`}>
              <div className="text-center">
                <h3 className="text-2xl font-cursive mb-2">{memory.title}</h3>
                <div className="w-16 h-1 bg-pale-gold mx-auto mb-2"></div>
                <p className="text-sm">{memory.description}</p>
              </div>
            </div>
            <div className="p-4 bg-ivory">
              <div className="flex justify-between items-center">
                <span className="text-pale-gold">Souvenir #{memory.id}</span>
                <span className="text-xs text-gray-500">Cliquer pour agrandir</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal pour afficher un souvenir */}
      {selectedMemory && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMemoryModal}
        >
          <motion.div
            className="bg-ivory rounded-lg overflow-hidden max-w-2xl w-full mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${selectedMemory.color} h-64 bg-opacity-30 flex items-center justify-center p-6`}>
              <div className="text-center">
                <h2 className="text-4xl font-cursive mb-4">{selectedMemory.title}</h2>
                <div className="w-24 h-1 bg-pale-gold mx-auto mb-4"></div>
                <p className="text-lg">{selectedMemory.description}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                "Ce souvenir représente une part précieuse de ton cheminement cette année. 
                Que cette nouvelle année de vie t'apporte encore plus de moments comme celui-ci, 
                remplis de bénédictions et de joie divine."
              </p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90"
                  onClick={closeMemoryModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryGallery;