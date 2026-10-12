import { Supercar } from '../types';

export const SUPERCARS: Supercar[] = [
  {
    id: 'phantom-er1',
    name: 'Velocity Phantom ER-1',
    tagline: 'The Apex of Pure Electric Dominance',
    category: 'Hypercar',
    powertrain: 'Quad-Electric',
    horsepower: 1980,
    topSpeed: 442,
    acceleration: 1.74,
    torque: 2200,
    range: 580,
    weight: 1680,
    downforce: 1250,
    price: 3200000,
    releaseYear: 2026,
    featured: true,
    image: '/src/assets/images/hero_velocity_phantom_1791824079856.jpg',
    description: 'Forged from high-tensile carbon-titanium with a 900V solid-state architecture, the Phantom ER-1 delivers instantaneous sub-2-second velocity with surgical vectoring.',
    longDescription: 'The Velocity Phantom ER-1 represents the undisputed zenith of automotive engineering. Built around a monocoque sculptured in our Silverstone skunkworks, each corner is energized by an axial-flux motor capable of independent wheel torque vectoring 1,000 times per second. Active aerodynamic strakes dynamically channel downforce into corner apexes.',
    colorOptions: [
      { name: 'Velocity Crimson', hex: '#FF163A', finish: 'metallic' },
      { name: 'Obsidian Stealth', hex: '#111111', finish: 'matte' },
      { name: 'Liquid Titanium', hex: '#8E9AA0', finish: 'metallic' },
      { name: 'Cyber White', hex: '#F0F0F5', finish: 'gloss' },
      { name: 'Abyssal Blue', hex: '#002B49', finish: 'metallic' },
    ],
    wheelOptions: ['21" Carbon Aero Blades', '20"/21" Forged Monoblock V-Spoke', 'Ultra-Light Magnesium Turbines'],
    features: [
      'Four Independent Axial-Flux Electric Motors',
      '900V Graphene Solid-State Cell Pack',
      'Adaptive Electro-Hydraulic Active Aero Wing',
      'Carbon-Ceramic Discs with Monobloc 10-Piston Calipers',
      'Holographic Augmented Windshield HUD'
    ],
    aerodynamics: {
      dragCoefficient: 0.28,
      activeElements: ['Front active underbody venturi flaps', 'Adaptive dual-plane rear DRS wing', 'Active vortex generators']
    }
  },
  {
    id: 'valkyrie-ex1',
    name: 'Apex Valkyrie EX-1',
    tagline: 'Wind Tunnel Sculpted. Track Decimating.',
    category: 'Track Spec',
    powertrain: 'Solid-State EV',
    horsepower: 2150,
    topSpeed: 465,
    acceleration: 1.68,
    torque: 2450,
    range: 520,
    weight: 1540,
    downforce: 1680,
    price: 3850000,
    releaseYear: 2026,
    featured: true,
    image: '/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg',
    description: 'A purebred circuit monster with ground-effect venturi tunnels delivering over 1.6 tons of downforce at racing speeds.',
    longDescription: 'Engineered solely for devastating lap records, the Valkyrie EX-1 incorporates Formula 1-derived aerodynamics. Its hollow carbon structure routes cooling air directly through the chassis to cryogenic inverters, enabling continuous maximum output without thermal degradation.',
    colorOptions: [
      { name: 'Apex Silver', hex: '#D2D8DE', finish: 'metallic' },
      { name: 'Rallye Red', hex: '#E60026', finish: 'gloss' },
      { name: 'Raw Carbon Weave', hex: '#1C1C1E', finish: 'matte' },
      { name: 'Aurora Gold', hex: '#D4AF37', finish: 'metallic' },
    ],
    wheelOptions: ['Center-Lock Carbon Superleggera', 'Aero Disk Pro Track', 'Forged Dual-5 Spoke'],
    features: [
      'Dual-Chamber Cryogenic Inverter Cooling',
      'Full Floor Venturi Ground Effect Downforce',
      'Center-Lock Forged Magnesium Racing Hubs',
      'Telemetry Synchronized Active Aero Splitter',
      'Carbon Bucket Seats with 6-Point Harness'
    ],
    aerodynamics: {
      dragCoefficient: 0.31,
      activeElements: ['Active front splitter height actuator', 'High-downforce swan-neck wing with DRS', 'Wheel arch pressure extractors']
    }
  },
  {
    id: 'spectre-gt',
    name: 'Spectre GT Turbo',
    tagline: 'V12 Symphony Meets Electric Precision',
    category: 'Grand Tourer',
    powertrain: 'Twin-Turbo V12 Hybrid',
    horsepower: 1720,
    topSpeed: 420,
    acceleration: 2.10,
    torque: 1880,
    range: 750,
    weight: 1790,
    downforce: 950,
    price: 2850000,
    releaseYear: 2025,
    featured: true,
    image: '/src/assets/images/supercar_spectre_gt_1791824111137.jpg',
    description: 'An uncompromising Grand Tourer harmonizing a bespoke 6.5L twin-turbo V12 with triple electric motors for effortless cross-continental luxury and ferocity.',
    longDescription: 'The Spectre GT Turbo unites acoustic internal combustion euphoria with instant electric boost. Handcrafted aniline leather blends seamlessly with titanium tactile dials and active noise cancellation, creating a serene sanctuary at triple-digit speeds.',
    colorOptions: [
      { name: 'Deep Obsidian', hex: '#0B0C0E', finish: 'metallic' },
      { name: 'Monaco Ruby', hex: '#8B0000', finish: 'metallic' },
      { name: 'Graphite Grey', hex: '#3A3F47', finish: 'matte' },
      { name: 'Champagne Quartz', hex: '#E3DAC9', finish: 'gloss' },
    ],
    wheelOptions: ['21"/22" Diamond-Cut Forged Alloys', 'Forged Multi-Spoke GT Edition', 'Polished Carbon Fiber Discs'],
    features: [
      '6.5L Twin-Turbo 65° V12 Combustion Engine',
      'Triple-Motor Hybrid All-Wheel Drive System',
      'Inconel Titanium Exhaust with Acoustic Valves',
      'Aniline Leather Cockpit with Carbon Weave Accents',
      'Adaptive Air Suspension with Road Preview'
    ],
    aerodynamics: {
      dragCoefficient: 0.27,
      activeElements: ['Retractable speed-activated rear spoiler', 'Variable cooling gill flaps', 'Aerodynamic side skirt flow channels']
    }
  },
  {
    id: 'aetheris-hydra',
    name: 'Aetheris Hydra X',
    tagline: 'Micro-Turbine Clean Hydrogen Hypercar',
    category: 'Experimental',
    powertrain: 'Hydrogen Turbine Hybrid',
    horsepower: 2050,
    topSpeed: 450,
    acceleration: 1.82,
    torque: 2300,
    range: 850,
    weight: 1620,
    downforce: 1100,
    price: 4100000,
    releaseYear: 2027,
    featured: false,
    image: '/src/assets/images/hero_velocity_phantom_1791824079856.jpg',
    description: 'Zero emissions with visceral jet-turbine sound. Twin hydrogen micro-turbines continuously generate electricity for quadruple 500hp traction hubs.',
    longDescription: 'Representing the horizon of high-performance propulsion, the Hydra X replaces heavy battery banks with 700-bar carbon-wrapped hydrogen vessels feeding ultra-compact micro-turbines spinning at 110,000 RPM. Refueling completes in three minutes.',
    colorOptions: [
      { name: 'Nebula Crimson', hex: '#C70039', finish: 'metallic' },
      { name: 'Frosted Quartz', hex: '#E8ECF1', finish: 'matte' },
      { name: 'Midnight Carbon', hex: '#141416', finish: 'gloss' },
    ],
    wheelOptions: ['20" Turbine Aero Rotors', 'Forged Monoblock Ultra-Light', 'Carbon Spoke Concept'],
    features: [
      'Dual 110,000 RPM Ceramic Micro-Turbines',
      '700-Bar Filament-Wound Hydrogen Fuel Cells',
      'Active Kinetic Energy Recovery Flywheel',
      'Zero Direct Carbon Emission Architecture',
      'Ceramic Carbon High-Temperature Exhaust Diverter'
    ],
    aerodynamics: {
      dragCoefficient: 0.26,
      activeElements: ['Blown diffuser with turbine exhaust gas routing', 'Active aerodynamic front vents', 'Dynamic rear tail extensions']
    }
  },
  {
    id: 'kinetix-pulse',
    name: 'Kinetix Pulse Zero',
    tagline: 'Extreme Downforce Active Aero Masterpiece',
    category: 'Track Spec',
    powertrain: 'Quad-Electric',
    horsepower: 1850,
    topSpeed: 435,
    acceleration: 1.79,
    torque: 2100,
    range: 610,
    weight: 1590,
    downforce: 1550,
    price: 3450000,
    releaseYear: 2026,
    featured: false,
    image: '/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg',
    description: 'Engineered for extreme lateral G-forces with yaw-correcting aero fins and electro-magnetic damping that glues the chassis to tarmac.',
    longDescription: 'The Pulse Zero was honed on the Nordschleife to break lateral acceleration boundaries. With its dual side-pod air channels and active stabilizing vertical fins, it sustains over 2.4G of lateral acceleration through high-speed sweepers.',
    colorOptions: [
      { name: 'Electric Scarlet', hex: '#FF0F39', finish: 'gloss' },
      { name: 'Stealth Anthracite', hex: '#232528', finish: 'metallic' },
      { name: 'Arctic Ghost', hex: '#FFFFFF', finish: 'matte' },
    ],
    wheelOptions: ['Track Flow Forged Rim', 'Full Aero Carbon Disc', 'Magnesium Star Lightweight'],
    features: [
      'Active Lateral Yaw-Stabilizing Vertical Aero Fins',
      'MagneRide Gen-5 Millisecond Active Dampers',
      'Quad Silicon-Carbide High Frequency Inverters',
      'Dynamic Downforce Balancing CPU',
      'Full Driver Biometric Telemetry Feedback'
    ],
    aerodynamics: {
      dragCoefficient: 0.29,
      activeElements: ['Yaw stabilizing roof shark fin', 'Active lower rear diffuser slats', 'Independent front brake cooling ducts']
    }
  },
  {
    id: 'chronos-v',
    name: 'Chronos Hyper-V',
    tagline: 'Endurance Prototype for the 24-Hour Digital Era',
    category: 'Experimental',
    powertrain: 'Solid-State EV',
    horsepower: 1910,
    topSpeed: 438,
    acceleration: 1.76,
    torque: 2150,
    range: 640,
    weight: 1610,
    downforce: 1380,
    price: 3600000,
    releaseYear: 2026,
    featured: false,
    image: '/src/assets/images/supercar_spectre_gt_1791824111137.jpg',
    description: 'Designed to sustain brutal track pace for hours without thermal throttling, featuring rapid modular battery swapping and ultra-dense cooling matrices.',
    longDescription: 'Chronos Hyper-V translates endurance racing DNA into a road-legal hypercar. Engineered with dual titanium liquid heat exchangers and high-discharge pouch cells, it holds full power output for uninterrupted track sessions.',
    colorOptions: [
      { name: 'Solaris Red', hex: '#D62246', finish: 'metallic' },
      { name: 'Cosmic Onyx', hex: '#161618', finish: 'gloss' },
      { name: 'Sterling Silver', hex: '#B8C0C8', finish: 'metallic' },
    ],
    wheelOptions: ['21" Aero Chrono Alloys', 'Forged Lightweight Track 10-Spoke', 'Carbon Fiber Aero Disk'],
    features: [
      'High-Flow Dual Titanium Heat Exchangers',
      'Symmetric 50:50 Weight Distribution Chassis',
      'Rapid 350kW DC Fast Charge Solid-State Cells',
      'Full Monocoque Integrated Roll Cage',
      'Predictive Turn-by-Turn Energy Optimizer'
    ],
    aerodynamics: {
      dragCoefficient: 0.28,
      activeElements: ['Dual-stage active rear wing', 'Front bonnet extraction ducts', 'Underfloor vortex generators']
    }
  }
];

export const TRACK_LOCATIONS = [
  { id: 'monza', name: 'Autodromo Nazionale Monza', country: 'Italy', length: '5.79 km', topSpeedSector: '360 km/h', turns: 11 },
  { id: 'nurburgring', name: 'Nürburgring Nordschleife', country: 'Germany', length: '20.83 km', topSpeedSector: '345 km/h', turns: 73 },
  { id: 'silverstone', name: 'Silverstone Grand Prix Circuit', country: 'United Kingdom', length: '5.89 km', topSpeedSector: '335 km/h', turns: 18 },
  { id: 'laguna-seca', name: 'WeatherTech Raceway Laguna Seca', country: 'USA', length: '3.60 km', topSpeedSector: '290 km/h', turns: 11 },
  { id: 'fuji', name: 'Fuji International Speedway', country: 'Japan', length: '4.56 km', topSpeedSector: '350 km/h', turns: 16 },
  { id: 'dubai-autodrome', name: 'Dubai Autodrome GP', country: 'UAE', length: '5.39 km', topSpeedSector: '320 km/h', turns: 16 }
];

export const SHOWROOM_LOCATIONS = [
  { city: 'Monaco', address: '14 Quai Antoine 1er, Port Hercule', country: 'Monaco', phone: '+377 93 50 12 00', hours: 'Mon–Sat: 10:00 – 19:00 CET' },
  { city: 'Tokyo', address: '5-7-2 Minami-Aoyama, Minato-ku', country: 'Japan', phone: '+81 3 5468 9000', hours: 'Tue–Sun: 11:00 – 20:00 JST' },
  { city: 'Dubai', address: 'Downtown Boulevard, Building 4', country: 'UAE', phone: '+971 4 362 7000', hours: 'Daily: 10:00 – 22:00 GST' },
  { city: 'Los Angeles', address: '9600 Wilshire Blvd, Beverly Hills', country: 'USA', phone: '+1 (310) 860-2000', hours: 'Mon–Sat: 09:30 – 18:30 PST' },
  { city: 'London / Silverstone', address: 'Innovation Center, Silverstone Circuit', country: 'UK', phone: '+44 20 7946 0999', hours: 'Mon–Fri: 09:00 – 18:00 GMT' },
];
