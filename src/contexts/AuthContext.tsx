'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  document: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (document: string) => void;
  handleLogout: () => void;
  handleRegister: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // INICIA COMO TRUE para forçar espera no CSR

  useEffect(() => {
    // Garantir que o código só execute no ambiente do navegador
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('chilli_drinks_user_mock');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          // Redefine cookie se usuário existe no localStorage
          if (typeof window !== 'undefined') {
            document.cookie = 'chilli_drinks_auth=true; path=/; max-age=86400';
          }
        } catch (e) {
          console.error('Erro ao analisar usuário do localStorage:', e);
          localStorage.removeItem('chilli_drinks_user_mock'); // Limpar dados corrompidos
        }
      }
    }
    setIsLoading(false); // SÓ MUDA PARA FALSE APÓS A TENTATIVA DE CARREGAR A SESSÃO
  }, []);

  const handleLogin = (document: string) => {
    console.log('🔐 Login tentativa:', document);
    setIsLoading(true);
    if (document === '11111111111') {
      const mockUser: User = { 
        id: 'user_1', 
        name: 'Fulano da Silva', 
        email: 'fulano@email.com',
        document: document 
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('chilli_drinks_user_mock', JSON.stringify(mockUser));
        // Define cookie para o middleware
        if (typeof window !== 'undefined') {
          document.cookie = 'chilli_drinks_auth=true; path=/; max-age=86400';
        }
      }
      setUser(mockUser);
      console.log('✅ Login sucesso:', mockUser);
    } else {
      setUser(null);
      console.log('❌ Login falhou');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chilli_drinks_user_mock');
      // Remove cookie
      if (typeof window !== 'undefined') {
        document.cookie = 'chilli_drinks_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
    setUser(null);
    setIsLoading(false);
  };

  const handleRegister = (data: any) => {
    setIsLoading(true);
    const mockUser: User = { 
      id: 'user_new', 
      name: data.name, 
      email: data.email,
      document: data.document 
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('chilli_drinks_user_mock', JSON.stringify(mockUser));
    }
    setUser(mockUser);
    setIsLoading(false);
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