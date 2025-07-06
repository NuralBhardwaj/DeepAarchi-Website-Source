import React from 'react';
import { Image, Calendar, MessageSquare, Users } from 'lucide-react';
import PortfolioManagement from './PortfolioManagement';
import CalendarManagement from './CalendarManagement';
import TestimonialManagement from './TestimonialManagement';
import ArtistManagement from './ArtistManagement';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useCalendar } from '../../contexts/CalendarContext';
import { useTestimonial } from '../../contexts/TestimonialContext';
import { useArtist } from '../../contexts/ArtistContext';

interface AdminContentProps {
  activeSection?: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeSection = 'dashboard' }) => {
  const { portfolioItems } = usePortfolio();
  const { appointments } = useCalendar();
  const { getApprovedTestimonials, getPendingTestimonials } = useTestimonial();
  const { getActiveArtists } = useArtist();

  const approvedTestimonials = getApprovedTestimonials();
  const pendingTestimonials = getPendingTestimonials();
  const todayAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === today.toDateString();
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Stats Cards */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Portfolio Items</p>
              <p className="text-2xl font-bold text-white">{portfolioItems.length}</p>
            </div>
            <Image className="text-gray-400" size={24} />
          </div>
        </div>



        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-white">{todayAppointments.length}</p>
            </div>
            <Calendar className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Artists</p>
              <p className="text-2xl font-bold text-white">{getActiveArtists().length}</p>
            </div>
            <Users className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Approved Testimonials</p>
              <p className="text-2xl font-bold text-white">{approvedTestimonials.length}</p>
            </div>
            <MessageSquare className="text-gray-400" size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {pendingTestimonials.length > 0 && (
            <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">{pendingTestimonials.length} testimonial(s) awaiting approval</p>
                <p className="text-gray-400 text-xs">Requires attention</p>
              </div>
            </div>
          )}
          {todayAppointments.length > 0 && (
            <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">{todayAppointments.length} appointment(s) scheduled for today</p>
                <p className="text-gray-400 text-xs">Today's schedule</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">CMS System Active</p>
              <p className="text-gray-400 text-xs">All systems operational</p>
            </div>
          </div>
          {portfolioItems.length === 0 && (
            <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">No portfolio items yet</p>
                <p className="text-gray-400 text-xs">Add your first tattoo showcase</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );



  switch (activeSection) {
    case 'dashboard':
      return renderDashboard();
    case 'portfolio':
      return <PortfolioManagement />;
    case 'calendar':
      return <CalendarManagement />;
    case 'testimonials':
      return <TestimonialManagement />;
    case 'artists':
      return <ArtistManagement />;
    default:
      return renderDashboard();
  }
};

export default AdminContent;
