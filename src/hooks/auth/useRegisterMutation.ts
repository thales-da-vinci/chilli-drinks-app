// src/hooks/auth/useRegisterMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { RegisterFormFields } from '@/schemas/auth';

// Define a tipagem da resposta da API de Cadastro
interface RegisterResponse {
  user: {
    id: number;
    cpf: string;
    email: string;
  };
  message: string;
}

// Função que faz a chamada real à API
const registerUser = async (data: RegisterFormFields): Promise<RegisterResponse> => {
  // Remove confirmPassword antes de enviar para a API
  const { confirmPassword, ...payload } = data;
  const response = await api.post<RegisterResponse>('/auth/register', payload);
  return response.data;
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Invalida o cache do usuário para que o AuthGuard cheque a sessão
      queryClient.invalidateQueries({ queryKey: ['me'] });
      console.log('Cadastro realizado com sucesso:', data.message);
    },
    onError: (error) => {
      console.error('Falha no cadastro:', error);
    },
  });
};