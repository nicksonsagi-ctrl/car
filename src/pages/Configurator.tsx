import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Palette, 
  CircleDot, 
  Disc, 
  Wind, 
  Layers, 
  Sparkles, 
  Save, 
  Download, 
  ArrowRight, 
  Check, 
  Car,
  Share2
} from 'lucide-react';
import { SUPERCARS } from '../data/supercars';
import { Supercar3DCanvas } from '../components/three/Supercar3DCanvas';
import { CarConfiguration } from '../types';

export const Configurator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCarId = searchParams.get('car') || SUPERCARS[0].id;
  const [selectedCarId, setSelectedCarId] = useState(initialCarId);
  const activeCar = SUPERCARS.find(c => c.id === selectedCarId) || SUPERCARS[0];

  // Customization State
  const [paintColor, setPaintColor] = useState(activeCar.colorOptions[0].hex);
  const [paintName, setPaintName] = useState(activeCar.colorOptions[0].name);
  const [paintFinish, setPaintFinish] = useState<'gloss' | 'matte' | 'metallic'>('metallic');
  const [wheelStyle, setWheelStyle] = useState(activeCar.wheelOptions[0]);
  const [caliperColor, setCaliperColor] = useState('#FF163A');
  const [caliperName, setCaliperName] = useState('Velocity Red');
  const [aeroPack, setAeroPack] = useState(false);
  const [interiorOption, setInteriorOption] = useState('Full Black Alcantara & Crimson Stitching');
  const [ambientLight, setAmbientLight] = useState('#FF163A');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'calipers' | 'aero' | 'interior'>('paint');

  // Notification / saved state
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync car changes
  useEffect(() => {
    const car = SUPERCARS.find(c => c.id === selectedCarId) || SUPERCARS[0];
    setPaintColor(car.colorOptions[0].hex);
    setPaintName(car.colorOptions[0].name);
    setPaintFinish(car.colorOptions[0].finish);
    setWheelStyle(car.wheelOptions[0]);
  }, [selectedCarId]);

  // Pricing Calculation
  const basePrice = activeCar.price;
  const finishCost = paintFinish === 'matte' ? 18000 : (paintFinish === 'metallic' ? 12000 : 0);
  const wheelCost = wheelStyle.includes('Magnesium') ? 38000 : (wheelStyle.includes('Carbon') ? 25000 : 0);
  const aeroCost = aeroPack ? 75000 : 0;
  const totalPrice = basePrice + finishCost + wheelCost + aeroCost;

  // Custom Paint Options
  const paintPalette = [
    { name: 'Velocity Crimson', hex: '#FF163A', finish: 'metallic' as const },
    { name: 'Obsidian Stealth', hex: '#111111', finish: 'matte' as const },
    { name: 'Apex Silver', hex: '#D2D8DE', finish: 'metallic' as const },
    { name: 'Cyber White', hex: '#FFFFFF', finish: 'gloss' as const },
    { name: 'Abyssal Deep Blue', hex: '#002B49', finish: 'metallic' as const },
    { name: 'Acid Kermit Green', hex: '#00FF66', finish: 'gloss' as const },
    { name: 'Solaris Gold', hex: '#D4AF37', finish: 'metallic' as const },
    { name: 'Raw Matte Carbon', hex: '#1C1C1E', finish: 'matte' as const },
  ];

  const caliperOptions = [
    { name: 'Velocity Crimson', hex: '#FF163A' },
    { name: 'Acid Yellow', hex: '#FFD700' },
    { name: 'Liquid Titanium', hex: '#C0C0C0' },
    { name: 'Electric Cyan', hex: '#00F0FF' },
  ];

  const interiorOptions = [
    { name: 'Full Black Alcantara & Crimson Stitching', price: 0, hex: '#18181a' },
    { name: 'Cognac Hand-Stitched Tuscan Leather', price: 15000, hex: '#8B4513' },
    { name: 'Ghost White Matte & Exposed Carbon', price: 22000, hex: '#EAEAEA' },
  ];

  // Save Build to LocalStorage
  const handleSaveConfiguration = () => {
    const config: CarConfiguration = {
      carId: activeCar.id,
      carName: activeCar.name,
      exteriorColor: paintName,
      exteriorHex: paintColor,
      exteriorFinish: paintFinish,
      wheelStyle,
      caliperColor: caliperName,
      caliperHex: caliperColor,
      aeroPack,
      interiorColor: interiorOption,
      interiorHex: '#18181a',
      ambientLightHex: ambientLight,
      totalPrice,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('velocity_x_saved_configs') || '[]');
      localStorage.setItem('velocity_x_saved_configs', JSON.stringify([config, ...existing]));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // LocalStorage error fallback
    }
  };

  // Export Spec Sheet
  const handleExportSpecSheet = () => {
    const specSheetText = `================================================
VELOCITY X BESPOKE SPECIFICATION SHEET
================================================
Model: ${activeCar.name}
Category: ${activeCar.category}
Powertrain: ${activeCar.powertrain}
Peak Horsepower: ${activeCar.horsepower} HP
Top Speed: ${activeCar.topSpeed} km/h
0–100 km/h: ${activeCar.acceleration} seconds

--- BESPOKE OPTIONS SELECTED ---
Exterior Finish: ${paintName} (${paintFinish.toUpperCase()}) [${paintColor}]
Wheel Specification: ${wheelStyle}
Brake Calipers: ${caliperName}
Aerodynamics: ${aeroPack ? 'High-Downforce Full Carbon Pack (+1,680kg)' : 'Standard Circuit Aero'}
Interior Trim: ${interiorOption}
Ambient Light: ${ambientLight}

--- VALUATION ---
Base Vehicle: $${basePrice.toLocaleString()} USD
Options Total: $${(finishCost + wheelCost + aeroCost).toLocaleString()} USD
TOTAL BUILD ESTIMATE: $${totalPrice.toLocaleString()} USD
Date Generated: ${new Date().toLocaleDateString()}
Silverstone Engineering Studio · Confidential Specification
================================================`;

    const blob = new Blob([specSheetText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VELOCITY_X_${activeCar.id}_Custom_Build.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleProceedToTestDrive = () => {
    handleSaveConfiguration();
    navigate(`/test-drive?car=${activeCar.id}&custom=true`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* CONFIGURATOR TOP BAR */}
      <div className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF163A] uppercase tracking-wider">
              <span>Bespoke 3D Atelier</span>
              <span>·</span>
              <span>Active Build Configurator</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
              {activeCar.name}
            </h1>
          </div>

          {/* Car Selector Dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Car className="w-4 h-4 text-[#FF163A]" />
              <span>Base Model:</span>
              <select
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
                className="bg-zinc-900 border border-white/15 px-3 py-1.5 rounded text-white text-xs focus:outline-none focus:border-[#FF163A]"
              >
                {SUPERCARS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Estimated MSRP</span>
              <span className="font-display font-black text-xl text-[#FF163A] tabular-nums">
                ${totalPrice.toLocaleString()} <span className="text-xs text-zinc-400">USD</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WORKSPACE: 3D VIEWER + CONFIGURATION DOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 3D CANVASES & LIVE VIEW */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          <div className="relative h-[480px] sm:h-[560px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
            <Supercar3DCanvas
              bodyColor={paintColor}
              finish={paintFinish}
              caliperColor={caliperColor}
              activeWing={aeroPack}
              className="w-full h-full"
            />

            {/* Spec Tag */}
            <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded text-xs font-mono text-zinc-300 pointer-events-none border border-white/10">
              <span>{activeCar.horsepower} HP · {activeCar.powertrain}</span>
            </div>

            {/* Live Options Summary Badge */}
            <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 rounded text-[11px] font-mono text-zinc-300 pointer-events-none border border-white/10 space-y-0.5">
              <div>Paint: <strong className="text-white">{paintName} ({paintFinish})</strong></div>
              <div>Wheels: <strong className="text-white">{wheelStyle}</strong></div>
              <div>Aero: <strong className="text-white">{aeroPack ? 'High-Downforce Carbon' : 'Standard'}</strong></div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveConfiguration}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white rounded flex items-center gap-2 transition-colors"
              >
                {saveSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-[#FF163A]" />}
                <span>{saveSuccess ? 'Saved to Garage' : 'Save Build'}</span>
              </button>

              <button
                onClick={handleExportSpecSheet}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white rounded flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Export Spec Sheet</span>
              </button>
            </div>

            <button
              onClick={handleProceedToTestDrive}
              className="px-6 py-2.5 bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono font-bold uppercase tracking-wider text-white rounded flex items-center gap-2 shadow-[0_0_15px_rgba(255,22,58,0.4)]"
            >
              <span>Test Drive This Build</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: BESPOKE OPTIONS CONTROLS */}
        <div className="lg:col-span-5 xl:col-span-4 glass-panel rounded-xl border border-white/10 p-6 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg overflow-x-auto">
            {[
              { id: 'paint', label: 'Exterior', icon: Palette },
              { id: 'wheels', label: 'Wheels', icon: CircleDot },
              { id: 'calipers', label: 'Calipers', icon: Disc },
              { id: 'aero', label: 'Aero Pack', icon: Wind },
              { id: 'interior', label: 'Cockpit', icon: Layers },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-2.5 rounded text-[11px] font-mono uppercase whitespace-nowrap flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#FF163A] text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: EXTERIOR PAINT */}
          {activeTab === 'paint' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider block mb-1">Finish Treatment</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['gloss', 'matte', 'metallic'] as const).map(fin => (
                    <button
                      key={fin}
                      onClick={() => setPaintFinish(fin)}
                      className={`py-2 text-xs font-mono uppercase rounded border transition-colors ${
                        paintFinish === fin
                          ? 'border-[#FF163A] bg-[#FF163A]/15 text-white font-bold'
                          : 'border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">Paint Colorway</span>
                  <span className="text-xs font-mono text-zinc-300">{paintName}</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {paintPalette.map(p => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setPaintColor(p.hex);
                        setPaintName(p.name);
                        setPaintFinish(p.finish);
                      }}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-1 relative transition-all ${
                        paintColor === p.hex
                          ? 'border-white scale-105 shadow-[0_0_15px_rgba(255,22,58,0.5)]'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    >
                      {paintColor === p.hex && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHEEL OPTIONS */}
          {activeTab === 'wheels' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider block">Forged Rim Architecture</span>
              <div className="space-y-3">
                {activeCar.wheelOptions.map(w => {
                  const isSelected = wheelStyle === w;
                  const extraCost = w.includes('Magnesium') ? 38000 : (w.includes('Carbon') ? 25000 : 0);
                  return (
                    <button
                      key={w}
                      onClick={() => setWheelStyle(w)}
                      className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#FF163A]/15 border-[#FF163A] text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-mono font-bold uppercase text-white">{w}</p>
                        <span className="text-[10px] text-zinc-500 font-mono">T6 Center-lock racing spec</span>
                      </div>
                      <span className="text-xs font-mono text-[#FF163A]">
                        {extraCost === 0 ? 'Included' : `+$${extraCost.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CALIPER OPTIONS */}
          {activeTab === 'calipers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">Carbon-Ceramic Caliper Color</span>
                <span className="text-xs font-mono text-zinc-300">{caliperName}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {caliperOptions.map(c => {
                  const isSelected = caliperColor === c.hex;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setCaliperColor(c.hex);
                        setCaliperName(c.name);
                      }}
                      className={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                        isSelected
                          ? 'bg-white/10 border-[#FF163A] text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                      <span className="text-xs font-mono">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: AERO PACK */}
          {activeTab === 'aero' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider block">Aerodynamic Configuration</span>
              <div className="space-y-3">
                <button
                  onClick={() => setAeroPack(false)}
                  className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    !aeroPack
                      ? 'bg-[#FF163A]/15 border-[#FF163A] text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div>
                    <p className="text-xs font-mono font-bold uppercase text-white">Standard Circuit Aero</p>
                    <span className="text-[10px] text-zinc-500 font-mono">1,250 kg downforce at 250 km/h</span>
                  </div>
                  <span className="text-xs font-mono text-[#FF163A]">Included</span>
                </button>

                <button
                  onClick={() => setAeroPack(true)}
                  className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    aeroPack
                      ? 'bg-[#FF163A]/15 border-[#FF163A] text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div>
                    <p className="text-xs font-mono font-bold uppercase text-white">High-Downforce Full Carbon Pack</p>
                    <span className="text-[10px] text-zinc-500 font-mono">Dual-stage active DRS wing + front dive canards (1,680 kg downforce)</span>
                  </div>
                  <span className="text-xs font-mono text-[#FF163A]">+$75,000</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: INTERIOR COCKPIT */}
          {activeTab === 'interior' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider block">Cockpit Upholstery</span>
              <div className="space-y-3">
                {interiorOptions.map(opt => {
                  const isSelected = interiorOption === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => setInteriorOption(opt.name)}
                      className={`w-full p-3.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#FF163A]/15 border-[#FF163A] text-white'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: opt.hex }} />
                        <span className="text-xs font-mono text-white">{opt.name}</span>
                      </div>
                      <span className="text-xs font-mono text-[#FF163A]">
                        {opt.price === 0 ? 'Standard' : `+$${opt.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">Cockpit Ambient LED Aura</span>
                <div className="flex items-center gap-2">
                  {[
                    { name: 'Red', hex: '#FF163A' },
                    { name: 'Cyan', hex: '#00F0FF' },
                    { name: 'Amber', hex: '#FF9900' },
                    { name: 'Violet', hex: '#9933FF' }
                  ].map(amb => (
                    <button
                      key={amb.name}
                      onClick={() => setAmbientLight(amb.hex)}
                      className={`w-6 h-6 rounded-full border transition-all ${ambientLight === amb.hex ? 'border-white scale-110 ring-2 ring-white' : 'border-white/20'}`}
                      style={{ backgroundColor: amb.hex }}
                      title={amb.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary Financials Box */}
          <div className="pt-6 border-t border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Base Vehicle:</span>
              <span className="text-white">${basePrice.toLocaleString()}</span>
            </div>
            {finishCost > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>{paintFinish} Finish:</span>
                <span className="text-white">+${finishCost.toLocaleString()}</span>
              </div>
            )}
            {wheelCost > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Lightweight Wheels:</span>
                <span className="text-white">+${wheelCost.toLocaleString()}</span>
              </div>
            )}
            {aeroCost > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Extreme Aero Pack:</span>
                <span className="text-white">+${aeroCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#FF163A] pt-2 border-t border-white/10">
              <span>Total Build Price:</span>
              <span>${totalPrice.toLocaleString()} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
