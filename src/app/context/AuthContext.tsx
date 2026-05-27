import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const MOCK_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@benjas.com', password: 'admin123', role: 'admin' as const },
  { id: '2', name: 'Cliente 1', email: 'cliente@benjas.com', password: 'cliente123', role: 'client' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
