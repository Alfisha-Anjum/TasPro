'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id?: string;
  
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   profileImage?: string;
//   gender?: string;
  // location?: string;
  // emailVerified?: boolean;
  // profileCompleted: boolean;
// }


interface User {
  id?: number;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  alt_mobile?: string;
  alternateNumber?: string;
  gender?: string;
  profileImage?: string | null;
  location?: string;
  emailVerified?: boolean;
  profileCompleted: boolean;
  contactVerified: boolean;
}
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUserProfile: (profileData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
      // Check if user data exists in localStorage on initial load
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data from localStorage', error);
        }
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}