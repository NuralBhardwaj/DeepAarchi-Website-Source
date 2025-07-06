import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { AdminUser } from '../services/authService';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: AdminUser | null;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in and session is valid
    const validateSession = async () => {
      try {
        const savedUser = authService.validateSession();
        if (savedUser && !authService.isSessionExpired()) {
          setIsAuthenticated(true);
          setUser(savedUser);
        } else {
          // Clear expired session
          authService.clearSession();
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const login = (username: string, password: string): boolean => {
    try {
      const authResponse = authService.authenticate(username, password);
      if (authResponse.success && authResponse.user) {
        setIsAuthenticated(true);
        setUser(authResponse.user);
        authService.saveSession(authResponse.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      authService.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
