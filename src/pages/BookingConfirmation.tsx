import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Download, 
  Printer, 
  ArrowRight, 
  QrCode, 
  Trash2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { TestDriveBooking, CarConfiguration } from '../types';

export const BookingConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestedId = searchParams.get('id');

  const [booking, setBooking] = useState<TestDriveBooking | null>(null);
  const [allBookings, setAllBookings] = useState<TestDriveBooking[]>([]);
  const [savedConfigs, setSavedConfigs] = useState<CarConfiguration[]>([]);

  useEffect(() => {
    try {
      const storedBookings: TestDriveBooking[] = JSON.parse(localStorage.getItem('velocity_x_bookings') || '[]');
      setAllBookings(storedBookings);

      if (requestedId) {
        const found = storedBookings.find(b => b.id === requestedId);
        if (found) setBooking(found);
      } else if (storedBookings.length > 0) {
        setBooking(storedBookings[0]);
      } else {
        // Sample fallback pass if user visits directly
        setBooking({
          id: 'VX-849201',
          customerName: 'Marcus Sterling',
          email: 'driver@velocity-x.com',
          phone: '+44 20 7946 0999',
          carId: 'phantom-er1',
          carName: 'Velocity Phantom ER-1',
          track: 'Autodromo Nazionale Monza',
          date: '2026-11-15',
          timeSlot: '10:00 AM – 12:30 PM (Morning Session)',
          vipLounge: true,
          status: 'Confirmed',
          bookingDate: new Date().toISOString()
        });
      }

      const storedConfigs: CarConfiguration[] = JSON.parse(localStorage.getItem('velocity_x_saved_configs') || '[]');
      setSavedConfigs(storedConfigs);
    } catch {
      // Fallback
    }
  }, [requestedId]);

  // Generate .ICS Calendar File
  const handleDownloadCalendar = () => {
    if (!booking) return;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VELOCITY X//VIP Track Test Drive//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:VELOCITY X VIP Track Session: ${booking.carName}
DESCRIPTION:Private VIP track test drive session with telemetry coaching at ${booking.track}. Ref ID: ${booking.id}
LOCATION:${booking.track}
DTSTART:${booking.date.replace(/-/g, '')}T100000Z
DTEND:${booking.date.replace(/-/g, '')}T123000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VELOCITY_X_TestDrive_${booking.id}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteBooking = (id: string) => {
    const updated = allBookings.filter(b => b.id !== id);
    setAllBookings(updated);
    localStorage.setItem('velocity_x_bookings', JSON.stringify(updated));
    if (booking?.id === id) {
      setBooking(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleDeleteConfig = (index: number) => {
    const updated = savedConfigs.filter((_, i) => i !== index);
    setSavedConfigs(updated);
    localStorage.setItem('velocity_x_saved_configs', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HERO */}
      <section className="py-16 border-b border-white/10 studio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Driver Credential Homologated</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
            Reservation <span className="text-[#FF163A]">Confirmation</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-light">
            Your private track session credentials have been secured in the factory allocation registry.
          </p>
        </div>
      </section>

      {/* VIP PASS BOARDING PASS TICKET */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {booking ? (
          <div className="glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative">
            {/* Red glowing neon accent line on top */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FF163A] via-white to-[#FF163A]" />

            <div className="p-8 sm:p-12 space-y-8">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FF163A] block">Digital VIP Paddock Credential</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="w-2 h-6 bg-[#FF163A]" />
                    <span className="font-display font-black text-2xl uppercase tracking-wider text-white">VELOCITY X</span>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <span className="text-zinc-500 uppercase block text-[10px]">Credential Pass Code</span>
                  <span className="text-xl font-bold text-white tracking-widest">{booking.id}</span>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#FF163A]" /> Assigned Vehicle
                  </span>
                  <p className="font-display font-bold text-base text-white uppercase">{booking.carName}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF163A]" /> Circuit Track
                  </span>
                  <p className="font-bold text-sm text-white">{booking.track}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF163A]" /> Session Date
                  </span>
                  <p className="font-bold text-sm text-white">{booking.date}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF163A]" /> Time Window
                  </span>
                  <p className="font-bold text-xs text-white">{booking.timeSlot}</p>
                </div>
              </div>

              {/* Driver & Access Tier */}
              <div className="p-6 bg-zinc-900/60 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Credential Holder</span>
                  <p className="font-display font-bold text-lg text-white mt-0.5">{booking.customerName}</p>
                  <span className="text-xs font-mono text-zinc-400">{booking.email} · {booking.phone}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Access Tier</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">VIP Pit Lane Coach Included</span>
                  </div>
                  {/* Simulated QR Code */}
                  <div className="w-16 h-16 bg-white p-1 rounded flex items-center justify-center text-black">
                    <QrCode className="w-14 h-14" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadCalendar}
                    className="px-4 py-2.5 bg-[#FF163A] hover:bg-[#e01433] text-white text-xs font-mono font-bold uppercase rounded flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,22,58,0.35)]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Sync Calendar (.ICS)</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase rounded flex items-center gap-2 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print VIP Ticket</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-xs font-mono text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-2xl uppercase text-white">No Active Reservations</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              You do not have any pending private track bookings in this browser session.
            </p>
            <Link
              to="/test-drive"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF163A] text-white text-xs font-mono font-bold uppercase rounded shadow-[0_0_15px_rgba(255,22,58,0.4)]"
            >
              <span>Schedule Track Test Drive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* SAVED CAR BUILDS SECTION */}
        {savedConfigs.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#FF163A] uppercase tracking-wider">Client Garage</span>
                <h3 className="font-display font-black text-2xl uppercase text-white">Saved Bespoke Builds</h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">{savedConfigs.length} Builds Stored</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedConfigs.map((cfg, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-lg text-white uppercase">{cfg.carName}</h4>
                    <button
                      onClick={() => handleDeleteConfig(idx)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Delete build"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Exterior Paint:</span>
                      <span className="text-white flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: cfg.exteriorHex }} />
                        {cfg.exteriorColor} ({cfg.exteriorFinish})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Wheels:</span>
                      <span className="text-white">{cfg.wheelStyle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Aero Spec:</span>
                      <span className="text-white">{cfg.aeroPack ? 'High-Downforce Full Carbon' : 'Standard'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                      <span className="text-zinc-500 font-bold">Valuation Estimate:</span>
                      <span className="text-[#FF163A] font-bold">${cfg.totalPrice.toLocaleString()} USD</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/configurator?car=${cfg.carId}`}
                      className="flex-1 py-2 text-center bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white rounded transition-colors"
                    >
                      Edit Build
                    </Link>
                    <Link
                      to={`/test-drive?car=${cfg.carId}`}
                      className="flex-1 py-2 text-center bg-[#FF163A] hover:bg-[#e01433] text-xs font-mono uppercase font-bold text-white rounded transition-colors"
                    >
                      Test Drive
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
