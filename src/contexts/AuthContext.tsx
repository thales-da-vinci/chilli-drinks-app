'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const CHILLI_USERS_MOCK_KEY = 'chilli_users_mock';
const CHILLI_CURRENT_USER_KEY = 'chilli_current_user';

interface User {
  id: string;
  name: string;
  email: string;
  document: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (document: string, password: string) => boolean;
  handleLogout: () => void;
  handleRegister: (data: any) => { success: boolean; message?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(CHILLI_CURRENT_USER_KEY);
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          if (typeof window !== 'undefined') {
            // @ts-ignore
            window.document.cookie = 'chilli_drinks_auth=true; path=/; max-age=86400';
          }
        } catch (e) {
          console.error('Erro ao analisar usuário do localStorage:', e);
          localStorage.removeItem(CHILLI_CURRENT_USER_KEY);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (document: string, password: string): boolean => {
    console.log('🔐 Login tentativa:', document);
    setIsLoading(true);
    
    if (typeof window !== 'undefined') {
      const usersData = localStorage.getItem(CHILLI_USERS_MOCK_KEY);
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      
      const foundUser = users.find(u => u.document === document && u.password === password);
      
      if (foundUser) {
        localStorage.setItem(CHILLI_CURRENT_USER_KEY, JSON.stringify(foundUser));
        if (typeof window !== 'undefined') {
          // @ts-ignore
          window.document.cookie = 'chilli_drinks_auth=true; path=/; max-age=86400';
        }
        setUser(foundUser);
        console.log('✅ Login sucesso:', foundUser);
        setIsLoading(false);
        return true;
      } else {
        setUser(null);
        console.log('❌ Login falhou: CPF ou senha inválidos');
        setIsLoading(false);
        return false;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const handleLogout = () => {
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CHILLI_CURRENT_USER_KEY);
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.document.cookie = 'chilli_drinks_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
    setUser(null);
    setIsLoading(false);
  };

  const handleRegister = (data: any): { success: boolean; message?: string } => {
    setIsLoading(true);
    
    if (typeof window !== 'undefined') {
      const usersData = localStorage.getItem(CHILLI_USERS_MOCK_KEY);
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      
      // Verifica duplicidade de CPF
      const cpfExists = users.find(u => u.document === data.document);
      if (cpfExists) {
        console.log('❌ Registro falhou: CPF já cadastrado');
        setIsLoading(false);
        return { success: false, message: 'CPF já cadastrado' };
      }
      
      // Verifica duplicidade de E-mail
      const emailExists = users.find(u => u.email === data.email);
      if (emailExists) {
        console.log('❌ Registro falhou: E-mail já cadastrado');
        setIsLoading(false);
        return { success: false, message: 'E-mail já cadastrado' };
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        document: data.document,
        password: data.password
      };
      
      users.push(newUser);
      localStorage.setItem(CHILLI_USERS_MOCK_KEY, JSON.stringify(users));
      
      console.log('✅ Registro concluído:', newUser.email);
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, message: 'Erro ao processar registro' };
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};