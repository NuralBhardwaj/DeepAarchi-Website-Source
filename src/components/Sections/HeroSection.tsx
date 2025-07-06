import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const HeroSection: React.FC<HeroSectionProps> = ({ setActiveSection }) => {
  return (
    <header id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-20 max-w-4xl px-8 text-center">
        <div className="mb-8">
          <h2 className="text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300">
            Ink Beyond Imagination
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-gray-600 to-gray-400 mx-auto mb-6 rounded-full"></div>
        </div>

        <p className="text-3xl mb-12 text-neutral-300 leading-relaxed font-light">
          Where quantum artistry meets skin, creating living masterpieces that evolve with your story.
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={() => {
              setActiveSection('booking');
              scrollToSection('booking');
            }}
            className="px-12 py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-xl font-semibold
            hover:from-gray-900 hover:to-gray-800 transition-all duration-300
            transform hover:scale-105 hover:shadow-2xl
            flex items-center group relative overflow-hidden border border-gray-600"
          >
            <span className="relative z-10">Begin Your Transformation</span>
            <ArrowRight
              className="ml-3 group-hover:translate-x-2 transition-transform relative z-10"
              size={24}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => {
              setActiveSection('portfolio');
              scrollToSection('portfolio');
            }}
            className="px-12 py-6 bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-full text-xl font-semibold
            hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center group"
          >
            <Camera className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
            Explore Gallery
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
