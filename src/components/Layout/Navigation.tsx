import React from 'react';
import { Heart } from 'lucide-react';
import TattooMachine from '../Icons/TattooMachine';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  likes: number;
  isLiked: boolean;
  handleLike: () => void;
  isScrolled: boolean;
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

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  likes,
  isLiked,
  handleLike,
  isScrolled
}) => {
  // Calculate scroll progress
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
      isScrolled
        ? 'bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/50'
        : 'bg-black/90 backdrop-blur-lg'
    }`}>
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center border border-gray-500">
            <TattooMachine className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300">
            Deep Aarchi Tattoo
          </h1>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex space-x-6 text-neutral-300">
            {['Home', 'Artists', 'Portfolio', 'Experience', 'Booking'].map(section => (
              <button
                key={section}
                className={`hover:text-white transition-all duration-300 relative group ${
                  activeSection.toLowerCase() === section.toLowerCase()
                    ? 'text-white font-bold scale-110'
                    : 'text-gray-300'
                } ${isScrolled ? 'transform hover:scale-105' : ''}`}
                onClick={() => {
                  const sectionId = section.toLowerCase();
                  setActiveSection(sectionId);
                  scrollToSection(sectionId);
                }}
              >
                {section}
                <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 ${
                  activeSection.toLowerCase() === section.toLowerCase()
                    ? 'w-full bg-gradient-to-r from-white to-gray-300'
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <Heart className={`${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} size={20} />
            <span className="text-white font-semibold">{likes}</span>
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
