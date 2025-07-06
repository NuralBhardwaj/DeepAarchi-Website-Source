import React, { useState } from 'react';
import { useTestimonial, Testimonial } from '../../contexts/TestimonialContext';
import { Plus, Edit, Trash2, Star, StarOff, Check, X, MessageSquare, User, Mail, Calendar, Award } from 'lucide-react';
import TestimonialForm from './TestimonialForm';

const TestimonialManagement: React.FC = () => {
  const { 
    testimonials, 
    deleteTestimonial, 
    approveTestimonial, 
    rejectTestimonial, 
    toggleFeatured,
    getApprovedTestimonials,
    getPendingTestimonials,
    getFeaturedTestimonials
  } = useTestimonial();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filterStatus === 'approved' && !testimonial.approved) return false;
    if (filterStatus === 'pending' && testimonial.approved) return false;
    if (filterStatus === 'featured' && (!testimonial.approved || !testimonial.featured)) return false;
    if (filterRating !== 'all' && testimonial.rating !== parseInt(filterRating)) return false;
    return true;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const approvedTestimonials = getApprovedTestimonials();
  const pendingTestimonials = getPendingTestimonials();
  const featuredTestimonials = getFeaturedTestimonials();

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from ${clientName}?`)) {
      deleteTestimonial(id);
    }
  };

  const handleApprove = (testimonial: Testimonial) => {
    approveTestimonial(testimonial.id);
  };

  const handleReject = (testimonial: Testimonial) => {
    rejectTestimonial(testimonial.id);
  };

  const handleToggleFeatured = (testimonial: Testimonial) => {
    if (testimonial.approved) {
      toggleFeatured(testimonial.id);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  const getStatusBadge = (testimonial: Testimonial) => {
    if (!testimonial.approved) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          Pending
        </span>
      );
    }
    if (testimonial.featured) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Featured
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
        Approved
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Testimonial Management</h2>
          <p className="text-gray-400">Manage client testimonials and reviews</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Testimonials</p>
          <p className="text-2xl font-bold text-white">{testimonials.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Approved</p>
          <p className="text-2xl font-bold text-white">{approvedTestimonials.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-white">{pendingTestimonials.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-white">{featuredTestimonials.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="featured">Featured</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300">Rating:</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Testimonials</h3>
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 text-lg">No testimonials found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add a new testimonial</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{testimonial.title}</h4>
                          {getStatusBadge(testimonial)}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(testimonial.rating)}
                          <span className="text-sm text-gray-400">({testimonial.rating}/5)</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <User size={16} />
                        <span>{testimonial.clientName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Mail size={16} />
                        <span>{testimonial.clientEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar size={16} />
                        <span>{formatDate(testimonial.date)}</span>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Award size={16} />
                        <span>{testimonial.service}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <User size={16} />
                        <span>Artist: {testimonial.artist}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed">{testimonial.content}</p>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-gray-500">
                      <p>Submitted: {formatDate(testimonial.createdAt)}</p>
                      {testimonial.approvedAt && (
                        <p>Approved: {formatDate(testimonial.approvedAt)}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48 flex lg:flex-col gap-2">
                    {/* Approval Actions */}
                    {!testimonial.approved ? (
                      <>
                        <button
                          onClick={() => handleApprove(testimonial)}
                          className="bg-green-600/20 text-green-400 hover:bg-green-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                        >
                          <Check size={16} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(testimonial)}
                          className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                        >
                          <X size={16} />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleToggleFeatured(testimonial)}
                          className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1 ${
                            testimonial.featured
                              ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                              : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                          }`}
                        >
                          {testimonial.featured ? <StarOff size={16} /> : <Star size={16} />}
                          <span>{testimonial.featured ? 'Unfeature' : 'Feature'}</span>
                        </button>
                        <button
                          onClick={() => handleReject(testimonial)}
                          className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                        >
                          <X size={16} />
                          <span>Unapprove</span>
                        </button>
                      </>
                    )}

                    {/* Edit/Delete Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="flex-1 p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-all duration-300"
                        title="Edit testimonial"
                      >
                        <Edit size={16} className="mx-auto" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id, testimonial.clientName)}
                        className="flex-1 p-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-all duration-300"
                        title="Delete testimonial"
                      >
                        <Trash2 size={16} className="mx-auto" />
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
      {(showAddModal || editingTestimonial) && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => {
            setShowAddModal(false);
            setEditingTestimonial(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setEditingTestimonial(null);
          }}
        />
      )}
    </div>
  );
};

export default TestimonialManagement;
