import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize to null if no valid token/session exists in localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aicte_oneview_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse authenticated session:', e);
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('aicte_oneview_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aicte_oneview_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};