import React from 'react';
import { Palette, Award, Sparkles } from 'lucide-react';
import { BookingFormData } from '../../types';
import { Artist } from '../../contexts/ArtistContext';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedArtist: Artist | null;
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
  handleBookingSubmit: (e: React.FormEvent) => void;
  openBookingModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedArtist,
  formData,
  setFormData,
  handleBookingSubmit,
  openBookingModal
}) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 max-w-2xl w-full mx-4 border-2 border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-500/10"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300">
              {selectedArtist ? `Meet ${selectedArtist.name}` : 'Book Your Session'}
            </h3>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
          
          {selectedArtist ? (
            <div className="space-y-6">
              <img
                src={selectedArtist.profileImage}
                alt={selectedArtist.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{selectedArtist.name}</h4>
                <p className="text-gray-300 font-medium mb-4">{selectedArtist.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p className="text-neutral-300 leading-relaxed mb-6">{selectedArtist.bio}</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Specialties</h5>
                    <div className="space-y-2">
                      {selectedArtist.specialties.map((spec: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Palette className="text-gray-400" size={16} />
                          <span className="text-neutral-300 text-sm">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Awards</h5>
                    <div className="space-y-2">
                      {selectedArtist.awards.map((award: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Award className="text-yellow-400" size={16} />
                          <span className="text-neutral-300 text-sm">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={openBookingModal}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl text-lg font-bold
                  hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 border border-gray-600"
                >
                  Book with {selectedArtist.name}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-neutral-800/50 backdrop-blur-lg rounded-2xl border border-white/20
                  focus:border-gray-500/50 focus:outline-none transition-all text-white placeholder-neutral-400"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-neutral-800/50 backdrop-blur-lg rounded-2xl border border-white/20
                  focus:border-gray-500/50 focus:outline-none transition-all text-white placeholder-neutral-400"
                />
              </div>
              
              <textarea 
                placeholder="Describe your tattoo vision in detail..." 
                required
                value={formData.design}
                onChange={(e) => setFormData({...formData, design: e.target.value})}
                rows={4}
                className="w-full p-4 bg-neutral-800/50 backdrop-blur-lg rounded-2xl border border-white/20
                focus:border-gray-500/50 focus:outline-none transition-all text-white placeholder-neutral-400 resize-none"
              />
              
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 bg-neutral-800/50 backdrop-blur-lg rounded-2xl border border-white/20
                focus:border-gray-500/50 focus:outline-none transition-all text-white"
              />
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl text-lg font-bold
                hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105
                flex items-center justify-center group relative overflow-hidden border border-gray-600"
              >
                <span className="relative z-10">Start Your Transformation</span>
                <Sparkles
                  className="ml-3 group-hover:rotate-180 transition-transform duration-500 relative z-10"
                  size={20}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
