// src/MessageModal.jsx
import { motion, AnimatePresence } from 'framer-motion';

const MessageModal = ({ isOpen, title, message, sender, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        >
          <motion.div
            className="bg-ivory rounded-lg shadow-2xl max-w-md w-full overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }} // Hauteur maximale pour les petits écrans
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={e => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="bg-pale-gold p-4 text-ivory">
              <h3 className="font-cursive text-2xl">{title}</h3>
            </div>
            
            {/* Corps du message avec défilement */}
            <div className="p-6 bg-gradient-to-b from-ivory to-white overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <div className="mb-6">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {message}
                </p>
              </div>
              
              {/* Signature */}
              <div className="text-right font-cursive text-pale-gold text-xl">
                - {sender}
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute top-2 right-2 text-2xl opacity-20">✨</div>
              <div className="absolute bottom-2 left-2 text-2xl opacity-20">✨</div>
            </div>
            
            {/* Bouton de fermeture */}
            <div className="bg-ivory p-4 border-t border-gray-200 flex justify-end mt-auto">
              <motion.button
                className="px-4 py-2 bg-pale-gold text-ivory rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;