import { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'

const StarParticles = () => {
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
            value: ["#FFFFF0", "#E6BE8A"],
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
            value: 50,
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
            type: "circle",
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

export default StarParticles