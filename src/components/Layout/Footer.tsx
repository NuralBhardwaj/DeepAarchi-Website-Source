import React from 'react';
import { Instagram, Book, Camera, MapPin, Phone, Mail, Clock } from 'lucide-react';
import TattooMachine from '../Icons/TattooMachine';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center border border-gray-500">
                <TattooMachine className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300">
                Deep Aarchi Tattoo
              </h3>
            </div>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Where quantum artistry meets skin, creating living masterpieces that evolve with your story. Experience the future of tattoo artistry.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-600/20 transition-all cursor-pointer border border-gray-700">
                <Instagram size={20} />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-600/20 transition-all cursor-pointer border border-gray-700">
                <Book size={20} />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-600/20 transition-all cursor-pointer border border-gray-700">
                <Camera size={20} />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-400" size={18} />
                <span className="text-neutral-400">123 Art District, Creative City, CC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={18} />
                <span className="text-neutral-400">+1 (555) 123-TATTOO</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={18} />
                <span className="text-neutral-400">info@deepaarchitattoo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-gray-400" size={18} />
                <span className="text-neutral-400">Mon-Sat: 10AM-8PM</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="hover:text-gray-300 transition-colors cursor-pointer">Custom Tattoo Design</li>
              <li className="hover:text-gray-300 transition-colors cursor-pointer">Cover-up Specialists</li>
              <li className="hover:text-gray-300 transition-colors cursor-pointer">Tattoo Touch-ups</li>
              <li className="hover:text-gray-300 transition-colors cursor-pointer">Consultation Services</li>
              <li className="hover:text-gray-300 transition-colors cursor-pointer">Aftercare Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-neutral-500">
            © 2024 Deep Aarchi Tattoo Studio. All rights reserved. |
            <span className="text-gray-400 hover:text-gray-300 cursor-pointer ml-2">Privacy Policy</span> |
            <span className="text-gray-400 hover:text-gray-300 cursor-pointer ml-2">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
