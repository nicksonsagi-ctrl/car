import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Volume2, 
  Gauge, 
  Zap, 
  Wind, 
  ShieldCheck, 
  Sliders, 
  ArrowRight, 
  Sparkles,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { SUPERCARS } from '../data/supercars';
import { Supercar3DCanvas } from '../components/three/Supercar3DCanvas';
import { hypercarAudio } from '../utils/audioEngine';

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const car = SUPERCARS.find(c => c.id === id) || SUPERCARS[0];

  const [activeColor, setActiveColor] = useState(car.colorOptions[0].hex);
  const [activeFinish, setActiveFinish] = useState<'gloss' | 'matte' | 'metallic'>(car.colorOptions[0].finish);
  const [activeWing, setActiveWing] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [cameraView, setCameraView] = useState<'orbit' | 'front' | 'side' | 'rear' | 'cockpit'>('orbit');
  const [audioRevved, setAudioRevved] = useState(false);

  const handleRevAudio = () => {
    hypercarAudio.revBurst();
    setAudioRevved(true);
  };

  // Performance calculations
  const powerToWeight = (car.horsepower / (car.weight / 1000)).toFixed(0); // HP per ton

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* BREADCRUMB & HEADER BAR */}
      <div className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/collection"
              className="p-2 glass-panel border border-white/10 rounded text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] font-mono text-[#FF163A] uppercase tracking-widest block">
                {car.category} · {car.releaseYear} Prototype
              </span>
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-0.5">
                {car.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRevAudio}
              className="px-4 py-2 glass-panel border border-white/15 hover:border-[#FF163A] text-xs font-mono uppercase text-white rounded flex items-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-[#FF163A]" />
              <span>{audioRevved ? 'Throttle Dyno' : 'Acoustic Exhaust'}</span>
            </button>

            <Link
              to={`/configurator?car=${car.id}`}
              className="px-5 py-2 bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono font-bold uppercase tracking-wider text-white rounded transition-all shadow-[0_0_15px_rgba(255,22,58,0.4)]"
            >
              Configure Build
            </Link>
          </div>
        </div>
      </div>

      {/* 3D INTERACTIVE WORKSPACE SECTION */}
      <section className="relative border-b border-white/10 bg-black">
        <div className="h-[520px] w-full relative">
          <Supercar3DCanvas
            bodyColor={activeColor}
            finish={activeFinish}
            activeWing={activeWing}
            doorsOpen={doorsOpen}
            cameraView={cameraView}
            className="w-full h-full"
          />

          {/* Quick Perspective Switcher */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 glass-panel p-1 rounded border border-white/10 text-[10px] font-mono">
            {(['orbit', 'front', 'side', 'rear', 'cockpit'] as const).map(v => (
              <button
                key={v}
                onClick={() => setCameraView(v)}
                className={`px-2.5 py-1 rounded uppercase transition-colors ${
                  cameraView === v ? 'bg-[#FF163A] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Actuator Toggles */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setDoorsOpen(!doorsOpen)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                doorsOpen ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'glass-panel border-white/10 text-zinc-300'
              }`}
            >
              {doorsOpen ? 'Doors Open' : 'Doors Closed'}
            </button>
            <button
              onClick={() => setActiveWing(!activeWing)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeWing ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'glass-panel border-white/10 text-zinc-300'
              }`}
            >
              {activeWing ? 'Active DRS: High Wing' : 'Active DRS: Low Drag'}
            </button>
          </div>

          {/* Color Switcher Bar */}
          <div className="absolute bottom-4 left-4 z-20 glass-panel p-2 rounded border border-white/10 flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1">Chassis:</span>
            {car.colorOptions.map(c => (
              <button
                key={c.name}
                onClick={() => {
                  setActiveColor(c.hex);
                  setActiveFinish(c.finish);
                }}
                className={`w-6 h-6 rounded-full border transition-all ${
                  activeColor === c.hex ? 'border-white scale-110 ring-2 ring-[#FF163A]' : 'border-white/20'
                }`}
                style={{ backgroundColor: c.hex }}
                title={`${c.name} (${c.finish})`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE TELEMETRY & SPECIFICATIONS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 glass-panel p-6 rounded-2xl border border-white/10">
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase block">Total Output</span>
            <p className="font-display font-black text-3xl text-white mt-1">{car.horsepower} <span className="text-xs text-[#FF163A]">HP</span></p>
            <span className="text-[10px] text-zinc-400 font-mono">{car.powertrain}</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block">Top Speed</span>
            <p className="font-display font-black text-3xl text-white mt-1">{car.topSpeed} <span className="text-xs text-[#FF163A]">KM/H</span></p>
            <span className="text-[10px] text-zinc-400 font-mono">Aerodynamic Limit</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block">0–100 km/h</span>
            <p className="font-display font-black text-3xl text-white mt-1">{car.acceleration} <span className="text-xs text-[#FF163A]">SEC</span></p>
            <span className="text-[10px] text-zinc-400 font-mono">Sub-2.0s Launch</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-[11px] font-mono text-zinc-500 uppercase block">Power-to-Weight</span>
            <p className="font-display font-black text-3xl text-white mt-1">{powerToWeight} <span className="text-xs text-[#FF163A]">HP/TON</span></p>
            <span className="text-[10px] text-zinc-400 font-mono">Dry Mass: {car.weight} kg</span>
          </div>
        </div>

        {/* Narrative & Aerodynamics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Engineering Manifesto</span>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white">
                {car.tagline}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {car.longDescription}
              </p>
            </div>

            {/* Aerodynamics Specification */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm uppercase text-white flex items-center gap-2">
                  <Wind className="w-4 h-4 text-[#FF163A]" /> Active Aerodynamics Matrix
                </span>
                <span className="text-xs font-mono text-zinc-400">Cd: {car.aerodynamics.dragCoefficient}</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                {car.aerodynamics.activeElements.map((elem, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF163A] shrink-0" />
                    <span>{elem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Track Package Features */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">Factory Standard Inclusions</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                {car.features.map((feat, i) => (
                  <div key={i} className="p-3 bg-zinc-900/60 rounded border border-white/5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF163A] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dyno Power Curve & Direct CTAs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dyno Power Curve Chart Simulation */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Dyno Power Curve</span>
                <span className="text-[10px] font-mono text-[#FF163A]">12,500 RPM Redline</span>
              </div>

              {/* Simulated Dyno SVG Curve */}
              <div className="relative h-44 w-full bg-zinc-950/80 rounded border border-white/5 p-3 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                  <span>2,000 HP</span>
                  <span>100% Torque Instantaneous</span>
                </div>
                <svg className="w-full h-28 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="2" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="2" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="2" />
                  {/* Torque curve (flatter blue) */}
                  <path d="M 0 30 Q 80 20 180 22 T 300 35" fill="none" stroke="#4488ff" strokeWidth="2" />
                  {/* Power curve (rising red) */}
                  <path d="M 0 95 Q 120 70 220 25 T 300 10" fill="none" stroke="#FF163A" strokeWidth="2.5" />
                </svg>
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span className="text-red-400">■ Horsepower Curve</span>
                  <span className="text-blue-400">■ Torque (Nm)</span>
                  <span>12.5k RPM</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono text-zinc-300 divide-y divide-white/10">
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Peak Torque:</span>
                  <span className="text-white font-bold">{car.torque} Nm</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Estimated Range:</span>
                  <span className="text-white font-bold">{car.range} km</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Peak Downforce:</span>
                  <span className="text-white font-bold">{car.downforce} kg</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Base Demo Valuation:</span>
                  <span className="text-[#FF163A] font-black text-sm">${car.price.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {/* Launch Actions */}
            <div className="space-y-3">
              <Link
                to={`/configurator?car=${car.id}`}
                className="w-full py-4 bg-[#FF163A] hover:bg-[#e01433] text-white text-xs font-mono font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,22,58,0.4)]"
              >
                <span>Customize in 3D Configurator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={`/test-drive?car=${car.id}`}
                className="w-full py-3.5 glass-panel border border-white/20 hover:border-white text-white text-xs font-mono font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span>Book Circuit Test Drive</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
