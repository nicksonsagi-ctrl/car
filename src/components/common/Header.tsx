import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Collection', path: '/collection' },
    { label: '3D Showroom', path: '/showroom' },
    { label: 'Configurator', path: '/configurator' },
    { label: 'Virtual Drive', path: '/test-drive' },
    { label: 'Technology', path: '/technology' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link 
          to="/" 
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF163A]"
        >
          <span className="w-2.5 h-6 bg-[#FF163A] rounded-none group-hover:scale-y-110 transition-transform origin-bottom shadow-[0_0_12px_#FF163A]" />
          <span className="font-display font-black text-xl tracking-wider text-white uppercase group-hover:text-zinc-200 transition-colors">
            VELOCITY <span className="text-[#FF163A]">X</span>
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden xl:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-zinc-400">
          <Link
            to="/"
            className={`transition-colors whitespace-nowrap shrink-0 relative py-2 ${
              location.pathname === '/' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Home
            {location.pathname === '/' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF163A] shadow-[0_0_8px_#FF163A]" />
            )}
          </Link>
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-2 ${
                  active ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF163A] shadow-[0_0_8px_#FF163A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/test-drive"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF163A] hover:bg-[#e01433] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 rounded shadow-[0_0_20px_rgba(255,22,58,0.35)]"
          >
            <span>Book Test Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-white/10 bg-[#080808]/98 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm uppercase tracking-wider py-2 font-medium ${
                location.pathname === '/' ? 'text-[#FF163A] font-bold' : 'text-zinc-300'
              }`}
            >
              Home
            </Link>
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm uppercase tracking-wider py-2 font-medium ${
                  isActive(item.path) ? 'text-[#FF163A] font-bold' : 'text-zinc-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10">
            <Link
              to="/test-drive"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#FF163A] rounded shadow-[0_0_20px_rgba(255,22,58,0.4)]"
            >
              <span>Book Test Drive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
