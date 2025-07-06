import React, { useState } from 'react';
import { useCalendar, Appointment } from '../../contexts/CalendarContext';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock, User, Phone, Mail, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

const CalendarManagement: React.FC = () => {
  const { appointments, updateAppointment, deleteAppointment } = useCalendar();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  }).sort((a, b) => b.date.getTime() - a.date.getTime());

  const todayAppointments = appointments.filter(appointment => 
    appointment.date.toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = appointments.filter(appointment => 
    appointment.date > new Date() && appointment.status !== 'cancelled'
  );

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${clientName}?`)) {
      deleteAppointment(id);
    }
  };

  const handleStatusChange = (appointment: Appointment, newStatus: Appointment['status']) => {
    updateAppointment(appointment.id, { status: newStatus });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar Management</h2>
          <p className="text-gray-400">Manage appointments and artist availability</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300"
        >
          <Plus size={20} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Today's Appointments</p>
          <p className="text-2xl font-bold text-white">{todayAppointments.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Upcoming</p>
          <p className="text-2xl font-bold text-white">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-white">{appointments.filter(a => a.status === 'pending').length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">This Month</p>
          <p className="text-2xl font-bold text-white">
            {appointments.filter(a => 
              a.date.getMonth() === new Date().getMonth() && 
              a.date.getFullYear() === new Date().getFullYear()
            ).length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-300">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Appointments</h3>
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 text-lg">No appointments found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add a new appointment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{appointment.clientName}</h4>
                        <p className="text-gray-400">{appointment.service}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="capitalize">{appointment.status}</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Mail size={16} />
                        <span>{appointment.clientEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Phone size={16} />
                        <span>{appointment.clientPhone}</span>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <CalendarIcon size={16} />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Clock size={16} />
                        <span>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <User size={16} />
                        <span>{appointment.artist}</span>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>Estimated: ${appointment.estimatedPrice}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>Deposit: ${appointment.deposit}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48 flex lg:flex-col gap-2">
                    {/* Status Actions */}
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(appointment, 'confirmed')}
                        className="bg-green-600/20 text-green-400 hover:bg-green-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                      >
                        <CheckCircle size={16} />
                        <span>Confirm</span>
                      </button>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusChange(appointment, 'completed')}
                        className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                      >
                        <CheckCircle size={16} />
                        <span>Complete</span>
                      </button>
                    )}

                    {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange(appointment, 'cancelled')}
                        className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                      >
                        <XCircle size={16} />
                        <span>Cancel</span>
                      </button>
                    )}

                    {/* Edit/Delete Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingAppointment(appointment)}
                        className="flex-1 p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-all duration-300"
                        title="Edit appointment"
                      >
                        <Edit size={16} className="mx-auto" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id, appointment.clientName)}
                        className="flex-1 p-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-all duration-300"
                        title="Delete appointment"
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
      {(showAddModal || editingAppointment) && (
        <AppointmentForm
          appointment={editingAppointment}
          onClose={() => {
            setShowAddModal(false);
            setEditingAppointment(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setEditingAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default CalendarManagement;
