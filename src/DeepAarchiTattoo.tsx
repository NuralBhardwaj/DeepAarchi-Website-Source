import React, { useState, useEffect, useRef } from 'react';

// Components
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Sections/HeroSection';
import ArtistsSection from './components/Sections/ArtistsSection';
import PortfolioSection from './components/Sections/PortfolioSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import BookingSection from './components/Sections/BookingSection';
import Modal from './components/UI/Modal';
import Background from './components/UI/Background';

// Data and Types
import { Particle, BookingFormData, CursorPosition } from './types';
import { Artist } from './contexts/ArtistContext';

const DeepAarchiTattoo = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    design: '',
    date: ''
  });
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [likes, setLikes] = useState(1247);
  const [isLiked, setIsLiked] = useState(false);

  const backgroundRef = useRef<HTMLDivElement>(null);

  // Particle animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.speedX;
        const newY = particle.y + particle.speedY;
        return {
          ...particle,
          x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
          y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Advanced mouse tracking with trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Advanced parallax background effect
      if (backgroundRef.current) {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth) * 100;
        const yPercent = (clientY / window.innerHeight) * 100;
        backgroundRef.current.style.transform = `translate(${xPercent / -20}px, ${yPercent / -20}px) scale(1.1)`;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scroll state for navigation styling
      setIsScrolled(currentScrollY > 50);

      // Get all sections
      const sections = ['home', 'artists', 'portfolio', 'experience', 'booking'];
      const scrollPosition = currentScrollY + 100; // Offset for better detection

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Set initial active section
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Component functions
  const openArtistModal = (artist: Artist) => {
    setSelectedArtist(artist);
    setModalOpen(true);
  };

  const openBookingModal = () => {
    setSelectedArtist(null);
    setModalOpen(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };



  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add success animation
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg z-[9999] animate-bounce';
    successDiv.innerHTML = '🎉 Your artistic journey begins! We\'ll contact you within 24 hours.';
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 3000);
    
    setModalOpen(false);
    setFormData({
      name: '',
      email: '',
      design: '',
      date: ''
    });
  };



  // Remove renderSection function since we'll display all sections

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* Background Components */}
      <Background
        particles={particles}
        cursorPosition={cursorPosition}
        backgroundRef={backgroundRef}
      />

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        likes={likes}
        isLiked={isLiked}
        handleLike={handleLike}
        isScrolled={isScrolled}
      />

      {/* Main Content - All Sections in One Page */}
      <main className="relative z-20">
        {/* Hero Section */}
        <HeroSection setActiveSection={setActiveSection} />

        {/* Artists Section */}
        <ArtistsSection openArtistModal={openArtistModal} />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Booking Section */}
        <BookingSection
          formData={formData}
          setFormData={setFormData}
          handleBookingSubmit={handleBookingSubmit}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedArtist={selectedArtist}
        formData={formData}
        setFormData={setFormData}
        handleBookingSubmit={handleBookingSubmit}
        openBookingModal={openBookingModal}
      />
    </div>
  );
};

export default DeepAarchiTattoo;
