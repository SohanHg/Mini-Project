import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthUser, Employee } from '../types';
import { authenticateUser } from '../data/mockData';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (username: string, userId: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const employee = await authenticateUser(username, userId);
      
      if (employee) {
        setUser({
          id: employee.id,
          name: employee.name,
          isAuthenticated: true
        });
        return true;
      } else {
        setError('Invalid credentials. Please check your name and ID.');
        return false;
      }
    } catch (err) {
      setError('An error occurred during authentication.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};