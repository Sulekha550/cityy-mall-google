import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Play,
  Pause,
  RotateCcw,
  Compass,
  Maximize2,
  Minimize2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Navigation,
} from 'lucide-react';
import { useTheme } from '../utilities/themeContext';

/**
 * 5 Sequential Walkthrough Journey Scenes (Continuous Timeline: 0s to 50s)
 */
export const WALKTHROUGH_SCENES = [
  {
    id: 'entrance',
    number: '01',
    label: 'Mall Entrance',
    title: 'Grand Exterior Plaza & Portals',
    timeRange: [0, 10], // 0% - 20%
    elevation: 'Ground Level · 0.0 m',
    lighting: 'Sunlit Glass Canopy & Champagne Pillars',
    description:
      'Begin outside the luxury exterior entrance, slowly approaching and moving through the polished glass doors into the grand reception portal.',
  },
  {
    id: 'atrium',
    number: '02',
    label: 'Ground Floor Atrium',
    title: 'Soaring Central Architectural Atrium',
    timeRange: [10, 20], // 20% - 40%
    elevation: 'Level 0 · 0.0 m',
    lighting: 'Prismatic Glass Skylight & Soft Lavender Coves',
    description:
      'Glide into the spacious ground-floor atrium, revealing sweeping curved balconies, reflective terrazzo floors, and double-height boutique facades.',
  },
  {
    id: 'escalator',
    number: '03',
    label: 'Escalator Journey',
    title: 'Continuous Architectural Ascent',
    timeRange: [20, 30], // 40% - 60%
    elevation: 'Incline · +30° (0.0 m → 5.2 m)',
    lighting: 'Integrated Step Luminaires & Rose Glow',
    description:
      'Smoothly approach the central glass & champagne escalator, ascending naturally with continuous motion while the atrium void expands below.',
  },
  {
    id: 'first-floor',
    number: '04',
    label: 'First Floor',
    title: 'Mezzanine Fashion Colonnade',
    timeRange: [30, 40], // 60% - 80%
    elevation: 'Level 1 · 5.2 m',
    lighting: 'Curved Balustrade Ambient Arrays',
    description:
      'Arrive at the first floor mezzanine shopping promenade, revealing glass railings, curated fashion houses, and views across the central void.',
  },
  {
    id: 'second-floor',
    number: '05',
    label: 'Second Floor',
    title: 'Upper Panoramic Atrium Deck',
    timeRange: [40, 50], // 80% - 100%
    elevation: 'Level 2 · 9.6 m',
    lighting: '360° Architectural Vault Illumination',
    description:
      'Ascend to the second floor athletic and entertainment promenade, concluding with a wide panoramic sweep of the entire mall architecture.',
  },
];

const TOTAL_DURATION = 50; // 50 seconds for full cinematic journey

export function ContinuousMallWalkthrough3D({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const { theme } = useTheme();

  // Playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // User pointer parallax offset
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const currentTimeRef = useRef(0);
  const isPlayingRef = useRef(true);
  const playbackSpeedRef = useRef(1);

  // Keep refs in sync for the animation loop
  currentTimeRef.current = currentTime;
  isPlayingRef.current = isPlaying;
  playbackSpeedRef.current = playbackSpeed;

  // Active scene
  const activeScene = WALKTHROUGH_SCENES[activeSceneIndex] || WALKTHROUGH_SCENES[0];
  const progressRatio = Math.min(1, Math.max(0, currentTime / TOTAL_DURATION));

  // Switch or Jump to a specific scene
  const handleJumpToScene = useCallback((index) => {
    const scene = WALKTHROUGH_SCENES[index];
    if (!scene) return;
    const targetTime = scene.timeRange[0] + 0.1;
    setCurrentTime(targetTime);
    currentTimeRef.current = targetTime;
    setActiveSceneIndex(index);
    if (videoRef.current && isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      // Map walkthrough time ratio to video duration
      const videoTarget = (targetTime / TOTAL_DURATION) * videoRef.current.duration;
      videoRef.current.currentTime = videoTarget;
    }
  }, []);

  // "Start Mall Walkthrough" - starts from Scene 1
  const handleStartWalkthrough = useCallback(() => {
    setCurrentTime(0);
    currentTimeRef.current = 0;
    setActiveSceneIndex(0);
    setIsPlaying(true);
    isPlayingRef.current = true;
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Toggle play/pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return next;
    });
  }, []);

  // Toggle fullscreen
  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Pointer move for subtle architectural perspective tilt
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  // Video time synchronization & loop listener
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || !isFinite(videoRef.current.duration)) return;
    // Video can smoothly drive background if running
  };

  // =========================================================================
  // Three.js 3D Architectural Walkthrough Scene
  // Zero human figures — Pure Luxury 3D Architecture
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDisposed = false;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 500;
    renderer.setSize(width, height, false);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x151021 : 0xfcf5fa, 0.014);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 200);
    camera.position.set(0, 1.7, 36);

    // Lighting (Warm Champagne + Soft Lavender/Pink Ambient)
    const isDark = theme === 'dark';
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xbda9dc : 0xfff0f7,
      isDark ? 0.9 : 1.25
    );
    scene.add(ambientLight);

    const sunKey = new THREE.DirectionalLight(0xfff7e8, isDark ? 1.4 : 1.8);
    sunKey.position.set(12, 35, 10);
    scene.add(sunKey);

    const lavenderFill = new THREE.DirectionalLight(
      isDark ? 0x9333ea : 0xe9d5ff,
      isDark ? 1.0 : 0.75
    );
    lavenderFill.position.set(-15, 20, -10);
    scene.add(lavenderFill);

    const pinkSpot = new THREE.PointLight(0xf472b6, isDark ? 1.8 : 1.4, 60);
    pinkSpot.position.set(0, 8, 0);
    scene.add(pinkSpot);

    // -----------------------------------------------------------------------
    // BUILD 3D ARCHITECTURAL WALKTHROUGH ENVIRONMENT
    // -----------------------------------------------------------------------
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Materials
    const marbleGroundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x221832 : 0xfcf5fa,
      roughness: 0.28,
      metalness: 0.35,
    });

    const champagneMetalMat = new THREE.MeshStandardMaterial({
      color: 0xdfc29c,
      roughness: 0.25,
      metalness: 0.85,
    });

    const glassBalustradeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8b4fe,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.88,
      transparent: true,
      opacity: 0.45,
      ior: 1.5,
    });

    const neonPinkMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
    });

    const neonLavenderMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
    });

    const wallIvoryMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x281c3c : 0xf9eff7,
      roughness: 0.65,
      metalness: 0.1,
    });

    // 1. Ground Floor Plane (Entrance Plaza to Atrium)
    const floorGeo = new THREE.PlaneGeometry(36, 120, 24, 60);
    floorGeo.rotateX(-Math.PI / 2);
    floorGeo.translate(0, 0, -20);
    const floorMesh = new THREE.Mesh(floorGeo, marbleGroundMat);
    worldGroup.add(floorMesh);

    // Center polished decorative inlay runner (Pink/Violet reflective stripe)
    const runnerGeo = new THREE.PlaneGeometry(4.5, 120);
    runnerGeo.rotateX(-Math.PI / 2);
    runnerGeo.translate(0, 0.02, -20);
    const runnerMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x4c1d95 : 0xfce7f3,
      roughness: 0.18,
      metalness: 0.5,
    });
    const runnerMesh = new THREE.Mesh(runnerGeo, runnerMat);
    worldGroup.add(runnerMesh);

    // 2. Entrance Portal Arches (Scene 1: z = 32 to z = 18)
    const entranceArchGroup = new THREE.Group();
    entranceArchGroup.position.set(0, 0, 26);
    worldGroup.add(entranceArchGroup);

    // Entrance Canopy
    const canopyGeo = new THREE.BoxGeometry(20, 0.4, 14);
    const canopyMesh = new THREE.Mesh(canopyGeo, champagneMetalMat);
    canopyMesh.position.set(0, 5.8, 0);
    entranceArchGroup.add(canopyMesh);

    // Revolving / Glass Portal Door Frames
    for (let side = -1; side <= 1; side += 2) {
      const pillarGeo = new THREE.CylinderGeometry(0.35, 0.35, 5.8, 16);
      const pillarMesh = new THREE.Mesh(pillarGeo, champagneMetalMat);
      pillarMesh.position.set(side * 5.5, 2.9, 2);
      entranceArchGroup.add(pillarMesh);

      // Glass panels
      const glassDoorGeo = new THREE.BoxGeometry(4.8, 4.8, 0.15);
      const glassDoorMesh = new THREE.Mesh(glassDoorGeo, glassBalustradeMat);
      glassDoorMesh.position.set(side * 2.8, 2.5, 2);
      entranceArchGroup.add(glassDoorMesh);

      // Glowing cove strips above doors
      const coveGeo = new THREE.BoxGeometry(5.2, 0.08, 0.2);
      const coveMesh = new THREE.Mesh(coveGeo, neonLavenderMat);
      coveMesh.position.set(side * 2.8, 5.0, 2.1);
      entranceArchGroup.add(coveMesh);
    }

    // 3. Grand Atrium Colonnade & Balconies (Scene 2: z = 14 to z = -10)
    const atriumGroup = new THREE.Group();
    atriumGroup.position.set(0, 0, 2);
    worldGroup.add(atriumGroup);

    // Soaring Classical/Modern Cylindrical Columns
    const colCount = 6;
    for (let i = 0; i < colCount; i++) {
      const zPos = 12 - i * 6.5;
      for (let side = -1; side <= 1; side += 2) {
        const colGeo = new THREE.CylinderGeometry(0.45, 0.55, 14, 24);
        const colMesh = new THREE.Mesh(colGeo, champagneMetalMat);
        colMesh.position.set(side * 9.2, 7, zPos);
        atriumGroup.add(colMesh);

        // Column capital ring
        const capGeo = new THREE.TorusGeometry(0.65, 0.08, 12, 32);
        capGeo.rotateX(Math.PI / 2);
        const capMesh = new THREE.Mesh(capGeo, neonPinkMat);
        capMesh.position.set(side * 9.2, 13.8, zPos);
        atriumGroup.add(capMesh);
      }
    }

    // Curved First Floor Mezzanine Balcony Rings (Level 1: y = 5.2)
    const balconyGeo1 = new THREE.RingGeometry(8.2, 12.8, 36, 1, Math.PI * 0.15, Math.PI * 0.7);
    balconyGeo1.rotateX(-Math.PI / 2);
    balconyGeo1.translate(0, 5.2, 0);
    const balconyMesh1 = new THREE.Mesh(balconyGeo1, marbleGroundMat);
    atriumGroup.add(balconyMesh1);

    // First Floor Glass Railings (Curved Arc)
    const railingCurve = new THREE.CylinderGeometry(8.2, 8.2, 1.1, 36, 1, true, Math.PI * 0.15, Math.PI * 0.7);
    railingCurve.translate(0, 5.75, 0);
    const railingMesh1 = new THREE.Mesh(railingCurve, glassBalustradeMat);
    atriumGroup.add(railingMesh1);

    // Under-balcony Glowing Lavender Ribbon
    const ledRibbon1 = new THREE.CylinderGeometry(8.22, 8.22, 0.08, 36, 1, true, Math.PI * 0.15, Math.PI * 0.7);
    ledRibbon1.translate(0, 5.15, 0);
    const ledMesh1 = new THREE.Mesh(ledRibbon1, neonLavenderMat);
    atriumGroup.add(ledMesh1);

    // 4. Escalator Structure (Scene 3: Incline from y=0, z=4 to y=5.2, z=-8)
    const escalatorGroup = new THREE.Group();
    escalatorGroup.position.set(0, 0, 0);
    worldGroup.add(escalatorGroup);

    // Escalator side trusses (Incline 30°)
    const trussLen = 14.5;
    const trussAngle = Math.atan2(5.2, 12);
    for (let side = -1; side <= 1; side += 2) {
      const trussGeo = new THREE.BoxGeometry(0.3, 0.9, trussLen);
      const trussMesh = new THREE.Mesh(trussGeo, champagneMetalMat);
      trussMesh.position.set(side * 1.5, 2.6, -2);
      trussMesh.rotation.x = trussAngle;
      escalatorGroup.add(trussMesh);

      // Glass balustrade on escalator
      const escGlassGeo = new THREE.BoxGeometry(0.08, 0.8, trussLen);
      const escGlassMesh = new THREE.Mesh(escGlassGeo, glassBalustradeMat);
      escGlassMesh.position.set(side * 1.5, 3.3, -2);
      escGlassMesh.rotation.x = trussAngle;
      escalatorGroup.add(escGlassMesh);

      // Handrail
      const handrailGeo = new THREE.BoxGeometry(0.18, 0.1, trussLen);
      const handrailMesh = new THREE.Mesh(handrailGeo, champagneMetalMat);
      handrailMesh.position.set(side * 1.5, 3.75, -2);
      handrailMesh.rotation.x = trussAngle;
      escalatorGroup.add(handrailMesh);
    }

    // Escalator Steps (Array of stepped horizontal treads)
    const stepCount = 20;
    const stepsGroup = new THREE.Group();
    escalatorGroup.add(stepsGroup);

    for (let i = 0; i < stepCount; i++) {
      const t = i / stepCount;
      const stepY = t * 5.1;
      const stepZ = 3.8 - t * 11.6;
      const stepGeo = new THREE.BoxGeometry(2.6, 0.14, 0.55);
      const stepMesh = new THREE.Mesh(stepGeo, champagneMetalMat);
      stepMesh.position.set(0, stepY, stepZ);
      stepsGroup.add(stepMesh);

      // Glowing step edge LED
      const stepEdgeGeo = new THREE.BoxGeometry(2.6, 0.04, 0.04);
      const stepEdgeMesh = new THREE.Mesh(stepEdgeGeo, neonPinkMat);
      stepEdgeMesh.position.set(0, stepY + 0.08, stepZ + 0.27);
      stepsGroup.add(stepEdgeMesh);
    }

    // 5. Level 1 Promenade & Storefront Facades (Scene 4: y = 5.2, z = -8 to -22)
    const level1Group = new THREE.Group();
    level1Group.position.set(0, 5.2, -15);
    worldGroup.add(level1Group);

    // Floor platform for Level 1
    const l1FloorGeo = new THREE.BoxGeometry(28, 0.35, 24);
    const l1FloorMesh = new THREE.Mesh(l1FloorGeo, marbleGroundMat);
    l1FloorMesh.position.set(0, -0.18, 0);
    level1Group.add(l1FloorMesh);

    // Boutique Storefront Vitrines along the flanks (Louis Philippe, Levi's, etc.)
    const storeBrands = ['LOUIS PHILIPPE', "LEVI'S STORE", 'ALLEN SOLLY', 'W FOR WOMAN'];
    for (let i = 0; i < 4; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const zOffset = (Math.floor(i / 2) - 0.5) * 10;

      // Vitrine Frame
      const vitrineGeo = new THREE.BoxGeometry(0.3, 3.6, 7.5);
      const vitrineMesh = new THREE.Mesh(vitrineGeo, wallIvoryMat);
      vitrineMesh.position.set(side * 11.5, 1.8, zOffset);
      level1Group.add(vitrineMesh);

      // Large Glass Display Window
      const winGeo = new THREE.BoxGeometry(0.1, 3.2, 6.8);
      const winMesh = new THREE.Mesh(winGeo, glassBalustradeMat);
      winMesh.position.set(side * 11.2, 1.8, zOffset);
      level1Group.add(winMesh);

      // Glowing Marquee Header
      const marqueeGeo = new THREE.BoxGeometry(0.35, 0.45, 6.8);
      const marqueeMesh = new THREE.Mesh(marqueeGeo, champagneMetalMat);
      marqueeMesh.position.set(side * 11.2, 3.7, zOffset);
      level1Group.add(marqueeMesh);

      const signLightGeo = new THREE.BoxGeometry(0.08, 0.1, 6.4);
      const signLightMesh = new THREE.Mesh(signLightGeo, neonLavenderMat);
      signLightMesh.position.set(side * 11.0, 3.7, zOffset);
      level1Group.add(signLightMesh);
    }

    // Upper Escalator (Level 1 to Level 2: y = 5.2, z = -14 to y = 9.6, z = -24)
    const upperEscTrussAngle = Math.atan2(4.4, 10);
    for (let side = -1; side <= 1; side += 2) {
      const uTrussGeo = new THREE.BoxGeometry(0.3, 0.8, 12);
      const uTrussMesh = new THREE.Mesh(uTrussGeo, champagneMetalMat);
      uTrussMesh.position.set(side * 1.5, 7.4, -19);
      uTrussMesh.rotation.x = upperEscTrussAngle;
      worldGroup.add(uTrussMesh);
    }

    // 6. Level 2 Panoramic Vista Deck & Roof Skylight (Scene 5: y = 9.6, z = -24 to -42)
    const level2Group = new THREE.Group();
    level2Group.position.set(0, 9.6, -28);
    worldGroup.add(level2Group);

    const l2FloorGeo = new THREE.BoxGeometry(32, 0.4, 26);
    const l2FloorMesh = new THREE.Mesh(l2FloorGeo, marbleGroundMat);
    l2FloorMesh.position.set(0, -0.2, 0);
    level2Group.add(l2FloorMesh);

    // Curved Panorama Glass Railing overlooking the whole atrium below
    const panoRailingGeo = new THREE.CylinderGeometry(12.5, 12.5, 1.2, 40, 1, true, -Math.PI * 0.4, Math.PI * 0.8);
    panoRailingGeo.translate(0, 0.6, 6);
    const panoRailingMesh = new THREE.Mesh(panoRailingGeo, glassBalustradeMat);
    level2Group.add(panoRailingMesh);

    // Huge Grand Skylight Dome Overhead (Vault at y = 18)
    const domeGeo = new THREE.SphereGeometry(16, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xe2d4ff,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.set(0, 16, -10);
    worldGroup.add(domeMesh);

    // 7. Ambient Glowing Floating Particles (Soft Lavender & Pastel Pink)
    const partCount = 180;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    const partCols = new Float32Array(partCount * 3);

    const pinkColor = new THREE.Color(0xf472b6);
    const lavenderColor = new THREE.Color(0xc084fc);

    for (let i = 0; i < partCount; i++) {
      partPos[i * 3] = (Math.random() - 0.5) * 24;
      partPos[i * 3 + 1] = Math.random() * 14 + 1;
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5;

      const pickColor = Math.random() > 0.5 ? pinkColor : lavenderColor;
      partCols[i * 3] = pickColor.r;
      partCols[i * 3 + 1] = pickColor.g;
      partCols[i * 3 + 2] = pickColor.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partCols, 3));

    const partMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(partGeo, partMat);
    worldGroup.add(particleCloud);

    // -----------------------------------------------------------------------
    // CONTINUOUS CAMERA JOURNEY SPLINE (Interpolating through 5 scenes)
    // -----------------------------------------------------------------------
    const journeyKeyframes = [
      // Scene 1: Entrance Approach & Threshold
      { t: 0.00, pos: new THREE.Vector3(0, 1.7, 35.0), look: new THREE.Vector3(0, 2.4, 18.0) },
      { t: 0.10, pos: new THREE.Vector3(0, 1.7, 26.0), look: new THREE.Vector3(0, 2.5, 10.0) },
      { t: 0.20, pos: new THREE.Vector3(0, 1.7, 18.0), look: new THREE.Vector3(0, 2.6, 4.0) },

      // Scene 2: Ground Floor Atrium
      { t: 0.30, pos: new THREE.Vector3(0.2, 1.75, 11.0), look: new THREE.Vector3(0, 3.8, -4.0) },
      { t: 0.40, pos: new THREE.Vector3(0, 1.7, 4.5), look: new THREE.Vector3(0, 3.2, -8.0) },

      // Scene 3: Escalator Ascent
      { t: 0.48, pos: new THREE.Vector3(0, 2.6, 0.5), look: new THREE.Vector3(0, 4.2, -10.0) },
      { t: 0.55, pos: new THREE.Vector3(0, 4.2, -4.5), look: new THREE.Vector3(0, 5.8, -14.0) },
      { t: 0.60, pos: new THREE.Vector3(0, 5.2, -8.5), look: new THREE.Vector3(0, 6.0, -18.0) },

      // Scene 4: First Floor Mezzanine
      { t: 0.68, pos: new THREE.Vector3(-1.8, 5.2, -12.0), look: new THREE.Vector3(1.5, 5.8, -20.0) },
      { t: 0.75, pos: new THREE.Vector3(-0.5, 5.4, -16.0), look: new THREE.Vector3(0, 7.2, -24.0) },
      { t: 0.80, pos: new THREE.Vector3(0, 6.8, -19.5), look: new THREE.Vector3(0, 9.2, -28.0) },

      // Scene 5: Second Floor Panoramic Vista
      { t: 0.88, pos: new THREE.Vector3(0, 9.6, -25.0), look: new THREE.Vector3(0, 10.2, -32.0) },
      { t: 0.94, pos: new THREE.Vector3(2.5, 9.8, -27.5), look: new THREE.Vector3(-2.0, 9.0, -15.0) },
      { t: 1.00, pos: new THREE.Vector3(0, 10.0, -29.0), look: new THREE.Vector3(0, 8.5, -4.0) },
    ];

    // Spline Interpolation function
    function sampleJourney(normT) {
      const clamped = Math.min(1, Math.max(0, normT));
      // Find bounding interval
      let idx = 0;
      for (let i = 0; i < journeyKeyframes.length - 1; i++) {
        if (clamped >= journeyKeyframes[i].t && clamped <= journeyKeyframes[i + 1].t) {
          idx = i;
          break;
        }
      }
      const k1 = journeyKeyframes[idx];
      const k2 = journeyKeyframes[idx + 1] || k1;
      const span = k2.t - k1.t || 1e-5;
      const localRatio = (clamped - k1.t) / span;
      // Smooth step
      const smooth = localRatio * localRatio * (3 - 2 * localRatio);

      const targetPos = new THREE.Vector3().lerpVectors(k1.pos, k2.pos, smooth);
      const targetLook = new THREE.Vector3().lerpVectors(k1.look, k2.look, smooth);
      return { targetPos, targetLook };
    }

    // Resize handling
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            const rect = entries[0]?.contentRect;
            if (!rect || !rect.width || !rect.height || isDisposed) return;
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height, false);
          })
        : null;
    resizeObserver?.observe(canvas);

    // -----------------------------------------------------------------------
    // MAIN RENDER & ANIMATION LOOP
    // -----------------------------------------------------------------------
    let currentCamPos = new THREE.Vector3().copy(journeyKeyframes[0].pos);
    let currentCamLook = new THREE.Vector3().copy(journeyKeyframes[0].look);

    const renderLoop = (timestamp) => {
      if (isDisposed) return;

      const dt = Math.min(0.1, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      // Progress timeline
      if (isPlayingRef.current) {
        currentTimeRef.current += dt * playbackSpeedRef.current;
        if (currentTimeRef.current >= TOTAL_DURATION) {
          currentTimeRef.current = 0; // Seamless continuous loop
        }
        setCurrentTime(currentTimeRef.current);

        // Update active scene index
        const cur = currentTimeRef.current;
        const newSceneIdx = WALKTHROUGH_SCENES.findIndex(
          (s) => cur >= s.timeRange[0] && cur <= s.timeRange[1]
        );
        if (newSceneIdx !== -1) {
          setActiveSceneIndex(newSceneIdx);
        }
      }

      // Smooth pointer parallax
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.06;

      // Sample camera along the continuous spline
      const normT = currentTimeRef.current / TOTAL_DURATION;
      const { targetPos, targetLook } = sampleJourney(normT);

      // Add gentle architectural perspective sway
      targetPos.x += pointerRef.current.x * 0.45;
      targetPos.y += pointerRef.current.y * 0.25;

      // Interpolate camera smoothly
      currentCamPos.lerp(targetPos, 0.08);
      currentCamLook.lerp(targetLook, 0.08);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamLook);

      // Subtle atmospheric motion
      const timeSec = timestamp * 0.001;
      particleCloud.rotation.y = timeSec * 0.02;

      // Slowly animate escalator treads
      stepsGroup.children.forEach((step, idx) => {
        const offset = ((timeSec * 0.8 + idx * 0.25) % 5.1);
        step.position.y = (idx / stepCount) * 5.1;
      });

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isDisposed = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver?.disconnect();
      renderer.dispose();
      floorGeo.dispose();
      marbleGroundMat.dispose();
      champagneMetalMat.dispose();
      glassBalustradeMat.dispose();
      neonPinkMat.dispose();
      neonLavenderMat.dispose();
      wallIvoryMat.dispose();
      partGeo.dispose();
      partMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#2D1D48]/14 dark:border-white/15 bg-[#151021] text-[#F8F0FA] select-none min-h-[420px] sm:min-h-[520px] lg:min-h-[580px] ${className}`}
      style={isFullscreen ? { minHeight: '100vh' } : undefined}
    >
      {/* -------------------------------------------------------------------
          LAYER 1: CONTINUOUS ARCHITECTURAL MP4 VIDEO BACKGROUND
          Responsive, muted, playsInline, autoPlay (Strictly NO Humans!)
          ------------------------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/mall-architecture.mp4"
          poster="/posters/mall-architecture.webp"
          autoPlay
          muted
          playsInline
          loop
          onLoadedData={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoPlaying(true)}
          onTimeUpdate={handleVideoTimeUpdate}
          className="w-full h-full object-cover opacity-50 dark:opacity-40 transition-opacity duration-1000 scale-105"
        />

        {/* Cinematic Soft Lavender & Champagne Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151021] via-transparent to-[#151021]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#7C3AED]/10 to-[#151021]/85" />
      </div>

      {/* -------------------------------------------------------------------
          LAYER 2: THREE.JS 3D ARCHITECTURAL WALKTHROUGH CANVAS
          Interpolating camera continuously through all 5 scenes
          ------------------------------------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
      />

      {/* -------------------------------------------------------------------
          LAYER 3: TOP CINEMATIC HUD & BRAND HEADER
          ------------------------------------------------------------------- */}
      <div className="relative z-20 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Badge: City Mall 3D Architectural Walkthrough */}
        <div className="flex items-center gap-2.5 bg-black/60 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white">
            CITY MALL · 3D WALKTHROUGH
          </span>
          <span className="hidden sm:inline-block text-[10px] text-white/50 font-mono">
            LIVE 3D SIMULATION
          </span>
        </div>

        {/* Center: Zero Humans Guarantee Pill */}
        <div className="hidden md:flex items-center gap-2 bg-[#7C3AED]/25 backdrop-blur-md px-3 py-1 rounded-full border border-[#C084FC]/30 text-white pointer-events-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5EEAD4]" />
          <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90">
            Pure Architecture · No Human Figures
          </span>
        </div>

        {/* Right: Fullscreen & Speed Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 0.75 : 1))}
            className="px-2.5 py-1 rounded-lg bg-black/55 hover:bg-black/80 border border-white/15 text-[10px] font-mono font-bold text-white/90 transition-colors"
            title="Adjust Camera Dolly Speed"
          >
            {playbackSpeed}x SPEED
          </button>
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-1.5 rounded-lg bg-black/55 hover:bg-black/80 border border-white/15 text-white/90 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          LAYER 4: ACTIVE SCENE TELEMETRY CARD (Overlaid Center/Left)
          ------------------------------------------------------------------- */}
      <div className="relative z-20 px-4 sm:px-8 mt-2 max-w-xl pointer-events-none">
        <div className="bg-black/65 dark:bg-black/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl space-y-2 pointer-events-auto transition-all duration-500">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#F472B6]">
              <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>
                SCENE {activeScene.number} OF 05 · {activeScene.label}
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded">
              {activeScene.elevation}
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
            {activeScene.title}
          </h2>

          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
            {activeScene.description}
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] font-mono text-[#E9D5FF] border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-[#EC4899]" />
              <span>{activeScene.lighting}</span>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
          LAYER 5: BOTTOM CONTROLS, 5-SCENE PROGRESS BAR & START BUTTON
          ------------------------------------------------------------------- */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent space-y-3 pointer-events-auto">
        {/* Subtle Progress Bar */}
        <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden relative cursor-pointer group">
          <div
            className="h-full bg-gradient-to-r from-[#C084FC] via-[#EC4899] to-[#F472B6] rounded-full transition-all duration-150"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>

        {/* 5 Milestone Segment Chips (Click to smoothly jump) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
          {WALKTHROUGH_SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleJumpToScene(idx)}
                className={`group px-2.5 py-1.5 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED]/80 to-[#DB2777]/80 border-[#F472B6] text-white shadow-lg -translate-y-0.5'
                    : 'bg-black/50 hover:bg-black/80 border-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                  <span className={isActive ? 'text-[#FCE7F3]' : 'text-white/50'}>
                    {scene.number}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold truncate leading-tight mt-0.5">
                  {scene.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Control Bar: "Start Mall Walkthrough" Button & Transport */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            {/* Prominent Requested Button: "Start Mall Walkthrough" */}
            <button
              type="button"
              onClick={handleStartWalkthrough}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#DB2777] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Mall Walkthrough</span>
            </button>

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              title={isPlaying ? 'Pause Walkthrough' : 'Resume Walkthrough'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Replay Button */}
            <button
              type="button"
              onClick={handleStartWalkthrough}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              title="Restart Walkthrough from Entrance"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Camera Telemetry */}
          <div className="flex items-center gap-3 text-xs font-mono text-white/70">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span>
                {Math.floor(currentTime)}s / {TOTAL_DURATION}s
              </span>
            </div>
            <span className="hidden sm:inline-block text-white/40">|</span>
            <span className="hidden sm:inline-block text-[#FCE7F3]">
              Continuous 3D Flight
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
