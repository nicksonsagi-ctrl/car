export interface Supercar {
  id: string;
  name: string;
  tagline: string;
  category: 'Hypercar' | 'Track Spec' | 'Grand Tourer' | 'Experimental';
  powertrain: 'Quad-Electric' | 'Twin-Turbo V12 Hybrid' | 'Solid-State EV' | 'Hydrogen Turbine Hybrid';
  horsepower: number; // hp
  topSpeed: number; // km/h
  acceleration: number; // 0-100 km/h in sec
  torque: number; // Nm
  range: number; // km
  weight: number; // kg
  downforce: number; // kg at 250 km/h
  price: number; // USD
  releaseYear: number;
  featured: boolean;
  image: string;
  description: string;
  longDescription: string;
  colorOptions: { name: string; hex: string; finish: 'gloss' | 'matte' | 'metallic' }[];
  wheelOptions: string[];
  features: string[];
  aerodynamics: {
    dragCoefficient: number;
    activeElements: string[];
  };
}

export interface CarConfiguration {
  carId: string;
  carName: string;
  exteriorColor: string;
  exteriorHex: string;
  exteriorFinish: 'gloss' | 'matte' | 'metallic';
  wheelStyle: string;
  caliperColor: string;
  caliperHex: string;
  aeroPack: boolean;
  interiorColor: string;
  interiorHex: string;
  ambientLightHex: string;
  totalPrice: number;
  timestamp: string;
}

export interface TestDriveBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  carId: string;
  carName: string;
  track: string;
  date: string;
  timeSlot: string;
  vipLounge: boolean;
  status: 'Confirmed' | 'Pending' | 'Completed';
  bookingDate: string;
}
