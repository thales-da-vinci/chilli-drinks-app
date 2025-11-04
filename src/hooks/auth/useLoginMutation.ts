// src/hooks/auth/useLoginMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { LoginSchema } from '@/schemas/auth';
import { z } from 'zod';

// Define a tipagem do que o endpoint de Login espera (inputs)
type LoginPayload = z.infer<typeof LoginSchema>;

// Define a tipagem da resposta da API de Login (o que o backend retorna)
interface LoginResponse {
  // Geralmente o backend retorna o objeto do usuário, ou uma mensagem de sucesso
  user: {
    id: number;
    cpf: string;
    email: string;
    // ... outros campos ...
  };
  // O token não é estritamente necessário se a autenticação for baseada em Cookie
  message: string;
}

// Função que faz a chamada real à API
const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  // Chamada POST para o endpoint real
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    // Lógica após o login ser BEM-SUCEDIDO
    onSuccess: (data) => {
      // 1. Invalida o cache do usuário:
      // Isso força o `useMeQuery` (que está no AuthGuard) a rodar novamente
      // e checar o cookie de sessão recém-criado, permitindo o acesso.
      queryClient.invalidateQueries({ queryKey: ['me'] });

      // 2. Opcional: Mostra uma notificação de sucesso
      // if (typeof window !== 'undefined') {
      //   // Exemplo: showSnackbar('Login realizado com sucesso!', 'success');
      // }
    },
    // Lógica se a mutação falhar (ex: senha incorreta)
    onError: (error) => {
      // O onError já será tratado pelo LoginForm (no `mutate.error`)
      console.error('Falha no login:', error);
    },
  });
};