import React, { useState, useEffect } from 'react';
import { usePortfolio, PortfolioItem } from '../../contexts/PortfolioContext';
import { X, Upload, Star, Tag } from 'lucide-react';

interface PortfolioFormProps {
  item?: PortfolioItem | null;
  onClose: () => void;
  onSave: () => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ item, onClose, onSave }) => {
  const { addPortfolioItem, updatePortfolioItem } = usePortfolio();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'traditional' as 'traditional' | 'realistic' | 'geometric' | 'watercolor' | 'blackwork' | 'other',
    artist: 'Deep Aarchi',
    featured: false,
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['traditional', 'realistic', 'geometric', 'watercolor', 'blackwork', 'other'];

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        artist: item.artist,
        featured: item.featured,
        tags: item.tags
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (item) {
        updatePortfolioItem(item.id, formData);
      } else {
        addPortfolioItem(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For demo purposes, we'll use a placeholder URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              placeholder="Enter portfolio item title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none"
              placeholder="Describe the tattoo design"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image
            </label>
            <div className="space-y-4">
              {formData.imageUrl && (
                <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
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
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-400 text-sm">or</span>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  placeholder="Enter image URL"
                />
              </div>
            </div>
          </div>

          {/* Category and Artist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Artist *
              </label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                placeholder="Artist name"
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="Add a tag"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                formData.featured
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600'
              }`}
            >
              <Star size={20} fill={formData.featured ? 'currentColor' : 'none'} />
              <span>Featured Item</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{item ? 'Update' : 'Create'} Portfolio Item</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
