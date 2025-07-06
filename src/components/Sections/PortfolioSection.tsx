import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const PortfolioSection: React.FC = () => {
  const { portfolioItems } = usePortfolio();
  return (
    <section id="portfolio" className="bg-gradient-to-br from-neutral-900 to-black py-24 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-800/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4">
            Living Art Gallery
          </h3>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Each piece tells a unique story, crafted with precision and passion
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl transform transition-all duration-700 hover:scale-105"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-neutral-300 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-xs">by {item.artist}</span>
                    <span className="text-gray-400 text-xs capitalize">{item.category}</span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-gradient-to-r from-gray-700 to-gray-600 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
