import React from 'react';
import { Sparkles } from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  design: string;
  date: string;
}

interface BookingSectionProps {
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
  handleBookingSubmit: (e: React.FormEvent) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({ 
  formData, 
  setFormData, 
  handleBookingSubmit 
}) => {
  return (
    <section id="booking" className="py-24 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 border-2 border-white/20">
          <div className="text-center mb-12">
            <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4">
              Book Your Session
            </h3>
            <p className="text-xl text-neutral-400">Let's create something extraordinary together</p>
          </div>
          
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
              rows={6}
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
              className="w-full py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl text-xl font-bold
              hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105
              flex items-center justify-center group relative overflow-hidden border border-gray-600"
            >
              <span className="relative z-10">Start Your Transformation</span>
              <Sparkles
                className="ml-3 group-hover:rotate-180 transition-transform duration-500 relative z-10"
                size={24}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
