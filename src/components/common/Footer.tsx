import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Flame, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white pt-16 pb-12 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-[#FF163A] shadow-[0_0_12px_#FF163A]" />
              <span className="font-display font-black text-2xl tracking-wider uppercase text-white">
                VELOCITY <span className="text-[#FF163A]">X</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Pioneering the next era of aerodynamic hyper-performance. Built with 900V solid-state architecture, F1-derived ground effects, and surgical torque vectoring.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#FF163A]" /> FIA Homologated</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-[#FF163A]" /> Skunkworks Lab</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#FF163A]" /> Silverstone HQ</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FF163A]">Showroom</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link to="/collection" className="hover:text-white transition-colors">Supercar Collection</Link></li>
              <li><Link to="/showroom" className="hover:text-white transition-colors">3D Virtual Stage</Link></li>
              <li><Link to="/configurator" className="hover:text-white transition-colors">Car Configurator</Link></li>
              <li><Link to="/test-drive" className="hover:text-white transition-colors">Virtual Test Drive</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link></li>
            </ul>
          </div>

          {/* Technology & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FF163A]">Engineering</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link to="/technology" className="hover:text-white transition-colors">Aerodynamics & DRS</Link></li>
              <li><Link to="/technology" className="hover:text-white transition-colors">Solid-State Powertrain</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Heritage & Manifesto</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">VIP Concierge & Lounges</Link></li>
              <li><Link to="/booking-confirmation" className="hover:text-white transition-colors">My Reservations</Link></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FF163A]">VIP Dispatch</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive confidential private track debut invites and allocation allotments.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Private access credentials sent. Welcome to VELOCITY X.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-[#FF163A] text-white placeholder-zinc-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#FF163A] hover:bg-[#e01433] text-white rounded text-xs flex items-center justify-center transition-colors"
                    aria-label="Subscribe to VIP newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-zinc-600 block">Strictly confidential · Zero spam</span>
              </form>
            )}
          </div>
        </div>

        {/* Global Showrooms Banner */}
        <div className="border-t border-b border-white/5 py-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <span className="font-mono text-zinc-500 uppercase tracking-wider">Global Flagship Hubs:</span>
            <div className="flex flex-wrap items-center gap-6">
              <span className="hover:text-white transition-colors">Monaco · Port Hercule</span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">Tokyo · Minato-ku</span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">Dubai · Downtown</span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">London · Silverstone</span>
              <span className="text-zinc-700">|</span>
              <span className="hover:text-white transition-colors">Beverly Hills · Wilshire</span>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} VELOCITY X Automotive Innovations Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Telemetry Disclaimers</span>
            <span>·</span>
            <span className="hover:text-zinc-400 cursor-pointer">Track Safety Standards</span>
            <span>·</span>
            <span className="hover:text-zinc-400 cursor-pointer">Privacy & Allocation Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
