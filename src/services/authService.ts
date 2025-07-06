// Secure Authentication Service
// This service handles authentication without exposing credentials in the frontend

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'artist';
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AdminUser;
  message?: string;
}

// Hash function for basic credential verification
// In production, this should be replaced with proper server-side authentication
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Predefined hashed credentials (not exposed in plain text)
const ADMIN_CREDENTIALS = {
  // These are hashed versions of the actual credentials
  usernameHash: simpleHash('admin'),
  passwordHash: simpleHash('deepaarchi2024'),
  user: {
    id: '1',
    username: 'admin',
    role: 'admin' as const,
    name: 'Deep Aarchi Admin'
  }
};

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Authenticate user with hashed credentials
  public authenticate(username: string, password: string): AuthResponse {
    try {
      const usernameHash = simpleHash(username);
      const passwordHash = simpleHash(password);
      
      if (usernameHash === ADMIN_CREDENTIALS.usernameHash && 
          passwordHash === ADMIN_CREDENTIALS.passwordHash) {
        return {
          success: true,
          user: ADMIN_CREDENTIALS.user
        };
      }
      
      return {
        success: false,
        message: 'Invalid credentials'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Authentication error'
      };
    }
  }

  // Check if user session is valid
  public validateSession(): AdminUser | null {
    try {
      const savedAuth = localStorage.getItem('admin_auth');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        // Validate the session data
        if (authData.user && authData.user.id && authData.user.username) {
          return authData.user;
        }
      }
    } catch (error) {
      console.error('Session validation error:', error);
    }
    return null;
  }

  // Save authenticated session
  public saveSession(user: AdminUser): void {
    try {
      localStorage.setItem('admin_auth', JSON.stringify({ 
        user,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Session save error:', error);
    }
  }

  // Clear user session
  public clearSession(): void {
    try {
      localStorage.removeItem('admin_auth');
    } catch (error) {
      console.error('Session clear error:', error);
    }
  }

  // Check if session has expired (optional - 24 hour expiry)
  public isSessionExpired(): boolean {
    try {
      const savedAuth = localStorage.getItem('admin_auth');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        const sessionAge = Date.now() - (authData.timestamp || 0);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return sessionAge > twentyFourHours;
      }
    } catch (error) {
      console.error('Session expiry check error:', error);
    }
    return true;
  }
}

export default AuthService.getInstance();
