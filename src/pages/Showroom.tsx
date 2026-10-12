import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, 
  Sun, 
  Camera, 
  Lightbulb, 
  RotateCw, 
  Volume2, 
  Maximize2, 
  ArrowRight, 
  Box, 
  ShieldAlert, 
  Compass, 
  ChevronRight
} from 'lucide-react';
import { SUPERCARS } from '../data/supercars';
import { Supercar3DCanvas } from '../components/three/Supercar3DCanvas';
import { hypercarAudio } from '../utils/audioEngine';

export const Showroom: React.FC = () => {
  const [selectedCarId, setSelectedCarId] = useState(SUPERCARS[0].id);
  const activeCar = SUPERCARS.find(c => c.id === selectedCarId) || SUPERCARS[0];

  // 3D Canvas States
  const [currentColor, setCurrentColor] = useState(activeCar.colorOptions[0].hex);
  const [currentFinish, setCurrentFinish] = useState<'gloss' | 'matte' | 'metallic'>(activeCar.colorOptions[0].finish);
  const [caliperColor, setCaliperColor] = useState('#FF163A');
  const [autoRotate, setAutoRotate] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [activeWing, setActiveWing] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'neon' | 'stealth' | 'daylight'>('studio');
  const [cameraView, setCameraView] = useState<'orbit' | 'front' | 'side' | 'rear' | 'cockpit' | 'wheel'>('orbit');
  const [throttlePressed, setThrottlePressed] = useState(false);

  const handleCarChange = (id: string) => {
    setSelectedCarId(id);
    const newCar = SUPERCARS.find(c => c.id === id);
    if (newCar) {
      setCurrentColor(newCar.colorOptions[0].hex);
      setCurrentFinish(newCar.colorOptions[0].finish);
    }
  };

  const handleRevAudio = () => {
    setThrottlePressed(true);
    hypercarAudio.revBurst();
    setTimeout(() => {
      setThrottlePressed(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between">
      {/* SHOWROOM HEADER & MODEL SELECTOR */}
      <div className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF163A] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#FF163A] animate-pulse" />
              <span>Virtual 3D Stage · Real-Time WebGL Engine</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
              3D Supercar Showroom
            </h1>
          </div>

          {/* Model Switcher Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {SUPERCARS.map(car => (
              <button
                key={car.id}
                onClick={() => handleCarChange(car.id)}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all rounded ${
                  car.id === activeCar.id
                    ? 'bg-[#FF163A] text-white font-bold shadow-[0_0_12px_rgba(255,22,58,0.4)]'
                    : 'glass-panel text-zinc-400 hover:text-white border-white/10'
                }`}
              >
                {car.name.replace('Velocity ', '').replace('Apex ', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN 3D SHOWROOM WORKSPACE */}
      <div className="relative flex-1 min-h-[68vh] w-full overflow-hidden">
        {/* The 3D Canvas */}
        <Supercar3DCanvas
          bodyColor={currentColor}
          finish={currentFinish}
          caliperColor={caliperColor}
          autoRotate={autoRotate}
          doorsOpen={doorsOpen}
          activeWing={activeWing}
          headlightsOn={headlightsOn}
          wireframe={wireframe}
          lightingPreset={lightingPreset}
          cameraView={cameraView}
          className="w-full h-full absolute inset-0"
        />

        {/* TOP LEFT: REAL-TIME TELEMETRY HUD */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none max-w-xs sm:max-w-sm">
          <div className="glass-panel p-4 rounded-lg border border-white/10 space-y-3 pointer-events-auto shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#FF163A] uppercase tracking-widest">{activeCar.category}</span>
              <span className="text-[10px] font-mono text-zinc-400">{activeCar.releaseYear} Spec</span>
            </div>
            <h2 className="font-display font-black text-xl text-white uppercase">{activeCar.name}</h2>
            <p className="text-[11px] text-zinc-400 font-mono leading-tight">{activeCar.powertrain}</p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Horsepower</span>
                <span className="text-white font-bold tabular-nums">{activeCar.horsepower} HP</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Terminal Speed</span>
                <span className="text-white font-bold tabular-nums">{activeCar.topSpeed} km/h</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">0-100 km/h</span>
                <span className="text-[#FF163A] font-bold tabular-nums">{activeCar.acceleration}s</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Downforce</span>
                <span className="text-white font-bold tabular-nums">{activeCar.downforce} kg</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link
                to={`/configurator?car=${activeCar.id}`}
                className="flex-1 py-1.5 text-center bg-[#FF163A] hover:bg-[#e01433] text-[11px] font-mono uppercase font-bold text-white rounded transition-colors"
              >
                Customize
              </Link>
              <Link
                to={`/test-drive?car=${activeCar.id}`}
                className="flex-1 py-1.5 text-center bg-white/10 hover:bg-white/20 text-[11px] font-mono uppercase text-white rounded transition-colors"
              >
                Drive Simulator
              </Link>
            </div>
          </div>
        </div>

        {/* TOP RIGHT: CAMERA & LIGHTING TOOLBAR */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
          {/* Camera View Angles */}
          <div className="glass-panel p-2 rounded-lg border border-white/10 flex flex-col gap-1 text-[11px] font-mono">
            <span className="text-[9px] text-zinc-400 uppercase tracking-widest px-2 py-0.5">Perspective</span>
            {[
              { id: 'orbit', label: '360° Orbit' },
              { id: 'front', label: 'Front Quarter' },
              { id: 'side', label: 'Aero Profile' },
              { id: 'rear', label: 'Rear Diffuser' },
              { id: 'cockpit', label: 'Cabin Close' },
              { id: 'wheel', label: 'Brake Caliper' }
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setCameraView(v.id as any)}
                className={`px-3 py-1 text-left rounded transition-colors ${
                  cameraView === v.id ? 'bg-[#FF163A] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Studio Lighting Presets */}
          <div className="glass-panel p-2 rounded-lg border border-white/10 flex flex-col gap-1 text-[11px] font-mono">
            <span className="text-[9px] text-zinc-400 uppercase tracking-widest px-2 py-0.5">Lighting Rig</span>
            {[
              { id: 'studio', label: 'Red Neon Studio' },
              { id: 'neon', label: 'Cyber Crimson' },
              { id: 'stealth', label: 'Dark Stealth' },
              { id: 'daylight', label: 'Sunlight Track' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setLightingPreset(l.id as any)}
                className={`px-3 py-1 text-left rounded transition-colors ${
                  lightingPreset === l.id ? 'bg-[#FF163A] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM WORKSPACE CONTROLS DOCK */}
        <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Left: Quick Paint Palette */}
          <div className="glass-panel p-2.5 rounded-lg border border-white/10 flex items-center gap-3 pointer-events-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-400">Chassis:</span>
            <div className="flex items-center gap-1.5">
              {activeCar.colorOptions.map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCurrentColor(c.hex);
                    setCurrentFinish(c.finish);
                  }}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    currentColor === c.hex ? 'border-white scale-110 ring-2 ring-[#FF163A]' : 'border-white/20'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.finish})`}
                />
              ))}
            </div>

            <div className="h-5 w-px bg-white/10" />

            <span className="text-[10px] font-mono uppercase text-zinc-400">Calipers:</span>
            <div className="flex items-center gap-1">
              {[
                { name: 'Red', hex: '#FF163A' },
                { name: 'Yellow', hex: '#FFD700' },
                { name: 'Titanium', hex: '#C0C0C0' },
                { name: 'Cyan', hex: '#00F0FF' }
              ].map(cal => (
                <button
                  key={cal.name}
                  onClick={() => setCaliperColor(cal.hex)}
                  className={`w-4 h-4 rounded-full border ${caliperColor === cal.hex ? 'border-white ring-1 ring-white' : 'border-white/20'}`}
                  style={{ backgroundColor: cal.hex }}
                  title={cal.name}
                />
              ))}
            </div>
          </div>

          {/* Center: Actuators & Geometry Toggles */}
          <div className="glass-panel p-2 rounded-lg border border-white/10 flex items-center gap-2 pointer-events-auto text-xs font-mono">
            <button
              onClick={() => setDoorsOpen(!doorsOpen)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                doorsOpen ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              {doorsOpen ? 'Doors: Open' : 'Doors: Closed'}
            </button>

            <button
              onClick={() => setActiveWing(!activeWing)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeWing ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              {activeWing ? 'DRS: Deployed' : 'DRS: Retracted'}
            </button>

            <button
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                headlightsOn ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              Headlights
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                wireframe ? 'bg-amber-600 border-amber-600 text-white' : 'border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              Wireframe
            </button>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                autoRotate ? 'bg-[#FF163A]/20 border-[#FF163A] text-white' : 'border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              Turntable
            </button>
          </div>

          {/* Right: Engine Rev Dyno Button */}
          <div className="pointer-events-auto">
            <button
              onClick={handleRevAudio}
              className={`px-5 py-3 rounded-lg text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                throttlePressed
                  ? 'bg-red-600 scale-95 shadow-[0_0_25px_#FF163A]'
                  : 'bg-[#FF163A] hover:bg-[#e01433] text-white shadow-[0_0_20px_rgba(255,22,58,0.4)]'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Throttle Dyno Acoustic</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
