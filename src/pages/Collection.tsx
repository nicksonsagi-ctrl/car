import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Eye, ArrowRight, X } from 'lucide-react';
import { SUPERCARS } from '../data/supercars';
import { Supercar } from '../types';
import { Supercar3DCanvas } from '../components/three/Supercar3DCanvas';

export const Collection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'power' | 'speed' | 'accel' | 'price'>('power');

  // Quick 3D inspect modal state
  const [inspectCar, setInspectCar] = useState<Supercar | null>(null);

  // Compare supercars list (up to 3)
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const powertrains = ['All', 'Quad-Electric', 'Solid-State EV', 'Twin-Turbo V12 Hybrid', 'Hydrogen Turbine Hybrid'];
  const categories = ['All', 'Hypercar', 'Track Spec', 'Grand Tourer', 'Experimental'];

  const filteredCars = useMemo(() => {
    return SUPERCARS.filter(car => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.powertrain.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPowertrain = selectedPowertrain === 'All' || car.powertrain === selectedPowertrain;
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;

      return matchesSearch && matchesPowertrain && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'power') return b.horsepower - a.horsepower;
      if (sortBy === 'speed') return b.topSpeed - a.topSpeed;
      if (sortBy === 'accel') return a.acceleration - b.acceleration; // smaller acceleration is faster
      if (sortBy === 'price') return b.price - a.price;
      return 0;
    });
  }, [searchQuery, selectedPowertrain, selectedCategory, sortBy]);

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(item => item !== id));
    } else {
      if (compareIds.length < 3) {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const comparedCars = useMemo(() => {
    return SUPERCARS.filter(car => compareIds.includes(car.id));
  }, [compareIds]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="relative py-20 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span>VELOCITY X Garage · 6 Flagship Machines</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter">
            Supercar <span className="text-[#FF163A]">Collection</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl font-light">
            Every vehicle in our skunkworks catalog is engineered for extreme aerodynamic efficiency, sub-2-second velocity, and bespoke carbon fiber craftsmanship.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROLS */}
      <section className="py-8 border-b border-white/10 bg-[#090909]/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, specs or features..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-white/10 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Powertrain dropdown */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF163A]" />
                <span>Powertrain:</span>
                <select
                  value={selectedPowertrain}
                  onChange={(e) => setSelectedPowertrain(e.target.value)}
                  className="bg-zinc-900 border border-white/15 px-3 py-1.5 rounded text-white text-xs focus:outline-none focus:border-[#FF163A]"
                >
                  {powertrains.map(pt => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {/* Category dropdown */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span>Class:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-zinc-900 border border-white/15 px-3 py-1.5 rounded text-white text-xs focus:outline-none focus:border-[#FF163A]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sort by */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#FF163A]" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-900 border border-white/15 px-3 py-1.5 rounded text-white text-xs focus:outline-none focus:border-[#FF163A]"
                >
                  <option value="power">Highest Power (HP)</option>
                  <option value="speed">Top Speed (km/h)</option>
                  <option value="accel">0–100 km/h (Fastest)</option>
                  <option value="price">Valuation (USD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Comparison Indicator Bar */}
          {compareIds.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-300">
                Comparing <strong className="text-[#FF163A]">{compareIds.length}/3</strong> models
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-3 py-1 bg-[#FF163A] hover:bg-[#e01433] text-white rounded text-xs uppercase font-mono font-bold"
                >
                  Launch Side-by-Side Comparison
                </button>
                <button
                  onClick={() => setCompareIds([])}
                  className="text-zinc-400 hover:text-white font-mono"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SUPERCAR GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCars.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-display text-xl text-zinc-400">No supercars found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPowertrain('All');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#FF163A] text-xs uppercase font-mono text-white rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const isComparing = compareIds.includes(car.id);
              return (
                <div
                  key={car.id}
                  className="glass-panel-interactive rounded-lg overflow-hidden flex flex-col justify-between group relative"
                >
                  {/* Card Visual Image with Quick Hover Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Class & Powertrain inline labels */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono">
                      <span className="bg-black/70 px-2 py-0.5 rounded text-white border border-white/10">{car.category}</span>
                      <span className="bg-[#FF163A]/80 px-2 py-0.5 rounded text-white font-bold">{car.releaseYear}</span>
                    </div>

                    {/* Quick 3D Inspect Button */}
                    <button
                      onClick={() => setInspectCar(car)}
                      className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-[#FF163A] text-white rounded backdrop-blur-md transition-colors"
                      title="Quick 3D Inspect"
                      aria-label="Quick 3D Inspect"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <span className="text-xs font-mono text-zinc-300">{car.powertrain}</span>
                      <span className="text-xs font-mono text-[#FF163A] font-bold">${(car.price / 1000000).toFixed(2)}M DEMO</span>
                    </div>
                  </div>

                  {/* Card Body & Specs */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="font-display font-black text-xl text-white group-hover:text-[#FF163A] transition-colors uppercase">
                        {car.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {car.description}
                      </p>
                    </div>

                    {/* Telemetry Metric Matrix */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-white/5 rounded border border-white/5 text-center">
                      <div>
                        <span className="text-[10px] text-zinc-400 font-mono block uppercase">Power</span>
                        <span className="font-display font-bold text-sm text-white tabular-nums">{car.horsepower}</span>
                        <span className="text-[9px] text-zinc-500 block">HP</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 font-mono block uppercase">Top Speed</span>
                        <span className="font-display font-bold text-sm text-white tabular-nums">{car.topSpeed}</span>
                        <span className="text-[9px] text-zinc-500 block">km/h</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 font-mono block uppercase">0–100</span>
                        <span className="font-display font-bold text-sm text-white tabular-nums">{car.acceleration}s</span>
                        <span className="text-[9px] text-zinc-500 block">Launch</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/cars/${car.id}`}
                          className="flex-1 py-2 text-center bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white rounded transition-colors"
                        >
                          Telemetry
                        </Link>
                        <Link
                          to={`/configurator?car=${car.id}`}
                          className="flex-1 py-2 text-center bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono font-bold uppercase tracking-wider text-white rounded transition-colors shadow-[0_0_12px_rgba(255,22,58,0.3)]"
                        >
                          Configure
                        </Link>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => toggleCompare(car.id)}
                          className={`text-[11px] font-mono transition-colors ${
                            isComparing ? 'text-[#FF163A] font-bold' : 'text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {isComparing ? '✓ In Comparison' : '+ Add to Compare'}
                        </button>
                        <Link
                          to={`/test-drive?car=${car.id}`}
                          className="text-[11px] font-mono text-zinc-400 hover:text-[#FF163A] transition-colors flex items-center gap-1"
                        >
                          <span>Test Drive</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* QUICK 3D INSPECT MODAL */}
      {inspectCar && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-white/15 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FF163A] uppercase tracking-widest">3D Real-time Stage</span>
                <h3 className="font-display font-bold text-xl text-white uppercase">{inspectCar.name}</h3>
              </div>
              <button
                onClick={() => setInspectCar(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[450px] relative bg-black">
              <Supercar3DCanvas
                bodyColor={inspectCar.colorOptions[0].hex}
                finish={inspectCar.colorOptions[0].finish}
                className="w-full h-full"
              />
            </div>

            <div className="p-4 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                <span>Power: <strong>{inspectCar.horsepower} HP</strong></span>
                <span>·</span>
                <span>Top Speed: <strong>{inspectCar.topSpeed} km/h</strong></span>
                <span>·</span>
                <span>0-100: <strong>{inspectCar.acceleration}s</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={`/configurator?car=${inspectCar.id}`}
                  onClick={() => setInspectCar(null)}
                  className="px-4 py-2 bg-[#FF163A] text-white text-xs font-mono font-bold uppercase rounded"
                >
                  Open in Configurator
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-white/15 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">Side-by-Side Analysis</span>
                <h3 className="font-display font-black text-2xl text-white uppercase">Supercar Comparison</h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-zinc-400 hover:text-white border border-white/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedCars.map((car) => (
                <div key={car.id} className="glass-panel p-5 rounded-lg border border-white/10 space-y-4">
                  <img src={car.image} alt={car.name} className="w-full h-36 object-cover rounded" />
                  <h4 className="font-display font-bold text-lg text-white uppercase">{car.name}</h4>

                  <div className="space-y-2 text-xs font-mono text-zinc-300 divide-y divide-white/10">
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Powertrain:</span>
                      <span className="text-white text-right font-medium">{car.powertrain}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Horsepower:</span>
                      <span className="text-[#FF163A] font-bold">{car.horsepower} HP</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Top Speed:</span>
                      <span className="text-white font-bold">{car.topSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">0–100 km/h:</span>
                      <span className="text-white font-bold">{car.acceleration}s</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Torque:</span>
                      <span className="text-white">{car.torque} Nm</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Downforce:</span>
                      <span className="text-white">{car.downforce} kg</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-zinc-500">Demo Base Price:</span>
                      <span className="text-[#FF163A] font-bold">${(car.price).toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to={`/configurator?car=${car.id}`}
                    className="block w-full text-center py-2 bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono uppercase font-bold text-white rounded"
                  >
                    Select This Build
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
