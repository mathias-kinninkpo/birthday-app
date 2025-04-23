// src/LoadingScreen.jsx
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ivory z-50">
      <div className="text-center">
        <motion.div
          className="text-4xl md:text-5xl font-cursive text-pale-gold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Préparation de ta surprise...
        </motion.div>
        
        <motion.div
          className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-pale-gold"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-6 text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Un moment magique t'attend...
        </motion.div>
        
        <motion.div 
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-5xl">✨</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;