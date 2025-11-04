// src/services/api.ts
import axios from 'axios';

// Variável de ambiente para a URL do Backend.
// Assumindo que você usa NEXT_PUBLIC_API_URL no seu .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  // CRÍTICO para autenticação baseada em Cookie/Sessão.
  // Garante que os cookies de sessão sejam enviados com cada requisição
  // e aceitos nas respostas (Set-Cookie).
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Opcional, mas útil: Interceptor para lidar com erros de 401/Sessão expirada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se for um erro 401 (Não Autorizado) e não for a chamada de login/register
    if (error.response && error.response.status === 401) {
      // Se necessário, você pode limpar o cache ou forçar um logout
      console.log('Sessão expirada ou não autorizada. Redirecionando...');
      
      // Nota: Não é ideal forçar o redirecionamento aqui, 
      // o AuthGuard deve tratar isso com o useMeQuery.
    }
    return Promise.reject(error);
  }
);