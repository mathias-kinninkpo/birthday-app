// src/App.js
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import './App.css'
import WelcomeParticles, {
  StarParticles,
  FlowerParticles,
  ConfettiParticles,
  AutumnParticles,
  WinterParticles,
  FruitsParticles,
  SpaceParticles
} from './FallingElements'
import AnimatedTypewriter from './AnimatedTypewriter'
import useAudioHandler from './AudioHandler'
import { motion, AnimatePresence } from 'framer-motion'
import TimelineCeleste from './TimelineCeleste'
import Carousel3D from './Carousel3D'
import WishesWall from './WishesWall'
import Fireworks from './Fireworks'
import ProgressBar from './ProgressBar'
import ScrollToTop from './ScrollToTop'
import LoadingScreen from './LoadingScreen'
import AudioPermissionModal from './AudioPermissionModal'
import MessageModal from './MessageModal'
import PageNavigation from './PageNavigation'

// Enregistrer les plugins GSAP
gsap.registerPlugin(Flip)

function App() {
  // États généraux
  const [isLoading, setIsLoading] = useState(true)
  const [showAudioPermission, setShowAudioPermission] = useState(true)
  const [currentPage, setCurrentPage] = useState('welcome')
  const [currentTheme, setCurrentTheme] = useState('fleurs')
  const [typingCompleted, setTypingCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showNavigationTip, setShowNavigationTip] = useState(true)
  
  // Références
  const titleRef = useRef(null)
  const ageRef = useRef(null)
  const buttonRef = useRef(null)
  
  // État pour la modale de message
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    title: '',
    message: '',
    sender: 'Mathias'
  })

  // Définition des thèmes disponibles
  const themes = {
    fleurs: <FlowerParticles />,
    étoiles: <StarParticles />,
    confetti: <ConfettiParticles />,
    automne: <AutumnParticles />,
    hiver: <WinterParticles />,
    fruits: <FruitsParticles />,
    espace: <SpaceParticles />
  }

  // Utiliser notre gestionnaire audio personnalisé
  const {
    soundEnabled,
    setSoundEnabled,
    playTypeSound,
    playButtonSound,
    playWelcomeMusic,
    stopAllMusic,
    changeBackgroundMusic
  } = useAudioHandler(false) // Défaut à false maintenant

  // Débloquer AudioContext au premier clic
  useEffect(() => {
    const unlock = () => {
      if (window.Howler?.ctx?.state === 'suspended') {
        window.Howler.ctx.resume()
      }
      document.body.removeEventListener('click', unlock)
    }
    document.body.addEventListener('click', unlock)
    
    // Simuler chargement des ressources
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  // Commencer la musique d'accueil quand l'utilisateur autorise l'audio
  useEffect(() => {
    if (currentPage === 'welcome' && soundEnabled && !showAudioPermission) {
      playWelcomeMusic()
    }
  }, [currentPage, soundEnabled, showAudioPermission, playWelcomeMusic])

  // Gérer la fin de l'animation de machine à écrire
  useEffect(() => {
    if (typingCompleted) {
      // âge
      gsap.fromTo(
        ageRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' }
      )
      // bouton
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 1 }
      )
      // confettis
      setTimeout(() => setShowConfetti(true), 1500)
    }
  }, [typingCompleted])

  // Gérer l'autorisation audio
  const handleAudioPermission = (allow) => {
    setSoundEnabled(allow)
    setShowAudioPermission(false)
    if (allow) {
      playWelcomeMusic()
    }
  }
  
  // Ouvrir la modale avec un message personnalisé
  const openMessageModal = (title, message) => {
    if (playButtonSound) playButtonSound()
    setModalMessage({
      isOpen: true,
      title,
      message,
      sender: 'Mathias'
    })
  }
  
  // Fermer la modale
  const closeMessageModal = () => {
    setModalMessage({...modalMessage, isOpen: false})
  }
  
  // Naviguer vers la page suivante
  const navigateToPage = (page) => {
    // Arrêter la musique actuelle avant d'en jouer une nouvelle
    stopAllMusic();
    
    // Effet sonore de navigation
    if (playButtonSound) playButtonSound();
    
    // Changer la musique en fonction de la page
    if (page === 'greeting-card' || page === 'carousel' || page === 'timeline' || page === 'wishes-wall') {
      setTimeout(() => {
        if (soundEnabled) changeBackgroundMusic('celebration');
      }, 500);
    } else if (page === 'fireworks') {
      setTimeout(() => {
        if (soundEnabled) changeBackgroundMusic('birthday');
      }, 500);
    } else if (page === 'welcome') {
      setTimeout(() => {
        if (soundEnabled) playWelcomeMusic();
      }, 500);
    }
    
    setCurrentPage(page)
    window.scrollTo(0, 0)
    
    // Cacher l'astuce de navigation après la première transition
    if (page !== 'welcome' && showNavigationTip) {
      setShowNavigationTip(false)
    }
  }

  // Variants pour les animations de page
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw"
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    out: {
      opacity: 0,
      x: "100vw",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Modale pour messages personnalisés */}
          <MessageModal 
            isOpen={modalMessage.isOpen}
            title={modalMessage.title}
            message={modalMessage.message}
            sender={modalMessage.sender}
            onClose={closeMessageModal}
          />
          
          {/* Navigation entre les pages (visible sauf sur welcome) */}
          {currentPage !== 'welcome' && (
            <PageNavigation 
              currentPage={currentPage} 
              navigateToPage={navigateToPage}
              playButtonSound={playButtonSound}
            />
          )}
          
          {/* Bouton audio */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="fixed top-4 right-4 p-2 bg-transparent text-pale-gold hover:text-white z-50"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </motion.button>
          
          <AnimatePresence mode="wait">
            {/* Page d'accueil */}
            {currentPage === 'welcome' && (
              <motion.div
                key="welcome"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="welcome-screen h-screen w-full flex flex-col items-center justify-center bg-ivory overflow-hidden relative"
              >
                {showAudioPermission && (
                  <AudioPermissionModal onPermission={handleAudioPermission} />
                )}
                
                <WelcomeParticles />
                {showConfetti && <ConfettiParticles />}

                <div ref={titleRef} className="relative z-10">
                  <AnimatedTypewriter 
                    text="Joyeux Anniversaire, Fidèle !"
                    className="text-4xl md:text-6xl text-pale-gold font-cursive mb-4 relative z-10 text-center px-4"
                    typingSpeed={100}
                    penColor="#D4AF37"
                    playSound={soundEnabled ? playTypeSound : null}
                    onTypingComplete={() => setTypingCompleted(true)}
                  />
                </div>

                <div className="age-3d-container mb-8 perspective-1000 z-10 w-full text-center">
                  <motion.div
                    ref={ageRef}
                    className="text-8xl md:text-9xl font-bold text-pale-gold inline-block whitespace-nowrap"
                    animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    23 ans
                  </motion.div>
                </div>

                <motion.button
                  ref={buttonRef}
                  onClick={() => navigateToPage('greeting-card')}
                  className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:scale-110 transition-transform duration-300 button-glow z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0px 0px 8px 2px rgba(230,190,138,0.3)',
                      '0px 0px 16px 4px rgba(230,190,138,0.6)',
                      '0px 0px 8px 2px rgba(230,190,138,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Cliquez ici !
                </motion.button>
              </motion.div>
            )}
            
            {/* Page Carte de Voeux */}
            {currentPage === 'greeting-card' && (
              <motion.div
                key="greeting-card"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-ivory to-celestial-blue py-16"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-ivory to-celestial-blue opacity-20"></div>
                
                {/* Affichage dynamique des particules en fonction du thème */}
                {themes[currentTheme]}

                <div className="card-container perspective-1000 z-30 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4" id="cardContainer">
                  <div className="butterfly-card transform-style-preserve-3d">
                    <div className="wing left-wing"></div>
                    <div className="card-body p-4 md:p-8 bg-ivory border border-pale-gold rounded-lg shadow-lg">
                      <div className="quote-container text-center mb-8">
                        <p className="text-lg md:text-2xl italic quote-text font-cursive text-gray-700">
                            «Chère fidèle, utilisez la flèche en bas à droite <br />
                            ou les icônes en haut <br />
                            pour naviguer entre les pages. »<br />
                           
                          </p>
                        </div>
                      
                      {showNavigationTip && (
                        <motion.div
                          className="bg-pale-gold bg-opacity-10 p-4 rounded-lg border border-pale-gold border-opacity-30 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2, duration: 0.5 }}
                        >
                          <h3 className="font-cursive text-pale-gold text-xl mb-2">Navigation</h3>
                          <p className="text-gray-700 text-sm">
                            • Utilisez la barre en haut pour naviguer entre les pages<br />
                            • Cliquez sur les flèches <span className="font-bold">→</span> pour avancer<br />
                            • Cliquez sur <span className="font-bold">🏠</span> pour revenir à l'accueil<br />
                            • Explorez chaque page pour découvrir des surprises!
                          </p>
                        </motion.div>
                      )}
                    </div>
                    <div className="wing right-wing"></div>
                  </div>
                </div>
                
                {/* Sélecteur de thème de particules */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-ivory bg-opacity-80 rounded-full px-4 py-2 shadow-lg overflow-x-auto max-w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-3 w-full justify-center">
                    <span className="text-xs md:text-sm text-gray-700 whitespace-nowrap">Ambiance:</span>
                    <div className="flex space-x-2 overflow-x-auto">
                      {Object.keys(themes).map(theme => (
                        <motion.button
                          key={theme}
                          onClick={() => {
                            setCurrentTheme(theme);
                            if (playButtonSound) playButtonSound();
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentTheme === theme ? 'bg-pale-gold text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {theme === 'fleurs' && '🌸'}
                          {theme === 'étoiles' && '✨'}
                          {theme === 'confetti' && '🎉'}
                          {theme === 'automne' && '🍂'}
                          {theme === 'hiver' && '❄️'}
                          {theme === 'fruits' && '🍎'}
                          {theme === 'espace' && '🌠'}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Bouton pour aller à la page suivante */}
                <motion.button
                  className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-pale-gold text-white shadow-lg flex items-center justify-center z-30"
                  onClick={() => navigateToPage('carousel')}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(230, 190, 138, 0.7)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </motion.div>
            )}
            
            {/* Page Carousel */}
            {currentPage === 'carousel' && (
              <motion.div
                key="carousel"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="min-h-screen relative overflow-hidden bg-gradient-to-b from-celestial-blue to-ivory py-12 flex flex-col justify-center"
              >
                <Carousel3D 
                  playButtonSound={playButtonSound} 
                  openMessageModal={openMessageModal}
                />
                
                {/* Bouton pour aller à la page suivante */}
                <motion.button
                  className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-pale-gold text-white shadow-lg flex items-center justify-center z-30"
                  onClick={() => navigateToPage('timeline')}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(230, 190, 138, 0.7)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </motion.div>
            )}
            
            {/* Page Timeline */}
            {currentPage === 'timeline' && (
              <motion.div
                key="timeline"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="min-h-screen relative overflow-hidden bg-gradient-to-b from-ivory to-celestial-blue py-12 flex flex-col justify-center"
              >
                <TimelineCeleste 
                  playButtonSound={playButtonSound} 
                  openMessageModal={openMessageModal}
                />
                
                {/* Bouton pour aller à la page suivante */}
                <motion.button
                  className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-pale-gold text-white shadow-lg flex items-center justify-center z-30"
                  onClick={() => navigateToPage('wishes-wall')}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(230, 190, 138, 0.7)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </motion.div>
            )}
            
            {/* Page Mur de Voeux */}
            {currentPage === 'wishes-wall' && (
              <motion.div
                key="wishes-wall"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="min-h-screen relative overflow-hidden bg-gradient-to-b from-celestial-blue to-ivory py-12 flex flex-col justify-center"
              >
                <WishesWall 
                  playButtonSound={playButtonSound} 
                  openMessageModal={openMessageModal}
                />
                
                {/* Bouton pour aller à la page suivante */}
                <motion.button
                  className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-pale-gold text-white shadow-lg flex items-center justify-center z-30"
                  onClick={() => navigateToPage('fireworks')}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(230, 190, 138, 0.7)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </motion.div>
            )}
            
            {/* Page Feux d'Artifice */}
            {currentPage === 'fireworks' && (
              <motion.div
                key="fireworks"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                className="min-h-screen relative overflow-hidden bg-gradient-to-b from-ivory to-celestial-blue py-12 flex flex-col justify-center"
              >
                <Fireworks 
                  playButtonSound={playButtonSound} 
                  playMusic={changeBackgroundMusic}
                  openMessageModal={openMessageModal}
                />
                
                {/* Footer */}
                <footer className="py-8 text-center text-pale-gold bg-transparent mt-auto">
                  <p className="font-cursive text-xl">
                    Joyeux Anniversaire, Fidèle !
                  </p>
                  <p className="text-sm mt-2">
                    Avec admiration, Mathias ❤️
                  </p>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default App