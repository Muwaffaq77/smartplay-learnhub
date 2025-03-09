
import React, { createContext, useContext, useState, useEffect } from 'react';

type Track = 'literary' | 'scientific';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  track?: Track;
  level: number;
  stage: number;
  points: number;
  correctAnswers: number;
  totalAnswers: number;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'facebook') => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setTrack: (track: Track) => void;
  isOnboarded: () => boolean;
  completeOnboarding: (name: string, track: Track) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate fetching user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: '',
        email,
        level: 1,
        stage: 1,
        points: 0,
        correctAnswers: 0,
        totalAnswers: 0,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSocial = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: '',
        email: `user@${provider}.com`,
        level: 1,
        stage: 1,
        points: 0,
        correctAnswers: 0,
        totalAnswers: 0,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const setTrack = (track: Track) => {
    if (user) {
      const updatedUser = { ...user, track };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isOnboarded = () => {
    if (!user) return false;
    return !!(user.name && user.track);
  };

  const completeOnboarding = (name: string, track: Track) => {
    if (user) {
      const updatedUser = { ...user, name, track };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithSocial,
        logout,
        updateUser,
        setTrack,
        isOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
