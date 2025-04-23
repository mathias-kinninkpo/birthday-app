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
import { motion } from 'framer-motion'

// Enregistrer les plugins GSAP
gsap.registerPlugin(Flip)

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('fleurs')
  const [typingCompleted, setTypingCompleted] = useState(false)
  const titleRef = useRef(null)
  const ageRef = useRef(null)
  const buttonRef = useRef(null)

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
  } = useAudioHandler(true)

  // Débloquer AudioContext au premier clic
  useEffect(() => {
    const unlock = () => {
      if (window.Howler?.ctx?.state === 'suspended') {
        window.Howler.ctx.resume()
      }
      document.body.removeEventListener('click', unlock)
    }
    document.body.addEventListener('click', unlock)
  }, [])

  // Commencer la musique d'accueil
  useEffect(() => {
    if (showWelcome) playWelcomeMusic()
  }, [showWelcome, playWelcomeMusic])

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

  // Transition vers le contenu principal
  const enterExperience = () => {
    playButtonSound()
    changeBackgroundMusic('celebration')
    gsap.to('.welcome-screen', {
      opacity: 1,
      y: -50,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => setShowWelcome(false)
    })
  }

  // Animation immédiate de la carte après l'écran d'accueil
  useEffect(() => {
    if (!showWelcome) {
      // initialisation
      gsap.set('.butterfly-card', { rotateY: -90, opacity: 1 })
      gsap.set('.left-wing, .right-wing', { opacity: 1 })

      // ouverture carte
      gsap.to('.butterfly-card', {
        rotateY: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out(1.7)'
      })
      gsap.to('.left-wing', {
        rotateY: 45,
        opacity: 1,
        duration: 1.2,
        delay: 1
      })
      gsap.to('.right-wing', {
        rotateY: -45,
        opacity: 1,
        duration: 1.2,
        delay: 1
      })

      // machine à écrire pour la citation
      const quoteEl = document.querySelector('.quote-text')
      if (quoteEl) {
        const text = quoteEl.textContent
        quoteEl.textContent = ''
        let j = 0
        const iv = setInterval(() => {
          quoteEl.textContent += text[j++]
          if (j >= text.length) clearInterval(iv)
        }, 50)
      }
    }
  }, [showWelcome])



  return (
    <div className="App">
      {showWelcome ? (
        <div className="welcome-screen h-screen w-full flex flex-col items-center justify-center bg-ivory overflow-hidden relative">
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
            onClick={enterExperience}
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
            Entrez dans la lumière
          </motion.button>

          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="absolute top-4 right-4 p-2 bg-transparent text-pale-gold hover:text-white z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </motion.button>
        </div>
      ) : (
        <div className="main-content bg-gradient-to-b from-ivory to-celestial-blue min-h-screen">
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-ivory to-celestial-blue opacity-20"></div>
            
            {/* Affichage dynamique des particules en fonction du thème */}
            {themes[currentTheme]}

            <div className="card-container perspective-1000 z-30" id="cardContainer">
              <div className="butterfly-card transform-style-preserve-3d">
                <div className="wing left-wing"></div>
                <div className="card-body p-8 bg-ivory border border-pale-gold rounded-lg shadow-lg">
                  <div className="quote-container text-center">
                    <p className="text-xl italic quote-text">
                      « Que la grâce t'enveloppe, Fidèle,<br />
                      et que chaque note du ciel vienne bercer ton cœur. »
                    </p>
                  </div>
                  
                
                </div>
                <div className="wing right-wing"></div>
              </div>
            </div>

            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="absolute top-4 right-4 p-2 bg-transparent text-pale-gold hover:text-white z-10"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </motion.button>
          </section>

          {/* … restante sections … */}
        </div>
      )}
    </div>
  )
}

export default App