// src/AudioPermissionModal.jsx
import { motion } from 'framer-motion';

const AudioPermissionModal = ({ onPermission }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div 
        className="bg-ivory rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-cursive text-pale-gold mb-4 text-center">
          Expérience Sonore
        </h3>
        
        <p className="text-gray-700 mb-6 text-center">
          Pour une meilleure expérience, cette célébration d'anniversaire contient de la musique et des effets sonores.
        </p>
        
        <p className="text-gray-700 mb-6 text-center">
          Souhaitez-vous activer le son pour profiter pleinement de votre visite?
        </p>
        
        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={() => onPermission(true)}
            className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Oui, activer le son 🔊
          </motion.button>
          
          <motion.button
            onClick={() => onPermission(false)}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-opacity-90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Non merci 🔇
          </motion.button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Vous pourrez modifier ce paramètre à tout moment
        </div>
      </motion.div>
    </div>
  );
};

export default AudioPermissionModal;