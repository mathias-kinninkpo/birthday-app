// src/Fireworks.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Fireworks = ({ playButtonSound, playMusic, openMessageModal }) => {
  const [showFireworks, setShowFireworks] = useState(true); // Activé par défaut
  // Mode calme activé par défaut
  const [calmMode, setCalmMode] = useState(true);
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const cakeRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

  // Initialisation de Three.js
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Créer une scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000022);
    
    // Créer une caméra
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5;
    
    // Créer un renderer WebGL
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Nettoyer le conteneur avant d'ajouter le canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    
    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Ajouter gâteau d'anniversaire
    createCake();
    
    // Redimensionner le canvas quand la fenêtre change de taille
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotation douce du gâteau
      if (cakeRef.current) {
        cakeRef.current.rotation.y += 0.005;
      }
      
      // Mettre à jour les feux d'artifice
      updateFireworks();
      
      // Rendu
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      fireworksRef.current = [];
      particlesRef.current = [];
    };
  }, [showFireworks]);
  
  // Lancer la musique "Joyeux Anniversaire" au chargement
  useEffect(() => {
    if (showFireworks && playMusic) {
      playMusic('birthday');
    }
  }, [showFireworks, playMusic]);
  
  // Créer le gâteau 3D
  const createCake = () => {
    if (!sceneRef.current) return;
    
    // Groupe pour le gâteau
    const cakeGroup = new THREE.Group();
    cakeRef.current = cakeGroup;
    
    // Base du gâteau
    const cakeGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const cakeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xF5EEE6,
      specular: 0xffffff,
      shininess: 30
    });
    const cake = new THREE.Mesh(cakeGeometry, cakeMaterial);
    cakeGroup.add(cake);
    
    // Glaçage
    const icingGeometry = new THREE.TorusGeometry(1, 0.1, 16, 32);
    const icingMaterial = new THREE.MeshPhongMaterial({ color: 0xE6BE8A });
    const icing = new THREE.Mesh(icingGeometry, icingMaterial);
    icing.position.y = 0.25;
    icing.rotation.x = Math.PI / 2;
    cakeGroup.add(icing);
    
    // Bougies
    const candlePositions = [
      { x: 0, y: 0.25, z: 0 },
      { x: 0.5, y: 0.25, z: 0.5 },
      { x: -0.5, y: 0.25, z: 0.5 },
      { x: 0.5, y: 0.25, z: -0.5 },
      { x: -0.5, y: 0.25, z: -0.5 }
    ];
    
    candlePositions.forEach((position, index) => {
      // Bougie
      const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
      const candleColors = [0xffccaa, 0xffddaa, 0xffffcc];
      const candleMaterial = new THREE.MeshPhongMaterial({ 
        color: candleColors[index % candleColors.length] 
      });
      const candle = new THREE.Mesh(candleGeometry, candleMaterial);
      candle.position.set(position.x, position.y + 0.2, position.z);
      cakeGroup.add(candle);
      
      // Flamme
      const flameGeometry = new THREE.SphereGeometry(0.07, 16, 8);
      const flameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffaa33,
        transparent: true,
        opacity: 0.8
      });
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.position.set(position.x, position.y + 0.45, position.z);
      flame.scale.y = 1.5;
      
      // Animation des flammes
      const flameIntensity = 0.2 + Math.random() * 0.1;
      const flameSpeed = 0.05 + Math.random() * 0.05;
      let time = Math.random() * Math.PI * 2;
      
      const updateFlame = () => {
        time += flameSpeed;
        const scaleY = 1.5 + Math.sin(time) * flameIntensity;
        flame.scale.set(1, scaleY, 1);
        requestAnimationFrame(updateFlame);
      };
      
      updateFlame();
      cakeGroup.add(flame);
    });
    
    // Ajouter le gâteau à la scène
    cakeGroup.position.y = -1.5;
    sceneRef.current.add(cakeGroup);
  };
  
  // Ajouter un feu d'artifice
  const addFirework = (x, y, z, color) => {
    if (!sceneRef.current || !showFireworks || calmMode) return;
    
    // Position de base
    const fireworkGroup = new THREE.Group();
    fireworkGroup.position.set(x, y, z);
    
    // Nombre de particules
    const particleCount = 100;
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      const size = 0.03 + Math.random() * 0.05;
      const geometry = new THREE.SphereGeometry(size, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: color || new THREE.Color(
          0.5 + Math.random() * 0.5,
          0.5 + Math.random() * 0.5,
          0.3 + Math.random() * 0.3
        ),
        transparent: true,
        opacity: 1
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Vitesse et direction aléatoires
      const speed = {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 2,
        z: -1 + Math.random() * 2
      };
      
      const lifespan = 2 + Math.random() * 1;
      const gravity = -0.05;
      
      particlesRef.current.push({
        mesh: particle,
        speed,
        lifespan,
        gravity,
        initialLife: lifespan,
        group: fireworkGroup
      });
      
      fireworkGroup.add(particle);
    }
    
    sceneRef.current.add(fireworkGroup);
    fireworksRef.current.push(fireworkGroup);
    
    // Supprimer le feu d'artifice après un certain temps
    setTimeout(() => {
      if (sceneRef.current) {
        sceneRef.current.remove(fireworkGroup);
        fireworksRef.current = fireworksRef.current.filter(fw => fw !== fireworkGroup);
      }
    }, 3000);
  };
  
  // Mettre à jour les feux d'artifice
  const updateFireworks = () => {
    // Créer de nouveaux feux d'artifice aléatoirement
    if (showFireworks && !calmMode && Math.random() < 0.03) {
      const x = -8 + Math.random() * 16;
      const y = 0 + Math.random() * 6;
      const z = -5 + Math.random() * 2;
      
      const colors = [0xffffaa, 0xffddaa, 0xffaaaa, 0xaaffaa, 0xaaaaff];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      addFirework(x, y, z, color);
    }
    
    // Mettre à jour les particules
    const particlesToRemove = [];
    
    particlesRef.current.forEach(particle => {
      // Appliquer la vitesse
      particle.mesh.position.x += particle.speed.x * 0.02;
      particle.mesh.position.y += particle.speed.y * 0.02 + particle.gravity;
      particle.mesh.position.z += particle.speed.z * 0.02;
      
      // Diminuer la durée de vie
      particle.lifespan -= 0.016;
      
      // Faire disparaître progressivement
      const opacity = particle.lifespan / particle.initialLife;
      particle.mesh.material.opacity = opacity;
      
      // Marquer pour suppression si la durée de vie est écoulée
      if (particle.lifespan <= 0) {
        particlesToRemove.push(particle);
      }
    });
    
    // Supprimer les particules expirées
    particlesToRemove.forEach(particle => {
      particle.group.remove(particle.mesh);
      particlesRef.current = particlesRef.current.filter(p => p !== particle);
    });
  };
  
  // Basculer entre les modes festif et calme
  const toggleCalmMode = () => {
    if (playButtonSound) playButtonSound();
    setCalmMode(!calmMode);
  };
  
  // Révéler un message spécial d'anniversaire
  const showBirthdayMessage = () => {
    if (playButtonSound) playButtonSound();
    if (openMessageModal) {
      openMessageModal(
        "Joyeux Anniversaire, Fidèle!", 
        "Très chère Fidèle,\n\nEn ce jour béni qui marque tes 23 années de vie, je rends grâce à notre Seigneur pour le privilège de pouvoir te souhaiter un joyeux anniversaire.\n\nBien que nos chemins ne se croisent qu'à l'église et lors des moments d'intercession, j'ai toujours été touché par la douceur de ton esprit et la profondeur de ta foi. Ton respect envers les autres et ton humilité sont des témoignages vivants de ta relation avec le Christ.\n\nPuisse cette nouvelle année de ta vie être remplie de révélations divines et de grâces abondantes. Que le Seigneur te guide dans chacune de tes décisions et qu'Il accomplisse les désirs de ton cœur selon Sa volonté parfaite.\n\nJe prie pour que ta relation avec Dieu s'approfondisse encore davantage, que tes talents s'épanouissent pleinement et que ta lumière continue d'inspirer ceux qui t'entourent.\n\nQue ce message soit peut-être le début d'une amitié fraternelle plus profonde, enracinée dans notre foi commune et notre amour pour le Seigneur.\n\nAvec une sincère admiration et des prières pour ton bonheur,\n\nMathias"
      );
    }
  };

  return (
    <div className="relative py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-cursive text-pale-gold mb-4">
          Célébration Finale
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Un moment spécial pour célébrer tes 23 ans et te souhaiter les plus belles bénédictions du ciel.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.button
            className="px-6 py-3 bg-celestial-blue text-ivory rounded-full hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleCalmMode}
          >
            {calmMode ? "Clique ici" : "Change ici"}
          </motion.button>
          
          <motion.button
            className="px-6 py-3 bg-pale-gold text-ivory rounded-full hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={showBirthdayMessage}
          >
            Message d'anniversaire
          </motion.button>
        </div>
      </motion.div>
      
      {/* Conteneur Three.js pour les feux d'artifice - visible uniquement en mode festif */}
      <div 
        ref={containerRef} 
        className={`w-full h-80 md:h-96 relative ${calmMode ? 'hidden' : ''}`}
      ></div>
      
      {/* Version calme (visible par défaut) */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="py-8 px-6 md:px-12 bg-ivory rounded-lg shadow-xl">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-3xl font-cursive text-pale-gold mb-4">Joyeux 23ème Anniversaire</h3>
            <p className="text-lg md:text-xl mb-6">
              Que cette année t'apporte paix, joie et accomplissements dans tous les domaines de ta vie.
            </p>
            <div className="text-4xl md:text-5xl mb-4">🎂✨</div>
            <p className="text-base md:text-lg text-gray-700 italic">
              "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, 
              projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance."
            </p>
            <p className="text-sm text-gray-500 mt-2">Jérémie 29:11</p>
            
            <div className="mt-8 px-6 py-6 bg-pale-gold bg-opacity-10 rounded-lg border border-pale-gold border-opacity-30">
              <h4 className="text-xl font-cursive text-pale-gold mb-3">Ma prière pour toi</h4>
              <p className="text-gray-700">
                Père Céleste, je Te remercie pour la vie de Fidèle. En ce jour spécial, je Te demande de la couvrir de Ta protection divine et de l'inonder de Tes bénédictions. Guide ses pas selon Ta volonté parfaite et accorde-lui la sagesse pour discerner Ton plan pour sa vie.
              </p>
              <p className="text-gray-700 mt-2">
                Seigneur, qu'en cette 23ème année, sa relation avec Toi s'approfondisse davantage. Que sa foi grandisse et que son témoignage continue d'impacter positivement ceux qui l'entourent. Accorde-lui la force de surmonter les défis et la grâce de rester humble dans ses succès.
              </p>
              <p className="text-gray-700 mt-2">
                Je prie pour son épanouissement dans tous les domaines de sa vie : spirituel, professionnel, relationnel et personnel. Que Ta faveur l'accompagne partout où elle ira.
              </p>
              <p className="text-gray-700 mt-2">
                Au nom puissant de Jésus-Christ, Amen.
              </p>
            </div>
            
            <p className="mt-6 text-right text-pale-gold font-cursive">- Mathias</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fireworks;