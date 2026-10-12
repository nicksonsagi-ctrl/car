import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Wind, 
  Shield, 
  Cpu, 
  Gauge, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react';

export const Technology: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'powertrain' | 'aero' | 'chassis' | 'neural' | 'braking'>('powertrain');

  const systems = [
    {
      id: 'powertrain' as const,
      name: '900V Graphene Solid-State',
      subtitle: 'Energy Density Re-Imagined',
      icon: Zap,
      stat: '2,150 HP',
      statLabel: 'Peak Power Output',
      description: 'Conventional lithium-ion cells fail under continuous high-discharge circuit conditions. VELOCITY X replaces liquid electrolyte with solid graphene-doped ceramic separators. This delivers an unprecedented 520 Wh/kg energy density with zero thermal runaway risk.',
      highlights: [
        '900V operating bus architecture with sub-12 minute 10-80% ultra-fast charging',
        '2.5C continuous discharge rate with zero performance derating over multiple hot laps',
        'Direct submerged dielectric fluid cooling routed through laser-sintered channels',
        'Four independent axial-flux motors achieving 98.4% electrical efficiency'
      ],
      telemetry: {
        voltage: '900 VDC',
        thermalMax: '48°C (Steady State)',
        efficiency: '98.4%',
        inverterFrequency: '40 kHz Silicon Carbide'
      }
    },
    {
      id: 'aero' as const,
      name: 'Active Venturi Aerodynamics',
      subtitle: 'Harnessing the Ground Effect',
      icon: Wind,
      stat: '1,680 KG',
      statLabel: 'Peak Downforce at 250 km/h',
      description: 'Airflow is sculpted, not resisted. Dual venturi underbody tunnels run the full length of the monocoque, pulling the car onto the asphalt using Bernoulli ground effect suction. A dynamic swan-neck rear wing adjusts pitch within 15 milliseconds.',
      highlights: [
        'Electro-hydraulic active DRS reduces drag by 34% on straightaways',
        'Active front venturi flaps balance aero center-of-pressure during corner entry',
        'Full-width rear diffuser with carbon fiber vortex-generating fins',
        'Wheel arch extraction louvers bleed high-pressure air to prevent front axle lift'
      ],
      telemetry: {
        dragCoeff: '0.27 – 0.38 (Dynamic)',
        wingActuationTime: '15 ms',
        downforceBalance: '48% Front / 52% Rear',
        airbrakeResistance: '+650 kg deceleration force'
      }
    },
    {
      id: 'chassis' as const,
      name: 'Carbon-Titanium Monocoque',
      subtitle: 'Ultralight Structural Rigidity',
      icon: Shield,
      stat: '58,000 NM/°',
      statLabel: 'Torsional Stiffness',
      description: 'Manufactured using aerospace autoclaves at 12 bar pressure, our passenger safety cell incorporates T1000 carbon fiber interwoven with titanium strands. In the event of high-velocity impact, titanium threads arrest carbon splintering, creating an unyielding survival capsule.',
      highlights: [
        'Total dry chassis tub weight of just 98 kg without subframes',
        'Direct suspension mount points machined from billet titanium Grade 5',
        'Integrated battery compartment acting as a stressed structural member',
        'Meets and surpasses FIA LMH crash impact homologation benchmarks'
      ],
      telemetry: {
        tubWeight: '98 kg',
        carbonType: 'Torayca T1000G / Ti-Weave',
        autoclavePressure: '12.4 Bar',
        gForceAbsorption: '55G Peak Load'
      }
    },
    {
      id: 'neural' as const,
      name: 'Neural Vectoring AI',
      subtitle: 'Millisecond Predictive Dynamic Control',
      icon: Cpu,
      stat: '1,000 HZ',
      statLabel: 'Wheel Control Calculation Rate',
      description: 'Mechanical differentials cannot match the speed of light. Our proprietary Neural Vectoring CPU calculates individual wheel torque demands 1,000 times per second, analyzing steering angle, yaw velocity, slip angle, and tire carcass temperatures to pivot the car into corners seamlessly.',
      highlights: [
        'Predictive traction model pre-empts oversteer before the driver senses slip',
        'Virtual electronic limited-slip distribution with regenerative yaw torque',
        'Driver biometric sync: cockpit adjusts damping and throttle aggression to heart rate',
        'Over-the-air track profile downloads for 40+ global racing circuits'
      ],
      telemetry: {
        pollingRate: '1,000 Hz',
        latency: '0.8 ms',
        slipPredictionAccuracy: '99.4%',
        processingCores: 'Dual Lockstep ARM Cortex-R8'
      }
    },
    {
      id: 'braking' as const,
      name: 'Kinetic Regenerative Braking',
      subtitle: 'Surgical Deceleration Performance',
      icon: Gauge,
      stat: '1.85 G',
      statLabel: 'Peak Braking Deceleration',
      description: 'Combines massive 430mm carbon-ceramic ventilated discs with an 800 kW regenerative motor drag system. In high-speed braking from 300 km/h, up to 70% of kinetic energy is instantaneously reclaimed back into the solid-state cells while stopping distance is dramatically compressed.',
      highlights: [
        'Monobloc 10-piston forged titanium front brake calipers',
        '430mm x 38mm cross-drilled carbon-ceramic composite rotors',
        'Brake-by-wire hydraulic blending seamlessly merges regen with friction',
        'Zero thermal brake fade up to 1,000°C rotor temperature'
      ],
      telemetry: {
        discDiameter: '430 mm Front / 405 mm Rear',
        regenRegenerationPeak: '800 kW',
        stoppingDistance: '100-0 km/h in 28.5 meters',
        tempThreshold: '1,050°C'
      }
    }
  ];

  const current = systems.find(s => s.id === activeSystem) || systems[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-20 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span>VELOCITY X Engineering Whitepaper</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter">
            Proprietary <span className="text-[#FF163A]">Technology</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl font-light">
            We do not follow industry standards; we establish new physical boundaries. Explore the mechanical, chemical, and computational architecture powering our hypercars.
          </p>
        </div>
      </section>

      {/* SYSTEMS NAVIGATION STRIP */}
      <section className="border-b border-white/10 bg-[#080808] sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {systems.map(sys => {
              const Icon = sys.icon;
              const isSelected = activeSystem === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => setActiveSystem(sys.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#FF163A] text-white font-bold shadow-[0_0_15px_rgba(255,22,58,0.4)]'
                      : 'glass-panel text-zinc-400 hover:text-white border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sys.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACTIVE SYSTEM DEEP DIVE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Technical Narrative & Key Features */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#FF163A] uppercase tracking-widest">{current.subtitle}</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                {current.name}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2">
                {current.description}
              </p>
            </div>

            {/* Key Innovations Checklist */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                Engineering Invariants & Benchmarks
              </h3>
              <div className="space-y-3">
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FF163A] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry Specs Matrix Card */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-xl border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Benchmark Metric</span>
              <current.icon className="w-6 h-6 text-[#FF163A]" />
            </div>

            <div className="py-2">
              <span className="text-xs font-mono text-zinc-500 uppercase block">{current.statLabel}</span>
              <p className="font-display font-black text-4xl sm:text-5xl text-white text-glow mt-1">
                {current.stat}
              </p>
            </div>

            {/* Telemetry Key-Value Table */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Laboratory Verified Telemetry</span>
              {Object.entries(current.telemetry).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-white font-bold text-right">{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/configurator"
                className="w-full py-3 text-center bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono font-bold uppercase tracking-wider text-white rounded transition-colors"
              >
                Configure Vehicle with {current.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AERODYNAMICS WIND TUNNEL VIDEO/PHOTO FEATURE */}
      <section className="py-20 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg"
              alt="Wind Tunnel Testing"
              className="w-full h-full object-cover min-h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-[#FF163A]" /> 300 km/h Smoke Streak Test</span>
              <span>Silverstone Aero Tunnel No. 4</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Validation Process</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
              Tested to the Physical Absolute
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Before a single millimeter of carbon pre-preg is cut, every surface undergoes 128-core computational fluid dynamics simulations. Prototypes then spend over 400 hours in our Silverstone scale wind tunnel verifying boundary layer laminar flow and turbulent wake separation.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
              <div className="p-4 bg-zinc-900/60 rounded border border-white/10">
                <span className="text-zinc-500 uppercase block">CFD Resolution</span>
                <p className="font-display font-bold text-lg text-white mt-1">1.2 Billion</p>
                <span className="text-[10px] text-zinc-400">Mesh Polyhedral Cells</span>
              </div>
              <div className="p-4 bg-zinc-900/60 rounded border border-white/10">
                <span className="text-zinc-500 uppercase block">Track Validation</span>
                <p className="font-display font-bold text-lg text-white mt-1">150,000+ KM</p>
                <span className="text-[10px] text-zinc-400">Nordschleife & Monza</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/test-drive"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF163A] hover:text-white transition-colors"
              >
                <span>Book circuit session to test aerodynamics live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
