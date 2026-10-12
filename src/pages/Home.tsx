import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2, Sparkles, Gauge, Zap, Wind, ShieldCheck, ChevronRight } from 'lucide-react';
import { Supercar3DCanvas } from '../components/three/Supercar3DCanvas';
import { SUPERCARS } from '../data/supercars';
import { hypercarAudio } from '../utils/audioEngine';

export const Home: React.FC = () => {
  const [heroColor, setHeroColor] = useState('#FF163A');
  const [heroFinish, setHeroFinish] = useState<'gloss' | 'matte' | 'metallic'>('metallic');
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [activeWing, setActiveWing] = useState(true);
  const [cameraView, setCameraView] = useState<'orbit' | 'front' | 'side' | 'rear' | 'cockpit'>('orbit');
  const [audioPlayed, setAudioPlayed] = useState(false);

  const featuredCars = SUPERCARS.slice(0, 3);
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const selectedCar = featuredCars[activeCarIndex];

  const handleRevEngine = () => {
    hypercarAudio.revBurst();
    setAudioPlayed(true);
  };

  const heroColors = [
    { name: 'Velocity Crimson', hex: '#FF163A', finish: 'metallic' as const },
    { name: 'Obsidian Stealth', hex: '#111111', finish: 'matte' as const },
    { name: 'Liquid Titanium', hex: '#8E9AA0', finish: 'metallic' as const },
    { name: 'Cyber White', hex: '#EBEBF2', finish: 'gloss' as const },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/10 studio-grid">
        {/* Glow ambient background spot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF163A]/15 blur-[120px] pointer-events-none" />

        {/* Top Hero Typography & Callouts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF163A] animate-ping" />
                <span>2026 Production Specification</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.95]">
                The Future of <span className="text-[#FF163A] text-glow">Speed</span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-light">
                Beyond Speed. Beyond Limits. Engineered with solid-state electric hyper-propulsion and computational active aerodynamics.
              </p>
            </div>

            {/* Quick Actions & Rev Engine Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRevEngine}
                className="px-4 py-2.5 glass-panel border border-white/15 hover:border-[#FF163A] text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-all active:scale-95"
                title="Synthesize 1,980 HP Hypercar Exhaust Acoustic"
              >
                <Volume2 className="w-4 h-4 text-[#FF163A]" />
                <span>{audioPlayed ? 'Rev Throttle' : 'Acoustic Dyno'}</span>
              </button>

              <Link
                to="/showroom"
                className="px-5 py-2.5 bg-[#FF163A] hover:bg-[#e01433] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_0_20px_rgba(255,22,58,0.4)] flex items-center gap-2"
              >
                <span>Enter 3D Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3D SUPERCAR CANVAS CONTAINER */}
        <div className="relative w-full h-[54vh] min-h-[380px] max-h-[620px] my-auto">
          <Supercar3DCanvas
            bodyColor={heroColor}
            finish={heroFinish}
            doorsOpen={doorsOpen}
            activeWing={activeWing}
            cameraView={cameraView}
            className="w-full h-full"
          />

          {/* Interactive Floating Control Bar */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={() => setDoorsOpen(!doorsOpen)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase transition-colors rounded border ${
                doorsOpen ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'glass-panel border-white/15 text-zinc-300 hover:text-white'
              }`}
            >
              {doorsOpen ? 'Close Doors' : 'Open Doors'}
            </button>
            <button
              onClick={() => setActiveWing(!activeWing)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase transition-colors rounded border ${
                activeWing ? 'bg-[#FF163A] border-[#FF163A] text-white' : 'glass-panel border-white/15 text-zinc-300 hover:text-white'
              }`}
            >
              Active DRS: {activeWing ? 'High Downforce' : 'Low Drag'}
            </button>
          </div>

          {/* Camera View Switcher */}
          <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-1.5 glass-panel p-1 border border-white/10 rounded">
            {(['orbit', 'front', 'side', 'cockpit'] as const).map(view => (
              <button
                key={view}
                onClick={() => setCameraView(view)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-colors ${
                  cameraView === view ? 'bg-[#FF163A] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Color Switcher Bar */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 glass-panel p-2 border border-white/10 rounded">
            <span className="text-[10px] uppercase font-mono text-zinc-400 mr-1 hidden sm:inline">Finish:</span>
            {heroColors.map(c => (
              <button
                key={c.name}
                onClick={() => {
                  setHeroColor(c.hex);
                  setHeroFinish(c.finish);
                }}
                className={`w-6 h-6 rounded-full border transition-all ${
                  heroColor === c.hex ? 'border-white scale-110 ring-2 ring-[#FF163A]' : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>
        </div>

        {/* Hero Bottom Telemetry KPI Strip */}
        <div className="border-t border-white/10 bg-[#080808]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-2 md:pt-0">
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono block">Peak Output</span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">1,980 <span className="text-xs text-[#FF163A]">HP</span></p>
                <span className="text-[10px] text-zinc-500 font-mono">Quad Axial-Flux Hubs</span>
              </div>
              <div className="pt-2 md:pt-0">
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono block">0–100 km/h</span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">1.74 <span className="text-xs text-[#FF163A]">SEC</span></p>
                <span className="text-[10px] text-zinc-500 font-mono">Torque Vector Launch</span>
              </div>
              <div className="pt-2 md:pt-0">
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono block">Terminal Velocity</span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">442 <span className="text-xs text-[#FF163A]">KM/H</span></p>
                <span className="text-[10px] text-zinc-500 font-mono">Aerodynamic Low-Drag Mode</span>
              </div>
              <div className="pt-2 md:pt-0">
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono block">Peak Downforce</span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">1,250 <span className="text-xs text-[#FF163A]">KG</span></p>
                <span className="text-[10px] text-zinc-500 font-mono">At 250 km/h Circuit Pace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SUPERCARS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A] block mb-2">Fleet Prototypes</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">Featured Supercars</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/collection"
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View Full 6-Car Fleet</span>
              <ChevronRight className="w-4 h-4 text-[#FF163A]" />
            </Link>
          </div>
        </div>

        {/* Model Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8 overflow-x-auto pb-2">
          {featuredCars.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => setActiveCarIndex(idx)}
              className={`px-5 py-3 text-xs font-display uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeCarIndex === idx
                  ? 'border-[#FF163A] text-white bg-white/5 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              {car.name}
            </button>
          ))}
        </div>

        {/* Active Car Spotlight Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Cinematic Car Visual */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-white/10 bg-zinc-950 group">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-full min-h-[380px] max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">{selectedCar.category}</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white mt-1">{selectedCar.name}</h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-md">{selectedCar.tagline}</p>
              </div>
              <Link
                to={`/cars/${selectedCar.id}`}
                className="px-4 py-2 bg-white/10 hover:bg-[#FF163A] text-white text-xs font-mono uppercase tracking-wider transition-colors rounded backdrop-blur-md"
              >
                Inspect Telemetry
              </Link>
            </div>
          </div>

          {/* Right: Technical Specs & Configurator Launch */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-lg border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Powertrain</span>
                <h4 className="font-display font-bold text-xl text-white mt-0.5">{selectedCar.powertrain}</h4>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{selectedCar.description}</p>
              </div>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">Power</span>
                  <p className="font-display font-bold text-lg text-white">{selectedCar.horsepower} HP</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">Top Speed</span>
                  <p className="font-display font-bold text-lg text-white">{selectedCar.topSpeed} km/h</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">Acceleration</span>
                  <p className="font-display font-bold text-lg text-white">{selectedCar.acceleration}s (0-100)</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">Max Downforce</span>
                  <p className="font-display font-bold text-lg text-white">{selectedCar.downforce} kg</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Demo Base Valuation</span>
                <p className="font-display font-black text-2xl text-[#FF163A]">${(selectedCar.price).toLocaleString()} USD</p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/configurator?car=${selectedCar.id}`}
                className="flex-1 py-3 text-center bg-[#FF163A] hover:bg-[#e01433] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_0_15px_rgba(255,22,58,0.35)]"
              >
                Customize Build
              </Link>
              <Link
                to={`/test-drive?car=${selectedCar.id}`}
                className="flex-1 py-3 text-center glass-panel border border-white/15 hover:border-white text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                Track Test Drive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE AERODYNAMICS & TECHNOLOGY BENTO PREVIEW */}
      <section className="py-20 border-t border-b border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Proprietary Architecture</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">Computational Aerodynamics</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Every curve, intake, and venturi tunnel on a VELOCITY X chassis is mathematically honed through 10,000+ hours of digital supercomputer fluid dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-lg border border-white/10 hover:border-[#FF163A]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded bg-[#FF163A]/10 border border-[#FF163A]/30 flex items-center justify-center text-[#FF163A]">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Active Drag Reduction (DRS)</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Electro-hydraulic swan-neck wing pylons adapt pitch within 15 milliseconds, trimming drag on straights and snapping into an airbrake configuration under severe deceleration.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-lg border border-white/10 hover:border-[#FF163A]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded bg-[#FF163A]/10 border border-[#FF163A]/30 flex items-center justify-center text-[#FF163A]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">900V Graphene Solid-State</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Replaces conventional volatile liquid electrolyte with solid polymer ceramic separators. Delivers 2.5C continuous discharge rate with zero thermal derating over 10 consecutive track laps.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-lg border border-white/10 hover:border-[#FF163A]/40 transition-colors space-y-4">
              <div className="w-12 h-12 rounded bg-[#FF163A]/10 border border-[#FF163A]/30 flex items-center justify-center text-[#FF163A]">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">1,000Hz Neural Vectoring</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Four independent axial-flux motors command torque independently at each wheel hub. Predictive yaw sensors simulate friction coefficient before the tire even enters the turn.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF163A] hover:text-white transition-colors"
            >
              <span>Explore full technological whitepaper</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COCKPIT & PILOT INTERACTION SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Driver Centricity</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
              A Holographic Cockpit Forged for Control
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Step inside the cockpit of tomorrow. A panoramic heads-up display projects real-time racing line telemetry, apex braking points, and thermal tire maps directly onto the windshield.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <ShieldCheck className="w-5 h-5 text-[#FF163A] shrink-0" />
                <span>Single-piece molded carbon fiber pilot shell tuned to your biometric measurements</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Sparkles className="w-5 h-5 text-[#FF163A] shrink-0" />
                <span>Tactile milled aluminum dials with active micro-haptic feedback</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Gauge className="w-5 h-5 text-[#FF163A] shrink-0" />
                <span>Sub-millisecond steering angle sensors paired with active variable-ratio rack</span>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/test-drive"
                className="px-6 py-3.5 bg-[#FF163A] hover:bg-[#e01433] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_0_20px_rgba(255,22,58,0.4)]"
              >
                Experience Cockpit Simulator
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/supercar_cockpit_hud_1791824124829.jpg"
              alt="VELOCITY X Cockpit Telemetry"
              className="w-full h-full object-cover min-h-[380px] max-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> HUD Active</span>
              <span>Monza GP Layout · Telemetry Mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL TEST DRIVE CTA BANNER */}
      <section className="relative overflow-hidden border-t border-white/10 py-20 bg-gradient-to-r from-zinc-950 via-[#12080a] to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A] inline-block">Private Circuit Invitations</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight max-w-3xl mx-auto">
            Ready to Command 2,000+ Horsepower?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reserve a VIP private track session at Monza, Silverstone, or the Nürburgring with our championship factory test pilots.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/test-drive"
              className="px-8 py-4 bg-[#FF163A] hover:bg-[#e01433] text-xs font-black uppercase tracking-widest text-white transition-all shadow-[0_0_25px_rgba(255,22,58,0.5)]"
            >
              Book Private Circuit Test Drive
            </Link>
            <Link
              to="/configurator"
              className="px-8 py-4 glass-panel border border-white/20 hover:border-white text-xs font-black uppercase tracking-widest text-white transition-all"
            >
              Launch 3D Configurator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
