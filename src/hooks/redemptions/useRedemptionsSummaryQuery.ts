// src/hooks/redemptions/useRedemptionsSummaryQuery.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

// Contrato de resposta
interface SummaryResponse {
  totalValue: number; // Saldo total acumulado (em centavos)
  codesCount: number; // Total de códigos cadastrados
  pendingRedemptions: number; // Contagem de resgates pendentes
}

const getRedemptionsSummary = async (): Promise<SummaryResponse> => {
  const response = await api.get<SummaryResponse>('/redemptions/summary');
  return response.data;
};

export const useRedemptionsSummaryQuery = () => {
  return useQuery<SummaryResponse>({
    queryKey: ['redemptionsSummary'],
    queryFn: getRedemptionsSummary,
    // Garante que só será executado se houver usuário logado (opcional, dependendo do AuthGuard)
    // enabled: !!userId, 
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};