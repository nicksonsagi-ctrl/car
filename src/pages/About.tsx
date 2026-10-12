import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Wind, 
  Award, 
  Compass, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const About: React.FC = () => {
  const milestones = [
    {
      year: '2023',
      title: 'Skunkworks Genesis in Silverstone',
      description: 'A coalition of championship Grand Prix aerodynamics engineers and aerospace materials scientists founded VELOCITY X to pioneer solid-state hypercars.'
    },
    {
      year: '2024',
      title: 'First 900V Solid-State Pack Unveiled',
      description: 'Revealed the world\'s first zero-thermal-runaway graphene solid-state cell architecture at Goodwood Festival of Speed, producing 1,800+ uninterrupted horsepower.'
    },
    {
      year: '2025',
      title: 'Nürburgring Nordschleife Benchmark: 6:18.42',
      description: 'Apex Valkyrie EX-1 prototype obliterated the production electric circuit lap record on the 20.8 km Nordschleife circuit under FIA verified telemetry.'
    },
    {
      year: '2025',
      title: '0–400–0 km/h in 21.4 Seconds',
      description: 'Demonstrated complete hypercar supremacy, accelerating to 400 km/h and decelerating back to zero in a verified 21.4 seconds.'
    },
    {
      year: '2026',
      title: 'Global Showroom & Private Allocation Debut',
      description: 'Commercial debut of the flagship Velocity Phantom ER-1 and Valkyrie EX-1 with bespoke client studios in Monaco, Tokyo, London, and Dubai.'
    }
  ];

  const leaders = [
    {
      name: 'Dr. Adrian Vance',
      role: 'Chief Aerodynamics Architect',
      background: '14 seasons as Chief Aerodynamicist in Formula 1; specialized in ground effect venturi tunnels and vortex separation.',
      image: '/src/assets/images/hero_velocity_phantom_1791824079856.jpg'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of High-Voltage Powertrain',
      background: 'Former aerospace propulsion lead; engineered our proprietary 900V solid-state graphene cell chemistry and cryogenic inverters.',
      image: '/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg'
    },
    {
      name: 'Marcus Sterling',
      role: 'Director of Vehicle Dynamics & Racing',
      background: 'Le Mans 24 Hours class champion; calibrator of the Neural Vectoring 1,000Hz torque allocation algorithms.',
      image: '/src/assets/images/supercar_spectre_gt_1791824111137.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-20 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span>Our Heritage & Manifesto</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter">
            Born for the <span className="text-[#FF163A]">Apex</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl font-light">
            VELOCITY X was founded on a singular obsession: to conquer the boundary between aeronautical downforce and electric hyper-acceleration.
          </p>
        </div>
      </section>

      {/* CORE PHILOSOPHY & MANIFESTO */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Design Philosophy</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
              Form Follows Aerodynamics. Performance Follows Precision.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We do not add decorative spoilers or superficial air scoops. Every curvature in our carbon monocoque is the physical consequence of fluid dynamics calculation. Air is guided through the chassis to cool cryogenic silicon-carbide inverters and feed massive underfloor venturi tunnels.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              The result is a machine that feels hardwired directly into the asphalt—generating lateral cornering forces exceeding 2.4G while remaining street legal.
            </p>

            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FF163A]" />
                <span>Silverstone R&D HQ</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF163A]" />
                <span>Handcrafted in the UK</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/supercar_spectre_gt_1791824111137.jpg"
              alt="VELOCITY X Studio Design"
              className="w-full h-full object-cover min-h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span>Bespoke Assembly Pavilion</span>
              <span>1 of 25 Limited Annual Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE OF WORLD RECORD MILESTONES */}
      <section className="py-20 border-t border-b border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Track Telemetry</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
              World Record Milestones
            </h2>
            <p className="text-zinc-400 text-sm">
              From our first wind tunnel scale model to dominating the Green Hell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((item, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col justify-between space-y-4 relative group hover:border-[#FF163A]/40 transition-colors">
                <div>
                  <span className="font-display font-black text-3xl text-[#FF163A] tabular-nums block">{item.year}</span>
                  <h3 className="font-display font-bold text-sm text-white uppercase mt-2">{item.title}</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE & ENGINEERING LEADERSHIP */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Master Minds</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
            Engineering Leadership
          </h2>
          <p className="text-zinc-400 text-sm">
            Architects with over 50 combined championship podiums across Formula 1, WEC, and aerospace defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <div key={idx} className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col">
              <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase">{leader.name}</h3>
                  <span className="text-xs font-mono text-[#FF163A] block">{leader.role}</span>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{leader.background}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono font-bold uppercase tracking-wider text-white rounded transition-colors shadow-[0_0_20px_rgba(255,22,58,0.4)]"
          >
            <span>Connect with VIP Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
