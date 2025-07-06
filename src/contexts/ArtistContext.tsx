import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Artist {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  experience: string; // e.g., "5+ Years"
  rating: number; // 1-5 stars
  completedTattoos: number;
  profileImage: string;
  portfolioImages: string[];
  hourlyRate: number;
  isActive: boolean;
  joinedDate: Date;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  availability: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  skills: string[];
  certifications: string[];
  awards: string[];
  role: 'owner' | 'senior_artist' | 'artist' | 'apprentice';
  permissions: {
    canManagePortfolio: boolean;
    canManageAppointments: boolean;
    canViewReports: boolean;
    canManageClients: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ArtistStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  averageRating: number;
  totalRevenue: number;
  monthlyRevenue: number;
  portfolioItems: number;
  clientRetentionRate: number;
}

interface ArtistContextType {
  artists: Artist[];
  addArtist: (artist: Omit<Artist, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateArtist: (id: string, artist: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  getArtist: (id: string) => Artist | undefined;
  getActiveArtists: () => Artist[];
  getArtistsByRole: (role: Artist['role']) => Artist[];
  getArtistStats: (artistId: string) => ArtistStats;
  toggleArtistStatus: (id: string) => void;
  updateArtistAvailability: (id: string, availability: Artist['availability']) => void;
  getAvailableArtists: (date: Date, startTime: string, endTime: string) => Artist[];
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

// Sample artist data
const initialArtists: Artist[] = [
  {
    id: '1',
    name: 'Deep Aarchi',
    email: 'deep@deepaarchi.com',
    phone: '+1-555-0100',
    bio: 'Master tattoo artist with over 15 years of experience. Specializes in traditional and realistic tattoo styles. Known for exceptional attention to detail and creating unique, personalized designs for each client.',
    specialties: ['Traditional', 'Realistic', 'Portrait', 'Japanese'],
    experience: '15+ Years',
    rating: 4.9,
    completedTattoos: 2847,
    profileImage: '/api/placeholder/300/300',
    portfolioImages: [
      '/api/placeholder/400/600',
      '/api/placeholder/400/400',
      '/api/placeholder/600/400'
    ],
    hourlyRate: 150,
    isActive: true,
    joinedDate: new Date('2009-03-15'),
    socialMedia: {
      instagram: '@deepaarchi_tattoo',
      facebook: 'DeepAarchiTattoo'
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
    skills: ['Custom Design', 'Color Theory', 'Shading', 'Line Work', 'Cover-ups'],
    certifications: ['Bloodborne Pathogen Certification', 'First Aid/CPR', 'Professional Tattoo License'],
    awards: [
      'Best Traditional Tattoo 2023',
      'Artist of the Year 2022',
      'Excellence in Realistic Art 2021'
    ],
    role: 'owner',
    permissions: {
      canManagePortfolio: true,
      canManageAppointments: true,
      canViewReports: true,
      canManageClients: true
    },
    createdAt: new Date('2009-03-15'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    email: 'maya@deepaarchi.com',
    phone: '+1-555-0101',
    bio: 'Talented artist specializing in geometric and watercolor tattoos. Known for her innovative approach to color blending and precise geometric patterns.',
    specialties: ['Geometric', 'Watercolor', 'Abstract', 'Minimalist'],
    experience: '8+ Years',
    rating: 4.7,
    completedTattoos: 1245,
    profileImage: '/api/placeholder/300/300',
    portfolioImages: [
      '/api/placeholder/400/600',
      '/api/placeholder/400/400'
    ],
    hourlyRate: 120,
    isActive: true,
    joinedDate: new Date('2016-08-20'),
    socialMedia: {
      instagram: '@maya_ink_art'
    },
    availability: {
      monday: { start: '10:00', end: '18:00', available: true },
      tuesday: { start: '10:00', end: '18:00', available: true },
      wednesday: { start: '00:00', end: '00:00', available: false },
      thursday: { start: '10:00', end: '18:00', available: true },
      friday: { start: '10:00', end: '18:00', available: true },
      saturday: { start: '09:00', end: '15:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false }
    },
    skills: ['Geometric Design', 'Color Blending', 'Fine Line Work', 'Abstract Art'],
    certifications: ['Bloodborne Pathogen Certification', 'Professional Tattoo License'],
    awards: ['Best Geometric Design 2023', 'Rising Star Award 2020'],
    role: 'senior_artist',
    permissions: {
      canManagePortfolio: true,
      canManageAppointments: true,
      canViewReports: false,
      canManageClients: true
    },
    createdAt: new Date('2016-08-20'),
    updatedAt: new Date()
  }
];

export const ArtistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    // Load artists from localStorage or use initial data
    const savedArtists = localStorage.getItem('artists');
    if (savedArtists) {
      const parsedArtists = JSON.parse(savedArtists).map((artist: any) => ({
        ...artist,
        joinedDate: new Date(artist.joinedDate),
        createdAt: new Date(artist.createdAt),
        updatedAt: new Date(artist.updatedAt)
      }));
      setArtists(parsedArtists);
    } else {
      setArtists(initialArtists);
    }
  }, []);

  useEffect(() => {
    // Save artists to localStorage whenever they change
    localStorage.setItem('artists', JSON.stringify(artists));
  }, [artists]);

  const addArtist = (artist: Omit<Artist, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newArtist: Artist = {
      ...artist,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };
    setArtists(prev => [newArtist, ...prev]);
  };

  const updateArtist = (id: string, updatedArtist: Partial<Artist>) => {
    setArtists(prev =>
      prev.map(artist =>
        artist.id === id ? { ...artist, ...updatedArtist, updatedAt: new Date() } : artist
      )
    );
  };

  const deleteArtist = (id: string) => {
    setArtists(prev => prev.filter(artist => artist.id !== id));
  };

  const getArtist = (id: string) => {
    return artists.find(artist => artist.id === id);
  };

  const getActiveArtists = () => {
    return artists.filter(artist => artist.isActive);
  };

  const getArtistsByRole = (role: Artist['role']) => {
    return artists.filter(artist => artist.role === role);
  };

  const toggleArtistStatus = (id: string) => {
    updateArtist(id, { isActive: !getArtist(id)?.isActive });
  };

  const updateArtistAvailability = (id: string, availability: Artist['availability']) => {
    updateArtist(id, { availability });
  };

  const getAvailableArtists = (date: Date, startTime: string, endTime: string) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof Artist['availability'];
    
    return artists.filter(artist => {
      if (!artist.isActive) return false;
      
      const dayAvailability = artist.availability[dayOfWeek];
      if (!dayAvailability.available) return false;
      
      // Simple time comparison (in production, use proper time parsing)
      const artistStart = dayAvailability.start;
      const artistEnd = dayAvailability.end;
      
      return startTime >= artistStart && endTime <= artistEnd;
    });
  };

  const getArtistStats = (artistId: string): ArtistStats => {
    // In a real application, this would fetch from a database
    // For now, return mock data based on artist
    const artist = getArtist(artistId);
    if (!artist) {
      return {
        totalAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        averageRating: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        portfolioItems: 0,
        clientRetentionRate: 0
      };
    }

    // Mock stats based on artist data
    return {
      totalAppointments: Math.floor(artist.completedTattoos * 1.2),
      completedAppointments: artist.completedTattoos,
      cancelledAppointments: Math.floor(artist.completedTattoos * 0.1),
      averageRating: artist.rating,
      totalRevenue: artist.completedTattoos * artist.hourlyRate * 3, // Assuming 3 hours average
      monthlyRevenue: Math.floor((artist.completedTattoos * artist.hourlyRate * 3) / 12),
      portfolioItems: artist.portfolioImages.length,
      clientRetentionRate: Math.floor(artist.rating * 20) // Convert rating to percentage
    };
  };

  return (
    <ArtistContext.Provider value={{
      artists,
      addArtist,
      updateArtist,
      deleteArtist,
      getArtist,
      getActiveArtists,
      getArtistsByRole,
      getArtistStats,
      toggleArtistStatus,
      updateArtistAvailability,
      getAvailableArtists
    }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};
