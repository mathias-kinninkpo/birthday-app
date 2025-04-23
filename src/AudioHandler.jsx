import { Howl } from 'howler';
import { useEffect, useState, useRef } from 'react';

// Gestionnaire audio pour l'application
const useAudioHandler = (initialEnabled = true) => {
  const [soundEnabled, setSoundEnabled] = useState(initialEnabled);
  const [currentMusic, setCurrentMusic] = useState(null);
  const musicRef = useRef(null);
  const typeSoundRef = useRef(null);
  const buttonSoundRef = useRef(null);
  
  // Initialiser les sons au chargement
  useEffect(() => {
    // Musique d'ambiance - boîte à musique douce
    musicRef.current = new Howl({
      src: ['/src/assets/music-box-choir-35582.mp3'],
      loop: true,
      volume: 0.5,
      autoplay: false,
    });
    
    // Son de machine à écrire
    typeSoundRef.current = new Howl({
      src: ['/src/assets/happy-birthday-155461.mp3'],
      volume: 0.1,
      sprite: {
        type: [0, 50]
      }
    });
    
    // Son de bouton
    buttonSoundRef.current = new Howl({
      src: ['/src/assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3'],
      volume: 0.3,
      sprite: {
        click: [0, 300]
      }
    });
    
    return () => {
      // Nettoyer les sons au démontage
      if (musicRef.current) musicRef.current.stop();
      if (typeSoundRef.current) typeSoundRef.current.stop();
      if (buttonSoundRef.current) buttonSoundRef.current.stop();
    };
  }, []);
  
  // Gestion de l'activation/désactivation du son
  useEffect(() => {
    if (musicRef.current) {
      if (soundEnabled) {
        if (currentMusic === 'welcome') {
          musicRef.current.play();
        }
      } else {
        musicRef.current.pause();
      }
    }
  }, [soundEnabled, currentMusic]);
  
  // Fonctions pour jouer les sons
  const playTypeSound = () => {
    if (soundEnabled && typeSoundRef.current) {
      typeSoundRef.current.play('type');
    }
  };
  
  const playButtonSound = () => {
    if (soundEnabled && buttonSoundRef.current) {
      buttonSoundRef.current.play('click');
    }
  };
  
  const playWelcomeMusic = () => {
    if (soundEnabled && musicRef.current) {
      setCurrentMusic('welcome');
      musicRef.current.play();
    }
  };
  
  const stopAllMusic = () => {
    if (musicRef.current) {
      musicRef.current.stop();
      setCurrentMusic(null);
    }
  };
  
  const changeBackgroundMusic = (musicName) => {
    if (soundEnabled && musicRef.current) {
      // Arrêter la musique actuelle
      musicRef.current.stop();
      
      // Charger la nouvelle musique en fonction du nom
      let src = '/src/assets/music-box-choir-35582.mp3'; // Par défaut
      
      if (musicName === 'celebration') {
        src = '/src/assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3';
      } else if (musicName === 'birthday') {
        src = '/src/assets/happy-birthday-155461.mp3';
      }
      
      // Créer une nouvelle instance avec la source mise à jour
      musicRef.current = new Howl({
        src: [src],
        loop: true,
        volume: 0.5,
        autoplay: true,
      });
      
      setCurrentMusic(musicName);
    }
  };
  
  return {
    soundEnabled,
    setSoundEnabled,
    playTypeSound,
    playButtonSound,
    playWelcomeMusic,
    stopAllMusic,
    changeBackgroundMusic
  };
};

export default useAudioHandler;