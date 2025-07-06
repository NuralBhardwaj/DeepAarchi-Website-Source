import React, { useState, useEffect } from 'react';
import { useCalendar, Appointment } from '../../contexts/CalendarContext';
import { X, Calendar, Clock, User, Phone, Mail, DollarSign, FileText } from 'lucide-react';

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onClose: () => void;
  onSave: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ appointment, onClose, onSave }) => {
  const { addAppointment, updateAppointment } = useCalendar();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    artist: 'Deep Aarchi',
    service: 'Traditional Tattoo',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '12:00',
    duration: 120,
    status: 'pending' as 'pending' | 'confirmed' | 'completed' | 'cancelled',
    notes: '',
    estimatedPrice: 300,
    deposit: 100
  });
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    'Traditional Tattoo',
    'Realistic Portrait',
    'Geometric Design',
    'Watercolor Tattoo',
    'Blackwork',
    'Cover-up',
    'Touch-up',
    'Consultation'
  ];

  const artists = ['Deep Aarchi']; // Can be expanded for multiple artists

  useEffect(() => {
    if (appointment) {
      setFormData({
        clientName: appointment.clientName,
        clientEmail: appointment.clientEmail,
        clientPhone: appointment.clientPhone,
        artist: appointment.artist,
        service: appointment.service,
        date: appointment.date.toISOString().split('T')[0],
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        duration: appointment.duration,
        status: appointment.status,
        notes: appointment.notes,
        estimatedPrice: appointment.estimatedPrice,
        deposit: appointment.deposit
      });
    }
  }, [appointment]);

  // Calculate duration when times change
  useEffect(() => {
    const start = new Date(`2000-01-01T${formData.startTime}:00`);
    const end = new Date(`2000-01-01T${formData.endTime}:00`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.max(0, diffMs / (1000 * 60));
    setFormData(prev => ({ ...prev, duration: diffMins }));
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const appointmentData = {
        ...formData,
        date: new Date(formData.date)
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (appointment) {
        updateAppointment(appointment.id, appointmentData);
      } else {
        addAppointment(appointmentData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
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
          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Client Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Client Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  placeholder="Enter client name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="client@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="+1-555-0123"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Appointment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Artist *
                </label>
                <select
                  value={formData.artist}
                  onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  required
                >
                  {artists.map(artist => (
                    <option key={artist} value={artist}>{artist}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  required
                >
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    required
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    required
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <div className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400">
                  {formData.duration} minutes
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estimated Price *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.estimatedPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedPrice: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deposit *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.deposit}
                    onChange={(e) => setFormData(prev => ({ ...prev, deposit: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none"
                placeholder="Additional notes about the appointment..."
              />
            </div>
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
                <span>{appointment ? 'Update' : 'Create'} Appointment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
