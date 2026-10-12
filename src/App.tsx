/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Showroom } from './pages/Showroom';
import { Configurator } from './pages/Configurator';
import { TestDrive } from './pages/TestDrive';
import { Technology } from './pages/Technology';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { CarDetails } from './pages/CarDetails';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-[#FF163A] selection:text-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/test-drive" element={<TestDrive />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
