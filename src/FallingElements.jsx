// src/FallingElements.jsx
import React, { useState, useEffect } from 'react';

const FallingElements = ({ 
  elementCount = 25,
  elements = ['🌺', '🌸', '🌼', '🍂', '🌿', '🍀', '🌻', '🍃', '🌹', '🌷'],
  minSize = 20,
  maxSize = 40,
  minDuration = 5,
  maxDuration = 15,
  minDelay = 0,
  maxDelay = 5,
}) => {
  const [fallingItems, setFallingItems] = useState([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < elementCount; i++) {
      items.push({
        id: i,
        element: elements[Math.floor(Math.random() * elements.length)],
        left: `${Math.random() * 100}%`,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: minDuration + Math.random() * (maxDuration - minDuration),
        delay: minDelay + Math.random() * (maxDelay - minDelay),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        swayAmount: 30 + Math.random() * 50,
      });
    }
    setFallingItems(items);
  }, [elementCount, elements, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay]);

  // Style global nécessaire pour l'animation
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(-10%) rotate(0deg);
        }
        50% {
          transform: translateY(50vh) translateX(calc(var(--sway-amount) * sin(var(--rotation-speed) * 3.14rad))) rotate(calc(1turn * var(--rotation-speed)));
        }
        100% {
          transform: translateY(105vh) translateX(0) rotate(calc(2turn * var(--rotation-speed)));
        }
      }
      
      .animate-float {
        animation-name: float;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {fallingItems.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float"
          style={{
            left: item.left,
            top: '-5%',
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotation}deg)`,
            '--sway-amount': `${item.swayAmount}px`,
            '--rotation-speed': item.rotationSpeed,
          }}
        >
          {item.element}
        </div>
      ))}
    </div>
  );
};

// Création des thèmes préexistants adaptés au contexte
export const FlowerParticles = () => {
  return <FallingElements 
    elements={['🌺', '🌸', '🌼', '🌻', '🌷', '🌹', '💐', '🌱', '🌿']} 
    elementCount={20}
    minDuration={8}
    maxDuration={15}
  />;
};

export const StarParticles = () => {
  return <FallingElements 
    elements={['✨', '⭐', '🌟', '💫', '⚡', '✦', '✧']} 
    elementCount={30}
    minSize={10}
    maxSize={25}
    minDuration={6}
    maxDuration={12}
  />;
};

export const ConfettiParticles = () => {
  // Utiliser des caractères qui ressemblent à des confettis
  return <FallingElements 
    elements={['🎉', '🎊', '🥳', '🎵', '🎶', '🎈', '🎁']} 
    elementCount={40}
    minSize={15}
    maxSize={30}
    minDuration={4}
    maxDuration={10}
  />;
};

export const AutumnParticles = () => {
  return <FallingElements 
    elements={['🍂', '🍁', '🍃', '🌰', '🍄']} 
    elementCount={25}
    minDuration={7}
    maxDuration={14}
  />;
};

export const WinterParticles = () => {
  return <FallingElements 
    elements={['❄️', '☃️', '⛄', '❅', '❆', '🌨️']} 
    elementCount={35}
    minDuration={9}
    maxDuration={16}
  />;
};

export const FruitsParticles = () => {
  return <FallingElements 
    elements={['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑']} 
    elementCount={20}
    minDuration={7}
    maxDuration={13}
  />;
};

export const SpaceParticles = () => {
  return <FallingElements 
    elements={['🌟', '⭐', '✨', '💫', '🌠', '🌌', '🪐', '🌑', '🌓', '🌕']} 
    elementCount={25}
    minDuration={10}
    maxDuration={18}
  />;
};

// Composant d'accueil qui combine plusieurs effets de particules
const WelcomeParticles = () => (
  <div className="particles-container">
    <StarParticles />
    <FlowerParticles />
    <ConfettiParticles />
  </div>
);

export default WelcomeParticles;