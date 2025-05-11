
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type UserRole = 'admin' | 'doctor' | 'patient';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: '2',
    name: 'Dr. John Smith',
    email: 'doctor@example.com',
    role: 'doctor',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor'
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'patient@example.com',
    role: 'patient',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patient'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage
    const savedUser = localStorage.getItem('healthCompassUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (in a real app, this would be an API call)
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === 'password') { // In a real app, you'd check hashed passwords
      setUser(foundUser);
      localStorage.setItem('healthCompassUser', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      setIsLoading(false);
      return true;
    }
    
    toast.error('Invalid email or password');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthCompassUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
