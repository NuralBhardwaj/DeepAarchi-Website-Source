import React from 'react';
import { Zap, Star } from 'lucide-react';
import { useArtist, Artist } from '../../contexts/ArtistContext';

interface ArtistsSectionProps {
  openArtistModal: (artist: Artist) => void;
}

const ArtistsSection: React.FC<ArtistsSectionProps> = ({ openArtistModal }) => {
  const { getActiveArtists } = useArtist();
  const artists = getActiveArtists();
  return (
    <section id="artists" className="container mx-auto py-24 px-4 relative z-30 min-h-screen">
      <div className="text-center mb-16">
        <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4">
          Master Artists
        </h3>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          Meet the visionaries who transform skin into living art
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {artists.map((artist, index) => (
          <div
            key={artist.name}
            className="group relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl overflow-hidden
            transform transition-all duration-700 hover:scale-105 hover:shadow-2xl
            border-2 border-neutral-700 hover:border-gray-500/50 cursor-pointer"
            onClick={() => openArtistModal(artist)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center border border-gray-500">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1">{artist.name}</h4>
                    <p className="text-gray-300 font-medium">{artist.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                    <span className="text-white font-semibold ml-2">{artist.rating}</span>
                  </div>
                  <p className="text-neutral-400 text-sm">{artist.completedTattoos} artworks</p>
                </div>
              </div>
              
              <img
                src={artist.profileImage}
                alt={artist.name}
                className="w-full h-80 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-700"
              />
              
              <p className="text-neutral-300 mb-6 leading-relaxed">{artist.bio}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Experience</h5>
                  <p className="text-gray-300">{artist.experience}</p>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Specialties</h5>
                  <div className="flex flex-wrap gap-1">
                    {artist.specialties.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-xs bg-gray-600/20 text-gray-300 px-2 py-1 rounded-full border border-gray-600/30">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistsSection;
