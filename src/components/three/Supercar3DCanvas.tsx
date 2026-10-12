import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface Supercar3DCanvasProps {
  bodyColor?: string;
  finish?: 'gloss' | 'matte' | 'metallic';
  caliperColor?: string;
  autoRotate?: boolean;
  activeWing?: boolean;
  doorsOpen?: boolean;
  headlightsOn?: boolean;
  wireframe?: boolean;
  lightingPreset?: 'studio' | 'neon' | 'stealth' | 'daylight';
  cameraView?: 'orbit' | 'front' | 'side' | 'rear' | 'cockpit' | 'wheel';
  className?: string;
}

export const Supercar3DCanvas: React.FC<Supercar3DCanvasProps> = ({
  bodyColor = '#FF163A',
  finish = 'metallic',
  caliperColor = '#FF163A',
  autoRotate = true,
  activeWing = false,
  doorsOpen = false,
  headlightsOn = true,
  wireframe = false,
  lightingPreset = 'studio',
  cameraView = 'orbit',
  className = 'w-full h-full min-h-[420px]'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Dynamic mesh part refs
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const caliperMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const wingRef = useRef<THREE.Group | null>(null);
  const leftDoorRef = useRef<THREE.Group | null>(null);
  const rightDoorRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const headlightsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const headlightLightsRef = useRef<THREE.PointLight[]>([]);
  const studioLightsRef = useRef<THREE.Light[]>([]);

  // Orbit controls state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number; distance: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    distance: 9.5
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update Body Material properties
  useEffect(() => {
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.set(bodyColor);
      bodyMaterialRef.current.wireframe = wireframe;

      if (finish === 'gloss') {
        bodyMaterialRef.current.roughness = 0.08;
        bodyMaterialRef.current.metalness = 0.65;
        bodyMaterialRef.current.clearcoat = 1.0;
        bodyMaterialRef.current.clearcoatRoughness = 0.03;
      } else if (finish === 'matte') {
        bodyMaterialRef.current.roughness = 0.68;
        bodyMaterialRef.current.metalness = 0.15;
        bodyMaterialRef.current.clearcoat = 0.0;
        bodyMaterialRef.current.clearcoatRoughness = 0.8;
      } else {
        // Metallic
        bodyMaterialRef.current.roughness = 0.22;
        bodyMaterialRef.current.metalness = 0.85;
        bodyMaterialRef.current.clearcoat = 0.95;
        bodyMaterialRef.current.clearcoatRoughness = 0.05;
      }
      bodyMaterialRef.current.needsUpdate = true;
    }
  }, [bodyColor, finish, wireframe]);

  // Update Calipers
  useEffect(() => {
    if (caliperMaterialRef.current) {
      caliperMaterialRef.current.color.set(caliperColor);
      caliperMaterialRef.current.needsUpdate = true;
    }
  }, [caliperColor]);

  // Update Headlights & Underglow
  useEffect(() => {
    headlightsRef.current.forEach(mat => {
      mat.color.set(headlightsOn ? '#FF163A' : '#333333');
      mat.needsUpdate = true;
    });
    headlightLightsRef.current.forEach(light => {
      light.intensity = headlightsOn ? 4.5 : 0;
    });
  }, [headlightsOn]);

  // Update Lighting Preset
  useEffect(() => {
    if (!sceneRef.current) return;
    const lights = studioLightsRef.current;
    if (lights.length < 3) return;

    if (lightingPreset === 'studio') {
      (lights[0] as THREE.AmbientLight).intensity = 0.8;
      (lights[1] as THREE.DirectionalLight).intensity = 3.0;
      (lights[1] as THREE.DirectionalLight).color.set('#ffffff');
      (lights[2] as THREE.PointLight).intensity = 5.0; // Red rim light
      (lights[2] as THREE.PointLight).color.set('#FF163A');
    } else if (lightingPreset === 'neon') {
      (lights[0] as THREE.AmbientLight).intensity = 0.3;
      (lights[1] as THREE.DirectionalLight).intensity = 1.5;
      (lights[1] as THREE.DirectionalLight).color.set('#FF163A');
      (lights[2] as THREE.PointLight).intensity = 8.0;
      (lights[2] as THREE.PointLight).color.set('#FF0055');
    } else if (lightingPreset === 'stealth') {
      (lights[0] as THREE.AmbientLight).intensity = 0.25;
      (lights[1] as THREE.DirectionalLight).intensity = 1.8;
      (lights[1] as THREE.DirectionalLight).color.set('#778899');
      (lights[2] as THREE.PointLight).intensity = 2.0;
      (lights[2] as THREE.PointLight).color.set('#FF163A');
    } else if (lightingPreset === 'daylight') {
      (lights[0] as THREE.AmbientLight).intensity = 1.5;
      (lights[1] as THREE.DirectionalLight).intensity = 4.5;
      (lights[1] as THREE.DirectionalLight).color.set('#fffaed');
      (lights[2] as THREE.PointLight).intensity = 1.5;
      (lights[2] as THREE.PointLight).color.set('#ffffff');
    }
  }, [lightingPreset]);

  // Update Camera View
  const updateCameraTarget = useCallback((view: 'orbit' | 'front' | 'side' | 'rear' | 'cockpit' | 'wheel') => {
    const angle = cameraAngleRef.current;
    switch (view) {
      case 'front':
        angle.theta = Math.PI / 2;
        angle.phi = Math.PI / 2.3;
        angle.distance = 7.5;
        break;
      case 'side':
        angle.theta = 0;
        angle.phi = Math.PI / 2.4;
        angle.distance = 8.0;
        break;
      case 'rear':
        angle.theta = -Math.PI / 2;
        angle.phi = Math.PI / 2.3;
        angle.distance = 7.5;
        break;
      case 'cockpit':
        angle.theta = Math.PI / 4;
        angle.phi = Math.PI / 3.2;
        angle.distance = 5.2;
        break;
      case 'wheel':
        angle.theta = 0.3;
        angle.phi = Math.PI / 2.2;
        angle.distance = 4.8;
        break;
      case 'orbit':
      default:
        angle.theta = Math.PI / 4;
        angle.phi = Math.PI / 2.6;
        angle.distance = 9.2;
        break;
    }
  }, []);

  useEffect(() => {
    updateCameraTarget(cameraView);
  }, [cameraView, updateCameraTarget]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainKeyLight.position.set(6, 10, 8);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    const redRimLight = new THREE.PointLight(0xFF163A, 6.0, 25);
    redRimLight.position.set(-6, 3, -6);
    scene.add(redRimLight);

    const frontFillLight = new THREE.DirectionalLight(0x4466aa, 1.2);
    frontFillLight.position.set(0, 4, 10);
    scene.add(frontFillLight);

    studioLightsRef.current = [ambientLight, mainKeyLight, redRimLight, frontFillLight];

    // Reflective Studio Floor
    const floorGeometry = new THREE.PlaneGeometry(60, 60);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.15,
      metalness: 0.85
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.78;
    floor.receiveShadow = true;
    scene.add(floor);

    // Studio Grid Ring
    const ringGeo = new THREE.RingGeometry(4.8, 5.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF163A, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const floorRing = new THREE.Mesh(ringGeo, ringMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -0.77;
    scene.add(floorRing);

    // Underbody Glow
    const underglowGeo = new THREE.PlaneGeometry(4.2, 2.0);
    const underglowMat = new THREE.MeshBasicMaterial({ color: 0xFF163A, transparent: true, opacity: 0.25 });
    const underglow = new THREE.Mesh(underglowGeo, underglowMat);
    underglow.rotation.x = -Math.PI / 2;
    underglow.position.y = -0.76;
    scene.add(underglow);

    // --- PROCEDURAL 3D SUPERCAR ASSEMBLY ---
    const carRoot = new THREE.Group();
    scene.add(carRoot);

    // Body Material
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bodyColor),
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05
    });
    bodyMaterialRef.current = bodyMat;

    // Carbon fiber material
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.35,
      metalness: 0.6
    });

    // Glass material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111115,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.5,
      transparent: true,
      opacity: 0.85
    });

    // Caliper material
    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(caliperColor),
      roughness: 0.3,
      metalness: 0.7
    });
    caliperMaterialRef.current = caliperMat;

    // Headlight glowing material
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xFF163A });
    headlightsRef.current = [headlightMat];

    // Main Lower Chassis
    const chassisGeo = new THREE.BoxGeometry(4.6, 0.45, 2.1);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = -0.2;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    carRoot.add(chassis);

    // Aerodynamic Sloped Nose / Hood
    const noseGeo = new THREE.CylinderGeometry(0.85, 1.05, 1.8, 4);
    const nose = new THREE.Mesh(noseGeo, bodyMat);
    nose.rotation.z = Math.PI / 2;
    nose.rotation.y = Math.PI / 4;
    nose.position.set(1.9, -0.22, 0);
    nose.scale.set(0.4, 1.0, 1.8);
    nose.castShadow = true;
    carRoot.add(nose);

    // Cockpit Cabin / Canopy
    const cabinGeo = new THREE.SphereGeometry(1.25, 32, 16);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(-0.15, 0.22, 0);
    cabin.scale.set(1.5, 0.58, 0.92);
    cabin.castShadow = true;
    carRoot.add(cabin);

    // Roof scoop & spine
    const spineGeo = new THREE.BoxGeometry(2.2, 0.12, 0.25);
    const spine = new THREE.Mesh(spineGeo, carbonMat);
    spine.position.set(-0.2, 0.62, 0);
    carRoot.add(spine);

    // Front Splitter (Carbon)
    const splitterGeo = new THREE.BoxGeometry(1.4, 0.06, 2.25);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(2.4, -0.42, 0);
    splitter.castShadow = true;
    carRoot.add(splitter);

    // Front Canards
    const canardL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.25), carbonMat);
    canardL.position.set(2.3, -0.25, 1.05);
    canardL.rotation.y = -0.3;
    carRoot.add(canardL);

    const canardR = canardL.clone();
    canardR.position.z = -1.05;
    canardR.rotation.y = 0.3;
    carRoot.add(canardR);

    // Side aero skirts
    const skirtL = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.18), carbonMat);
    skirtL.position.set(-0.1, -0.45, 1.08);
    carRoot.add(skirtL);

    const skirtR = skirtL.clone();
    skirtR.position.z = -1.08;
    carRoot.add(skirtR);

    // Rear Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.1, 0.28, 2.0);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
    diffuser.position.set(-2.4, -0.32, 0);
    diffuser.rotation.z = -0.12;
    diffuser.castShadow = true;
    carRoot.add(diffuser);

    // Diffuser fins
    for (let i = -3; i <= 3; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.03), carbonMat);
      fin.position.set(-2.4, -0.34, (i * 0.26));
      carRoot.add(fin);
    }

    // Active Rear Wing Group
    const wingGroup = new THREE.Group();
    wingGroup.position.set(-2.15, 0.35, 0);
    wingRef.current = wingGroup;

    // Wing Struts (Swan-neck pylons)
    const strutL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.04), carbonMat);
    strutL.position.set(0, 0.15, 0.55);
    strutL.rotation.z = -0.35;
    wingGroup.add(strutL);

    const strutR = strutL.clone();
    strutR.position.z = -0.55;
    wingGroup.add(strutR);

    // Main Airfoil
    const wingAirfoilGeo = new THREE.BoxGeometry(0.48, 0.05, 2.3);
    const wingAirfoil = new THREE.Mesh(wingAirfoilGeo, carbonMat);
    wingAirfoil.position.set(0.12, 0.42, 0);
    wingAirfoil.castShadow = true;
    wingGroup.add(wingAirfoil);

    // Wing Endplates
    const endplateL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.24, 0.03), bodyMat);
    endplateL.position.set(0.12, 0.42, 1.15);
    wingGroup.add(endplateL);

    const endplateR = endplateL.clone();
    endplateR.position.z = -1.15;
    wingGroup.add(endplateR);

    carRoot.add(wingGroup);

    // Headlight LED Blades
    const headlightGeo = new THREE.BoxGeometry(0.35, 0.04, 0.45);
    const headlightL = new THREE.Mesh(headlightGeo, headlightMat);
    headlightL.position.set(2.32, -0.14, 0.72);
    headlightL.rotation.y = -0.25;
    carRoot.add(headlightL);

    const headlightR = new THREE.Mesh(headlightGeo, headlightMat);
    headlightR.position.set(2.32, -0.14, -0.72);
    headlightR.rotation.y = 0.25;
    carRoot.add(headlightR);

    // Headlight projection point lights
    const pLightL = new THREE.PointLight(0xFF163A, 4.5, 8);
    pLightL.position.set(2.6, -0.12, 0.72);
    scene.add(pLightL);

    const pLightR = new THREE.PointLight(0xFF163A, 4.5, 8);
    pLightR.position.set(2.6, -0.12, -0.72);
    scene.add(pLightR);

    headlightLightsRef.current = [pLightL, pLightR];

    // Rear Neon Light Strip
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0xFF163A });
    const taillightGeo = new THREE.BoxGeometry(0.06, 0.05, 1.9);
    const taillight = new THREE.Mesh(taillightGeo, taillightMat);
    taillight.position.set(-2.38, -0.05, 0);
    carRoot.add(taillight);

    // Doors (for opening animation)
    const doorGeo = new THREE.BoxGeometry(1.6, 0.5, 0.12);

    const leftDoor = new THREE.Group();
    leftDoor.position.set(0.8, -0.05, 1.02);
    const leftDoorMesh = new THREE.Mesh(doorGeo, bodyMat);
    leftDoorMesh.position.set(-0.8, 0, 0);
    leftDoor.add(leftDoorMesh);
    carRoot.add(leftDoor);
    leftDoorRef.current = leftDoor;

    const rightDoor = new THREE.Group();
    rightDoor.position.set(0.8, -0.05, -1.02);
    const rightDoorMesh = new THREE.Mesh(doorGeo, bodyMat);
    rightDoorMesh.position.set(-0.8, 0, 0);
    rightDoor.add(rightDoorMesh);
    carRoot.add(rightDoor);
    rightDoorRef.current = rightDoor;

    // --- WHEELS ASSEMBLY ---
    const wheelPositions = [
      { x: 1.5, y: -0.38, z: 1.02 },   // Front Left
      { x: 1.5, y: -0.38, z: -1.02 },  // Front Right
      { x: -1.45, y: -0.35, z: 1.05 }, // Rear Left
      { x: -1.45, y: -0.35, z: -1.05 } // Rear Right
    ];

    const wheelGroups: THREE.Group[] = [];

    const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.85, metalness: 0.1 });

    const rimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.33, 16);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x333338, roughness: 0.25, metalness: 0.95 });

    const brakeDiscGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16);
    const brakeDiscMat = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.4, metalness: 0.8 });

    const caliperGeo = new THREE.BoxGeometry(0.18, 0.14, 0.08);

    wheelPositions.forEach((pos, idx) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelGroup.add(rim);

      // Wheel Spokes
      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.34), rimMat);
        spoke.rotation.z = (s * Math.PI) / 2.5;
        wheelGroup.add(spoke);
      }

      // Brake Disc
      const disc = new THREE.Mesh(brakeDiscGeo, brakeDiscMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.z = (idx % 2 === 0 ? -0.06 : 0.06);
      wheelGroup.add(disc);

      // Caliper
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(0, 0.15, (idx % 2 === 0 ? -0.08 : 0.08));
      wheelGroup.add(caliper);

      carRoot.add(wheelGroup);
      wheelGroups.push(wheelGroup);
    });

    wheelsRef.current = wheelGroups;
    setIsLoading(false);

    // Mouse Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const angle = cameraAngleRef.current;
      angle.theta -= deltaX * 0.008;
      angle.phi = Math.max(0.15, Math.min(Math.PI / 2.05, angle.phi + deltaY * 0.008));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const angle = cameraAngleRef.current;
      angle.distance = Math.max(3.8, Math.min(14, angle.distance + e.deltaY * 0.006));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support for mobile
    let touchStartDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
        const angle = cameraAngleRef.current;
        angle.theta -= deltaX * 0.008;
        angle.phi = Math.max(0.15, Math.min(Math.PI / 2.05, angle.phi + deltaY * 0.008));
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - currentDist;
        const angle = cameraAngleRef.current;
        angle.distance = Math.max(3.8, Math.min(14, angle.distance + diff * 0.01));
        touchStartDist = currentDist;
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto-rotation if enabled and not user-dragging
      if (autoRotate && !isDraggingRef.current) {
        cameraAngleRef.current.theta += delta * 0.45;
      }

      // Smooth Camera Positioning using spherical coordinates
      const angle = cameraAngleRef.current;
      const x = angle.distance * Math.sin(angle.phi) * Math.sin(angle.theta);
      const y = angle.distance * Math.cos(angle.phi);
      const z = angle.distance * Math.sin(angle.phi) * Math.cos(angle.theta);

      camera.position.set(x, y, z);
      camera.lookAt(0, -0.05, 0);

      // Smooth door animation
      const targetDoorAngle = doorsOpen ? 0.75 : 0;
      if (leftDoorRef.current) {
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, targetDoorAngle, 0.08);
        leftDoorRef.current.rotation.x = THREE.MathUtils.lerp(leftDoorRef.current.rotation.x, targetDoorAngle * 0.4, 0.08);
      }
      if (rightDoorRef.current) {
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, -targetDoorAngle, 0.08);
        rightDoorRef.current.rotation.x = THREE.MathUtils.lerp(rightDoorRef.current.rotation.x, -targetDoorAngle * 0.4, 0.08);
      }

      // Smooth active wing actuator animation
      const targetWingY = activeWing ? 0.65 : 0.35;
      const targetWingAngle = activeWing ? -0.22 : 0;
      if (wingRef.current) {
        wingRef.current.position.y = THREE.MathUtils.lerp(wingRef.current.position.y, targetWingY, 0.08);
        wingRef.current.rotation.x = THREE.MathUtils.lerp(wingRef.current.rotation.x, targetWingAngle, 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run setup once; props sync via individual useEffects

  return (
    <div className={`relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`} ref={mountRef}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/90 z-20">
          <div className="w-12 h-12 border-2 border-[#FF163A]/20 border-t-[#FF163A] rounded-full animate-spin mb-3"></div>
          <p className="text-xs uppercase tracking-widest text-[#FF163A] font-semibold">Initializing 3D Telemetry Studio</p>
        </div>
      )}
      {/* 3D Interaction Hint overlay */}
      <div className="absolute bottom-3 left-4 pointer-events-none z-10 flex items-center gap-2 text-[11px] text-zinc-400 font-mono bg-black/50 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF163A] animate-pulse"></span>
        <span>Drag to 360° inspect · Scroll to zoom</span>
      </div>
    </div>
  );
};
