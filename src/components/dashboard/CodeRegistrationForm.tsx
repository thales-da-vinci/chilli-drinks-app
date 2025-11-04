// src/components/dashboard/CodeRegistrationForm.tsx

'use client';

import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Definição do Schema para o Código TAB
const codeSchema = z.object({
  code: z.string().min(10, "O Código TAB deve ter pelo menos 10 caracteres (UUID)."),
});

type CodeFormInputs = z.infer<typeof codeSchema>;

export function CodeRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CodeFormInputs>({
    resolver: zodResolver(codeSchema),
  });

  const onSubmit: SubmitHandler<CodeFormInputs> = async (data) => {
    // Simulação da chamada de API (POST /api/register-code)
    try {
      console.log("Código TAB a ser enviado para o mock/backend:", data.code);
      // Aqui seria a chamada real de useRegisterCodeMutation().mutate(data.code);
      
      // Simulação de sucesso
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Código TAB ${data.code} adicionado com sucesso à lista de espera!`);
      reset();

    } catch (error) {
      console.error("Erro ao registrar código:", error);
      alert('Erro ao adicionar o Código TAB. Tente novamente.');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}
    >
      <TextField
        {...register('code')}
        label="Insira o Código TAB (UUID)"
        fullWidth
        error={!!errors.code}
        helperText={errors.code ? errors.code.message : 'Exemplo: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'}
        variant="outlined"
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        endIcon={<SendIcon />}
        disabled={isSubmitting}
        sx={{ minWidth: 150, py: 1.5 }}
      >
        {isSubmitting ? 'Adicionando...' : 'ADICIONAR'}
      </Button>
    </Box>
  );
}