import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'traditional' | 'realistic' | 'geometric' | 'watercolor' | 'blackwork' | 'other';
  artist: string;
  createdAt: Date;
  featured: boolean;
  tags: string[];
}

interface PortfolioContextType {
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  getPortfolioItem: (id: string) => PortfolioItem | undefined;
  getPortfolioByCategory: (category: string) => PortfolioItem[];
  getFeaturedPortfolio: () => PortfolioItem[];
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Sample portfolio data
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Dragon Sleeve',
    description: 'Traditional Japanese dragon sleeve tattoo with vibrant colors',
    imageUrl: '/api/placeholder/400/600',
    category: 'traditional',
    artist: 'Deep Aarchi',
    createdAt: new Date('2024-01-15'),
    featured: true,
    tags: ['dragon', 'sleeve', 'japanese', 'colorful']
  },
  {
    id: '2',
    title: 'Geometric Mandala',
    description: 'Intricate geometric mandala design with perfect symmetry',
    imageUrl: '/api/placeholder/400/400',
    category: 'geometric',
    artist: 'Deep Aarchi',
    createdAt: new Date('2024-02-10'),
    featured: true,
    tags: ['mandala', 'geometric', 'symmetry', 'spiritual']
  },
  {
    id: '3',
    title: 'Realistic Portrait',
    description: 'Hyper-realistic portrait tattoo with incredible detail',
    imageUrl: '/api/placeholder/400/500',
    category: 'realistic',
    artist: 'Deep Aarchi',
    createdAt: new Date('2024-03-05'),
    featured: false,
    tags: ['portrait', 'realistic', 'detailed', 'black-and-gray']
  },
  {
    id: '4',
    title: 'Watercolor Butterfly',
    description: 'Beautiful watercolor butterfly with flowing colors',
    imageUrl: '/api/placeholder/400/300',
    category: 'watercolor',
    artist: 'Deep Aarchi',
    createdAt: new Date('2024-03-20'),
    featured: true,
    tags: ['butterfly', 'watercolor', 'colorful', 'nature']
  }
];

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    // Load portfolio items from localStorage or use initial data
    const savedItems = localStorage.getItem('portfolio_items');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems).map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
      setPortfolioItems(parsedItems);
    } else {
      setPortfolioItems(initialPortfolioItems);
    }
  }, []);

  useEffect(() => {
    // Save portfolio items to localStorage whenever they change
    localStorage.setItem('portfolio_items', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setPortfolioItems(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (id: string, updatedItem: Partial<PortfolioItem>) => {
    setPortfolioItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const getPortfolioItem = (id: string) => {
    return portfolioItems.find(item => item.id === id);
  };

  const getPortfolioByCategory = (category: string) => {
    return portfolioItems.filter(item => item.category === category);
  };

  const getFeaturedPortfolio = () => {
    return portfolioItems.filter(item => item.featured);
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioItems,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
      getPortfolioItem,
      getPortfolioByCategory,
      getFeaturedPortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
