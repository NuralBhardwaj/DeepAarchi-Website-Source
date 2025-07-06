import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useTestimonial } from '../../contexts/TestimonialContext';

const ExperienceSection: React.FC = () => {
  const { getApprovedTestimonials } = useTestimonial();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = getApprovedTestimonials();

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <section id="experience" className="py-24 bg-black/50 backdrop-blur-xl min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4">
              Client Stories
            </h3>
            <p className="text-xl text-neutral-400">No testimonials available yet.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="experience" className="py-24 bg-black/50 backdrop-blur-xl min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 mb-4">
            Client Stories
          </h3>
          <p className="text-xl text-neutral-400">Real experiences, real transformations</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 border-2 border-white/10">
            <div className="flex items-center space-x-6 mb-8">
              <img
                src={testimonials[testimonialIndex].clientPhoto || "/api/placeholder/100/100"}
                alt={testimonials[testimonialIndex].clientName}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-500/50"
              />
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{testimonials[testimonialIndex].clientName}</h4>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">
                  {testimonials[testimonialIndex].service} • by {testimonials[testimonialIndex].artist}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h5 className="text-xl font-semibold text-white mb-2">{testimonials[testimonialIndex].title}</h5>
              <p className="text-lg text-neutral-300 leading-relaxed italic">
                "{testimonials[testimonialIndex].content}"
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                {testimonials[testimonialIndex].date.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === testimonialIndex ? 'bg-gray-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
