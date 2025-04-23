// src/AnimatedTypewriter.jsx
import React, { useState, useEffect, useRef } from 'react';

const AnimatedTypewriter = ({ 
  text = "Joyeux Anniversaire, Fidèle !",
  className = "text-4xl md:text-6xl text-pale-gold font-cursive mb-4 relative z-10 text-center px-4",
  typingSpeed = 100,
  cursorDelay = 500,
  startDelay = 500,
  penColor = "#D4AF37",
  onTypingComplete = () => {},
  playSound = null
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);
  const typeTimeoutRef = useRef(null);
  const animationRef = useRef(null);
  
  // Animation pour le typing
  useEffect(() => {
    // Réinitialiser le texte et les animations à chaque changement de texte source
    setDisplayedText('');
    setIsTyping(true);
    
    // Nettoyer les timeouts précédents
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    if (animationRef.current) clearTimeout(animationRef.current);
    
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        // Ajouter un seul caractère à la fois, sans duplication
        setDisplayedText(text.substring(0, currentIndex + 1));
        
        // Jouer le son de frappe si disponible (tous les 3 caractères)
        if (playSound && currentIndex % 3 === 0) {
          playSound();
        }
        
        currentIndex++;
        
        // Calculer la position du stylo
        if (textRef.current) {
          const textWidth = textRef.current.offsetWidth;
          const progress = currentIndex / text.length;
          
          setPenPosition({
            x: Math.min(textWidth * progress, textWidth),
            y: 0
          });
        }
        
        // Programmer le prochain caractère
        typeTimeoutRef.current = setTimeout(typeNextChar, typingSpeed);
      } else {
        setIsTyping(false);
        animationRef.current = setTimeout(() => {
          onTypingComplete();
        }, 500);
      }
    };
    
    // Lancer l'animation après le délai initial
    typeTimeoutRef.current = setTimeout(typeNextChar, startDelay);
    
    // Nettoyage à la désinstallation du composant
    return () => {
      if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
      if (animationRef.current) clearTimeout(animationRef.current);
      setIsTyping(false);
    };
  }, [text, typingSpeed, startDelay, onTypingComplete, playSound]);
  
  return (
    <div className="relative inline-block">
      {/* Le conteneur du texte */}
      <h1 
        className={`${className} relative`}
        ref={textRef}
      >
        {displayedText}
        {isTyping && (
          <span className="animate-blink">|</span>
        )}
      </h1>
      
      {/* Le stylo animé */}
      {isTyping && (
        <div 
          className="absolute pointer-events-none z-20 transform -translate-y-1/2"
          style={{
            left: `${penPosition.x + 8}px`,
            top: `${penPosition.y}px`,
            transform: 'rotate(45deg) translateY(-100%)',
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className="animate-pen-writing"
          >
            <path 
              d="M17.6 3.6c-.4.4-.8 1.2-.8 1.7 0 .6-.7 1.9-1.7 2.8-.9 1-2.1 2.5-2.6 3.3-.6.9-1.3 1.6-1.7 1.6-.4 0-1.2.7-1.9 1.5-.6.8-1.5 1.5-2 1.5s-1.4.4-2 1c-.5.5-1.3 1-1.7 1-.4 0-.7.4-.7.9 0 .4-.5 1.1-1 1.4-.6.4-1 1.3-1 2 0 1 .4 1.4 1.7 1.1.9-.1 2-.8 2.3-1.4.3-.6 1.2-1.3 2-1.6.8-.3 1.4-.9 1.4-1.3 0-.5.9-1.2 2-1.5 1.1-.4 2-1.1 2-1.6 0-.5.6-.9 1.3-.9.7 0 2.2-.9 3.3-2 1.1-1.1 2.9-2.4 4-2.9 1.1-.5 2.1-1.3 2.2-1.7.1-.5.2-1.3.3-1.9.1-.5-.3-1.4-.9-1.9-.5-.6-1.4-1-2-1-.5 0-1.4.5-1.9 1.1z" 
              fill={penColor} 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AnimatedTypewriter;