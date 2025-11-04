// src/components/dashboard/CouponForm.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Alert, CircularProgress, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCouponMutation, CouponSchema, CouponPayload } from '@/hooks/codes/useCouponMutation';

export function CouponForm() {
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponPayload>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: '',
    },
  });
  
  // Hook de mutação real
  const couponMutation = useCouponMutation(); 
  
  const onSubmit: SubmitHandler<CouponPayload> = (data) => {
    // Transforma para maiúsculas (convenção definida no Notion)
    const upperCaseCode = { code: data.code.toUpperCase() }; 

    couponMutation.mutate(upperCaseCode, {
      onSuccess: (response) => {
        // Exibe mensagem de sucesso (ex: "Cupom X registrado! Ganhou R$Y.")
        console.log("Cupom registrado com sucesso:", response.message);
        // Limpa o campo do formulário
        reset();
        // Invalida as queries para atualizar saldo e histórico
        queryClient.invalidateQueries({ queryKey: ['redemptionsSummary'] });
        queryClient.invalidateQueries({ queryKey: ['userCodes'] });
        // Implementar Snackbar/Alert de sucesso aqui.
      },
      onError: (error: any) => {
        // Trata erros como "Cupom inválido", "Cupom já usado", etc.
        const errorMessage = error.response?.data?.message || 'Erro desconhecido ao registrar cupom.';
        console.error("Erro ao registrar cupom:", errorMessage);
        // Implementar Alert de erro aqui.
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      
      {/* Exibe erro global do Mutation */}
      {couponMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(couponMutation.error as any)?.response?.data?.message || 'Erro de conexão com o servidor. Tente novamente mais tarde.'}
        </Alert>
      )}

      {/* Campo de Input do Código (code) */}
      <TextField
        {...register('code')}
        label="Código do Cupom"
        fullWidth
        variant="outlined"
        placeholder="Digite o código do lacre"
        error={!!errors.code}
        helperText={errors.code?.message}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // Desabilita o botão enquanto a requisição estiver pendente
        disabled={couponMutation.isPending}
      >
        {couponMutation.isPending ? <CircularProgress size={24} /> : 'REGISTRAR CÓDIGO'}
      </Button>
    </Box>
  );
}