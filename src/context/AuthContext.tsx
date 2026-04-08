import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  name: 'Иван Петров',
  email: 'admin@smartdiscount.ru',
  role: 'Администратор',
  lastLogin: new Date().toLocaleDateString('ru-RU'),
  initials: 'ИП',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('sd_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@smartdiscount.ru' && password === 'admin123') {
      const u = { ...DEMO_USER, lastLogin: new Date().toLocaleDateString('ru-RU') };
      setUser(u);
      sessionStorage.setItem('sd_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('sd_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
