// src/hooks/codes/useUserCodesQuery.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

// Contrato de resposta (Lista de códigos resgatados)
interface UserCode {
  id: number;
  code: string;
  value: number; // Valor creditado
  redeemedAt: string | null; // Se foi usado em um resgate
  createdAt: string;
}

const getUserCodes = async (): Promise<UserCode[]> => {
  // GET /codes (conforme Documento Mestre)
  const response = await api.get<UserCode[]>('/codes');
  return response.data;
};

export const useUserCodesQuery = () => {
  return useQuery<UserCode[]>({
    queryKey: ['userCodes'],
    queryFn: getUserCodes,
    // enabled: !!userId, 
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};