import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { hypercarAudio } from '../../utils/audioEngine';

interface VirtualDriveCanvasProps {
  carColor?: string;
  trackName?: string;
  onSpeedUpdate?: (speed: number, gear: number, rpm: number) => void;
  className?: string;
}

export const VirtualDriveCanvas: React.FC<VirtualDriveCanvasProps> = ({
  carColor = '#FF163A',
  onSpeedUpdate,
  className = 'w-full h-full min-h-[500px]'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [gear, setGear] = useState<number>(1);
  const [rpm, setRpm] = useState<number>(1200);
  const [boostActive, setBoostActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Driving inputs
  const keysRef = useRef<{ forward: boolean; backward: boolean; left: boolean; right: boolean; boost: boolean }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false
  });

  const stateRef = useRef<{
    currentSpeed: number; // 0 to 440 km/h
    steeringOffset: number; // -4 to 4 across track
    headingAngle: number;
    rpmVal: number;
  }>({
    currentSpeed: 0,
    steeringOffset: 0,
    headingAngle: 0,
    rpmVal: 1000
  });

  const handleToggleSound = useCallback(() => {
    if (!soundEnabled) {
      hypercarAudio.start();
      setSoundEnabled(true);
    } else {
      const isMuted = hypercarAudio.toggleMute();
      setSoundEnabled(!isMuted);
    }
  }, [soundEnabled]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.code)) {
        keysRef.current.forward = true;
      }
      if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.code)) {
        keysRef.current.backward = true;
      }
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code)) {
        keysRef.current.left = true;
      }
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code)) {
        keysRef.current.right = true;
      }
      if (['Space'].includes(e.code)) {
        keysRef.current.boost = true;
        setBoostActive(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.code)) keysRef.current.forward = false;
      if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.code)) keysRef.current.backward = false;
      if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.code)) keysRef.current.left = false;
      if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.code)) keysRef.current.right = false;
      if (['Space'].includes(e.code)) {
        keysRef.current.boost = false;
        setBoostActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Three.js Simulation
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.02);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 200);
    camera.position.set(0, 2.4, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const redSun = new THREE.DirectionalLight(0xFF163A, 2.5);
    redSun.position.set(0, 15, -40);
    scene.add(redSun);

    // Endless Road Track
    const roadWidth = 14;
    const roadSegments = 12;
    const roadSegmentLength = 30;
    const trackPlanes: THREE.Mesh[] = [];

    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadSegmentLength);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.35,
      metalness: 0.8
    });

    for (let i = 0; i < roadSegments; i++) {
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -i * roadSegmentLength;
      road.position.y = -0.5;
      scene.add(road);
      trackPlanes.push(road);
    }

    // Curbs & Neon Lane Strips
    const markerGeo = new THREE.BoxGeometry(0.3, 0.05, 4);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xFF163A });
    const markers: THREE.Mesh[] = [];

    for (let i = 0; i < 24; i++) {
      const markerL = new THREE.Mesh(markerGeo, markerMat);
      markerL.position.set(-roadWidth / 2 + 0.5, -0.47, -i * 15);
      scene.add(markerL);
      markers.push(markerL);

      const markerR = new THREE.Mesh(markerGeo, markerMat);
      markerR.position.set(roadWidth / 2 - 0.5, -0.47, -i * 15);
      scene.add(markerR);
      markers.push(markerR);
    }

    // Overhead futuristic speed arches
    const archGeo = new THREE.TorusGeometry(12, 0.15, 8, 32, Math.PI);
    const archMat = new THREE.MeshBasicMaterial({ color: 0xFF163A, transparent: true, opacity: 0.35 });
    const arches: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, -0.5, -i * 60 - 20);
      scene.add(arch);
      arches.push(arch);
    }

    // --- CAR MESH ---
    const carRoot = new THREE.Group();
    carRoot.position.set(0, 0, 0);
    scene.add(carRoot);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(carColor),
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0
    });

    const carbonMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.3 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x111116, transmission: 0.9, roughness: 0.05 });
    const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xFF163A });

    // Chassis
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.42, 1.8), bodyMat);
    chassis.position.y = 0.05;
    carRoot.add(chassis);

    // Cabin
    const cabin = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 16), glassMat);
    cabin.position.set(-0.15, 0.42, 0);
    cabin.scale.set(1.4, 0.55, 0.85);
    carRoot.add(cabin);

    // Spoiler
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 2.0), carbonMat);
    wing.position.set(-1.7, 0.58, 0);
    carRoot.add(wing);

    // Taillight bar
    const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 1.6), redGlowMat);
    taillight.position.set(-1.81, 0.12, 0);
    carRoot.add(taillight);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });
    const driveWheels: THREE.Mesh[] = [];

    const wheelCoords = [
      { x: 1.1, z: 0.9 },
      { x: 1.1, z: -0.9 },
      { x: -1.1, z: 0.9 },
      { x: -1.1, z: -0.9 },
    ];

    wheelCoords.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos.x, -0.15, pos.z);
      carRoot.add(wheel);
      driveWheels.push(wheel);
    });

    // Particle Sparks / Boost Trails
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xFF163A, size: 0.15, transparent: true, opacity: 0.8 });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particleSystem.position.set(-1.9, 0, 0);
    carRoot.add(particleSystem);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Physics Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const keys = keysRef.current;
      const state = stateRef.current;

      // Acceleration & Braking
      const maxSpeed = keys.boost ? 440 : 380;
      const accelRate = keys.boost ? 140 : 85;
      const decelRate = 45;
      const brakeRate = 180;

      if (keys.forward) {
        state.currentSpeed = Math.min(maxSpeed, state.currentSpeed + accelRate * dt);
      } else if (keys.backward) {
        state.currentSpeed = Math.max(0, state.currentSpeed - brakeRate * dt);
      } else {
        state.currentSpeed = Math.max(0, state.currentSpeed - decelRate * dt);
      }

      // Steering
      const steerSpeed = 6.5;
      if (keys.left) {
        state.steeringOffset = Math.max(-5.2, state.steeringOffset - steerSpeed * dt);
        state.headingAngle = THREE.MathUtils.lerp(state.headingAngle, 0.15, 0.15);
      } else if (keys.right) {
        state.steeringOffset = Math.min(5.2, state.steeringOffset + steerSpeed * dt);
        state.headingAngle = THREE.MathUtils.lerp(state.headingAngle, -0.15, 0.15);
      } else {
        state.headingAngle = THREE.MathUtils.lerp(state.headingAngle, 0, 0.12);
      }

      // Calculate Gear & RPM
      const speedRatio = state.currentSpeed / maxSpeed;
      const currentGear = Math.min(8, Math.max(1, Math.floor(speedRatio * 7) + 1));
      const gearProgress = (speedRatio * 7) % 1;
      const calculatedRpm = Math.floor(1200 + gearProgress * 7800);

      state.rpmVal = calculatedRpm;

      // Update audio synthesizer
      hypercarAudio.setThrottle(Math.max(0.2, speedRatio));

      // Move Road Segments to create illusion of high speed
      const trackSpeed = (state.currentSpeed / 3.6) * dt; // m/s
      trackPlanes.forEach(plane => {
        plane.position.z += trackSpeed;
        if (plane.position.z > 25) {
          plane.position.z -= roadSegments * roadSegmentLength;
        }
      });

      markers.forEach(marker => {
        marker.position.z += trackSpeed;
        if (marker.position.z > 25) {
          marker.position.z -= 24 * 15;
        }
      });

      arches.forEach(arch => {
        arch.position.z += trackSpeed;
        if (arch.position.z > 25) {
          arch.position.z -= 6 * 60;
        }
      });

      // Update Car Position & Chassis Dynamics
      carRoot.position.x = THREE.MathUtils.lerp(carRoot.position.x, state.steeringOffset, 0.15);
      carRoot.rotation.y = state.headingAngle;
      carRoot.rotation.z = -state.headingAngle * 0.8; // Chassis roll into turn

      // Slight squat during acceleration
      carRoot.rotation.x = keys.forward ? -0.02 : (keys.backward ? 0.03 : 0);

      // Rotate Wheels
      driveWheels.forEach(w => {
        w.rotation.y += (state.currentSpeed / 20) * dt;
      });

      // Boost particle emission
      particleSystem.visible = keys.boost && state.currentSpeed > 50;

      // Dynamic Camera follow
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, carRoot.position.x * 0.45, 0.08);
      camera.fov = THREE.MathUtils.lerp(camera.fov, 52 + speedRatio * 14, 0.05);
      camera.updateProjectionMatrix();

      // UI updates throttled
      const roundSpeed = Math.round(state.currentSpeed);
      setSpeed(roundSpeed);
      setGear(currentGear);
      setRpm(calculatedRpm);

      if (onSpeedUpdate) {
        onSpeedUpdate(roundSpeed, currentGear, calculatedRpm);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      hypercarAudio.stop();
    };
  }, [carColor, onSpeedUpdate]);

  return (
    <div className={`relative overflow-hidden select-none ${className}`} ref={mountRef}>
      {/* Telemetry HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-3">
        {/* Speed & Gear Box */}
        <div className="glass-panel px-4 py-2 rounded-lg border border-white/10 flex items-center gap-5 pointer-events-auto">
          <div>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest block uppercase">Telemetry Speed</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-3xl md:text-4xl text-white tracking-tight tabular-nums">{speed}</span>
              <span className="text-xs font-mono text-[#FF163A] uppercase font-bold">km/h</span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest block uppercase">Gear</span>
            <span className="font-display font-black text-2xl text-white tabular-nums">{gear === 1 && speed === 0 ? 'N' : `G${gear}`}</span>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="hidden sm:block">
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest block uppercase">RPM Tach</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-zinc-200 tabular-nums">{rpm}</span>
              <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-75 ${rpm > 7500 ? 'bg-red-500' : 'bg-[#FF163A]'}`}
                  style={{ width: `${Math.min(100, (rpm / 9000) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audio & Nitro State */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-2 ${
              soundEnabled
                ? 'bg-[#FF163A]/20 border-[#FF163A] text-white'
                : 'glass-panel border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-[#FF163A] animate-pulse' : 'bg-zinc-600'}`} />
            {soundEnabled ? 'Audio Live' : 'Enable Audio'}
          </button>

          <div className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
            boostActive
              ? 'bg-[#FF163A] border-[#FF163A] text-white shadow-[0_0_20px_#FF163A]'
              : 'glass-panel border-white/10 text-zinc-500'
          }`}>
            NITROUS BOOST [SPACE]
          </div>
        </div>
      </div>

      {/* Touch / Screen Driving Controls for Mobile & Quick Interaction */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            onMouseDown={() => { keysRef.current.left = true; }}
            onMouseUp={() => { keysRef.current.left = false; }}
            onTouchStart={() => { keysRef.current.left = true; }}
            onTouchEnd={() => { keysRef.current.left = false; }}
            className="w-12 h-12 glass-panel border border-white/15 rounded-lg flex items-center justify-center active:bg-[#FF163A] text-white font-mono text-sm"
            aria-label="Steer Left"
          >
            ←
          </button>
          <button
            onMouseDown={() => { keysRef.current.right = true; }}
            onMouseUp={() => { keysRef.current.right = false; }}
            onTouchStart={() => { keysRef.current.right = true; }}
            onTouchEnd={() => { keysRef.current.right = false; }}
            className="w-12 h-12 glass-panel border border-white/15 rounded-lg flex items-center justify-center active:bg-[#FF163A] text-white font-mono text-sm"
            aria-label="Steer Right"
          >
            →
          </button>
        </div>

        <div className="text-center hidden md:block">
          <p className="text-[11px] text-zinc-400 font-mono">Keyboard: [W / ↑] Accelerate · [S / ↓] Brake · [A / D] Steer · [Space] Nitrous</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onMouseDown={() => { keysRef.current.backward = true; }}
            onMouseUp={() => { keysRef.current.backward = false; }}
            onTouchStart={() => { keysRef.current.backward = true; }}
            onTouchEnd={() => { keysRef.current.backward = false; }}
            className="w-14 h-12 glass-panel border border-white/15 rounded-lg flex items-center justify-center active:bg-amber-600 text-white font-mono text-xs uppercase"
          >
            Brake
          </button>
          <button
            onMouseDown={() => { keysRef.current.forward = true; }}
            onMouseUp={() => { keysRef.current.forward = false; }}
            onTouchStart={() => { keysRef.current.forward = true; }}
            onTouchEnd={() => { keysRef.current.forward = false; }}
            className="w-16 h-12 bg-[#FF163A] hover:bg-[#e01433] active:scale-95 transition-all text-white font-mono text-xs font-bold uppercase rounded-lg shadow-[0_0_15px_rgba(255,22,58,0.4)]"
          >
            Throttle
          </button>
        </div>
      </div>
    </div>
  );
};
