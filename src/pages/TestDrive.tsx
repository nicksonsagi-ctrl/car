import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Gauge, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Flag
} from 'lucide-react';
import { SUPERCARS, TRACK_LOCATIONS } from '../data/supercars';
import { VirtualDriveCanvas } from '../components/three/VirtualDriveCanvas';
import { TestDriveBooking } from '../types';

export const TestDrive: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCarId = searchParams.get('car') || SUPERCARS[0].id;
  const [selectedCarId, setSelectedCarId] = useState(initialCarId);
  const [selectedTrackId, setSelectedTrackId] = useState(TRACK_LOCATIONS[0].id);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-15');
  const [timeSlot, setTimeSlot] = useState('10:00 AM – 12:30 PM (Morning Session)');
  const [vipLounge, setVipLounge] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCar = SUPERCARS.find(c => c.id === selectedCarId) || SUPERCARS[0];
  const selectedTrack = TRACK_LOCATIONS.find(t => t.id === selectedTrackId) || TRACK_LOCATIONS[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    const bookingId = `VX-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: TestDriveBooking = {
      id: bookingId,
      customerName: name,
      email,
      phone,
      carId: selectedCar.id,
      carName: selectedCar.name,
      track: selectedTrack.name,
      date,
      timeSlot,
      vipLounge,
      status: 'Confirmed',
      bookingDate: new Date().toISOString()
    };

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('velocity_x_bookings') || '[]');
      localStorage.setItem('velocity_x_bookings', JSON.stringify([newBooking, ...existing]));
    } catch {
      // LocalStorage error fallback
    }

    // Celebration Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF163A', '#FFFFFF', '#FFD700']
      });
    } catch {
      // Safe confetti fallback
    }

    setTimeout(() => {
      navigate(`/booking-confirmation?id=${bookingId}`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-12 border-b border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF163A] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FF163A] animate-pulse" />
            <span>Interactive Flight Sim & VIP Track Reservations</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
            Virtual Test <span className="text-[#FF163A]">Drive</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-light">
            Pilot the {selectedCar.name} on our real-time interactive physics track simulator or book an exclusive private circuit session with factory test pilots.
          </p>
        </div>
      </section>

      {/* 3D DRIVING SIMULATOR CANVAS SECTION */}
      <section className="border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase">Simulator Vehicle:</span>
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              className="bg-zinc-900 border border-white/15 px-3 py-1.5 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
            >
              {SUPERCARS.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.horsepower} HP)</option>
              ))}
            </select>
          </div>

          <div className="text-xs font-mono text-zinc-400 hidden sm:block">
            Track Simulation: <strong className="text-white">{selectedTrack.name}</strong>
          </div>
        </div>

        {/* The 3D Drive Simulator */}
        <div className="w-full h-[520px] bg-black relative">
          <VirtualDriveCanvas
            carColor={selectedCar.colorOptions[0].hex}
            trackName={selectedTrack.name}
            className="w-full h-full"
          />
        </div>
      </section>

      {/* VIP TEST DRIVE RESERVATION FORM */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Circuit & VIP Experience Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A] block mb-2">Track Allocation</span>
              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                Private Circuit Reservation
              </h2>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Experience real lateral G-forces and uninterrupted acceleration. Every private session includes telemetry engineer briefing, custom helmet fitting, and 1-on-1 coaching by Le Mans champions.
              </p>
            </div>

            {/* Selected Circuit Snapshot */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedTrack.country}
                </span>
                <span className="text-xs font-mono text-zinc-400">{selectedTrack.turns} Turns</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white uppercase">{selectedTrack.name}</h3>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-zinc-300 border-t border-white/10">
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Lap Length</span>
                  <span className="font-bold text-white">{selectedTrack.length}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Top Sector Speed</span>
                  <span className="font-bold text-[#FF163A]">{selectedTrack.topSpeedSector}</span>
                </div>
              </div>
            </div>

            {/* Track Perks */}
            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FF163A] shrink-0" />
                <span>Full FIA Grade-1 circuit emergency and track marshal coverage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#FF163A] shrink-0" />
                <span>Bespoke biometric driver telemetry recording & 4K onboard video</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Flag className="w-4 h-4 text-[#FF163A] shrink-0" />
                <span>Private pit-lane hospitality lounge with gourmet catering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-xl border border-white/10 shadow-2xl">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  Schedule Private Test Session
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Reserve your driver credential credentials below.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Select Car */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300 uppercase block">Vehicle Selection</label>
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
                  >
                    {SUPERCARS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Select Circuit */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300 uppercase block">Racetrack Circuit</label>
                  <select
                    value={selectedTrackId}
                    onChange={(e) => setSelectedTrackId(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
                  >
                    {TRACK_LOCATIONS.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.country})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300 uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF163A]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-300 uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF163A]" />
                    <span>Session Window</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs font-mono focus:outline-none focus:border-[#FF163A]"
                  >
                    <option value="10:00 AM – 12:30 PM (Morning Session)">10:00 AM – 12:30 PM (Morning Session)</option>
                    <option value="02:00 PM – 04:30 PM (Afternoon Session)">02:00 PM – 04:30 PM (Afternoon Session)</option>
                    <option value="06:00 PM – 08:30 PM (Golden Hour Sunset)">06:00 PM – 08:30 PM (Golden Hour Sunset)</option>
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-[#FF163A] tracking-wider block">Driver Credentials</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <User className="w-3 h-3" /> Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sebastian Laurent"
                      required
                      className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="driver@domain.com"
                      required
                      className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Mobile / Concierge Contact
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-zinc-900 border border-white/15 px-3 py-2.5 rounded text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#FF163A]"
                  />
                </div>
              </div>

              {/* VIP Lounge Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-3.5 bg-zinc-900/80 border border-white/10 rounded cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={vipLounge}
                    onChange={(e) => setVipLounge(e.target.checked)}
                    className="mt-1 accent-[#FF163A]"
                  />
                  <div className="text-xs">
                    <span className="font-mono font-bold text-white block">VIP Pit Lane Access & Telemetry Coach</span>
                    <span className="text-zinc-400 leading-relaxed block mt-0.5">
                      Complimentary paddock pass for 2 guests with access to private telemetry briefing lounge and onboard data review.
                    </span>
                  </div>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FF163A] hover:bg-[#e01433] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_20px_rgba(255,22,58,0.4)] flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Securing Track Allocation...' : 'Confirm Track Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
