// src/AudioHandler.js
import { Howl, Howler } from 'howler'
import { useEffect, useState, useRef } from 'react'
import welcomeMusic from './assets/music-box-choir-35582.mp3';
import typeSound from './assets/happy-birthday-155461.mp3';
import buttonSound from './assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3';
import celebrationMusic from './assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3';; // Utilisons un fichier existant pour la célébration

const useAudioHandler = (initialEnabled = false) => {
  const [soundEnabled, setSoundEnabled] = useState(initialEnabled)
  const [currentMusic, setCurrentMusic] = useState(null)
  const musicRef = useRef(null)
  const typeSoundRef = useRef(null)
  const buttonSoundRef = useRef(null)
  const birthdaySongRef = useRef(null)
  const celebrationMusicRef = useRef(null) // Nouvelle référence pour la musique de célébration

  useEffect(() => {
    // Musique d'accueil
    musicRef.current = new Howl({
      src: [welcomeMusic],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.5
    })
    
    // Son de frappe pour la machine à écrire
    typeSoundRef.current = new Howl({
      src: [typeSound],
      volume: 0.1,
      sprite: { type: [0, 50] }
    })
    
    // Son de bouton
    buttonSoundRef.current = new Howl({
      src: [buttonSound],
      volume: 0.3,
      sprite: { click: [0, 300] }
    })
    
    // Chanson "Joyeux Anniversaire" pour la finale
    birthdaySongRef.current = new Howl({
      src: [typeSound], // Utilisons directement le fichier importé
      html5: true,
      loop: true,
      volume: 0.6
    })
    
    // Musique de célébration
    celebrationMusicRef.current = new Howl({
      src: [celebrationMusic], // Utilisons directement le fichier importé
      html5: true,
      loop: true,
      volume: 0.5
    })
    
    return () => {
      // Nettoyage
      if (musicRef.current) musicRef.current.stop()
      if (typeSoundRef.current) typeSoundRef.current.stop()
      if (buttonSoundRef.current) buttonSoundRef.current.stop()
      if (birthdaySongRef.current) birthdaySongRef.current.stop()
      if (celebrationMusicRef.current) celebrationMusicRef.current.stop()
    }
  }, [])

  // Contrôle du son en fonction de l'état soundEnabled
  useEffect(() => {
    if (musicRef.current) {
      if (soundEnabled && currentMusic === 'welcome') {
        musicRef.current.play()
      } else {
        musicRef.current.pause()
      }
    }
    
    if (birthdaySongRef.current) {
      if (soundEnabled && currentMusic === 'birthday') {
        birthdaySongRef.current.play()
      } else {
        birthdaySongRef.current.pause()
      }
    }
    
    if (celebrationMusicRef.current) {
      if (soundEnabled && currentMusic === 'celebration') {
        celebrationMusicRef.current.play()
      } else {
        celebrationMusicRef.current.pause()
      }
    }
  }, [soundEnabled, currentMusic])

  // Jouer le son de frappe
  const playTypeSound = () => {
    if (soundEnabled && typeSoundRef.current) typeSoundRef.current.play('type')
  }
  
  // Jouer le son de bouton
  const playButtonSound = () => {
    if (soundEnabled && buttonSoundRef.current) buttonSoundRef.current.play('click')
  }
  
  // Jouer la musique d'accueil
  const playWelcomeMusic = () => {
    stopAllMusic()
    setCurrentMusic('welcome')
    if (soundEnabled && musicRef.current) musicRef.current.play()
  }
  
  // Arrêter toutes les musiques
  const stopAllMusic = () => {
    if (musicRef.current) musicRef.current.stop()
    if (birthdaySongRef.current) birthdaySongRef.current.stop()
    if (celebrationMusicRef.current) celebrationMusicRef.current.stop()
    setCurrentMusic(null)
  }
  
  // Changer la musique de fond
  const changeBackgroundMusic = name => {
    stopAllMusic()
    
    if (name === 'birthday') {
      // Jouer la chanson "Joyeux Anniversaire"
      setCurrentMusic('birthday')
      if (soundEnabled && birthdaySongRef.current) birthdaySongRef.current.play()
    } else if (name === 'celebration') {
      // Jouer la musique festive
      setCurrentMusic('celebration')
      if (soundEnabled && celebrationMusicRef.current) celebrationMusicRef.current.play()
    } else {
      // Jouer la musique d'accueil par défaut
      setCurrentMusic('welcome')
      if (soundEnabled && musicRef.current) musicRef.current.play()
    }
  }

  return {
    soundEnabled,
    setSoundEnabled,
    playTypeSound,
    playButtonSound,
    playWelcomeMusic,
    stopAllMusic,
    changeBackgroundMusic
  }
}

export default useAudioHandler