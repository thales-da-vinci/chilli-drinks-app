// src/hooks/codes/useCouponMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { z } from 'zod';

// Contrato de entrada (Schema para o cupom)
const CouponSchema = z.object({
  code: z.string().min(1, 'O código é obrigatório.'),
});

type CouponPayload = z.infer<typeof CouponSchema>;

// Contrato de resposta (O que o Backend retorna após o sucesso)
interface CouponResponse {
  message: string;
  newCode: {
    code: string;
    value: number; // Ex: o valor em R$ que o cupom adicionou
  };
}

// Função que faz a chamada real à API
const submitCouponCode = async (data: CouponPayload): Promise<CouponResponse> => {
  // A requisição espera um objeto { code: "XXX" }
  const response = await api.post<CouponResponse>('/codes', data);
  return response.data;
};

export const useCouponMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitCouponCode,
    // Após o sucesso, o Dashboard deve ser atualizado
    onSuccess: () => {
      // Invalida a lista de códigos e o resumo de resgates para forçar o recarregamento
      queryClient.invalidateQueries({ queryKey: ['userCodes'] });
      queryClient.invalidateQueries({ queryKey: ['redemptionsSummary'] });
    },
    onError: (error) => {
      console.error('Falha ao registrar cupom:', error);
    },
  });
};

export { CouponSchema };
export type { CouponPayload };