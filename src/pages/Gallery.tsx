import React, { useState } from 'react';
import { 
  Eye, 
  Download, 
  X, 
  Maximize2, 
  Camera, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Studio' | 'Track' | 'Cockpit' | 'Aero';
  image: string;
  resolution: string;
  caption: string;
  focalLength: string;
  shutter: string;
}

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Velocity Phantom ER-1 · Dark Studio Launch',
      category: 'Studio',
      image: '/src/assets/images/hero_velocity_phantom_1791824079856.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Reflective polished asphalt studio showcasing the electric crimson ground light signature and sculpted carbon monocoque.',
      focalLength: '50mm f/2.8',
      shutter: '1/125s · ISO 100'
    },
    {
      id: 'g-2',
      title: 'Apex Valkyrie EX-1 · Wind Tunnel Boundary Test',
      category: 'Aero',
      image: '/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Laminar boundary smoke visualization over the swan-neck active DRS wing at 300 km/h wind velocity in Silverstone Facility.',
      focalLength: '35mm f/4.0',
      shutter: '1/500s · ISO 200'
    },
    {
      id: 'g-3',
      title: 'Spectre GT Turbo · Obsidian Midnight Pavilion',
      category: 'Studio',
      image: '/src/assets/images/supercar_spectre_gt_1791824111137.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Overhead diffused red neon studio lights emphasizing the deep metallic Obsidian Black paint and forged 10-piston crimson calipers.',
      focalLength: '85mm f/1.8',
      shutter: '1/60s · ISO 100'
    },
    {
      id: 'g-4',
      title: 'Neural Cockpit HUD · Monza High-Speed Apex',
      category: 'Cockpit',
      image: '/src/assets/images/supercar_cockpit_hud_1791824124829.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Pilot perspective entering Parabolica at 248 km/h with projected holographic racing line and biometric steering wheel telemetry.',
      focalLength: '24mm f/2.8',
      shutter: '1/1000s · ISO 800'
    },
    {
      id: 'g-5',
      title: 'Aerodynamic Flaps & Carbon Front Splitter',
      category: 'Aero',
      image: '/src/assets/images/supercar_apex_valkyrie_1791824091349.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Macro focus on the front venturi intake strakes and forged magnesium center-lock wheel assembly with aerodynamic venting.',
      focalLength: '70mm f/3.2',
      shutter: '1/250s · ISO 100'
    },
    {
      id: 'g-6',
      title: 'Phantom ER-1 · Wet Track High-Velocity Reflection',
      category: 'Track',
      image: '/src/assets/images/hero_velocity_phantom_1791824079856.jpg',
      resolution: '4K Ultra-HD (3840 x 2160)',
      caption: 'Night circuit testing at Silverstone under floodlights with active underbody neon ground projection illuminate rain mist.',
      focalLength: '45mm f/2.0',
      shutter: '1/400s · ISO 400'
    }
  ];

  const categories = ['All', 'Studio', 'Track', 'Cockpit', 'Aero'];

  const filteredItems = galleryItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-20 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span>Official Media Archive</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter">
            Visual <span className="text-[#FF163A]">Gallery</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl font-light">
            High-resolution master photography capturing the sculptural carbon weave, wind tunnel aerodynamic flow, and raw track ferocity of VELOCITY X.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="py-6 border-b border-white/10 bg-[#080808] sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FF163A] text-white font-bold'
                    : 'glass-panel text-zinc-400 hover:text-white border-white/10'
                }`}
              >
                {cat === 'All' ? 'All Archive' : cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-zinc-500 hidden sm:block">
            {filteredItems.length} Master 4K Exposures
          </span>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="glass-panel-interactive rounded-xl overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              {/* Image Container with Hover Overlay */}
              <div 
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-zinc-950"
                onClick={() => setActiveItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white border border-white/10">
                  {item.category}
                </div>

                <div className="absolute bottom-3 right-3 p-2 bg-black/60 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption & EXIF metadata */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#FF163A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{item.focalLength}</span>
                  <button
                    onClick={() => handleDownload(item)}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FF163A]" />
                    <span>Download 4K</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-4">
            <div>
              <span className="text-[#FF163A] uppercase tracking-wider block">{activeItem.category} Exposure</span>
              <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">{activeItem.title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDownload(activeItem)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-[#FF163A] text-white rounded text-xs flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Save 4K Wallpaper</span>
              </button>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Centered High-Res Image */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-2">
            <p className="max-w-2xl">{activeItem.caption}</p>
            <div className="flex items-center gap-4 text-zinc-300 shrink-0">
              <span>{activeItem.resolution}</span>
              <span>·</span>
              <span>{activeItem.shutter}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
