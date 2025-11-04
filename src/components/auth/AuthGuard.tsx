'use client'; 

import { ReactNode, useEffect } from 'react';
import { useMeQuery } from '@/hooks/auth/useMeQuery'; 
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material'; 

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  // useMeQuery é um hook cliente-side, e agora só roda após o ClientAppWrapper
  const { data: user, isLoading, isError, isFetched } = useMeQuery();
  
  // Lógica de Redirecionamento (Roda apenas quando a query for concluída)
  useEffect(() => {
    // Se a checagem terminou (isFetched) e o usuário não foi autenticado
    if (isFetched && (isError || !user)) {
      // Redireciona para o login
      router.push('/login');
    }
    
  }, [isError, isFetched, user, router]);


  // O que renderizamos no DOM do cliente
  
  // 1. Enquanto a query está carregando ou não foi concluída
  if (isLoading || !isFetched) {
    // Renderizamos um loading de tela cheia.
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 2. Se a checagem falhou (isError ou !user)
  // O useEffect já acionou o router.push('/login'), então mostramos loading enquanto a navegação ocorre.
  if (isError || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. Se está tudo OK e autenticado (user existe)
  return <>{children}</>;
}
