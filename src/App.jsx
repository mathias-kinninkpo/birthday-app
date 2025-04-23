import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import './App.css'
import WelcomeParticles, {StarParticles} from './StarParticles'
import useAudioHandler from './AudioHandler'
import { motion } from 'framer-motion'


// Enregistrer les plugins GSAP
gsap.registerPlugin(Flip);

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const titleRef = useRef(null)
  const ageRef = useRef(null)
  const buttonRef = useRef(null)

  // Utiliser notre gestionnaire audio personnalisé
  const { 
    soundEnabled, 
    setSoundEnabled, 
    playTypeSound, 
    playButtonSound, 
    playWelcomeMusic,
    stopAllMusic,
    changeBackgroundMusic 
  } = useAudioHandler(true);

  // Commencer la musique d'accueil au chargement
  useEffect(() => {
    if (showWelcome) {
      playWelcomeMusic();
    }
    
    // // Nettoyer à la sortie
    // return () => {
    //   stopAllMusic();
    // };
  }, []);

  // Effet pour l'animation de la machine à écrire
  useEffect(() => {
    if (showWelcome && titleRef.current) {
      const title = titleRef.current;
      const text = title.textContent;
      title.textContent = '';
      title.style.opacity = 1;
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          title.textContent += text.charAt(i);
          if (soundEnabled && i % 3 === 0) {
            playTypeSound();
          }
          i++;
        } else {
          clearInterval(typeInterval);
          
          // Animation de l'âge après que le titre soit complètement affiché
          if (ageRef.current) {
            gsap.fromTo(
              ageRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
            );
          }
          
          // Animation du bouton
          if (buttonRef.current) {
            gsap.fromTo(
              buttonRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, delay: 1 }
            );
          }
          
          // Déclencher les confettis après l'animation du titre
          setTimeout(() => {
            setShowConfetti(true);
          }, 1500);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, [showWelcome, soundEnabled]);

  // Gérer la transition depuis l'écran d'accueil
  const enterExperience = () => {
    // Jouer le son du bouton
    playButtonSound();
    
    // Changer la musique
    changeBackgroundMusic('celebration');
    
    // Animation de transition
    gsap.to('.welcome-screen', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => setShowWelcome(false)
    });
  }

  // Effet pour initialiser et animer la carte papillon
  useEffect(() => {
    if (!showWelcome) {
      const cardContainer = document.getElementById('cardContainer');
      if (cardContainer) {
        // Initialiser l'état de la carte
        gsap.set('.butterfly-card', { 
          rotateY: -90,
          opacity: 0
        });
        gsap.set('.wing', { 
          rotateY: 0, 
          opacity: 0 
        });
        
        // Observer quand la carte entre dans le viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animation d'ouverture
              gsap.to('.butterfly-card', {
                rotateY: 0,
                opacity: 1,
                duration: 1.5,
                ease: "back.out(1.7)"
              });
              
              gsap.to('.left-wing', {
                rotateY: 45,
                opacity: 1,
                duration: 1.2,
                delay: 1
              });
              
              gsap.to('.right-wing', {
                rotateY: -45,
                opacity: 1,
                duration: 1.2,
                delay: 1
              });
              
              // Animation du texte lettre par lettre
              const quoteText = document.querySelector('.quote-text');
              if (quoteText) {
                const text = quoteText.innerHTML;
                quoteText.innerHTML = '';
                quoteText.style.opacity = 1;
                
                let i = 0;
                const typeInterval = setInterval(() => {
                  if (i < text.length) {
                    quoteText.innerHTML += text.charAt(i);
                    if (soundEnabled && text.charAt(i) !== ' ' && i % 5 === 0) {
                      playTypeSound();
                    }
                    i++;
                  } else {
                    clearInterval(typeInterval);
                  }
                }, 50);
              }
              
              // Désinscrire après l'animation
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        
        observer.observe(cardContainer);
        
        return () => {
          if (cardContainer) observer.unobserve(cardContainer);
        };
      }
    }
  }, [showWelcome, soundEnabled]);

  return (
    <div className="App">
      {showWelcome ? (
        // Écran d'accueil amélioré
        <div className="welcome-screen h-screen w-full flex flex-col items-center justify-center bg-ivory overflow-hidden relative">
          {/* Particules d'arrière-plan améliorées */}
          <WelcomeParticles />
          
          {/* Titre avec animation machine à écrire */}
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-6xl text-pale-gold font-cursive mb-4 relative z-10 typewriter-text text-center px-4"
          >
            Joyeux Anniversaire, Fidèle !
          </h1>
          
          {/* Animation 3D pour l'âge - corrigé pour être sur une seule ligne */}
          <div className="age-3d-container mb-8 perspective-1000 z-10 w-full text-center">
            <motion.div 
              ref={ageRef}
              className="text-8xl md:text-9xl font-bold text-pale-gold inline-block whitespace-nowrap"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              23 ans
            </motion.div>
          </div>
          
          {/* Bouton amélioré avec effet de pulsation */}
          <motion.button 
            ref={buttonRef}
            onClick={enterExperience}
            className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:scale-110 transition-transform duration-300 button-glow z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0px 0px 8px 2px rgba(230, 190, 138, 0.3)", "0px 0px 16px 4px rgba(230, 190, 138, 0.6)", "0px 0px 8px 2px rgba(230, 190, 138, 0.3)"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Entrez dans la lumière
          </motion.button>
          
          {/* Bouton son amélioré */}
          <motion.button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="absolute top-4 right-4 p-2 bg-transparent text-pale-gold hover:text-white z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? (
              <span className="text-2xl">🔊</span>
            ) : (
              <span className="text-2xl">🔇</span>
            )}
          </motion.button>
        </div>
      ) : (
        // Contenu principal
        <div className="main-content">
          {/* Section 2: Carte Gospel-Romantique */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-ivory to-celestial-blue opacity-20"></div>
            <StarParticles />
            
            <div className="card-container" id="cardContainer">
              <div className="butterfly-card">
                {/* Aile gauche */}
                <div className="wing left-wing"></div>
                
                {/* Corps central */}
                <div className="card-body p-8 bg-ivory border border-pale-gold rounded-lg shadow-lg">
                  <div className="quote-container text-center">
                    <p className="text-xl italic quote-text">
                      « Que la grâce t'enveloppe, Fidèle,<br />
                      et que chaque note du ciel vienne bercer ton cœur. »
                    </p>
                  </div>
                </div>
                
                {/* Aile droite */}
                <div className="wing right-wing"></div>
              </div>
            </div>
            
            {/* Bouton son persistant */}
            <motion.button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className="absolute top-4 right-4 p-2 bg-transparent text-pale-gold hover:text-white z-10"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? (
                <span className="text-2xl">🔊</span>
              ) : (
                <span className="text-2xl">🔇</span>
              )}
            </motion.button>
          </section>

          {/* Section 3: Galerie de Souvenirs (à compléter) */}
          <section className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-ivory to-pale-gold bg-opacity-20 relative">
            <h2 className="text-4xl md:text-5xl font-cursive text-center mb-12 text-pale-gold">
              Une année de souvenirs précieux
            </h2>
            
            {/* Placeholder pour la galerie - à compléter avec les vraies photos */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(index => (
                <motion.div 
                  key={index}
                  className="bg-ivory p-2 rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: Math.random() * 5 - 2.5 }}
                >
                  <div className="bg-pale-gold bg-opacity-20 h-48 w-full flex items-center justify-center">
                    <p className="text-center text-pale-gold font-cursive text-xl">
                      Souvenir {index}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Autres sections à implémenter */}
          {/* Section 4: Timeline */}
          {/* Section 5: Mur de Vœux */}
          {/* Section 6: Surprise Finale */}
        </div>
      )}
    </div>
  )
}

export default App