import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Testimonial {
  id: string;
  clientName: string;
  clientEmail: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  service: string;
  artist: string;
  date: Date;
  approved: boolean;
  featured: boolean;
  clientPhoto?: string;
  createdAt: Date;
  approvedAt?: Date;
}

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'approved' | 'featured'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  approveTestimonial: (id: string) => void;
  rejectTestimonial: (id: string) => void;
  toggleFeatured: (id: string) => void;
  getTestimonial: (id: string) => Testimonial | undefined;
  getApprovedTestimonials: () => Testimonial[];
  getFeaturedTestimonials: () => Testimonial[];
  getPendingTestimonials: () => Testimonial[];
  getTestimonialsByRating: (rating: number) => Testimonial[];
  getTestimonialsByService: (service: string) => Testimonial[];
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

// Sample testimonials
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    rating: 5,
    title: 'Amazing Dragon Tattoo!',
    content: 'Deep Aarchi created the most incredible dragon tattoo on my shoulder. The detail and artistry are beyond what I imagined. The whole experience was professional and comfortable. I couldn\'t be happier with the result!',
    service: 'Traditional Tattoo',
    artist: 'Deep Aarchi',
    date: new Date('2024-06-15'),
    approved: true,
    featured: true,
    createdAt: new Date('2024-06-16'),
    approvedAt: new Date('2024-06-17')
  },
  {
    id: '2',
    clientName: 'Mike Wilson',
    clientEmail: 'mike@example.com',
    rating: 5,
    title: 'Perfect Geometric Design',
    content: 'The geometric sleeve that Deep Aarchi designed for me is absolutely perfect. Every line is precise, and the symmetry is flawless. The healing process was smooth thanks to the excellent aftercare instructions.',
    service: 'Geometric Design',
    artist: 'Deep Aarchi',
    date: new Date('2024-05-20'),
    approved: true,
    featured: true,
    createdAt: new Date('2024-05-22'),
    approvedAt: new Date('2024-05-23')
  },
  {
    id: '3',
    clientName: 'Emily Chen',
    clientEmail: 'emily@example.com',
    rating: 5,
    title: 'Beautiful Portrait Work',
    content: 'I got a realistic portrait of my grandmother, and Deep Aarchi captured every detail perfectly. It\'s like having her with me always. The emotional connection and technical skill are unmatched.',
    service: 'Realistic Portrait',
    artist: 'Deep Aarchi',
    date: new Date('2024-04-10'),
    approved: true,
    featured: false,
    createdAt: new Date('2024-04-12'),
    approvedAt: new Date('2024-04-13')
  },
  {
    id: '4',
    clientName: 'David Rodriguez',
    clientEmail: 'david@example.com',
    rating: 4,
    title: 'Great Cover-up Work',
    content: 'Had an old tattoo that needed covering up, and Deep Aarchi did an amazing job transforming it into something beautiful. Very professional and understanding of my concerns.',
    service: 'Cover-up',
    artist: 'Deep Aarchi',
    date: new Date('2024-03-25'),
    approved: true,
    featured: false,
    createdAt: new Date('2024-03-27'),
    approvedAt: new Date('2024-03-28')
  },
  {
    id: '5',
    clientName: 'Jessica Martinez',
    clientEmail: 'jessica@example.com',
    rating: 5,
    title: 'Incredible Blackwork',
    content: 'The blackwork piece Deep Aarchi created is stunning. Bold, clean lines and perfect shading. The studio is clean and professional, and the artist made me feel comfortable throughout the entire process.',
    service: 'Blackwork',
    artist: 'Deep Aarchi',
    date: new Date('2024-07-01'),
    approved: false,
    featured: false,
    createdAt: new Date('2024-07-02')
  },
  {
    id: '6',
    clientName: 'Alex Thompson',
    clientEmail: 'alex@example.com',
    rating: 5,
    title: 'First Tattoo Experience',
    content: 'This was my first tattoo and Deep Aarchi made the experience so comfortable and easy. Explained everything clearly and the result exceeded my expectations. Will definitely be back for more!',
    service: 'Traditional Tattoo',
    artist: 'Deep Aarchi',
    date: new Date('2024-06-30'),
    approved: false,
    featured: false,
    createdAt: new Date('2024-07-01')
  }
];

export const TestimonialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage or use initial data
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      const parsedTestimonials = JSON.parse(savedTestimonials).map((testimonial: any) => ({
        ...testimonial,
        date: new Date(testimonial.date),
        createdAt: new Date(testimonial.createdAt),
        approvedAt: testimonial.approvedAt ? new Date(testimonial.approvedAt) : undefined
      }));
      setTestimonials(parsedTestimonials);
    } else {
      setTestimonials(initialTestimonials);
    }
  }, []);

  useEffect(() => {
    // Save testimonials to localStorage whenever they change
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'approved' | 'featured'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
      createdAt: new Date(),
      approved: false,
      featured: false
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const updateTestimonial = (id: string, updatedTestimonial: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
      )
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  const approveTestimonial = (id: string) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === id 
          ? { ...testimonial, approved: true, approvedAt: new Date() }
          : testimonial
      )
    );
  };

  const rejectTestimonial = (id: string) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === id 
          ? { ...testimonial, approved: false, approvedAt: undefined }
          : testimonial
      )
    );
  };

  const toggleFeatured = (id: string) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === id 
          ? { ...testimonial, featured: !testimonial.featured }
          : testimonial
      )
    );
  };

  const getTestimonial = (id: string) => {
    return testimonials.find(testimonial => testimonial.id === id);
  };

  const getApprovedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.approved)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getFeaturedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.approved && testimonial.featured)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getPendingTestimonials = () => {
    return testimonials.filter(testimonial => !testimonial.approved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const getTestimonialsByRating = (rating: number) => {
    return testimonials.filter(testimonial => testimonial.rating === rating && testimonial.approved)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getTestimonialsByService = (service: string) => {
    return testimonials.filter(testimonial => testimonial.service === service && testimonial.approved)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  return (
    <TestimonialContext.Provider value={{
      testimonials,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      approveTestimonial,
      rejectTestimonial,
      toggleFeatured,
      getTestimonial,
      getApprovedTestimonials,
      getFeaturedTestimonials,
      getPendingTestimonials,
      getTestimonialsByRating,
      getTestimonialsByService
    }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonial = () => {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonial must be used within a TestimonialProvider');
  }
  return context;
};
