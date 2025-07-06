export interface Artist {
  name: string;
  specialty: string;
  image: string;
  bio: string;
  awards: string[];
  specialties: string[];
  experience: string;
  rating: number;
  completedTattoos: number;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  image: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  design: string;
  date: string;
}

export interface CursorPosition {
  x: number;
  y: number;
}
