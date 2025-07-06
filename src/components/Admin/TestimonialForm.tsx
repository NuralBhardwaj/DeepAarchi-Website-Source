import React, { useState, useEffect } from 'react';
import { useTestimonial, Testimonial } from '../../contexts/TestimonialContext';
import { useArtist } from '../../contexts/ArtistContext';
import { X, Star, Upload, User, Mail, MessageSquare, Award, Calendar, Camera } from 'lucide-react';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onClose: () => void;
  onSave: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial, onClose, onSave }) => {
  const { addTestimonial, updateTestimonial } = useTestimonial();
  const { getActiveArtists } = useArtist();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    rating: 5,
    title: '',
    content: '',
    service: '',
    artist: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    approved: false,
    featured: false,
    clientPhoto: ''
  });

  const activeArtists = getActiveArtists();
  const services = [
    'Traditional Tattoo',
    'Realistic Portrait',
    'Geometric Design',
    'Watercolor Tattoo',
    'Black & Gray',
    'Color Tattoo',
    'Cover-up',
    'Touch-up',
    'Consultation',
    'Other'
  ];

  useEffect(() => {
    if (testimonial) {
      setFormData({
        clientName: testimonial.clientName,
        clientEmail: testimonial.clientEmail,
        rating: testimonial.rating,
        title: testimonial.title,
        content: testimonial.content,
        service: testimonial.service,
        artist: testimonial.artist,
        date: testimonial.date.toISOString().split('T')[0],
        approved: testimonial.approved,
        featured: testimonial.featured,
        clientPhoto: testimonial.clientPhoto || ''
      });
    }
  }, [testimonial]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Client email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }

    if (!formData.service) {
      newErrors.service = 'Service is required';
    }

    if (!formData.artist) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const testimonialData = {
        ...formData,
        date: new Date(formData.date)
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (testimonial) {
        updateTestimonial(testimonial.id, testimonialData);
      } else {
        addTestimonial(testimonialData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClientPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For demo purposes, we'll use FileReader to create a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange('clientPhoto', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange(i + 1)}
            className="focus:outline-none transition-colors duration-200"
          >
            <Star
              size={24}
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400 hover:text-yellow-300'}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-400">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User size={16} className="inline mr-2" />
                Client Name *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.clientName ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
                }`}
                placeholder="Enter client name"
              />
              {errors.clientName && <p className="text-red-400 text-sm mt-1">{errors.clientName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail size={16} className="inline mr-2" />
                Client Email *
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.clientEmail ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
                }`}
                placeholder="Enter client email"
              />
              {errors.clientEmail && <p className="text-red-400 text-sm mt-1">{errors.clientEmail}</p>}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating *
            </label>
            {renderStars(formData.rating, (rating) => handleInputChange('rating', rating))}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MessageSquare size={16} className="inline mr-2" />
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.title ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
              }`}
              placeholder="Enter testimonial title"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.content ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
              }`}
              placeholder="Enter testimonial content"
            />
            {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* Service and Artist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Award size={16} className="inline mr-2" />
                Service *
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.service ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
                }`}
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User size={16} className="inline mr-2" />
                Artist *
              </label>
              <select
                value={formData.artist}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.artist ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
                }`}
              >
                <option value="">Select artist</option>
                {activeArtists.map((artist) => (
                  <option key={artist.id} value={artist.name}>{artist.name}</option>
                ))}
              </select>
              {errors.artist && <p className="text-red-400 text-sm mt-1">{errors.artist}</p>}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Service Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                errors.date ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-gray-400 focus:ring-gray-400/50'
              }`}
            />
            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Client Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Camera size={16} className="inline mr-2" />
              Client Photo (Optional)
            </label>
            <div className="space-y-4">
              {formData.clientPhoto && (
                <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={formData.clientPhoto}
                    alt="Client Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300">
                  <Upload size={20} />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleClientPhotoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-400 text-sm">or</span>
                <input
                  type="url"
                  value={formData.clientPhoto}
                  onChange={(e) => handleInputChange('clientPhoto', e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Status Options (for editing existing testimonials) */}
          {testimonial && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="approved"
                  checked={formData.approved}
                  onChange={(e) => handleInputChange('approved', e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="approved" className="text-sm font-medium text-gray-300">
                  Approved
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  disabled={!formData.approved}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 disabled:opacity-50"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                  Featured (requires approval)
                </label>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{testimonial ? 'Update Testimonial' : 'Add Testimonial'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
