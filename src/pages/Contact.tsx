import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Plane, 
  Building 
} from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/supercars';

export const Contact: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState(SHOWROOM_LOCATIONS[0].city);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interestCar, setInterestCar] = useState('Velocity Phantom ER-1');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeHub = SHOWROOM_LOCATIONS.find(h => h.city === selectedHub) || SHOWROOM_LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-20 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span>Global Concierge & Bespoke Lounges</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter">
            Contact <span className="text-[#FF163A]">VELOCITY X</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl font-light">
            Connect directly with our client allocations team. Access private showroom viewings, bespoke atelier commissioning sessions, and circuit arrival logistics.
          </p>
        </div>
      </section>

      {/* SHOWROOM HUBS & INQUIRY FORM */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Global Flagship Lounges */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A] block mb-2">Worldwide Presence</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
                Flagship Atelier Lounges
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                By exclusive appointment only. Each lounge features a private 3D material gallery, acoustic dyno test room, and dedicated concierge hospitality.
              </p>
            </div>

            {/* City Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
              {SHOWROOM_LOCATIONS.map(hub => (
                <button
                  key={hub.city}
                  onClick={() => setSelectedHub(hub.city)}
                  className={`px-3.5 py-2 text-xs font-mono uppercase whitespace-nowrap rounded transition-colors ${
                    selectedHub === hub.city
                      ? 'bg-[#FF163A] text-white font-bold'
                      : 'glass-panel text-zinc-400 hover:text-white border-white/10'
                  }`}
                >
                  {hub.city}
                </button>
              ))}
            </div>

            {/* Selected Lounge Details Card */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">{activeHub.country} Hub</span>
                  <h3 className="font-display font-black text-2xl text-white uppercase mt-0.5">{activeHub.city} Atelier</h3>
                </div>
                <Building className="w-8 h-8 text-[#FF163A]" />
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-300 divide-y divide-white/10">
                <div className="flex items-start gap-3 pt-3">
                  <MapPin className="w-4 h-4 text-[#FF163A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">Physical Address</span>
                    <p className="text-white mt-0.5">{activeHub.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <Phone className="w-4 h-4 text-[#FF163A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">VIP Direct Line</span>
                    <p className="text-white mt-0.5">{activeHub.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3">
                  <Clock className="w-4 h-4 text-[#FF163A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 uppercase block text-[10px]">Viewing Hours</span>
                    <p className="text-white mt-0.5">{activeHub.hours}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/60 rounded border border-white/10 flex items-center gap-3 text-xs text-zinc-400">
                <Plane className="w-5 h-5 text-[#FF163A] shrink-0" />
                <span>Helipad and private aviation transfer arrangements coordinated upon appointment verification.</span>
              </div>
            </div>
          </div>

          {/* Right Column: VIP Inquiry Form */}
          <div className="lg:col-span-6 glass-panel p-8 sm:p-10 rounded-xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase text-white">Inquiry Received</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                  Your communication has been dispatched to our VIP client director. A personal representative will reach out within 4 business hours to coordinate your private viewing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white rounded transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A]">Confidential Dispatch</span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">
                    Request Atelier Appointment
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">Initiate consultation for bespoke commissioning or allocation.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase">Your Legal Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Alexander Bennett"
                      required
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-3 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase">Confidential Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@sanctuary.com"
                      required
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-3 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase">Vehicle of Interest</label>
                    <select
                      value={interestCar}
                      onChange={(e) => setInterestCar(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-3 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
                    >
                      <option value="Velocity Phantom ER-1">Velocity Phantom ER-1 (Quad-Electric)</option>
                      <option value="Apex Valkyrie EX-1">Apex Valkyrie EX-1 (Track Weapon)</option>
                      <option value="Spectre GT Turbo">Spectre GT Turbo (V12 Hybrid)</option>
                      <option value="Aetheris Hydra X">Aetheris Hydra X (Hydrogen Turbine)</option>
                      <option value="Kinetix Pulse Zero">Kinetix Pulse Zero (Extreme Downforce)</option>
                      <option value="Chronos Hyper-V">Chronos Hyper-V (Endurance Prototype)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase">Special Requirements & Preferred City</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify dates, track requirements, or bespoke customization details..."
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-3 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF163A] hover:bg-[#e01433] text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_20px_rgba(255,22,58,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Confidential Inquiry</span>
                </button>

                <p className="text-[10px] text-zinc-500 text-center font-mono">
                  All transmissions are protected with end-to-end 256-bit encryption. Strict non-disclosure honored.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
