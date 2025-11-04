// src/components/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider: Componente Cliente que configura o TanStack Query.
 * Ele envolve a aplicação para que os hooks de requisição (como useMeQuery)
 * possam acessar o QueryClient.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // O QueryClient deve ser instanciado APENAS UMA VEZ por componente
  // e armazenado no estado para que não seja recriado a cada re-render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Desativa refetching agressivo no dev, otimizando performance.
            staleTime: 60 * 1000, 
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}