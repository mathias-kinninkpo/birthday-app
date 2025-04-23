// src/AudioHandler.js
import { Howl, Howler } from 'howler'
import { useEffect, useState, useRef } from 'react'

const useAudioHandler = (initialEnabled = true) => {
  const [soundEnabled, setSoundEnabled] = useState(initialEnabled)
  const [currentMusic, setCurrentMusic] = useState(null)
  const musicRef = useRef(null)
  const typeSoundRef = useRef(null)
  const buttonSoundRef = useRef(null)

  useEffect(() => {
    musicRef.current = new Howl({
      src: ['/src/assets/music-box-choir-35582.mp3'],
      html5: true,      // <-- force HTML5 for autoplay
      autoplay: true,
      loop: true,
      volume: 0.5
    })
    typeSoundRef.current = new Howl({
      src: ['/src/assets/happy-birthday-155461.mp3'],
      volume: 0.1,
      sprite: { type: [0, 50] }
    })
    buttonSoundRef.current = new Howl({
      src: ['/src/assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3'],
      volume: 0.3,
      sprite: { click: [0, 300] }
    })
    return () => {
      musicRef.current.stop()
      typeSoundRef.current.stop()
      buttonSoundRef.current.stop()
    }
  }, [])

  useEffect(() => {
    if (musicRef.current) {
      if (soundEnabled) {
        musicRef.current.play()
      } else {
        musicRef.current.pause()
      }
    }
  }, [soundEnabled])

  const playTypeSound = () => {
    if (soundEnabled) typeSoundRef.current.play('type')
  }
  const playButtonSound = () => {
    if (soundEnabled) buttonSoundRef.current.play('click')
  }
  const playWelcomeMusic = () => {
    setCurrentMusic('welcome')
    if (soundEnabled) musicRef.current.play()
  }
  const stopAllMusic = () => {
    musicRef.current.stop()
    setCurrentMusic(null)
  }
  const changeBackgroundMusic = name => {
    musicRef.current.stop()
    let src = '/src/assets/music-box-choir-35582.mp3'
    if (name === 'celebration') src = '/src/assets/play-time-fun-upbeat-gaming-birthday-music-259703.mp3'
    musicRef.current = new Howl({ src: [src], loop: true, volume: 0.5, autoplay: true, html5: true })
    setCurrentMusic(name)
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
