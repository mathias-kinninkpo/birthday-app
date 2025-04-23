// src/StarParticles.js
import { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'

export const StarParticles = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const particlesInit = async engine => {
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
        detectRetina: true,
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
          color: { value: ['#FFFFF0', '#E6BE8A', '#FFD700'] },
          move: { direction: 'bottom', enable: true, speed: 2, outModes: { default: 'out' } },
          number: { value: 80, density: { enable: true, area: 800 } },
          opacity: { value: 0.7, animation: { enable: true, speed: 0.3, minimumValue: 0.3 } },
          shape: { type: ['star', 'circle'] },
          size: { value: { min: 1, max: 5 } },
          twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } }
        }
      }}
    />
  )
}

export const FlowerParticles = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const particlesInit = async engine => {
    await loadFull(engine)
    setIsLoaded(true)
  }
  return (
    <Particles
      id="flowerParticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        detectRetina: true,
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 25, density: { enable: true, area: 1000 } },
          move: { direction: 'bottom', enable: true, random: true, speed: { min: 1, max: 3 } },
          opacity: { value: 0.8, animation: { enable: true, speed: 0.2, minimumValue: 0.4 } },
          rotate: { animation: { enable: true, speed: 5 }, direction: 'random', value: { min: 0, max: 360 } },
          shape: {
            type: ['character'],
            character: {
              value: ['❀','✿','❁','✾','✽','🌺','🌸','🌼','🍂','🌿'],
              font: 'Verdana',
              weight: '400',
              fill: true
            }
          },
          size: { value: { min: 10, max: 20 } },
          wobble: { enable: true, distance: 10, speed: 5 }
        }
      }}
    />
  )
}

export const ConfettiParticles = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const particlesInit = async engine => {
    await loadFull(engine)
    setIsLoaded(true)
  }
  return (
    <Particles
      id="confettiParticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        detectRetina: true,
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
          color: { value: ['#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF','#E6BE8A'] },
          move: {
            direction: 'bottom',
            enable: true,
            speed: { min: 3, max: 7 },
            random: true,
            gravity: { enable: true, acceleration: 0.5 }
          },
          number: { value: 60, density: { enable: true, area: 1000 } },
          opacity: { value: 1 },
          rotate: { animation: { enable: true, speed: 5 }, direction: 'random', value: { min: 0, max: 360 } },
          shape: { type: ['square','circle','triangle'] },
          size: { value: { min: 3, max: 8 } }
        }
      }}
    />
  )
}

const WelcomeParticles = () => (
  <div className="particles-container">
    <StarParticles />
    <FlowerParticles />
    <ConfettiParticles />
  </div>
)

export default WelcomeParticles
