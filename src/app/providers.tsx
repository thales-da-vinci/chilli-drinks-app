// src/app/providers.tsx
'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { chilliDrinksTheme } from '@/styles/theme'; // Importa nosso tema customizado

// 1. Configuração do TanStack Query Client (Fora do componente para persistência)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Dados "velhos" após 5 minutos (Good Practice).
      refetchOnWindowFocus: true, // Re-busca dados se a janela voltar ao foco.
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Componente que agrupa todos os Providers globais da aplicação.
 * @param children Os componentes da aplicação.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    // 2. QueryClientProvider: Habilita o TanStack Query para toda a aplicação.
    <QueryClientProvider client={queryClient}>
      {/* 3. ThemeProvider: Habilita o Design System (Tema MUI Customizado). */}
      <ThemeProvider theme={chilliDrinksTheme}>
        {/* CssBaseline: Reseta o CSS padrão do navegador para o padrão MUI. Essencial! */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
