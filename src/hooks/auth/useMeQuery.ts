// src/hooks/auth/useMeQuery.ts
import { useQuery } from '@tanstack/react-query';

// Define a estrutura do objeto de usuário (mockado)
interface User {
  id: string;
  cpf: string;
  email: string;
  firstName: string;
}

/**
 * Simula a chamada de API para verificar a sessão (GET /me).
 */
async function fetchMe(): Promise<User> {
  // Simula latência de 500ms para a chamada de sessão
  return new Promise((resolve) => {
    setTimeout(() => {
        // Na FASE 3, aqui seria a chamada real que retornaria o usuário se autenticado.
        // Aqui, simulamos que sempre há um usuário logado para fins de desenvolvimento inicial.
        resolve({
            id: 'user-123',
            cpf: '11111111111',
            email: 'mock@chillidrinks.com',
            firstName: 'ChilliDev',
        });
    }, 500); 
  });
}

/**
 * Custom hook que gerencia o estado da sessão do usuário logado.
 * Query Key: 'me'
 */
export function useMeQuery() {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    // Opcional: Desabilita a revalidação automática para testes mockados
    staleTime: Infinity, 
    // retry: false // Não retenta em caso de falha (simulando falha de sessão)
  });
}