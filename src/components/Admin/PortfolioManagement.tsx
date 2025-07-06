import React, { useState } from 'react';
import { usePortfolio, PortfolioItem } from '../../contexts/PortfolioContext';
import { Plus, Edit, Trash2, Star, StarOff, Search, Filter } from 'lucide-react';
import PortfolioForm from './PortfolioForm';

const PortfolioManagement: React.FC = () => {
  const { portfolioItems, deletePortfolioItem, updatePortfolioItem } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const categories = ['all', 'traditional', 'realistic', 'geometric', 'watercolor', 'blackwork', 'other'];

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePortfolioItem(id);
    }
  };

  const toggleFeatured = (item: PortfolioItem) => {
    updatePortfolioItem(item.id, { featured: !item.featured });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Portfolio Management</h2>
          <p className="text-gray-400">Manage your tattoo portfolio items</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search portfolio items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Items</p>
          <p className="text-2xl font-bold text-white">{portfolioItems.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-white">{portfolioItems.filter(item => item.featured).length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Categories</p>
          <p className="text-2xl font-bold text-white">{new Set(portfolioItems.map(item => item.category)).size}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Filtered Results</p>
          <p className="text-2xl font-bold text-white">{filteredItems.length}</p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No portfolio items found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-700/30 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-all duration-300">
                {/* Image */}
                <div className="aspect-square bg-gray-600 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE2MS4zNDMgMTAwIDEzMCAxMzEuMzQzIDEzMCAxNzBDMTMwIDIwOC42NTcgMTYxLjM0MyAyNDAgMjAwIDI0MEMyMzguNjU3IDI0MCAyNzAgMjA4LjY1NyAyNzAgMTcwQzI3MCAxMzEuMzQzIDIzOC42NTcgMTAwIDIwMCAxMDBaIiBmaWxsPSIjNkI3Mjg0Ii8+CjxwYXRoIGQ9Ik0yMDAgMTMwQzE3Ny45MDkgMTMwIDE2MCAyNDcuOTA5IDE2MCAyNzBDMTYwIDI5Mi4wOTEgMTc3LjkwOSAzMTAgMjAwIDMxMEMyMjIuMDkxIDMxMCAyNDAgMjkyLjA5MSAyNDAgMjcwQzI0MCAyNDcuOTA5IDIyMi4wOTEgMTMwIDIwMCAxMzBaIiBmaWxsPSIjOUI5Q0E0Ii8+Cjwvc3ZnPgo=';
                    }}
                  />
                  {item.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded-full">
                      <Star size={16} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 truncate">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="capitalize bg-gray-600 px-2 py-1 rounded">{item.category}</span>
                    <span>{item.createdAt.toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleFeatured(item)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        item.featured
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-gray-600/50 text-gray-400 hover:bg-gray-600'
                      }`}
                      title={item.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      {item.featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-all duration-300"
                        title="Edit item"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-all duration-300"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <PortfolioForm
          item={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default PortfolioManagement;
