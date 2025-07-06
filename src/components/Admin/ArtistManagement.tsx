import React, { useState } from 'react';
import { useArtist, Artist } from '../../contexts/ArtistContext';
import { Plus, Edit, Trash2, Star, Users, Award, DollarSign, Search, Filter, Eye, EyeOff, Phone, Mail, Instagram } from 'lucide-react';
import ArtistForm from './ArtistForm';

const ArtistManagement: React.FC = () => {
  const { artists, deleteArtist, toggleArtistStatus, getArtistStats } = useArtist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);



  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'all' || artist.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && artist.isActive) ||
                         (selectedStatus === 'inactive' && !artist.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeArtists = artists.filter(artist => artist.isActive);
  const totalRevenue = artists.reduce((sum, artist) => {
    const stats = getArtistStats(artist.id);
    return sum + stats.monthlyRevenue;
  }, 0);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete artist "${name}"? This action cannot be undone.`)) {
      deleteArtist(id);
    }
  };

  const handleStatusToggle = (artist: Artist) => {
    const action = artist.isActive ? 'deactivate' : 'activate';
    if (window.confirm(`Are you sure you want to ${action} ${artist.name}?`)) {
      toggleArtistStatus(artist.id);
    }
  };

  const getRoleDisplayName = (role: Artist['role']) => {
    const roleNames = {
      owner: 'Owner',
      senior_artist: 'Senior Artist',
      artist: 'Artist',
      apprentice: 'Apprentice'
    };
    return roleNames[role];
  };

  const getRoleBadgeColor = (role: Artist['role']) => {
    const colors = {
      owner: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      senior_artist: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      artist: 'bg-green-500/20 text-green-300 border-green-500/30',
      apprentice: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return colors[role];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Artist Management</h2>
          <p className="text-gray-400">Manage your tattoo artists and their profiles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Artist</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Artists</p>
              <p className="text-2xl font-bold text-white">{artists.length}</p>
            </div>
            <Users className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Artists</p>
              <p className="text-2xl font-bold text-white">{activeArtists.length}</p>
            </div>
            <Eye className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Experience</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(artists.reduce((sum, artist) => {
                  const years = parseInt(artist.experience.split('+')[0]) || 0;
                  return sum + years;
                }, 0) / artists.length)}+ Years
              </p>
            </div>
            <Award className="text-gray-400" size={24} />
          </div>
        </div>
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
                placeholder="Search artists by name, email, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owner</option>
              <option value="senior_artist">Senior Artist</option>
              <option value="artist">Artist</option>
              <option value="apprentice">Apprentice</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Artists List */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            Artists ({filteredArtists.length})
          </h3>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 text-lg">No artists found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {filteredArtists.map((artist) => {
              const stats = getArtistStats(artist.id);
              return (
                <div key={artist.id} className="p-6 hover:bg-gray-700/30 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Artist Info */}
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={artist.profileImage}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="text-lg font-semibold text-white">{artist.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(artist.role)}`}>
                            {getRoleDisplayName(artist.role)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            artist.isActive 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {artist.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Mail size={14} />
                            <span>{artist.email}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Phone size={14} />
                            <span>{artist.phone}</span>
                          </span>
                          {artist.socialMedia.instagram && (
                            <span className="flex items-center space-x-1">
                              <Instagram size={14} />
                              <span>{artist.socialMedia.instagram}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center space-x-1 text-yellow-400">
                            <Star size={14} fill="currentColor" />
                            <span>{artist.rating}</span>
                          </span>
                          <span className="text-gray-400">{artist.experience}</span>
                          <span className="text-gray-400">{artist.completedTattoos} tattoos</span>
                          <span className="text-gray-400">${artist.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {artist.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {artist.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                            +{artist.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex space-x-6 text-center">
                      <div>
                        <p className="text-lg font-semibold text-white">{stats.completedAppointments}</p>
                        <p className="text-xs text-gray-400">Completed</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">${stats.monthlyRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Monthly</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingArtist(artist)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        title="Edit Artist"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(artist)}
                        className={`p-2 rounded-lg transition-colors ${
                          artist.isActive
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                            : 'text-green-400 hover:text-green-300 hover:bg-green-500/10'
                        }`}
                        title={artist.isActive ? 'Deactivate Artist' : 'Activate Artist'}
                      >
                        {artist.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(artist.id, artist.name)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Artist"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Artist Modal */}
      {(showAddModal || editingArtist) && (
        <ArtistForm
          artist={editingArtist}
          onClose={() => {
            setShowAddModal(false);
            setEditingArtist(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setEditingArtist(null);
          }}
        />
      )}
    </div>
  );
};

export default ArtistManagement;
