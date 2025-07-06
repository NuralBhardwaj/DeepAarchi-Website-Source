import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  artist: string;
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  estimatedPrice: number;
  deposit: number;
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  artist: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  reason?: string; // for blocked slots
}

interface CalendarContextType {
  appointments: Appointment[];
  availabilitySlots: AvailabilitySlot[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;
  getAppointmentsByDate: (date: Date) => Appointment[];
  getAppointmentsByArtist: (artist: string) => Appointment[];
  addAvailabilitySlot: (slot: Omit<AvailabilitySlot, 'id'>) => void;
  updateAvailabilitySlot: (id: string, slot: Partial<AvailabilitySlot>) => void;
  deleteAvailabilitySlot: (id: string) => void;
  getAvailabilityByDate: (date: Date) => AvailabilitySlot[];
  getAvailableSlots: (date: Date, artist?: string) => AvailabilitySlot[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Sample appointments
const initialAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'John Smith',
    clientEmail: 'john@example.com',
    clientPhone: '+1-555-0123',
    artist: 'Deep Aarchi',
    service: 'Traditional Tattoo',
    date: new Date(2024, 6, 15), // July 15, 2024
    startTime: '10:00',
    endTime: '12:00',
    duration: 120,
    status: 'confirmed',
    notes: 'Dragon design on shoulder',
    estimatedPrice: 300,
    deposit: 100,
    createdAt: new Date('2024-06-01')
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    clientPhone: '+1-555-0456',
    artist: 'Deep Aarchi',
    service: 'Realistic Portrait',
    date: new Date(2024, 6, 16), // July 16, 2024
    startTime: '14:00',
    endTime: '17:00',
    duration: 180,
    status: 'pending',
    notes: 'Pet portrait on forearm',
    estimatedPrice: 450,
    deposit: 150,
    createdAt: new Date('2024-06-05')
  },
  {
    id: '3',
    clientName: 'Mike Wilson',
    clientEmail: 'mike@example.com',
    clientPhone: '+1-555-0789',
    artist: 'Deep Aarchi',
    service: 'Geometric Design',
    date: new Date(2024, 6, 18), // July 18, 2024
    startTime: '11:00',
    endTime: '13:00',
    duration: 120,
    status: 'completed',
    notes: 'Sacred geometry sleeve',
    estimatedPrice: 400,
    deposit: 120,
    createdAt: new Date('2024-05-20')
  }
];

// Sample availability slots
const initialAvailabilitySlots: AvailabilitySlot[] = [
  {
    id: '1',
    artist: 'Deep Aarchi',
    date: new Date(2024, 6, 15),
    startTime: '09:00',
    endTime: '18:00',
    isAvailable: true
  },
  {
    id: '2',
    artist: 'Deep Aarchi',
    date: new Date(2024, 6, 16),
    startTime: '09:00',
    endTime: '18:00',
    isAvailable: true
  },
  {
    id: '3',
    artist: 'Deep Aarchi',
    date: new Date(2024, 6, 17),
    startTime: '09:00',
    endTime: '18:00',
    isAvailable: false,
    reason: 'Personal day off'
  }
];

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    // Load appointments from localStorage or use initial data
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const parsedAppointments = JSON.parse(savedAppointments).map((appointment: any) => ({
        ...appointment,
        date: new Date(appointment.date),
        createdAt: new Date(appointment.createdAt)
      }));
      setAppointments(parsedAppointments);
    } else {
      setAppointments(initialAppointments);
    }

    // Load availability slots from localStorage or use initial data
    const savedSlots = localStorage.getItem('availability_slots');
    if (savedSlots) {
      const parsedSlots = JSON.parse(savedSlots).map((slot: any) => ({
        ...slot,
        date: new Date(slot.date)
      }));
      setAvailabilitySlots(parsedSlots);
    } else {
      setAvailabilitySlots(initialAvailabilitySlots);
    }
  }, []);

  useEffect(() => {
    // Save appointments to localStorage whenever they change
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    // Save availability slots to localStorage whenever they change
    localStorage.setItem('availability_slots', JSON.stringify(availabilitySlots));
  }, [availabilitySlots]);

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  const getAppointment = (id: string) => {
    return appointments.find(appointment => appointment.id === id);
  };

  const getAppointmentsByDate = (date: Date) => {
    return appointments.filter(appointment => 
      appointment.date.toDateString() === date.toDateString()
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getAppointmentsByArtist = (artist: string) => {
    return appointments.filter(appointment => appointment.artist === artist)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const addAvailabilitySlot = (slot: Omit<AvailabilitySlot, 'id'>) => {
    const newSlot: AvailabilitySlot = {
      ...slot,
      id: Date.now().toString()
    };
    setAvailabilitySlots(prev => [newSlot, ...prev]);
  };

  const updateAvailabilitySlot = (id: string, updatedSlot: Partial<AvailabilitySlot>) => {
    setAvailabilitySlots(prev =>
      prev.map(slot =>
        slot.id === id ? { ...slot, ...updatedSlot } : slot
      )
    );
  };

  const deleteAvailabilitySlot = (id: string) => {
    setAvailabilitySlots(prev => prev.filter(slot => slot.id !== id));
  };

  const getAvailabilityByDate = (date: Date) => {
    return availabilitySlots.filter(slot => 
      slot.date.toDateString() === date.toDateString()
    );
  };

  const getAvailableSlots = (date: Date, artist?: string) => {
    return availabilitySlots.filter(slot => 
      slot.date.toDateString() === date.toDateString() &&
      slot.isAvailable &&
      (!artist || slot.artist === artist)
    );
  };

  return (
    <CalendarContext.Provider value={{
      appointments,
      availabilitySlots,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      getAppointment,
      getAppointmentsByDate,
      getAppointmentsByArtist,
      addAvailabilitySlot,
      updateAvailabilitySlot,
      deleteAvailabilitySlot,
      getAvailabilityByDate,
      getAvailableSlots
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
