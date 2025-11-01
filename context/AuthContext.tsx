import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

// Interface for the context's value
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers); // State to allow adding new users

  const login = (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const foundUser = users.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        if (foundUser.role === role) {
          setUser(foundUser);
        } else {
          setError('Selected role does not match account role.');
        }
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (users.some(u => u.email === email)) {
          setError('An account with this email already exists.');
          setIsLoading(false);
          resolve(false);
        } else {
          const newUser: User = {
            id: `u${users.length + 1}`,
            name,
            email,
            password, // In a real app, this should be hashed
            role: UserRole.Student, // New registrations are always students
            loans: [],
          };
          setUsers(prevUsers => [...prevUsers, newUser]);
          setIsLoading(false);
          resolve(true);
        }
      }, 1000);
    });
  };

  const clearError = () => setError(null);

  const value = { user, isLoading, error, login, logout, register, clearError };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the custom hook for easy context consumption
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
