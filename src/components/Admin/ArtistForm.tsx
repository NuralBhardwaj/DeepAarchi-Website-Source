import React, { useState, useEffect } from 'react';
import { useArtist, Artist } from '../../contexts/ArtistContext';
import { X, Plus, Trash2, Clock, Shield, Award, Instagram, Facebook, Twitter, Upload, User } from 'lucide-react';

interface ArtistFormProps {
  artist?: Artist | null;
  onClose: () => void;
  onSave: () => void;
}

const ArtistForm: React.FC<ArtistFormProps> = ({ artist, onClose, onSave }) => {
  const { addArtist, updateArtist } = useArtist();
  const isEditing = !!artist;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    specialties: [''],
    experience: '',
    hourlyRate: 100,
    profileImage: '/api/placeholder/300/300',
    portfolioImages: [''],
    isActive: true,
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    availability: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '17:00', available: true },
      saturday: { start: '10:00', end: '16:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false }
    },
    skills: [''],
    certifications: [''],
    awards: [''],
    role: 'artist' as Artist['role'],
    permissions: {
      canManagePortfolio: false,
      canManageAppointments: false,
      canViewReports: false,
      canManageClients: false
    },
    rating: 5.0,
    completedTattoos: 0,
    joinedDate: new Date()
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name,
        email: artist.email,
        phone: artist.phone,
        bio: artist.bio,
        specialties: artist.specialties.length > 0 ? artist.specialties : [''],
        experience: artist.experience,
        hourlyRate: artist.hourlyRate,
        profileImage: artist.profileImage,
        portfolioImages: artist.portfolioImages.length > 0 ? artist.portfolioImages : [''],
        isActive: artist.isActive,
        socialMedia: {
          instagram: artist.socialMedia.instagram || '',
          facebook: artist.socialMedia.facebook || '',
          twitter: artist.socialMedia.twitter || ''
        },
        availability: artist.availability,
        skills: artist.skills.length > 0 ? artist.skills : [''],
        certifications: artist.certifications.length > 0 ? artist.certifications : [''],
        awards: artist.awards.length > 0 ? artist.awards : [''],
        role: artist.role,
        permissions: artist.permissions,
        rating: artist.rating,
        completedTattoos: artist.completedTattoos,
        joinedDate: artist.joinedDate
      });
    }
  }, [artist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const artistData = {
      ...formData,
      specialties: formData.specialties.filter(s => s.trim() !== ''),
      portfolioImages: formData.portfolioImages.filter(img => img.trim() !== ''),
      skills: formData.skills.filter(s => s.trim() !== ''),
      certifications: formData.certifications.filter(c => c.trim() !== ''),
      awards: formData.awards.filter(a => a.trim() !== '')
    };

    if (isEditing && artist) {
      updateArtist(artist.id, artistData);
    } else {
      addArtist(artistData);
    }
    
    onSave();
  };

  const handleArrayChange = (field: 'specialties' | 'portfolioImages' | 'skills' | 'certifications' | 'awards', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'specialties' | 'portfolioImages' | 'skills' | 'certifications' | 'awards') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'specialties' | 'portfolioImages' | 'skills' | 'certifications' | 'awards', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAvailabilityChange = (day: keyof Artist['availability'], field: 'start' | 'end' | 'available', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For demo purposes, we'll use FileReader to create a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profileImage: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit Artist' : 'Add New Artist'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as Artist['role'] }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="apprentice">Apprentice</option>
                <option value="artist">Artist</option>
                <option value="senior_artist">Senior Artist</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="e.g., 5+ Years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-2" />
              Profile Image
            </label>
            <div className="space-y-4">
              {formData.profileImage && (
                <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300">
                  <Upload size={20} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-400 text-sm">or</span>
                <input
                  type="url"
                  value={formData.profileImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter image URL"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Tell us about this artist..."
            />
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Specialties
            </label>
            <div className="space-y-2">
              {formData.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => handleArrayChange('specialties', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="e.g., Traditional, Realistic"
                  />
                  {formData.specialties.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('specialties', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('specialties')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
                <span>Add Specialty</span>
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Social Media
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Instagram size={20} className="text-pink-400" />
                <input
                  type="text"
                  value={formData.socialMedia.instagram || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="@username"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Facebook size={20} className="text-blue-400" />
                <input
                  type="text"
                  value={formData.socialMedia.facebook || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Facebook Page"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Twitter size={20} className="text-blue-300" />
                <input
                  type="text"
                  value={formData.socialMedia.twitter || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          {/* Weekly Availability Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              <Clock className="inline mr-2" size={16} />
              Weekly Availability Schedule
            </label>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-300 capitalize">{day}</span>
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.availability[day].available}
                      onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                      className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-300">Available</span>
                  </label>
                  {formData.availability[day].available && (
                    <>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">From:</span>
                        <input
                          type="time"
                          value={formData.availability[day].start}
                          onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                          className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">To:</span>
                        <input
                          type="time"
                          value={formData.availability[day].end}
                          onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                          className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skills
            </label>
            <div className="space-y-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="e.g., Custom Design, Color Theory"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('skills', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Certifications
            </label>
            <div className="space-y-2">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="e.g., Bloodborne Pathogen Certification"
                  />
                  {formData.certifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('certifications', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('certifications')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
                <span>Add Certification</span>
              </button>
            </div>
          </div>

          {/* Awards */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Award className="inline mr-2" size={16} />
              Awards & Recognition
            </label>
            <div className="space-y-2">
              {formData.awards.map((award, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={award}
                    onChange={(e) => handleArrayChange('awards', index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="e.g., Best Traditional Tattoo 2023"
                  />
                  {formData.awards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('awards', index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('awards')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
                <span>Add Award</span>
              </button>
            </div>
          </div>

          {/* Status and Permissions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                />
                <span className="text-sm font-medium text-gray-300">Active Artist</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Shield className="inline mr-2" size={16} />
                Permissions
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canManagePortfolio}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, canManagePortfolio: e.target.checked }
                    }))}
                    className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-300">Manage Portfolio</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canManageAppointments}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, canManageAppointments: e.target.checked }
                    }))}
                    className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-300">Manage Appointments</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canViewReports}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, canViewReports: e.target.checked }
                    }))}
                    className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-300">View Reports</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.canManageClients}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      permissions: { ...prev.permissions, canManageClients: e.target.checked }
                    }))}
                    className="rounded border-gray-600 bg-gray-700 text-gray-500 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-300">Manage Clients</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg transition-all duration-300"
            >
              {isEditing ? 'Update Artist' : 'Add Artist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtistForm;
