import { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'

// Configuration de base des particules - étoiles
export const StarParticles = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const particlesInit = async (engine) => {
    await loadFull(engine)
    setIsLoaded(true)
  }

  return (
    <Particles
      id="starParticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#FFFFF0", "#E6BE8A", "#FFD700"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.7,
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.3,
              sync: false
            }
          },
          shape: {
            type: ["star", "circle"],
          },
          size: {
            value: { min: 1, max: 5 },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1
            }
          }
        },
        detectRetina: true,
      }}
    />
  )
}

// Particules de fleurs et feuilles pour une ambiance plus festive
export const FlowerParticles = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="flowerParticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#FF9999", "#FFCC99", "#99FF99", "#9999FF", "#E6BE8A"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: { min: 1, max: 3 },
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 25,
          },
          opacity: {
            value: 0.8,
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.4,
              sync: false
            }
          },
          rotate: {
            animation: {
              enable: true,
              speed: 5,
              sync: false
            },
            direction: "random",
            value: { min: 0, max: 360 }
          },
          shape: {
            type: "char",
            options: {
              char: {
                value: ["❀", "✿", "❁", "✾", "✽", "🌺", "🌸", "🌼", "🍂", "🌿"]
              }
            }
          },
          size: {
            value: { min: 10, max: 20 },
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 5
          }
        },
        detectRetina: true,
      }}
    />
  )
}

// Configuration pour des confettis festifs
export const ConfettiParticles = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="confettiParticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#E6BE8A"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: { min: 3, max: 7 },
            straight: false,
            gravity: {
              enable: true,
              acceleration: 0.5
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 60,
          },
          opacity: {
            value: 1,
          },
          rotate: {
            animation: {
              enable: true,
              speed: 5,
              sync: false
            },
            direction: "random",
            value: { min: 0, max: 360 }
          },
          shape: {
            type: ["square", "circle", "triangle"],
          },
          size: {
            value: { min: 3, max: 8 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

// Configuration combinant plusieurs types de particules pour l'écran d'accueil
export const WelcomeParticles = () => {
  const [selectedParticles, setSelectedParticles] = useState('all')
  
  return (
    <div className="particles-container">
      {(selectedParticles === 'all' || selectedParticles === 'stars') && <StarParticles />}
      {(selectedParticles === 'all' || selectedParticles === 'flowers') && <FlowerParticles />}
      {(selectedParticles === 'all' || selectedParticles === 'confetti') && <ConfettiParticles />}
    </div>
  )
}

export default WelcomeParticles